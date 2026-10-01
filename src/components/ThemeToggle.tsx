import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface ThemeToggleProps {
  language: Language;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  language,
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const labelText = isDark
    ? language === 'en'
      ? 'Dark Mode'
      : 'ডার্ক মোড'
    : language === 'en'
    ? 'Light Mode'
    : 'লাইট মোড';

  const buttonTitle = isDark
    ? language === 'en'
      ? 'Switch to Light Mode'
      : 'লাইট মোডে পরিবর্তন করুন'
    : language === 'en'
    ? 'Switch to Dark Mode'
    : 'ডার্ক মোডে পরিবর্তন করুন';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={buttonTitle}
      title={buttonTitle}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shadow-2xs ${
        isDark
          ? 'bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 border border-slate-700'
          : 'bg-slate-100 hover:bg-slate-200/90 text-slate-800 border border-slate-200'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-amber-300 fill-amber-300/30" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          )}
        </motion.div>
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold select-none">
          {labelText}
        </span>
      )}
    </motion.button>
  );
};
