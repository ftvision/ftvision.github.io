'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  type Language,
  getStoredLanguage,
  setStoredLanguage,
  applyLanguage,
  getLanguageFromPath,
  localizePathname,
} from './language';
import {
  translate,
  type TranslationKey,
  formatDate,
  formatReadingTime,
  formatResultsCount,
  getTypeLabel,
  getTopicLabel,
} from './translations';

interface LanguageContextValue {
  /** Current language */
  language: Language;
  /** Set the language */
  setLanguage: (lang: Language) => void;
  /** Toggle between languages */
  toggleLanguage: () => void;
  /** Translate a key */
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  /** Format a date string */
  formatDate: (dateString: string) => string;
  /** Format reading time */
  formatReadingTime: (minutes: number) => string;
  /** Format results count */
  formatResultsCount: (count: number) => string;
  /** Get type label */
  getTypeLabel: (type: string) => string;
  /** Get topic label */
  getTopicLabel: (topic: string) => string;
  /** Get localized pathname */
  getLocalizedPath: (pathname: string) => string;
}

const LanguageContext = React.createContext<LanguageContextValue | undefined>(
  undefined
);

export interface LanguageProviderProps {
  children: React.ReactNode;
  /** Initial language based on URL (from server) */
  initialLanguage?: Language;
}

export function LanguageProvider({
  children,
  initialLanguage,
}: LanguageProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Get language from URL path - this is the source of truth for content
  const pathLanguage = getLanguageFromPath(pathname);

  // Initialize with path-based language to avoid hydration mismatch
  const [language, setLanguageState] = React.useState<Language>(
    initialLanguage ?? pathLanguage
  );
  const [_mounted, setMounted] = React.useState(false);

  // On mount, check if stored preference differs from URL and redirect if needed
  React.useEffect(() => {
    setMounted(true);
    const storedLanguage = getStoredLanguage();

    // If user has a stored preference that differs from current URL, redirect
    if (storedLanguage && storedLanguage !== pathLanguage) {
      const newPath = localizePathname(pathname, storedLanguage);
      router.replace(newPath);
    } else {
      // Otherwise, sync state with path language
      setLanguageState(pathLanguage);
      applyLanguage(pathLanguage);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep language in sync with URL path changes
  React.useEffect(() => {
    setLanguageState(pathLanguage);
    applyLanguage(pathLanguage);
  }, [pathLanguage]);

  const setLanguage = React.useCallback((newLang: Language) => {
    setLanguageState(newLang);
    setStoredLanguage(newLang);
    applyLanguage(newLang);
  }, []);

  const toggleLanguage = React.useCallback(() => {
    const newLang = language === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
  }, [language, setLanguage]);

  const t = React.useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      return translate(language, key, params);
    },
    [language]
  );

  const getLocalizedPath = React.useCallback(
    (pathname: string) => {
      return localizePathname(pathname, language);
    },
    [language]
  );

  const value = React.useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      formatDate: (dateString: string) => formatDate(language, dateString),
      formatReadingTime: (minutes: number) =>
        formatReadingTime(language, minutes),
      formatResultsCount: (count: number) =>
        formatResultsCount(language, count),
      getTypeLabel: (type: string) => getTypeLabel(language, type),
      getTopicLabel: (topic: string) => getTopicLabel(language, topic),
      getLocalizedPath,
    }),
    [language, setLanguage, toggleLanguage, t, getLocalizedPath]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access the language context
 */
export function useLanguage(): LanguageContextValue {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/**
 * Hook that returns true once the component has mounted.
 * Useful for avoiding hydration mismatches with language-dependent UI.
 */
export function useLanguageMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

/**
 * Hook to sync language with URL path
 * Use in client components that need to react to URL changes
 */
export function useLanguageFromPath(pathname: string): void {
  const { setLanguage, language } = useLanguage();

  React.useEffect(() => {
    const pathLanguage = getLanguageFromPath(pathname);
    if (pathLanguage !== language) {
      setLanguage(pathLanguage);
    }
  }, [pathname, language, setLanguage]);
}
