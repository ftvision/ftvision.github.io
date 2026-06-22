import { getEssayBySlug, getEssaySlugsByLanguage } from '@/lib/essays';
import { SITE_AUTHOR, SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getEssaySlugsByLanguage('zh').map((slug) => ({ slug }));
}

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay || essay.lang !== 'zh') {
    return new Response('Not Found', { status: 404 });
  }

  const canonical = `${SITE_URL}/zh/essays/${slug}/`;
  const header = [
    `# ${essay.title}`,
    '',
    `*${essay.description}*`,
    '',
    `- 作者: ${SITE_AUTHOR.name} (${SITE_AUTHOR.url})`,
    `- 发布日期: ${essay.date}`,
    essay.updated ? `- 更新日期: ${essay.updated}` : null,
    `- 原文链接: ${canonical}`,
    essay.topics.length > 0 ? `- 主题: ${essay.topics.join(', ')}` : null,
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
