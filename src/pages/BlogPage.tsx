import React, { useState } from 'react';
import { RoutePath, Language, BlogArticle } from '../types';
import { translations } from '../data/translations';
import { blogArticles } from '../data/siteContent';
import { calculateReadingTime } from '../utils/readingTime';
import { Clock, ArrowRight, ArrowLeft, BookOpen, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSection, ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface BlogPageProps {
  onNavigate: (route: RoutePath) => void;
  language: Language;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, language }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = translations[language].blog;

  // Selected active article if in single reading view
  const activeArticle = blogArticles.find((a) => a.id === selectedArticleId);

  // Extract unique categories
  const categories = [
    'all',
    ...Array.from(new Set(blogArticles.map((a) => (language === 'en' ? a.categoryEn : a.categoryBn)))),
  ];

  const filteredArticles = blogArticles.filter((article) => {
    if (activeCategory === 'all') return true;
    const cat = language === 'en' ? article.categoryEn : article.categoryBn;
    return cat === activeCategory;
  });

  const handleCopyLink = (articleId: string) => {
    const url = `${window.location.origin}/blog#${articleId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(articleId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // If viewing a full single article
  if (activeArticle) {
    const articleText = (language === 'en' ? activeArticle.paragraphsEn : activeArticle.paragraphsBn).join(' ');
    const readingStats = calculateReadingTime(articleText, language);

    return (
      <div className="max-w-[1280px] mx-auto px-6 py-10 pb-24 space-y-10">
        {/* Back control */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setSelectedArticleId(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToList}</span>
          </button>
        </motion.div>

        {/* Article Container */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-8"
        >
          {/* Clean Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-teal-700 px-2 py-0.5 rounded bg-teal-50">
              {language === 'en' ? activeArticle.categoryEn : activeArticle.categoryBn}
            </span>
            <span aria-hidden="true">·</span>
            <span>{language === 'en' ? activeArticle.publishDateEn : activeArticle.publishDateBn}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-medium text-[#0D161F]">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>{readingStats.text}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{readingStats.wordCountText}</span>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#0D161F] tracking-tight leading-tight">
              {language === 'en' ? activeArticle.titleEn : activeArticle.titleBn}
            </h1>
            <p className="font-editorial italic text-lg sm:text-xl text-teal-800 leading-relaxed">
              "{language === 'en' ? activeArticle.subtitleEn : activeArticle.subtitleBn}"
            </p>
          </div>

          <div className="bridge-line" aria-hidden="true" />

          {/* Article Body */}
          <div className="space-y-6 text-base sm:text-lg text-[#0D161F] leading-relaxed font-body">
            {(language === 'en' ? activeArticle.paragraphsEn : activeArticle.paragraphsBn).map((p, idx) => (
              <p key={idx} className="leading-relaxed text-slate-800">
                {p}
              </p>
            ))}
          </div>

          {/* Bottom Article Actions */}
          <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="text-xs font-bold uppercase tracking-wider text-teal-700 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToList}</span>
            </button>

            <button
              onClick={() => handleCopyLink(activeArticle.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              {copiedId === activeArticle.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{t.copiedLink}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>{t.shareArticle}</span>
                </>
              )}
            </button>
          </div>
        </motion.article>
      </div>
    );
  }

  // Articles List View with Intersection Observer Animations
  return (
    <div className="space-y-16 lg:space-y-24 py-10 pb-24">
      {/* Page Header */}
      <ScrollSection yOffset={24} className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.eyebrow}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D161F] tracking-tight">
            {t.heading}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
            {t.subheading}
          </p>
        </div>
      </ScrollSection>

      {/* Category Filter Controls */}
      <ScrollSection yOffset={16} delay={0.08} className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const label = cat === 'all' ? t.filterAll : cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0D161F] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </ScrollSection>

      {/* Articles Feed with Intersection Observer Cascade */}
      <ScrollSection className="max-w-[1280px] mx-auto px-6">
        <StaggerContainer className="space-y-6">
          {filteredArticles.map((article) => {
            const articleText = (language === 'en' ? article.paragraphsEn : article.paragraphsBn).join(' ');
            const readingStats = calculateReadingTime(articleText, language);

            return (
              <StaggerItem key={article.id}>
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-teal-500/50 hover:shadow-xl transition-all space-y-4 group"
                >
                  {/* Clean unboxed metadata with dynamic reading time */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold uppercase tracking-wider text-teal-700 px-2 py-0.5 rounded bg-teal-50">
                      {language === 'en' ? article.categoryEn : article.categoryBn}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{language === 'en' ? article.publishDateEn : article.publishDateBn}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 font-medium text-[#0D161F]">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{readingStats.text}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{readingStats.wordCountText}</span>
                  </div>

                  <div className="space-y-2">
                    <h2
                      onClick={() => setSelectedArticleId(article.id)}
                      className="font-display text-2xl sm:text-3xl font-bold text-[#0D161F] group-hover:text-teal-600 transition-colors cursor-pointer"
                    >
                      {language === 'en' ? article.titleEn : article.titleBn}
                    </h2>
                    <p className="text-xs font-semibold text-amber-600">
                      {language === 'en' ? article.subtitleEn : article.subtitleBn}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl font-body">
                    {language === 'en' ? article.excerptEn : article.excerptBn}
                  </p>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedArticleId(article.id)}
                      className="text-xs font-bold uppercase tracking-wider text-teal-700 group-hover:text-teal-900 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{t.readArticle}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleCopyLink(article.id)}
                      className="text-xs text-slate-400 hover:text-teal-600 inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === article.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">{t.copiedLink}</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3 h-3" />
                          <span>{t.shareArticle}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </ScrollSection>
    </div>
  );
};
