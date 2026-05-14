import { ImageResponse } from 'next/og';
import { getPeriodicBySlug, getPeriodicSlugs } from '@/lib/periodics';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';
import { ogFontsFor } from '@/lib/og-fonts';

export const dynamic = 'force-static';

export const alt = 'Algo Mind periodic';
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getPeriodicSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({ params }: { params: { slug: string } }) {
  const fonts = ogFontsFor('en');
  const periodic = getPeriodicBySlug(params.slug);
  if (!periodic || periodic.lang !== 'en') {
    return new ImageResponse(
      (
        <OgCard
          title="Algo Mind"
          byline="Feitong Yang"
          brand="Algo Mind"
          locale="en"
        />
      ),
      { ...size, fonts },
    );
  }

  return new ImageResponse(
    (
      <OgCard
        title={periodic.title}
        kicker={`Issue ${periodic.issue}`}
        byline="Feitong Yang"
        brand="Algo Mind"
        locale="en"
      />
    ),
    { ...size, fonts },
  );
}
