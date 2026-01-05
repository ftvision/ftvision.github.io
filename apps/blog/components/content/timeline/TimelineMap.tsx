'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type {
  TimelineItem,
  TimelineMapProps,
  TimelineCategoryInternal,
} from '@/types/timeline';
import { resolveCategories, createDefaultPeriodAssigner } from '@/lib/timeline-utils';
import { TimelineSubwayMap } from './TimelineSubwayMap';
import { TimelineTable } from './TimelineTable';

type ViewMode = 'map' | 'table';

/**
 * TimelineMap - Main container component for timeline visualizations
 *
 * Provides a subway map visualization of items organized by time periods
 * and categories, with toggle between map and table views.
 *
 * Set `hero={true}` to break out of the content column and span full viewport width.
 */
export function TimelineMap<T extends TimelineItem>({
  items,
  getCategory,
  categories: rawCategories,
  periods,
  getPeriod: customGetPeriod,
  title,
  subtitle,
  renderTooltip,
  tableColumns,
  hero = false,
  defaultView = 'map',
  className,
}: TimelineMapProps<T>) {
  const [view, setView] = React.useState<ViewMode>(defaultView);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string | null>(null);

  // Hero mode: use JS to calculate exact offset for full-width breakout
  const heroRef = React.useRef<HTMLDivElement>(null);
  const [heroOffset, setHeroOffset] = React.useState(0);

  React.useLayoutEffect(() => {
    if (hero && heroRef.current) {
      const updateOffset = () => {
        const el = heroRef.current;
        if (!el) return;

        // Temporarily reset margin to get the true position
        const prevMargin = el.style.marginLeft;
        el.style.marginLeft = '0px';

        // Force reflow to ensure measurement is accurate
        const rect = el.getBoundingClientRect();

        // Apply the new offset
        const newOffset = -rect.left;
        el.style.marginLeft = `${newOffset}px`;
        setHeroOffset(newOffset);
      };
      updateOffset();
      window.addEventListener('resize', updateOffset);
      return () => window.removeEventListener('resize', updateOffset);
    }
  }, [hero]);

  // Resolve categories with auto-assigned colors
  const categories: TimelineCategoryInternal[] = React.useMemo(
    () => resolveCategories(rawCategories),
    [rawCategories]
  );

  // Create period assigner
  const getPeriod = React.useMemo(
    () => customGetPeriod ?? createDefaultPeriodAssigner(periods),
    [customGetPeriod, periods]
  );

  // Filter items by category and/or period
  const filteredItems = React.useMemo(() => {
    let result = items;
    if (selectedCategory) {
      result = result.filter((item) => getCategory(item) === selectedCategory);
    }
    if (selectedPeriod) {
      result = result.filter((item) => getPeriod(item.year) === selectedPeriod);
    }
    return result;
  }, [items, selectedCategory, selectedPeriod, getCategory, getPeriod]);

  // Hero mode: break out of content column to full viewport width
  // Uses JS-calculated offset (heroOffset) to position precisely at viewport edge
  // relative z-10: ensures hero content appears above the ToC sidebar
  // bg-ground-primary: solid background to cover content underneath (like ToC)
  // px-4 md:px-6: matches EssayLayout padding for content alignment
  const heroClasses = hero
    ? 'relative z-10 bg-ground-primary w-screen px-4 md:px-6'
    : '';

  // Calculate stats
  const yearRange = items.length > 0
    ? {
        min: Math.min(...items.map((item) => item.year)),
        max: Math.max(...items.map((item) => item.year)),
      }
    : null;

  return (
    <div
      ref={hero ? heroRef : undefined}
      className={cn('timeline-map', heroClasses, className)}
      style={hero ? { marginLeft: heroOffset } : undefined}
    >
      {/* Header with view toggle */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          {title && (
            <h2 className="text-xl font-semibold text-figure-primary">{title}</h2>
          )}
          {subtitle && (
            <p className="text-sm text-figure-secondary">{subtitle}</p>
          )}
        </div>

        {/* View toggle */}
        <div className="flex rounded-md border border-border">
          <button
            type="button"
            onClick={() => setView('map')}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              view === 'map'
                ? 'bg-ground-secondary text-figure-primary'
                : 'text-figure-secondary hover:text-figure-primary'
            )}
            aria-pressed={view === 'map'}
          >
            Subway Map
          </button>
          <button
            type="button"
            onClick={() => setView('table')}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              view === 'table'
                ? 'bg-ground-secondary text-figure-primary'
                : 'text-figure-secondary hover:text-figure-primary'
            )}
            aria-pressed={view === 'table'}
          >
            Table
          </button>
        </div>
      </div>

      {/* Content */}
      {view === 'map' ? (
        <div className={cn('overflow-x-auto', !hero && '-mx-4 px-4 md:mx-0 md:px-0')}>
          <div className="min-w-[700px] md:min-w-0">
            <TimelineSubwayMap
              items={filteredItems}
              getCategory={getCategory}
              getPeriod={(item) => getPeriod(item.year)}
              categories={categories}
              periods={periods}
              selectedPeriod={selectedPeriod}
              onPeriodClick={setSelectedPeriod}
              selectedCategory={selectedCategory}
              onCategoryClick={setSelectedCategory}
              renderTooltip={renderTooltip}
              title={
                title
                  ? `${title}${yearRange ? ` (${yearRange.min}-${yearRange.max})` : ''}`
                  : undefined
              }
            />
          </div>
          {/* Scroll hint on mobile */}
          <p className="mt-2 text-center text-xs text-figure-muted md:hidden">
            Scroll horizontally to explore the map
          </p>
        </div>
      ) : (
        <TimelineTable
          items={items}
          getCategory={getCategory}
          categories={categories}
          filterCategory={selectedCategory}
          filterPeriod={selectedPeriod}
          columns={tableColumns}
        />
      )}

      {/* Stats */}
      <div className="mt-6 border-t border-border pt-4">
        <div className="flex flex-wrap gap-6 text-sm text-figure-secondary">
          <div>
            <span className="font-medium text-figure-primary">
              {filteredItems.length}
            </span>{' '}
            items shown
          </div>
          <div>
            <span className="font-medium text-figure-primary">
              {categories.length}
            </span>{' '}
            categories
          </div>
          {yearRange && (
            <div>
              Spanning{' '}
              <span className="font-medium text-figure-primary">
                {yearRange.min}
              </span>
              {' - '}
              <span className="font-medium text-figure-primary">
                {yearRange.max}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
