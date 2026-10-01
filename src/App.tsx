/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoutePath, Language, EnquiryCategory } from './types';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollReveal';
import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { WorkPage } from './pages/WorkPage';
import { MusicPage } from './pages/MusicPage';
import { IdeasPage } from './pages/IdeasPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('asif_iqbal_lang');
      if (saved === 'en' || saved === 'bn') return saved;
    } catch (e) {
      // localStorage unavailable or blocked
    }
    return 'en';
  });

  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() => {
    try {
      const path = window.location.pathname.replace(/^\/+/g, '').split('/')[0].toLowerCase();
      if (!path || path === '' || path === 'index.html') return 'home';
      if (['home', 'story', 'work', 'music', 'ideas', 'speaking', 'blog', 'contact'].includes(path)) {
        return path as RoutePath;
      }
      // Also check hash fallback
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (['home', 'story', 'work', 'music', 'ideas', 'speaking', 'blog', 'contact'].includes(hash)) {
        return hash as RoutePath;
      }
    } catch (e) {
      // Safe fallback
    }
    return 'home';
  });

  const [isNotFound, setIsNotFound] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<EnquiryCategory | undefined>(undefined);

  // Sync route from browser URL history & popstate
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname.replace(/^\/+/g, '').split('/')[0].toLowerCase();
        if (!path || path === '' || path === 'index.html') {
          setCurrentRoute('home');
          setIsNotFound(false);
        } else if (['home', 'story', 'work', 'music', 'ideas', 'speaking', 'blog', 'contact'].includes(path)) {
          setCurrentRoute(path as RoutePath);
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      } catch (e) {
        setCurrentRoute('home');
        setIsNotFound(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update HTML lang attribute and page title on state changes
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('asif_iqbal_lang', language);
    } catch (e) {
      // Ignore storage errors
    }

    // Dynamic Title
    const titles: Record<RoutePath, { en: string; bn: string }> = {
      home: {
        en: 'Asif Iqbal – The Polymath Builder | আসিফ ইকবাল',
        bn: 'আসিফ ইকবাল – The Polymath Builder | মূলপাতা',
      },
      story: {
        en: 'Story – Asif Iqbal | Biographical Narrative',
        bn: 'জীবনগাথা – আসিফ ইকবাল',
      },
      work: {
        en: 'Work & Ventures – Asif Iqbal | Business Transformation',
        bn: 'উদ্যোগ ও রূপান্তর – আসিফ ইকবাল',
      },
      music: {
        en: 'Music & Songwriting – Asif Iqbal | Lyrical Archive',
        bn: 'সংগীত ও গীতিকবিতা – আসিফ ইকবাল',
      },
      ideas: {
        en: 'Ideas, Books & Frameworks – Asif Iqbal',
        bn: 'বই ও চিন্তন রূপরেখা – আসিফ ইকবাল',
      },
      speaking: {
        en: 'Speaking & Keynotes – Asif Iqbal',
        bn: 'বক্তৃতা ও কি-নোট – আসিফ ইকবাল',
      },
      blog: {
        en: 'Essays & Perspectives – Asif Iqbal | Articles',
        bn: 'প্রবন্ধ ও চিন্তন – আসিফ ইকবাল',
      },
      contact: {
        en: 'Connect & Inquiries – Asif Iqbal',
        bn: 'যোগাযোগ ও বার্তা – আসিফ ইকবাল',
      },
    };

    if (isNotFound) {
      document.title = language === 'en' ? 'Page Not Found – Asif Iqbal' : 'পৃষ্ঠা পাওয়া যায়নি – আসিফ ইকবাল';
    } else {
      document.title = titles[currentRoute]?.[language] || titles.home[language];
    }
  }, [language, currentRoute, isNotFound]);

  const handleNavigate = (route: RoutePath, category?: EnquiryCategory) => {
    setCurrentRoute(route);
    setIsNotFound(false);
    if (category) {
      setPreselectedCategory(category);
    } else {
      setPreselectedCategory(undefined);
    }

    const targetPath = route === 'home' ? '/' : `/${route}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      currentRoute === 'home' && !isNotFound ? 'bg-[#080E15]' : 'bg-[#F4F6F7]'
    } text-[#101B25] transition-colors duration-300 ${
      language === 'bn' ? 'font-bengali-body' : 'font-body'
    }`}>
      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Bar Navigation */}
      <Navigation
        currentRoute={isNotFound ? 'home' : currentRoute}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Semantic Main Content Area with Buttery Smooth Page Transitions */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        <AnimatePresence mode="wait">
          {isNotFound ? (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <NotFoundPage onNavigate={handleNavigate} language={language} />
            </motion.div>
          ) : (
            <motion.div
              key={currentRoute}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {currentRoute === 'home' && (
                <HomePage onNavigate={handleNavigate} language={language} />
              )}
              {currentRoute === 'story' && (
                <StoryPage onNavigate={handleNavigate} language={language} />
              )}
              {currentRoute === 'work' && (
                <WorkPage onNavigate={handleNavigate} language={language} />
              )}
              {currentRoute === 'music' && (
                <MusicPage onNavigate={handleNavigate} language={language} />
              )}
              {currentRoute === 'ideas' && (
                <IdeasPage onNavigate={handleNavigate} language={language} />
              )}
              {currentRoute === 'speaking' && (
                <SpeakingPage onNavigate={handleNavigate} language={language} />
              )}
              {currentRoute === 'blog' && (
                <BlogPage onNavigate={handleNavigate} language={language} />
              )}
              {currentRoute === 'contact' && (
                <ContactPage initialCategory={preselectedCategory} language={language} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} language={language} />
    </div>
  );
}
