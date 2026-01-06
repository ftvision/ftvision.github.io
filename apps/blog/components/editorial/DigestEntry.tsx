'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DigestEntryProps {
  /** Article title */
  title: string;
  /** Source URL */
  href: string;
  /** Category tag */
  category?: string;
  /** Child content (MDX prose) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * DigestEntry - Card component for digest article entries
 *
 * Displays an article with:
 * - Linked title (h3 level, but rendered as styled div to avoid TOC)
 * - Category badge
 * - Full prose content as children
 */
export function DigestEntry({
  title,
  href,
  category,
  children,
  className,
}: DigestEntryProps) {
  const isExternal = href.startsWith('http');

  return (
    <article
      className={cn(
        'digest-entry',
        'p-6 my-6',
        'border border-border-muted',
        'bg-ground-primary',
        className
      )}
    >
      {/* Title as link */}
      <div className="mb-3 pb-2 border-b border-border-muted">
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={cn(
            'font-serif text-figure-primary type-h3',
            'hover:text-link transition-colors',
            'hover:underline underline-offset-4 decoration-1'
          )}
        >
          {title}
          {isExternal && (
            <span
              className="inline-block ml-2 text-figure-muted text-base"
              aria-hidden="true"
            >
              ↗
            </span>
          )}
        </a>
      </div>

      {/* Category badge */}
      {category && (
        <div className="mb-4">
          <span className="inline-flex items-center justify-center font-medium text-label px-2 py-0.5 rounded bg-ground-tertiary text-figure-secondary">
            {category}
          </span>
        </div>
      )}

      {/* Content */}
      {children && (
        <div className="digest-entry-content prose prose-sm max-w-none">
          {children}
        </div>
      )}
    </article>
  );
}
