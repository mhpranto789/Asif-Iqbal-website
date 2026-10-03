import React, { useState } from 'react';
import { RoutePath, Language, EnquiryCategory } from '../types';
import { translations } from '../data/translations';
import { musicItems, culturalAppointments } from '../data/siteContent';
import { Music, Play, ArrowUpRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GaanChillSoundLounge } from '../components/GaanChillSoundLounge';
import { ScrollSection, ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface MusicPageProps {
  onNavigate: (route: RoutePath, preselectedCategory?: EnquiryCategory) => void;
  language: Language;
}

export const MusicPage: React.FC<MusicPageProps> = ({ onNavigate, language }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'classic' | 'modern' | 'anthem'>('all');
  const [activeEmbedSong, setActiveEmbedSong] = useState<string | null>(null);
  const t = translations[language];

  const filterOptions = [
    { id: 'all' as const, labelEn: 'All Selected Works', labelBn: 'সকল নির্বাচিত গান' },
    { id: 'classic' as const, labelEn: 'Band Classics (LRB / Souls)', labelBn: 'কালজয়ী ব্যান্ড গান' },
    { id: 'modern' as const, labelEn: 'Contemporary Melodies', labelBn: 'আধুনিক মেলোডি' },
    { id: 'anthem' as const, labelEn: 'Cultural Anthems', labelBn: 'অনুপ্রেরণামূলক সংগীত' },
  ];

  const filteredSongs = musicItems.filter((song) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'classic') {
      return song.titleEn.toLowerCase().includes('anonna') || song.artistCredit.toLowerCase().includes('souls') || song.artistCredit.toLowerCase().includes('bachchu') || song.artistCredit.toLowerCase().includes('partha');
    }
    if (selectedFilter === 'anthem') {
      return song.titleEn.toLowerCase().includes('cholo') || song.titleEn.toLowerCase().includes('shobai') || song.contextEn.toLowerCase().includes('anthem');
    }
    if (selectedFilter === 'modern') {
      return !song.titleEn.toLowerCase().includes('anonna');
    }
    return true;
  });

  return (
    <div className="space-y-16 lg:space-y-24 py-10 pb-24">
      {/* Header */}
      <ScrollSection yOffset={24} className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold tracking-wider uppercase">
            <Music className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'en' ? 'Lyrical Heritage' : 'গীতিকবিতা ও সুরের সাধনা'}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D161F] tracking-tight">
            {language === 'en' ? 'Songwriting & Cultural Archive' : 'চার দশকের গীতিকবিতা ও সংস্কৃতি'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
            {language === 'en'
              ? 'Over 42 years of dedication to the craft of Bengali lyricism. From the seminal 1988 rock ballad "Anonna" to contemporary multi-generational anthems, Asif Iqbal’s poetry explores human vulnerability, love, and resilient hope.'
              : '৪২ বছরেরও বেশি সময় ধরে বাংলা গীতিকবিতার নিভৃত সাধনা। ১৯৮৮ সালের ঐতিহাসিক ব্যান্ড ক্লাসিক ‘অনন্যা’ থেকে সাম্প্রতিক প্রজন্মের হৃদয়স্পর্শী আধুনিক গান—আসিফ ইকবালের গীতিভাষায় ফুটে উঠেছে প্রেম, বিরহ ও আশাবাদের চিরন্তন আকুতি।'}
          </p>

          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-white border border-teal-200/80 text-xs text-slate-700 flex items-center gap-3 shadow-xs">
            <Award className="w-5 h-5 text-teal-600 shrink-0" />
            <div>
              <span className="font-bold text-[#0D161F]">
                {language === 'en' ? 'Strictly Credited as Lyricist' : 'একনিষ্ঠ গীতিকবি'}:
              </span>{' '}
              {language === 'en'
                ? 'Honoured across his career with major industry lyricist recognitions. Asif is strictly credited as lyricist (never singer, composer, or producer).'
                : 'কর্মজীবনে বহু মর্যাদাপূর্ণ পুরস্কারে ভূষিত। তিনি কেবল গানের গীতিকার হিসেবেই কাজ করেছেন (কণ্ঠশিল্পী বা সুরকার হিসেবে নয়)।'}
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Interactive Sound Lounge Stage with Scroll Section Animation */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6">
        <GaanChillSoundLounge language={language} />
      </ScrollSection>

      {/* PART 1: CURATED CATALOGUE WITH FILTER TABS & INTERSECTION REVEALS */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-8">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Catalogue</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
              {language === 'en' ? 'Selected Canonical Works' : 'নির্বাচিত কালজয়ী গানসমূহ'}
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedFilter === opt.id
                    ? 'bg-white text-teal-800 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'en' ? opt.labelEn : opt.labelBn}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredSongs.map((song) => (
            <StaggerItem key={song.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full p-8 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 hover:border-teal-500/50 hover:shadow-xl transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                    <span className="font-mono text-teal-700 font-semibold px-2 py-0.5 rounded bg-teal-50">
                      {language === 'en' ? song.roleEn : song.roleBn}: Asif Iqbal
                    </span>
                    <span className="font-medium font-mono">{song.yearText}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-3xl font-bold text-[#0D161F] group-hover:text-teal-600 transition-colors">
                      {language === 'en' ? song.titleEn : song.titleBn}
                    </h3>
                    <p className="text-xs text-amber-600 font-medium">
                      {song.artistCredit}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    {language === 'en' ? song.contextEn : song.contextBn}
                  </p>

                  {/* Click-to-load embed preview player */}
                  {activeEmbedSong === song.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 rounded-xl bg-[#0D161F] text-white text-xs space-y-3 border border-teal-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-teal-400 font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                          Streaming Destination Ready
                        </span>
                        <button
                          onClick={() => setActiveEmbedSong(null)}
                          className="text-white/60 hover:text-white cursor-pointer"
                        >
                          Close
                        </button>
                      </div>

                      {song.youtubeId ? (
                        <div className="space-y-3 pt-1">
                          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black shadow-lg">
                            <iframe
                              src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?autoplay=1&rel=0`}
                              title={song.titleEn}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <span className="text-slate-300 text-xs">
                              {language === 'en'
                                ? 'Official music video on YouTube'
                                : 'ইউটিউবে অফিশিয়াল ভিডিও গান'}
                            </span>
                            <a
                              href={song.externalLink || `https://www.youtube.com/watch?v=${song.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-colors cursor-pointer text-xs"
                            >
                              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                              <span>Watch on YouTube</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-slate-300">
                            {language === 'en'
                              ? 'Official recording published under verified copyright. Stream the full song on verified platforms.'
                              : 'অফিসিয়াল অনুমোদিত প্ল্যাটফর্মে শুনতে নিচের বাটনে ক্লিক করুন।'}
                          </p>
                          {song.spotifyUrl ? (
                            <a
                              href={song.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-slate-950 font-bold transition-colors cursor-pointer shadow-md"
                            >
                              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                              </svg>
                              <span>{language === 'en' ? 'Stream on Spotify' : 'স্পটিফাইতে শুনুন'}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          ) : song.externalLink && (
                            <a
                              href={song.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors cursor-pointer"
                            >
                              <span>Listen on YouTube / GaanChill</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </>
                      )}
                    </motion.div>
                  ) : null}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveEmbedSong(activeEmbedSong === song.id ? null : song.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#0D161F] hover:bg-teal-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{language === 'en' ? (song.youtubeId ? 'Watch Video' : 'Stream & Details') : (song.youtubeId ? 'ভিডিও দেখুন' : 'শুনুন ও তথ্য')}</span>
                  </button>

                  {song.spotifyUrl ? (
                    <a
                      href={song.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#1DB954] hover:text-[#1ed760] font-semibold transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                      <span>Spotify</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : song.youtubeId ? (
                    <a
                      href={song.externalLink || `https://www.youtube.com/watch?v=${song.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>YouTube</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : song.externalLink && (
                    <a
                      href={song.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 font-semibold transition-colors"
                    >
                      <span>GaanChill Music</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>

      {/* PART 2: CULTURAL APPOINTMENTS & ADVOCACY */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6 space-y-8">
        <ScrollReveal className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono uppercase text-teal-600 font-semibold">Leadership</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F]">
            {language === 'en' ? 'Music Industry Governance & Platforms' : 'সংগীত শিল্পের প্রাতিষ্ঠানিক নেতৃত্ব'}
          </h2>
          <p className="text-xs text-slate-500 pt-1">
            {language === 'en'
              ? 'Institutional advocacy for songwriters’ rights, intellectual property protection, and cultural discovery.'
              : 'গীতিকারদের মেধা ও রয়্যালটি সুরক্ষা, প্রতিভা অন্বেষণ এবং সংগীতের প্রাতিষ্ঠানিক উন্নয়নে ভূমিকা।'}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {culturalAppointments.map((item, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -2 }}
                className="h-full p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all"
              >
                <span className="text-xs font-mono text-teal-700 font-semibold px-2 py-0.5 rounded bg-teal-50">
                  {language === 'en' ? item.roleEn : item.roleBn}
                </span>
                <h3 className="font-display text-xl font-bold text-[#0D161F]">
                  {language === 'en' ? item.titleEn : item.titleBn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  {language === 'en' ? item.descEn : item.descBn}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>
    </div>
  );
};
