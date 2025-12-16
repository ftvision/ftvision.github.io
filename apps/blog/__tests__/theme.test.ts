import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  type ThemeMode,
  type ThemeName,
  THEME_MODE_KEY,
  THEME_NAME_KEY,
  DEFAULT_THEME_MODE,
  DEFAULT_THEME_NAME,
  getStoredThemeMode,
  getStoredThemeName,
  getSystemPreference,
  setStoredThemeMode,
  setStoredThemeName,
  applyThemeMode,
  applyThemeName,
  getResolvedThemeMode,
  getResolvedThemeName,
  toggleThemeMode,
} from '../lib/theme';

describe('Theme utilities', () => {
  // Mock localStorage
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    localStorageMock = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => localStorageMock[key] || null,
      setItem: (key: string, value: string) => {
        localStorageMock[key] = value;
      },
      removeItem: (key: string) => {
        delete localStorageMock[key];
      },
      clear: () => {
        localStorageMock = {};
      },
    });

    // Mock document
    vi.stubGlobal('document', {
      documentElement: {
        dataset: {} as { mode?: string; theme?: string },
      },
    });

    // Mock window.matchMedia
    vi.stubGlobal('window', {
      matchMedia: (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)' ? false : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('Constants', () => {
    it('has correct storage keys', () => {
      expect(THEME_MODE_KEY).toBe('theme-mode');
      expect(THEME_NAME_KEY).toBe('theme-name');
    });

    it('has correct default values', () => {
      expect(DEFAULT_THEME_MODE).toBe('light');
      expect(DEFAULT_THEME_NAME).toBe('nyt');
    });
  });

  describe('getStoredThemeMode', () => {
    it('returns null when no mode is stored', () => {
      expect(getStoredThemeMode()).toBe(null);
    });

    it('returns stored light mode', () => {
      localStorageMock[THEME_MODE_KEY] = 'light';
      expect(getStoredThemeMode()).toBe('light');
    });

    it('returns stored dark mode', () => {
      localStorageMock[THEME_MODE_KEY] = 'dark';
      expect(getStoredThemeMode()).toBe('dark');
    });

    it('returns null for invalid stored value', () => {
      localStorageMock[THEME_MODE_KEY] = 'invalid';
      expect(getStoredThemeMode()).toBe(null);
    });
  });

  describe('getStoredThemeName', () => {
    it('returns null when no theme is stored', () => {
      expect(getStoredThemeName()).toBe(null);
    });

    it('returns stored nyt theme', () => {
      localStorageMock[THEME_NAME_KEY] = 'nyt';
      expect(getStoredThemeName()).toBe('nyt');
    });

    it('returns stored brutalism theme', () => {
      localStorageMock[THEME_NAME_KEY] = 'brutalism';
      expect(getStoredThemeName()).toBe('brutalism');
    });

    it('returns null for invalid stored value', () => {
      localStorageMock[THEME_NAME_KEY] = 'invalid';
      expect(getStoredThemeName()).toBe(null);
    });
  });

  describe('getSystemPreference', () => {
    it('returns light when system prefers light', () => {
      vi.stubGlobal('window', {
        matchMedia: (query: string) => ({
          matches: false, // Not dark
          media: query,
        }),
      });
      expect(getSystemPreference()).toBe('light');
    });

    it('returns dark when system prefers dark', () => {
      vi.stubGlobal('window', {
        matchMedia: (query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
        }),
      });
      expect(getSystemPreference()).toBe('dark');
    });
  });

  describe('setStoredThemeMode', () => {
    it('stores theme mode in localStorage', () => {
      setStoredThemeMode('dark');
      expect(localStorageMock[THEME_MODE_KEY]).toBe('dark');
    });
  });

  describe('setStoredThemeName', () => {
    it('stores theme name in localStorage', () => {
      setStoredThemeName('brutalism');
      expect(localStorageMock[THEME_NAME_KEY]).toBe('brutalism');
    });
  });

  describe('applyThemeMode', () => {
    it('sets data-mode attribute on document', () => {
      applyThemeMode('dark');
      expect(document.documentElement.dataset.mode).toBe('dark');
    });
  });

  describe('applyThemeName', () => {
    it('sets data-theme attribute on document', () => {
      applyThemeName('brutalism');
      expect(document.documentElement.dataset.theme).toBe('brutalism');
    });
  });

  describe('getResolvedThemeMode', () => {
    it('returns stored mode if available', () => {
      localStorageMock[THEME_MODE_KEY] = 'dark';
      expect(getResolvedThemeMode()).toBe('dark');
    });

    it('returns system preference if no stored mode', () => {
      vi.stubGlobal('window', {
        matchMedia: (query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
        }),
      });
      expect(getResolvedThemeMode()).toBe('dark');
    });
  });

  describe('getResolvedThemeName', () => {
    it('returns stored theme if available', () => {
      localStorageMock[THEME_NAME_KEY] = 'brutalism';
      expect(getResolvedThemeName()).toBe('brutalism');
    });

    it('returns default theme if no stored theme', () => {
      expect(getResolvedThemeName()).toBe('nyt');
    });
  });

  describe('toggleThemeMode', () => {
    it('toggles from light to dark', () => {
      localStorageMock[THEME_MODE_KEY] = 'light';
      const result = toggleThemeMode();
      expect(result).toBe('dark');
      expect(localStorageMock[THEME_MODE_KEY]).toBe('dark');
      expect(document.documentElement.dataset.mode).toBe('dark');
    });

    it('toggles from dark to light', () => {
      localStorageMock[THEME_MODE_KEY] = 'dark';
      const result = toggleThemeMode();
      expect(result).toBe('light');
      expect(localStorageMock[THEME_MODE_KEY]).toBe('light');
      expect(document.documentElement.dataset.mode).toBe('light');
    });
  });
});
