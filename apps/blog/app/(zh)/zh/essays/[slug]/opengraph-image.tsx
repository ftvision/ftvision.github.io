import { ImageResponse } from 'next/og';
import { getEssayBySlug, getEssaySlugs } from '@/lib/essays';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';
import { TOPIC_LABELS_ZH } from '@/lib/constants';

export const dynamic = 'force-static';

export const alt = '思算文章';
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({ slug }));
}

interface RouteProps {
  params: { slug: string };
}

export default async function OgImage({ params }: RouteProps) {
  const essay = getEssayBySlug(params.slug);
  if (!essay || essay.lang !== 'zh') {
    return new ImageResponse(
      (
        <OgCard
          title="思算"
          byline="Feitong Yang 的随笔"
          brand="思算"
          locale="zh"
        />
      ),
      size,
    );
  }

  const kicker = essay.topics[0] ? TOPIC_LABELS_ZH[essay.topics[0]] : '随笔';

  return new ImageResponse(
    (
      <OgCard
        title={essay.title}
        kicker={kicker}
        byline="Feitong Yang"
        brand="思算"
        locale="zh"
      />
    ),
    size,
  );
}
