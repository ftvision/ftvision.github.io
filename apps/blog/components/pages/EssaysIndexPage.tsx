import { Suspense } from 'react';
import { getAllEssays } from '@/lib/essays';
import { ESSAY_TYPES, TOPICS } from '@/lib/constants';
import { EssayFilters, EssayFiltersSkeleton, EssayList } from '@/components/essay';
import { translate, formatResultsCount, type Language } from '@/lib/i18n';
import type { EssayType, Topic } from '@/types/content';

export interface EssaysIndexPageProps {
  /** Language for the page content */
  language?: Language;
  /** Selected type filter from URL params */
  selectedType?: EssayType | null;
  /** Selected topics filter from URL params */
  selectedTopics?: Topic[];
}

/**
 * Parse and validate type parameter
 */
export function parseTypeParam(type?: string): EssayType | null {
  if (!type) return null;
  return ESSAY_TYPES.includes(type as EssayType) ? (type as EssayType) : null;
}

/**
 * Parse and validate topics parameter
 */
export function parseTopicsParam(topics?: string): Topic[] {
  if (!topics) return [];
  return topics
    .split(',')
    .filter((t): t is Topic => TOPICS.includes(t as Topic));
}

/**
 * Shared EssaysIndexPage component
 *
 * Displays all essays with type and topic filters.
 * Used by both `/essays` (English) and `/zh/essays` (Chinese) routes.
 */
export function EssaysIndexPage({
  language = 'en',
  selectedType = null,
  selectedTopics = [],
}: EssaysIndexPageProps) {
  const basePath = language === 'zh' ? '/zh/essays' : '/essays';
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  // Get all essays for this language
  const allEssays = getAllEssays({ language });

  // Filter essays based on selected filters
  let filteredEssays = allEssays;

  if (selectedType) {
    filteredEssays = filteredEssays.filter(
      (essay) => essay.type === selectedType
    );
  }

  if (selectedTopics.length > 0) {
    filteredEssays = filteredEssays.filter((essay) =>
      selectedTopics.some((topic) => essay.topics.includes(topic))
    );
  }

  const hasActiveFilters = selectedType !== null || selectedTopics.length > 0;
  const resultsText = formatResultsCount(language, filteredEssays.length);
  const matchingText = t('essays.matchingFilters');

  return (
    <main className="mx-auto max-w-5xl px-inset-lg py-12">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-display font-serif text-figure-primary mb-2">
          {t('nav.essays')}
        </h1>
        <p className="text-body-lg text-figure-secondary">
          {t('site.tagline')}
        </p>
      </header>

      {/* Filters */}
      <Suspense fallback={<EssayFiltersSkeleton className="mb-8" />}>
        <EssayFilters
          selectedType={selectedType}
          selectedTopics={selectedTopics}
          className="mb-8"
          language={language}
        />
      </Suspense>

      {/* Results count */}
      <div className="mb-6 text-body-sm text-figure-muted">
        {resultsText}
        {hasActiveFilters && <span> {matchingText}</span>}
      </div>

      {/* Essay list */}
      <EssayList
        essays={filteredEssays}
        layout="list"
        emptyMessage={t('essays.emptyFiltered')}
        basePath={basePath}
        language={language}
      />
    </main>
  );
}
