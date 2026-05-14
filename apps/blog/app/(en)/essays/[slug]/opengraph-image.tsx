import { ImageResponse } from 'next/og';
import { getEssayBySlug, getEssaySlugs } from '@/lib/essays';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';
import { TOPIC_LABELS } from '@/lib/constants';

export const dynamic = 'force-static';

export const alt = 'Algo Mind essay';
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
  if (!essay || essay.lang !== 'en') {
    return new ImageResponse(
      (
        <OgCard
          title="Algo Mind"
          byline="Essays by Feitong Yang"
          brand="Algo Mind"
          locale="en"
        />
      ),
      size,
    );
  }

  const kicker = essay.topics[0] ? TOPIC_LABELS[essay.topics[0]] : 'Essay';

  return new ImageResponse(
    (
      <OgCard
        title={essay.title}
        kicker={kicker}
        byline="Feitong Yang"
        brand="Algo Mind"
        locale="en"
      />
    ),
    size,
  );
}
