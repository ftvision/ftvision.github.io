import remarkGfm from 'remark-gfm';

/**
 * Shared MDX options for next-mdx-remote/rsc
 *
 * Includes:
 * - remark-gfm: GitHub Flavored Markdown (tables, strikethrough, etc.)
 */
export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [],
};
