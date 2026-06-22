import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getEssayTypeLabel, getTopicLabel } from '@/lib/constants';
import { formatDate, formatReadingTime, translate } from '@/lib/i18n/translations';
import type { EssayType, Topic, Language } from '@/types/content';

export interface EssayRowProps {
  /** Essay slug for URL */
  slug: string;
  /** Essay type (guide, deep-dive, opinion, review, narrative) */
  type: EssayType;
  /** Topics covered by the essay */
  topics: Topic[];
  /** Essay title */
  title: string;
  /** Description (truncated to one line) */
  description: string;
  /** Publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Reading time in minutes */
  readingTime?: number;
  /** Additional CSS classes */
  className?: string;
  /** Base path for essay links (defaults to /essays) */
  basePath?: string;
  /** Language for localized labels (defaults to en) */
  language?: Language;
}

/**
 * EssayRow - Editorial list row for essay listings
 *
 * A flat, left-aligned typographic row (no card chrome): meta line, serif
 * title, one-line description, and date. The whole row is one link. Hover
 * tints a slightly-bled background; keyboard focus shows a ring on the row.
 * Text aligns to the same left edge as the page header and filters.
 */
export function EssayRow({
  slug,
  type,
  topics,
  title,
  description,
  date,
  readingTime,
  className,
  basePath = '/essays',
  language = 'en',
}: EssayRowProps) {
  const typeLabel = getEssayTypeLabel(type, language);

  return (
    <article
      className={cn(
        'essay-row group relative',
        'transition-colors duration-150 hover:bg-ground-secondary',
        className
      )}
      data-type={type}
    >
      <Link
        href={`${basePath}/${slug}/`}
        aria-label={translate(language, 'essays.read', { title })}
        className={cn(
          'essay-row-link absolute inset-0 z-10',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring'
        )}
      />

      <div className="flex flex-col gap-2 px-4 py-7">
        {/* Meta: type kicker, then topic tags */}
        <div className="essay-row-meta flex flex-wrap items-baseline gap-x-3 gap-y-1 text-caption">
          <span className="essay-row-type font-semibold uppercase tracking-[0.08em] text-figure-secondary">
            {typeLabel}
          </span>
          {topics.length > 0 && (
            <span className="essay-row-topics flex flex-wrap items-center gap-x-2 text-figure-muted">
              {topics.map((topic, i) => (
                <span key={topic} className="flex items-center gap-x-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <span className="essay-row-topic">{getTopicLabel(topic, language)}</span>
                </span>
              ))}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="essay-row-title type-h4 text-balance text-figure-primary transition-colors group-hover:text-link">
          {title}
        </h3>

        {/* Description - one line */}
        {description && (
          <p className="essay-row-description line-clamp-1 text-body text-figure-secondary">
            {description}
          </p>
        )}

        {/* Date and reading time */}
        <div className="essay-row-footer flex items-center gap-2 text-caption text-figure-muted">
          <time dateTime={date} className="essay-row-date">
            {formatDate(language, date)}
          </time>
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span className="essay-row-reading-time">
                {formatReadingTime(language, readingTime)}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
