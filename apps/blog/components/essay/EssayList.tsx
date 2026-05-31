import * as React from 'react';
import { cn } from '@/lib/utils';
import { translate } from '@/lib/i18n/translations';
import { EssayCard } from './EssayCard';
import { EssayRow } from './EssayRow';
import type { EssayMeta, Language } from '@/types/content';

export interface EssayListProps {
  /** Array of essays to display */
  essays: EssayMeta[];
  /** Visual variant for cards (grid layout only) */
  variant?: 'default' | 'compact';
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Additional CSS classes */
  className?: string;
  /** Message to show when no essays */
  emptyMessage?: string;
  /** Base path for essay links (defaults to /essays) */
  basePath?: string;
  /** Language for localized labels (defaults to en) */
  language?: Language;
  /** Accessible label for the list landmark */
  ariaLabel?: string;
}

/**
 * EssayList - List or grid of essays
 *
 * Layouts:
 * - list: Editorial rows (EssayRow), separated by hairline rules, left-aligned.
 * - grid: Responsive card grid (EssayCard) for comparison-style browsing.
 */
export function EssayList({
  essays,
  variant = 'default',
  layout = 'grid',
  className,
  emptyMessage = 'No essays found.',
  basePath = '/essays',
  language = 'en',
  ariaLabel,
}: EssayListProps) {
  const listLabel = ariaLabel ?? translate(language, 'essays.listLabel');

  if (essays.length === 0) {
    return (
      <div
        className={cn(
          'essay-list essay-list--empty -mx-4 border-t border-border px-4 py-16 text-figure-muted',
          className
        )}
      >
        <p className="essay-list-empty-message text-body">{emptyMessage}</p>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <ul
        className={cn('essay-list -mx-4 flex flex-col', className)}
        aria-label={listLabel}
        data-layout="list"
        data-count={essays.length}
      >
        {essays.map((essay) => (
          <li
            key={essay.slug}
            className="essay-list-item border-t border-border"
          >
            <EssayRow
              slug={essay.slug}
              type={essay.type}
              topics={essay.topics}
              title={essay.title}
              description={essay.description}
              date={essay.date}
              readingTime={essay.readingTime}
              basePath={basePath}
              language={language}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={cn(
        'essay-list grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
      role="list"
      aria-label={listLabel}
      data-layout="grid"
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
            language={language}
          />
        </div>
      ))}
    </div>
  );
}
