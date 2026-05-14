'use client';

import * as React from 'react';
import { Badge } from '@blog/ui';
import { cn } from '@/lib/utils';

export interface FeaturedCardProps {
  /** Display title */
  title: string;
  /** Link URL */
  href: string;
  /** Description paragraph */
  description: string;
  /** Optional source/publication attribution */
  source?: string;
  /** Optional label badge (e.g., "Editor's Pick") */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FeaturedCard - Large hero card for featured/highlighted content.
 *
 * Emphasis comes from the optional label badge, the larger serif title,
 * and the panel's background tint, not from a decorative accent stripe.
 */
export function FeaturedCard({
  title,
  href,
  description,
  source,
  label,
  className,
}: FeaturedCardProps) {
  const isExternal = href.startsWith('http');

  return (
    <div
      className={cn(
        'featured-card group',
        'p-6 md:p-8',
        'bg-ground-secondary/40 hover:bg-ground-secondary',
        'transition-colors duration-200',
        'rounded-sm',
        className
      )}
    >
      {/* Label badge */}
      {label && (
        <Badge
          variant="primary"
          size="sm"
          className="mb-3 uppercase tracking-wider"
        >
          {label}
        </Badge>
      )}

      {/* Title - this is the link, only title gets underline */}
      <h2 className="mb-3">
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={cn(
            'font-serif type-h2 text-figure-primary',
            'hover:text-link transition-colors',
            'hover:underline underline-offset-4 decoration-1'
          )}
        >
          {title}
          {isExternal && (
            <span
              className="inline-block ml-2 text-figure-muted text-lg"
              aria-hidden="true"
            >
              ↗
            </span>
          )}
        </a>
      </h2>

      {/* Description - no underline */}
      <p className="text-body text-figure-secondary mb-4 max-w-prose">
        {description}
      </p>

      {/* Source and read link */}
      <div className="flex items-center gap-3 text-body-sm text-figure-muted">
        {source && <span>{source}</span>}
        {source && <span aria-hidden="true">·</span>}
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="hover:text-link transition-colors"
        >
          阅读 →
        </a>
      </div>
    </div>
  );
}
