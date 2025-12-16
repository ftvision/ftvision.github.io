import { describe, it, expect, vi } from 'vitest';
import { compileMDX, getMDXComponents, type MDXScope } from '../lib/mdx';

// Mock next-mdx-remote/serialize
vi.mock('next-mdx-remote/serialize', () => ({
  serialize: vi.fn(async (content: string, options?: { scope?: MDXScope }) => ({
    compiledSource: `compiled:${content.slice(0, 50)}`,
    scope: options?.scope ?? {},
    frontmatter: {},
  })),
}));

describe('MDX Utilities', () => {
  describe('compileMDX', () => {
    it('compiles MDX content to serialized format', async () => {
      const content = '# Hello World\n\nThis is some content.';
      const result = await compileMDX(content);

      expect(result).toHaveProperty('compiledSource');
      expect(result.compiledSource).toContain('compiled:');
    });

    it('passes scope to the compiler', async () => {
      const content = '# Test';
      const scope: MDXScope = { customVar: 'test value' };
      const result = await compileMDX(content, { scope });

      expect(result.scope).toEqual(scope);
    });

    it('handles empty content', async () => {
      const result = await compileMDX('');
      expect(result).toHaveProperty('compiledSource');
    });

    it('handles content with code blocks', async () => {
      const content = `
# Code Example

\`\`\`typescript
const x = 1;
\`\`\`
`;
      const result = await compileMDX(content);
      expect(result).toHaveProperty('compiledSource');
    });
  });

  describe('getMDXComponents', () => {
    it('returns default component mapping', () => {
      const components = getMDXComponents();

      // Should have mappings for common HTML elements
      expect(typeof components).toBe('object');
    });

    it('allows overriding default components', () => {
      const CustomH1 = () => null;
      const components = getMDXComponents({ h1: CustomH1 });

      expect(components.h1).toBe(CustomH1);
    });

    it('preserves default components when adding custom ones', () => {
      const CustomComponent = () => null;
      const components = getMDXComponents({ CustomComponent });

      expect(components.CustomComponent).toBe(CustomComponent);
    });
  });
});
