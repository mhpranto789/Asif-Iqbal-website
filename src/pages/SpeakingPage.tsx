import React from 'react';
import { RoutePath, Language, EnquiryCategory } from '../types';
import { translations } from '../data/translations';
import { speakingThemes, educationAndService } from '../data/siteContent';
import { Mic, CheckCircle2, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollSection, ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface SpeakingPageProps {
  onNavigate: (route: RoutePath, preselectedCategory?: EnquiryCategory) => void;
  language: Language;
}

export const SpeakingPage: React.FC<SpeakingPageProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <div className="space-y-16 lg:space-y-24 py-10 pb-24">
      {/* Header */}
      <ScrollSection yOffset={24} className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold tracking-wider uppercase">
            <Mic className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'en' ? 'Keynotes & Education' : 'বক্তৃতা ও অ্যাকাডেমিক সম্পৃক্ততা'}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D161F] tracking-tight">
            {language === 'en' ? 'Speaking Themes & Dialogue' : 'মূল বক্তব্য ও ভাবনার বিনিময়'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
            {language === 'en'
              ? 'Addressing executive leadership summits, university business cohorts, and national youth forums on the intersection of strategic rigor, creative storytelling, and personal resilience.'
              : 'কৌশলগত দূরদর্শিতা, সৃজনশীল নেতৃত্ব এবং মানসিক শক্তির বিকাশ নিয়ে করপোরেট শীর্ষ সম্মেলন ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের সাথে নিয়মিত মতবিনিময়।'}
          </p>
        </div>
      </ScrollSection>

      {/* PART 1: CORE SPEAKING THEMES (Scroll Stagger Animation) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-8">
        <ScrollReveal className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Keynotes</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
              {language === 'en' ? 'Proposed Keynote Topics' : 'বক্তৃতার মূল বিষয়সমূহ'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            {language === 'en' ? 'Bespoke Curations' : 'অনুরোধ অনুযায়ী নির্বাচিত'}
          </span>
        </ScrollReveal>

        <StaggerContainer className="space-y-6">
          {speakingThemes.map((theme, idx) => (
            <StaggerItem key={theme.id}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-teal-500/50 shadow-sm hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
              >
                <div className="lg:col-span-4 space-y-2">
                  <div className="text-xs font-mono text-teal-700 font-semibold px-2 py-0.5 rounded bg-teal-50 w-fit">
                    Theme 0{idx + 1}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0D161F] group-hover:text-teal-600 transition-colors">
                    {language === 'en' ? theme.titleEn : theme.titleBn}
                  </h3>
                  <div className="text-xs text-slate-600 pt-1">
                    <span className="font-bold text-[#0D161F]">
                      {language === 'en' ? 'Ideal Audiences' : 'উপযুক্ত শ্রোতা'}:
                    </span>{' '}
                    {language === 'en' ? theme.audienceEn : theme.audienceBn}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    {language === 'en' ? theme.summaryEn : theme.summaryBn}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                      {language === 'en' ? 'Core Transformation Takeaways' : 'মূল শিক্ষণীয় বিষয়'}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {(language === 'en' ? theme.takeawaysEn : theme.takeawaysBn).map((item, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-3 flex flex-col justify-between h-full pt-2 lg:pt-0">
                  <button
                    onClick={() => onNavigate('contact', 'speaking')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0D161F] hover:bg-teal-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Book this Topic' : 'এই বিষয়ে আমন্ত্রণ'}</span>
                  </button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>

      {/* PART 2: ACADEMIC & SOCIAL COMMITMENT */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D161F] to-[#142332] text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-teal-500/20 shadow-xl">
          <ScrollReveal direction="up" className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold">
              {language === 'en' ? 'Social Impact & Faculty' : 'অ্যাকাডেমিক ও সামাজিক অঙ্গীকার'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {language === 'en' ? 'Teaching, Mentorship & Public Service' : 'শিক্ষকতা, দিকনির্দেশনা ও জনসেবা'}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
              {language === 'en' ? educationAndService.academicEn : educationAndService.academicBn}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-body">
              {language === 'en' ? educationAndService.humanitarianEn : educationAndService.humanitarianBn}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15} className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={() => onNavigate('contact', 'speaking')}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors text-center cursor-pointer shadow-md"
            >
              {language === 'en' ? 'Invite for University Lecture' : 'বিশ্ববিদ্যালয়ে বক্তৃতা আমন্ত্রণ'}
            </button>
            <button
              onClick={() => onNavigate('contact', 'media')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors text-center cursor-pointer"
            >
              {language === 'en' ? 'Press & Media Inquiry' : 'মিডিয়া ও প্রেস যোগাযোগ'}
            </button>
          </ScrollReveal>
        </div>
      </ScrollSection>
    </div>
  );
};
