import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllEssays } from '@/lib/essays';
import { ESSAY_TYPES, TOPICS } from '@/lib/constants';
import { EssayFilters, EssayFiltersSkeleton, EssayList } from '@/components/essay';
import type { EssayType, Topic } from '@/types/content';

export const metadata: Metadata = {
  title: 'Essays',
  description:
    'Essays on technology, AI, product thinking, and career development.',
};

interface EssaysPageProps {
  searchParams: Promise<{ type?: string; topics?: string }>;
}

/**
 * Parse and validate type parameter
 */
function parseTypeParam(type?: string): EssayType | null {
  if (!type) return null;
  return ESSAY_TYPES.includes(type as EssayType) ? (type as EssayType) : null;
}

/**
 * Parse and validate topics parameter
 */
function parseTopicsParam(topics?: string): Topic[] {
  if (!topics) return [];
  return topics
    .split(',')
    .filter((t): t is Topic => TOPICS.includes(t as Topic));
}

/**
 * Essays index page - displays all essays with filtering
 */
export default async function EssaysPage({ searchParams }: EssaysPageProps) {
  const params = await searchParams;
  const selectedType = parseTypeParam(params.type);
  const selectedTopics = parseTopicsParam(params.topics);

  // Get all essays
  const allEssays = getAllEssays();

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

  return (
    <main className="mx-auto max-w-5xl px-inset-lg py-12">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-display font-serif text-figure-primary mb-2">
          Essays
        </h1>
        <p className="text-body-lg text-figure-secondary">
          Thoughts on technology, AI, product thinking, and career development.
        </p>
      </header>

      {/* Filters */}
      <Suspense fallback={<EssayFiltersSkeleton className="mb-8" />}>
        <EssayFilters
          selectedType={selectedType}
          selectedTopics={selectedTopics}
          className="mb-8"
        />
      </Suspense>

      {/* Results count */}
      <div className="mb-6 text-body-sm text-figure-muted">
        {filteredEssays.length}{' '}
        {filteredEssays.length === 1 ? 'essay' : 'essays'}
        {(selectedType || selectedTopics.length > 0) && (
          <span> matching filters</span>
        )}
      </div>

      {/* Essay list */}
      <EssayList
        essays={filteredEssays}
        layout="list"
        emptyMessage="No essays match the selected filters. Try adjusting your filters."
      />
    </main>
  );
}
