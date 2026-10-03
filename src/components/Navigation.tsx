import React, { useState, useEffect, useRef } from 'react';
import { RoutePath, Language } from '../types';
import { translations } from '../data/translations';
import { useTheme } from '../context/ThemeContext';
import {
  Compass,
  Briefcase,
  Music,
  Lightbulb,
  Mic,
  BookOpen,
  Mail,
  ArrowUpRight,
  Globe,
  Home,
  X,
  Check,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath) => void;
  language: Language;
  onToggleLanguage: () => void;
}

interface NavItemMeta {
  route: RoutePath;
  label: string;
  icon: typeof Compass;
  previewEn: string;
  previewBn: string;
  tagEn: string;
  tagBn: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentRoute,
  onNavigate,
  language,
  onToggleLanguage,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState<RoutePath | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[language];

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect scroll to adapt navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          openButtonRef.current?.focus();
        }
        if (langDropdownOpen) {
          setLangDropdownOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, langDropdownOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navItems: NavItemMeta[] = [
    {
      route: 'story',
      label: t.nav.story,
      icon: Compass,
      previewEn: 'Biographical narrative, audio & career architecture',
      previewBn: 'জীবনগাথা, ভয়েস অডিও ও কর্মযাত্রার মহীরূহ',
      tagEn: 'Biography',
      tagBn: 'জীবনগাথা',
    },
    {
      route: 'work',
      label: t.nav.work,
      icon: Briefcase,
      previewEn: 'Unilever, Meghna, Shwapno & enterprise ventures',
      previewBn: 'ইউনিলিভার, মেঘনা, স্বপ্ন ও শীর্ষ রূপান্তর',
      tagEn: 'Leadership',
      tagBn: 'নেতৃত্ব',
    },
    {
      route: 'music',
      label: t.nav.music,
      icon: Music,
      previewEn: '1,000+ timeless songs & 1988 debut "Anonna"',
      previewBn: 'কালজয়ী ১০০০+ গান ও ‘অনন্যা’র চার দশক',
      tagEn: 'Discography',
      tagBn: 'গীতবিতান',
    },
    {
      route: 'ideas',
      label: t.nav.ideas,
      icon: Lightbulb,
      previewEn: 'Philosophy, published books & leadership mindset',
      previewBn: 'নেতৃত্ব দর্শন, প্রকাশিত গ্রন্থ ও মূলনীতি',
      tagEn: 'Frameworks',
      tagBn: 'দর্শন',
    },
    {
      route: 'speaking',
      label: t.nav.speaking,
      icon: Mic,
      previewEn: 'Keynotes, IBA faculty sessions & podcast media',
      previewBn: 'বক্তব্য, আইবিএ শিক্ষকতা ও পডকাস্ট',
      tagEn: 'Lectures',
      tagBn: 'বক্তব্য',
    },
    {
      route: 'blog',
      label: t.nav.blog,
      icon: BookOpen,
      previewEn: 'Leadership thought pieces & strategic columns',
      previewBn: 'প্রবন্ধ, সমসাময়িক কলাম ও গবেষণা',
      tagEn: 'Articles',
      tagBn: 'প্রবন্ধ',
    },
  ];

  const handleNavClick = (route: RoutePath) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
    setHoveredRoute(null);
  };

  const activeItemMeta = navItems.find((n) => n.route === hoveredRoute);

  return (
    <>
      {/* Modern Floating Dynamic Island Header (Transparent wrapper so hero background shines through) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-transparent ${
          isScrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-4'
        } px-3 sm:px-6`}
      >
        {/* Skip Navigation for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 px-4 py-2 bg-[#0D161F] text-white text-sm font-medium rounded-lg shadow-md"
        >
          Skip to main content
        </a>

        {/* Dynamic Capsule Container with Crisp White Background */}
        <div
          className={`max-w-[1240px] mx-auto rounded-2xl sm:rounded-full transition-all duration-300 flex items-center justify-between px-3 sm:px-5 py-2 relative text-[#0D161F] ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-lg shadow-black/[0.04]'
              : 'bg-white/90 backdrop-blur-lg border border-slate-200/80 shadow-md shadow-black/[0.02]'
          }`}
        >
          {/* Brand Monogram & Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none shrink-0"
            aria-label={language === 'en' ? 'Go to Asif Iqbal Homepage' : 'আসিফ ইকবাল মূলপাতা'}
          >
            {/* Elegant Monogram Seal with Amber Accent */}
            <motion.div
              whileHover={{ rotate: [0, -6, 6, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-8 h-8 rounded-lg bg-[#0D161F] border border-slate-800 group-hover:bg-teal-700 group-hover:border-teal-700 transition-colors flex items-center justify-center text-white font-serif font-bold text-xs tracking-wider shadow-xs relative overflow-hidden"
            >
              <span>AI</span>
              <span className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-amber-400 group-hover:scale-150 transition-transform" />
            </motion.div>

            <div className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-bold text-[#0D161F] tracking-tight group-hover:text-teal-700 transition-colors leading-none">
                {language === 'en' ? 'Asif Iqbal' : 'আসিফ ইকবাল'}
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-500 font-mono tracking-wider pt-0.5">
                {language === 'en' ? 'Polymath Builder' : 'নির্মাতা ও চিন্তাবিদ'}
              </span>
            </div>
          </button>

          {/* Desktop Interactive Nav Track (Blends seamlessly with white navbar background) */}
          <div className="hidden md:block relative">
            <nav
              className="flex items-center gap-1 relative bg-transparent"
              aria-label="Main Navigation"
              onMouseLeave={() => setHoveredRoute(null)}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.route;
                const isHovered = hoveredRoute === item.route;

                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    onMouseEnter={() => setHoveredRoute(item.route)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer z-10 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-teal-800 font-bold'
                        : isHovered
                        ? 'text-[#0D161F]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Interactive Micro-Icon on Hover/Active */}
                    <Icon
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        isActive
                          ? 'text-teal-700 scale-110'
                          : isHovered
                          ? 'text-amber-600 scale-110'
                          : 'text-slate-400 opacity-70'
                      }`}
                    />

                    {/* Fluid Gliding Hover & Active Pill Background (Softly matches background) */}
                    {isActive && (
                      <motion.div
                        layoutId="navActivePill"
                        className="absolute inset-0 bg-slate-100/90 rounded-full border border-slate-200/80 -z-10"
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                      />
                    )}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="navHoverPill"
                        className="absolute inset-0 bg-slate-50/80 rounded-full border border-slate-100 -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}

                    <span>{item.label}</span>

                    {/* Animated Equalizer Wave on Music Item */}
                    {item.route === 'music' && isHovered && (
                      <span className="flex items-end gap-0.5 h-3 ml-0.5">
                        <span className="w-0.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                        <span className="w-0.5 h-3 bg-teal-600 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-0.5 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:300ms]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Interactive Floating Micro-Preview Tooltip on Hover */}
            <AnimatePresence>
              {hoveredRoute && activeItemMeta && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3.5 py-1.5 rounded-xl bg-[#0D161F] text-white shadow-2xl border border-white/15 pointer-events-none z-30 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {language === 'en' ? activeItemMeta.tagEn : activeItemMeta.tagBn}
                  </span>
                  <span className="text-xs text-slate-200 font-medium">
                    {language === 'en' ? activeItemMeta.previewEn : activeItemMeta.previewBn}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Utilities: Sleek Globe Language Pill + Contact CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Sleek Interactive Globe Language Pill (Light Theme) */}
            <div className="relative" ref={langDropdownRef}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                  langDropdownOpen
                    ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900/10'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/90'
                }`}
                title={language === 'en' ? 'Change Language' : 'ভাষা পরিবর্তন করুন'}
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
              >
                <Globe
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    langDropdownOpen ? 'rotate-90 text-amber-400' : 'text-teal-700'
                  }`}
                />
                <span className="tracking-wide">
                  {language === 'en' ? 'EN' : 'বাংলা'}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </motion.button>

              {/* Luxury Language Popover Menu */}
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white border border-slate-200 p-1.5 shadow-xl z-50 space-y-1 text-xs text-[#0D161F]"
                  >
                    <div className="px-2.5 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center justify-between">
                      <span>Select Language</span>
                      <Sparkles className="w-3 h-3 text-amber-500" />
                    </div>

                    {/* English Option */}
                    <button
                      onClick={() => {
                        if (language !== 'en') onToggleLanguage();
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                        language === 'en'
                          ? 'bg-teal-50 text-teal-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-[#0D161F]">English</span>
                        <span className="text-[10px] text-slate-500">Global Executive Archive</span>
                      </div>
                      {language === 'en' && <Check className="w-4 h-4 text-teal-700" />}
                    </button>

                    {/* Bangla Option */}
                    <button
                      onClick={() => {
                        if (language !== 'bn') onToggleLanguage();
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                        language === 'bn'
                          ? 'bg-teal-50 text-teal-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-[#0D161F]">বাংলা (Bangla)</span>
                        <span className="text-[10px] text-slate-500">আসিফ ইকবালের মাতৃভাষা</span>
                      </div>
                      {language === 'bn' && <Check className="w-4 h-4 text-teal-700" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact CTA Button (Desktop) */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('contact')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer shadow-xs hover:shadow-sm ${
                currentRoute === 'contact'
                  ? 'bg-teal-700 text-white shadow-teal-700/20'
                  : 'bg-[#0D161F] text-white hover:bg-teal-700'
              }`}
            >
              <span>{t.nav.contact}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>

            {/* Mobile Animated Hamburger Button */}
            <button
              ref={openButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-800 hover:text-teal-700 hover:bg-slate-100 transition-colors focus-visible:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={`w-full h-0.5 bg-slate-800 rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-teal-700' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-slate-800 rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-slate-800 rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-teal-700' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Modern Interactive Mobile Navigation Sheet (Frosted Glass Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
            className="fixed inset-0 z-50 md:hidden flex flex-col justify-end"
          >
            {/* Frosted Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
            />

            {/* Interactive Sheet Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-h-[90vh] bg-[#0A121A] text-white rounded-t-3xl shadow-2xl flex flex-col z-10 border-t border-white/10 overflow-hidden"
            >
              {/* Sheet Drag Handle & Header */}
              <div className="pt-3 px-6 pb-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white">
                      {language === 'en' ? 'Asif Iqbal' : 'আসিফ ইকবাল'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {language === 'en' ? 'Navigation Hub' : 'নেভিগেশন মেনু'}
                    </div>
                  </div>
                </div>

                <button
                  ref={closeButtonRef}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label={t.nav.menuClose}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Staggered Navigation Items List */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2" aria-label="Mobile Navigation Menu">
                {/* Home Shortcut */}
                <button
                  onClick={() => handleNavClick('home')}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    currentRoute === 'home'
                      ? 'bg-teal-900/40 border border-teal-500/40 text-teal-300'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-amber-300">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {t.nav.home}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {language === 'en' ? 'Welcome & Polymath Overview' : 'মূলপাতা ও সারসংক্ষেপ'}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </button>

                {/* Section Items */}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.route;

                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavClick(item.route)}
                      className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-teal-900/40 border border-teal-500/40 text-teal-300'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isActive
                              ? 'bg-teal-500 text-slate-950 font-bold'
                              : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-white">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {language === 'en' ? item.previewEn : item.previewBn}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}

                {/* Contact Item */}
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    currentRoute === 'contact'
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-gradient-to-r from-teal-950 to-slate-900 border border-teal-500/30 text-teal-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {t.nav.contact}
                      </div>
                      <div className="text-[11px] opacity-80">
                        {language === 'en'
                          ? 'Speaking, Advisory & Inquiries'
                          : 'বক্তব্য, প্রাতিষ্ঠানিক পরামর্শ ও যোগাযোগ'}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Sheet Utilities with Sleek Language Selector */}
              <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-xs text-slate-400 font-mono">
                    {language === 'en' ? 'Language:' : 'ভাষা:'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/10 border border-white/10 text-xs">
                  <button
                    onClick={() => {
                      if (language !== 'en') onToggleLanguage();
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                      language === 'en'
                        ? 'bg-teal-500 text-slate-950 shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      if (language !== 'bn') onToggleLanguage();
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                      language === 'bn'
                        ? 'bg-teal-500 text-slate-950 shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    বাংলা
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Thumb-Friendly Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-3 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-sm mx-auto bg-[#0D161F]/92 backdrop-blur-xl border border-white/15 shadow-xl rounded-full p-1.5 flex items-center justify-around pointer-events-auto text-white">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
              currentRoute === 'home'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Home"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </button>

          <button
            onClick={() => handleNavClick('story')}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
              currentRoute === 'story'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Story"
          >
            <Compass className="w-4 h-4" />
            <span className="sr-only">Story</span>
          </button>

          <button
            onClick={() => handleNavClick('work')}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
              currentRoute === 'work'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Work"
          >
            <Briefcase className="w-4 h-4" />
            <span className="sr-only">Work</span>
          </button>

          <button
            onClick={() => handleNavClick('music')}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
              currentRoute === 'music'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Music"
          >
            <Music className="w-4 h-4" />
            <span className="sr-only">Music</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors cursor-pointer"
            title="All Sections"
          >
            <span className="text-xs font-bold font-mono tracking-tighter">MORE</span>
          </button>
        </div>
      </div>
    </>
  );
};
