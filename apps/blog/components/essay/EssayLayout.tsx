'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { TableOfContents, type TocItem as SharedTocItem } from '@blog/ui';
import { NoteProvider } from '../content/NoteContext';
import { ReferenceProvider } from '../content/ReferenceContext';

// Import essay typography styles that use CSS custom properties
import '@/styles/essay.css';

export interface TocItem {
  /** Unique identifier (typically the heading id) */
  id: string;
  /** Display text for the ToC entry */
  title: string;
  /** Heading level (2 = h2, 3 = h3, etc.) */
  level: number;
}

export interface EssayLayoutProps {
  /** Essay header content (title, metadata, etc.) */
  header?: React.ReactNode;
  /** Main essay content */
  children: React.ReactNode;
  /**
   * Footer content rendered after the main essay body, outside the
   * `.essay-content` typography cascade. Use this for blocks like
   * "Related essays" that need a different visual register than the
   * article body.
   */
  footer?: React.ReactNode;
  /** Table of contents items */
  toc?: TocItem[];
  /** Additional CSS classes for the layout container */
  className?: string;
}

/**
 * EssayLayout - Centered content with ToC on left, sidenotes on right
 *
 * Layout approach (Tufte CSS-inspired):
 * - Main content is max-width constrained and centered
 * - Left side has space for Table of Contents (via padding)
 * - Right side has space for sidenotes (via padding)
 * - Sidenotes use float + negative margin to flow into the right space
 *
 * Responsive:
 * - Desktop (≥1280px): ToC on left, content centered, sidenotes on right
 * - Tablet (1024-1279px): Content with sidenotes, no ToC visible
 * - Mobile (<1024px): Single column, sidenotes expand inline
 *
 * The layout wraps content in NoteProvider and ReferenceProvider for
 * sidenote numbering and citation management.
 */
export function EssayLayout({ header, children, footer, toc, className }: EssayLayoutProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Track active heading via Intersection Observer
  React.useEffect(() => {
    if (!toc || toc.length === 0) return;

    const headingIds = toc.map((item) => item.id);
    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [toc]);

  const handleTocClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NoteProvider>
      <ReferenceProvider>
        {/* Wrapper for grid layout on desktop */}
        <div
          className={cn(
            'essay-layout-wrapper',
            // Mobile/Tablet: single column
            'px-4 py-8 md:px-6 md:py-12',
            // Desktop (xl): CSS Grid with ToC | Content | Sidenotes (symmetric widths)
            'xl:grid xl:grid-cols-[250px_1fr_250px] xl:gap-8',
            'xl:max-w-[1400px] xl:mx-auto xl:px-8',
            className
          )}
        >
          {/* Desktop ToC - sticky left sidebar */}
          <aside
            className={cn(
              'hidden xl:block',
              'relative'
            )}
          >
            {toc && toc.length > 0 && (
              <TableOfContents
                items={toc.map((item) => ({
                  id: item.id,
                  title: item.title,
                  // Map level: EssayLayout uses 2/3/4, TableOfContents uses 1/2/3
                  level: Math.min(Math.max(item.level - 1, 1), 3) as 1 | 2 | 3,
                }))}
                activeId={activeId || undefined}
                onItemClick={handleTocClick}
                position="sticky"
                showTitle={false}
                className="top-24 pt-12"
              />
            )}
          </aside>

          {/* Main content column */}
          <article
            className={cn(
              'essay-layout',
              // Tablet (lg): add right padding for sidenotes
              'lg:pr-[250px]',
              // Desktop (xl): no padding needed, grid handles it
              'xl:pr-0'
            )}
          >
            {/* Header */}
            {header && (
              <header
                className={cn(
                  'essay-header-container',
                  'mb-8 lg:mb-12',
                  // Match content width for consistency (fixed rem for cross-theme consistency)
                  'max-w-[38rem] lg:max-w-[42rem] xl:max-w-[42rem]'
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
                // Responsive max-width: fixed rem values for cross-theme consistency
                'max-w-[38rem] lg:max-w-[42rem] xl:max-w-[42rem]',
                // Base typography
                'text-body text-figure-primary',
                // Vertical rhythm
                '[&>*]:mb-6 [&>*:last-child]:mb-0'
              )}
            >
              {children}
            </div>

            {/* Footer slot — sits OUTSIDE .essay-content so its typography
                is not overridden by the article's cascading h2/a/ol styles.
                Width matches the article body so the block aligns visually. */}
            {footer && (
              <div className="max-w-[38rem] lg:max-w-[42rem] xl:max-w-[42rem]">
                {footer}
              </div>
            )}
          </article>

          {/* Right column placeholder for sidenotes (they float into this space) */}
          {/* pointer-events-none allows hero content to be clickable when it spans full width */}
          <aside className="hidden xl:block pointer-events-none" aria-hidden="true" />
        </div>
      </ReferenceProvider>
    </NoteProvider>
  );
}
