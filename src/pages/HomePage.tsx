import React from 'react';
import { RoutePath, Language, EnquiryCategory } from '../types';
import { translations } from '../data/translations';
import { fourVentures, publishedBooks } from '../data/siteContent';
import { assetConfig } from '../data/assetConfig';
import { ArrowRight, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { GaanChillSoundLounge } from '../components/GaanChillSoundLounge';
import { PolymathMatrix } from '../components/PolymathMatrix';
import { ThoughtTicker } from '../components/ThoughtTicker';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ScrollSection, ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { HeroBackgroundVideo } from '../components/HeroBackgroundVideo';

// Subtle staggered entrance animation variants for editorial polish
const heroTextContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const heroTextItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1], // fluid cubic-bezier for natural editorial deceleration
    },
  },
};

const sectionHeaderContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const sectionHeaderItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface HomePageProps {
  onNavigate: (route: RoutePath, preselectedCategory?: EnquiryCategory) => void;
  language: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* SECTION A: HERO (Extends up behind floating navbar so hero background shines through) */}
      <section className="relative overflow-hidden bg-[#080E15] text-white -mt-20 sm:-mt-24 pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 border-b border-teal-500/20">
        {/* Cinematic Google Flow Background Video Layer & Ambient Lighting */}
        <HeroBackgroundVideo language={language} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start py-6 sm:py-10">
            {/* Left Hero Content with Staggered Entrance */}
            <div className="lg:col-span-8 xl:col-span-9">
              <motion.div
                variants={heroTextContainerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 sm:space-y-8"
              >
                {/* Eyebrow with Pulsing Live Status Dot */}
                <motion.div variants={heroTextItemVariants}>
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-teal-950/60 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    <span>{t.brand.eyebrow}</span>
                  </div>
                </motion.div>

                {/* H1 & Dual Typography */}
                <motion.div variants={heroTextItemVariants} className="space-y-3">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white text-balance leading-[1.08] drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
                    {language === 'en' ? (
                      <>
                        <span className="font-montserrat font-bold tracking-tight inline-block text-white">
                          Asif Iqbal
                        </span>
                        <span className="block text-2xl sm:text-3xl font-stylish-bengali font-medium text-teal-300 pt-1 tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                          আসিফ ইকবাল
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-stylish-bengali font-bold tracking-wide inline-block">
                          আসিফ ইকবাল
                        </span>
                        <span className="block text-2xl sm:text-3xl font-montserrat font-bold text-teal-300 pt-1 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                          Asif Iqbal
                        </span>
                      </>
                    )}
                  </h1>

                  {/* Subtitle / Positioning Tagline */}
                  <div className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    {t.brand.positioning}
                  </div>
                </motion.div>

                {/* Body Summary */}
                <motion.p
                  variants={heroTextItemVariants}
                  className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                >
                  "{t.brand.heroSummary}"
                </motion.p>

                {/* Prestigious Brand Philosophy Line */}
                <motion.div
                  variants={heroTextItemVariants}
                  className="p-4 sm:p-5 rounded-xl bg-[#080E15]/50 backdrop-blur-md border-l-2 border-teal-400 border-y border-r border-white/10 text-sm sm:text-base text-slate-100 font-editorial italic max-w-2xl shadow-xl shadow-black/40"
                >
                  "{t.brand.brandLine}"
                </motion.div>

                {/* Action Buttons with Interactive Springs */}
                <motion.div variants={heroTextItemVariants} className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate('work')}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-2 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{t.brand.ctaWork}</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <button
                    onClick={() => onNavigate('story')}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-sm transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{t.brand.ctaStory}</span>
                  </button>
                </motion.div>
              </motion.div>
            </div>

            {/* Top Right Side Vertically: Impact & Career Stats Counters (Slender & Shifted Right) */}
            <div className="lg:col-span-4 xl:col-span-3 w-full flex justify-end">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[280px] sm:max-w-[290px] lg:max-w-[265px] xl:max-w-[280px] lg:ml-auto lg:translate-x-8 xl:translate-x-12 2xl:translate-x-16 rounded-2xl bg-[#0B1522]/85 backdrop-blur-xl border border-teal-500/30 shadow-2xl shadow-black/70 p-4 sm:p-4.5 relative overflow-hidden"
              >
                {/* Subtle Ambient Decorative Glows */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Vertical Header Badge */}
                <div className="relative z-10 flex items-center justify-between pb-2.5 mb-2.5 border-b border-teal-500/20">
                  <div className="inline-flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-teal-300 font-semibold">
                      {language === 'en' ? 'Key Milestones' : 'মূল মাইলফলক'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {language === 'en' ? 'Track' : 'পথচলা'}
                  </span>
                </div>

                {/* Vertical Stack of Stats */}
                <div className="relative z-10 flex flex-col divide-y divide-teal-500/15">
                  {/* Stat 1: Corporate Turnaround */}
                  <div className="py-2.5 first:pt-0 last:pb-0 space-y-0.5">
                    <div className="flex items-baseline justify-between gap-1.5">
                      <div className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-teal-300 drop-shadow-[0_2px_8px_rgba(13,148,136,0.3)]">
                        <AnimatedCounter value={30} suffix="+" className="text-teal-300" />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-teal-300/90 bg-teal-950/70 border border-teal-500/30 px-1.5 py-0.5 rounded-full">
                        C-Suite
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-200 leading-snug">
                      {language === 'en' ? 'Years Corporate Turnaround' : 'বছর করপোরেট রূপান্তর'}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">
                      Meghna, City Group, Shwapno
                    </p>
                  </div>

                  {/* Stat 2: Recorded Lyric Compositions */}
                  <div className="py-2.5 first:pt-0 last:pb-0 space-y-0.5">
                    <div className="flex items-baseline justify-between gap-1.5">
                      <div className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]">
                        <AnimatedCounter value={1000} suffix="+" className="text-amber-400" />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300/90 bg-amber-950/70 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                        Poetic Soul
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-200 leading-snug">
                      {language === 'en' ? 'Recorded Lyric Compositions' : 'রেকর্ডকৃত আধুনিক গান'}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">
                      42+ years poetic craftsmanship
                    </p>
                  </div>

                  {/* Stat 3: Women Artisans Empowered */}
                  <div className="py-2.5 first:pt-0 last:pb-0 space-y-0.5">
                    <div className="flex items-baseline justify-between gap-1.5">
                      <div className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-emerald-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                        <AnimatedCounter value={900} suffix="+" className="text-emerald-400" />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-300/90 bg-emerald-950/70 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                        ASIX Craft
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-200 leading-snug">
                      {language === 'en' ? 'Women Artisans Empowered' : 'নারী কারুশিল্পীর ক্ষমতায়ন'}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">
                      ASIX craft exports to 20+ countries
                    </p>
                  </div>

                  {/* Stat 4: Audience & Cultural Reach */}
                  <div className="py-2.5 first:pt-0 last:pb-0 space-y-0.5">
                    <div className="flex items-baseline justify-between gap-1.5">
                      <div className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-cyan-300 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]">
                        <AnimatedCounter value={12} suffix="M+" className="text-cyan-300" />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-cyan-300/90 bg-cyan-950/70 border border-cyan-500/30 px-1.5 py-0.5 rounded-full">
                        Impact
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-200 leading-snug">
                      {language === 'en' ? 'Audience & Cultural Reach' : 'শ্রোতা ও তরুণদের স্পর্শ'}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">
                      Songs, books & IBA classrooms
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: LATEST THOUGHTS TICKER (Enhances Polymath Branding) */}
      <ThoughtTicker language={language} onNavigate={onNavigate} />

      {/* SECTION D: THE FOUR POLYMATH PILLARS (Interactive Tabbed Explorer with Scroll Reveal) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionHeaderContainerVariants}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <motion.div variants={sectionHeaderItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'en' ? 'The Convergence Architecture' : 'চারটি মূল শক্তির মেলবন্ধন'}</span>
          </motion.div>
          <motion.h2 variants={sectionHeaderItemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
            {t.home.connectingIdeaHeading}
          </motion.h2>
          <motion.p variants={sectionHeaderItemVariants} className="text-base sm:text-lg text-slate-300 leading-relaxed font-body">
            {t.home.connectingIdeaParagraph}
          </motion.p>
        </motion.div>

        {/* Dynamic Polymath Matrix Component */}
        <ScrollReveal delay={0.15}>
          <PolymathMatrix language={language} onNavigate={onNavigate} />
        </ScrollReveal>
      </ScrollSection>

      {/* SECTION E: GAANCHILL SOUND LOUNGE (Scroll Fade and Slide In) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6">
        <GaanChillSoundLounge
          language={language}
          onExploreMore={() => onNavigate('music')}
        />
      </ScrollSection>

      {/* SECTION F: FOUR VENTURES (Staggered Bento Grid on Scroll) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionHeaderContainerVariants}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6"
        >
          <div className="space-y-2">
            <motion.span variants={sectionHeaderItemVariants} className="block text-xs font-semibold tracking-wider uppercase text-teal-400">
              {language === 'en' ? 'Operating Architecture' : 'প্রতিষ্ঠিত উদ্যোগসমূহ'}
            </motion.span>
            <motion.h2 variants={sectionHeaderItemVariants} className="font-display text-3xl sm:text-4xl font-bold text-white">
              {t.home.venturesHeading}
            </motion.h2>
            <motion.p variants={sectionHeaderItemVariants} className="text-sm text-slate-400">
              {t.home.venturesSubheading}
            </motion.p>
          </div>
          <motion.div variants={sectionHeaderItemVariants}>
            <button
              onClick={() => onNavigate('work')}
              className="text-xs font-bold uppercase tracking-wider text-teal-700 hover:text-teal-900 inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>{language === 'en' ? 'View all ventures' : 'সকল উদ্যোগ দেখুন'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fourVentures.map((venture) => (
            <StaggerItem key={venture.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full p-8 rounded-2xl bg-white border border-slate-200 hover:border-teal-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-teal-800 font-semibold px-2.5 py-1 rounded bg-teal-50 border border-teal-200/50">
                      {language === 'en' ? venture.relationshipEn : venture.relationshipBn}
                    </span>
                    {venture.officialUrl && (
                      <a
                        href={venture.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors inline-flex items-center gap-1 ${
                          venture.officialUrl.includes('youtube.com')
                            ? 'text-red-600 hover:text-red-700'
                            : 'text-slate-500 hover:text-teal-700'
                        }`}
                        title={venture.officialUrl.includes('youtube.com') ? 'Official YouTube Channel' : 'Visit official website'}
                      >
                        {venture.officialUrl.includes('youtube.com') && (
                          <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        )}
                        <span className="text-[11px] font-medium">
                          {venture.officialUrl.includes('youtube.com') ? 'YouTube' : 'Official Site'}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#0D161F] group-hover:text-teal-600 transition-colors">
                    {language === 'en' ? venture.name : venture.nameBn}
                  </h3>

                  <div className="text-xs font-semibold text-amber-600">
                    {language === 'en' ? venture.taglineEn : venture.taglineBn}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed pt-1 font-body">
                    {language === 'en' ? venture.descriptionEn : venture.descriptionBn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('work')}
                    className="text-xs font-bold text-teal-600 hover:text-teal-800 uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Learn more' : 'বিস্তারিত জানুন'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-400">Active</span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>

      {/* SECTION G: BIOGRAPHICAL ESSAY SPOTLIGHT */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B131B] via-[#101D2A] to-[#0A121A] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-teal-500/20 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionHeaderContainerVariants}
              className="lg:col-span-8 space-y-6"
            >
              <motion.span variants={sectionHeaderItemVariants} className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold flex items-center gap-2">
                <span>{language === 'en' ? 'Biographical Chapter' : 'জীবনের গল্প'}</span>
                <span>·</span>
                <span className="text-slate-400">{language === 'en' ? 'From Chittagong to Global Stage' : 'চট্টগ্রাম থেকে বিশ্বমঞ্চে'}</span>
              </motion.span>

              <motion.h2 variants={sectionHeaderItemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
                {t.home.storyPreviewHeading}
              </motion.h2>

              <motion.p variants={sectionHeaderItemVariants} className="text-base sm:text-lg text-slate-300 leading-relaxed font-body">
                {t.home.storyPreviewExcerpt}
              </motion.p>

              <motion.div variants={sectionHeaderItemVariants} className="pt-2">
                <button
                  onClick={() => onNavigate('story')}
                  className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  <span>{t.home.storyPreviewLink}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-4"
            >
              <div className="font-editorial italic text-xl text-amber-300 leading-relaxed">
                "{language === 'en'
                  ? 'True effort is the sovereign currency under our control. The tree is known by its fruits.'
                  : 'চেষ্টাই মানুষের একমাত্র সার্বভৌম শক্তি। ফলেই বৃক্ষের আসল পরিচয়।'}"
              </div>
              <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                {language === 'en'
                  ? 'From Red Crescent volunteering in his youth to the classrooms of Dhaka University, learning through action remains his compass.'
                  : 'কৈশোরের সমাজসেবা থেকে বিশ্ববিদ্যালয়ের শ্রেণিকক্ষ—কাজের মধ্য দিয়ে শেখাই তাঁর জীবনের ব্রত।'}
              </p>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* SECTION H: BOOKS & INTELLECTUAL FRAMEWORKS (Staggered Grid) */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionHeaderContainerVariants}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6"
        >
          <div className="space-y-2">
            <motion.span variants={sectionHeaderItemVariants} className="block text-xs font-semibold tracking-wider uppercase text-teal-400">
              {language === 'en' ? 'Intellectual Architecture' : 'বই ও বুদ্ধিবৃত্তিক কাজ'}
            </motion.span>
            <motion.h2 variants={sectionHeaderItemVariants} className="font-display text-3xl sm:text-4xl font-bold text-white">
              {t.home.ideasPreviewHeading}
            </motion.h2>
            <motion.p variants={sectionHeaderItemVariants} className="text-sm text-slate-400">
              {t.home.ideasPreviewSubheading}
            </motion.p>
          </div>
          <motion.div variants={sectionHeaderItemVariants}>
            <button
              onClick={() => onNavigate('ideas')}
              className="text-xs font-bold uppercase tracking-wider text-teal-600 hover:text-teal-800 inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>{language === 'en' ? 'Open interactive framework' : 'ভাবনা ও মডেল দেখুন'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedBooks.map((book) => (
            <StaggerItem key={book.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`h-full p-7 rounded-2xl border flex flex-col justify-between space-y-4 shadow-sm transition-all ${
                  book.type === 'manuscript'
                    ? 'bg-gradient-to-br from-[#0D161F] to-[#12202E] text-white border-teal-500/30 shadow-xl'
                    : 'bg-white text-[#0D161F] border-slate-200 hover:border-teal-500/40'
                }`}
              >
                <div className="space-y-3">
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                    book.type === 'manuscript' ? 'text-teal-400' : 'text-teal-700'
                  }`}>
                    {language === 'en' ? book.statusEn : book.statusBn}
                  </span>
                  <h3 className="font-display text-2xl font-bold">
                    {language === 'en' ? book.titleEn : book.titleBn}
                  </h3>
                  <p className={`text-xs ${book.type === 'manuscript' ? 'text-slate-300' : 'text-slate-500'}`}>
                    {language === 'en' ? book.subtitleEn : book.subtitleBn}
                  </p>
                </div>

                <p className={`text-xs leading-relaxed ${book.type === 'manuscript' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {language === 'en' ? book.themeEn : book.themeBn}
                </p>

                <button
                  onClick={() => onNavigate('ideas')}
                  className={`text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer pt-2 ${
                    book.type === 'manuscript' ? 'text-teal-300 hover:text-white' : 'text-teal-600 hover:text-teal-800'
                  }`}
                >
                  <span>{language === 'en' ? 'Read framework' : 'মডেলটি পড়ুন'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>

      {/* SECTION I: CLOSING INVITATION WITH INTERACTIVE CARDS */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#080E15] via-[#0E1722] to-[#0A121A] text-white p-8 sm:p-12 lg:p-16 space-y-8 border border-teal-500/20 shadow-2xl relative overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionHeaderContainerVariants}
            className="max-w-2xl space-y-3"
          >
            <motion.div variants={sectionHeaderItemVariants} className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold">
              {language === 'en' ? 'Direct Communication' : 'সরাসরি যোগাযোগ'}
            </motion.div>
            <motion.h2 variants={sectionHeaderItemVariants} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {t.home.closingHeading}
            </motion.h2>
            <motion.p variants={sectionHeaderItemVariants} className="text-base text-slate-300 leading-relaxed font-body">
              {t.home.closingSubheading}
            </motion.p>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <StaggerItem>
              <button
                onClick={() => onNavigate('contact', 'business')}
                className="w-full h-full p-6 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-teal-500/50 text-left transition-all cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="text-xs font-mono text-teal-400 font-semibold">Route 01</div>
                <div className="font-display text-lg font-bold text-white pt-1">
                  {language === 'en' ? 'Business Transformation' : 'করপোরেট রূপান্তর'}
                </div>
                <div className="text-xs text-slate-400 pt-3 flex items-center gap-1 group-hover:text-teal-300">
                  <span>{language === 'en' ? 'Consulting Inquiries' : 'পরামর্শ সেবা'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </StaggerItem>

            <StaggerItem>
              <button
                onClick={() => onNavigate('contact', 'speaking')}
                className="w-full h-full p-6 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-teal-500/50 text-left transition-all cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="text-xs font-mono text-teal-400 font-semibold">Route 02</div>
                <div className="font-display text-lg font-bold text-white pt-1">
                  {language === 'en' ? 'Speaking & Keynotes' : 'সম্মেলন ও বক্তৃতা'}
                </div>
                <div className="text-xs text-slate-400 pt-3 flex items-center gap-1 group-hover:text-teal-300">
                  <span>{language === 'en' ? 'University / Summits' : 'আমন্ত্রণ জানান'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </StaggerItem>

            <StaggerItem>
              <button
                onClick={() => onNavigate('contact', 'creative')}
                className="w-full h-full p-6 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-teal-500/50 text-left transition-all cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="text-xs font-mono text-teal-400 font-semibold">Route 03</div>
                <div className="font-display text-lg font-bold text-white pt-1">
                  {language === 'en' ? 'Music Collaboration' : 'সংগীত ও সাহিত্য'}
                </div>
                <div className="text-xs text-slate-400 pt-3 flex items-center gap-1 group-hover:text-teal-300">
                  <span>{language === 'en' ? 'GaanChill Platform' : 'সৃজনশীল মেলবন্ধন'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </StaggerItem>

            <StaggerItem>
              <button
                onClick={() => onNavigate('contact', 'media')}
                className="w-full h-full p-6 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-teal-500/50 text-left transition-all cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="text-xs font-mono text-teal-400 font-semibold">Route 04</div>
                <div className="font-display text-lg font-bold text-white pt-1">
                  {language === 'en' ? 'Journalism & Media' : 'গণমাধ্যম ও তথ্য'}
                </div>
                <div className="text-xs text-slate-400 pt-3 flex items-center gap-1 group-hover:text-teal-300">
                  <span>{language === 'en' ? 'Press & Bio Assets' : 'প্রেস যোগাযোগ'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </ScrollSection>
    </div>
  );
};
