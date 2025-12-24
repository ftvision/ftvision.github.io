/**
 * Periodic content fetching utilities
 *
 * Provides functions for loading and querying periodic content (digests, changelogs, notes)
 * from the filesystem.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import {
  validatePeriodicFrontmatter,
  type Periodic,
  type PeriodicMeta,
  type PeriodicType,
  type Topic,
  type Language,
} from '@/types/content';

/** Directory where periodic MDX files are stored */
const PERIODICS_DIRECTORY = path.join(process.cwd(), 'content', 'periodics');

/**
 * Options for fetching periodics
 */
export interface GetPeriodicsOptions {
  /** Include draft periodics (default: false in production, true in development) */
  includeDrafts?: boolean;
  /** Filter by language */
  language?: Language;
}

/**
 * Get all periodic slugs (for static path generation)
 *
 * Returns slugs from .mdx files, excluding:
 * - Files starting with underscore (e.g., _template.mdx)
 * - Non-.mdx files
 */
export function getPeriodicSlugs(): string[] {
  try {
    const files = fs.readdirSync(PERIODICS_DIRECTORY);
    return files
      .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch {
    // Directory doesn't exist yet
    return [];
  }
}

/**
 * Get all periodics with metadata
 *
 * Returns periodics sorted by date (newest first), then by issue number (descending).
 * Optionally filtered by language.
 */
export function getAllPeriodics(options: GetPeriodicsOptions = {}): PeriodicMeta[] {
  const {
    includeDrafts = process.env.NODE_ENV === 'development',
    language,
  } = options;

  const slugs = getPeriodicSlugs();
  const periodics: PeriodicMeta[] = [];

  for (const slug of slugs) {
    const periodic = getPeriodicMeta(slug);
    if (periodic) {
      // Filter drafts based on options
      if (!includeDrafts && periodic.draft) {
        continue;
      }
      // Filter by language if specified
      if (language && periodic.lang !== language) {
        continue;
      }
      periodics.push(periodic);
    }
  }

  // Sort by date (newest first), then by issue number (descending)
  periodics.sort((a, b) => {
    const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateCompare !== 0) return dateCompare;
    return b.issue - a.issue;
  });

  return periodics;
}

/**
 * Get a single periodic by slug (with full content)
 *
 * Returns null if periodic doesn't exist.
 */
export function getPeriodicBySlug(slug: string): Periodic | null {
  const filePath = path.join(PERIODICS_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  try {
    const frontmatter = validatePeriodicFrontmatter(data);
    const stats = readingTime(content);

    return {
      slug,
      ...frontmatter,
      content,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    console.error(`Error parsing periodic ${slug}:`, error);
    return null;
  }
}

/**
 * Get periodic metadata only (without content)
 *
 * Useful for listing periodics without loading full content.
 */
export function getPeriodicMeta(slug: string): PeriodicMeta | null {
  const filePath = path.join(PERIODICS_DIRECTORY, `${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = validatePeriodicFrontmatter(data);
    const stats = readingTime(content);

    return {
      slug,
      ...frontmatter,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    console.error(`Error parsing periodic meta ${slug}:`, error);
    return null;
  }
}

/**
 * Get periodics filtered by type
 */
export function getPeriodicsByType(
  type: PeriodicType,
  options: GetPeriodicsOptions = {}
): PeriodicMeta[] {
  return getAllPeriodics(options).filter((periodic) => periodic.type === type);
}

/**
 * Get periodics filtered by topic
 */
export function getPeriodicsByTopic(
  topic: Topic,
  options: GetPeriodicsOptions = {}
): PeriodicMeta[] {
  return getAllPeriodics(options).filter((periodic) => periodic.topics.includes(topic));
}

/**
 * Get recent periodics (for home page)
 */
export function getRecentPeriodics(
  count: number = 5,
  options: GetPeriodicsOptions = {}
): PeriodicMeta[] {
  return getAllPeriodics(options).slice(0, count);
}

/**
 * Get periodics filtered by language
 */
export function getPeriodicsByLanguage(
  lang: Language,
  options: GetPeriodicsOptions = {}
): PeriodicMeta[] {
  return getAllPeriodics({ ...options, language: lang });
}

/**
 * Get the translation of a periodic (if it exists)
 *
 * Looks for a periodic that:
 * 1. Has a translationOf field pointing to this slug
 * 2. OR is pointed to by this periodic's translationOf field
 *
 * Returns null if no translation exists.
 */
export function getPeriodicTranslation(
  slug: string,
  targetLang: Language
): PeriodicMeta | null {
  const currentPeriodic = getPeriodicMeta(slug);
  if (!currentPeriodic) return null;

  // If current periodic's lang matches target, no translation needed
  if (currentPeriodic.lang === targetLang) return currentPeriodic;

  // Check if current periodic has a translationOf field pointing to target
  if (currentPeriodic.translationOf) {
    const translation = getPeriodicMeta(currentPeriodic.translationOf);
    if (translation && translation.lang === targetLang) {
      return translation;
    }
  }

  // Search all periodics for one that points to this slug and matches target language
  const allPeriodics = getAllPeriodics({ includeDrafts: true });
  for (const periodic of allPeriodics) {
    if (periodic.translationOf === slug && periodic.lang === targetLang) {
      return periodic;
    }
  }

  return null;
}

/**
 * Get all periodic slugs for a specific language (for static path generation)
 */
export function getPeriodicSlugsByLanguage(lang: Language): string[] {
  const periodics = getPeriodicsByLanguage(lang);
  return periodics.map((periodic) => periodic.slug);
}
