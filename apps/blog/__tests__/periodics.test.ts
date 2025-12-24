import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAllPeriodics,
  getPeriodicBySlug,
  getPeriodicSlugs,
  getPeriodicsByType,
  getPeriodicsByTopic,
  getPeriodicsByLanguage,
  getPeriodicTranslation,
  getPeriodicSlugsByLanguage,
} from '@/lib/periodics';
import type { PeriodicMeta } from '@/types/content';

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
          } else if (/^\d+$/.test(value)) {
            data[key.trim()] = parseInt(value, 10);
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
  default: vi.fn(() => ({ minutes: 3 })),
}));

import fs from 'fs';

describe('Periodics Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPeriodicSlugs', () => {
    it('returns slugs from mdx files', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'digest-001-zh.mdx',
        'digest-002-zh.mdx',
        'readme.md', // should be ignored
        '_draft.mdx', // should be ignored (starts with _)
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      const slugs = getPeriodicSlugs();
      expect(slugs).toEqual(['digest-001-zh', 'digest-002-zh']);
    });

    it('returns empty array when no periodics exist', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([]);
      expect(getPeriodicSlugs()).toEqual([]);
    });
  });

  describe('getAllPeriodics', () => {
    const mockDigest1Content = `---
title: Digest #001
description: First digest
date: 2024-01-15
issue: 1
type: digest
topics: ['technical', 'ai']
lang: zh
---

Content of first digest`;

    const mockDigest2Content = `---
title: Digest #002
description: Second digest
date: 2024-01-22
issue: 2
type: digest
topics: ['career']
lang: zh
draft: true
---

Content of second digest`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'digest-001-zh.mdx',
        'digest-002-zh.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('digest-001')) {
          return mockDigest1Content;
        }
        return mockDigest2Content;
      });
    });

    it('returns all periodic metadata sorted by date descending then issue descending', () => {
      const periodics = getAllPeriodics({ includeDrafts: true });
      expect(periodics).toHaveLength(2);
      // Should be sorted newest first (issue 2 is newer date)
      expect(periodics[0].slug).toBe('digest-002-zh');
      expect(periodics[1].slug).toBe('digest-001-zh');
    });

    it('parses frontmatter correctly', () => {
      const periodics = getAllPeriodics({ includeDrafts: true });
      const firstDigest = periodics.find((p) => p.slug === 'digest-001-zh');

      expect(firstDigest).toBeDefined();
      expect(firstDigest?.title).toBe('Digest #001');
      expect(firstDigest?.description).toBe('First digest');
      expect(firstDigest?.issue).toBe(1);
      expect(firstDigest?.type).toBe('digest');
      expect(firstDigest?.topics).toContain('technical');
      expect(firstDigest?.lang).toBe('zh');
    });

    it('calculates reading time', () => {
      const periodics = getAllPeriodics({ includeDrafts: true });
      expect(periodics[0].readingTime).toBe(3);
    });

    it('excludes drafts when includeDrafts is false', () => {
      const periodics = getAllPeriodics({ includeDrafts: false });
      const hasDraft = periodics.some((p) => p.draft === true);
      expect(hasDraft).toBe(false);
    });

    it('includes drafts when includeDrafts is true', () => {
      const periodics = getAllPeriodics({ includeDrafts: true });
      const hasDraft = periodics.some((p) => p.draft === true);
      expect(hasDraft).toBe(true);
    });
  });

  describe('getPeriodicBySlug', () => {
    const mockContent = `---
title: Test Digest
description: Test description
date: 2024-01-15
issue: 1
type: digest
topics: ['technical']
lang: zh
---

This is the digest content.`;

    beforeEach(() => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
    });

    it('returns periodic with content', () => {
      const periodic = getPeriodicBySlug('test-digest');
      expect(periodic).toBeDefined();
      expect(periodic?.slug).toBe('test-digest');
      expect(periodic?.content).toContain('This is the digest content');
    });

    it('returns null for non-existent periodic', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      const periodic = getPeriodicBySlug('non-existent');
      expect(periodic).toBeNull();
    });
  });

  describe('getPeriodicsByType', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'digest-001.mdx',
        'changelog-001.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('digest')) {
          return `---
title: Digest Issue
description: A digest
date: 2024-01-15
issue: 1
type: digest
topics: ['technical']
lang: zh
---
Content`;
        }
        return `---
title: Changelog Issue
description: A changelog
date: 2024-01-10
issue: 1
type: changelog
topics: ['technical']
lang: en
---
Content`;
      });
    });

    it('filters periodics by type', () => {
      const digests = getPeriodicsByType('digest');
      expect(digests).toHaveLength(1);
      expect(digests[0].type).toBe('digest');
    });
  });

  describe('getPeriodicsByTopic', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'tech-digest.mdx',
        'career-notes.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('tech')) {
          return `---
title: Tech Digest
description: Technical content
date: 2024-01-15
issue: 1
type: digest
topics: ['technical', 'ai']
lang: zh
---
Content`;
        }
        return `---
title: Career Notes
description: Career advice
date: 2024-01-10
issue: 1
type: notes
topics: ['career']
lang: en
---
Content`;
      });
    });

    it('filters periodics by topic', () => {
      const techPeriodics = getPeriodicsByTopic('technical');
      expect(techPeriodics).toHaveLength(1);
      expect(techPeriodics[0].topics).toContain('technical');
    });
  });

  describe('getPeriodicsByLanguage', () => {
    const mockEnglishPeriodic = `---
title: English Changelog
description: An English changelog
date: 2024-01-15
issue: 1
type: changelog
topics: ['technical']
lang: en
---
Content`;

    const mockChinesePeriodic = `---
title: Chinese Digest
description: A Chinese digest
date: 2024-01-10
issue: 1
type: digest
topics: ['career']
lang: zh
---
Content`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-changelog.mdx',
        'chinese-digest.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english')) {
          return mockEnglishPeriodic;
        }
        return mockChinesePeriodic;
      });
    });

    it('filters periodics by English language', () => {
      const periodics = getPeriodicsByLanguage('en');
      expect(periodics).toHaveLength(1);
      expect(periodics[0].lang).toBe('en');
      expect(periodics[0].title).toBe('English Changelog');
    });

    it('filters periodics by Chinese language', () => {
      const periodics = getPeriodicsByLanguage('zh');
      expect(periodics).toHaveLength(1);
      expect(periodics[0].lang).toBe('zh');
      expect(periodics[0].title).toBe('Chinese Digest');
    });
  });

  describe('getPeriodicSlugsByLanguage', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-changelog.mdx',
        'chinese-digest.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english')) {
          return `---
title: English Changelog
description: An English changelog
date: 2024-01-15
issue: 1
type: changelog
topics: ['technical']
lang: en
---
Content`;
        }
        return `---
title: Chinese Digest
description: A Chinese digest
date: 2024-01-10
issue: 1
type: digest
topics: ['career']
lang: zh
---
Content`;
      });
    });

    it('returns slugs for English periodics only', () => {
      const slugs = getPeriodicSlugsByLanguage('en');
      expect(slugs).toEqual(['english-changelog']);
    });

    it('returns slugs for Chinese periodics only', () => {
      const slugs = getPeriodicSlugsByLanguage('zh');
      expect(slugs).toEqual(['chinese-digest']);
    });
  });

  describe('getPeriodicTranslation', () => {
    const mockEnglishPeriodic = `---
title: English Digest
description: Original English
date: 2024-01-15
issue: 1
type: digest
topics: ['technical']
lang: en
---
Content`;

    const mockChineseTranslation = `---
title: Chinese Translation
description: Translation of the English digest
date: 2024-01-10
issue: 1
type: digest
topics: ['technical']
lang: zh
translationOf: english-digest
---
Content`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-digest.mdx',
        'chinese-translation.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.existsSync).mockReturnValue(true);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english-digest')) {
          return mockEnglishPeriodic;
        }
        return mockChineseTranslation;
      });
    });

    it('finds Chinese translation from English periodic', () => {
      const translation = getPeriodicTranslation('english-digest', 'zh');
      expect(translation).not.toBeNull();
      expect(translation?.lang).toBe('zh');
      expect(translation?.title).toBe('Chinese Translation');
    });

    it('finds English periodic from Chinese translation (via translationOf)', () => {
      const translation = getPeriodicTranslation('chinese-translation', 'en');
      expect(translation).not.toBeNull();
      expect(translation?.lang).toBe('en');
      expect(translation?.title).toBe('English Digest');
    });

    it('returns same periodic if target lang matches current', () => {
      const periodic = getPeriodicTranslation('english-digest', 'en');
      expect(periodic).not.toBeNull();
      expect(periodic?.slug).toBe('english-digest');
    });

    it('returns null if no translation exists', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'standalone-digest.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockReturnValue(`---
title: Standalone Digest
description: No translation
date: 2024-01-15
issue: 1
type: digest
topics: ['technical']
lang: en
---
Content`);

      const translation = getPeriodicTranslation('standalone-digest', 'zh');
      expect(translation).toBeNull();
    });
  });
});
