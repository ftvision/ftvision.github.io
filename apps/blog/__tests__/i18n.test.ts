import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  getLanguageFromPath,
  localizePathname,
  isValidLanguage,
  toggleLanguage,
  getLanguageBasePath,
  getStoredLanguage,
  setStoredLanguage,
  applyLanguage,
  LANGUAGE_KEY,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  LANGUAGE_NAMES,
  LANGUAGE_CODES,
  type Language,
} from '@/lib/i18n/language';
import {
  translate,
  getTypeLabel,
  getTopicLabel,
  formatReadingTime,
  formatDate,
  formatResultsCount,
} from '@/lib/i18n/translations';

describe('Language Utilities', () => {
  describe('getLanguageFromPath', () => {
    it('returns "zh" for paths starting with /zh', () => {
      expect(getLanguageFromPath('/zh')).toBe('zh');
      expect(getLanguageFromPath('/zh/')).toBe('zh');
      expect(getLanguageFromPath('/zh/essays')).toBe('zh');
      expect(getLanguageFromPath('/zh/essays/my-post')).toBe('zh');
      expect(getLanguageFromPath('/zh/about')).toBe('zh');
    });

    it('returns "en" for paths not starting with /zh', () => {
      expect(getLanguageFromPath('/')).toBe('en');
      expect(getLanguageFromPath('/essays')).toBe('en');
      expect(getLanguageFromPath('/essays/my-post')).toBe('en');
      expect(getLanguageFromPath('/about')).toBe('en');
    });
  });

  describe('localizePathname', () => {
    it('adds /zh prefix for Chinese language', () => {
      expect(localizePathname('/', 'zh')).toBe('/zh');
      expect(localizePathname('/essays', 'zh')).toBe('/zh/essays');
      expect(localizePathname('/essays/my-post', 'zh')).toBe('/zh/essays/my-post');
      expect(localizePathname('/about', 'zh')).toBe('/zh/about');
    });

    it('removes /zh prefix for English language', () => {
      expect(localizePathname('/zh', 'en')).toBe('/');
      expect(localizePathname('/zh/', 'en')).toBe('/');
      expect(localizePathname('/zh/essays', 'en')).toBe('/essays');
      expect(localizePathname('/zh/essays/my-post', 'en')).toBe('/essays/my-post');
    });

    it('keeps English paths unchanged for English language', () => {
      expect(localizePathname('/', 'en')).toBe('/');
      expect(localizePathname('/essays', 'en')).toBe('/essays');
      expect(localizePathname('/about', 'en')).toBe('/about');
    });

    it('converts Chinese paths to Chinese format', () => {
      expect(localizePathname('/zh/essays', 'zh')).toBe('/zh/essays');
    });
  });

  describe('isValidLanguage', () => {
    it('returns true for valid languages', () => {
      expect(isValidLanguage('en')).toBe(true);
      expect(isValidLanguage('zh')).toBe(true);
    });

    it('returns false for invalid languages', () => {
      expect(isValidLanguage('fr')).toBe(false);
      expect(isValidLanguage('')).toBe(false);
      expect(isValidLanguage(null)).toBe(false);
      expect(isValidLanguage(undefined)).toBe(false);
      expect(isValidLanguage(123)).toBe(false);
    });
  });

  describe('toggleLanguage', () => {
    it('toggles between en and zh', () => {
      expect(toggleLanguage('en')).toBe('zh');
      expect(toggleLanguage('zh')).toBe('en');
    });
  });

  describe('getLanguageBasePath', () => {
    it('returns empty string for English', () => {
      expect(getLanguageBasePath('en')).toBe('');
    });

    it('returns /zh for Chinese', () => {
      expect(getLanguageBasePath('zh')).toBe('/zh');
    });
  });

  describe('constants', () => {
    it('has correct default language', () => {
      expect(DEFAULT_LANGUAGE).toBe('en');
    });

    it('has correct supported languages', () => {
      expect(SUPPORTED_LANGUAGES).toEqual(['en', 'zh']);
    });

    it('has correct language names', () => {
      expect(LANGUAGE_NAMES.en).toBe('English');
      expect(LANGUAGE_NAMES.zh).toBe('中文');
    });

    it('has correct language codes', () => {
      expect(LANGUAGE_CODES.en).toBe('EN');
      expect(LANGUAGE_CODES.zh).toBe('中文');
    });
  });
});

