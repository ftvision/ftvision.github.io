/**
 * Essay content fetching utilities
 *
 * Provides functions for loading and querying essay content from the filesystem.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import {
  validateFrontmatter,
  type Essay,
  type EssayMeta,
  type EssayType,
  type Topic,
  type Language,
} from '@/types/content';

/** Directory where essay MDX files are stored */
const ESSAYS_DIRECTORY = path.join(process.cwd(), 'content', 'essays');

/**
 * Options for fetching essays
 */
export interface GetEssaysOptions {
  /** Include draft essays (default: false in production, true in development) */
  includeDrafts?: boolean;
  /** Filter by language */
  language?: Language;
}

/**
 * Get all essay slugs (for static path generation)
 *
 * Returns slugs from .mdx files, excluding:
 * - Files starting with underscore (e.g., _template.mdx)
 * - Non-.mdx files
 */
export function getEssaySlugs(): string[] {
  try {
    const files = fs.readdirSync(ESSAYS_DIRECTORY);
    return files
      .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch {
    // Directory doesn't exist yet
    return [];
  }
}

/**
 * Get all essays with metadata
 *
 * Returns essays sorted by date (newest first).
 * Optionally filtered by language.
 */
export function getAllEssays(options: GetEssaysOptions = {}): EssayMeta[] {
  const {
    includeDrafts = process.env.NODE_ENV === 'development',
    language,
  } = options;

  const slugs = getEssaySlugs();
  const essays: EssayMeta[] = [];

  for (const slug of slugs) {
    const essay = getEssayMeta(slug);
    if (essay) {
      // Filter drafts based on options
      if (!includeDrafts && essay.draft) {
        continue;
      }
      // Filter by language if specified
      if (language && essay.lang !== language) {
        continue;
      }
      essays.push(essay);
    }
  }

  // Sort by date, newest first
  essays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return essays;
}

/**
 * Get a single essay by slug (with full content)
 *
 * Returns null if essay doesn't exist.
 */
export function getEssayBySlug(slug: string): Essay | null {
  const filePath = path.join(ESSAYS_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  try {
    const frontmatter = validateFrontmatter(data);
    const stats = readingTime(content);

    return {
      slug,
      ...frontmatter,
      content,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    console.error(`Error parsing essay ${slug}:`, error);
    return null;
  }
}

/**
 * Get essay metadata only (without content)
 *
 * Useful for listing essays without loading full content.
 */
export function getEssayMeta(slug: string): EssayMeta | null {
  const filePath = path.join(ESSAYS_DIRECTORY, `${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = validateFrontmatter(data);
    const stats = readingTime(content);

    return {
      slug,
      ...frontmatter,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    console.error(`Error parsing essay meta ${slug}:`, error);
    return null;
  }
}

/**
 * Get essays filtered by type
 */
export function getEssaysByType(
  type: EssayType,
  options: GetEssaysOptions = {}
): EssayMeta[] {
  return getAllEssays(options).filter((essay) => essay.type === type);
}

/**
 * Get essays filtered by topic
 */
export function getEssaysByTopic(
  topic: Topic,
  options: GetEssaysOptions = {}
): EssayMeta[] {
  return getAllEssays(options).filter((essay) => essay.topics.includes(topic));
}

/**
 * Get recent essays (for home page)
 */
export function getRecentEssays(
  count: number = 5,
  options: GetEssaysOptions = {}
): EssayMeta[] {
  return getAllEssays(options).slice(0, count);
}

/**
 * Get essays filtered by language
 */
export function getEssaysByLanguage(
  lang: Language,
  options: GetEssaysOptions = {}
): EssayMeta[] {
  return getAllEssays({ ...options, language: lang });
}

/**
 * Get the translation of an essay (if it exists)
 *
 * Looks for an essay that:
 * 1. Has a translationOf field pointing to this slug
 * 2. OR is pointed to by this essay's translationOf field
 *
 * Returns null if no translation exists.
 */
export function getTranslation(
  slug: string,
  targetLang: Language
): EssayMeta | null {
  const currentEssay = getEssayMeta(slug);
  if (!currentEssay) return null;

  // If current essay's lang matches target, no translation needed
  if (currentEssay.lang === targetLang) return currentEssay;

  // Check if current essay has a translationOf field pointing to target
  if (currentEssay.translationOf) {
    const translation = getEssayMeta(currentEssay.translationOf);
    if (translation && translation.lang === targetLang) {
      return translation;
    }
  }

  // Search all essays for one that points to this slug and matches target language
  const allEssays = getAllEssays({ includeDrafts: true });
  for (const essay of allEssays) {
    if (essay.translationOf === slug && essay.lang === targetLang) {
      return essay;
    }
  }

  return null;
}

/**
 * Get all essay slugs for a specific language (for static path generation)
 */
export function getEssaySlugsByLanguage(lang: Language): string[] {
  const essays = getEssaysByLanguage(lang);
  return essays.map((essay) => essay.slug);
}
