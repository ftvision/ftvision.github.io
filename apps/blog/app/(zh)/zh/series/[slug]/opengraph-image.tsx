import { ImageResponse } from 'next/og';
import { getSeriesBySlug, getSeriesSlugs } from '@/lib/series';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';
import { ogFontsFor } from '@/lib/og-fonts';
import { SERIES_CATEGORY_LABELS_ZH } from '@/lib/constants';

export const dynamic = 'force-static';

export const alt = '思算系列';
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getSeriesSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({ params }: { params: { slug: string } }) {
  const fonts = ogFontsFor('zh');
  const series = getSeriesBySlug(params.slug);
  if (!series || series.lang !== 'zh') {
    return new ImageResponse(
      (
        <OgCard
          title="思算"
          byline="Feitong Yang"
          brand="思算"
          locale="zh"
        />
      ),
      { ...size, fonts },
    );
  }

  return new ImageResponse(
    (
      <OgCard
        title={series.title}
        kicker={SERIES_CATEGORY_LABELS_ZH[series.category]}
        byline="Feitong Yang"
        brand="思算"
        locale="zh"
      />
    ),
    { ...size, fonts },
  );
}
