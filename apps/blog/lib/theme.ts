/**
 * Theme utilities for the blog application
 */

export type ThemeMode = 'light' | 'dark';
export type ThemeName = 'nyt' | 'brutalism';

export const THEME_MODE_KEY = 'theme-mode';
export const THEME_NAME_KEY = 'theme-name';

export const DEFAULT_THEME_MODE: ThemeMode = 'light';
export const DEFAULT_THEME_NAME: ThemeName = 'nyt';

/**
 * Get the stored theme mode from localStorage
 */
export function getStoredThemeMode(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(THEME_MODE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get the stored theme name from localStorage
 */
export function getStoredThemeName(): ThemeName | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(THEME_NAME_KEY);
    if (stored === 'nyt' || stored === 'brutalism') {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get the system preferred color scheme
 */
export function getSystemPreference(): ThemeMode {
  if (typeof window === 'undefined') return DEFAULT_THEME_MODE;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Store the theme mode in localStorage
 */
export function setStoredThemeMode(mode: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_MODE_KEY, mode);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Store the theme name in localStorage
 */
export function setStoredThemeName(name: ThemeName): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_NAME_KEY, name);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Apply the theme mode to the document
 */
export function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.mode = mode;
}

/**
 * Apply the theme name to the document
 */
export function applyThemeName(name: ThemeName): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = name;
}

/**
 * Get the resolved theme mode (stored > system > default)
 */
export function getResolvedThemeMode(): ThemeMode {
  const stored = getStoredThemeMode();
  if (stored) return stored;
  return getSystemPreference();
}

/**
 * Get the resolved theme name (stored > default)
 */
export function getResolvedThemeName(): ThemeName {
  const stored = getStoredThemeName();
  if (stored) return stored;
  return DEFAULT_THEME_NAME;
}

/**
 * Toggle the theme mode between light and dark
 */
export function toggleThemeMode(): ThemeMode {
  const current = getResolvedThemeMode();
  const next = current === 'light' ? 'dark' : 'light';
  setStoredThemeMode(next);
  applyThemeMode(next);
  return next;
}
