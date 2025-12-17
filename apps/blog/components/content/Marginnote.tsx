'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MarginnoteProps {
  /** The note content to display in the margin */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Unnumbered margin note component
 *
 * Similar to Note but without numbering. Useful for contextual
 * information, asides, or supplementary content that doesn't
 * need to be referenced.
 *
 * - Desktop (>=1024px): Displays in right margin
 * - Mobile (<1024px): Expandable inline element
 *
 * Usage in MDX:
 * ```mdx
 * <Marginnote>This is a side comment without a number.</Marginnote>
 * ```
 */
export function Marginnote({ children, className }: MarginnoteProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const id = React.useId();

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <span className={cn('marginnote-wrapper inline', className)}>
      {/* Toggle indicator for mobile - shows a subtle marker */}
      <button
        type="button"
        className={cn(
          'marginnote-toggle',
          'text-link hover:text-link-hover',
          'transition-colors cursor-pointer',
          // Hide on desktop since content is always visible
          'lg:hidden'
        )}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls={`marginnote-content-${id}`}
        aria-label="Toggle margin note"
      >
        <span className="text-[0.75em] align-super">⁺</span>
      </button>

      {/* Note content - expandable on mobile, margin on desktop */}
      <span
        id={`marginnote-content-${id}`}
        role="note"
        className={cn(
          'marginnote-content',
          // Mobile: block element that expands/collapses
          'block',
          'overflow-hidden transition-all duration-200 ease-in-out',
          // Mobile collapsed state - hidden until expanded
          !isExpanded && 'max-h-0 opacity-0',
          // Mobile expanded state
          isExpanded && 'max-h-96 opacity-100 mt-2 mb-2 p-3 bg-ground-secondary rounded-md',
          isExpanded && 'text-body-sm text-figure-secondary',
          // Desktop: ALWAYS visible in margin, regardless of expanded state
          // Tufte CSS approach: float right with negative margin to pull into margin space
          // The parent container should have right padding to create the margin space
          'lg:block lg:max-h-none lg:opacity-100',
          'lg:float-right lg:clear-right',
          // Width is ~55% of prose width, negative margin pulls it into the padding
          'lg:w-[280px] lg:mr-[-320px]',
          'lg:mt-0 lg:mb-4 lg:ml-4 lg:p-0 lg:bg-transparent lg:rounded-none',
          'lg:text-caption lg:text-figure-muted lg:italic lg:leading-snug'
        )}
      >
        {children}
      </span>
    </span>
  );
}
