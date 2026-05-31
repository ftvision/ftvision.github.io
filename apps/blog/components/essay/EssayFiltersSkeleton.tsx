import { cn } from '@/lib/utils';

export interface EssayFiltersSkeletonProps {
  className?: string;
}

/**
 * Skeleton loader for EssayFilters component
 *
 * Displays placeholder UI while the filters are loading,
 * matching the visual structure of the actual filters.
 */
export function EssayFiltersSkeleton({ className }: EssayFiltersSkeletonProps) {
  return (
    <div className={cn('essay-filters-skeleton space-y-3 animate-pulse', className)}>
      {/* Type chips: All, Guide, Deep Dive, Opinion, Review, Narrative */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {[28, 40, 64, 48, 44, 56].map((width, i) => (
          <div
            key={i}
            className="h-6 rounded bg-ground-secondary"
            style={{ width: `${width}px` }}
          />
        ))}
      </div>

      {/* Topic chips: 8 topics */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {[48, 24, 44, 40, 48, 40, 44, 44].map((width, i) => (
          <div
            key={i}
            className="h-6 rounded bg-ground-secondary"
            style={{ width: `${width}px` }}
          />
        ))}
      </div>
    </div>
  );
}
