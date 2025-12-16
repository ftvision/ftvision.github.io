'use client';

import * as React from 'react';
import {
  type ThemeMode,
  type ThemeName,
  getResolvedThemeMode,
  getResolvedThemeName,
  setStoredThemeMode,
  setStoredThemeName,
  applyThemeMode,
  applyThemeName,
  getSystemPreference,
  DEFAULT_THEME_MODE,
  DEFAULT_THEME_NAME,
} from '@/lib/theme';

interface ThemeContextValue {
  mode: ThemeMode;
  themeName: ThemeName;
  setMode: (mode: ThemeMode) => void;
  setThemeName: (name: ThemeName) => void;
  toggleMode: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default mode to use before hydration */
  defaultMode?: ThemeMode;
  /** Default theme name to use */
  defaultThemeName?: ThemeName;
}

export function ThemeProvider({
  children,
  defaultMode = DEFAULT_THEME_MODE,
  defaultThemeName = DEFAULT_THEME_NAME,
}: ThemeProviderProps) {
  // Initialize with default to avoid hydration mismatch
  // The actual value will be set in useEffect after mount
  const [mode, setModeState] = React.useState<ThemeMode>(defaultMode);
  const [themeName, setThemeNameState] =
    React.useState<ThemeName>(defaultThemeName);
  const [mounted, setMounted] = React.useState(false);

  // On mount, read the actual values from localStorage/system preference
  React.useEffect(() => {
    setMounted(true);
    const resolvedMode = getResolvedThemeMode();
    const resolvedThemeName = getResolvedThemeName();
    setModeState(resolvedMode);
    setThemeNameState(resolvedThemeName);
    applyThemeMode(resolvedMode);
    applyThemeName(resolvedThemeName);
  }, []);

  // Listen for system preference changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      // Only update if no stored preference
      if (!localStorage.getItem('theme-mode')) {
        const systemMode = getSystemPreference();
        setModeState(systemMode);
        applyThemeMode(systemMode);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setMode = React.useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    setStoredThemeMode(newMode);
    applyThemeMode(newMode);
  }, []);

  const setThemeName = React.useCallback((newName: ThemeName) => {
    setThemeNameState(newName);
    setStoredThemeName(newName);
    applyThemeName(newName);
  }, []);

  const toggleMode = React.useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setMode]);

  const value = React.useMemo(
    () => ({
      mode,
      themeName,
      setMode,
      setThemeName,
      toggleMode,
    }),
    [mode, themeName, setMode, setThemeName, toggleMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook that returns true once the component has mounted.
 * Useful for avoiding hydration mismatches with theme-dependent UI.
 */
export function useThemeMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
