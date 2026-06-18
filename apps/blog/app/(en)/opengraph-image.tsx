import { ImageResponse } from 'next/og';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';
import { ogFontsFor } from '@/lib/og-fonts';

export const dynamic = 'force-static';

export const alt = 'Algo Mind — Intelligence is an algorithm';
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <OgCard
        title="Intelligence is an algorithm"
        byline="Feitong Yang"
        brand="Algo Mind"
        locale="en"
      />
    ),
    { ...size, fonts: ogFontsFor('en') },
  );
}
