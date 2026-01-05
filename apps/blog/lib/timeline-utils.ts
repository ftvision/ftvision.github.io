/**
 * Timeline Utilities
 *
 * Helper functions for creating period configurations and assigners
 * for the TimelineMap component.
 */

import type { TimelinePeriod, PeriodAssigner, TimelineCategory, TimelineCategoryInternal } from '@/types/timeline';

/**
 * Default color tokens used for auto-assignment.
 * Uses design system data colors plus accent.
 */
const DEFAULT_COLORS = [
  'var(--color-data-1)',
  'var(--color-data-2)',
  'var(--color-data-3)',
  'var(--color-data-4)',
  'var(--color-data-5)',
  'var(--color-data-6)',
  'var(--color-accent-primary)',
];

/**
 * Creates a decade-based period configuration.
 *
 * @param startDecade - Start year (rounded down to decade, e.g., 1953 → 1950)
 * @param endDecade - End year (rounded up to decade end, e.g., 2003 → 2009)
 * @returns Object with periods array and getPeriod function
 *
 * @example
 * const { periods, getPeriod } = createDecadePeriodAssigner(1950, 2000);
 * // periods: [{ id: '1950s', label: '1950s', ... }, ...]
 * // getPeriod(1962) → '1960s'
 */
export function createDecadePeriodAssigner(
  startDecade: number,
  endDecade: number
): { periods: TimelinePeriod[]; getPeriod: PeriodAssigner } {
  // Normalize to decade boundaries
  const start = Math.floor(startDecade / 10) * 10;
  const end = Math.ceil((endDecade + 1) / 10) * 10 - 1;

  const periods: TimelinePeriod[] = [];
  for (let decade = start; decade <= end; decade += 10) {
    const id = `${decade}s`;
    periods.push({
      id,
      label: id,
      startYear: decade,
      endYear: decade + 9,
    });
  }

  const getPeriod: PeriodAssigner = (year: number) => {
    const decade = Math.floor(year / 10) * 10;
    return `${decade}s`;
  };

  return { periods, getPeriod };
}

/**
 * Creates a year-based period configuration where each year is a separate period.
 * Useful for timelines spanning a few years with many items per year.
 *
 * @param startYear - First year to include
 * @param endYear - Last year to include
 * @returns Object with periods array and getPeriod function
 *
 * @example
 * const { periods, getPeriod } = createYearPeriodAssigner(2020, 2024);
 * // periods: [{ id: '2020', label: '2020', ... }, ...]
 */
export function createYearPeriodAssigner(
  startYear: number,
  endYear: number
): { periods: TimelinePeriod[]; getPeriod: PeriodAssigner } {
  const periods: TimelinePeriod[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const id = String(year);
    periods.push({
      id,
      label: id,
      startYear: year,
      endYear: year,
    });
  }

  const getPeriod: PeriodAssigner = (year: number) => String(year);

  return { periods, getPeriod };
}

/**
 * Month names for month-based period assigner
 */
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Creates a month-based period configuration for a single year.
 * Useful for timelines showing monthly data within a year.
 *
 * @param year - The year for the timeline
 * @returns Object with periods array and getPeriod function (takes Date)
 *
 * @example
 * const { periods, getPeriod } = createMonthPeriodAssigner(2024);
 * // periods: [{ id: '2024-01', label: 'Jan', ... }, ...]
 */
export function createMonthPeriodAssigner(
  year: number
): { periods: TimelinePeriod[]; getPeriod: (date: Date) => string } {
  const periods: TimelinePeriod[] = MONTH_NAMES.map((name, index) => ({
    id: `${year}-${String(index + 1).padStart(2, '0')}`,
    label: name,
    startYear: year,
    endYear: year,
  }));

  const getPeriod = (date: Date): string => {
    const month = date.getMonth() + 1;
    return `${year}-${String(month).padStart(2, '0')}`;
  };

  return { periods, getPeriod };
}

/**
 * Creates a default period assigner that uses period ranges.
 * Finds the period whose range contains the given year.
 *
 * @param periods - Array of period configurations
 * @returns PeriodAssigner function
 */
export function createDefaultPeriodAssigner(periods: TimelinePeriod[]): PeriodAssigner {
  return (year: number): string => {
    const period = periods.find(p => year >= p.startYear && year <= p.endYear);
    return period?.id ?? periods[periods.length - 1]?.id ?? '';
  };
}

/**
 * Resolves category colors by auto-assigning from default tokens
 * when color is not explicitly provided.
 *
 * @param categories - Array of category configurations
 * @returns Array of categories with resolved colors and yIndex
 */
export function resolveCategories(categories: TimelineCategory[]): TimelineCategoryInternal[] {
  return categories.map((category, index) => ({
    ...category,
    yIndex: index,
    resolvedColor: category.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));
}

/**
 * Category with resolved color - minimal interface for lookup functions
 */
interface CategoryWithColor {
  id: string;
  name: string;
  resolvedColor: string;
}

/**
 * Gets the resolved color for a category by ID.
 *
 * @param categories - Array of categories with resolved colors
 * @param categoryId - ID to look up
 * @returns CSS color string
 */
export function getCategoryColor(
  categories: CategoryWithColor[],
  categoryId: string
): string {
  const category = categories.find(c => c.id === categoryId);
  return category?.resolvedColor ?? DEFAULT_COLORS[0];
}

/**
 * Gets the display name for a category by ID.
 *
 * @param categories - Array of categories
 * @param categoryId - ID to look up
 * @returns Display name or the ID if not found
 */
export function getCategoryName(
  categories: CategoryWithColor[],
  categoryId: string
): string {
  const category = categories.find(c => c.id === categoryId);
  return category?.name ?? categoryId;
}
