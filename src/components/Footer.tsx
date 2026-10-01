import React from 'react';
import { RoutePath, Language } from '../types';
import { translations } from '../data/translations';
import { assetConfig } from '../data/assetConfig';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavigate: (route: RoutePath) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#080E15] text-[#F4F6F7] border-t border-teal-500/20"
    >
      {/* Restrained continuous line of The Cultural Bridge */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-display text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{language === 'en' ? 'Asif Iqbal' : 'আসিফ ইকবাল'}</span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <p className="font-editorial italic text-lg text-slate-300 max-w-sm">
              "{t.footer.brandStatement}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md pt-2">
              {t.footer.editorialNotice}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-teal-400 font-mono">
              {t.footer.navigationHeader}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.story}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.work}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('music')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.music}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ideas')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.ideas}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('speaking')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.speaking}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Ventures & Verified Links */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-teal-400 font-mono">
              {t.footer.venturesHeader}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center justify-between">
                <span>Achieve Consulting</span>
                <span className="text-xs text-slate-400 font-mono">Transformation</span>
              </li>
              <li className="flex items-center justify-between">
                <span>ACIS</span>
                <span className="text-xs text-slate-400 font-mono">Creative AI</span>
              </li>
              <li className="flex items-center justify-between">
                {assetConfig.ventureLinks.asix ? (
                  <a
                    href={assetConfig.ventureLinks.asix}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>ASIX (Artisan Craft)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                ) : (
                  <span>ASIX</span>
                )}
                <span className="text-xs text-slate-400 font-mono">900+ Artisans</span>
              </li>
              <li className="flex items-center justify-between">
                {assetConfig.ventureLinks.gaanChill ? (
                  <a
                    href={assetConfig.ventureLinks.gaanChill}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>GaanChill Music</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                ) : (
                  <span>GaanChill Music</span>
                )}
                <span className="text-xs text-slate-400 font-mono">Bangla Sound</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-slate-400">
              {assetConfig.socialLinks.linkedin && (
                <a
                  href={assetConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-teal-400" />
                </a>
              )}
              {assetConfig.socialLinks.youtube && (
                <a
                  href={assetConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3 text-teal-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-4 font-mono">
            <span>Dhaka · Chittagong · Global</span>
            <span aria-hidden="true" className="text-teal-500">·</span>
            <span className="text-slate-300">English / বাংলা</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
