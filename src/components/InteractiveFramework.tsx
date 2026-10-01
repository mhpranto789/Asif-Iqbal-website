import React, { useState } from 'react';
import { Language } from '../types';
import { frameworkSteps } from '../data/siteContent';
import { translations } from '../data/translations';
import { ArrowRight, ChevronDown, ChevronUp, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveFrameworkProps {
  language: Language;
}

export const InteractiveFramework: React.FC<InteractiveFrameworkProps> = ({ language }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [expandedMobileStep, setExpandedMobileStep] = useState<number | null>(0);
  const t = translations[language].framework;

  const currentStep = frameworkSteps[activeStepIndex];

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-xl space-y-12">
      {/* Title & Introduction */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold tracking-wider uppercase">
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          <span>{language === 'en' ? 'Manuscript Model' : 'পাণ্ডুলিপিভিত্তিক রূপরেখা'}</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D161F] tracking-tight">
          {t.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
          {t.subtitle}
        </p>
        <p className="text-sm text-slate-700 leading-relaxed border-l-2 border-teal-600 pl-4 italic font-editorial">
          {t.intro}
        </p>
      </div>

      {/* Part 1: Three Foundational Resources */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
          {t.resourcesTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.resourcesList.map((resourceText, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 shadow-xs"
            >
              <div className="text-xs font-mono text-teal-700 font-semibold">Resource 0{idx + 1}</div>
              <p className="text-sm font-medium text-[#0D161F] leading-relaxed">
                {resourceText}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Part 2: Three Forces (Talent, Luck, Effort) */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500">
          {t.forcesTitle}
        </h3>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {t.forcesDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {t.forcesItems.map((force, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className={`p-6 rounded-2xl border transition-all ${
                idx === 2
                  ? 'bg-gradient-to-br from-[#0D161F] to-[#122230] text-white border-teal-500/30 shadow-lg'
                  : 'bg-slate-50 text-[#0D161F] border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between pb-2">
                <span className={`text-base font-bold ${idx === 2 ? 'text-white' : 'text-[#0D161F]'}`}>
                  {force.name}
                </span>
                {idx === 2 && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-500/40 px-2 py-0.5 rounded-full">
                    Direct Control
                  </span>
                )}
              </div>
              <p className={`text-xs leading-relaxed ${idx === 2 ? 'text-slate-300' : 'text-slate-600'}`}>
                {force.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Part 3: The Eight Steps */}
      <div className="pt-6 border-t border-slate-100 space-y-6">
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            {t.stepsTitle}
          </h3>
          <p className="text-xs text-slate-500 pt-1">
            {t.stepsSubtitle}
          </p>
        </div>

        {/* Desktop Step Selector (Horizontal calm timeline tabs) */}
        <div className="hidden lg:block space-y-6">
          <div className="grid grid-cols-8 border border-slate-200 rounded-xl overflow-hidden bg-slate-100 divide-x divide-slate-200">
            {frameworkSteps.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 text-left transition-all cursor-pointer focus-visible:outline-none relative ${
                    isSelected
                      ? 'bg-white text-teal-800 font-bold shadow-xs'
                      : 'hover:bg-white/50 text-slate-600'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="text-[11px] font-mono text-teal-600 font-semibold">
                    0{step.stepNumber}
                  </div>
                  <div className="text-xs font-medium truncate pt-1">
                    {language === 'en' ? step.labelEn.split(' ')[0] : step.labelBn}
                  </div>
                  {isSelected && (
                    <motion.div
                      layoutId="stepTabHighlight"
                      className="absolute bottom-0 inset-x-0 h-1 bg-teal-600"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Step Detail Pane */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.stepNumber}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-teal-700 font-semibold tracking-wider">
                    Step 0{currentStep.stepNumber} of 08
                  </span>
                  <h4 className="font-display text-2xl font-bold text-[#0D161F] pt-1">
                    {language === 'en' ? currentStep.labelEn : currentStep.labelBn}
                  </h4>
                </div>

                {/* Prev / Next controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeStepIndex === 0}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStepIndex((prev) => Math.min(frameworkSteps.length - 1, prev + 1))}
                    disabled={activeStepIndex === frameworkSteps.length - 1}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0D161F] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors cursor-pointer shadow-xs"
                  >
                    Next Step
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                    Summary Grounded in Manuscript
                  </span>
                  <p className="text-base text-[#0D161F] leading-relaxed pt-1.5 font-body">
                    {language === 'en' ? currentStep.summaryEn : currentStep.summaryBn}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-teal-500/20 shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                    Contemplative Reflection Prompt
                  </span>
                  <p className="text-sm font-editorial italic text-slate-800">
                    "{language === 'en' ? currentStep.reflectionPromptEn : currentStep.reflectionPromptBn}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
          {frameworkSteps.map((step, idx) => {
            const isExpanded = expandedMobileStep === idx;
            return (
              <div key={step.stepNumber} className="overflow-hidden">
                <button
                  onClick={() => setExpandedMobileStep(isExpanded ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-teal-600">
                      0{step.stepNumber}
                    </span>
                    <span className="text-sm font-semibold text-[#0D161F]">
                      {language === 'en' ? step.labelEn : step.labelBn}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3">
                    <p className="text-xs text-slate-700 leading-relaxed font-body">
                      {language === 'en' ? step.summaryEn : step.summaryBn}
                    </p>
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs italic text-teal-800 font-editorial">
                      "{language === 'en' ? step.reflectionPromptEn : step.reflectionPromptBn}"
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
