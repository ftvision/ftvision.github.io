'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button, Badge } from '@blog/ui';
import { cn } from '@/lib/utils';
import { ESSAY_TYPES, TOPICS, getEssayTypeLabels, getTopicLabels } from '@/lib/constants';
import type { EssayType, Topic, Language } from '@/types/content';

export interface EssayFiltersProps {
  /** Currently selected type filter */
  selectedType?: EssayType | null;
  /** Currently selected topics filter */
  selectedTopics?: Topic[];
  /** Additional CSS classes */
  className?: string;
  /** Language for labels (defaults to en) */
  language?: Language;
}

/**
 * EssayFilters - Filter controls for essay listings
 *
 * Features:
 * - Type filter (button group, mutually exclusive)
 * - Topic filter (toggleable badges, can select multiple)
 * - URL-based state via searchParams
 */
export function EssayFilters({
  selectedType = null,
  selectedTopics = [],
  className,
  language = 'en',
}: EssayFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get localized labels
  const typeLabels = getEssayTypeLabels(language);
  const topicLabelMap = getTopicLabels(language);

  // Build options with localized labels
  const essayTypeOptions: { value: EssayType | null; label: string }[] = [
    { value: null, label: language === 'zh' ? '全部' : 'All' },
    ...ESSAY_TYPES.map((type) => ({ value: type, label: typeLabels[type] })),
  ];

  const topicOptions = TOPICS.map((topic) => ({
    value: topic,
    label: topicLabelMap[topic],
  }));

  // Determine base path from current pathname
  const basePath = pathname.startsWith('/zh') ? '/zh/essays' : '/essays';

  /**
   * Update URL with new filter values
   */
  const updateFilters = React.useCallback(
    (type: EssayType | null, topicsList: Topic[]) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update type param
      if (type) {
        params.set('type', type);
      } else {
        params.delete('type');
      }

      // Update topics param (comma-separated)
      if (topicsList.length > 0) {
        params.set('topics', topicsList.join(','));
      } else {
        params.delete('topics');
      }

      // Navigate with new params
      const queryString = params.toString();
      router.push(queryString ? `${basePath}?${queryString}` : basePath, {
        scroll: false,
      });
    },
    [router, searchParams, basePath]
  );

  /**
   * Handle type filter change
   */
  const handleTypeChange = (type: EssayType | null) => {
    updateFilters(type, selectedTopics);
  };

  /**
   * Handle topic toggle
   */
  const handleTopicToggle = (topic: Topic) => {
    const newTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    updateFilters(selectedType, newTopics);
  };

  /**
   * Clear all filters
   */
  const handleClearAll = () => {
    updateFilters(null, []);
  };

  const hasActiveFilters = selectedType !== null || selectedTopics.length > 0;
  const typeLabel = language === 'zh' ? '类型:' : 'Type:';
  const topicsLabel = language === 'zh' ? '主题:' : 'Topics:';
  const clearLabel = language === 'zh' ? '清除筛选' : 'Clear all filters';

  return (
    <div className={cn('essay-filters space-y-4', className)} data-has-filters={hasActiveFilters}>
      {/* Type filter - button group */}
      <div className="essay-filters-type flex flex-wrap items-center gap-2">
        <span className="essay-filters-label text-body-sm text-figure-muted">{typeLabel}</span>
        <div
          className="essay-filters-type-group flex flex-wrap gap-1"
          role="group"
          aria-label="Filter by essay type"
        >
          {essayTypeOptions.map(({ value, label }) => {
            const isSelected = selectedType === value;
            return (
              <Button
                key={label}
                variant={isSelected ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleTypeChange(value)}
                aria-pressed={isSelected}
                className="essay-filters-type-btn"
                data-type={value ?? 'all'}
                data-selected={isSelected}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Topic filter - toggleable badges */}
      <div className="essay-filters-topics flex flex-wrap items-center gap-2">
        <span className="essay-filters-label text-body-sm text-figure-muted">{topicsLabel}</span>
        <div
          className="essay-filters-topics-group flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by topic"
        >
          {topicOptions.map(({ value, label }) => {
            const isSelected = selectedTopics.includes(value);
            return (
              <button
                key={value}
                onClick={() => handleTopicToggle(value)}
                aria-pressed={isSelected}
                className="essay-filters-topic-btn focus:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 rounded-full"
                data-topic={value}
                data-selected={isSelected}
              >
                <Badge
                  variant={isSelected ? 'primary' : 'outline'}
                  size="md"
                  className="cursor-pointer transition-colors"
                >
                  {label}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <div className="essay-filters-clear pt-2">
          <Button
            variant="link"
            size="sm"
            onClick={handleClearAll}
            className="essay-filters-clear-btn text-figure-muted hover:text-figure-primary"
          >
            {clearLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
