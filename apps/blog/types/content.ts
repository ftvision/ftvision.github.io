/**
 * Content Type Definitions
 *
 * These types define the essay taxonomy based on the two-axis system:
 * - Type (how it's written) - mutually exclusive
 * - Topics (what it's about) - can have multiple
 */

/**
 * Essay type - describes how the essay is written
 *
 * - guide: How X works, teaching - "I'll understand this topic"
 * - deep-dive: Why X happened, detailed analysis - "I'll see the deeper picture"
 * - opinion: What I think about X, takes - "I'll hear a perspective"
 * - review: Evaluating X (tools, books, papers) - "I'll know if X is worth it"
 * - narrative: What happened, storytelling - "I'll experience something"
 */
export type EssayType = 'guide' | 'deep-dive' | 'opinion' | 'review' | 'narrative';

/**
 * Topic - describes what the essay is about
 *
 * - technical: Engineering, systems, code, how things are built
 * - ai: ML, AI products, models, the AI landscape
 * - product: Product thinking, market, startup, business
 * - career: Work, jobs, companies, professional life
 */
export type Topic = 'technical' | 'ai' | 'product' | 'career';

/**
 * Language - supported languages
 */
export type Language = 'en' | 'zh';

/**
 * Essay metadata from frontmatter
 */
export interface EssayMeta {
  /** Unique identifier derived from filename */
  slug: string;
  /** Essay title */
  title: string;
  /** Brief description for previews and SEO */
  description: string;
  /** Publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Essay type (how it's written) */
  type: EssayType;
  /** Topics covered (can be multiple) */
  topics: Topic[];
  /** Content language */
  lang: Language;
  /** Whether this is a draft (not published) */
  draft?: boolean;
  /** Calculated reading time in minutes */
  readingTime?: number;
  /** Slug of the translation (links to translated version) */
  translationOf?: string;
}

/**
 * Full essay with content
 */
export interface Essay extends EssayMeta {
  /** Raw MDX content */
  content: string;
}

/**
 * Essay with compiled MDX source (for rendering)
 */
export interface CompiledEssay extends EssayMeta {
  /** Compiled MDX source for next-mdx-remote */
  mdxSource: MDXCompiledSource;
}

/**
 * Type for compiled MDX source from next-mdx-remote
 */
export interface MDXCompiledSource {
  compiledSource: string;
  scope?: Record<string, unknown>;
  frontmatter?: Record<string, unknown>;
}

/**
 * Frontmatter as parsed from MDX files
 */
export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  type: EssayType;
  topics: Topic[];
  lang: Language;
  draft?: boolean;
  translationOf?: string;
}

/**
 * Type guards
 */
export function isValidEssayType(value: unknown): value is EssayType {
  return (
    typeof value === 'string' &&
    ['guide', 'deep-dive', 'opinion', 'review', 'narrative'].includes(value)
  );
}

export function isValidTopic(value: unknown): value is Topic {
  return (
    typeof value === 'string' &&
    ['technical', 'ai', 'product', 'career'].includes(value)
  );
}

export function isValidLanguage(value: unknown): value is Language {
  return typeof value === 'string' && ['en', 'zh'].includes(value);
}

/**
 * Validates frontmatter and returns typed result
 */
export function validateFrontmatter(data: Record<string, unknown>): Frontmatter {
  const errors: string[] = [];

  // Required fields
  if (typeof data.title !== 'string' || !data.title) {
    errors.push('title is required and must be a string');
  }
  if (typeof data.description !== 'string' || !data.description) {
    errors.push('description is required and must be a string');
  }
  if (typeof data.date !== 'string' || !data.date) {
    errors.push('date is required and must be a string');
  }
  if (!isValidEssayType(data.type)) {
    errors.push(`type must be one of: guide, deep-dive, opinion, review, narrative`);
  }
  if (!Array.isArray(data.topics) || !data.topics.every(isValidTopic)) {
    errors.push(`topics must be an array of: technical, ai, product, career`);
  }

  // Optional fields validation
  if (data.lang !== undefined && !isValidLanguage(data.lang)) {
    errors.push(`lang must be one of: en, zh`);
  }
  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    errors.push('draft must be a boolean');
  }
  if (data.translationOf !== undefined && typeof data.translationOf !== 'string') {
    errors.push('translationOf must be a string');
  }

  if (errors.length > 0) {
    throw new Error(`Invalid frontmatter:\n${errors.join('\n')}`);
  }

  return {
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    type: data.type as EssayType,
    topics: data.topics as Topic[],
    lang: (data.lang as Language) ?? 'en',
    draft: data.draft as boolean | undefined,
    translationOf: data.translationOf as string | undefined,
  };
}
