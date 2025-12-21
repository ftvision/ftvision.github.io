'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@blog/ui';
import { useLanguage } from '@/lib/i18n';
import { translate } from '@/lib/i18n/translations';

export interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface SiteFooterProps {
  /** Copyright text (overrides localized default) */
  copyright?: string;
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Additional class names */
  className?: string;
}

const currentYear = new Date().getFullYear();

export function SiteFooter({
  copyright,
  socialLinks,
  className,
}: SiteFooterProps) {
  const { language } = useLanguage();
  const copyrightText = copyright || translate(language, 'footer.copyright', { year: currentYear });

  return (
    <footer className={cn('border-t border-border bg-ground-primary', className)}>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="text-body-sm text-figure-muted">{copyrightText}</p>

          {/* Social links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-figure-muted hover:text-figure-primary',
                    'transition-hover'
                  )}
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}
