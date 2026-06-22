/**
 * Atom feed builder.
 *
 * Atom is preferred over RSS 2.0 here for its stricter schema, native
 * `updated` semantics, and explicit `<author>` and `<id>` requirements
 * — all useful for AI engines that consume feeds.
 */

import { SITE_URL, SITE_AUTHOR, canonicalPath, canonicalUrl } from './constants';
import { getAllEssays } from './essays';
import { getAllPeriodics } from './periodics';
import type { Language } from '@/types/content';

interface FeedEntry {
  title: string;
  description?: string;
  url: string;
  date: string;
  updated?: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function isoDate(value: string): string {
  return new Date(value).toISOString();
}

function entriesFor(locale: Language): FeedEntry[] {
  const essays = getAllEssays({ language: locale }).map((essay) => ({
    title: essay.title,
    description: essay.description,
    url:
      locale === 'zh'
        ? canonicalPath(`/zh/essays/${essay.slug}`)
        : canonicalPath(`/essays/${essay.slug}`),
    date: essay.date,
  }));
  const periodics = getAllPeriodics({ language: locale }).map((periodic) => ({
    title: periodic.title,
    description: periodic.description,
    url:
      locale === 'zh'
        ? canonicalPath(`/zh/periodics/${periodic.slug}`)
        : canonicalPath(`/periodics/${periodic.slug}`),
    date: periodic.date,
  }));
  return [...essays, ...periodics]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20);
}

export function buildAtomFeed(locale: Language): string {
  const feedPath = locale === 'zh' ? '/zh/feed.xml' : '/feed.xml';
  const homePath = locale === 'zh' ? canonicalPath('/zh') : '/';
  const feedUrl = `${SITE_URL}${feedPath}`;
  const homeUrl = `${SITE_URL}${homePath}`;
  const title = locale === 'zh' ? '思算 — 随笔' : 'Algo Mind — Essays';
  const subtitle =
    locale === 'zh'
      ? '思算 — Feitong Yang 关于“智能即算法”的随笔：AI agent、软件工程、产品，以及心智如何运作。'
      : 'Essays by Feitong Yang on intelligence as computation: AI agents, software engineering, product, and how minds work.';

  const entries = entriesFor(locale);
  const updated = entries[0]?.date
    ? isoDate(entries[0].date)
    : new Date().toISOString();

  const entryXml = entries
    .map((entry) => {
      const entryUrl = canonicalUrl(entry.url);
      return `  <entry>
    <id>${entryUrl}</id>
    <title>${escapeXml(entry.title)}</title>
    <link rel="alternate" href="${entryUrl}"/>
    <published>${isoDate(entry.date)}</published>
    <updated>${isoDate(entry.updated ?? entry.date)}</updated>${
      entry.description
        ? `\n    <summary>${escapeXml(entry.description)}</summary>`
        : ''
    }
    <author><name>${escapeXml(SITE_AUTHOR.name)}</name></author>
  </entry>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale === 'zh' ? 'zh-CN' : 'en-US'}">
  <id>${feedUrl}</id>
  <title>${escapeXml(title)}</title>
  <subtitle>${escapeXml(subtitle)}</subtitle>
  <link rel="self" href="${feedUrl}"/>
  <link rel="alternate" href="${homeUrl}"/>
  <updated>${updated}</updated>
  <author><name>${escapeXml(SITE_AUTHOR.name)}</name></author>
${entryXml}
</feed>
`;
}
