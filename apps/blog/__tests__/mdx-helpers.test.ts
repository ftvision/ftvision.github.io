import { describe, it, expect } from 'vitest';
import { extractHeadings, stripFrontmatter } from '@/lib/mdx';

describe('MDX Helper Functions', () => {
  describe('extractHeadings', () => {
    it('extracts h2 and h3 headings by default', () => {
      const content = `
# Heading 1
Some text
## Heading 2
More text
### Heading 3
`;
      const headings = extractHeadings(content);

      // Default filters to h2-h3 only (excludes h1)
      expect(headings).toHaveLength(2);
      expect(headings[0]).toEqual({ level: 2, title: 'Heading 2', id: 'heading-2' });
      expect(headings[1]).toEqual({ level: 3, title: 'Heading 3', id: 'heading-3' });
    });

    it('respects minLevel and maxLevel options', () => {
      const content = `
# H1
## H2
### H3
#### H4
`;
      // Include all levels
      const allHeadings = extractHeadings(content, { minLevel: 1, maxLevel: 6 });
      expect(allHeadings).toHaveLength(4);
      expect(allHeadings.map((h) => h.level)).toEqual([1, 2, 3, 4]);

      // Only h2
      const h2Only = extractHeadings(content, { minLevel: 2, maxLevel: 2 });
      expect(h2Only).toHaveLength(1);
      expect(h2Only[0].level).toBe(2);
    });

    it('handles special characters in headings', () => {
      const content = `## What's New in 2024?`;
      const headings = extractHeadings(content);

      expect(headings[0].title).toBe("What's New in 2024?");
      expect(headings[0].id).toBe('whats-new-in-2024');
    });

    it('returns empty array for content without headings', () => {
      const content = 'Just some paragraph text without headings.';
      const headings = extractHeadings(content);

      expect(headings).toEqual([]);
    });

    it('handles all heading levels when configured', () => {
      const content = `
# H1
## H2
### H3
#### H4
##### H5
###### H6
`;
      const headings = extractHeadings(content, { minLevel: 1, maxLevel: 6 });

      expect(headings).toHaveLength(6);
      expect(headings.map((h) => h.level)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('stripFrontmatter', () => {
    it('removes frontmatter from content', () => {
      const content = `---
title: Test
date: 2024-01-01
---

# Content Here

Some text.`;

      const result = stripFrontmatter(content);

      expect(result).not.toContain('---');
      expect(result).not.toContain('title: Test');
      expect(result).toContain('# Content Here');
      expect(result).toContain('Some text.');
    });

    it('returns original content if no frontmatter', () => {
      const content = '# Just Content\n\nNo frontmatter here.';
      const result = stripFrontmatter(content);

      expect(result).toBe(content);
    });

    it('handles empty content', () => {
      const result = stripFrontmatter('');
      expect(result).toBe('');
    });

    it('handles frontmatter-only content', () => {
      const content = `---
title: Test
---
`;
      const result = stripFrontmatter(content);
      expect(result).toBe('');
    });
  });
});
