import React, { useState } from 'react';
import { RoutePath, Language } from '../types';
import { translations } from '../data/translations';
import { assetConfig } from '../data/assetConfig';
import { ArrowUpRight, Mail, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigate: (route: RoutePath) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setStatus('error');
      setErrorMessage(
        language === 'en'
          ? 'Please enter a valid email address.'
          : 'দয়া করে একটি সঠিক ইমেইল ঠিকানা লিখুন।'
      );
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Save locally
      try {
        const stored = JSON.parse(localStorage.getItem('asif_newsletter_subscribers') || '[]');
        if (!stored.includes(cleanEmail)) {
          stored.push(cleanEmail);
          localStorage.setItem('asif_newsletter_subscribers', JSON.stringify(stored));
        }
      } catch (err) {
        // ignore localStorage errors
      }

      // If backend contact endpoint exists, notify
      if (assetConfig.contactEndpointUrl) {
        try {
          await fetch(assetConfig.contactEndpointUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: 'Newsletter Subscriber',
              email: cleanEmail,
              enquiryType: 'newsletter',
              message: 'Subscribed to Polymath Dispatch newsletter from Footer',
            }),
          });
        } catch (e) {
          // graceful fallback
        }
      }

      setTimeout(() => {
        setStatus('success');
        setEmail('');
      }, 400);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        language === 'en'
          ? 'Unable to subscribe right now. Please try again.'
          : 'এখন যুক্ত হতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
      );
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#080E15] text-[#F4F6F7] border-t border-teal-500/20"
    >
      {/* Restrained continuous line of The Cultural Bridge */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-6 py-16 lg:py-20">
        {/* Newsletter Signup Component */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0C1622] via-[#0E1A26] to-[#0A121A] border border-teal-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Newsletter Info */}
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>{language === 'en' ? 'The Polymath Dispatch' : 'পলিম্যাথ ডেসপ্যাচ'}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                {language === 'en'
                  ? 'Strategic Insights & Cultural Reflections'
                  : 'কৌশলগত চিন্তন ও সুরের ত্রৈমাসিক বার্তা'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
                {language === 'en'
                  ? 'Join 5,000+ executives, educators, and cultural leaders. Quarterly essays on enterprise transformation, lyric writing, and resilient leadership. No spam.'
                  : 'করপোরেট রূপান্তর, সংগীত সৃষ্টি ও নেতৃত্বের গভীর ভাবনা সরাসরি আপনার ইনবক্সে। কোনো অপ্রয়োজনীয় বার্তা নয়।'}
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/40 flex items-center gap-3 text-teal-200"
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {language === 'en' ? 'Welcome to The Polymath Dispatch' : 'ধন্যবাদ! আপনি যুক্ত হয়েছেন'}
                      </div>
                      <div className="text-xs text-teal-300">
                        {language === 'en'
                          ? 'You will receive our next quarterly dispatch directly.'
                          : 'পরবর্তী ত্রৈমাসিক সংস্করণের ভাবনা আপনার ইমেইলে পৌঁছে যাবে।'}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubscribe}
                    className="space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                      <div className="relative flex-1">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') setStatus('idle');
                          }}
                          placeholder={
                            language === 'en'
                              ? 'Enter your professional email'
                              : 'আপনার ইমেইল ঠিকানা লিখুন'
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm text-white placeholder-slate-400 outline-none transition-all shadow-inner"
                          aria-label={language === 'en' ? 'Email address for newsletter' : 'নিউজলেটারের জন্য ইমেইল'}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-50 shrink-0 transform active:scale-95"
                      >
                        {status === 'loading' ? (
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        ) : (
                          <>
                            <span>{language === 'en' ? 'Subscribe' : 'যুক্ত হোন'}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                          </>
                        )}
                      </button>
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-rose-400 pl-1">{errorMessage}</p>
                    )}

                    <p className="text-[11px] text-slate-400 pl-1">
                      {language === 'en'
                        ? 'Strict privacy. Unsubscribe at any time with one click.'
                        : 'গোপনীয়তা নিশ্চিত। যেকোনো সময় এক ক্লিকে আনসাবস্ক্রাইব করতে পারবেন।'}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-display text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{language === 'en' ? 'Asif Iqbal' : 'আসিফ ইকবাল'}</span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <p className="font-editorial italic text-lg text-slate-300 max-w-sm">
              "{t.footer.brandStatement}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md pt-2">
              {t.footer.editorialNotice}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-teal-400 font-mono">
              {t.footer.navigationHeader}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.story}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.work}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('music')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.music}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ideas')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.ideas}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('speaking')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.speaking}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Ventures & Verified Links */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-teal-400 font-mono">
              {t.footer.venturesHeader}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center justify-between">
                {assetConfig.ventureLinks.achieveConsulting ? (
                  <a
                    href={assetConfig.ventureLinks.achieveConsulting}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-teal-400 transition-colors"
                  >
                    <span>Achieve Consulting</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                ) : (
                  <span>Achieve Consulting</span>
                )}
                <span className="text-xs text-slate-400 font-mono">Transformation</span>
              </li>
              <li className="flex items-center justify-between">
                <span>ACIS</span>
                <span className="text-xs text-slate-400 font-mono">Creative AI</span>
              </li>
              <li className="flex items-center justify-between">
                {assetConfig.ventureLinks.asix ? (
                  <a
                    href={assetConfig.ventureLinks.asix}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>ASIX (Artisan Craft)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                ) : (
                  <span>ASIX</span>
                )}
                <span className="text-xs text-slate-400 font-mono">900+ Artisans</span>
              </li>
              <li className="flex items-center justify-between">
                {assetConfig.ventureLinks.gaanChill ? (
                  <a
                    href={assetConfig.ventureLinks.gaanChill}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>GaanChill Music</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                ) : (
                  <span>GaanChill Music</span>
                )}
                <span className="text-xs text-slate-400 font-mono">Bangla Sound</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-slate-400">
              {assetConfig.socialLinks.linkedin && (
                <a
                  href={assetConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-teal-400" />
                </a>
              )}
              {assetConfig.socialLinks.youtube && (
                <a
                  href={assetConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3 text-teal-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-4 font-mono">
            <span>Dhaka · Chittagong · Global</span>
            <span aria-hidden="true" className="text-teal-500">·</span>
            <span className="text-slate-300">English / বাংলা</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
