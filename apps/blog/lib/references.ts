/**
 * Reference content fetching utilities
 *
 * Provides functions for loading and querying reference content (bibliographies,
 * reading lists, resources, tools) from the filesystem.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import {
  validateReferenceFrontmatter,
  type Reference,
  type ReferenceMeta,
  type ReferenceCategory,
  type Topic,
  type Language,
} from '@/types/content';

/** Directory where reference MDX files are stored */
const REFERENCES_DIRECTORY = path.join(process.cwd(), 'content', 'references');

/**
 * Options for fetching references
 */
export interface GetReferencesOptions {
  /** Include draft references (default: false in production, true in development) */
  includeDrafts?: boolean;
  /** Filter by language */
  language?: Language;
}

/**
 * Get all reference slugs (for static path generation)
 *
 * Returns slugs from .mdx files, excluding:
 * - Files starting with underscore (e.g., _template.mdx)
 * - Non-.mdx files
 */
export function getReferenceSlugs(): string[] {
  try {
    const files = fs.readdirSync(REFERENCES_DIRECTORY);
    return files
      .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch {
    // Directory doesn't exist yet
    return [];
  }
}

/**
 * Get all references with metadata
 *
 * Returns references sorted by updated date (if exists) or date (newest first).
 * Optionally filtered by language.
 */
export function getAllReferences(options: GetReferencesOptions = {}): ReferenceMeta[] {
  const {
    includeDrafts = process.env.NODE_ENV === 'development',
    language,
  } = options;

  const slugs = getReferenceSlugs();
  const references: ReferenceMeta[] = [];

  for (const slug of slugs) {
    const reference = getReferenceMeta(slug);
    if (reference) {
      // Filter drafts based on options
      if (!includeDrafts && reference.draft) {
        continue;
      }
      // Filter by language if specified
      if (language && reference.lang !== language) {
        continue;
      }
      references.push(reference);
    }
  }

  // Sort by updated date (if exists) or date, newest first
  references.sort((a, b) => {
    const dateA = a.updated || a.date;
    const dateB = b.updated || b.date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return references;
}

/**
 * Get a single reference by slug (with full content)
 *
 * Returns null if reference doesn't exist.
 */
export function getReferenceBySlug(slug: string): Reference | null {
  const filePath = path.join(REFERENCES_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  try {
    const frontmatter = validateReferenceFrontmatter(data);
    const stats = readingTime(content);

    return {
      slug,
      ...frontmatter,
      content,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    console.error(`Error parsing reference ${slug}:`, error);
    return null;
  }
}

/**
 * Get reference metadata only (without content)
 *
 * Useful for listing references without loading full content.
 */
export function getReferenceMeta(slug: string): ReferenceMeta | null {
  const filePath = path.join(REFERENCES_DIRECTORY, `${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = validateReferenceFrontmatter(data);
    const stats = readingTime(content);

    return {
      slug,
      ...frontmatter,
      readingTime: Math.ceil(stats.minutes),
    };
  } catch (error) {
    console.error(`Error parsing reference meta ${slug}:`, error);
    return null;
  }
}

/**
 * Get references filtered by category
 */
export function getReferencesByCategory(
  category: ReferenceCategory,
  options: GetReferencesOptions = {}
): ReferenceMeta[] {
  return getAllReferences(options).filter((reference) => reference.category === category);
}

/**
 * Get references filtered by topic
 */
export function getReferencesByTopic(
  topic: Topic,
  options: GetReferencesOptions = {}
): ReferenceMeta[] {
  return getAllReferences(options).filter((reference) => reference.topics.includes(topic));
}

/**
 * Get recent references (for home page)
 */
export function getRecentReferences(
  count: number = 5,
  options: GetReferencesOptions = {}
): ReferenceMeta[] {
  return getAllReferences(options).slice(0, count);
}

/**
 * Get references filtered by language
 */
export function getReferencesByLanguage(
  lang: Language,
  options: GetReferencesOptions = {}
): ReferenceMeta[] {
  return getAllReferences({ ...options, language: lang });
}

/**
 * Get the translation of a reference (if it exists)
 *
 * Looks for a reference that:
 * 1. Has a translationOf field pointing to this slug
 * 2. OR is pointed to by this reference's translationOf field
 *
 * Returns null if no translation exists.
 */
export function getReferenceTranslation(
  slug: string,
  targetLang: Language
): ReferenceMeta | null {
  const currentReference = getReferenceMeta(slug);
  if (!currentReference) return null;

  // If current reference's lang matches target, no translation needed
  if (currentReference.lang === targetLang) return currentReference;

  // Check if current reference has a translationOf field pointing to target
  if (currentReference.translationOf) {
    const translation = getReferenceMeta(currentReference.translationOf);
    if (translation && translation.lang === targetLang) {
      return translation;
    }
  }

  // Search all references for one that points to this slug and matches target language
  const allReferences = getAllReferences({ includeDrafts: true });
  for (const reference of allReferences) {
    if (reference.translationOf === slug && reference.lang === targetLang) {
      return reference;
    }
  }

  return null;
}

/**
 * Get all reference slugs for a specific language (for static path generation)
 */
export function getReferenceSlugsByLanguage(lang: Language): string[] {
  const references = getReferencesByLanguage(lang);
  return references.map((reference) => reference.slug);
}

/**
 * Get references grouped by category
 */
export function getReferencesGroupedByCategory(
  options: GetReferencesOptions = {}
): Record<ReferenceCategory, ReferenceMeta[]> {
  const allReferences = getAllReferences(options);

  const grouped: Record<ReferenceCategory, ReferenceMeta[]> = {
    resources: [],
    bibliography: [],
    'reading-list': [],
    tools: [],
  };

  for (const reference of allReferences) {
    grouped[reference.category].push(reference);
  }

  return grouped;
}
