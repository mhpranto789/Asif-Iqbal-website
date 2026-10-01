import React, { useState } from 'react';
import { Language, RoutePath } from '../types';
import { Sparkles, Pause, Play, ArrowRight, Quote, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThoughtTickerProps {
  language: Language;
  onNavigate: (route: RoutePath) => void;
}

interface ThoughtSnippet {
  id: string;
  tagEn: string;
  tagBn: string;
  quoteEn: string;
  quoteBn: string;
  sourceEn: string;
  sourceBn: string;
}

const thoughtSnippets: ThoughtSnippet[] = [
  {
    id: 'culture-safety',
    tagEn: 'Leadership',
    tagBn: 'নেতৃত্ব',
    quoteEn: 'Culture is not a poster on the boardroom wall; it is the daily emotional safety net you build for your frontline teams.',
    quoteBn: 'সংস্কৃতি কোনো দেয়ালে ঝুলানো স্লোগান নয়; এটি মাঠপর্যায়ের সহকর্মীদের জন্য গড়ে তোলা প্রতিদিনের মানসিক ভরসাস্থল।',
    sourceEn: 'Achieve Consulting Keynote',
    sourceBn: 'অ্যাচিভ কনসাল্টিং কি-নোট',
  },
  {
    id: 'lyricism-compression',
    tagEn: 'Lyricism',
    tagBn: 'গীতকবিতা',
    quoteEn: 'A song must say in four minutes what a philosopher takes four volumes to explain. Compression is the true art.',
    quoteBn: 'একজন দার্শনিক চার খণ্ডে যা লেখেন, একটি গানে চার মিনিটেই তা বলতে হয়। এই সংক্ষেপণই গীতিকবিতার আসল শক্তি।',
    sourceEn: 'Four Decades of Songwriting',
    sourceBn: 'চার দশকের সংগীত সৃষ্টিশীলতা',
  },
  {
    id: 'calm-discipline',
    tagEn: 'Mindset',
    tagBn: 'মনস্তত্ত্ব',
    quoteEn: 'Motivation is a temporary spark; calm, repetitive discipline is the iron engine that survives protracted dry seasons.',
    quoteBn: 'ক্ষণস্থায়ী আবেগের বদলে শান্ত ও সুশৃঙ্খল অভ্যাসের শক্তিই মানুষকে দীর্ঘমেয়াদি প্রতিকূলতা পার করে দেয়।',
    sourceEn: 'From "Jodi Lokkho Thake Otut"',
    sourceBn: '‘যদি লক্ষ্য থাকে অটুট’ গ্রন্থ থেকে',
  },
  {
    id: 'turnaround-fatigue',
    tagEn: 'Strategy',
    tagBn: 'রূপান্তর',
    quoteEn: 'Turnarounds rarely fail because of flawed spreadsheets. They fail when leaders underestimate human emotional fatigue.',
    quoteBn: 'এক্সেল শিটের ভুলে রূপান্তর ব্যর্থ হয় না; শীর্ষ নেতৃত্ব যখন মানুষের মানসিক ক্লান্তি বুঝতে ব্যর্থ হয়, তখনই বিপর্যয় ঘটে।',
    sourceEn: 'Executive Mentoring (AIM)',
    sourceBn: 'এইম (AIM) লিডারশিপ সেশন',
  },
  {
    id: 'polymath-equilibrium',
    tagEn: 'Polymath',
    tagBn: 'দ্বৈত প্রজ্ঞা',
    quoteEn: 'Logic gives an enterprise its bones, but poetic empathy gives it a heartbeat. True builders never abandon either.',
    quoteBn: 'যুক্তিবোধ একটি প্রতিষ্ঠানের কাঠামো গড়ে তোলে, আর কাব্যিক সংবেদনশীলতা দেয় তার হৃদস্পন্দন। একজন নির্মাতা দুটিকেই ধারণ করেন।',
    sourceEn: 'IBA Distinguished Lecture',
    sourceBn: 'আইবিএ বিশেষ স্মারক বক্তৃতা',
  },
  {
    id: 'borrowed-wisdom',
    tagEn: 'Decisions',
    tagBn: 'সিদ্ধান্ত',
    quoteEn: 'In moments of rapid change, the boldest decision is often the quiet refusal to rush into borrowed wisdom.',
    quoteBn: 'দ্রুত পরিবর্তনের যুগে সবচেয়ে সাহসী সিদ্ধান্ত হলো অন্যের তৈরি ধারণায় অন্ধের মতো গা না ভাসিয়ে অবিচল থাকা।',
    sourceEn: 'From "Bhabia Korio Kaaj"',
    sourceBn: '‘ভাবিয়া করিও কাজ’ গ্রন্থ থেকে',
  },
];

export const ThoughtTicker: React.FC<ThoughtTickerProps> = ({ language, onNavigate }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeSnippet, setActiveSnippet] = useState<ThoughtSnippet | null>(null);
  const [copied, setCopied] = useState(false);

  // Duplicate items array so the ticker loop is completely seamless
  const duplicatedSnippets = [...thoughtSnippets, ...thoughtSnippets];

  const handleCopyQuote = (quote: string, source: string) => {
    navigator.clipboard.writeText(`"${quote}" — Asif Iqbal (${source})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Small, Non-Intrusive Scrolling Ticker Bar */}
      <section
        aria-label={language === 'en' ? 'Latest Thoughts Ticker' : 'সাম্প্রতিক ভাবনা টিকার'}
        className="w-full bg-[#080E15] border-y border-teal-500/20 text-slate-300 overflow-hidden relative select-none"
      >
        <div className="max-w-[1440px] mx-auto flex items-center h-11 sm:h-12 text-xs">
          {/* Left Anchor Label: Fixed badge with pulsing live dot */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#0B141E] border-r border-teal-500/20 z-20 shrink-0 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Latest Thoughts' : 'সাম্প্রতিক ভাবনা'}
              </span>
              <span className="sm:hidden">
                {language === 'en' ? 'Thoughts' : 'ভাবনা'}
              </span>
            </span>
          </div>

          {/* Center Smooth Scrolling Track */}
          <div
            className="flex-1 overflow-hidden relative flex items-center cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Soft edge blur masks for modern editorial finish */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#080E15] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#080E15] to-transparent z-10 pointer-events-none" />

            <div
              className={`animate-marquee ${isPaused ? 'animate-marquee-paused' : ''} flex items-center gap-8 pl-4`}
            >
              {duplicatedSnippets.map((snippet, idx) => {
                const quoteText = language === 'en' ? snippet.quoteEn : snippet.quoteBn;
                const tag = language === 'en' ? snippet.tagEn : snippet.tagBn;
                const source = language === 'en' ? snippet.sourceEn : snippet.sourceBn;

                return (
                  <button
                    key={`${snippet.id}-${idx}`}
                    onClick={() => setActiveSnippet(snippet)}
                    className="inline-flex items-center gap-2.5 group whitespace-nowrap hover:text-white transition-colors text-left"
                    title={language === 'en' ? 'Click to view thought' : 'সম্পূর্ণ পড়তে ক্লিক করুন'}
                  >
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 group-hover:border-teal-400 group-hover:bg-teal-500/20 transition-all font-semibold">
                      {tag}
                    </span>

                    <span className="font-editorial italic text-slate-300 group-hover:text-white transition-colors text-[13px] tracking-wide">
                      "{quoteText}"
                    </span>

                    <span className="text-[11px] text-slate-400 font-mono tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                      — {source}
                    </span>

                    {/* Subtle divider */}
                    <span className="text-amber-500/40 text-xs ml-4">❖</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Controls: Play/Pause Toggle & Quick Link to Ideas */}
          <div className="flex items-center gap-1.5 px-3 bg-[#080E15] border-l border-teal-500/20 z-20 shrink-0">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
              aria-label={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => onNavigate('ideas')}
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-teal-400 hover:text-teal-300 transition-colors ml-1 cursor-pointer"
              title="Explore all philosophy and books"
            >
              <span>{language === 'en' ? 'All Thoughts' : 'সকল ভাবনা'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal Card for Focused Reading of Thought Snippet */}
      <AnimatePresence>
        {activeSnippet && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Thought Detail"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSnippet(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#0D161F] text-white rounded-2xl border border-white/15 p-6 sm:p-7 shadow-2xl z-10 space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-md bg-amber-400/20 text-amber-300">
                    <Quote className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                    {language === 'en' ? activeSnippet.tagEn : activeSnippet.tagBn} ·{' '}
                    {language === 'en' ? 'Polymath Reflection' : 'চিন্তাসূত্র'}
                  </span>
                </div>

                <button
                  onClick={() => setActiveSnippet(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quote Content */}
              <div className="space-y-3">
                <p className="font-editorial text-xl sm:text-2xl leading-relaxed text-white italic">
                  "{language === 'en' ? activeSnippet.quoteEn : activeSnippet.quoteBn}"
                </p>

                <div className="pt-2 text-xs text-teal-400 font-mono">
                  — Asif Iqbal{' '}
                  <span className="text-slate-400">
                    ({language === 'en' ? activeSnippet.sourceEn : activeSnippet.sourceBn})
                  </span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  onClick={() =>
                    handleCopyQuote(
                      language === 'en' ? activeSnippet.quoteEn : activeSnippet.quoteBn,
                      language === 'en' ? activeSnippet.sourceEn : activeSnippet.sourceBn
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (language === 'en' ? 'Copied' : 'কপি হয়েছে') : (language === 'en' ? 'Copy Quote' : 'উদ্ধৃতি কপি করুন')}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSnippet(null);
                    onNavigate('ideas');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors cursor-pointer"
                >
                  <span>{language === 'en' ? 'Explore Frameworks' : 'দর্শন ও বই দেখুন'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
