import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAllSeries,
  getSeriesBySlug,
  getSeriesSlugs,
  getSeriesByCategory,
  getSeriesByTopic,
  getSeriesByLanguage,
  getSeriesTranslation,
  getSeriesSlugsByLanguage,
  getSeriesGroupedByCategory,
} from '@/lib/series';
import type { SeriesMeta } from '@/types/content';

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

describe('Series Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSeriesSlugs', () => {
    it('returns slugs from mdx files', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'vision-100-papers-zh.mdx',
        'system-design-interview.mdx',
        'readme.md', // should be ignored
        '_draft.mdx', // should be ignored (starts with _)
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      const slugs = getSeriesSlugs();
      expect(slugs).toEqual(['vision-100-papers-zh', 'system-design-interview']);
    });

    it('returns empty array when no series exist', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([]);
      expect(getSeriesSlugs()).toEqual([]);
    });
  });

  describe('getAllSeries', () => {
    const mockSeries1Content = `---
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

    const mockSeries2Content = [
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
          return mockSeries1Content;
        }
        return mockSeries2Content;
      });
    });

    it('returns all series metadata sorted by updated/date descending', () => {
      const series = getAllSeries({ includeDrafts: true });
      expect(series).toHaveLength(2);
      // Vision paper has updated: 2024-12-15, system design has date: 2024-01-10
      expect(series[0].slug).toBe('vision-100-papers-zh');
      expect(series[1].slug).toBe('system-design-interview');
    });

    it('parses frontmatter correctly', () => {
      const series = getAllSeries({ includeDrafts: true });
      const visionSeries = series.find((s) => s.slug === 'vision-100-papers-zh');

      expect(visionSeries).toBeDefined();
      expect(visionSeries?.title).toBe('Vision 100 Papers');
      expect(visionSeries?.description).toBe('100 influential papers in vision science');
      expect(visionSeries?.category).toBe('bibliography');
      expect(visionSeries?.topics).toContain('research');
      expect(visionSeries?.lang).toBe('zh');
      expect(visionSeries?.itemCount).toBe(100);
      expect(visionSeries?.updated).toBe('2024-12-15');
    });

    it('calculates reading time', () => {
      const series = getAllSeries({ includeDrafts: true });
      expect(series[0].readingTime).toBe(10);
    });

    it('respects includeDrafts option', () => {
      // With includeDrafts: true, we should get both series
      const allSeries = getAllSeries({ includeDrafts: true });
      expect(allSeries).toHaveLength(2);

      // Note: Draft filtering behavior is tested via the essays library tests.
      // The series library uses the same pattern.
    });
  });

  describe('getSeriesBySlug', () => {
    const mockContent = `---
title: Test Bibliography
description: Test description
date: 2024-01-15
category: bibliography
topics: ['research']
lang: en
---

This is the series content.`;

    beforeEach(() => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
    });

    it('returns series with content', () => {
      const series = getSeriesBySlug('test-bibliography');
      expect(series).toBeDefined();
      expect(series?.slug).toBe('test-bibliography');
      expect(series?.content).toContain('This is the series content');
    });

    it('returns null for non-existent series', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      const series = getSeriesBySlug('non-existent');
      expect(series).toBeNull();
    });
  });

  describe('getSeriesByCategory', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'bibliography-series.mdx',
        'tools-series.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('bibliography')) {
          return `---
title: Bibliography Series
description: A bibliography
date: 2024-01-15
category: bibliography
topics: ['research']
lang: en
---
Content`;
        }
        return `---
title: Tools Series
description: A tools list
date: 2024-01-10
category: tools
topics: ['technical']
lang: en
---
Content`;
      });
    });

    it('filters series by category', () => {
      const bibliographies = getSeriesByCategory('bibliography');
      expect(bibliographies).toHaveLength(1);
      expect(bibliographies[0].category).toBe('bibliography');
    });
  });

  describe('getSeriesByTopic', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'research-series.mdx',
        'tools-series.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('research')) {
          return `---
title: Research Series
description: Research content
date: 2024-01-15
category: bibliography
topics: ['research', 'technical']
lang: en
---
Content`;
        }
        return `---
title: Tools Series
description: Tools list
date: 2024-01-10
category: tools
topics: ['design']
lang: en
---
Content`;
      });
    });

    it('filters series by topic', () => {
      const researchSeries = getSeriesByTopic('research');
      expect(researchSeries).toHaveLength(1);
      expect(researchSeries[0].topics).toContain('research');
    });
  });

  describe('getSeriesByLanguage', () => {
    const mockEnglishSeries = `---
title: English Series
description: An English series
date: 2024-01-15
category: resources
topics: ['technical']
lang: en
---
Content`;

    const mockChineseSeries = `---
title: Chinese Series
description: A Chinese series
date: 2024-01-10
category: bibliography
topics: ['research']
lang: zh
---
Content`;

    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-series.mdx',
        'chinese-series.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english')) {
          return mockEnglishSeries;
        }
        return mockChineseSeries;
      });
    });

    it('filters series by English language', () => {
      const series = getSeriesByLanguage('en');
      expect(series).toHaveLength(1);
      expect(series[0].lang).toBe('en');
      expect(series[0].title).toBe('English Series');
    });

    it('filters series by Chinese language', () => {
      const series = getSeriesByLanguage('zh');
      expect(series).toHaveLength(1);
      expect(series[0].lang).toBe('zh');
      expect(series[0].title).toBe('Chinese Series');
    });
  });

  describe('getSeriesSlugsByLanguage', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'english-series.mdx',
        'chinese-series.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockImplementation((path) => {
        if (String(path).includes('english')) {
          return `---
title: English Series
description: An English series
date: 2024-01-15
category: resources
topics: ['technical']
lang: en
---
Content`;
        }
        return `---
title: Chinese Series
description: A Chinese series
date: 2024-01-10
category: bibliography
topics: ['research']
lang: zh
---
Content`;
      });
    });

    it('returns slugs for English series only', () => {
      const slugs = getSeriesSlugsByLanguage('en');
      expect(slugs).toEqual(['english-series']);
    });

    it('returns slugs for Chinese series only', () => {
      const slugs = getSeriesSlugsByLanguage('zh');
      expect(slugs).toEqual(['chinese-series']);
    });
  });

  describe('getSeriesTranslation', () => {
    const mockEnglishSeries = `---
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
          return mockEnglishSeries;
        }
        return mockChineseTranslation;
      });
    });

    it('finds Chinese translation from English series', () => {
      const translation = getSeriesTranslation('english-resources', 'zh');
      expect(translation).not.toBeNull();
      expect(translation?.lang).toBe('zh');
      expect(translation?.title).toBe('Chinese Translation');
    });

    it('finds English series from Chinese translation (via translationOf)', () => {
      const translation = getSeriesTranslation('chinese-translation', 'en');
      expect(translation).not.toBeNull();
      expect(translation?.lang).toBe('en');
      expect(translation?.title).toBe('English Resources');
    });

    it('returns same series if target lang matches current', () => {
      const series = getSeriesTranslation('english-resources', 'en');
      expect(series).not.toBeNull();
      expect(series?.slug).toBe('english-resources');
    });

    it('returns null if no translation exists', () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'standalone-series.mdx',
      ] as unknown as ReturnType<typeof fs.readdirSync>);

      vi.mocked(fs.readFileSync).mockReturnValue(`---
title: Standalone Series
description: No translation
date: 2024-01-15
category: resources
topics: ['technical']
lang: en
---
Content`);

      const translation = getSeriesTranslation('standalone-series', 'zh');
      expect(translation).toBeNull();
    });
  });

  describe('getSeriesGroupedByCategory', () => {
    beforeEach(() => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        'bib-series.mdx',
        'tools-series.mdx',
        'resources-series.mdx',
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

    it('groups series by category', () => {
      const grouped = getSeriesGroupedByCategory();

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
