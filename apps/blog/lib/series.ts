/**
 * Series content fetching utilities
 *
 * Provides functions for loading and querying series content (bibliographies,
 * reading lists, resources, tools) from the filesystem.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import {
  validateSeriesFrontmatter,
  type Series,
  type SeriesMeta,
  type SeriesCategory,
  type Topic,
  type Language,
} from '@/types/content';
import { extractHeadings } from './mdx';

/** Directory where series MDX files are stored */
const SERIES_DIRECTORY = path.join(process.cwd(), 'content', 'series');

/**
 * Options for fetching series
 */
export interface GetSeriesOptions {
  /** Include draft series (default: false in production, true in development) */
  includeDrafts?: boolean;
  /** Filter by language */
  language?: Language;
}

/**
 * Get all series slugs (for static path generation)
 *
 * Returns slugs from .mdx files, excluding:
 * - Files starting with underscore (e.g., _template.mdx)
 * - Non-.mdx files
 */
export function getSeriesSlugs(): string[] {
  try {
    const files = fs.readdirSync(SERIES_DIRECTORY);
    return files
      .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch {
    // Directory doesn't exist yet
    return [];
  }
}

/**
 * Get all series with metadata
 *
 * Returns series sorted by updated date (if exists) or date (newest first).
 * Optionally filtered by language.
 */
export function getAllSeries(options: GetSeriesOptions = {}): SeriesMeta[] {
  const {
    includeDrafts = process.env.NODE_ENV === 'development',
    language,
  } = options;

  const slugs = getSeriesSlugs();
  const seriesList: SeriesMeta[] = [];

  for (const slug of slugs) {
    const series = getSeriesMeta(slug);
    if (series) {
      // Filter drafts based on options
      if (!includeDrafts && series.draft) {
        continue;
      }
      // Filter by language if specified
      if (language && series.lang !== language) {
        continue;
      }
      seriesList.push(series);
    }
  }

  // Sort by updated date (if exists) or date, newest first
  seriesList.sort((a, b) => {
    const dateA = a.updated || a.date;
    const dateB = b.updated || b.date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return seriesList;
}

/**
 * Get a single series by slug (with full content)
 *
 * Returns null if series doesn't exist.
 */
export function getSeriesBySlug(slug: string): Series | null {
  const filePath = path.join(SERIES_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  try {
    const frontmatter = validateSeriesFrontmatter(data);
    const stats = readingTime(content);
    // Extract table of contents from h2 and h3 headings
    const toc = extractHeadings(content, { minLevel: 2, maxLevel: 3 });

    return {
      slug,
      ...frontmatter,
      content,
      readingTime: Math.ceil(stats.minutes),
      toc,
    };
  } catch (error) {
    console.error(`Error parsing series ${slug}:`, error);
    return null;
  }
}

/**
 * Get series metadata only (without content)
 *
 * Useful for listing series without loading full content.
 */
export function getSeriesMeta(slug: string): SeriesMeta | null {
  const filePath = path.join(SERIES_DIRECTORY, `${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = validateSeriesFrontmatter(data);
    const stats = readingTime(content);

    return {
      slug,
      ...frontmatter,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    console.error(`Error parsing series meta ${slug}:`, error);
    return null;
  }
}

/**
 * Get series filtered by category
 */
export function getSeriesByCategory(
  category: SeriesCategory,
  options: GetSeriesOptions = {}
): SeriesMeta[] {
  return getAllSeries(options).filter((series) => series.category === category);
}

/**
 * Get series filtered by topic
 */
export function getSeriesByTopic(
  topic: Topic,
  options: GetSeriesOptions = {}
): SeriesMeta[] {
  return getAllSeries(options).filter((series) => series.topics.includes(topic));
}

/**
 * Get recent series (for home page)
 */
export function getRecentSeries(
  count: number = 5,
  options: GetSeriesOptions = {}
): SeriesMeta[] {
  return getAllSeries(options).slice(0, count);
}

/**
 * Get series filtered by language
 */
export function getSeriesByLanguage(
  lang: Language,
  options: GetSeriesOptions = {}
): SeriesMeta[] {
  return getAllSeries({ ...options, language: lang });
}

/**
 * Get the translation of a series (if it exists)
 *
 * Looks for a series that:
 * 1. Has a translationOf field pointing to this slug
 * 2. OR is pointed to by this series's translationOf field
 *
 * Returns null if no translation exists.
 */
export function getSeriesTranslation(
  slug: string,
  targetLang: Language
): SeriesMeta | null {
  const currentSeries = getSeriesMeta(slug);
  if (!currentSeries) return null;

  // If current series's lang matches target, no translation needed
  if (currentSeries.lang === targetLang) return currentSeries;

  // Check if current series has a translationOf field pointing to target
  if (currentSeries.translationOf) {
    const translation = getSeriesMeta(currentSeries.translationOf);
    if (translation && translation.lang === targetLang) {
      return translation;
    }
  }

  // Search all series for one that points to this slug and matches target language
  const allSeriesList = getAllSeries({ includeDrafts: true });
  for (const series of allSeriesList) {
    if (series.translationOf === slug && series.lang === targetLang) {
      return series;
    }
  }

  return null;
}

/**
 * Get all series slugs for a specific language (for static path generation)
 */
export function getSeriesSlugsByLanguage(lang: Language): string[] {
  const seriesList = getSeriesByLanguage(lang);
  return seriesList.map((series) => series.slug);
}

/**
 * Get series grouped by category
 */
export function getSeriesGroupedByCategory(
  options: GetSeriesOptions = {}
): Record<SeriesCategory, SeriesMeta[]> {
  const allSeriesList = getAllSeries(options);

  const grouped: Record<SeriesCategory, SeriesMeta[]> = {
    resources: [],
    bibliography: [],
    'reading-list': [],
    tools: [],
    'writing-series': [],
  };

  for (const series of allSeriesList) {
    grouped[series.category].push(series);
  }

  return grouped;
}
