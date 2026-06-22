import type { MetadataRoute } from 'next';
import { canonicalUrl } from '@/lib/constants';
import { getAllEssays } from '@/lib/essays';
import { getAllPeriodics } from '@/lib/periodics';
import { getAllSeries } from '@/lib/series';

type Lang = 'en' | 'zh';

interface ContentEntry {
  slug: string;
  date: string;
  updated?: string;
  lang: Lang;
}

function url(path: string): string {
  return canonicalUrl(path);
}

function buildAlternates(
  enPath: string,
  zhPath: string,
): Record<string, string> {
  return {
    en: url(enPath),
    zh: url(zhPath),
    'x-default': url(enPath),
  };
}

function lastModified(entry: ContentEntry): Date {
  return new Date(entry.updated ?? entry.date);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '/', zhPath: '/zh', priority: 1.0 },
    { path: '/essays', zhPath: '/zh/essays', priority: 0.9 },
    { path: '/series', zhPath: '/zh/series', priority: 0.8 },
    { path: '/periodics', zhPath: '/zh/periodics', priority: 0.7 },
    { path: '/about', zhPath: '/zh/about', priority: 0.6 },
  ].flatMap(({ path, zhPath, priority }) => {
    const alternates = { languages: buildAlternates(path, zhPath) };
    return [
      {
        url: url(path),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority,
        alternates,
      },
      {
        url: url(zhPath),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority,
        alternates,
      },
    ];
  });

  const essays = getAllEssays() as ContentEntry[];
  const essayRoutes: MetadataRoute.Sitemap = essays.map((essay) => {
    const path =
      essay.lang === 'zh' ? `/zh/essays/${essay.slug}` : `/essays/${essay.slug}`;
    return {
      url: url(path),
      lastModified: lastModified(essay),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  const periodics = getAllPeriodics() as ContentEntry[];
  const periodicRoutes: MetadataRoute.Sitemap = periodics.map((periodic) => {
    const path =
      periodic.lang === 'zh'
        ? `/zh/periodics/${periodic.slug}`
        : `/periodics/${periodic.slug}`;
    return {
      url: url(path),
      lastModified: lastModified(periodic),
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  const series = getAllSeries() as ContentEntry[];
  const seriesRoutes: MetadataRoute.Sitemap = series.map((item) => {
    const path =
      item.lang === 'zh' ? `/zh/series/${item.slug}` : `/series/${item.slug}`;
    return {
      url: url(path),
      lastModified: lastModified(item),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...essayRoutes, ...periodicRoutes, ...seriesRoutes];
}
