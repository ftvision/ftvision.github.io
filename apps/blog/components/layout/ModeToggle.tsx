'use client';

import * as React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@blog/ui';
import { useTheme, useThemeMounted } from './ThemeProvider';

// Sun icon for light mode
const SunIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
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
const MoonIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
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

// Check icon for selected item
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface ModeToggleProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * ModeToggle - Icon-only dropdown for selecting light/dark mode
 */
export function ModeToggle({ className }: ModeToggleProps) {
  const { mode, setMode } = useTheme();
  const mounted = useThemeMounted();

  // Show current mode icon
  const CurrentIcon = mode === 'dark' ? MoonIcon : SunIcon;

  return (
    <Dropdown align="end">
      <DropdownTrigger
        className={`inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-ground-secondary hover:text-figure-primary ${className || ''}`}
        aria-label="Select mode"
      >
        <CurrentIcon size={18} />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          onSelect={() => setMode('light')}
          className="flex items-center justify-between gap-4"
        >
          <span className="flex items-center gap-2">
            <SunIcon size={16} />
            <span>Light</span>
          </span>
          {mounted && mode === 'light' && <CheckIcon />}
        </DropdownItem>
        <DropdownItem
          onSelect={() => setMode('dark')}
          className="flex items-center justify-between gap-4"
        >
          <span className="flex items-center gap-2">
            <MoonIcon size={16} />
            <span>Dark</span>
          </span>
          {mounted && mode === 'dark' && <CheckIcon />}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

// Keep ThemeToggle as an alias for backwards compatibility
export { ModeToggle as ThemeToggle };
export type { ModeToggleProps as ThemeToggleProps };
