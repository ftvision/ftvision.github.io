import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

/**
 * Shared MDX options for next-mdx-remote/rsc
 *
 * Includes:
 * - remark-gfm: GitHub Flavored Markdown (tables, strikethrough, etc.)
 * - rehype-slug: Adds id attributes to headings (for ToC linking)
 */
export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
};
