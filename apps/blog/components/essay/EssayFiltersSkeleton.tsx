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
    <div className={cn('essay-filters-skeleton space-y-4 animate-pulse', className)}>
      {/* Type filter skeleton */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="h-4 w-10 bg-ground-secondary rounded" />
        <div className="flex flex-wrap gap-1">
          {/* 6 type buttons: All, Guide, Deep Dive, Opinion, Review, Narrative */}
          {[40, 48, 72, 56, 52, 64].map((width, i) => (
            <div
              key={i}
              className="h-8 bg-ground-secondary rounded"
              style={{ width: `${width}px` }}
            />
          ))}
        </div>
      </div>

      {/* Topic filter skeleton */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="h-4 w-12 bg-ground-secondary rounded" />
        <div className="flex flex-wrap gap-2">
          {/* 4 topic badges: Technical, AI, Product, Career */}
          {[72, 32, 56, 52].map((width, i) => (
            <div
              key={i}
              className="h-7 bg-ground-secondary rounded-full"
              style={{ width: `${width}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
