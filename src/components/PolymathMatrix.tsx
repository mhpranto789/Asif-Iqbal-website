import React, { useState } from 'react';
import { Language, RoutePath } from '../types';
import { Briefcase, Music, Sparkles, GraduationCap, ArrowRight, CheckCircle2, TrendingUp, Users, Globe2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter';

interface PolymathMatrixProps {
  language: Language;
  onNavigate: (route: RoutePath) => void;
}

export const PolymathMatrix: React.FC<PolymathMatrixProps> = ({ language, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'culture' | 'craft' | 'education'>('enterprise');

  const pillars = [
    {
      id: 'enterprise' as const,
      icon: Briefcase,
      titleEn: 'Enterprise & Turnaround',
      titleBn: 'করপোরেট রূপান্তর ও নেতৃত্ব',
      taglineEn: 'Turning Strategy into Operational Victory',
      taglineBn: 'কৌশলগত অন্তর্দৃষ্টি ও নিখুঁত বাস্তবায়ন',
      statNumber: 30,
      statSuffix: '+',
      statLabelEn: 'Years in Top Executive Leadership',
      statLabelBn: 'শীর্ষ নির্বাহী নেতৃত্বের অভিজ্ঞতা (বছর)',
      ventureEn: 'Achieve Consulting & ACIS',
      ventureBn: 'অ্যাচিভ কনসাল্টিং ও এসিআইএস',
      highlightsEn: [
        'Proprietary four-pillar transformation framework tested across FMCG giants and conglomerates',
        'Executive mental skill development through AIM (Achieve Ignite Mentoring)',
        'Directly spearheaded business turnaround at Meghna Group of Industries and City Group'
      ],
      highlightsBn: [
        'এফএমসিজি ও বৃহৎ শিল্পগ্রুপে সফলভাবে প্রয়োগকৃত রূপান্তর কৌশল',
        'এইম (AIM)-এর মাধ্যমে শীর্ষ কর্মকর্তাদের মানসিক ও কৌশলগত দক্ষতা বৃদ্ধি',
        'মেঘনা গ্রুপ অব ইন্ডাস্ট্রিজ ও সিটি গ্রুপের রূপান্তরে সরাসরি নেতৃত্ব'
      ],
      ctaRoute: 'work' as RoutePath,
      ctaTextEn: 'Explore Enterprise Ventures',
      ctaTextBn: 'উদ্যোগ ও রূপান্তর দেখুন',
      color: 'teal',
    },
    {
      id: 'culture' as const,
      icon: Music,
      titleEn: 'Songwriting & GaanChill',
      titleBn: 'গীতিকবিতা ও সংস্কৃতি',
      taglineEn: '42+ Years of Poetic Excellence',
      taglineBn: 'চার দশকেরও বেশি সময় ধরে আধুনিক গানের রূপরেখা',
      statNumber: 1000,
      statSuffix: '+',
      statLabelEn: 'Recorded Lyric Compositions',
      statLabelBn: 'রেকর্ডকৃত কালজয়ী আধুনিক গান',
      ventureEn: 'GaanChill Music',
      ventureBn: 'গানচিল মিউজিক',
      highlightsEn: [
        'Penned iconic classics including "Anonna" (Ayub Bachchu/LRB, 1988) and multi-generational anthems',
        'Founded GaanChill Music, discovering and launching breakthrough Bangladeshi musical talent',
        'Strictly credited as lyricist, championing intellectual property rights and lyrical depth'
      ],
      highlightsBn: [
        'আইয়ুব বাচ্চুর ‘অনন্যা’ (১৯৮৮) থেকে শুরু করে অসংখ্য জনপ্রিয় গানের গীতিকার',
        'গানচিল মিউজিকের মাধ্যমে নতুন প্রজন্মের অসাধারণ সংগীত প্রতিভা অন্বেষণ ও বিকাশ',
        'বাংলা গানের সমৃদ্ধ সাহিত্যমান ও শিল্পীস্বত্ব সুরক্ষায় অবিচল ভূমিকা'
      ],
      ctaRoute: 'music' as RoutePath,
      ctaTextEn: 'Discover Song Archive',
      ctaTextBn: 'সংগীত ক্যাটালগ দেখুন',
      color: 'amber',
    },
    {
      id: 'craft' as const,
      icon: Sparkles,
      titleEn: 'Artisan Heritage & ASIX',
      titleBn: 'দেশীয় কারুশিল্প ও জীবিকায়ন',
      taglineEn: 'Empowering 900+ Rural Women Artisans',
      taglineBn: '৯০০+ গ্রামীণ নারীর টেকসই জীবিকা',
      statNumber: 20,
      statSuffix: '+',
      statLabelEn: 'Export Destination Countries',
      statLabelBn: 'রপ্তানিকৃত আন্তর্জাতিক দেশ',
      ventureEn: 'ASIX Bangladesh',
      ventureBn: 'এসিক্স (ASIX)',
      highlightsEn: [
        'Co-founded ASIX to bridge indigenous Bangladeshi handloom craft with global lifestyle buyers',
        'Fair-trade social enterprise providing dignified economic independence to rural craftswomen',
        'Preserving endangered natural dyeing, Jamdani, and traditional weaving techniques'
      ],
      highlightsBn: [
        'বাংলার লোকজ তাঁত ও কারুশিল্পকে বিশ্ববাজারে তুলে ধরতে এসিক্স-এর প্রতিষ্ঠা',
        'ন্যায্য মজুরি ও টেকসই জীবিকার মাধ্যমে প্রান্তিক নারী শিল্পীদের অর্থনৈতিক ক্ষমতায়ন',
        'ঐতিহ্যবাহী জামদানি ও দেশীয় সুতা প্রক্রিয়াজাতকরণের ঐতিহ্য সংরক্ষণ'
      ],
      ctaRoute: 'work' as RoutePath,
      ctaTextEn: 'Explore ASIX Social Enterprise',
      ctaTextBn: 'এসিক্স উদ্যোগের বিস্তারিত',
      color: 'emerald',
    },
    {
      id: 'education' as const,
      icon: GraduationCap,
      titleEn: 'Education & Mentorship',
      titleBn: 'শিক্ষা ও তরুণ নেতৃত্ব',
      taglineEn: 'Shaping Tomorrow’s Visionary Builders',
      taglineBn: 'আগামীর নেতৃত্ব ও সমাজ বিনির্মাণ',
      statNumber: 15,
      statSuffix: '+',
      statLabelEn: 'Years Adjunct Faculty at IBA Dhaka University',
      statLabelBn: 'আইবিএ ঢাকা বিশ্ববিদ্যালয়ে শিক্ষকতা (বছর)',
      ventureEn: 'IBA University of Dhaka & Drishty',
      ventureBn: 'আইবিএ ও দৃষ্টি চট্টগ্রাম',
      highlightsEn: [
        'Adjunct faculty member at the Institute of Business Administration (IBA), University of Dhaka',
        'President of Drishty Chittagong, pioneering youth debate, public speaking, and ideation contests',
        'Author of best-selling career mentorship books "Kothopokothon" and transformation guides'
      ],
      highlightsBn: [
        'আইবিএ, ঢাকা বিশ্ববিদ্যালয়ে দীর্ঘ দেড় দশক ধরে নিয়মিত পাঠদান ও মেন্টরিং',
        'দৃষ্টি চট্টগ্রামের সভাপতি হিসেবে তরুণদের বিতর্ক, উপস্থাপনা ও মেধা বিকাশের নেতৃত্ব',
        'জনপ্রিয় বই ‘কথোপকথন’ ও রূপান্তর বিষয়ক গ্রন্থের প্রণেতা'
      ],
      ctaRoute: 'ideas' as RoutePath,
      ctaTextEn: 'Read Books & Frameworks',
      ctaTextBn: 'বই ও চিন্তন রূপরেখা দেখুন',
      color: 'blue',
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab)!;

  return (
    <div className="space-y-8">
      {/* Interactive Tabs Header */}
      <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = activeTab === pillar.id;

          return (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`relative px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer flex-1 justify-center whitespace-nowrap ${
                isActive
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePillarTab"
                  className="absolute inset-0 bg-[#0D161F] rounded-xl shadow-md"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{language === 'en' ? pillar.titleEn : pillar.titleBn}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Panel with Framer Motion AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPillar.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-2xl bg-white border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-teal-600 font-semibold flex items-center gap-2">
                  <span>{currentPillar.ventureEn}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 font-normal">{language === 'en' ? currentPillar.titleEn : currentPillar.titleBn}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#0D161F] font-bold tracking-tight">
                  {language === 'en' ? currentPillar.taglineEn : currentPillar.taglineBn}
                </h3>
              </div>

              {/* Bullet highlights */}
              <div className="space-y-3">
                {(language === 'en' ? currentPillar.highlightsEn : currentPillar.highlightsBn).map(
                  (item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span>{item}</span>
                        {(item.includes('Anonna') || item.includes('অনন্যা')) && (
                          <a
                            href="https://open.spotify.com/track/6j1FTv81yFdARO7LQPfwsj?si=11dedbc2f7fb4051"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1DB954]/15 hover:bg-[#1DB954]/25 text-[#15803d] hover:text-[#16a34a] text-xs font-semibold transition-colors align-middle"
                            title="Listen to Anonna on Spotify"
                          >
                            <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                            <span>Spotify</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate(currentPillar.ctaRoute)}
                  className="px-5 py-2.5 rounded-xl bg-[#0D161F] hover:bg-teal-700 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>{language === 'en' ? currentPillar.ctaTextEn : currentPillar.ctaTextBn}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                </button>

                {currentPillar.id === 'enterprise' && (
                  <a
                    href="https://www.achieveconsultingbd.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-700 hover:text-teal-900 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Visit Achieve Consulting' : 'অ্যাচিভ কনসাল্টিং ওয়েবসাইট'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                  </a>
                )}

                {currentPillar.id === 'culture' && (
                  <>
                    <a
                      href="https://open.spotify.com/track/6j1FTv81yFdARO7LQPfwsj?si=11dedbc2f7fb4051"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-[#1DB954]/15 hover:bg-[#1DB954]/25 border border-[#1DB954]/40 text-[#15803d] hover:text-[#16a34a] text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                      <span>Spotify: "Anonna"</span>
                    </a>

                    <a
                      href="https://youtu.be/KUff03C8Ki0?si=gaXZ6MDOQuWoQb0O"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-red-600/15 hover:bg-red-600/25 border border-red-500/40 text-red-600 hover:text-red-700 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>YouTube: "O Priyotoma"</span>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Right Metric Stat Spotlight (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0F1C28] to-[#0A1118] text-white p-8 rounded-2xl shadow-inner border border-teal-500/20 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold">
                  {language === 'en' ? 'Verified Impact' : 'প্রমাণিত প্রভাব'}
                </span>
                <currentPillar.icon className="w-6 h-6 text-amber-400" />
              </div>

              <div className="relative z-10 py-4">
                <div className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white flex items-baseline gap-1">
                  <AnimatedCounter
                    value={currentPillar.statNumber}
                    suffix={currentPillar.statSuffix}
                    className="gradient-text-teal"
                  />
                </div>
                <p className="text-sm text-slate-300 pt-2 font-medium">
                  {language === 'en' ? currentPillar.statLabelEn : currentPillar.statLabelBn}
                </p>
              </div>

              <div className="relative z-10 text-[11px] text-slate-400 border-t border-white/10 pt-3">
                {language === 'en'
                  ? 'Grounded in institutional continuity and measurable results.'
                  : 'দীর্ঘমেয়াদী স্থায়িত্ব ও বাস্তবমুখী ফলাফলের ওপর প্রতিষ্ঠিত।'}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
