import { Badge } from '@blog/ui';
import { cn } from '@/lib/utils';
import { getReferenceCategoryLabel, getTopicLabel } from '@/lib/constants';
import type { ReferenceCategory, Topic, Language } from '@/types/content';

export interface ReferenceHeaderProps {
  /** Reference category (resources, bibliography, reading-list, tools) */
  category: ReferenceCategory;
  /** Topics covered */
  topics: Topic[];
  /** Reference title */
  title: string;
  /** Description/subtitle */
  description: string;
  /** Initial publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Last updated date in ISO format (YYYY-MM-DD) */
  updated?: string;
  /** Optional item count metadata */
  itemCount?: number;
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
 * ReferenceHeader - Displays reference metadata including category, topics, title, and dates
 *
 * Layout:
 * - Category badge (prominent, uppercase)
 * - Item count badge (if provided)
 * - Topic badges
 * - Title (large heading)
 * - Description
 * - Date and updated date (with "Updated" prefix if updated)
 */
export function ReferenceHeader({
  category,
  topics,
  title,
  description,
  date,
  updated,
  itemCount,
  readingTime,
  className,
  language = 'en',
}: ReferenceHeaderProps) {
  return (
    <div className={cn('reference-header space-y-4', className)}>
      {/* Category and Topics row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Category badge - prominent */}
        <Badge variant="primary" size="sm" className="uppercase tracking-wide">
          {getReferenceCategoryLabel(category, language)}
        </Badge>

        {/* Item count badge */}
        {itemCount && (
          <Badge variant="secondary" size="sm" className="font-mono">
            {itemCount} {language === 'zh' ? '项' : 'items'}
          </Badge>
        )}

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
      <p className="text-body-lg text-figure-secondary leading-relaxed">
        {description}
      </p>

      {/* Date and reading time */}
      <div className="flex items-center gap-2 text-body-sm text-figure-muted">
        {updated ? (
          <>
            <span>
              {language === 'zh' ? '更新于 ' : 'Updated '}
              <time dateTime={updated}>{formatDate(updated, language)}</time>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {language === 'zh' ? '创建于 ' : 'Created '}
              <time dateTime={date}>{formatDate(date, language)}</time>
            </span>
          </>
        ) : (
          <time dateTime={date}>{formatDate(date, language)}</time>
        )}
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
