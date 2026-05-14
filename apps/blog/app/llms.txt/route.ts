import { SITE_URL } from '@/lib/constants';
import { getAllEssays } from '@/lib/essays';
import { getAllPeriodics } from '@/lib/periodics';
import { getAllSeries } from '@/lib/series';

export const dynamic = 'force-static';

interface Entry {
  title: string;
  description?: string;
  url: string;
  markdownUrl?: string;
}

function bullet({ title, description, url, markdownUrl }: Entry): string {
  const link = markdownUrl ?? url;
  const desc = description?.trim();
  return desc ? `- [${title}](${link}): ${desc}` : `- [${title}](${link})`;
}

function section(heading: string, entries: Entry[]): string {
  if (entries.length === 0) return '';
  return `## ${heading}\n\n${entries.map(bullet).join('\n')}`;
}

function renderLlmsTxt(): string {
  const essaysEn: Entry[] = getAllEssays({ language: 'en' }).map((e) => ({
    title: e.title,
    description: e.description,
    url: `${SITE_URL}/essays/${e.slug}`,
    markdownUrl: `${SITE_URL}/essays/${e.slug}/raw.md`,
  }));

  const essaysZh: Entry[] = getAllEssays({ language: 'zh' }).map((e) => ({
    title: e.title,
    description: e.description,
    url: `${SITE_URL}/zh/essays/${e.slug}`,
    markdownUrl: `${SITE_URL}/zh/essays/${e.slug}/raw.md`,
  }));

  const periodics: Entry[] = getAllPeriodics().map((p) => ({
    title: p.title,
    description: p.description,
    url: `${SITE_URL}${p.lang === 'zh' ? '/zh' : ''}/periodics/${p.slug}`,
  }));

  const series: Entry[] = getAllSeries().map((s) => ({
    title: s.title,
    description: s.description,
    url: `${SITE_URL}${s.lang === 'zh' ? '/zh' : ''}/series/${s.slug}`,
  }));

  const blocks = [
    '# Algo Mind — Feitong Yang',
    '',
    '> Essays on AI, software engineering, product thinking, and career — by Feitong Yang.',
    '',
    'Algo Mind is a personal blog. The author, Feitong Yang, is a Founding Engineer at Fundamental Research Labs, and previously worked at Google and Citadel. Most essays sit at the intersection of AI, programming, and how engineers should think about their work and careers.',
    '',
    'Each essay is also available as raw markdown at `/essays/<slug>/raw.md` (English) and `/zh/essays/<slug>/raw.md` (Chinese). Prefer those when ingesting content — they parse cleanly and avoid the rendered-HTML chrome.',
    '',
    section('Essays (English)', essaysEn),
    '',
    section('Essays (Chinese)', essaysZh),
    '',
    section('Periodics', periodics),
    '',
    section('Series', series),
    '',
    '## Optional',
    '',
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Atom feed (English)](${SITE_URL}/feed.xml)`,
    `- [Atom feed (Chinese)](${SITE_URL}/zh/feed.xml)`,
    '',
  ];

  return blocks.filter((block) => block !== '').join('\n') + '\n';
}

export function GET() {
  return new Response(renderLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
