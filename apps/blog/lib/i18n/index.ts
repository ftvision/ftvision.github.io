/**
 * Internationalization (i18n) utilities
 *
 * This module provides language detection, storage, and translation
 * functionality for the blog application.
 */

// Language utilities
export {
  type Language,
  LANGUAGE_KEY,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  LANGUAGE_NAMES,
  LANGUAGE_CODES,
  getStoredLanguage,
  setStoredLanguage,
  applyLanguage,
  getResolvedLanguage,
  getLanguageFromPath,
  getLanguageBasePath,
  localizePathname,
  isValidLanguage,
  toggleLanguage,
} from './language';

// Translation utilities
export {
  translations,
  type TranslationKey,
  translate,
  getTypeLabel,
  getTopicLabel,
  formatReadingTime,
  formatDate,
  formatResultsCount,
} from './translations';

// React context and hooks
export {
  LanguageProvider,
  type LanguageProviderProps,
  useLanguage,
  useLanguageMounted,
  useLanguageFromPath,
} from './context';
