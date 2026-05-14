/**
 * Schema.org JSON-LD helpers.
 *
 * Output is consumed by Google's Rich Results Test, AI answer engines
 * (Perplexity, AI Overviews, ChatGPT Search), and search-engine knowledge
 * graphs. The shapes here intentionally stay close to schema.org defaults
 * so future fields can be added without rewriting consumers.
 */

import { SITE_URL, SITE_AUTHOR } from './constants';
import type { EssayMeta, PeriodicMeta, SeriesMeta, Language } from '@/types/content';

type Locale = Language;

const PERSON_ID = `${SITE_URL}/#person`;
const PUBLISHER_ID = `${SITE_URL}/#publisher`;
const WEBSITE_ID_EN = `${SITE_URL}/#website`;
const WEBSITE_ID_ZH = `${SITE_URL}/zh/#website`;

const SAME_AS = [
  'https://www.linkedin.com/in/feitong-yang-88088a55/',
  'http://scholar.google.com/citations?user=94Xx9u0AAAAJ',
  'http://neurotree.org/neurotree/tree.php?pid=65050',
];

function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_AUTHOR.name,
    url: SITE_AUTHOR.url,
    jobTitle: 'Founding Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Fundamental Research Labs',
      url: 'https://fairies.ai/',
    },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Johns Hopkins University' },
    ],
    sameAs: SAME_AS,
  };
}

export function publisherSchema(locale: Locale) {
  return {
    '@type': 'Organization',
    '@id': PUBLISHER_ID,
    name: locale === 'zh' ? '思算' : 'Algo Mind',
    url: SITE_URL,
    founder: { '@id': PERSON_ID },
  };
}

export function websiteSchema(locale: Locale) {
  const id = locale === 'zh' ? WEBSITE_ID_ZH : WEBSITE_ID_EN;
  const url = locale === 'zh' ? `${SITE_URL}/zh` : SITE_URL;
  return {
    '@type': 'WebSite',
    '@id': id,
    url,
    name: locale === 'zh' ? '思算' : 'Algo Mind',
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    publisher: { '@id': PUBLISHER_ID },
    author: { '@id': PERSON_ID },
  };
}

/**
 * `@graph` envelope. Lets us emit several connected nodes in one script
 * block with `@id` references between them — the schema.org idiom for
 * "these things are the same entity across multiple types".
 */
export function siteGraph(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema(), publisherSchema(locale), websiteSchema(locale)],
  };
}

interface BlogPostingArgs {
  title: string;
  description?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  topics?: string[];
  image?: string;
  locale: Locale;
}

export function blogPostingSchema(args: BlogPostingArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: args.title,
    description: args.description || undefined,
    url: abs(args.url),
    datePublished: args.datePublished,
    dateModified: args.dateModified || args.datePublished,
    inLanguage: args.locale === 'zh' ? 'zh-CN' : 'en-US',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PUBLISHER_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(args.url) },
    image: args.image ? abs(args.image) : undefined,
    keywords: args.topics?.join(', ') || undefined,
  };
}

export function essayPostingSchema(essay: EssayMeta, urlPath: string) {
  return blogPostingSchema({
    title: essay.title,
    description: essay.description,
    url: urlPath,
    datePublished: essay.date,
    topics: essay.topics as string[],
    locale: essay.lang,
  });
}

export function periodicPostingSchema(periodic: PeriodicMeta, urlPath: string) {
  return blogPostingSchema({
    title: periodic.title,
    description:
      periodic.description ||
      (periodic.lang === 'zh'
        ? `${periodic.title} - 第${periodic.issue}期`
        : `${periodic.title} - Issue #${periodic.issue}`),
    url: urlPath,
    datePublished: periodic.date,
    topics: periodic.topics as string[],
    locale: periodic.lang,
  });
}

export function seriesPageSchema(series: SeriesMeta, urlPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: series.title,
    description: series.description || undefined,
    url: abs(urlPath),
    datePublished: series.date,
    dateModified: series.updated || series.date,
    inLanguage: series.lang === 'zh' ? 'zh-CN' : 'en-US',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PUBLISHER_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(urlPath) },
    keywords: series.topics.join(', ') || undefined,
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

/** Serialize for embedding inside a `<script type="application/ld+json">`. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
