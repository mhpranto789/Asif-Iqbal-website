import React from 'react';
import { RoutePath, Language, EnquiryCategory } from '../types';
import { translations } from '../data/translations';
import { fourVentures, careerMilestones } from '../data/siteContent';
import { ArrowUpRight, CheckCircle2, Globe, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSection, ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface WorkPageProps {
  onNavigate: (route: RoutePath, preselectedCategory?: EnquiryCategory) => void;
  language: Language;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <div className="space-y-16 lg:space-y-24 py-10 pb-24">
      {/* Header */}
      <ScrollSection yOffset={24} className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'en' ? 'Enterprise & Leadership' : 'উদ্যোগ ও করপোরেট নেতৃত্ব'}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D161F] tracking-tight">
            {language === 'en' ? 'Ventures & Corporate Transformation' : 'উদ্যোগসমূহ ও বাণিজ্যিক রূপান্তর'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
            {language === 'en'
              ? 'Delineating active entrepreneurial ventures founded and co-founded by Asif Iqbal from three decades of executive corporate turnaround leadership across twelve industry verticals.'
              : 'আসিফ ইকবালের প্রতিষ্ঠিত ও পরিচালিত চারটি প্রাতিষ্ঠানিক উদ্যোগ এবং তিন দশকের শীর্ষ করপোরেট নেতৃত্বের বাস্তব অভিজ্ঞতার চালচিত্র।'}
          </p>
        </div>
      </ScrollSection>

      {/* PART 1: THE FOUR ACTIVE VENTURES (Intersection Observer Scroll Animation) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-10">
        <ScrollReveal className="border-b border-slate-200 pb-5">
          <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Section 01</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
            {language === 'en' ? 'Active Entrepreneurial Ventures' : 'সক্রিয় প্রাতিষ্ঠানিক উদ্যোগসমূহ'}
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {fourVentures.map((venture) => (
              <StaggerItem key={venture.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-8 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 hover:border-teal-500/50 hover:shadow-xl transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-teal-700 font-semibold px-2.5 py-1 rounded bg-teal-50">
                        {language === 'en' ? venture.relationshipEn : venture.relationshipBn}
                      </span>
                      {venture.officialUrl && (
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Globe className="w-3 h-3 text-teal-600" />
                          <span>Verified Web</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F] group-hover:text-teal-600 transition-colors">
                        {language === 'en' ? venture.name : venture.nameBn}
                      </h3>
                      <p className="text-xs font-semibold text-amber-600">
                        {language === 'en' ? venture.taglineEn : venture.taglineBn}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-body">
                      {language === 'en' ? venture.descriptionEn : venture.descriptionBn}
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                        {language === 'en' ? 'Operating Philosophy' : 'পরিচালনা দর্শন'}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {language === 'en' ? venture.operatingModelEn : venture.operatingModelBn}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {language === 'en' ? 'Core Capabilities' : 'মূল কার্যক্রম'}
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {(language === 'en' ? venture.keyHighlightsEn : venture.keyHighlightsBn).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onNavigate('contact', venture.enquiryType)}
                      className="px-4 py-2.5 rounded-xl bg-[#0D161F] hover:bg-teal-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                    >
                      {language === 'en' ? 'Inquire / Collaborate' : 'পরামর্শ / যোগাযোগ'}
                    </button>

                    {venture.officialUrl && (
                      <a
                        href={venture.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                          venture.officialUrl.includes('youtube.com')
                            ? 'text-red-600 hover:text-red-700'
                            : 'text-teal-700 hover:text-teal-900'
                        }`}
                      >
                        {venture.officialUrl.includes('youtube.com') && (
                          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        )}
                        <span>
                          {venture.officialUrl.includes('youtube.com')
                            ? language === 'en'
                              ? 'Official YouTube'
                              : 'অফিসিয়াল ইউটিউব'
                            : language === 'en'
                            ? 'Visit Venture'
                            : 'উদ্যোগ দেখুন'}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>
      </ScrollSection>

      {/* PART 2: SELECTED CORPORATE LEADERSHIP MILESTONES (Scroll Stagger Animation) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-10">
        <ScrollReveal className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Section 02</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
            {language === 'en' ? 'Corporate Leadership Record' : 'করপোরেট নেতৃত্বের বাস্তব অভিজ্ঞতা'}
          </h2>
          <p className="text-xs text-slate-500 pt-1">
            {language === 'en'
              ? 'Documented context, supported executive contribution, and reported outcomes across selected organisations.'
              : 'প্রতিষ্ঠানের প্রেক্ষাপট, নেতৃত্বমূলক ভূমিকা এবং বাস্তব ফলাফল সংক্রান্ত ঐতিহাসিক তথ্য।'}
          </p>
        </ScrollReveal>

        <StaggerContainer className="space-y-6">
          {careerMilestones.map((milestone) => (
            <StaggerItem key={milestone.id}>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-8 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#0D161F]">
                      {language === 'en' ? milestone.organisation : milestone.organisationBn}
                    </h3>
                    <div className="text-xs text-teal-700 font-semibold pt-0.5">
                      {language === 'en' ? milestone.periodOrRoleEn : milestone.periodOrRoleBn}
                    </div>
                  </div>

                  {milestone.isHistoricalNote && (
                    <span className="text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                      {language === 'en' ? 'Historical Milestone' : 'ঐতিহাসিক মাইলফলক'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {language === 'en' ? 'Market Context' : 'বাজার প্রেক্ষাপট'}
                    </span>
                    <p className="text-slate-600 text-xs leading-relaxed font-body">
                      {language === 'en' ? milestone.contextEn : milestone.contextBn}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 font-bold">
                      {language === 'en' ? 'Supported Contribution' : 'নেতৃত্ব ও ভূমিকা'}
                    </span>
                    <p className="text-[#0D161F] text-xs leading-relaxed font-body">
                      {language === 'en' ? milestone.contributionEn : milestone.contributionBn}
                    </p>
                  </div>

                  <div className="space-y-1 p-4 rounded-xl bg-gradient-to-br from-teal-50 to-white border border-teal-200/80">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-800">
                      {language === 'en' ? 'Reported Milestone Outcome' : 'অর্জিত ফলাফল'}
                    </span>
                    <p className="font-display text-base font-bold text-[#0D161F] leading-snug">
                      {language === 'en' ? milestone.reportedOutcomeEn : milestone.reportedOutcomeBn}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>

      {/* PART 3: REVIEWS & EDITORIAL STANDARDS NOTICE */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6">
        <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-[#0D161F] uppercase tracking-wider">
            {language === 'en' ? 'Editorial Transparency Note' : 'সম্পাদকীয় স্বচ্ছতা বিজ্ঞপ্তি'}
          </div>
          <p className="leading-relaxed font-body">
            {language === 'en'
              ? 'All corporate achievements and revenue milestones presented on this page are historical profile claims sourced from February 2026 documentation. Numerical figures represent supplied records and are not presented as live financial counters. Claims regarding specific corporate entities are distinguished from personal legal ownership.'
              : 'এই পৃষ্ঠায় উল্লেখিত সকল করপোরেট সাফল্য ও রাজস্ব প্রবৃদ্ধির পরিসংখ্যান ফেব্রুয়ারি ২০২৬-এর তথ্যের ভিত্তিতে পরিবেশিত। কোনো পরিসংখ্যানকে বর্তমান লাইভ মেট্রিক হিসেবে উপস্থাপন করা হয়নি। শীর্ষ নেতৃত্বমূলক ভূমিকার সাথে বাণিজ্যিক মালিকানার পার্থক্য সুস্পষ্টভাবে বজায় রাখা হয়েছে।'}
          </p>
        </div>
      </ScrollSection>
    </div>
  );
};
