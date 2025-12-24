import Link from 'next/link';
import { Badge, Card, CardHeader, CardContent, CardFooter } from '@blog/ui';
import { cn } from '@/lib/utils';
import { getReferenceCategoryLabel, getTopicLabel } from '@/lib/constants';
import { formatDate, formatReadingTime } from '@/lib/i18n/translations';
import type { ReferenceCategory, Topic, Language } from '@/types/content';

export interface ReferenceCardProps {
  /** Reference slug for URL */
  slug: string;
  /** Reference category (resources, bibliography, reading-list, tools) */
  category: ReferenceCategory;
  /** Topics covered */
  topics: Topic[];
  /** Reference title */
  title: string;
  /** Description (will be truncated if too long) */
  description: string;
  /** Initial publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Last updated date in ISO format (YYYY-MM-DD) */
  updated?: string;
  /** Optional item count metadata */
  itemCount?: number;
  /** Reading time in minutes */
  readingTime?: number;
  /** Visual variant */
  variant?: 'default' | 'compact';
  /** Additional CSS classes */
  className?: string;
  /** Base path for reference links (defaults to /references) */
  basePath?: string;
  /** Language for localized labels (defaults to en) */
  language?: Language;
}

/**
 * ReferenceCard - Preview card for reference listings
 *
 * Displays reference metadata in a card format suitable for index views.
 * Shows category, title, description, and last updated date.
 * Links to the full reference page.
 *
 * Variants:
 * - default: Full card with description
 * - compact: Smaller card without description
 */
export function ReferenceCard({
  slug,
  category,
  topics,
  title,
  description,
  date,
  updated,
  itemCount,
  readingTime,
  variant = 'default',
  className,
  basePath = '/references',
  language = 'en',
}: ReferenceCardProps) {
  const isCompact = variant === 'compact';
  // Use updated date if available, otherwise use date
  const displayDate = updated || date;

  return (
    <Card
      variant="ghost"
      className={cn(
        'reference-card group relative transition-colors hover:bg-ground-secondary',
        isCompact && 'reference-card--compact',
        className
      )}
      data-variant={variant}
    >
      <Link
        href={`${basePath}/${slug}`}
        className="reference-card-link absolute inset-0 z-10"
        aria-label={`View "${title}"`}
      >
        <span className="sr-only">View reference</span>
      </Link>

      <CardHeader className={cn(isCompact && 'pb-0')}>
        {/* Category and Topics row */}
        <div className="reference-card-meta flex flex-wrap items-center gap-2">
          <Badge variant="primary" size="sm" className="reference-card-category uppercase tracking-wide">
            {getReferenceCategoryLabel(category, language)}
          </Badge>
          {itemCount && !isCompact && (
            <Badge variant="secondary" size="sm" className="reference-card-count font-mono">
              {itemCount} {language === 'zh' ? '项' : 'items'}
            </Badge>
          )}
          {topics.length > 0 && !isCompact && (
            <>
              <span className="text-figure-muted" aria-hidden="true">
                ·
              </span>
              {topics.map((topic) => (
                <Badge key={topic} variant="outline" size="sm" className="reference-card-topic">
                  {getTopicLabel(topic, language)}
                </Badge>
              ))}
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="reference-card-title font-serif text-xl font-semibold leading-tight text-figure-primary group-hover:text-link">
          {title}
        </h3>
      </CardHeader>

      {!isCompact && (
        <CardContent className="pt-0">
          {/* Description - truncated to 2 lines */}
          <p className="reference-card-description line-clamp-2 text-body text-figure-secondary">
            {description}
          </p>
        </CardContent>
      )}

      <CardFooter className={cn('pt-0', isCompact && 'pb-inset-md')}>
        {/* Updated date and reading time */}
        <div className="reference-card-footer flex items-center gap-2 text-body-sm text-figure-muted">
          {updated ? (
            <span className="reference-card-updated">
              {language === 'zh' ? '更新于 ' : 'Updated '}
              <time dateTime={displayDate}>{formatDate(language, displayDate)}</time>
            </span>
          ) : (
            <time dateTime={displayDate} className="reference-card-date">{formatDate(language, displayDate)}</time>
          )}
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span className="reference-card-reading-time">{formatReadingTime(language, readingTime)}</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
