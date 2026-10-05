import React, { useState, useEffect } from 'react';
import { RoutePath, Language, EnquiryCategory, ContactFormData } from '../types';
import { translations } from '../data/translations';
import { assetConfig } from '../data/assetConfig';
import { Send, Copy, Check, Mail, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollSection, ScrollReveal } from '../components/ScrollReveal';

interface ContactPageProps {
  initialCategory?: EnquiryCategory;
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialCategory = 'business', language }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    organisation: '',
    enquiryType: initialCategory,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [generatedDraftText, setGeneratedDraftText] = useState<string | null>(null);

  const t = translations[language].contact;

  // Sync category if navigated with pre-selection
  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, enquiryType: initialCategory }));
    }
  }, [initialCategory]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = t.errors.nameRequired;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = t.errors.emailInvalid;
    }
    if (!formData.message.trim()) {
      errs.message = t.errors.messageRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateDraft = () => {
    const categoryLabel = t.categories[formData.enquiryType];
    const draft = [
      `TO: ${assetConfig.recipientEmail}`,
      `SUBJECT: Inquiry: ${categoryLabel} — ${formData.name}`,
      `----------------------------------------------------`,
      `NAME: ${formData.name}`,
      `EMAIL: ${formData.email}`,
      `ORGANISATION: ${formData.organisation || 'N/A'}`,
      `ENQUIRY CATEGORY: ${categoryLabel}`,
      `DATE: ${new Date().toLocaleDateString()}`,
      `----------------------------------------------------`,
      `MESSAGE:`,
      formData.message,
    ].join('\n');
    return draft;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const draft = generateDraft();
    setGeneratedDraftText(draft);

    // If an official backend endpoint is configured, submit via POST
    if (assetConfig.contactEndpointUrl) {
      setIsSubmitting(true);
      try {
        const res = await fetch(assetConfig.contactEndpointUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setSubmissionSuccess(true);
        } else {
          setErrors({ submit: `${t.errors.networkError} (Draft generated below for manual copy/sending).` });
          setSubmissionSuccess(true);
        }
      } catch (err) {
        setErrors({ submit: `${t.errors.networkError} (Draft generated below for manual copy/sending).` });
        setSubmissionSuccess(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Explicit preview mode: prepare draft for instant clipboard copy & mailto
      setSubmissionSuccess(true);
    }
  };

  const handleCopyDraft = () => {
    if (!generatedDraftText) {
      const draft = generateDraft();
      setGeneratedDraftText(draft);
      navigator.clipboard.writeText(draft);
    } else {
      navigator.clipboard.writeText(generatedDraftText);
    }
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  const handleOpenMailClient = () => {
    const categoryLabel = t.categories[formData.enquiryType];
    const subject = encodeURIComponent(`Inquiry: ${categoryLabel} — ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name}\nOrganisation: ${formData.organisation || 'N/A'}\nEmail: ${formData.email}\nCategory: ${categoryLabel}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${assetConfig.recipientEmail}?subject=${subject}&body=${body}`;
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      organisation: '',
      enquiryType: 'business',
      message: '',
    });
    setErrors({});
    setSubmissionSuccess(false);
    setGeneratedDraftText(null);
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-10 pb-24">
      {/* Header */}
      <ScrollSection yOffset={24} className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'en' ? 'Direct Channels' : 'সরাসরি যোগাযোগ'}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D161F] tracking-tight">
            {t.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
            {t.subtitle}
          </p>
        </div>
      </ScrollSection>

      {/* Main Form Section */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Form (7 cols) */}
          <ScrollReveal direction="up" className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-8 shadow-sm">
            {/* Transparent Preview Notice */}
            {!assetConfig.contactEndpointUrl && (
              <div className="p-4 bg-[#F4F6F7] border border-[#D9E1E5] flex items-start gap-3 text-xs text-[#596774]">
                <Info className="w-4 h-4 text-[#155E63] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-[#101B25]">
                    {t.previewNoticeTitle}
                  </span>
                  <p className="leading-relaxed">
                    {t.previewNoticeText}
                  </p>
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Radio / Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#101B25] block">
                  {t.labels.category}
                </label>
                <select
                  value={formData.enquiryType}
                  onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value as EnquiryCategory })}
                  className="w-full bg-[#F4F6F7] border border-[#D9E1E5] p-3 text-sm text-[#101B25] focus:outline-none focus:border-[#155E63]"
                >
                  <option value="business">{t.categories.business}</option>
                  <option value="speaking">{t.categories.speaking}</option>
                  <option value="creative">{t.categories.creative}</option>
                  <option value="media">{t.categories.media}</option>
                  <option value="other">{t.categories.other}</option>
                </select>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#101B25] block">
                  {t.labels.name} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder={t.placeholders.name}
                  className={`w-full bg-[#F4F6F7] border p-3 text-sm text-[#101B25] focus:outline-none focus:border-[#155E63] ${
                    errors.name ? 'border-red-500' : 'border-[#D9E1E5]'
                  }`}
                />
                {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#101B25] block">
                  {t.labels.email} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder={t.placeholders.email}
                  className={`w-full bg-[#F4F6F7] border p-3 text-sm text-[#101B25] focus:outline-none focus:border-[#155E63] ${
                    errors.email ? 'border-red-500' : 'border-[#D9E1E5]'
                  }`}
                />
                {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
              </div>

              {/* Organisation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#101B25] block">
                  {t.labels.organisation}
                </label>
                <input
                  type="text"
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  placeholder={t.placeholders.organisation}
                  className="w-full bg-[#F4F6F7] border border-[#D9E1E5] p-3 text-sm text-[#101B25] focus:outline-none focus:border-[#155E63]"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#101B25] block">
                  {t.labels.message} *
                </label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder={t.placeholders.message}
                  className={`w-full bg-[#F4F6F7] border p-3 text-sm text-[#101B25] focus:outline-none focus:border-[#155E63] resize-y ${
                    errors.message ? 'border-red-500' : 'border-[#D9E1E5]'
                  }`}
                />
                {errors.message && <span className="text-xs text-red-600">{errors.message}</span>}
              </div>

              {/* Form Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 bg-[#0D161F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-teal-700 transition-colors inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 rounded-xl shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {assetConfig.contactEndpointUrl ? t.labels.submitProduction : t.labels.submitPreview}
                  </span>
                </button>

                {(formData.name || formData.message) && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-slate-600 hover:text-slate-950 font-medium cursor-pointer"
                  >
                    {t.labels.clearForm}
                  </button>
                )}
              </div>
            </form>

            {/* Generated Draft Drawer if Form is Prepared */}
            {submissionSuccess && generatedDraftText && (
              <div className="p-6 bg-[#0D161F] text-white space-y-4 border border-teal-500/30 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono uppercase text-teal-400 font-semibold">
                    {t.success.draftGenerated}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyDraft}
                      className="px-3 py-1 bg-white text-[#101B25] text-xs font-semibold rounded hover:bg-[#D9E1E5] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{t.labels.draftCopied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t.labels.copyDraft}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleOpenMailClient}
                      className="px-3 py-1 bg-[#155E63] text-white text-xs font-semibold rounded hover:bg-[#155E63]/80 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{t.labels.openEmailClient}</span>
                    </button>
                  </div>
                </div>

                <pre className="font-mono text-xs text-[#D9E1E5]/90 whitespace-pre-wrap bg-white/5 p-4 overflow-x-auto">
                  {generatedDraftText}
                </pre>
              </div>
            )}
          </ScrollReveal>

          {/* Right Information & Venture Routing (5 cols) */}
          <ScrollReveal direction="left" delay={0.15} className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#101B25] text-white space-y-6">
              <span className="text-xs font-mono text-[#155E63] uppercase">
                Direct Channels
              </span>
              <h3 className="font-display text-2xl text-white">
                {language === 'en' ? 'Where to Direct Inquiries' : 'নির্দিষ্ট বিষয়ভিত্তিক যোগাযোগ'}
              </h3>

              <div className="space-y-4 text-xs text-[#D9E1E5]/80">
                <div className="border-b border-white/10 pb-3">
                  <span className="font-semibold text-white block pb-0.5">
                    {language === 'en' ? 'Enterprise Consulting' : 'প্রাতিষ্ঠানিক রূপান্তর'}
                  </span>
                  <p>
                    {language === 'en'
                      ? 'Executive transformation briefs through Achieve Consulting.'
                      : 'অ্যাচিভ কনসাল্টিংয়ের মাধ্যমে শীর্ষ ব্যবস্থাপনা পরামর্শ।'}
                  </p>
                </div>

                <div className="border-b border-white/10 pb-3">
                  <span className="font-semibold text-white block pb-0.5">
                    {language === 'en' ? 'Speaking & Keynotes' : 'বক্তৃতা ও কি-নোট'}
                  </span>
                  <p>
                    {language === 'en'
                      ? 'University lectures, corporate retreats, and industry summits.'
                      : 'বিশ্ববিদ্যালয় সেমিনার ও জাতীয় সম্মেলন।'}
                  </p>
                </div>

                <div className="border-b border-white/10 pb-3">
                  <span className="font-semibold text-white block pb-0.5">
                    {language === 'en' ? 'Songwriting & Music' : 'গীতিরচনা ও প্রযোজনা'}
                  </span>
                  <p>
                    {language === 'en'
                      ? 'Collaborations with composers, artists, and Gaanchill releases.'
                      : 'গানচিল মিউজিক ও নতুন গানের প্রযোজনা।'}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-white block pb-0.5">
                    {language === 'en' ? 'Artisan Craft & ASIX' : 'ঐতিহ্যবাহী কারুশিল্প'}
                  </span>
                  <p>
                    {language === 'en'
                      ? 'International buyer inquiries for authentic Bangladeshi handlooms.'
                      : 'আন্তর্জাতিক ক্রেতা ও দেশীয় পণ্যের রপ্তানি বাজার।'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#D9E1E5] space-y-3 text-xs text-[#596774]">
              <span className="font-semibold text-[#101B25] uppercase tracking-wider block">
                {language === 'en' ? 'Confidentiality & Response' : 'গোপনীয়তা ও উত্তর'}
              </span>
              <p className="leading-relaxed">
                {language === 'en'
                  ? 'All inquiries are reviewed thoughtfully. Commercial briefs remain confidential under standard executive discretion.'
                  : 'সকল বার্তা গুরুত্বের সাথে পর্যালোচনা করা হয়। প্রাতিষ্ঠানিক তথ্যের পূর্ণ গোপনীয়তা বজায় রাখা হয়।'}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </ScrollSection>
    </div>
  );
};
