/**
 * Shared constants for the blog application
 */

import type { EssayType, Topic } from '@/types/content';

/**
 * Maps essay types to display labels
 */
export const ESSAY_TYPE_LABELS: Record<EssayType, string> = {
  guide: 'Guide',
  'deep-dive': 'Deep Dive',
  opinion: 'Opinion',
  review: 'Review',
  narrative: 'Narrative',
};

/**
 * Maps topics to display labels
 */
export const TOPIC_LABELS: Record<Topic, string> = {
  technical: 'Technical',
  ai: 'AI',
  product: 'Product',
  career: 'Career',
};

/**
 * All essay types for iteration (derived from ESSAY_TYPE_LABELS)
 */
export const ESSAY_TYPES = Object.keys(ESSAY_TYPE_LABELS) as EssayType[];

/**
 * All topics for iteration (derived from TOPIC_LABELS)
 */
export const TOPICS = Object.keys(TOPIC_LABELS) as Topic[];

/**
 * Helper to get essay type label
 */
export function getEssayTypeLabel(type: EssayType): string {
  return ESSAY_TYPE_LABELS[type];
}

/**
 * Helper to get topic label
 */
export function getTopicLabel(topic: Topic): string {
  return TOPIC_LABELS[topic];
}
