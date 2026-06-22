'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ESSAY_TYPES, TOPICS, getEssayTypeLabels, getTopicLabels } from '@/lib/constants';
import { translate } from '@/lib/i18n/translations';
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

/** Shared chip styling: quiet text toggle, active = accent underline. */
const CHIP_BASE =
  'essay-chip inline-flex min-h-[44px] items-center px-2 text-body-sm leading-none ' +
  'border-b-2 border-transparent transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-ground-primary';
const CHIP_INACTIVE = 'text-figure-muted hover:text-figure-primary';
const CHIP_ACTIVE = 'text-figure-primary font-medium border-accent-primary';

/**
 * EssayFilters - Filter controls for essay listings
 *
 * One quiet chip language across two logical groups (type is exclusive,
 * topics are additive). No heavy borders or filled buttons; the active chip
 * is marked with an accent underline. State lives in the URL via searchParams.
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

  const typeLabels = getEssayTypeLabels(language);
  const topicLabelMap = getTopicLabels(language);

  const essayTypeOptions: { value: EssayType | null; label: string }[] = [
    { value: null, label: translate(language, 'filter.all') },
    ...ESSAY_TYPES.map((type) => ({ value: type, label: typeLabels[type] })),
  ];

  const topicOptions = TOPICS.map((topic) => ({
    value: topic,
    label: topicLabelMap[topic],
  }));

  const basePath = pathname.startsWith('/zh') ? '/zh/essays/' : '/essays/';

  const updateFilters = React.useCallback(
    (type: EssayType | null, topicsList: Topic[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (type) {
        params.set('type', type);
      } else {
        params.delete('type');
      }

      if (topicsList.length > 0) {
        params.set('topics', topicsList.join(','));
      } else {
        params.delete('topics');
      }

      const queryString = params.toString();
      router.push(queryString ? `${basePath}?${queryString}` : basePath, {
        scroll: false,
      });
    },
    [router, searchParams, basePath]
  );

  const handleTypeChange = (type: EssayType | null) => {
    updateFilters(type, selectedTopics);
  };

  const handleTopicToggle = (topic: Topic) => {
    const newTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    updateFilters(selectedType, newTopics);
  };

  const handleClearAll = () => {
    updateFilters(null, []);
  };

  const hasActiveFilters = selectedType !== null || selectedTopics.length > 0;

  return (
    <div className={cn('essay-filters space-y-3', className)} data-has-filters={hasActiveFilters}>
      {/* Type filter - exclusive */}
      <div
        className="essay-filters-type flex flex-wrap items-center gap-x-2 gap-y-1"
        role="group"
        aria-label={translate(language, 'filter.byType')}
      >
        {essayTypeOptions.map(({ value, label }) => {
          const isSelected = selectedType === value;
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleTypeChange(value)}
              aria-pressed={isSelected}
              className={cn(CHIP_BASE, isSelected ? CHIP_ACTIVE : CHIP_INACTIVE)}
              data-type={value ?? 'all'}
              data-selected={isSelected}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Topic filter - additive */}
      <div
        className="essay-filters-topics flex flex-wrap items-center gap-x-2 gap-y-1"
        role="group"
        aria-label={translate(language, 'filter.byTopic')}
      >
        {topicOptions.map(({ value, label }) => {
          const isSelected = selectedTopics.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleTopicToggle(value)}
              aria-pressed={isSelected}
              className={cn(CHIP_BASE, isSelected ? CHIP_ACTIVE : CHIP_INACTIVE)}
              data-topic={value}
              data-selected={isSelected}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={handleClearAll}
          className={cn(
            'essay-filters-clear-btn inline-flex min-h-[44px] items-center text-body-sm text-figure-muted',
            'underline decoration-border underline-offset-4 transition-colors',
            'hover:text-figure-primary hover:decoration-figure-primary',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-ground-primary'
          )}
        >
          {translate(language, 'filter.clear')}
        </button>
      )}
    </div>
  );
}
