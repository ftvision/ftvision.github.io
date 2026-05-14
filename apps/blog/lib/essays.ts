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
import { extractHeadings } from './mdx';

/** Directory where essay MDX files are stored */
const ESSAYS_DIRECTORY = path.join(process.cwd(), 'content', 'essays');

// In production builds the content set is frozen for the lifetime of the
// process, so we memoize file reads. In dev/test the cache is bypassed so
// edits are picked up immediately.
const CACHE_ENABLED = process.env.NODE_ENV === 'production';
const slugsCache = new Map<string, string[]>();
const metaCache = new Map<string, EssayMeta | null>();
const bySlugCache = new Map<string, Essay | null>();

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
 * - Draft essays (in production)
 */
export function getEssaySlugs(options: { includeDrafts?: boolean } = {}): string[] {
  const { includeDrafts = process.env.NODE_ENV !== 'production' } = options;
  const cacheKey = includeDrafts ? 'with-drafts' : 'no-drafts';

  if (CACHE_ENABLED) {
    const cached = slugsCache.get(cacheKey);
    if (cached) return cached;
  }

  let result: string[];
  try {
    const files = fs.readdirSync(ESSAYS_DIRECTORY);
    const slugs = files
      .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
      .map((file) => file.replace(/\.mdx$/, ''));

    result = includeDrafts
      ? slugs
      : slugs.filter((slug) => !getEssayMeta(slug)?.draft);
  } catch {
    // Directory doesn't exist yet
    result = [];
  }

  if (CACHE_ENABLED) slugsCache.set(cacheKey, result);
  return result;
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

  const slugs = getEssaySlugs({ includeDrafts: true });
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
 * Returns null if essay doesn't exist or is a draft in production.
 */
export function getEssayBySlug(slug: string, options: { includeDrafts?: boolean } = {}): Essay | null {
  const { includeDrafts = process.env.NODE_ENV === 'development' } = options;

  let essay: Essay | null;
  if (CACHE_ENABLED && bySlugCache.has(slug)) {
    essay = bySlugCache.get(slug) ?? null;
  } else {
    essay = readEssayFile(slug);
    if (CACHE_ENABLED) bySlugCache.set(slug, essay);
  }

  if (!essay) return null;
  if (!includeDrafts && essay.draft) return null;
  return essay;
}

function readEssayFile(slug: string): Essay | null {
  const filePath = path.join(ESSAYS_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  try {
    const frontmatter = validateFrontmatter(data);
    const stats = readingTime(content);
    const toc = extractHeadings(content, { minLevel: 2, maxLevel: 3 });

    return {
      slug,
      ...frontmatter,
      content,
      readingTime: Math.ceil(stats.minutes),
      toc,
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
  if (CACHE_ENABLED && metaCache.has(slug)) {
    return metaCache.get(slug) ?? null;
  }

  const filePath = path.join(ESSAYS_DIRECTORY, `${slug}.mdx`);
  let result: EssayMeta | null;
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = validateFrontmatter(data);
    const stats = readingTime(content);

    result = {
      slug,
      ...frontmatter,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    if (error instanceof Error && /not found|ENOENT/i.test(error.message)) {
      result = null;
    } else {
      console.error(`Error parsing essay meta ${slug}:`, error);
      result = null;
    }
  }

  if (CACHE_ENABLED) metaCache.set(slug, result);
  return result;
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

/**
 * Get essays related to a given essay.
 *
 * Two paths:
 *
 *   A. **Author-curated**: when the source has a `relatedTo: [slug, …]`
 *      frontmatter list, use exactly those slugs (in order). Slugs that
 *      don't resolve, that point at the source itself, or that point at
 *      a cross-language essay are dropped silently. Cap at `limit`.
 *      Manual curation is the strongest editorial signal — both for
 *      readers and for AI engines weighing relevance.
 *
 *   B. **Auto**: when no `relatedTo` is set, score candidates by Jaccard
 *      topic similarity plus a small same-`type` bonus. Candidates that
 *      share zero topics with the source are dropped — no recency
 *      fallback. Better to show 1 strong related essay (or none) than
 *      3 weak ones, since irrelevant links read as automated content
 *      to both search engines and AI answer engines.
 *
 * In both paths, drafts, the source itself, and the source's translation
 * (in either direction) are excluded.
 */

/** Bonus added to the Jaccard score when source and candidate share a type. */
const TYPE_MATCH_BONUS = 0.15;

function jaccard<T>(a: T[], b: T[]): number {
  if (a.length === 0 && b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let intersection = 0;
  for (const item of setA) if (setB.has(item)) intersection += 1;
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function sharedCount<T>(a: T[], b: T[]): number {
  const setB = new Set(b);
  let count = 0;
  for (const item of a) if (setB.has(item)) count += 1;
  return count;
}

export function getRelatedEssays(
  slug: string,
  options: { limit?: number } = {},
): EssayMeta[] {
  const { limit = 3 } = options;
  const source = getEssayMeta(slug);
  if (!source) return [];

  // translationOf points either way; exclude both directions.
  const translationSlug = source.translationOf;
  const isSelfOrTranslation = (essay: EssayMeta) =>
    essay.slug === slug ||
    essay.slug === translationSlug ||
    essay.translationOf === slug;

  // Path A — author-curated
  if (source.relatedTo && source.relatedTo.length > 0) {
    const curated: EssayMeta[] = [];
    for (const targetSlug of source.relatedTo) {
      if (curated.length >= limit) break;
      const target = getEssayMeta(targetSlug);
      if (!target) continue;
      if (target.lang !== source.lang) continue;
      if (isSelfOrTranslation(target)) continue;
      if (target.draft) continue;
      curated.push(target);
    }
    return curated;
  }

  // Path B — auto-rank, no recency fallback
  const candidates = getAllEssays({ language: source.lang }).filter(
    (essay) => !isSelfOrTranslation(essay),
  );

  return candidates
    .map((essay) => {
      const shared = sharedCount(source.topics, essay.topics);
      const score =
        jaccard(source.topics, essay.topics) +
        (essay.type === source.type ? TYPE_MATCH_BONUS : 0);
      return { essay, shared, score };
    })
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.essay.date).getTime() - new Date(a.essay.date).getTime();
    })
    .slice(0, limit)
    .map((entry) => entry.essay);
}
