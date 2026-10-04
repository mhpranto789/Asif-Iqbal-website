import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { Camera, Check, Sparkles, Mic, Award, Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface PortraitSlotProps {
  photoUrl?: string | null;
  altText: string;
  className?: string;
  language: Language;
  variant?: 'hero' | 'editorial' | 'compact';
}

export const PortraitSlot: React.FC<PortraitSlotProps> = ({
  photoUrl,
  altText,
  className = '',
  language,
}) => {
  const [customUrl, setCustomUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('asif_iqbal_custom_portrait') || null;
    } catch {
      return null;
    }
  });
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeUrl = customUrl || photoUrl;

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setCustomUrl(inputVal.trim());
      try {
        localStorage.setItem('asif_iqbal_custom_portrait', inputVal.trim());
      } catch {
        // ignore
      }
      setImgError(false);
      setShowInput(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomUrl(result);
          try {
            localStorage.setItem('asif_iqbal_custom_portrait', result);
          } catch {
            // ignore
          }
          setImgError(false);
          setShowInput(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToArt = () => {
    setCustomUrl(null);
    try {
      localStorage.removeItem('asif_iqbal_custom_portrait');
    } catch {
      // ignore
    }
    setImgError(false);
  };

  if (activeUrl && !imgError) {
    return (
      <motion.div
        initial="initial"
        whileHover="hover"
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#121E2A] to-[#0A1118] border border-teal-500/30 shadow-2xl transition-all duration-300 hover:border-teal-400/50 hover:shadow-teal-500/20 group cursor-pointer ${className}`}
      >
        <motion.img
          src={activeUrl}
          alt={altText}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full min-h-[480px] sm:min-h-[540px] object-cover object-top will-change-transform"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-black/20 to-transparent pointer-events-none" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-teal-500/10 to-transparent pointer-events-none" />

        {/* Floating Executive Tag */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-teal-300 font-medium flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>{language === 'en' ? 'Executive & Lyricist' : 'করপোরেট রূপান্তরকামী ও গীতিকবি'}</span>
          </div>
        </div>



        {/* Dropdown Change Photo Box */}
        {showInput && (
          <div className="absolute inset-x-4 top-16 z-20 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-teal-500/40 shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-200">
              <span className="font-semibold">Update Portrait Photo</span>
              <button onClick={() => setShowInput(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleApplyUrl} className="space-y-2">
              <input
                type="url"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Paste image URL..."
                className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-teal-400"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded cursor-pointer"
                >
                  Apply URL
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded border border-slate-700 cursor-pointer flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </form>
            <button
              onClick={handleResetToArt}
              className="text-[10px] text-amber-400 hover:underline block text-center w-full"
            >
              Reset to High-Fidelity Artistic Rendering
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  // High-Fidelity Artistic & Graphic Editorial Composition
  // Depicting Asif Iqbal speaking with microphone, glasses, salt-and-pepper beard, and conference presence
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F1C28] via-[#132332] to-[#0A1118] text-white border border-teal-500/30 shadow-2xl flex flex-col justify-between p-6 sm:p-8 select-none ${className}`}
      aria-label="Editorial visual composition for Asif Iqbal"
    >
      {/* Background Architectural Grid & Subtle Radial Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Stylized Executive Portrait Illustration in SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <svg
          viewBox="0 0 400 480"
          className="w-full h-full max-w-[340px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle concentric soundwaves / halo behind head */}
          <circle cx="200" cy="180" r="140" stroke="#14B8A6" strokeWidth="0.75" strokeDasharray="6 6" opacity="0.4" />
          <circle cx="200" cy="180" r="100" stroke="#F59E0B" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.3" />
          <circle cx="200" cy="180" r="60" stroke="#14B8A6" strokeWidth="0.75" opacity="0.25" />

          {/* Shoulders & Conference Attire Silhouette */}
          <path
            d="M 60 480 C 70 380, 120 340, 200 340 C 280 340, 330 380, 340 480 Z"
            fill="url(#suitGradient)"
            opacity="0.85"
          />

          {/* Neck & Face Silhouette */}
          <rect x="175" y="270" width="50" height="60" rx="10" fill="#E2E8F0" opacity="0.25" />
          <ellipse cx="200" cy="195" rx="65" ry="85" fill="#CBD5E1" opacity="0.3" />

          {/* Beard Profile */}
          <path
            d="M 145 195 C 145 285, 255 285, 255 195 C 240 230, 215 255, 200 255 C 185 255, 160 230, 145 195 Z"
            fill="#334155"
            opacity="0.8"
          />

          {/* Signature Glasses Outline */}
          <rect x="150" y="165" width="40" height="26" rx="6" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.85" />
          <rect x="210" y="165" width="40" height="26" rx="6" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.85" />
          <line x1="190" y1="178" x2="210" y2="178" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.85" />

          {/* Dynamic Conference Microphone in hand */}
          <g transform="translate(190, 260)">
            <rect x="-12" y="-18" width="24" height="34" rx="10" fill="#14B8A6" opacity="0.9" />
            <rect x="-6" y="16" width="12" height="40" rx="4" fill="#0D9488" />
            {/* Mic Grille */}
            <line x1="-10" y1="-8" x2="10" y2="-8" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="-10" y1="8" x2="10" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>

          {/* Definitions */}
          <defs>
            <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#0B131B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top Header / Badging */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-teal-300 font-semibold">
            {language === 'en' ? 'The Polymath Leader' : 'সংস্কৃতি ও রূপান্তরের প্রতীক'}
          </span>
        </div>

        {/* Monogram Seal */}
        <div className="w-10 h-10 rounded-xl border border-teal-500/40 bg-teal-950/60 backdrop-blur-md flex flex-col items-center justify-center text-teal-200 shadow-md">
          <span className="font-display font-bold text-xs leading-none text-white">AI</span>
          <span className="text-[9px] text-teal-400 leading-none mt-0.5">আ.ই</span>
        </div>
      </div>

      {/* Center Narrative Focus */}
      <div className="relative z-10 py-10 space-y-4">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
            {language === 'en' ? 'Keynote & Executive Portrait' : 'সম্মেলন ও প্রাতিষ্ঠানিক মঞ্চ'}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-bold tracking-tight">
            {language === 'en' ? 'Asif Iqbal' : 'আসিফ ইকবাল'}
          </h2>
          <div className="text-sm font-medium text-amber-400">
            {language === 'en'
              ? 'Chairman, Lyricist, Educator & Transformation Architect'
              : 'চেয়ারম্যান, গীতিকার, শিক্ষক ও প্রাতিষ্ঠানিক রূপান্তরের রূপকার'}
          </div>
        </div>

        {/* Signature Quote */}
        <p className="font-editorial italic text-base sm:text-lg text-slate-200 max-w-sm leading-relaxed border-l-2 border-teal-400 pl-3">
          "{language === 'en'
            ? 'Where strategy meets soul, and profit serves purpose.'
            : 'যেখানে কৌশলের সাথে আত্মার মেলবন্ধন, আর মুনাফা নিয়োজিত মহৎ উদ্দেশ্যে।'}"
        </p>

        {/* 4 Pillars Unboxed */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="text-teal-300 font-medium">30+ Yrs Corporate</span>
          <span>·</span>
          <span className="text-amber-300 font-medium">42+ Yrs Songwriting</span>
          <span>·</span>
          <span>900+ Artisans (ASIX)</span>
        </div>
      </div>

      {/* Bottom Interactive Area & Direct Upload Utility */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center gap-2 text-[11px]">
          <Mic className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span>{language === 'en' ? 'Keynote speaker at AMA Drishty Contest' : 'এএমএ দৃষ্টি বিজনেস আইডিয়া কনটেস্ট'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Upload photo from your computer"
          >
            <Upload className="w-3 h-3" />
            <span>{language === 'en' ? 'Upload Photo' : 'ছবি যোগ করুন'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => setShowInput(!showInput)}
            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
            title="Paste image URL"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Image URL Input Modal */}
      {showInput && (
        <div className="absolute inset-x-4 top-16 z-30 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-teal-500/40 shadow-2xl space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-200">
            <span className="font-semibold">Add Custom Portrait URL</span>
            <button onClick={() => setShowInput(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <form onSubmit={handleApplyUrl} className="space-y-2">
            <input
              type="url"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              className="w-full py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded cursor-pointer"
            >
              Set Photo
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};
