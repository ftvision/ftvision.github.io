import { ImageResponse } from 'next/og';
import { getPeriodicBySlug, getPeriodicSlugs } from '@/lib/periodics';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';

export const dynamic = 'force-static';

export const alt = '思算文摘';
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getPeriodicSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({ params }: { params: { slug: string } }) {
  const periodic = getPeriodicBySlug(params.slug);
  if (!periodic || periodic.lang !== 'zh') {
    return new ImageResponse(
      (
        <OgCard
          title="思算"
          byline="Feitong Yang 的文摘"
          brand="思算"
          locale="zh"
        />
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <OgCard
        title={periodic.title}
        kicker={`第 ${periodic.issue} 期`}
        byline="Feitong Yang"
        brand="思算"
        locale="zh"
      />
    ),
    size,
  );
}
