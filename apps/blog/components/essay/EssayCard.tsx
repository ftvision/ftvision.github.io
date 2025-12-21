import Link from 'next/link';
import { Badge, Card, CardHeader, CardContent, CardFooter } from '@blog/ui';
import { cn } from '@/lib/utils';
import { getEssayTypeLabel, getTopicLabel } from '@/lib/constants';
import { formatDate, formatReadingTime } from '@/lib/i18n/translations';
import type { EssayType, Topic, Language } from '@/types/content';

export interface EssayCardProps {
  /** Essay slug for URL */
  slug: string;
  /** Essay type (guide, deep-dive, opinion, review, narrative) */
  type: EssayType;
  /** Topics covered by the essay */
  topics: Topic[];
  /** Essay title */
  title: string;
  /** Description (will be truncated if too long) */
  description: string;
  /** Publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Reading time in minutes */
  readingTime?: number;
  /** Visual variant */
  variant?: 'default' | 'compact';
  /** Additional CSS classes */
  className?: string;
  /** Base path for essay links (defaults to /essays) */
  basePath?: string;
  /** Language for localized labels (defaults to en) */
  language?: Language;
}

/**
 * EssayCard - Preview card for essay listings
 *
 * Displays essay metadata in a card format suitable for grid/list views.
 * Links to the full essay page.
 *
 * Variants:
 * - default: Full card with description
 * - compact: Smaller card without description (for home page)
 */
export function EssayCard({
  slug,
  type,
  topics,
  title,
  description,
  date,
  readingTime,
  variant = 'default',
  className,
  basePath = '/essays',
  language = 'en',
}: EssayCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card
      variant="ghost"
      className={cn(
        'essay-card group relative transition-colors hover:bg-ground-secondary',
        isCompact && 'essay-card--compact',
        className
      )}
      data-variant={variant}
    >
      <Link
        href={`${basePath}/${slug}`}
        className="essay-card-link absolute inset-0 z-10"
        aria-label={`Read "${title}"`}
      >
        <span className="sr-only">Read article</span>
      </Link>

      <CardHeader className={cn(isCompact && 'pb-0')}>
        {/* Type and Topics row */}
        <div className="essay-card-meta flex flex-wrap items-center gap-2">
          <Badge variant="primary" size="sm" className="essay-card-type uppercase tracking-wide">
            {getEssayTypeLabel(type, language)}
          </Badge>
          {topics.length > 0 && !isCompact && (
            <>
              <span className="text-figure-muted" aria-hidden="true">
                ·
              </span>
              {topics.map((topic) => (
                <Badge key={topic} variant="outline" size="sm" className="essay-card-topic">
                  {getTopicLabel(topic, language)}
                </Badge>
              ))}
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="essay-card-title font-serif text-xl font-semibold leading-tight text-figure-primary group-hover:text-link">
          {title}
        </h3>
      </CardHeader>

      {!isCompact && (
        <CardContent className="pt-0">
          {/* Description - truncated to 2 lines */}
          <p className="essay-card-description line-clamp-2 text-body text-figure-secondary">
            {description}
          </p>
        </CardContent>
      )}

      <CardFooter className={cn('pt-0', isCompact && 'pb-inset-md')}>
        {/* Date and reading time */}
        <div className="essay-card-footer flex items-center gap-2 text-body-sm text-figure-muted">
          <time dateTime={date} className="essay-card-date">{formatDate(language, date)}</time>
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span className="essay-card-reading-time">{formatReadingTime(language, readingTime)}</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
