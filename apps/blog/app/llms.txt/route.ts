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
    '> Essays on intelligence as computation — AI agents, the craft of building software, and how minds and machines work. By Feitong Yang.',
    '',
    'Algo Mind is the personal blog of Feitong Yang — an engineer who builds AI agents, developer tools, and products, and who trained as a cognitive psychologist (Ph.D., Johns Hopkins). Its premise is functionalist: intelligence is an algorithm, and a mind is defined by what it does, not what it is made of. He has built software at Google, Citadel, and AI labs. Essays sit at the intersection of AI agents, the craft of building software, and how minds and machines reason, remember, and build.',
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
