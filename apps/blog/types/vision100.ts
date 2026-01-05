/**
 * Vision100 Subway Map Types
 *
 * Type definitions for the vision science paper visualization
 */

/**
 * Vision science research topic categories (subway lines)
 */
export type VisionTopic =
  | 'receptive-fields'
  | 'attention'
  | 'motion'
  | 'computational'
  | 'color-vision'
  | 'object-recognition'
  | 'brain-mapping';

/**
 * Decade bins for X-axis positioning
 */
export type Decade = '1950s' | '1960s' | '1970s' | '1980s' | '1990s' | '2000s';

/**
 * Parsed paper data structure
 */
export interface VisionPaper {
  /** Rank from original list (1-100) */
  id: number;
  /** First author last name */
  firstAuthor: string;
  /** Full author list */
  authors: string;
  /** Publication year */
  year: number;
  /** Paper title */
  title: string;
  /** Journal name */
  journal: string;
  /** Volume/pages info */
  volumeInfo?: string;
  /** Assigned topic category */
  topic: VisionTopic;
  /** Computed decade bin */
  decade: Decade;
}

/**
 * Subway line configuration
 */
export interface SubwayLine {
  /** Topic identifier */
  id: VisionTopic;
  /** Display name */
  name: string;
  /** CSS color variable */
  color: string;
  /** Y-position index (0-6) */
  yIndex: number;
}

/**
 * Position on the subway map
 */
export interface NodePosition {
  /** SVG X coordinate */
  x: number;
  /** SVG Y coordinate */
  y: number;
}

/**
 * Props for the Vision100Map component
 */
export interface Vision100MapProps {
  /** Optional className for container styling */
  className?: string;
  /** Initial view mode */
  defaultView?: 'map' | 'table';
  /** Break out of content column to span full viewport width */
  hero?: boolean;
}
