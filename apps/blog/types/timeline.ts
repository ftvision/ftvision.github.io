/**
 * Timeline Map Types
 *
 * Generic type definitions for the timeline visualization component.
 * This enables reusable subway-map-style visualizations for any
 * collection of items organized by time periods and categories.
 */

/**
 * Base interface for items displayed on the timeline.
 * Extend this interface for domain-specific item types.
 */
export interface TimelineItem {
  /** Unique identifier for the item */
  id: number | string;
  /** Year of the item (used for positioning and sorting) */
  year: number;
  /** Primary display title */
  title: string;
  /** Secondary text (e.g., authors, source) */
  subtitle?: string;
  /** Additional description (e.g., journal, publication info) */
  description?: string;
}

/**
 * Category configuration for the Y-axis "lines"
 */
export interface TimelineCategory {
  /** Unique identifier for the category */
  id: string;
  /** Display name shown in labels */
  name: string;
  /** CSS color value or variable. If omitted, auto-assigns from design tokens */
  color?: string;
}

/**
 * Time period configuration for the X-axis
 */
export interface TimelinePeriod {
  /** Unique identifier for the period (e.g., "1990s") */
  id: string;
  /** Display label shown on the axis */
  label: string;
  /** Start year (inclusive) */
  startYear: number;
  /** End year (inclusive) */
  endYear: number;
}

/**
 * Table column configuration for the table view
 */
export interface TimelineTableColumn<T extends TimelineItem> {
  /** Unique key for the column */
  key: string;
  /** Header text displayed in the table */
  header: string;
  /** Custom render function for cell content */
  render?: (item: T) => React.ReactNode;
  /** Whether this column is sortable (default: false) */
  sortable?: boolean;
  /** Field to sort by (defaults to key) */
  sortKey?: keyof T | ((item: T) => string | number);
}

/**
 * Function type for assigning items to periods based on year
 */
export type PeriodAssigner = (year: number) => string;

/**
 * Internal position type for SVG rendering
 */
export interface NodePosition {
  /** SVG X coordinate */
  x: number;
  /** SVG Y coordinate */
  y: number;
}

/**
 * Internal category configuration with computed properties
 */
export interface TimelineCategoryInternal extends TimelineCategory {
  /** Computed Y-axis index (0-based) */
  yIndex: number;
  /** Resolved color (either provided or auto-assigned) */
  resolvedColor: string;
}

/**
 * Props for the main TimelineMap component
 */
export interface TimelineMapProps<T extends TimelineItem> {
  /** Array of items to display on the timeline */
  items: T[];

  /** Function to extract category ID from an item */
  getCategory: (item: T) => string;

  /** Category configuration for Y-axis lines */
  categories: TimelineCategory[];

  /** Time period configuration for X-axis */
  periods: TimelinePeriod[];

  /** Optional function to assign items to periods. If not provided, uses the period ranges */
  getPeriod?: PeriodAssigner;

  /** Title displayed above the visualization */
  title?: string;

  /** Subtitle displayed below the title */
  subtitle?: string;

  /** Custom tooltip renderer. If not provided, uses default tooltip */
  renderTooltip?: (item: T) => React.ReactNode;

  /** Custom table column configuration. If not provided, uses sensible defaults */
  tableColumns?: TimelineTableColumn<T>[];

  /** Break out of content column to full viewport width */
  hero?: boolean;

  /** Initial view mode */
  defaultView?: 'map' | 'table';

  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Props for the internal subway map SVG component
 */
export interface TimelineSubwayMapProps<T extends TimelineItem> {
  /** Items to display */
  items: T[];
  /** Function to get category ID from item */
  getCategory: (item: T) => string;
  /** Function to get period ID from item */
  getPeriod: (item: T) => string;
  /** Category configurations with resolved colors */
  categories: TimelineCategoryInternal[];
  /** Period configurations */
  periods: TimelinePeriod[];
  /** Optional className */
  className?: string;
  /** Currently selected period for highlighting */
  selectedPeriod?: string | null;
  /** Callback when period label is clicked */
  onPeriodClick?: (period: string | null) => void;
  /** Currently selected category for highlighting */
  selectedCategory?: string | null;
  /** Callback when category label is clicked */
  onCategoryClick?: (category: string | null) => void;
  /** Custom tooltip renderer */
  renderTooltip?: (item: T) => React.ReactNode;
  /** Title for the SVG */
  title?: string;
}

/**
 * Props for the timeline table component
 */
export interface TimelineTableProps<T extends TimelineItem> {
  /** Items to display */
  items: T[];
  /** Function to get category ID from item */
  getCategory: (item: T) => string;
  /** Category configurations */
  categories: TimelineCategoryInternal[];
  /** Optional category filter */
  filterCategory?: string | null;
  /** Optional period filter */
  filterPeriod?: string | null;
  /** Custom column configuration */
  columns?: TimelineTableColumn<T>[];
  /** Optional className */
  className?: string;
}
