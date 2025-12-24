import Link from 'next/link';
import { Badge, Card, CardHeader, CardContent, CardFooter } from '@blog/ui';
import { cn } from '@/lib/utils';
import { getPeriodicTypeLabel, getTopicLabel } from '@/lib/constants';
import { formatDate, formatReadingTime } from '@/lib/i18n/translations';
import type { PeriodicType, Topic, Language } from '@/types/content';

export interface PeriodicCardProps {
  /** Periodic slug for URL */
  slug: string;
  /** Issue number */
  issue: number;
  /** Periodic type (digest, changelog, notes) */
  type: PeriodicType;
  /** Topics covered */
  topics: Topic[];
  /** Periodic title */
  title: string;
  /** Description (optional, will be truncated if too long) */
  description?: string;
  /** Publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Reading time in minutes */
  readingTime?: number;
  /** Visual variant */
  variant?: 'default' | 'compact';
  /** Additional CSS classes */
  className?: string;
  /** Base path for periodic links (defaults to /periodics) */
  basePath?: string;
  /** Language for localized labels (defaults to en) */
  language?: Language;
}

/**
 * PeriodicCard - Preview card for periodic listings
 *
 * Displays periodic metadata in a card format suitable for archive views.
 * Links to the full periodic page.
 *
 * Variants:
 * - default: Full card with description
 * - compact: Smaller card without description (for home page)
 */
export function PeriodicCard({
  slug,
  issue,
  type,
  topics,
  title,
  description,
  date,
  readingTime,
  variant = 'default',
  className,
  basePath = '/periodics',
  language = 'en',
}: PeriodicCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card
      variant="ghost"
      className={cn(
        'periodic-card group relative transition-colors hover:bg-ground-secondary',
        isCompact && 'periodic-card--compact',
        className
      )}
      data-variant={variant}
    >
      <Link
        href={`${basePath}/${slug}`}
        className="periodic-card-link absolute inset-0 z-10"
        aria-label={`Read "${title}"`}
      >
        <span className="sr-only">Read periodic</span>
      </Link>

      <CardHeader className={cn(isCompact && 'pb-0')}>
        {/* Issue number and Type row */}
        <div className="periodic-card-meta flex flex-wrap items-center gap-2">
          <Badge variant="secondary" size="sm" className="periodic-card-issue font-mono">
            #{issue}
          </Badge>
          <Badge variant="primary" size="sm" className="periodic-card-type uppercase tracking-wide">
            {getPeriodicTypeLabel(type, language)}
          </Badge>
          {topics.length > 0 && !isCompact && (
            <>
              <span className="text-figure-muted" aria-hidden="true">
                ·
              </span>
              {topics.map((topic) => (
                <Badge key={topic} variant="outline" size="sm" className="periodic-card-topic">
                  {getTopicLabel(topic, language)}
                </Badge>
              ))}
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="periodic-card-title font-serif text-xl font-semibold leading-tight text-figure-primary group-hover:text-link">
          {title}
        </h3>
      </CardHeader>

      {!isCompact && description && (
        <CardContent className="pt-0">
          {/* Description - truncated to 2 lines */}
          <p className="periodic-card-description line-clamp-2 text-body text-figure-secondary">
            {description}
          </p>
        </CardContent>
      )}

      <CardFooter className={cn('pt-0', isCompact && 'pb-inset-md')}>
        {/* Date and reading time */}
        <div className="periodic-card-footer flex items-center gap-2 text-body-sm text-figure-muted">
          <time dateTime={date} className="periodic-card-date">{formatDate(language, date)}</time>
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span className="periodic-card-reading-time">{formatReadingTime(language, readingTime)}</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
