'use client';

import Link from 'next/link';
import type { Language } from '@/lib/i18n';

interface NavigationOverlayProps {
  /** Current language */
  language: Language;
  /** Whether to show the overlay visually (vs just for screen readers) */
  visible?: boolean;
}

/**
 * Accessible navigation overlay for the experiment canvas
 *
 * Provides keyboard and screen reader accessible navigation
 * as a fallback/complement to the interactive 3D navigation.
 *
 * When visible=false, navigation is hidden visually but
 * remains accessible to screen readers.
 */
export function NavigationOverlay({
  language,
  visible = false,
}: NavigationOverlayProps) {
  const basePath = language === 'zh' ? '/zh' : '';

  const navItems = [
    { href: `${basePath}/essays`, label: language === 'zh' ? '文章' : 'Essays' },
    {
      href: `${basePath}/periodics`,
      label: language === 'zh' ? '周刊' : 'Periodics',
    },
    { href: `${basePath}/series`, label: language === 'zh' ? '系列' : 'Series' },
    { href: `${basePath}/about`, label: language === 'zh' ? '关于' : 'About' },
  ];

  return (
    <nav
      className={
        visible
          ? 'absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-6'
          : 'sr-only'
      }
      aria-label={language === 'zh' ? '主导航' : 'Main navigation'}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            visible
              ? 'text-body text-white/70 transition-colors hover:text-white'
              : ''
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
