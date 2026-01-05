/**
 * MDX compilation utilities
 *
 * Provides helpers for compiling and rendering MDX content.
 */

import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { ComponentType } from 'react';
import GithubSlugger from 'github-slugger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RemarkRehypePlugin = [any, any?] | any;

/**
 * Type for scope variables passed to MDX
 */
export type MDXScope = Record<string, unknown>;

/**
 * Type for compiled MDX result
 */
export type CompiledMDX = MDXRemoteSerializeResult<MDXScope>;

/**
 * Options for MDX compilation
 */
export interface CompileMDXOptions {
  /** Variables to make available in MDX scope */
  scope?: MDXScope;
  /** Additional remark plugins */
  remarkPlugins?: RemarkRehypePlugin[];
  /** Additional rehype plugins */
  rehypePlugins?: RemarkRehypePlugin[];
}

/**
 * Type for MDX component mapping
 */
export type MDXComponents = Record<string, ComponentType<Record<string, unknown>>>;

/**
 * Compile MDX content to serialized format for next-mdx-remote
 */
export async function compileMDX(
  content: string,
  options: CompileMDXOptions = {}
): Promise<CompiledMDX> {
  const { scope = {}, remarkPlugins = [], rehypePlugins = [] } = options;

  const result = await serialize(content, {
    scope,
    mdxOptions: {
      remarkPlugins,
      rehypePlugins,
      development: process.env.NODE_ENV === 'development',
    },
  });

  return result;
}

/**
 * Default MDX component overrides
 *
 * Maps HTML elements to custom React components for consistent styling.
 * These components should come from @blog/ui where possible.
 */
const defaultComponents: MDXComponents = {
  // Typography elements will be mapped to @blog/ui components in the actual app
  // For now, we provide the structure
};

/**
 * Get MDX component mapping with optional overrides
 *
 * @param overrides - Custom components to add or override defaults
 * @returns Combined component mapping
 */
export function getMDXComponents(
  overrides: MDXComponents = {}
): MDXComponents {
  return {
    ...defaultComponents,
    ...overrides,
  };
}

/**
 * Table of contents item (matches EssayLayout.TocItem)
 */
export interface TocItem {
  /** Unique identifier (the heading slug) */
  id: string;
  /** Display text for the ToC entry */
  title: string;
  /** Heading level (2 = h2, 3 = h3, etc.) */
  level: number;
}

/**
 * Options for extracting headings
 */
export interface ExtractHeadingsOptions {
  /** Minimum heading level to include (default: 2) */
  minLevel?: number;
  /** Maximum heading level to include (default: 3) */
  maxLevel?: number;
}

/**
 * Generate a slug from heading text
 *
 * Uses github-slugger to match the behavior of rehype-slug for consistent IDs.
 * Each call to extractHeadings creates a new slugger instance to ensure
 * consistent slug generation within a single document.
 */
export function generateHeadingSlug(text: string, slugger: GithubSlugger): string {
  return slugger.slug(text);
}

/**
 * Extract headings from MDX content for table of contents
 *
 * @param content - Raw MDX content string
 * @param options - Filtering options for heading levels
 * @returns Array of TocItem for use with EssayLayout
 */
export function extractHeadings(
  content: string,
  options: ExtractHeadingsOptions = {}
): TocItem[] {
  const { minLevel = 2, maxLevel = 3 } = options;
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  // Create a new slugger instance for each document to match rehype-slug behavior
  const slugger = new GithubSlugger();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;

    // Filter by level range
    if (level < minLevel || level > maxLevel) {
      continue;
    }

    const title = match[2].trim();
    const id = generateHeadingSlug(title, slugger);

    headings.push({ id, title, level });
  }

  return headings;
}

/**
 * Strip frontmatter from MDX content
 *
 * Useful when content has already been parsed by gray-matter
 * but you need the raw content without frontmatter.
 */
export function stripFrontmatter(content: string): string {
  const frontmatterRegex = /^---\n[\s\S]*?\n---\n/;
  return content.replace(frontmatterRegex, '').trim();
}
