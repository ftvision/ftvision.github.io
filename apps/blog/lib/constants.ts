/**
 * Shared constants for the blog application
 */

import type { EssayType, Topic, Language } from '@/types/content';

/**
 * Maps essay types to display labels (English)
 */
export const ESSAY_TYPE_LABELS: Record<EssayType, string> = {
  guide: 'Guide',
  'deep-dive': 'Deep Dive',
  opinion: 'Opinion',
  review: 'Review',
  narrative: 'Narrative',
};

/**
 * Maps essay types to display labels (Chinese)
 */
export const ESSAY_TYPE_LABELS_ZH: Record<EssayType, string> = {
  guide: '指南',
  'deep-dive': '深度分析',
  opinion: '观点',
  review: '评测',
  narrative: '叙事',
};

/**
 * Maps topics to display labels (English)
 */
export const TOPIC_LABELS: Record<Topic, string> = {
  technical: 'Technical',
  ai: 'AI',
  product: 'Product',
  career: 'Career',
};

/**
 * Maps topics to display labels (Chinese)
 */
export const TOPIC_LABELS_ZH: Record<Topic, string> = {
  technical: '技术',
  ai: 'AI',
  product: '产品',
  career: '职业',
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
export function getEssayTypeLabel(type: EssayType, language: Language = 'en'): string {
  return language === 'zh' ? ESSAY_TYPE_LABELS_ZH[type] : ESSAY_TYPE_LABELS[type];
}

/**
 * Helper to get topic label
 */
export function getTopicLabel(topic: Topic, language: Language = 'en'): string {
  return language === 'zh' ? TOPIC_LABELS_ZH[topic] : TOPIC_LABELS[topic];
}

/**
 * Get all essay type labels for a language
 */
export function getEssayTypeLabels(language: Language = 'en'): Record<EssayType, string> {
  return language === 'zh' ? ESSAY_TYPE_LABELS_ZH : ESSAY_TYPE_LABELS;
}

/**
 * Get all topic labels for a language
 */
export function getTopicLabels(language: Language = 'en'): Record<Topic, string> {
  return language === 'zh' ? TOPIC_LABELS_ZH : TOPIC_LABELS;
}
