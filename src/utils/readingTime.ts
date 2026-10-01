import { Language } from '../types';

export interface ReadingTimeResult {
  minutes: number;
  text: string;
  wordCount: number;
  wordCountText: string;
}

/**
 * Converts Western digits to Bengali digits.
 */
export function toBengaliDigits(n: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return n
    .toString()
    .split('')
    .map((char) => {
      const parsed = parseInt(char, 10);
      return isNaN(parsed) ? char : bengaliDigits[parsed];
    })
    .join('');
}

/**
 * Calculates reading time and word count dynamically based on article text and selected language.
 * Standard adult reading speed:
 * - English: ~200-220 words per minute
 * - Bengali: ~180 words per minute
 */
export function calculateReadingTime(text: string, language: Language): ReadingTimeResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      minutes: 1,
      text: language === 'en' ? '1 min read' : '১ মিনিট পাঠ',
      wordCount: 0,
      wordCountText: language === 'en' ? '0 words' : '০ শব্দ',
    };
  }

  // Count words by splitting on whitespace sequences
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const wpm = language === 'bn' ? 180 : 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wpm));

  const textOutput =
    language === 'en'
      ? `${minutes} min read`
      : `${toBengaliDigits(minutes)} মিনিট পাঠ`;

  const wordCountOutput =
    language === 'en'
      ? `${wordCount.toLocaleString()} words`
      : `${toBengaliDigits(wordCount)} শব্দ`;

  return {
    minutes,
    text: textOutput,
    wordCount,
    wordCountText: wordCountOutput,
  };
}
