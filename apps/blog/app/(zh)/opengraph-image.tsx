import { ImageResponse } from 'next/og';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';
import { ogFontsFor } from '@/lib/og-fonts';

export const dynamic = 'force-static';

export const alt = '思算 — 智能即算法';
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <OgCard
        title="智能即算法"
        byline="Feitong Yang"
        brand="思算"
        locale="zh"
      />
    ),
    { ...size, fonts: ogFontsFor('zh') },
  );
}
