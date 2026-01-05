import * as React from 'react';
import { cn } from '@/lib/utils';
import { SeriesCard } from './SeriesCard';
import type { SeriesMeta, Language } from '@/types/content';

export interface SeriesListProps {
  /** Array of series to display */
  series: SeriesMeta[];
  /** Visual variant for cards */
  variant?: 'default' | 'compact';
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Additional CSS classes */
  className?: string;
  /** Message to show when no series */
  emptyMessage?: string;
  /** Base path for series links (defaults to /series) */
  basePath?: string;
  /** Language for localized labels (defaults to en) */
  language?: Language;
}

/**
 * SeriesList - Grid or list of series cards
 *
 * Layouts:
 * - grid: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - list: Single column list with larger cards
 */
export function SeriesList({
  series,
  variant = 'default',
  layout = 'grid',
  className,
  emptyMessage = 'No series found.',
  basePath = '/series',
  language = 'en',
}: SeriesListProps) {
  if (series.length === 0) {
    return (
      <div className={cn('series-list series-list--empty py-12 text-center text-figure-muted', className)}>
        <p className="series-list-empty-message">{emptyMessage}</p>
      </div>
    );
  }

  const layoutStyles = {
    grid: 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
    list: 'flex flex-col gap-4',
  };

  return (
    <div
      className={cn('series-list', layoutStyles[layout], className)}
      role="list"
      aria-label="Series list"
      data-layout={layout}
      data-count={series.length}
    >
      {series.map((item) => (
        <div key={item.slug} role="listitem" className="series-list-item">
          <SeriesCard
            slug={item.slug}
            category={item.category}
            topics={item.topics}
            title={item.title}
            description={item.description}
            date={item.date}
            updated={item.updated}
            itemCount={item.itemCount}
            readingTime={item.readingTime}
            variant={variant}
            basePath={basePath}
            language={language}
          />
        </div>
      ))}
    </div>
  );
}