describe('Translation Utilities', () => {
  describe('translate', () => {
    it('returns English translation for en language', () => {
      expect(translate('en', 'nav.essays')).toBe('Essays');
      expect(translate('en', 'nav.about')).toBe('About');
      expect(translate('en', 'site.name')).toBe('Algo Mind');
    });

    it('returns Chinese translation for zh language', () => {
      expect(translate('zh', 'nav.essays')).toBe('文章');
      expect(translate('zh', 'nav.about')).toBe('关于');
      expect(translate('zh', 'site.name')).toBe('思算');
    });

    it('supports interpolation with params', () => {
      expect(translate('en', 'essay.readingTime', { minutes: 5 })).toBe('5 min read');
      expect(translate('zh', 'essay.readingTime', { minutes: 5 })).toBe('阅读时间 5 分钟');
    });
  });

  describe('getTypeLabel', () => {
    it('returns localized type labels', () => {
      expect(getTypeLabel('en', 'guide')).toBe('Guide');
      expect(getTypeLabel('en', 'deep-dive')).toBe('Deep Dive');
      expect(getTypeLabel('zh', 'guide')).toBe('指南');
      expect(getTypeLabel('zh', 'deep-dive')).toBe('深度分析');
    });
  });

  describe('getTopicLabel', () => {
    it('returns localized topic labels', () => {
      expect(getTopicLabel('en', 'technical')).toBe('Technical');
      expect(getTopicLabel('en', 'career')).toBe('Career');
      expect(getTopicLabel('zh', 'technical')).toBe('技术');
      expect(getTopicLabel('zh', 'career')).toBe('职业');
    });
  });

  describe('formatReadingTime', () => {
    it('formats reading time in English', () => {
      expect(formatReadingTime('en', 5)).toBe('5 min read');
      expect(formatReadingTime('en', 10)).toBe('10 min read');
    });

    it('formats reading time in Chinese', () => {
      expect(formatReadingTime('zh', 5)).toBe('阅读时间 5 分钟');
      expect(formatReadingTime('zh', 10)).toBe('阅读时间 10 分钟');
    });
  });

  describe('formatDate', () => {
    it('formats date in English locale', () => {
      const result = formatDate('en', '2024-01-15');
      // Date formatting may vary by environment, just check it contains the year
      expect(result).toContain('2024');
    });

    it('formats date in Chinese locale', () => {
      const result = formatDate('zh', '2024-01-15');
      expect(result).toContain('2024');
    });
  });

  describe('formatResultsCount', () => {
    it('returns singular form for 1 result', () => {
      expect(formatResultsCount('en', 1)).toBe('1 essay');
      expect(formatResultsCount('zh', 1)).toBe('1 篇文章');
    });

    it('returns plural form for multiple results', () => {
      expect(formatResultsCount('en', 5)).toBe('5 essays');
      expect(formatResultsCount('zh', 5)).toBe('5 篇文章');
    });

    it('returns no results message for 0', () => {
      expect(formatResultsCount('en', 0)).toBe('No essays found');
      expect(formatResultsCount('zh', 0)).toBe('没有找到文章');
    });
  });
});

describe('LocalStorage Language Functions', () => {
  const originalLocalStorage = global.localStorage;
  let mockStorage: Record<string, string>;

  beforeEach(() => {
    mockStorage = {};
    const mockLocalStorage = {
      getItem: vi.fn((key: string) => mockStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      }),
      length: 0,
      key: vi.fn(),
    };
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
  });

  describe('getStoredLanguage', () => {
    it('returns null when no language is stored', () => {
      expect(getStoredLanguage()).toBeNull();
    });

    it('returns stored language when valid', () => {
      mockStorage[LANGUAGE_KEY] = 'zh';
      expect(getStoredLanguage()).toBe('zh');
    });

    it('returns null for invalid stored value', () => {
      mockStorage[LANGUAGE_KEY] = 'invalid';
      expect(getStoredLanguage()).toBeNull();
    });
  });

  describe('setStoredLanguage', () => {
    it('stores language in localStorage', () => {
      setStoredLanguage('zh');
      expect(localStorage.setItem).toHaveBeenCalledWith(LANGUAGE_KEY, 'zh');
    });
  });
});

describe('Document Language Functions', () => {
  beforeEach(() => {
    // Create a mock document.documentElement
    Object.defineProperty(global, 'document', {
      value: {
        documentElement: {
          lang: '',
          dataset: {},
        },
      },
      writable: true,
    });
  });

  describe('applyLanguage', () => {
    it('sets lang attribute on html element', () => {
      applyLanguage('zh');
      expect(document.documentElement.lang).toBe('zh');
      expect(document.documentElement.dataset.language).toBe('zh');
    });

    it('sets lang to en', () => {
      applyLanguage('en');
      expect(document.documentElement.lang).toBe('en');
      expect(document.documentElement.dataset.language).toBe('en');
    });
  });
});
