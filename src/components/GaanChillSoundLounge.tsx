import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { Play, Pause, Volume2, VolumeX, Music2, Sparkles, Disc, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SongItem {
  id: string;
  titleEn: string;
  titleBn: string;
  artistEn: string;
  artistBn: string;
  year: string;
  genreEn: string;
  genreBn: string;
  lyricSampleEn: string[];
  lyricSampleBn: string[];
  audioFrequencyBase: number;
}

const FEATURED_SONGS: SongItem[] = [
  {
    id: 'cholo-shobai',
    titleEn: 'Cholo Shobai',
    titleBn: 'চল সবাই',
    artistEn: 'Habib Wahid & Various Artists',
    artistBn: 'হাবিব ওয়াহিদ ও অন্যান্য',
    year: '2016',
    genreEn: 'Inspirational Anthem',
    genreBn: 'অনুপ্রেরণামূলক জাতীয় গান',
    lyricSampleEn: [
      '“Cholo shobai eksathe shopno dekhi,”',
      '“Notun ek bhorer pothe haati...”',
      '“Amader haat dhorlei poth hobe shorol.”'
    ],
    lyricSampleBn: [
      '“চল সবাই একসাথে স্বপ্ন দেখি,”',
      '“নতুন এক ভোরের পথে হাঁটি...”',
      '“আমাদের হাত ধরলেই পথ হবে সরল।”'
    ],
    audioFrequencyBase: 261.63, // C4 note
  },
  {
    id: 'bhoboghure',
    titleEn: 'Bhoboghure',
    titleBn: 'ভবঘুরে',
    artistEn: 'Topu / Yaatri',
    artistBn: 'তপু (যাত্রী)',
    year: '2008',
    genreEn: 'Contemporary Rock Ballad',
    genreBn: 'আধুনিক রক ব্যালাড',
    lyricSampleEn: [
      '“Ami ek bhoboghure moner thikanay,”',
      '“Khujey firi tomai shob kuashay...”',
      '“Tomar chokhe neme asha shondhata je amar.”'
    ],
    lyricSampleBn: [
      '“আমি এক ভবঘুরে মনের ঠিকানায়,”',
      '“খুঁজে ফিরি তোমায় সব কুয়াশায়...”',
      '“তোমার চোখে নেমে আসা সন্ধ্যাটা যে আমার।”'
    ],
    audioFrequencyBase: 293.66, // D4
  },
  {
    id: 'mon-karigor',
    titleEn: 'Mon Karigor',
    titleBn: 'মন কারিগর',
    artistEn: 'Tahsan Khan',
    artistBn: 'তাহসান খান',
    year: '2014',
    genreEn: 'Melodic Romantic',
    genreBn: 'রোমান্টিক মেলোডি',
    lyricSampleEn: [
      '“Mon karigor goreche tomai emon kore,”',
      '“Je dikei takai tomai dekhai pore...”',
      '“Hridoy jeno ek obiroto shur.”'
    ],
    lyricSampleBn: [
      '“মন কারিগর গড়েছে তোমায় এমন করে,”',
      '“যে দিকেই তাকাই তোমায় দেখাই পড়ে...”',
      '“হৃদয় যেন এক অবিরত সুর।”'
    ],
    audioFrequencyBase: 329.63, // E4
  },
  {
    id: 'anonna',
    titleEn: 'Anonna',
    titleBn: 'অনন্যা',
    artistEn: 'Ayub Bachchu / LRB',
    artistBn: 'আইয়ুব বাচ্চু (এলআরবি)',
    year: '1988',
    genreEn: 'Seminal Rock Classic',
    genreBn: 'কালজয়ী ব্যান্ড ক্লাসিক',
    lyricSampleEn: [
      '“Ononna, tumi ki dekhcho amay?”',
      '“Ei raate klanto shob ghoribari...”',
      '“Smriti gulo ghire dhore bohudur theke.”'
    ],
    lyricSampleBn: [
      '“অনন্যা, তুমি কি দেখছো আমায়?”',
      '“এই রাতে ক্লান্ত সব ঘরবাড়ি...”',
      '“স্মৃতিগুলো ঘিরে ধরে বহুদূর থেকে।”'
    ],
    audioFrequencyBase: 349.23, // F4
  },
  {
    id: 'tumi-chhara',
    titleEn: 'Tumi Chhara',
    titleBn: 'তুমি ছাড়া',
    artistEn: 'Partha Barua / Souls',
    artistBn: 'পার্থ বড়ুয়া (সোলস)',
    year: '2004',
    genreEn: 'Acoustic Pop',
    genreBn: 'অ্যাকোস্টিক মেলোডি',
    lyricSampleEn: [
      '“Tumi chhara ar ke ache bolo,”',
      '“Ei bhalobashar shagor paar hobo...”',
      '“Tomari haate haat rekhe choli.”'
    ],
    lyricSampleBn: [
      '“তুমি ছাড়া আর কে আছে বলো,”',
      '“এই ভালোবাসার সাগর পার হবো...”',
      '“তোমারি হাতে হাত রেখে চলি।”'
    ],
    audioFrequencyBase: 392.00, // G4
  },
];

interface GaanChillSoundLoungeProps {
  language: Language;
  onExploreMore?: () => void;
}

export const GaanChillSoundLounge: React.FC<GaanChillSoundLoungeProps> = ({
  language,
  onExploreMore,
}) => {
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentSong = FEATURED_SONGS[selectedSongIndex];

  // Rotate lyric line while playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveLyricIndex((prev) => (prev + 1) % currentSong.lyricSampleEn.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  // Subtle web audio synthetic ambient sound generator
  const startAudio = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop existing oscillators
      oscNodesRef.current.forEach((osc) => {
        try { osc.stop(); osc.disconnect(); } catch (e) { /* ignore */ }
      });
      oscNodesRef.current = [];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create a warm melodic chord (base + third + fifth)
      const baseFreq = currentSong.audioFrequencyBase;
      const freqs = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Soft sine wave for musical warmth
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // LFO / gentle frequency vibrato
        oscGain.gain.setValueAtTime(0.04 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscNodesRef.current.push(osc);
      });
    } catch (e) {
      // AudioContext blocked or unsupported in sandbox
    }
  };

  const stopAudio = () => {
    try {
      oscNodesRef.current.forEach((osc) => {
        try { osc.stop(); osc.disconnect(); } catch (e) { /* ignore */ }
      });
      oscNodesRef.current = [];
    } catch (e) {
      // ignore
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startAudio();
    }
  };

  const handleSelectSong = (index: number) => {
    setSelectedSongIndex(index);
    setActiveLyricIndex(0);
    if (isPlaying) {
      stopAudio();
      setTimeout(() => startAudio(), 100);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        nextMuted ? 0 : 0.08,
        audioCtxRef.current.currentTime
      );
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try { audioCtxRef.current.close(); } catch (e) { /* ignore */ }
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B131B] via-[#121E2A] to-[#0A1118] text-white p-6 sm:p-8 lg:p-10 border border-teal-500/20 shadow-2xl">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
            <Music2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-teal-400 font-semibold flex items-center gap-2">
              <span>{language === 'en' ? 'GaanChill Sound Lounge' : 'গানচিল সাউন্ড লাউঞ্জ'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
              {language === 'en' ? 'The Living Lyrical Archive' : 'জীবন্ত গীতিকবিতা ও সুরের ধারা'}
            </h3>
          </div>
        </div>

        {/* Global Controls & Attribution */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute preview sound' : 'Mute preview sound'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
          </button>

          {onExploreMore && (
            <button
              onClick={onExploreMore}
              className="text-xs text-slate-300 hover:text-teal-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{language === 'en' ? 'Full Archive' : 'সম্পূর্ণ ক্যাটালগ'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Left Column: Equalizer & Vinyl Disc (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-black/30 border border-white/5 space-y-6">
          {/* Animated Vinyl Record */}
          <div className="relative">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 p-2 shadow-2xl border-4 border-slate-700/50 flex items-center justify-center relative"
            >
              {/* Vinyl Grooves */}
              <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-white/5 flex items-center justify-center">
                  {/* Center Label */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-teal-600 to-slate-900 border-2 border-amber-400/80 flex items-center justify-center text-center p-1">
                    <Disc className="w-6 h-6 text-amber-300 opacity-90" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Play / Pause Overlaid Trigger */}
            <button
              onClick={handleTogglePlay}
              className="absolute -bottom-2 -right-2 p-3.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-lg font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer z-20"
              aria-label={isPlaying ? 'Pause song preview' : 'Play song preview'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </button>
          </div>

          {/* Dynamic 18-bar Animated Soundwave Visualizer */}
          <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-14 px-2">
            {[...Array(18)].map((_, i) => {
              const heights = [35, 65, 95, 45, 80, 100, 50, 75, 90, 60, 85, 40, 70, 95, 55, 80, 45, 65];
              const targetHeight = isPlaying ? `${heights[i % heights.length]}%` : '18%';
              const duration = isPlaying ? 0.4 + (i % 6) * 0.12 : 0.8;

              return (
                <motion.div
                  key={i}
                  animate={{ height: targetHeight }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    repeatType: 'reverse',
                    duration: duration,
                    ease: 'easeInOut',
                  }}
                  className={`w-1.5 rounded-full transition-colors ${
                    isPlaying
                      ? i % 3 === 0
                        ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                        : 'bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.6)]'
                      : 'bg-white/20'
                  }`}
                  style={{ minHeight: '6px' }}
                />
              );
            })}
          </div>

          <div className="text-center">
            <span className="text-xs text-slate-400">
              {isPlaying ? (
                <span className="text-teal-300 font-medium inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                  {language === 'en' ? 'Harmonic frequency active' : 'সুর বাজছে... উপভোগ করুন'}
                </span>
              ) : (
                <span>{language === 'en' ? 'Click play to activate preview' : 'প্লে বাটনে ক্লিক করে গান শুনুন'}</span>
              )}
            </span>
          </div>
        </div>

        {/* Right Column: Song Lyric Stage & Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Song Meta Card */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 font-medium">
                {language === 'en' ? currentSong.genreEn : currentSong.genreBn}
              </span>
              <span className="text-slate-400 font-mono">Released {currentSong.year}</span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-400/90 font-medium">
                {language === 'en' ? 'Lyrics: Asif Iqbal' : 'কথা: আসিফ ইকবাল'}
              </span>
            </div>

            <h4 className="font-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
              {language === 'en' ? currentSong.titleEn : currentSong.titleBn}
            </h4>

            <p className="text-sm text-slate-300">
              <span className="text-slate-400">{language === 'en' ? 'Performed by: ' : 'কণ্ঠ: '}</span>
              <span className="font-semibold text-white">
                {language === 'en' ? currentSong.artistEn : currentSong.artistBn}
              </span>
            </p>
          </div>

          {/* Dynamic Bengali Lyric Projection Box */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-teal-950/40 via-slate-900/60 to-black/40 border border-teal-500/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-teal-400/80 font-mono uppercase tracking-wider">
              <span>{language === 'en' ? 'Authentic Lyric Excerpt' : 'নির্বাচিত গীতবাণী'}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <div className="space-y-1.5 py-1 min-h-[90px] flex flex-col justify-center">
              {(language === 'en' ? currentSong.lyricSampleEn : currentSong.lyricSampleBn).map(
                (line, idx) => (
                  <motion.p
                    key={idx}
                    animate={{
                      opacity: isPlaying && activeLyricIndex === idx ? 1 : 0.65,
                      scale: isPlaying && activeLyricIndex === idx ? 1.02 : 1,
                      x: isPlaying && activeLyricIndex === idx ? 6 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`font-editorial text-lg sm:text-xl transition-colors ${
                      isPlaying && activeLyricIndex === idx
                        ? 'text-amber-300 font-semibold drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'text-slate-300'
                    }`}
                  >
                    {line}
                  </motion.p>
                )
              )}
            </div>
          </div>

          {/* Interactive Song Selector Carousel / Pills */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {language === 'en' ? 'Select Iconic Song:' : 'অন্য গান নির্বাচন করুন:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {FEATURED_SONGS.map((song, idx) => {
                const isCurrent = idx === selectedSongIndex;
                return (
                  <button
                    key={song.id}
                    onClick={() => handleSelectSong(idx)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                      isCurrent
                        ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{language === 'en' ? song.titleEn : song.titleBn}</span>
                    <span className="text-[10px] opacity-75 font-mono">{song.year}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
