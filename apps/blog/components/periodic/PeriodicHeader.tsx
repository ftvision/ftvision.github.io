import { Badge } from '@blog/ui';
import { cn } from '@/lib/utils';
import { getPeriodicTypeLabel, getTopicLabel } from '@/lib/constants';
import type { PeriodicType, Topic, Language } from '@/types/content';

export interface PeriodicHeaderProps {
  /** Issue number */
  issue: number;
  /** Periodic type (digest, changelog, notes) */
  type: PeriodicType;
  /** Topics covered */
  topics: Topic[];
  /** Periodic title */
  title: string;
  /** Optional description/subtitle */
  description?: string;
  /** Publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Reading time in minutes */
  readingTime?: number;
  /** Additional CSS classes */
  className?: string;
  /** Language for labels (defaults to en) */
  language?: Language;
}

/**
 * Format date for display
 */
function formatDate(dateString: string, language: Language = 'en'): string {
  const date = new Date(dateString);
  if (language === 'zh') {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format reading time
 */
function formatReadingTime(minutes: number, language: Language = 'en'): string {
  if (language === 'zh') {
    return `阅读时间 ${minutes} 分钟`;
  }
  return `${minutes} min read`;
}

/**
 * PeriodicHeader - Displays periodic metadata including issue number, type, topics, title, and date
 *
 * Layout:
 * - Issue number badge (prominent)
 * - Type badge (uppercase)
 * - Topic badges
 * - Title (large heading)
 * - Description (optional subtitle)
 * - Date and reading time
 */
export function PeriodicHeader({
  issue,
  type,
  topics,
  title,
  description,
  date,
  readingTime,
  className,
  language = 'en',
}: PeriodicHeaderProps) {
  return (
    <div className={cn('periodic-header space-y-4', className)}>
      {/* Issue, Type and Topics row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Issue number badge - prominent */}
        <Badge variant="secondary" size="sm" className="font-mono">
          #{issue}
        </Badge>

        {/* Type badge */}
        <Badge variant="primary" size="sm" className="uppercase tracking-wide">
          {getPeriodicTypeLabel(type, language)}
        </Badge>

        {/* Separator */}
        {topics.length > 0 && (
          <span className="text-figure-muted" aria-hidden="true">
            ·
          </span>
        )}

        {/* Topic badges */}
        {topics.map((topic) => (
          <Badge key={topic} variant="outline" size="sm">
            {getTopicLabel(topic, language)}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-display font-serif text-figure-primary leading-tight">
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-body-lg text-figure-secondary leading-relaxed">
          {description}
        </p>
      )}

      {/* Date and reading time */}
      <div className="flex items-center gap-2 text-body-sm text-figure-muted">
        <time dateTime={date}>{formatDate(date, language)}</time>
        {readingTime && (
          <>
            <span aria-hidden="true">·</span>
            <span>{formatReadingTime(readingTime, language)}</span>
          </>
        )}
      </div>
    </div>
  );
}
