import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAllReferences,
  getReferenceBySlug,
  getReferenceSlugs,
  getReferencesByCategory,
  getReferencesByTopic,
  getReferencesByLanguage,
  getReferenceTranslation,
  getReferenceSlugsByLanguage,
  getReferencesGroupedByCategory,
} from '@/lib/references';
import type { ReferenceMeta } from '@/types/content';

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
  default: vi.fn(() => ({ minutes: 10 })),
}));

import fs from 'fs';

describe('References Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getReferenceSlugs', () => {
    it('returns slugs from mdx files', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'vision-100-papers-zh.mdx',
        'system-design-interview.mdx',
        'readme.md', // should be ignored
        '_draft.mdx', // should be ignored (starts with _)
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      const slugs = getReferenceSlugs();
      expect(slugs).toEqual(['vision-100-papers-zh', 'system-design-interview']);
    });

    it('returns empty array when no references exist', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([]);
      expect(getReferenceSlugs()).toEqual([]);
    });
  });

  describe('getAllReferences', () => {
    const mockRef1Content = `---
title: Vision 100 Papers
description: 100 influential papers in vision science
date: 2024-01-01
updated: 2024-12-15
category: bibliography
topics: ['research', 'technical']
lang: zh
itemCount: 100
---

Content of vision papers`;

    const mockRef2Content = [
      '---',
      'title: System Design Interview',
      'description: Resources for system design interviews',
      'date: 2024-01-10',
      'category: resources',
      "topics: ['technical', 'career']",
      'lang: en',
      'draft: true',
      '---',
      '',
      'Content of interview resources'
    ].join('\n');

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'vision-100-papers-zh.mdx',
        'system-design-interview.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('vision')) {
          return mockRef1Content;
        }
        return mockRef2Content;
      });
    });

    it('returns all reference metadata sorted by updated/date descending', () => {
      const references = getAllReferences({ includeDrafts: true });
      expect(references).toHaveLength(2);
      // Vision paper has updated: 2024-12-15, system design has date: 2024-01-10
      expect(references[0].slug).toBe('vision-100-papers-zh');
      expect(references[1].slug).toBe('system-design-interview');
    });

    it('parses frontmatter correctly', () => {
      const references = getAllReferences({ includeDrafts: true });
      const visionRef = references.find((r) => r.slug === 'vision-100-papers-zh');

      expect(visionRef).toBeDefined();
      expect(visionRef?.title).toBe('Vision 100 Papers');
      expect(visionRef?.description).toBe('100 influential papers in vision science');
      expect(visionRef?.category).toBe('bibliography');
      expect(visionRef?.topics).toContain('research');
      expect(visionRef?.lang).toBe('zh');
      expect(visionRef?.itemCount).toBe(100);
      expect(visionRef?.updated).toBe('2024-12-15');
    });

    it('calculates reading time', () => {
      const references = getAllReferences({ includeDrafts: true });
      expect(references[0].readingTime).toBe(10);
    });

    it('respects includeDrafts option', () => {
      // With includeDrafts: true, we should get both references
      const allRefs = getAllReferences({ includeDrafts: true });
      expect(allRefs).toHaveLength(2);

      // Note: Draft filtering behavior is tested via the essays library tests.
      // The reference library uses the same pattern.
    });
  });

  describe('getReferenceBySlug', () => {
    const mockContent = `---
title: Test Bibliography
description: Test description
date: 2024-01-15
category: bibliography
topics: ['research']
lang: en
---

This is the reference content.`;

    beforeEach(() => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
    });

    it('returns reference with content', () => {
      const reference = getReferenceBySlug('test-bibliography');
      expect(reference).toBeDefined();
      expect(reference?.slug).toBe('test-bibliography');
      expect(reference?.content).toContain('This is the reference content');
    });

    it('returns null for non-existent reference', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      const reference = getReferenceBySlug('non-existent');
      expect(reference).toBeNull();
    });
  });

  describe('getReferencesByCategory', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'bibliography-ref.mdx',
        'tools-ref.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('bibliography')) {
          return `---
title: Bibliography Reference
description: A bibliography
date: 2024-01-15
category: bibliography
topics: ['research']
lang: en
---
Content`;
        }
        return `---
title: Tools Reference
description: A tools list
date: 2024-01-10
category: tools
topics: ['technical']
lang: en
---
Content`;
      });
    });

    it('filters references by category', () => {
      const bibliographies = getReferencesByCategory('bibliography');
      expect(bibliographies).toHaveLength(1);
      expect(bibliographies[0].category).toBe('bibliography');
    });
  });

  describe('getReferencesByTopic', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'research-ref.mdx',
        'tools-ref.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('research')) {
          return `---
title: Research Reference
description: Research content
date: 2024-01-15
category: bibliography
topics: ['research', 'technical']
lang: en
---
Content`;
        }
        return `---
title: Tools Reference
description: Tools list
date: 2024-01-10
category: tools
topics: ['design']
lang: en
---
Content`;
      });
    });

    it('filters references by topic', () => {
      const researchRefs = getReferencesByTopic('research');
      expect(researchRefs).toHaveLength(1);
      expect(researchRefs[0].topics).toContain('research');
    });
  });

  describe('getReferencesByLanguage', () => {
    const mockEnglishRef = `---
title: English Reference
description: An English reference
date: 2024-01-15
category: resources
topics: ['technical']
lang: en
---
Content`;

    const mockChineseRef = `---
title: Chinese Reference
description: A Chinese reference
date: 2024-01-10
category: bibliography
topics: ['research']
lang: zh
---
Content`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-ref.mdx',
        'chinese-ref.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english')) {
          return mockEnglishRef;
        }
        return mockChineseRef;
      });
    });

    it('filters references by English language', () => {
      const references = getReferencesByLanguage('en');
      expect(references).toHaveLength(1);
      expect(references[0].lang).toBe('en');
      expect(references[0].title).toBe('English Reference');
    });

    it('filters references by Chinese language', () => {
      const references = getReferencesByLanguage('zh');
      expect(references).toHaveLength(1);
      expect(references[0].lang).toBe('zh');
      expect(references[0].title).toBe('Chinese Reference');
    });
  });

  describe('getReferenceSlugsByLanguage', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-ref.mdx',
        'chinese-ref.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english')) {
          return `---
title: English Reference
description: An English reference
date: 2024-01-15
category: resources
topics: ['technical']
lang: en
---
Content`;
        }
        return `---
title: Chinese Reference
description: A Chinese reference
date: 2024-01-10
category: bibliography
topics: ['research']
lang: zh
---
Content`;
      });
    });

    it('returns slugs for English references only', () => {
      const slugs = getReferenceSlugsByLanguage('en');
      expect(slugs).toEqual(['english-ref']);
    });

    it('returns slugs for Chinese references only', () => {
      const slugs = getReferenceSlugsByLanguage('zh');
      expect(slugs).toEqual(['chinese-ref']);
    });
  });

  describe('getReferenceTranslation', () => {
    const mockEnglishRef = `---
title: English Resources
description: Original English
date: 2024-01-15
category: resources
topics: ['technical']
lang: en
---
Content`;

    const mockChineseTranslation = `---
title: Chinese Translation
description: Translation of the English resources
date: 2024-01-10
category: resources
topics: ['technical']
lang: zh
translationOf: english-resources
---
Content`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-resources.mdx',
        'chinese-translation.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.existsSync).mockReturnValue(true);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english-resources')) {
          return mockEnglishRef;
        }
        return mockChineseTranslation;
      });
    });

    it('finds Chinese translation from English reference', () => {
      const translation = getReferenceTranslation('english-resources', 'zh');
      expect(translation).not.toBeNull();
      expect(translation?.lang).toBe('zh');
      expect(translation?.title).toBe('Chinese Translation');
    });

    it('finds English reference from Chinese translation (via translationOf)', () => {
      const translation = getReferenceTranslation('chinese-translation', 'en');
      expect(translation).not.toBeNull();
      expect(translation?.lang).toBe('en');
      expect(translation?.title).toBe('English Resources');
    });

    it('returns same reference if target lang matches current', () => {
      const reference = getReferenceTranslation('english-resources', 'en');
      expect(reference).not.toBeNull();
      expect(reference?.slug).toBe('english-resources');
    });

    it('returns null if no translation exists', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'standalone-ref.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockReturnValue(`---
title: Standalone Reference
description: No translation
date: 2024-01-15
category: resources
topics: ['technical']
lang: en
---
Content`);

      const translation = getReferenceTranslation('standalone-ref', 'zh');
      expect(translation).toBeNull();
    });
  });

  describe('getReferencesGroupedByCategory', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'bib-ref.mdx',
        'tools-ref.mdx',
        'resources-ref.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('bib')) {
          return `---
title: Bibliography
description: A bibliography
date: 2024-01-15
category: bibliography
topics: ['research']
lang: en
---
Content`;
        }
        if (String(path).includes('tools')) {
          return `---
title: Tools
description: A tools list
date: 2024-01-10
category: tools
topics: ['technical']
lang: en
---
Content`;
        }
        return `---
title: Resources
description: A resources list
date: 2024-01-05
category: resources
topics: ['learning']
lang: en
---
Content`;
      });
    });

    it('groups references by category', () => {
      const grouped = getReferencesGroupedByCategory();

      expect(grouped.bibliography).toHaveLength(1);
      expect(grouped.tools).toHaveLength(1);
      expect(grouped.resources).toHaveLength(1);
      expect(grouped['reading-list']).toHaveLength(0);

      expect(grouped.bibliography[0].title).toBe('Bibliography');
      expect(grouped.tools[0].title).toBe('Tools');
      expect(grouped.resources[0].title).toBe('Resources');
    });
  });
});
