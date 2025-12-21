'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@blog/ui';
import {
  useLanguage,
  useLanguageMounted,
  localizePathname,
  type Language,
} from '@/lib/i18n';

// Compact language codes for trigger display
const LANGUAGE_SHORT: Record<Language, string> = {
  en: 'EN',
  zh: '中',
};

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

export interface LanguageToggleProps {
  /** Additional CSS classes */
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const mounted = useLanguageMounted();
  const router = useRouter();
  const pathname = usePathname();

  // Handle language selection
  const handleLanguageSelect = React.useCallback(
    (newLang: Language) => {
      if (newLang === language) return;
      setLanguage(newLang);
      const newPath = localizePathname(pathname, newLang);
      router.push(newPath);
    },
    [language, setLanguage, pathname, router]
  );

  // Show compact language code
  const currentLabel = mounted ? LANGUAGE_SHORT[language] : '...';

  return (
    <Dropdown align="end">
      <DropdownTrigger
        className={`inline-flex items-center justify-center rounded-md p-2 min-w-[36px] text-sm font-medium transition-colors hover:bg-ground-secondary hover:text-figure-primary ${className || ''}`}
        aria-label="Select language"
      >
        <span>{currentLabel}</span>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          onSelect={() => handleLanguageSelect('en')}
          className="flex items-center justify-between gap-4"
        >
          <span>English</span>
          {mounted && language === 'en' && <CheckIcon />}
        </DropdownItem>
        <DropdownItem
          onSelect={() => handleLanguageSelect('zh')}
          className="flex items-center justify-between gap-4"
        >
          <span>中文</span>
          {mounted && language === 'zh' && <CheckIcon />}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
