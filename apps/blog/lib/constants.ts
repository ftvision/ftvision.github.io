/**
 * Shared constants for the blog application
 */

import type { EssayType, Topic, Language, PeriodicType, SeriesCategory } from '@/types/content';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.feitong.phd';

export const SITE_AUTHOR = {
  name: 'Feitong Yang',
  url: `${SITE_URL}/about`,
} as const;

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
  science: 'Science',
  design: 'Design',
  learning: 'Learning',
  writing: 'Writing',
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
  science: '科学',
  design: '设计',
  learning: '学习',
  writing: '写作',
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
 * Maps series categories to display labels (English)
 */
export const SERIES_CATEGORY_LABELS: Record<SeriesCategory, string> = {
  resources: 'Resources',
  bibliography: 'Bibliography',
  'reading-list': 'Reading List',
  tools: 'Tools',
  'writing-series': 'Writing Series',
};

/**
 * Maps series categories to display labels (Chinese)
 */
export const SERIES_CATEGORY_LABELS_ZH: Record<SeriesCategory, string> = {
  resources: '资源',
  bibliography: '文献',
  'reading-list': '阅读清单',
  tools: '工具',
  'writing-series': '写作系列',
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
 * All series categories for iteration
 */
export const SERIES_CATEGORIES = Object.keys(SERIES_CATEGORY_LABELS) as SeriesCategory[];

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
 * Helper to get series category label
 */
export function getSeriesCategoryLabel(category: SeriesCategory, language: Language = 'en'): string {
  return language === 'zh' ? SERIES_CATEGORY_LABELS_ZH[category] : SERIES_CATEGORY_LABELS[category];
}

/**
 * Get all series category labels for a language
 */
export function getSeriesCategoryLabels(language: Language = 'en'): Record<SeriesCategory, string> {
  return language === 'zh' ? SERIES_CATEGORY_LABELS_ZH : SERIES_CATEGORY_LABELS;
}
