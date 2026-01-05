/**
 * Vision100 Subway Map Components
 *
 * Visualization of 100 foundational vision science papers
 * organized as a subway map with topic "lines" and decade "stations"
 */

export { Vision100Map } from './Vision100Map';

// Re-export types
export type {
  Vision100MapProps,
  VisionPaper,
  VisionTopic,
  SubwayLine as SubwayLineType,
  NodePosition,
  Decade,
} from '@/types/vision100';
