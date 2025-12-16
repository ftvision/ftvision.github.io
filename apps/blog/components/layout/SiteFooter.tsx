'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn, Separator } from '@blog/ui';

export interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface SiteFooterProps {
  /** Copyright text */
  copyright?: string;
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Additional class names */
  className?: string;
}

const currentYear = new Date().getFullYear();

export function SiteFooter({
  copyright = `© ${currentYear} All rights reserved.`,
  socialLinks,
  className,
}: SiteFooterProps) {
  return (
    <footer className={cn('border-t border-border bg-ground-primary', className)}>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="text-body-sm text-figure-muted">{copyright}</p>

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

        {/* Optional: Navigation links in footer */}
        <Separator spacing="md" variant="muted" className="mt-6 mb-4" />
        <nav
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          aria-label="Footer navigation"
        >
          <Link
            href="/essays"
            className="text-body-sm text-figure-muted hover:text-figure-primary transition-hover"
          >
            Essays
          </Link>
          <Link
            href="/about"
            className="text-body-sm text-figure-muted hover:text-figure-primary transition-hover"
          >
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
