import { getEssayBySlug, getEssaySlugsByLanguage } from '@/lib/essays';
import { SITE_AUTHOR, SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getEssaySlugsByLanguage('en').map((slug) => ({ slug }));
}

interface Params {
  params: Promise<{ slug: string }>;
}

// Serves a clean, citable markdown rendition of the essay. LLM crawlers and
// IDE agents prefer this over the rendered HTML — fewer tokens, no parser
// surprises, stable structure across visits.
export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay || essay.lang !== 'en') {
    return new Response('Not Found', { status: 404 });
  }

  const canonical = `${SITE_URL}/essays/${slug}`;
  const header = [
    `# ${essay.title}`,
    '',
    `*${essay.description}*`,
    '',
    `- Author: ${SITE_AUTHOR.name} (${SITE_AUTHOR.url})`,
    `- Published: ${essay.date}`,
    essay.updated ? `- Updated: ${essay.updated}` : null,
    `- Canonical: ${canonical}`,
    essay.topics.length > 0 ? `- Topics: ${essay.topics.join(', ')}` : null,
    '',
    '---',
    '',
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  const body = `${header}${essay.content.trimStart()}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}
