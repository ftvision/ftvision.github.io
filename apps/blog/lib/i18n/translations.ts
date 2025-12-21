/**
 * Translation utilities
 *
 * Loads translations from JSON locale files and provides
 * utility functions for formatting and interpolation.
 *
 * Data is stored in locales/*.json files (easy to edit, review, or send to translators).
 * This file contains only the utility functions.
 */

import type { Language } from './language';
import enLocale from './locales/en.json';
import zhLocale from './locales/zh.json';

/**
 * Translation data loaded from JSON locale files
 */
export const translations: Record<Language, Record<string, string>> = {
  en: enLocale,
  zh: zhLocale,
};

/**
 * All valid translation keys (derived from English locale)
 */
export type TranslationKey = keyof typeof enLocale;

/**
 * Get a translation string for the given language and key
 * Supports interpolation with {placeholder} syntax
 */
export function translate(
  lang: Language,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const value = translations[lang][key] || translations.en[key] || key;

  if (!params) return value;

  let result = value;
  for (const [param, val] of Object.entries(params)) {
    result = result.replace(`{${param}}`, String(val));
  }
  return result;
}

/**
 * Get localized essay type label
 */
export function getTypeLabel(lang: Language, type: string): string {
  const key = `type.${type}` as TranslationKey;
  return translate(lang, key);
}

/**
 * Get localized topic label
 */
export function getTopicLabel(lang: Language, topic: string): string {
  const key = `topic.${topic}` as TranslationKey;
  return translate(lang, key);
}

/**
 * Format reading time for display
 */
export function formatReadingTime(lang: Language, minutes: number): string {
  return translate(lang, 'essay.readingTime', { minutes });
}

/**
 * Format date for display
 */
export function formatDate(lang: Language, dateString: string): string {
  const date = new Date(dateString);
  const locale = lang === 'zh' ? 'zh-CN' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format results count for display
 */
export function formatResultsCount(lang: Language, count: number): string {
  if (count === 0) {
    return translate(lang, 'filter.noResults');
  }
  if (count === 1) {
    return translate(lang, 'filter.results.singular');
  }
  return translate(lang, 'filter.results', { count });
}
