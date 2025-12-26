import { Badge } from '@blog/ui';
import { cn } from '@/lib/utils';
import { getEssayTypeLabel, getTopicLabel } from '@/lib/constants';
import type { EssayType, Topic, Language } from '@/types/content';

export interface EssayHeaderProps {
  /** Essay type (guide, deep-dive, opinion, review, narrative) */
  type: EssayType;
  /** Topics covered by the essay */
  topics: Topic[];
  /** Essay title */
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
 * EssayHeader - Displays essay metadata including type, topics, title, and date
 *
 * Layout:
 * - Type badge (prominent, uppercase)
 * - Topic badges (comma-separated with badges)
 * - Title (large heading)
 * - Description (optional subtitle)
 * - Date and reading time
 */
export function EssayHeader({
  type,
  topics,
  title,
  description,
  date,
  readingTime,
  className,
  language = 'en',
}: EssayHeaderProps) {
  return (
    <div className={cn('essay-header space-y-4', className)}>
      {/* Type and Topics row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Type badge - more prominent */}
        <Badge variant="primary" size="sm" className="uppercase tracking-wide">
          {getEssayTypeLabel(type, language)}
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
      <h1 className="type-display text-figure-primary">
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
