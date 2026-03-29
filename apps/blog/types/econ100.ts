/**
 * Econ100 Types
 *
 * Type definitions for the economics paper visualization
 */

/**
 * Economics research topic categories
 */
export type EconTopic =
  | 'io'
  | 'development'
  | 'labor'
  | 'public-health'
  | 'macro-growth'
  | 'trade-urban'
  | 'information'
  | 'political-economy';

/**
 * Decade bins for X-axis positioning
 */
export type EconDecade = '1960s' | '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s';

/**
 * Parsed paper data structure
 */
export interface EconPaper {
  /** Order from original list (1-104) */
  id: number;
  /** First author last name */
  firstAuthor: string;
  /** Full author list */
  authors: string;
  /** Publication year */
  year: number;
  /** Paper title */
  title: string;
  /** Journal abbreviation */
  journal: string;
  /** URL to paper PDF or landing page */
  url?: string;
  /** Assigned topic category */
  topic: EconTopic;
  /** Computed decade bin */
  decade: EconDecade;
}

/**
 * Category line configuration
 */
export interface EconLine {
  /** Topic identifier */
  id: EconTopic;
  /** Display name */
  name: string;
  /** CSS color variable */
  color: string;
  /** Y-position index */
  yIndex: number;
}

/**
 * Props for the Econ100Map component
 */
export interface Econ100MapProps {
  /** Optional className for container styling */
  className?: string;
  /** Initial view mode */
  defaultView?: 'map' | 'table';
  /** Break out of content column to span full viewport width */
  hero?: boolean;
}
