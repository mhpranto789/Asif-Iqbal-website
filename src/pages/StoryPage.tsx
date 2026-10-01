import React, { useState, useRef } from 'react';
import { RoutePath, Language, EnquiryCategory } from '../types';
import { translations } from '../data/translations';
import { assetConfig } from '../data/assetConfig';
import { PortraitSlot } from '../components/PortraitSlot';
import { ScrollSection, ScrollReveal } from '../components/ScrollReveal';
import { calculateReadingTime } from '../utils/readingTime';
import { CareerTreeDiagram } from '../components/CareerTreeDiagram';
import { StoryAudioNarrator, StoryNarrationChapter } from '../components/StoryAudioNarrator';
import { motion } from 'motion/react';
import {
  Compass,
  Briefcase,
  Music,
  HeartHandshake,
  Clock,
  Sparkles,
  Play,
  BookOpen,
  TreePine
} from 'lucide-react';

interface StoryChapterData extends StoryNarrationChapter {
  icon: typeof Compass;
  categoryEn: string;
  categoryBn: string;
}

interface StoryPageProps {
  onNavigate: (route: RoutePath, preselectedCategory?: EnquiryCategory) => void;
  language: Language;
}

const storyChapters: StoryChapterData[] = [
  {
    id: 'chapter-1',
    chapterNumber: 'Chapter 01',
    chapterNumberBn: 'অধ্যায় ০১',
    titleEn: 'The Moral Compass and Foundation of Empathy',
    titleBn: 'নৈতিকতার শেকড় ও সহমর্মিতার পাঠ',
    categoryEn: 'Formative Roots',
    categoryBn: 'প্রাথমিক ভিত্তি',
    icon: Compass,
    paragraphsEn: [
      'The foundation of Asif Iqbal’s worldview was forged in a family where values were lived, not merely discussed. Growing up with the living memory of Bangladesh’s 1971 Liberation War—in which his father, a dedicated police officer, joined the struggle as a freedom fighter—he learned that true dignity lies in courage and service to one’s community.',
      'During his student years, Asif committed himself to the Bangladesh Red Crescent Society, organizing blood donation drives and flood relief operations. This early volunteerism was not a pastime; it was an education in empathy. It taught him that institutions exist to serve human beings, and that the ultimate measure of any enterprise is its impact on the most vulnerable.'
    ],
    paragraphsBn: [
      'আসিফ ইকবালের জীবনের দর্শন গড়ে উঠেছিল এমন এক পারিবারিক আবহে, যেখানে মূল্যবোধ কেবল কথার কথা ছিল না, ছিল দৈনন্দিন চর্চার অংশ। ১৯৭১ সালের মহান মুক্তিযুদ্ধে তাঁর বাবা—এক নির্ভীক পুলিশ কর্মকর্তা—সরাসরি অংশ নিয়েছিলেন। বাবার এই আত্মত্যাগ আসিফের মনে দেশপ্রেম, সাহস ও আত্মমর্যাদার এক স্থায়ী ভিত্তি তৈরি করে দেয়।',
      'ছাত্রজীবনেই তিনি জড়িয়ে পড়েন বাংলাদেশ রেড ক্রিসেন্ট সোসাইটির স্বেচ্ছাসেবামূলক কার্যক্রমে। বন্যা ও দুর্যোগে আর্তমানবতার সেবা এবং রক্তদান কর্মসূচির নেতৃত্ব দিতে গিয়ে তিনি উপলব্ধি করেন মানুষের দুর্দশা কতটা গভীর হতে পারে। এই অভিজ্ঞতা থেকেই তাঁর ভেতরে জন্ম নেয় গভীর সহমর্মিতা—যা পরবর্তীকালে তাঁর প্রতিটি করপোরেট ও মানবিক সিদ্ধান্তের মূল চালিকাশক্তি হয়ে ওঠে।'
    ]
  },
  {
    id: 'chapter-2',
    chapterNumber: 'Chapter 02',
    chapterNumberBn: 'অধ্যায় ০২',
    titleEn: 'The Art of Enterprise Turnaround and Ethical Scale',
    titleBn: 'করপোরেট রূপান্তর ও নৈতিক নেতৃত্বের দৃষ্টান্ত',
    categoryEn: 'Corporate Leadership',
    categoryBn: 'প্রাতিষ্ঠানিক নেতৃত্ব',
    icon: Briefcase,
    paragraphsEn: [
      'After completing his MBA at the Institute of Business Administration (IBA), University of Dhaka, Asif Iqbal embarked on a corporate career that would redefine market dynamics in Bangladesh. Beginning at Unilever, he honed the discipline of rigorous brand strategy, operational excellence, and organizational agility over more than a decade.',
      'His defining corporate achievements came in orchestrating high-stakes corporate turnarounds. At Meghna Group of Industries, City Group, and as CEO of Shwapno, he led complex transformations that revived brand equity, created thousands of direct employment opportunities, and proved that a business could achieve rapid profitability while adhering strictly to ethical standards and fair partnerships.'
    ],
    paragraphsBn: [
      'ঢাকা বিশ্ববিদ্যালয়ের ব্যবসায় প্রশাসন ইনস্টিটিউট (IBA) থেকে এমবিএ সম্পন্ন করে আসিফ ইকবাল করপোরেট জগতে প্রবেশ করেন। বহুজাতিক প্রতিষ্ঠান ইউনিলিভারে তাঁর দীর্ঘ পথচলা তাঁকে শিখিয়েছে কৌশলগত নিখুঁত পরিকল্পনা, বিশ্বমানের কার্যপদ্ধতি ও দলগত ঐক্যের গুরুত্ব।',
      'পরবর্তীতে তিনি মেঘনা গ্রুপ অব ইন্ডাস্ট্রিজ ও সিটি গ্রুপের মতো শীর্ষস্থানীয় দেশীয় কংগ্লোমারেটে রূপান্তরমূলক নেতৃত্ব দেন। এছাড়া দেশের শীর্ষ রিটেইল চেইন ‘স্বপ্ন’-এর প্রধান নির্বাহী (CEO) হিসেবে তিনি প্রতিষ্ঠানটির অভাবনীয় পুনরুজ্জীবন ঘটান। তাঁর নেতৃত্বে হাজার হাজার মানুষের কর্মসংস্থান সৃষ্টি হয় এবং প্রমাণ হয় যে সততা ও মানবিক মূল্যবোধ বজায় রেখেও ব্যবসায়িক শ্রেষ্ঠত্ব অর্জন সম্ভব।'
    ]
  },
  {
    id: 'chapter-3',
    chapterNumber: 'Chapter 03',
    chapterNumberBn: 'অধ্যায় ০৩',
    titleEn: 'Melodies of the Bengali Soul and the Creative Sanctuary',
    titleBn: 'বাংলা গানের সুর ও সৃষ্টিশীলতার আশ্রয়',
    categoryEn: 'Artistic Identity',
    categoryBn: 'শিল্পচেতনা ও সাধনা',
    icon: Music,
    paragraphsEn: [
      'Behind the intense pace of boardrooms and corporate meetings lived an artist whose words touched millions. Since penning the iconic track "Anonna" in 1988, Asif Iqbal has remained one of Bangladesh’s most celebrated lyricists and composers, crafting timeless melodies sung by legends including Runa Laila, Subir Nandi, James, and Habib Wahid.',
      'For Asif, music is not an escape from reality; it is a sacred space of clarity, emotional truth, and cultural preservation. Through songs celebrating human vulnerability, love, spiritual seeking, and patriotic devotion, his lyrics gave voice to the inner lives of generations of listeners across Bangladesh and the global diaspora.'
    ],
    paragraphsBn: [
      'সারাদিনের কর্মব্যস্ততা ও মিটিংয়ের চাপের পেছনে লুকিয়ে ছিল এক সংবেদনশীল শিল্পীর মন। ১৯৮৮ সালে কালজয়ী গান ‘অনন্যা’ রচনার মধ্য দিয়ে যে সুরের যাত্রা শুরু হয়েছিল, তা আজ চার দশক ধরে সমৃদ্ধ করে চলেছে বাংলা গানের ভুবনকে। রুনা লায়লা, সুবীর নন্দী, নগরবাউল জেমস থেকে শুরু করে হাবিব ওয়াহিদ—দেশের প্রায় সব কিংবদন্তি ও শীর্ষ কণ্ঠশিল্পীর কণ্ঠে তাঁর লেখা গান অমরত্ব পেয়েছে।',
      'আসিফ ইকবালের কাছে সংগীত কেবল বিনোদন নয়; এটি মানবাত্মার সত্য প্রকাশ ও আত্মশুদ্ধির মাধ্যম। প্রেম, বিরহ, আধ্যাত্মিক জিজ্ঞাসা এবং দেশপ্রেমের অনুভূতিকে তিনি যে অনন্য কাব্যে রূপ দিয়েছেন, তা স্পর্শ করেছে কোটি শ্রোতার হৃদয়।'
    ]
  },
  {
    id: 'chapter-4',
    chapterNumber: 'Chapter 04',
    chapterNumberBn: 'অধ্যায় ০৪',
    titleEn: 'Building Beyond Self: Enterprises, Mentorship, and Legacy',
    titleBn: 'বৃহত্তরের কল্যাণে: নতুন উদ্যোগ ও প্রজন্ম বিনির্মাণ',
    categoryEn: 'Lasting Impact',
    categoryBn: 'স্থায়ী অবদান ও ভবিষ্যৎ',
    icon: HeartHandshake,
    paragraphsEn: [
      'Driven by the belief that true success must be shared, Asif Iqbal founded multiple pioneering enterprises: Achieve Consulting to guide national businesses through digital and organizational transformation; ACIS to fuse technology with human-centered strategy; GaanChill Music to protect artists’ intellectual property rights; and ASIX to connect over 900 rural women handloom artisans to global markets.',
      'Whether teaching MBA candidates at IBA, writing books on leadership mindset, or coordinating emergency healthcare supplies during national crises, Asif’s mission remains rooted in a singular principle: leadership is judged not by what you accumulate, but by what you build for the flourishing of others.'
    ],
    paragraphsBn: [
      'করপোরেট সাফল্যের ঊর্ধ্বে উঠে মানুষের স্থায়ী কল্যাণে কিছু করার তাগিদ থেকে তিনি প্রতিষ্ঠা করেন নতুন নতুন উদ্যোগ: কৌশলগত রূপান্তরের জন্য ‘অ্যাচিভ কনসাল্টিং’, প্রযুক্তি ও সৃজনশীলতার মেলবন্ধনে ‘ACIS’, বাংলা গান ও শিল্পীদের অধিকার সুরক্ষায় ‘গানচিল মিউজিক’, এবং ৯০০+ গ্রামীণ নারী কারুশিল্পীর বিশ্বায়নে ‘এসিক্স’।',
      'ঢাকা বিশ্ববিদ্যালয়ের আইবিএ-র শ্রেণিকক্ষে পাঠদান হোক কিংবা করোনা মহামারির সময় জরুরি চিকিৎসা সহায়তা প্রদান—আসিফ ইকবালের বিশ্বাস অবিচল: অন্যের জন্য কিছু করতে পারার মাঝেই নেতৃত্বের আসল সার্থকতা।'
    ]
  }
];

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate, language }) => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'architecture'>('narrative');
  const [activeNarratedChapterIndex, setActiveNarratedChapterIndex] = useState<number>(0);
  const [playTrigger, setPlayTrigger] = useState<number>(0);
  const audioNarratorRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const handleScrollToAudio = (idx?: number) => {
    setActiveTab('narrative');
    if (idx !== undefined) {
      setActiveNarratedChapterIndex(idx);
    }
    setPlayTrigger(Date.now());
    setTimeout(() => {
      audioNarratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const fullStoryText = storyChapters
    .map((ch) => (language === 'en' ? ch.paragraphsEn : ch.paragraphsBn).join(' '))
    .join(' ');
  const totalStats = calculateReadingTime(fullStoryText, language);

  return (
    <div className="space-y-10 sm:space-y-14 py-8 pb-20">
      {/* Header with Title and Mode Switcher */}
      <ScrollSection yOffset={20} className="max-w-[1240px] mx-auto px-6">
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="font-semibold text-teal-700 uppercase tracking-wider">
                {language === 'en' ? 'Biographical Archive' : 'জীবন ও কর্মের ইতিহাস'}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 font-medium text-[#0D161F]">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{totalStats.text}</span>
              </span>
              <span>·</span>
              <span>
                {language === 'en'
                  ? `4 Chapters (${totalStats.wordCountText})`
                  : `৪টি অধ্যায় (${totalStats.wordCountText})`}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D161F] tracking-tight">
              {language === 'en' ? 'The Journey of a Polymath Builder' : 'এক নির্মাতার জীবনগাথা'}
            </h1>
            <p className="font-editorial italic text-lg sm:text-xl text-teal-900">
              "{t.brand.brandLine}"
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
              {language === 'en'
                ? 'A journey bridging corporate boardrooms, creative studios, university lecture halls, and rural handloom clusters. Grounded in ethical conviction, cultural wisdom, and enduring public service.'
                : 'করপোরেট বোর্ডরুম, সুরের স্টুডিও, বিশ্ববিদ্যালয়ের শ্রেণিকক্ষ এবং গ্রামীণ তাঁতপল্লী—সবকিছুকে এক সূত্রে গেঁথে চলা এক জীবনের গল্প। বাঙালির সাংস্কৃতিক শেকড় ও নৈতিক মূল্যবোধে গড়া পথচলা।'}
            </p>
          </div>

          {/* Clean Segment Switcher: Narrative vs Career Architecture */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab('narrative')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'narrative'
                  ? 'bg-[#0D161F] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'en' ? 'Read Story & Audio' : 'জীবনগাথা ও অডিও'}</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-[#0D161F] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
              }`}
            >
              <TreePine className="w-4 h-4" />
              <span>{language === 'en' ? 'Career Architecture (মহীরূহ)' : 'কর্মযাত্রার মহীরূহ'}</span>
            </button>
          </div>
        </div>
      </ScrollSection>

      {/* VIEW 1: NARRATIVE STORY & SLEEK AUDIO PLAYER */}
      {activeTab === 'narrative' && (
        <ScrollSection className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Audio Narrator & Story Chapters (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Precision Audio Narrator Bar */}
              <div ref={audioNarratorRef}>
                <StoryAudioNarrator
                  language={language}
                  chapters={storyChapters}
                  activeChapterIndex={activeNarratedChapterIndex}
                  onActiveChapterChange={setActiveNarratedChapterIndex}
                  playTrigger={playTrigger}
                />
              </div>

              {/* Story Chapters List */}
              <div className="space-y-10">
                {storyChapters.map((chapter, idx) => {
                  const chapterText = (language === 'en' ? chapter.paragraphsEn : chapter.paragraphsBn).join(' ');
                  const chapterStats = calculateReadingTime(chapterText, language);
                  const isCurrentlyNarrated = activeNarratedChapterIndex === idx;

                  return (
                    <motion.article
                      key={chapter.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={`space-y-4 transition-all duration-200 ${
                        isCurrentlyNarrated
                          ? 'p-6 rounded-2xl bg-teal-50/50 border border-teal-200/90 shadow-xs'
                          : 'p-1'
                      } ${idx < storyChapters.length - 1 ? 'border-b border-slate-200 pb-10' : ''}`}
                    >
                      {/* Chapter Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold uppercase text-teal-800 px-2 py-0.5 rounded bg-teal-100/70">
                            {language === 'en' ? chapter.chapterNumber : chapter.chapterNumberBn}
                          </span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1 font-medium text-[#0D161F]">
                            <Clock className="w-3 h-3 text-teal-600" />
                            <span>{chapterStats.text}</span>
                          </span>
                        </div>

                        <button
                          onClick={() => handleScrollToAudio(idx)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0D161F] text-xs font-medium transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current text-teal-700" />
                          <span>{language === 'en' ? 'Listen to chapter' : 'অধ্যায় শুনুন'}</span>
                        </button>
                      </div>

                      <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D161F] tracking-tight">
                        {language === 'en' ? chapter.titleEn : chapter.titleBn}
                      </h2>

                      <div className="text-base text-slate-700 leading-relaxed space-y-3 font-body">
                        {(language === 'en' ? chapter.paragraphsEn : chapter.paragraphsBn).map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Clean Editorial Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              <ScrollReveal direction="left" delay={0.1}>
                <PortraitSlot
                  photoUrl={assetConfig.secondaryPortraitUrl}
                  altText={language === 'en' ? 'Asif Iqbal – The Polymath Builder' : 'আসিফ ইকবাল'}
                  className="w-full min-h-[360px]"
                  language={language}
                  variant="editorial"
                />
              </ScrollReveal>

              {/* Timeline Snapshot */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-xs">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-[#0D161F] border-b border-slate-100 pb-2.5 flex items-center justify-between">
                    <span>{language === 'en' ? 'Chronological Eras' : 'জীবনের মাইলফলক'}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </h3>

                  <ol className="relative border-l border-teal-500/30 ml-2 space-y-5 text-xs">
                    <li className="ml-3.5 space-y-0.5 relative">
                      <span className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-teal-600 ring-2 ring-white" />
                      <span className="font-mono text-teal-700 font-medium">1971 & Youth</span>
                      <div className="font-semibold text-[#0D161F]">
                        {language === 'en' ? 'Moral Anchor & Red Crescent Service' : 'বাবার মুক্তিযুদ্ধ ও রেড ক্রিসেন্টে স্বেচ্ছাসেবা'}
                      </div>
                    </li>

                    <li className="ml-3.5 space-y-0.5 relative">
                      <span className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-teal-600 ring-2 ring-white" />
                      <span className="font-mono text-teal-700 font-medium">1988</span>
                      <div className="font-semibold text-[#0D161F]">
                        {language === 'en' ? 'Songwriting Debut with "Anonna"' : '‘অনন্যা’ গানের মধ্য দিয়ে সংগীত ভুবনে অভিষেক'}
                      </div>
                    </li>

                    <li className="ml-3.5 space-y-0.5 relative">
                      <span className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-teal-600 ring-2 ring-white" />
                      <span className="font-mono text-teal-700 font-medium">1995 — 2020s</span>
                      <div className="font-semibold text-[#0D161F]">
                        {language === 'en' ? 'Unilever, Meghna, Shwapno & City Group' : 'ইউনিলিভার, মেঘনা, স্বপ্ন ও সিটি গ্রুপের রূপান্তর'}
                      </div>
                    </li>

                    <li className="ml-3.5 space-y-0.5 relative">
                      <span className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                      <span className="font-mono text-amber-600 font-medium">Current Era</span>
                      <div className="font-semibold text-[#0D161F]">
                        {language === 'en' ? 'Achieve, GaanChill, ASIX & Mentorship' : 'অ্যাচিভ, গানচিল, এসিক্স ও শিক্ষকতা'}
                      </div>
                    </li>
                  </ol>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollSection>
      )}

      {/* VIEW 2: CAREER ARCHITECTURE TREE (FOCUSED & UNCLUTTERED) */}
      {activeTab === 'architecture' && (
        <ScrollSection className="max-w-[1240px] mx-auto px-6">
          <CareerTreeDiagram language={language} onNavigate={onNavigate} />
        </ScrollSection>
      )}
    </div>
  );
};
