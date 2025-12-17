'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { NoteProvider } from '../content/NoteContext';
import { ReferenceProvider } from '../content/ReferenceContext';

// Import essay typography styles that use CSS custom properties
import '@/styles/essay.css';

export interface EssayLayoutProps {
  /** Essay header content (title, metadata, etc.) */
  header?: React.ReactNode;
  /** Main essay content */
  children: React.ReactNode;
  /** Additional CSS classes for the layout container */
  className?: string;
}

/**
 * EssayLayout - Centered content with right margin for sidenotes
 *
 * Layout approach (Tufte CSS-inspired):
 * - Main content is max-width constrained and left-aligned
 * - Right side has space for sidenotes (via padding)
 * - Sidenotes use float + negative margin to flow into the right space
 *
 * Responsive:
 * - Desktop (≥1024px): Content with sidenote margin on right
 * - Mobile (<1024px): Single column, sidenotes expand inline
 *
 * The layout wraps content in NoteProvider and ReferenceProvider for
 * sidenote numbering and citation management.
 */
export function EssayLayout({ header, children, className }: EssayLayoutProps) {
  return (
    <NoteProvider>
      <ReferenceProvider>
        <article
          className={cn(
            'essay-layout',
            // Mobile: single column with padding
            'px-4 py-8 md:px-6 md:py-12',
            // Desktop: centered layout with right margin space for sidenotes
            // The right padding creates space for floated sidenotes
            'lg:max-w-[1100px] lg:mx-auto lg:px-8',
            // Right padding provides the margin space for sidenotes
            'lg:pr-[340px]',
            className
          )}
        >
          {/* Header */}
          {header && (
            <header
              className={cn(
                'essay-header-container',
                'mb-8 lg:mb-12',
                'max-w-prose'
              )}
            >
              {header}
            </header>
          )}

          {/* Main content with max-width for readability */}
          {/* Typography styles for headings, paragraphs, etc. come from essay.css */}
          <div
            className={cn(
              'essay-content',
              'max-w-prose',
              // Base typography
              'text-body text-figure-primary',
              // Vertical rhythm
              '[&>*]:mb-6 [&>*:last-child]:mb-0'
            )}
          >
            {children}
          </div>
        </article>
      </ReferenceProvider>
    </NoteProvider>
  );
}
