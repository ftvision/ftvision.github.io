import { ImageResponse } from 'next/og';
import { getSeriesBySlug, getSeriesSlugs } from '@/lib/series';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';
import { ogFontsFor } from '@/lib/og-fonts';
import { SERIES_CATEGORY_LABELS } from '@/lib/constants';

export const dynamic = 'force-static';

export const alt = 'Algo Mind series';
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getSeriesSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({ params }: { params: { slug: string } }) {
  const fonts = ogFontsFor('en');
  const series = getSeriesBySlug(params.slug);
  if (!series || series.lang !== 'en') {
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
        title={series.title}
        kicker={SERIES_CATEGORY_LABELS[series.category]}
        byline="Feitong Yang"
        brand="Algo Mind"
        locale="en"
      />
    ),
    { ...size, fonts },
  );
}
