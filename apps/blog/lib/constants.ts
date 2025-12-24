/**
 * Shared constants for the blog application
 */

import type { EssayType, Topic, Language, PeriodicType, ReferenceCategory } from '@/types/content';

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
  research: 'Research',
  design: 'Design',
  learning: 'Learning',
};

/**
 * Maps topics to display labels (Chinese)
 */
export const TOPIC_LABELS_ZH: Record<Topic, string> = {
  technical: '技术',
  ai: 'AI',
  product: '产品',
  career: '职业',
  research: '研究',
  design: '设计',
  learning: '学习',
};

/**
 * Maps periodic types to display labels (English)
 */
export const PERIODIC_TYPE_LABELS: Record<PeriodicType, string> = {
  digest: 'Digest',
  changelog: 'Changelog',
  notes: 'Notes',
};

/**
 * Maps periodic types to display labels (Chinese)
 */
export const PERIODIC_TYPE_LABELS_ZH: Record<PeriodicType, string> = {
  digest: '文摘',
  changelog: '更新日志',
  notes: '笔记',
};

/**
 * Maps reference categories to display labels (English)
 */
export const REFERENCE_CATEGORY_LABELS: Record<ReferenceCategory, string> = {
  resources: 'Resources',
  bibliography: 'Bibliography',
  'reading-list': 'Reading List',
  tools: 'Tools',
};

/**
 * Maps reference categories to display labels (Chinese)
 */
export const REFERENCE_CATEGORY_LABELS_ZH: Record<ReferenceCategory, string> = {
  resources: '资源',
  bibliography: '文献',
  'reading-list': '阅读清单',
  tools: '工具',
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
 * All periodic types for iteration
 */
export const PERIODIC_TYPES = Object.keys(PERIODIC_TYPE_LABELS) as PeriodicType[];

/**
 * All reference categories for iteration
 */
export const REFERENCE_CATEGORIES = Object.keys(REFERENCE_CATEGORY_LABELS) as ReferenceCategory[];

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

/**
 * Helper to get periodic type label
 */
export function getPeriodicTypeLabel(type: PeriodicType, language: Language = 'en'): string {
  return language === 'zh' ? PERIODIC_TYPE_LABELS_ZH[type] : PERIODIC_TYPE_LABELS[type];
}

/**
 * Get all periodic type labels for a language
 */
export function getPeriodicTypeLabels(language: Language = 'en'): Record<PeriodicType, string> {
  return language === 'zh' ? PERIODIC_TYPE_LABELS_ZH : PERIODIC_TYPE_LABELS;
}

/**
 * Helper to get reference category label
 */
export function getReferenceCategoryLabel(category: ReferenceCategory, language: Language = 'en'): string {
  return language === 'zh' ? REFERENCE_CATEGORY_LABELS_ZH[category] : REFERENCE_CATEGORY_LABELS[category];
}

/**
 * Get all reference category labels for a language
 */
export function getReferenceCategoryLabels(language: Language = 'en'): Record<ReferenceCategory, string> {
  return language === 'zh' ? REFERENCE_CATEGORY_LABELS_ZH : REFERENCE_CATEGORY_LABELS;
}
