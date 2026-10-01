import React from 'react';
import { RoutePath, Language } from '../types';
import { ArrowLeft, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: RoutePath) => void;
  language: Language;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, language }) => {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center space-y-6">
      <div className="w-14 h-14 bg-white border border-[#D9E1E5] flex items-center justify-center text-[#155E63]">
        <Compass className="w-7 h-7" />
      </div>

      <div className="space-y-2 max-w-lg">
        <span className="text-xs font-mono uppercase text-[#155E63] font-semibold">
          Error 404
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#101B25]">
          {language === 'en' ? 'Page Not Found' : 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি'}
        </h1>
        <p className="text-sm text-[#596774] leading-relaxed">
          {language === 'en'
            ? 'The requested destination does not exist or may have been relocated. Return to the homepage to explore the archives of work, music, and ideas.'
            : 'আপনার কাঙ্ক্ষিত পৃষ্ঠাটি পাওয়া যায়নি। মূলপাতায় ফিরে গিয়ে কাজ, গান ও চিন্তন সম্পর্কিত বিষয়গুলো দেখুন।'}
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-[#101B25] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#155E63] transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Return to Homepage' : 'মূলপাতায় ফিরে যান'}</span>
        </button>
        <button
          onClick={() => onNavigate('work')}
          className="px-6 py-3 border border-[#D9E1E5] text-[#101B25] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F6F7] transition-colors cursor-pointer"
        >
          <span>{language === 'en' ? 'Explore Work' : 'কাজের বিবরণ'}</span>
        </button>
      </div>
    </div>
  );
};
