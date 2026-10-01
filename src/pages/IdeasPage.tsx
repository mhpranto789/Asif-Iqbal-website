import React from 'react';
import { RoutePath, Language, EnquiryCategory } from '../types';
import { translations } from '../data/translations';
import { publishedBooks, strategicPillars, aimFrameworks } from '../data/siteContent';
import { InteractiveFramework } from '../components/InteractiveFramework';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollSection, ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface IdeasPageProps {
  onNavigate: (route: RoutePath, preselectedCategory?: EnquiryCategory) => void;
  language: Language;
}

export const IdeasPage: React.FC<IdeasPageProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  const publishedWorks = publishedBooks.filter((b) => b.type === 'published');
  const manuscriptWorks = publishedBooks.filter((b) => b.type === 'manuscript');

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
        <ScrollReveal className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Section 01</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
            {language === 'en' ? 'Published Books' : 'প্রকাশিত গ্রন্থসমূহ'}
          </h2>
          <p className="text-xs text-slate-500 pt-1">
            {language === 'en'
              ? 'Works translating lived leadership experience and Bengali proverbs into cognitive frameworks.'
              : 'বাস্তব জীবনের অভিজ্ঞতা ও বাঙালির চিরায়ত প্রজ্ঞার সমন্বয়ে রচিত গ্রন্থসমূহ।'}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedWorks.map((book) => (
            <StaggerItem key={book.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full p-8 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 hover:border-teal-500/50 hover:shadow-xl transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                    <span className="font-mono text-teal-700 font-semibold px-2 py-0.5 rounded bg-teal-50">
                      {language === 'en' ? book.statusEn : book.statusBn}
                    </span>
                    <span className="font-medium text-slate-700">Asif Iqbal</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-3xl font-bold text-[#0D161F] group-hover:text-teal-600 transition-colors">
                      {language === 'en' ? book.titleEn : book.titleBn}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600">
                      {language === 'en' ? book.subtitleEn : book.subtitleBn}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    {language === 'en' ? book.descriptionEn : book.descriptionBn}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
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

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {language === 'en' ? 'Physical editions in print' : 'মুদ্রিত সংস্করণ সহজলভ্য'}
                  </span>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{language === 'en' ? 'Inquire about copies' : 'বই সংক্রান্ত তথ্য'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
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

        <ScrollReveal className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-body">
          {language === 'en'
            ? 'Detailed mechanics and proprietary toolkits are deployed exclusively during bespoke Achieve Consulting engagements.'
            : 'এই ফ্রেমওয়ার্কসমূহের বাস্তব প্রয়োগ ও ইন্টারনাল টুলকিট অ্যাচিভ কনসাল্টিংয়ের পরামর্শ সেবায় ব্যবহৃত হয়।'}
        </ScrollReveal>
      </ScrollSection>
    </div>
  );
};
