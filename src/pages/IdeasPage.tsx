import React, { useState } from 'react';
import { RoutePath, Language, EnquiryCategory } from '../types';
import { translations } from '../data/translations';
import { publishedBooks, strategicPillars, aimFrameworks } from '../data/siteContent';
import { InteractiveFramework } from '../components/InteractiveFramework';
import { Lightbulb, ArrowRight, ArrowUpRight, ShoppingBag, Upload, Camera, Link2, RotateCcw, Check, X, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSection, ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { resolveCoverUrl } from '../utils/imageUtils';

interface IdeasPageProps {
  onNavigate: (route: RoutePath, preselectedCategory?: EnquiryCategory) => void;
  language: Language;
}

export const IdeasPage: React.FC<IdeasPageProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  const publishedWorks = publishedBooks.filter((b) => b.type === 'published');
  const manuscriptWorks = publishedBooks.filter((b) => b.type === 'manuscript');

  const [customCovers, setCustomCovers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('asif_custom_book_covers');
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      const cleaned: Record<string, string> = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'string' && (v.startsWith('http') || (v.startsWith('data:image') && v.length > 1000))) {
          cleaned[k] = v;
        }
      }
      return cleaned;
    } catch {
      return {};
    }
  });

  // Google Drive & Upload modal state
  const [selectedBookForDrive, setSelectedBookForDrive] = useState<string | null>(null);
  const [driveUrlInput, setDriveUrlInput] = useState('');
  const [driveLinkError, setDriveLinkError] = useState('');

  const saveCustomCover = async (bookId: string, urlOrBase64: string) => {
    const finalUrl = resolveCoverUrl(urlOrBase64);
    setCustomCovers((prev) => {
      const updated = { ...prev, [bookId]: finalUrl };
      try {
        localStorage.setItem('asif_custom_book_covers', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await fetch('/api/upload-book-cover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, base64Data: finalUrl }),
      });
    } catch (err) {
      console.warn('Cover upload server sync:', err);
    }
  };

  const handleFileUpload = (bookId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      if (base64Data) {
        saveCustomCover(bookId, base64Data);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMultipleFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      const name = file.name.toLowerCase();
      let targetId = '';
      if (name.includes('1000033103') || name.includes('1000025304') || name.includes('lokkho') || name.includes('otut')) {
        targetId = 'jodi-lokkho-thake-otut';
      } else if (name.includes('wa0000') || name.includes('bhabia') || name.includes('kaj')) {
        targetId = 'bhabia-korio-kaaj';
      } else {
        targetId = 'jodi-lokkho-thake-otut';
      }
      if (targetId) {
        handleFileUpload(targetId, file);
      }
    });
  };

  const handleApplyDriveLink = () => {
    if (!selectedBookForDrive) return;
    if (!driveUrlInput.trim()) {
      setDriveLinkError(language === 'en' ? 'Please paste a valid Google Drive link' : 'একটি গুগল ড্রাইভ লিঙ্ক প্রদান করুন');
      return;
    }
    const resolved = resolveCoverUrl(driveUrlInput);
    saveCustomCover(selectedBookForDrive, resolved);
    setSelectedBookForDrive(null);
    setDriveUrlInput('');
    setDriveLinkError('');
  };

  const handleResetCover = (bookId: string) => {
    setCustomCovers((prev) => {
      const updated = { ...prev };
      delete updated[bookId];
      try {
        localStorage.setItem('asif_custom_book_covers', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-10 pb-24">
      {/* Header */}
      <ScrollSection yOffset={24} className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold tracking-wider uppercase">
            <Lightbulb className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'en' ? 'Intellectual Architecture' : 'বুদ্ধিবৃত্তিক চিন্তন ও দর্শন'}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D161F] tracking-tight">
            {language === 'en' ? 'Books, Strategic Pillars & Models' : 'বই, কৌশলগত স্তম্ভ ও চিন্তার রূপরেখা'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
            {language === 'en'
              ? 'Published books on focus and decision-making, core transformation pillars, executive mentoring frameworks, and the contemplative manuscript model "সাফল্যের পথ নক্সা".'
              : 'মানসিক দক্ষতার উন্নয়ন ও সিদ্ধান্ত গ্রহণের ওপর প্রকাশিত গ্রন্থ, চার কৌশলগত স্তম্ভ এবং পাণ্ডুলিপিভিত্তিক চিন্তন রূপরেখা।'}
          </p>
        </div>
      </ScrollSection>

      {/* PART 1: PUBLISHED BOOKS (Scroll Stagger Reveal) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-8">
        <ScrollReveal className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Section 01</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
              {language === 'en' ? 'Published Books' : 'প্রকাশিত গ্রন্থসমূহ'}
            </h2>
            <p className="text-xs text-slate-500 pt-1">
              {language === 'en'
                ? 'Works translating lived leadership experience and Bengali proverbs into cognitive frameworks.'
                : 'বাস্তব জীবনের অভিজ্ঞতা ও বাঙালির চিরায়ত প্রজ্ঞার সমন্বয়ে রচিত গ্রন্থসমূহ।'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setSelectedBookForDrive('jodi-lokkho-thake-otut');
                setDriveUrlInput('');
                setDriveLinkError('');
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm hover:shadow transition-all group"
            >
              <Link2 className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              <span>{language === 'en' ? 'Add Google Drive Link' : 'গুগল ড্রাইভ লিঙ্ক যুক্ত করুন'}</span>
            </button>

            <label className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm hover:shadow transition-all group">
              <Upload className="w-3.5 h-3.5 text-teal-400 group-hover:-translate-y-0.5 transition-transform" />
              <span>{language === 'en' ? 'Upload Book Photos' : 'আসল বইয়ের ছবি আপলোড'}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) handleMultipleFiles(e.target.files);
                }}
              />
            </label>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {publishedWorks.map((book) => (
            <StaggerItem key={book.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 hover:border-teal-500/50 hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {book.coverImage && (
                    <div className="shrink-0 mx-auto sm:mx-0 flex flex-col items-center gap-2.5">
                      <div
                        className="relative group/cover w-40 sm:w-44 aspect-[2/3] rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.18)] overflow-hidden border border-slate-200/80 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)] group-hover:scale-[1.02] transition-all duration-300 transform-gpu bg-slate-100"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleFileUpload(book.id, file);
                        }}
                      >
                        <img
                          src={resolveCoverUrl(customCovers[book.id] || book.coverImage)}
                          alt={language === 'en' ? book.titleEn : book.titleBn}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (book.id === 'jodi-lokkho-thake-otut') {
                              target.src = '/1000033103.jpg';
                            } else if (book.id === 'bhabia-korio-kaaj') {
                              target.src = '/IMG-20260226-WA0000.jpg';
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBookForDrive(book.id);
                            setDriveUrlInput('');
                            setDriveLinkError('');
                          }}
                          className="absolute inset-0 bg-[#0D161F]/80 backdrop-blur-xs opacity-0 group-hover/cover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white text-[11px] font-semibold cursor-pointer p-3 text-center z-10"
                          title={language === 'en' ? 'Click to add Google Drive link or upload photo' : 'গুগল ড্রাইভ লিঙ্ক বা ছবি যুক্ত করতে ক্লিক করুন'}
                        >
                          <Link2 className="w-5 h-5 text-teal-400 animate-pulse" />
                          <span>{language === 'en' ? 'Set Cover / Drive Link' : 'ড্রাইভ লিঙ্ক বা ছবি যুক্ত করুন'}</span>
                          <span className="text-[9px] text-slate-300 font-normal">Google Drive, PNG, JPG</span>
                        </button>
                      </div>

                      {/* Explicit button beneath cover for easy mobile/desktop access */}
                      <div className="flex items-center gap-1.5 w-full justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBookForDrive(book.id);
                            setDriveUrlInput('');
                            setDriveLinkError('');
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 text-[11px] font-medium transition-colors border border-slate-200"
                        >
                          <Link2 className="w-3 h-3 text-teal-600" />
                          <span>{language === 'en' ? 'Drive Link' : 'ড্রাইভ লিঙ্ক'}</span>
                        </button>
                        {customCovers[book.id] && (
                          <button
                            type="button"
                            onClick={() => handleResetCover(book.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-[11px] font-medium transition-colors border border-rose-200"
                            title={language === 'en' ? 'Reset to default cover' : 'আসল কভারে ফিরে যান'}
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{language === 'en' ? 'Reset' : 'রিসেট'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex-1 space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2.5">
                      <span className="font-mono text-teal-700 font-semibold px-2 py-0.5 rounded bg-teal-50">
                        {language === 'en' ? book.statusEn : book.statusBn}
                      </span>
                      <span className="font-medium text-slate-700">Asif Iqbal</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F] group-hover:text-teal-600 transition-colors">
                        {language === 'en' ? book.titleEn : book.titleBn}
                      </h3>
                      <p className="text-xs font-semibold text-amber-600">
                        {language === 'en' ? book.subtitleEn : book.subtitleBn}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                      {language === 'en' ? book.descriptionEn : book.descriptionBn}
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                        {language === 'en' ? 'Core Themes & Mental Models' : 'মূল প্রতিপাদ্য বিষয়'}
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {(language === 'en' ? book.keyTakeawaysEn : book.keyTakeawaysBn).map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-teal-600 font-bold">·</span>
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      {language === 'en' ? 'In Stock on Rokomari' : 'রকমারিতে পাওয়া যাচ্ছে'}
                    </span>
                  </div>

                  {book.orderUrl ? (
                    <a
                      href={book.orderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D161F] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer group"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span>{language === 'en' ? 'Order on Rokomari' : 'রকমারি থেকে অর্ডার করুন'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigate('contact')}
                      className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{language === 'en' ? 'Inquire about copies' : 'বই সংক্রান্ত তথ্য'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>

      {/* PART 2: THE INTERACTIVE MANUSCRIPT FRAMEWORK (সাফল্যের পথ নক্সা) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-6">
        <ScrollReveal className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Section 02</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
            {language === 'en' ? 'Manuscript Framework: A Path from Intention to Action' : 'পাণ্ডুলিপি চিন্তন: সাফল্যের পথ নক্সা'}
          </h2>
          <p className="text-xs text-slate-500 pt-1">
            {language === 'en'
              ? 'An interactive reading model adapted from the manuscript introduction "বৃক্ষ তোমার নাম কী?".'
              : 'আসিফ ইকবালের অপ্রকাশিত পাণ্ডুলিপি ‘বৃক্ষ তোমার নাম কী?’ থেকে গৃহীত রূপরেখা।'}
          </p>
        </ScrollReveal>

        {/* Embedded Interactive Framework */}
        <ScrollReveal delay={0.1}>
          <InteractiveFramework language={language} />
        </ScrollReveal>
      </ScrollSection>

      {/* PART 3: THE FOUR STRATEGIC PILLARS (Stagger Reveal) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-8">
        <ScrollReveal className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Section 03</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
            {language === 'en' ? 'Four Pillars of Strategic Transformation' : 'কৌশলগত রূপান্তরের চার ভিত্তি'}
          </h2>
          <p className="text-xs text-slate-500 pt-1">
            {language === 'en'
              ? 'The governing pillars behind Achieve Consulting and executive advisory engagements.'
              : 'অ্যাচিভ কনসাল্টিং এবং নেতৃত্ব পরামর্শের গভর্নিং প্রিন্সিপাল।'}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategicPillars.map((p) => (
            <StaggerItem key={p.number}>
              <motion.div
                whileHover={{ y: -3 }}
                className="h-full p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all"
              >
                <div className="text-xs font-mono text-teal-700 font-bold px-2 py-0.5 rounded bg-teal-50 w-fit">
                  Pillar {p.number}
                </div>
                <h3 className="font-display text-xl font-bold text-[#0D161F]">
                  {language === 'en' ? p.titleEn : p.titleBn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  {language === 'en' ? p.descEn : p.descBn}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>

      {/* PART 4: AIM (ACHIEVE IGNITE MENTORING) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-8">
        <ScrollReveal className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Section 04</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
            {language === 'en' ? 'AIM Frameworks: Achieve Ignite Mentoring' : 'এইম (AIM) কাঠামোর রূপরেখা'}
          </h2>
          <p className="text-xs text-slate-500 pt-1">
            {language === 'en'
              ? 'Executive cognitive and operational models deployed across enterprise advisory.'
              : 'শীর্ষ নির্বাহী এবং প্রতিষ্ঠানের জন্য প্রস্তুতকৃত বিশেষায়িত মডেল।'}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aimFrameworks.map((fw, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -2 }}
                className="h-full p-6 rounded-2xl bg-white border border-slate-200 space-y-2 hover:border-teal-500/40 hover:shadow-md transition-all"
              >
                <div className="text-[11px] font-mono text-teal-700 font-semibold">
                  Model 0{idx + 1}
                </div>
                <h4 className="font-display text-lg font-bold text-[#0D161F]">
                  {fw.name}
                </h4>
                <p className="text-xs text-slate-600 font-body">
                  {language === 'en' ? fw.focusEn : fw.focusBn}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="p-4 sm:p-5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-body flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <span>
            {language === 'en'
              ? 'Detailed mechanics and proprietary toolkits are deployed exclusively during bespoke Achieve Consulting engagements.'
              : 'এই ফ্রেমওয়ার্কসমূহের বাস্তব প্রয়োগ ও ইন্টারনাল টুলকিট অ্যাচিভ কনসাল্টিংয়ের পরামর্শ সেবায় ব্যবহৃত হয়।'}
          </span>
          <a
            href="https://www.achieveconsultingbd.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 shrink-0 transition-colors"
          >
            <span>Visit Achieve Consulting</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </ScrollReveal>
      </ScrollSection>

      {/* Google Drive / Cover Upload Modal */}
      <AnimatePresence>
        {selectedBookForDrive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setSelectedBookForDrive(null);
              setDriveLinkError('');
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6 text-[#0D161F]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">
                      {language === 'en' ? 'Set Book Cover Image' : 'বইয়ের কভার ছবি পরিবর্তন করুন'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedBookForDrive === 'jodi-lokkho-thake-otut'
                        ? 'যদি লক্ষ্য থাকে অটুট'
                        : 'ভাবিয়া করিও কাজ'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedBookForDrive(null);
                    setDriveLinkError('');
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Book Selector Switcher */}
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setSelectedBookForDrive('jodi-lokkho-thake-otut')}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${
                    selectedBookForDrive === 'jodi-lokkho-thake-otut'
                      ? 'bg-white shadow-xs text-teal-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  যদি লক্ষ্য থাকে অটুট
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBookForDrive('bhabia-korio-kaaj')}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${
                    selectedBookForDrive === 'bhabia-korio-kaaj'
                      ? 'bg-white shadow-xs text-teal-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ভাবিয়া করিও কাজ
                </button>
              </div>

              {/* Input for Google Drive Link */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  {language === 'en'
                    ? 'Paste Google Drive Link or Direct Image URL'
                    : 'গুগল ড্রাইভ লিঙ্ক অথবা ছবির সরাসরি লিঙ্ক পেস্ট করুন'}
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={driveUrlInput}
                    onChange={(e) => {
                      setDriveUrlInput(e.target.value);
                      setDriveLinkError('');
                    }}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-xs"
                  />
                  {driveUrlInput && (
                    <button
                      type="button"
                      onClick={() => setDriveUrlInput('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {driveLinkError && (
                  <p className="text-xs text-rose-600 font-medium">{driveLinkError}</p>
                )}

                <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-[11px] text-teal-800 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>{language === 'en' ? 'Google Drive Link Guide' : 'গুগল ড্রাইভ নির্দেশিকা'}</span>
                  </div>
                  <p className="text-slate-600 leading-normal">
                    {language === 'en'
                      ? 'In Google Drive, ensure sharing access is set to "Anyone with the link can view". The link will be instantly converted into a high-speed direct cover.'
                      : 'গুগল ড্রাইভের ফাইলটির শেয়ারিং অপশনে "Anyone with the link can view" নিশ্চিত করুন। লিঙ্কটি স্বয়ংক্রিয়ভাবে সরাসরি উচ্চ রেজুলেশন কভারে রূপান্তরিত হবে।'}
                  </p>
                </div>
              </div>

              {/* Or Device Upload */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-xs text-slate-400 font-medium shrink-0 uppercase tracking-wider">
                  {language === 'en' ? 'Or upload from device' : 'অথবা ডিভাইস থেকে আপলোড করুন'}
                </span>
              </div>

              <div>
                <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50 hover:bg-teal-50/30 cursor-pointer transition-colors text-center group">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-teal-600 mb-1 transition-colors" />
                  <span className="text-xs font-semibold text-slate-700">
                    {language === 'en' ? 'Select 1000033103.jpg or WA0000.jpg' : 'ফাইল নির্বাচন করুন (JPG / PNG)'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {language === 'en' ? 'Instant preview & save' : 'ক্লিক করে নির্বাচন করুন বা ড্রপ করুন'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && selectedBookForDrive) {
                        handleFileUpload(selectedBookForDrive, file);
                        setSelectedBookForDrive(null);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedBookForDrive) {
                      handleResetCover(selectedBookForDrive);
                      setSelectedBookForDrive(null);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Reset to Default' : 'আসল কভারে রিসেট'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBookForDrive(null);
                      setDriveLinkError('');
                    }}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
                  >
                    {language === 'en' ? 'Cancel' : 'বাতিল'}
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyDriveLink}
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Apply Link' : 'লিঙ্ক সংরক্ষণ করুন'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
