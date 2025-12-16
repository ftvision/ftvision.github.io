'use client';

import * as React from 'react';
import { Button } from '@blog/ui';
import { Tooltip } from '@blog/ui';
import { useTheme, useThemeMounted } from './ThemeProvider';

// Sun icon for light mode
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export interface ThemeToggleProps {
  /** Additional CSS classes */
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { mode, toggleMode } = useTheme();
  const mounted = useThemeMounted();

  // Render a placeholder with the same dimensions to avoid layout shift
  // This also prevents hydration mismatch since we don't know the theme on server
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={className}
        aria-label="Toggle theme"
        disabled
      >
        <span className="w-5 h-5" />
      </Button>
    );
  }

  const isDark = mode === 'dark';

  return (
    <Tooltip content={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMode}
        className={className}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Tooltip>
  );
}
