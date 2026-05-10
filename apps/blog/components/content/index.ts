// Context providers
export { NoteProvider, useNotes, useNotesOptional } from './NoteContext';
export type { NoteData } from './NoteContext';

export {
  ReferenceProvider,
  useReferences,
  useReferencesOptional,
} from './ReferenceContext';
export type { ReferenceData } from './ReferenceContext';

// Content components
export { Note } from './Note';
export type { NoteProps } from './Note';

export { Marginnote } from './Marginnote';
export type { MarginnoteProps } from './Marginnote';

export { Reference } from './Reference';
export type { ReferenceProps } from './Reference';

export { References } from './References';
export type { ReferencesProps } from './References';

export { WideBlock } from './WideBlock';
export type { WideBlockProps } from './WideBlock';

export {
  ContrastPair,
  ContrastPositive,
  ContrastNegative,
} from './ContrastPair';
export type {
  ContrastPairProps,
  ContrastBlockProps,
} from './ContrastPair';

// Embed components
export { XEmbed } from './XEmbed';

// Timeline components
export {
  TimelineMap,
  TimelineSubwayMap,
  TimelineTable,
  TimelineNode,
  TimelineLine,
  TimelineTooltip,
  createDecadePeriodAssigner,
  createYearPeriodAssigner,
  createMonthPeriodAssigner,
  createDefaultPeriodAssigner,
  resolveCategories,
  getCategoryColor,
  getCategoryName,
} from './timeline';

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
} from './timeline';
