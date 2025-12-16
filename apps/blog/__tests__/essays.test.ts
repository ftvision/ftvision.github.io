import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAllEssays,
  getEssayBySlug,
  getEssaySlugs,
  getEssaysByType,
  getEssaysByTopic,
} from '../lib/essays';
import type { EssayMeta } from '../types/content';

// Mock the fs module
vi.mock('fs', async (importOriginal) => {
  const original = await importOriginal<typeof import('fs')>();
  return {
    ...original,
    default: {
      readdirSync: vi.fn(),
      readFileSync: vi.fn(),
      existsSync: vi.fn(),
    },
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  };
});

// Mock gray-matter
vi.mock('gray-matter', () => ({
  default: vi.fn((content: string) => {
    // Simple mock that extracts frontmatter between ---
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (match) {
      const frontmatterLines = match[1].split('\n');
      const data: Record<string, unknown> = {};
      frontmatterLines.forEach((line) => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          let value = valueParts.join(':').trim();
          // Handle arrays
          if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1);
            data[key.trim()] = value.split(',').map((v) => v.trim().replace(/'/g, ''));
          } else if (value === 'true') {
            data[key.trim()] = true;
          } else if (value === 'false') {
            data[key.trim()] = false;
          } else {
            data[key.trim()] = value.replace(/'/g, '').replace(/"/g, '');
          }
        }
      });
      return { data, content: match[2] };
    }
    return { data: {}, content };
  }),
}));

// Mock reading-time
vi.mock('reading-time', () => ({
  default: vi.fn(() => ({ minutes: 5 })),
}));

import fs from 'fs';

describe('Essays Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEssaySlugs', () => {
    it('returns slugs from mdx files', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'my-first-essay.mdx',
        'another-essay.mdx',
        'readme.md', // should be ignored
        '_draft.mdx', // should be ignored (starts with _)
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      const slugs = getEssaySlugs();
      expect(slugs).toEqual(['my-first-essay', 'another-essay']);
    });

    it('returns empty array when no essays exist', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([]);
      expect(getEssaySlugs()).toEqual([]);
    });
  });

  describe('getAllEssays', () => {
    const mockEssay1Content = `---
title: First Essay
description: Description of first essay
date: 2024-01-15
type: guide
topics: ['technical', 'ai']
lang: en
---

Content of first essay`;

    const mockEssay2Content = `---
title: Second Essay
description: Description of second essay
date: 2024-01-10
type: deep-dive
topics: ['career']
lang: zh
draft: true
---

Content of second essay`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'first-essay.mdx',
        'second-essay.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('first-essay')) {
          return mockEssay1Content;
        }
        return mockEssay2Content;
      });
    });

    it('returns all essay metadata sorted by date descending', () => {
      // Use includeDrafts: true to get all essays including drafts
      const essays = getAllEssays({ includeDrafts: true });
      expect(essays).toHaveLength(2);
      // Should be sorted newest first
      expect(essays[0].slug).toBe('first-essay');
      expect(essays[1].slug).toBe('second-essay');
    });

    it('parses frontmatter correctly', () => {
      const essays = getAllEssays();
      const firstEssay = essays.find((e) => e.slug === 'first-essay');

      expect(firstEssay).toBeDefined();
      expect(firstEssay?.title).toBe('First Essay');
      expect(firstEssay?.description).toBe('Description of first essay');
      expect(firstEssay?.type).toBe('guide');
      expect(firstEssay?.topics).toContain('technical');
      expect(firstEssay?.lang).toBe('en');
    });

    it('calculates reading time', () => {
      const essays = getAllEssays();
      expect(essays[0].readingTime).toBe(5);
    });

    it('excludes drafts when includeDrafts is false', () => {
      const essays = getAllEssays({ includeDrafts: false });
      const hasDraft = essays.some((e) => e.draft === true);
      expect(hasDraft).toBe(false);
    });

    it('includes drafts when includeDrafts is true', () => {
      const essays = getAllEssays({ includeDrafts: true });
      const hasDraft = essays.some((e) => e.draft === true);
      expect(hasDraft).toBe(true);
    });
  });

  describe('getEssayBySlug', () => {
    const mockContent = `---
title: Test Essay
description: Test description
date: 2024-01-15
type: guide
topics: ['technical']
---

This is the essay content.`;

    beforeEach(() => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
    });

    it('returns essay with content', () => {
      const essay = getEssayBySlug('test-essay');
      expect(essay).toBeDefined();
      expect(essay?.slug).toBe('test-essay');
      expect(essay?.content).toContain('This is the essay content');
    });

    it('returns null for non-existent essay', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      const essay = getEssayBySlug('non-existent');
      expect(essay).toBeNull();
    });
  });

  describe('getEssaysByType', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'guide-essay.mdx',
        'opinion-essay.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('guide')) {
          return `---
title: Guide Essay
description: A guide
date: 2024-01-15
type: guide
topics: ['technical']
---
Content`;
        }
        return `---
title: Opinion Essay
description: An opinion
date: 2024-01-10
type: opinion
topics: ['career']
---
Content`;
      });
    });

    it('filters essays by type', () => {
      const guides = getEssaysByType('guide');
      expect(guides).toHaveLength(1);
      expect(guides[0].type).toBe('guide');
    });
  });

  describe('getEssaysByTopic', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'tech-essay.mdx',
        'career-essay.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('tech')) {
          return `---
title: Tech Essay
description: Technical content
date: 2024-01-15
type: guide
topics: ['technical', 'ai']
---
Content`;
        }
        return `---
title: Career Essay
description: Career advice
date: 2024-01-10
type: narrative
topics: ['career']
---
Content`;
      });
    });

    it('filters essays by topic', () => {
      const techEssays = getEssaysByTopic('technical');
      expect(techEssays).toHaveLength(1);
      expect(techEssays[0].topics).toContain('technical');
    });

    it('returns essays with multiple matching topics', () => {
      const aiEssays = getEssaysByTopic('ai');
      expect(aiEssays).toHaveLength(1);
      expect(aiEssays[0].topics).toContain('ai');
    });
  });
});
