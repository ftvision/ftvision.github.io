'use client';

import * as React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@blog/ui';
import { useTheme, useThemeMounted } from './ThemeProvider';
import { THEME_NAMES, THEME_NAME_LABELS, type ThemeName } from '@/lib/theme';

// NYT/Default theme icon - Classic newspaper/serif style
const DefaultThemeIcon = ({ size = 18 }: { size?: number }) => (
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
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M15 18h-5" />
    <path d="M10 6h8v4h-8V6Z" />
  </svg>
);

// Brutalism theme icon - Bold geometric blocks
const BrutalismThemeIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="8" height="8" />
    <rect x="13" y="3" width="8" height="8" />
    <rect x="3" y="13" width="8" height="8" />
    <rect x="13" y="13" width="8" height="8" />
  </svg>
);

// Chinese Aesthetic theme icon - 漢
const ChineseThemeIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <text
      x="12"
      y="19"
      textAnchor="middle"
      fill="currentColor"
      fontSize="22"
      fontFamily="serif"
      fontWeight="500"
    >
      漢
    </text>
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

// Map theme names to their icons
const THEME_ICONS: Record<ThemeName, React.FC<{ size?: number }>> = {
  nyt: DefaultThemeIcon,
  brutalism: BrutalismThemeIcon,
  'chinese-aesthetic': ChineseThemeIcon,
};

export interface ThemeSelectorProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * ThemeSelector - Icon-only dropdown for selecting theme
 */
export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { themeName, setThemeName } = useTheme();
  const mounted = useThemeMounted();

  const CurrentIcon = THEME_ICONS[themeName] || DefaultThemeIcon;

  return (
    <Dropdown align="end">
      <DropdownTrigger
        className={`inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-ground-secondary hover:text-figure-primary ${className || ''}`}
        aria-label="Select theme"
      >
        <CurrentIcon size={18} />
      </DropdownTrigger>
      <DropdownMenu>
        {THEME_NAMES.map((name) => {
          const Icon = THEME_ICONS[name];
          return (
            <DropdownItem
              key={name}
              onSelect={() => setThemeName(name)}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex items-center gap-2">
                <Icon size={16} />
                <span>{THEME_NAME_LABELS[name]}</span>
              </span>
              {mounted && themeName === name && <CheckIcon />}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
