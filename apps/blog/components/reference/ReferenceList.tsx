import * as React from 'react';
import { cn } from '@/lib/utils';
import { ReferenceCard } from './ReferenceCard';
import type { ReferenceMeta, Language } from '@/types/content';

export interface ReferenceListProps {
  /** Array of references to display */
  references: ReferenceMeta[];
  /** Visual variant for cards */
  variant?: 'default' | 'compact';
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Additional CSS classes */
  className?: string;
  /** Message to show when no references */
  emptyMessage?: string;
  /** Base path for reference links (defaults to /references) */
  basePath?: string;
  /** Language for localized labels (defaults to en) */
  language?: Language;
}

/**
 * ReferenceList - Grid or list of reference cards
 *
 * Layouts:
 * - grid: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - list: Single column list with larger cards
 */
export function ReferenceList({
  references,
  variant = 'default',
  layout = 'grid',
  className,
  emptyMessage = 'No references found.',
  basePath = '/references',
  language = 'en',
}: ReferenceListProps) {
  if (references.length === 0) {
    return (
      <div className={cn('reference-list reference-list--empty py-12 text-center text-figure-muted', className)}>
        <p className="reference-list-empty-message">{emptyMessage}</p>
      </div>
    );
  }

  const layoutStyles = {
    grid: 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
    list: 'flex flex-col gap-4',
  };

  return (
    <div
      className={cn('reference-list', layoutStyles[layout], className)}
      role="list"
      aria-label="Reference list"
      data-layout={layout}
      data-count={references.length}
    >
      {references.map((reference) => (
        <div key={reference.slug} role="listitem" className="reference-list-item">
          <ReferenceCard
            slug={reference.slug}
            category={reference.category}
            topics={reference.topics}
            title={reference.title}
            description={reference.description}
            date={reference.date}
            updated={reference.updated}
            itemCount={reference.itemCount}
            readingTime={reference.readingTime}
            variant={variant}
            basePath={basePath}
            language={language}
          />
        </div>
      ))}
    </div>
  );
}
