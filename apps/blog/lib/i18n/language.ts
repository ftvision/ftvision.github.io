/**
 * Language utilities for the blog application
 *
 * Provides language detection, storage, and application functions
 * following the same patterns as lib/theme.ts
 */

export type Language = 'en' | 'zh';

export const LANGUAGE_KEY = 'language-preference';
export const DEFAULT_LANGUAGE: Language = 'en';
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'zh'];

/**
 * Language display names
 */
export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  zh: '中文',
};

/**
 * Language codes for display in toggle
 */
export const LANGUAGE_CODES: Record<Language, string> = {
  en: 'EN',
  zh: '中文',
};

/**
 * Get the stored language preference from localStorage
 */
export function getStoredLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored === 'en' || stored === 'zh') {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Store the language preference in localStorage
 */
export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Apply the language to the document
 * Sets the lang attribute on the html element
 */
export function applyLanguage(lang: Language): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
  document.documentElement.dataset.language = lang;
}

/**
 * Get the resolved language (stored > URL > default)
 */
export function getResolvedLanguage(): Language {
  const stored = getStoredLanguage();
  if (stored) return stored;

  // Check URL path for /zh prefix
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/zh')) {
      return 'zh';
    }
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Get language from URL path
 */
export function getLanguageFromPath(pathname: string): Language {
  return pathname.startsWith('/zh') ? 'zh' : 'en';
}

/**
 * Get the base path for a language
 */
export function getLanguageBasePath(lang: Language): string {
  return lang === 'zh' ? '/zh' : '';
}

/**
 * Convert a path to use the specified language prefix
 */
export function localizePathname(pathname: string, lang: Language): string {
  // Remove existing /zh prefix if present
  const cleanPath = pathname.replace(/^\/zh/, '') || '/';

  if (lang === 'zh') {
    return `/zh${cleanPath === '/' ? '' : cleanPath}`;
  }

  return cleanPath;
}

/**
 * Check if a language is valid
 */
export function isValidLanguage(value: unknown): value is Language {
  return typeof value === 'string' && SUPPORTED_LANGUAGES.includes(value as Language);
}

/**
 * Toggle between languages
 */
export function toggleLanguage(current: Language): Language {
  return current === 'en' ? 'zh' : 'en';
}
