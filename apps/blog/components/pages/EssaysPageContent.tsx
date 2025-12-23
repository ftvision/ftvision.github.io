'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { EssayFilters, EssayFiltersSkeleton, EssayList } from '@/components/essay';
import { ESSAY_TYPES, TOPICS } from '@/lib/constants';
import { formatResultsCount, translate, type Language } from '@/lib/i18n';
import type { EssayMeta, EssayType, Topic } from '@/types/content';

/**
 * Parse and validate type parameter
 */
function parseTypeParam(type: string | null): EssayType | null {
  if (!type) return null;
  return ESSAY_TYPES.includes(type as EssayType) ? (type as EssayType) : null;
}

/**
 * Parse and validate topics parameter
 */
function parseTopicsParam(topics: string | null): Topic[] {
  if (!topics) return [];
  return topics
    .split(',')
    .filter((t): t is Topic => TOPICS.includes(t as Topic));
}

export interface EssaysPageContentProps {
  /** All essays to filter from */
  essays: EssayMeta[];
  /** Language for localization */
  language: Language;
  /** Base path for essay links */
  basePath: string;
}

/**
 * Inner component that reads URL params and filters essays
 */
function EssaysContentInner({ essays, language, basePath }: EssaysPageContentProps) {
  const searchParams = useSearchParams();
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  // Parse filter state from URL
  const selectedType = parseTypeParam(searchParams.get('type'));
  const selectedTopics = parseTopicsParam(searchParams.get('topics'));

  // Filter essays based on URL params
  const filteredEssays = useMemo(() => {
    let result = essays;

    if (selectedType) {
      result = result.filter((essay) => essay.type === selectedType);
    }

    if (selectedTopics.length > 0) {
      result = result.filter((essay) =>
        selectedTopics.some((topic) => essay.topics.includes(topic))
      );
    }

    return result;
  }, [essays, selectedType, selectedTopics]);

  const hasActiveFilters = selectedType !== null || selectedTopics.length > 0;
  const resultsText = formatResultsCount(language, filteredEssays.length);
  const matchingText = t('essays.matchingFilters');

  return (
    <>
      <EssayFilters
        selectedType={selectedType}
        selectedTopics={selectedTopics}
        className="mb-8"
        language={language}
      />

      <div className="mb-6 text-body-sm text-figure-muted">
        {resultsText}
        {hasActiveFilters && <span> {matchingText}</span>}
      </div>

      <EssayList
        essays={filteredEssays}
        layout="list"
        emptyMessage={t('essays.emptyFiltered')}
        basePath={basePath}
        language={language}
      />
    </>
  );
}

/**
 * Loading skeleton shown while useSearchParams hydrates
 */
function EssaysLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <EssayFiltersSkeleton className="mb-8" />
      <div className="mb-6">
        <div className="h-4 w-24 bg-ground-secondary rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-ground-secondary rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

/**
 * Client component for essays page content with filtering
 *
 * Wraps the content in Suspense to handle useSearchParams during SSR/static export.
 * This is required because useSearchParams() needs client-side hydration.
 */
export function EssaysPageContent(props: EssaysPageContentProps) {
  return (
    <Suspense fallback={<EssaysLoadingSkeleton />}>
      <EssaysContentInner {...props} />
    </Suspense>
  );
}
