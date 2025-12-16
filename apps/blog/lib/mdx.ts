/**
 * MDX compilation utilities
 *
 * Provides helpers for compiling and rendering MDX content.
 */

import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { ComponentType } from 'react';

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
 * Extract headings from MDX content for table of contents
 */
export function extractHeadings(
  content: string
): Array<{ level: number; text: string; id: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Generate slug-like ID
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ level, text, id });
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
