'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ItemProps {
  /** Display title */
  title: string;
  /** Link URL */
  href: string;
  /** One-line description */
  description?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Item - Individual link item for editorial sections
 *
 * Displays a title as a link with red/accent bullet point and optional description.
 * External links (http/https) open in a new tab.
 * Matches the screenshot style with red circle bullet.
 */
export function Item({
  title,
  href,
  description,
  className,
}: ItemProps) {
  const isExternal = href.startsWith('http');

  return (
    <div
      className={cn(
        'editorial-item group',
        'py-2',
        className
      )}
    >
      <div className="flex items-start gap-2">
        {/* Red/accent bullet point */}
        <span
          className="text-accent-primary mt-1.5 shrink-0 text-sm"
          aria-hidden="true"
        >
          ○
        </span>

        <div className="flex-1 min-w-0">
          {/* Title as link */}
          <a
            href={href}
            className={cn(
              'text-accent-primary font-medium',
              'hover:underline underline-offset-2',
              'transition-colors'
            )}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            {title}
          </a>

          {/* Description */}
          {description && (
            <p className="text-body-sm text-figure-muted mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
