/**
 * Timeline Components
 *
 * Generic timeline visualization components for displaying items
 * organized by time periods and categories in a subway map style.
 */

export { TimelineMap } from './TimelineMap';
export { TimelineSubwayMap } from './TimelineSubwayMap';
export { TimelineTable } from './TimelineTable';
export { TimelineNode } from './TimelineNode';
export { TimelineLine } from './TimelineLine';
export { TimelineTooltip } from './TimelineTooltip';

// Re-export types
export type {
  TimelineItem,
  TimelineCategory,
  TimelineCategoryInternal,
  TimelinePeriod,
  TimelineTableColumn,
  TimelineMapProps,
  TimelineSubwayMapProps,
  TimelineTableProps,
  NodePosition,
  PeriodAssigner,
} from '@/types/timeline';

// Re-export utilities
export {
  createDecadePeriodAssigner,
  createYearPeriodAssigner,
  createMonthPeriodAssigner,
  createDefaultPeriodAssigner,
  resolveCategories,
  getCategoryColor,
  getCategoryName,
} from '@/lib/timeline-utils';
