import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAllEssays,
  getEssayBySlug,
  getEssaySlugs,
  getEssaysByType,
  getEssaysByTopic,
  getEssaysByLanguage,
  getRelatedEssays,
  getTranslation,
  getEssaySlugsByLanguage,
} from '@/lib/essays';
import type { EssayMeta } from '@/types/content';

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

  describe('getRelatedEssays', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'source.mdx',
        'shares-two-topics.mdx',
        'shares-one-topic.mdx',
        'unrelated.mdx',
        'other-language.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.existsSync).mockImplementation((p) => {
        const file = String(p);
        return [
          'source.mdx',
          'shares-two-topics.mdx',
          'shares-one-topic.mdx',
          'unrelated.mdx',
          'other-language.mdx',
        ].some((name) => file.endsWith(name));
      });

      vi.mocked(fs.readFileSync).mockImplementation((p) => {
        const file = String(p);
        if (file.includes('source.mdx')) {
          return `---
title: Source
description: Source
date: 2024-03-01
type: guide
topics: ['technical', 'ai']
lang: en
---
Content`;
        }
        if (file.includes('shares-two-topics.mdx')) {
          return `---
title: Shares Two
description: Two
date: 2024-01-01
type: guide
topics: ['technical', 'ai']
lang: en
---
Content`;
        }
        if (file.includes('shares-one-topic.mdx')) {
          return `---
title: Shares One
description: One
date: 2024-02-01
type: guide
topics: ['ai']
lang: en
---
Content`;
        }
        if (file.includes('unrelated.mdx')) {
          return `---
title: Unrelated
description: Unrelated
date: 2024-02-15
type: narrative
topics: ['career']
lang: en
---
Content`;
        }
        if (file.includes('other-language.mdx')) {
          return `---
title: Other Language
description: zh
date: 2024-02-20
type: guide
topics: ['technical', 'ai']
lang: zh
---
Content`;
        }
        const err = new Error(`ENOENT: no such file or directory, open '${file}'`);
        (err as NodeJS.ErrnoException).code = 'ENOENT';
        throw err;
      });
    });

    it('ranks by Jaccard similarity, type bonus, then recency', () => {
      const related = getRelatedEssays('source', { limit: 3 });
      // shares-two-topics: Jaccard 2/2=1.0, same type +0.15 → 1.15
      // shares-one-topic:  Jaccard 1/2=0.5,  same type +0.15 → 0.65
      // unrelated:         shared=0 → dropped (no recency fallback)
      expect(related.map((e) => e.slug)).toEqual([
        'shares-two-topics',
        'shares-one-topic',
      ]);
    });

    it('drops candidates with zero shared topics (no recency fallback)', () => {
      const related = getRelatedEssays('source', { limit: 5 });
      expect(related.map((e) => e.slug)).not.toContain('unrelated');
    });

    it('excludes the source essay itself', () => {
      const related = getRelatedEssays('source', { limit: 5 });
      expect(related.map((e) => e.slug)).not.toContain('source');
    });

    it('excludes other-language essays', () => {
      const related = getRelatedEssays('source', { limit: 5 });
      expect(related.map((e) => e.slug)).not.toContain('other-language');
    });

    it('respects the limit', () => {
      const related = getRelatedEssays('source', { limit: 1 });
      expect(related).toHaveLength(1);
      expect(related[0].slug).toBe('shares-two-topics');
    });

    it('returns empty when the source essay does not exist', () => {
      expect(getRelatedEssays('nonexistent')).toEqual([]);
    });
  });

  describe('getRelatedEssays — type-match tiebreaker', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'src.mdx',
        'same-topic-different-type.mdx',
        'same-topic-same-type.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);
      vi.mocked(fs.existsSync).mockImplementation((p) =>
        ['src.mdx', 'same-topic-different-type.mdx', 'same-topic-same-type.mdx'].some((n) =>
          String(p).endsWith(n),
        ),
      );
      vi.mocked(fs.readFileSync).mockImplementation((p) => {
        const file = String(p);
        if (file.includes('src.mdx')) {
          return `---
title: Source
description: Source
date: 2024-03-01
type: guide
topics: ['ai']
lang: en
---
Content`;
        }
        if (file.includes('same-topic-different-type.mdx')) {
          return `---
title: Different type
description: x
date: 2024-02-15
type: narrative
topics: ['ai']
lang: en
---
Content`;
        }
        // same-topic-same-type — older but same type
        return `---
title: Same type
description: y
date: 2024-01-01
type: guide
topics: ['ai']
lang: en
---
Content`;
      });
    });

    it('boosts same-type candidates above different-type ones with equal Jaccard', () => {
      const related = getRelatedEssays('src', { limit: 2 });
      expect(related.map((e) => e.slug)).toEqual([
        'same-topic-same-type', // older, but +0.15 type bonus puts it first
        'same-topic-different-type',
      ]);
    });
  });

  describe('getRelatedEssays — author-curated relatedTo', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'curator.mdx',
        'picked-1.mdx',
        'picked-2.mdx',
        'not-picked.mdx',
        'wrong-lang.mdx',
        'draft-pick.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);
      vi.mocked(fs.existsSync).mockImplementation((p) =>
        [
          'curator.mdx',
          'picked-1.mdx',
          'picked-2.mdx',
          'not-picked.mdx',
          'wrong-lang.mdx',
          'draft-pick.mdx',
        ].some((n) => String(p).endsWith(n)),
      );
      vi.mocked(fs.readFileSync).mockImplementation((p) => {
        const file = String(p);
        if (file.includes('curator.mdx')) {
          return `---
title: Curator
description: x
date: 2024-03-01
type: guide
topics: ['ai']
lang: en
relatedTo: ['picked-2', 'nonexistent', 'wrong-lang', 'draft-pick', 'picked-1']
---
Content`;
        }
        if (file.includes('picked-1.mdx')) {
          return `---
title: Picked 1
description: x
date: 2024-01-01
type: narrative
topics: ['career']
lang: en
---
Content`;
        }
        if (file.includes('picked-2.mdx')) {
          return `---
title: Picked 2
description: x
date: 2024-02-01
type: narrative
topics: ['career']
lang: en
---
Content`;
        }
        if (file.includes('not-picked.mdx')) {
          return `---
title: Not picked
description: x
date: 2024-02-15
type: guide
topics: ['ai']
lang: en
---
Content`;
        }
        if (file.includes('wrong-lang.mdx')) {
          return `---
title: ZH version
description: x
date: 2024-02-20
type: guide
topics: ['ai']
lang: zh
---
Content`;
        }
        // draft-pick
        return `---
title: Draft pick
description: x
date: 2024-02-25
type: guide
topics: ['ai']
lang: en
draft: true
---
Content`;
      });
    });

    it('uses the curated list in order, ignoring auto-rank', () => {
      const related = getRelatedEssays('curator', { limit: 5 });
      // Order respected: picked-2 first, then picked-1.
      // 'not-picked' is excluded even though it shares topics + type.
      expect(related.map((e) => e.slug)).toEqual(['picked-2', 'picked-1']);
    });

    it('silently drops cross-language, draft, and missing slugs from the curated list', () => {
      const related = getRelatedEssays('curator', { limit: 5 });
      const slugs = related.map((e) => e.slug);
      expect(slugs).not.toContain('wrong-lang');
      expect(slugs).not.toContain('draft-pick');
      expect(slugs).not.toContain('nonexistent');
    });

    it('caps curated output at limit', () => {
      const related = getRelatedEssays('curator', { limit: 1 });
      expect(related).toHaveLength(1);
      expect(related[0].slug).toBe('picked-2');
    });
  });

  describe('getEssaysByLanguage', () => {
    const mockEnglishEssay = `---
title: English Essay
description: An English essay
date: 2024-01-15
type: guide
topics: ['technical']
lang: en
---
Content`;

    const mockChineseEssay = `---
title: Chinese Essay
description: A Chinese essay
date: 2024-01-10
type: narrative
topics: ['career']
lang: zh
---
Content`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-essay.mdx',
        'chinese-essay.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english')) {
          return mockEnglishEssay;
        }
        return mockChineseEssay;
      });
    });

    it('filters essays by English language', () => {
      const essays = getEssaysByLanguage('en');
      expect(essays).toHaveLength(1);
      expect(essays[0].lang).toBe('en');
      expect(essays[0].title).toBe('English Essay');
    });

    it('filters essays by Chinese language', () => {
      const essays = getEssaysByLanguage('zh');
      expect(essays).toHaveLength(1);
      expect(essays[0].lang).toBe('zh');
      expect(essays[0].title).toBe('Chinese Essay');
    });
  });

  describe('getEssaySlugsByLanguage', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-essay.mdx',
        'chinese-essay.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english')) {
          return `---
title: English Essay
description: An English essay
date: 2024-01-15
type: guide
topics: ['technical']
lang: en
---
Content`;
        }
        return `---
title: Chinese Essay
description: A Chinese essay
date: 2024-01-10
type: narrative
topics: ['career']
lang: zh
---
Content`;
      });
    });

    it('returns slugs for English essays only', () => {
      const slugs = getEssaySlugsByLanguage('en');
      expect(slugs).toEqual(['english-essay']);
    });

    it('returns slugs for Chinese essays only', () => {
      const slugs = getEssaySlugsByLanguage('zh');
      expect(slugs).toEqual(['chinese-essay']);
    });
  });

  describe('getTranslation', () => {
    const mockEnglishEssay = `---
title: English Article
description: Original English
date: 2024-01-15
type: guide
topics: ['technical']
lang: en
---
Content`;

    const mockChineseTranslation = `---
title: Chinese Translation
description: Translation of the English article
date: 2024-01-10
type: guide
topics: ['technical']
lang: zh
translationOf: english-article
---
Content`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-article.mdx',
        'chinese-translation.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.existsSync).mockReturnValue(true);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english-article')) {
          return mockEnglishEssay;
        }
        return mockChineseTranslation;
      });
    });

    it('finds Chinese translation from English essay', () => {
      const translation = getTranslation('english-article', 'zh');
      expect(translation).not.toBeNull();
      expect(translation?.lang).toBe('zh');
      expect(translation?.title).toBe('Chinese Translation');
    });

    it('finds English essay from Chinese translation (via translationOf)', () => {
      const translation = getTranslation('chinese-translation', 'en');
      expect(translation).not.toBeNull();
      expect(translation?.lang).toBe('en');
      expect(translation?.title).toBe('English Article');
    });

    it('returns same essay if target lang matches current', () => {
      const essay = getTranslation('english-article', 'en');
      expect(essay).not.toBeNull();
      expect(essay?.slug).toBe('english-article');
    });

    it('returns null if no translation exists', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'standalone-essay.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockReturnValue(`---
title: Standalone Essay
description: No translation
date: 2024-01-15
type: guide
topics: ['technical']
lang: en
---
Content`);

      const translation = getTranslation('standalone-essay', 'zh');
      expect(translation).toBeNull();
    });

    it('returns null for non-existent essay', () => {
      // Reset mocks and set up for a non-existent file
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-article.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english-article')) {
          return mockEnglishEssay;
        }
        throw new Error('File not found');
      });

      const translation = getTranslation('non-existent', 'zh');
      expect(translation).toBeNull();
    });
  });
});
