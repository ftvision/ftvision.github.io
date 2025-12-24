import * as React from 'react';
import { cn } from '@/lib/utils';
import { PeriodicCard } from './PeriodicCard';
import type { PeriodicMeta, Language } from '@/types/content';

export interface PeriodicListProps {
  /** Array of periodics to display */
  periodics: PeriodicMeta[];
  /** Visual variant for cards */
  variant?: 'default' | 'compact';
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Additional CSS classes */
  className?: string;
  /** Message to show when no periodics */
  emptyMessage?: string;
  /** Base path for periodic links (defaults to /periodics) */
  basePath?: string;
  /** Language for localized labels (defaults to en) */
  language?: Language;
}

/**
 * PeriodicList - Grid or list of periodic cards
 *
 * Layouts:
 * - grid: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - list: Single column list with larger cards (default for archive view)
 */
export function PeriodicList({
  periodics,
  variant = 'default',
  layout = 'list',
  className,
  emptyMessage = 'No periodics found.',
  basePath = '/periodics',
  language = 'en',
}: PeriodicListProps) {
  if (periodics.length === 0) {
    return (
      <div className={cn('periodic-list periodic-list--empty py-12 text-center text-figure-muted', className)}>
        <p className="periodic-list-empty-message">{emptyMessage}</p>
      </div>
    );
  }

  const layoutStyles = {
    grid: 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
    list: 'flex flex-col gap-4',
  };

  return (
    <div
      className={cn('periodic-list', layoutStyles[layout], className)}
      role="list"
      aria-label="Periodic list"
      data-layout={layout}
      data-count={periodics.length}
    >
      {periodics.map((periodic) => (
        <div key={periodic.slug} role="listitem" className="periodic-list-item">
          <PeriodicCard
            slug={periodic.slug}
            issue={periodic.issue}
            type={periodic.type}
            topics={periodic.topics}
            title={periodic.title}
            description={periodic.description}
            date={periodic.date}
            readingTime={periodic.readingTime}
            variant={variant}
            basePath={basePath}
            language={language}
          />
        </div>
      ))}
    </div>
  );
}
