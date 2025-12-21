import * as React from 'react';
import { cn } from '@/lib/utils';
import { EssayCard } from './EssayCard';
import type { EssayMeta } from '@/types/content';

export interface EssayListProps {
  /** Array of essays to display */
  essays: EssayMeta[];
  /** Visual variant for cards */
  variant?: 'default' | 'compact';
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Additional CSS classes */
  className?: string;
  /** Message to show when no essays */
  emptyMessage?: string;
  /** Base path for essay links (defaults to /essays) */
  basePath?: string;
}

/**
 * EssayList - Grid or list of essay cards
 *
 * Layouts:
 * - grid: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - list: Single column list with larger cards
 */
export function EssayList({
  essays,
  variant = 'default',
  layout = 'grid',
  className,
  emptyMessage = 'No essays found.',
  basePath = '/essays',
}: EssayListProps) {
  if (essays.length === 0) {
    return (
      <div className={cn('essay-list essay-list--empty py-12 text-center text-figure-muted', className)}>
        <p className="essay-list-empty-message">{emptyMessage}</p>
      </div>
    );
  }

  const layoutStyles = {
    grid: 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
    list: 'flex flex-col gap-4',
  };

  return (
    <div
      className={cn('essay-list', layoutStyles[layout], className)}
      role="list"
      aria-label="Essay list"
      data-layout={layout}
      data-count={essays.length}
    >
      {essays.map((essay) => (
        <div key={essay.slug} role="listitem" className="essay-list-item">
          <EssayCard
            slug={essay.slug}
            type={essay.type}
            topics={essay.topics}
            title={essay.title}
            description={essay.description}
            date={essay.date}
            readingTime={essay.readingTime}
            variant={variant}
            basePath={basePath}
          />
        </div>
      ))}
    </div>
  );
}
