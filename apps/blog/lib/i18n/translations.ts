/**
 * UI String Translations
 *
 * Centralized translations for all UI elements.
 * Following the pattern from aboutData.ts for locale-keyed objects.
 */

import type { Language } from './language';

/**
 * All translatable UI strings
 */
export const translations = {
  en: {
    // Navigation
    'nav.essays': 'Essays',
    'nav.about': 'About',
    'nav.home': 'Home',

    // Site
    'site.name': 'Algo Mind',
    'site.tagline': 'Thoughts on technology, AI, product, and career',

    // Essay types
    'type.guide': 'Guide',
    'type.deep-dive': 'Deep Dive',
    'type.opinion': 'Opinion',
    'type.review': 'Review',
    'type.narrative': 'Narrative',

    // Topics
    'topic.technical': 'Technical',
    'topic.ai': 'AI',
    'topic.product': 'Product',
    'topic.career': 'Career',

    // Filter UI
    'filter.all': 'All',
    'filter.type': 'Type',
    'filter.topics': 'Topics',
    'filter.clear': 'Clear filters',
    'filter.results': '{count} essays',
    'filter.results.singular': '1 essay',
    'filter.noResults': 'No essays found',

    // Essay card
    'essay.readingTime': '{minutes} min read',
    'essay.draft': 'Draft',

    // Home page
    'home.recentEssays': 'Recent Essays',
    'home.viewAll': 'View all essays',
    'home.browseAll': 'Browse All Essays',

    // About page
    'about.title': 'About',
    'about.readEssays': 'Read My Essays',

    // Essays page
    'essays.matchingFilters': 'matching filters',
    'essays.emptyFiltered': 'No essays match the selected filters. Try adjusting your filters.',

    // Footer
    'footer.copyright': '© {year} All rights reserved.',
    'footer.builtWith': 'Built with Next.js',

    // Language toggle
    'language.switch': 'Switch language',
    'language.current': 'Current language: {language}',

    // Theme toggle
    'theme.switch': 'Toggle theme',
    'theme.light': 'Switch to light mode',
    'theme.dark': 'Switch to dark mode',

    // Mobile menu
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'menu.theme': 'Theme',
    'menu.language': 'Language',

    // Misc
    'loading': 'Loading...',
    'error': 'Something went wrong',
  },
  zh: {
    // Navigation
    'nav.essays': '文章',
    'nav.about': '关于',
    'nav.home': '首页',

    // Site
    'site.name': '思算',
    'site.tagline': '关于技术、AI、产品和职业的思考',

    // Essay types
    'type.guide': '指南',
    'type.deep-dive': '深度分析',
    'type.opinion': '观点',
    'type.review': '评测',
    'type.narrative': '叙事',

    // Topics
    'topic.technical': '技术',
    'topic.ai': 'AI',
    'topic.product': '产品',
    'topic.career': '职业',

    // Filter UI
    'filter.all': '全部',
    'filter.type': '类型',
    'filter.topics': '主题',
    'filter.clear': '清除筛选',
    'filter.results': '{count} 篇文章',
    'filter.results.singular': '1 篇文章',
    'filter.noResults': '没有找到文章',

    // Essay card
    'essay.readingTime': '阅读时间 {minutes} 分钟',
    'essay.draft': '草稿',

    // Home page
    'home.recentEssays': '最近文章',
    'home.viewAll': '查看全部文章',
    'home.browseAll': '浏览全部文章',

    // About page
    'about.title': '关于',
    'about.readEssays': '阅读我的文章',

    // Essays page
    'essays.matchingFilters': '符合筛选条件',
    'essays.emptyFiltered': '没有符合筛选条件的文章。请尝试调整筛选条件。',

    // Footer
    'footer.copyright': '© {year} 版权所有',
    'footer.builtWith': '使用 Next.js 构建',

    // Language toggle
    'language.switch': '切换语言',
    'language.current': '当前语言：{language}',

    // Theme toggle
    'theme.switch': '切换主题',
    'theme.light': '切换到浅色模式',
    'theme.dark': '切换到深色模式',

    // Mobile menu
    'menu.open': '打开菜单',
    'menu.close': '关闭菜单',
    'menu.theme': '主题',
    'menu.language': '语言',

    // Misc
    'loading': '加载中...',
    'error': '出错了',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

/**
 * Get a translation string for the given language and key
 * Supports interpolation with {placeholder} syntax
 */
export function translate(
  lang: Language,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const value = translations[lang][key] || translations.en[key] || key;

  if (!params) return value;

  let result = value as string;
  for (const [param, val] of Object.entries(params)) {
    result = result.replace(`{${param}}`, String(val));
  }
  return result;
}

/**
 * Get localized essay type label
 */
export function getTypeLabel(lang: Language, type: string): string {
  const key = `type.${type}` as TranslationKey;
  return translate(lang, key);
}

/**
 * Get localized topic label
 */
export function getTopicLabel(lang: Language, topic: string): string {
  const key = `topic.${topic}` as TranslationKey;
  return translate(lang, key);
}

/**
 * Format reading time for display
 */
export function formatReadingTime(lang: Language, minutes: number): string {
  return translate(lang, 'essay.readingTime', { minutes });
}

/**
 * Format date for display
 */
export function formatDate(lang: Language, dateString: string): string {
  const date = new Date(dateString);
  const locale = lang === 'zh' ? 'zh-CN' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format results count for display
 */
export function formatResultsCount(lang: Language, count: number): string {
  if (count === 0) {
    return translate(lang, 'filter.noResults');
  }
  if (count === 1) {
    return translate(lang, 'filter.results.singular');
  }
  return translate(lang, 'filter.results', { count });
}
