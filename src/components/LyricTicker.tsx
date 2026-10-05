import React from 'react';
import { Language } from '../types';
import { Sparkles, Music } from 'lucide-react';

interface LyricTickerProps {
  language: Language;
}

const LYRIC_LINES = [
  {
    bn: '“অনন্যা, তুমি কি দেখছো আমায়? এই রাতে ক্লান্ত সব ঘরবাড়ি...”',
    en: '“Anonna, can you see me? In this night when all houses rest...”',
    song: 'Anonna (1988)',
  },
  {
    bn: '“চল সবাই একসাথে স্বপ্ন দেখি, নতুন এক ভোরের পথে হাঁটি...”',
    en: '“Let us all dream together, walk towards a new dawn...”',
    song: 'Cholo Shobai (2016)',
  },
  {
    bn: '“আমি এক ভবঘুরে মনের ঠিকানায়, খুঁজে ফিরি তোমায় সব কুয়াশায়...”',
    en: '“A vagabond in search of your address, seeking you through the mist...”',
    song: 'Bhoboghure (2008)',
  },
  {
    bn: '“মন কারিগর গড়েছে তোমায় এমন করে, যেদিকেই তাকাই তোমায় দেখাই পড়ে...”',
    en: '“The heart’s artisan crafted you with such devotion...”',
    song: 'Mon Karigor (2014)',
  },
  {
    bn: '“তুমি ছাড়া আর কে আছে বলো, এই ভালোবাসার সাগর পার হবো...”',
    en: '“Who else is there beside you to cross this sea of love...”',
    song: 'Tumi Chhara (2004)',
  },
  {
    bn: '“হৃদয়ের অতল গভীরে লুকিয়ে থাকে কিছু অব্যাক্ত সুর...”',
    en: '“Deep within the soul rests melody waiting to be spoken...”',
    song: 'Gaanchill Archive',
  },
];

export const LyricTicker: React.FC<LyricTickerProps> = ({ language }) => {
  return (
    <div className="w-full bg-[#0D161F] text-slate-300 py-3.5 border-y border-teal-500/20 overflow-hidden relative select-none">
      {/* Subtle fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0D161F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0D161F] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-8 animate-[marquee_45s_linear_infinite] whitespace-nowrap hover:[animation-play-state:paused]">
        {/* Double the array for seamless infinite scroll */}
        {[...LYRIC_LINES, ...LYRIC_LINES].map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-3 text-xs sm:text-sm font-editorial">
            <span className="text-amber-400">✦</span>
            <span className="text-white/90 font-medium">
              {language === 'en' ? item.en : item.bn}
            </span>
            <span className="text-[11px] text-teal-400/80 font-mono tracking-wider">
              [{item.song}]
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
