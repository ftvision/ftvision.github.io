import { ImageResponse } from 'next/og';
import { OgCard, OG_WIDTH, OG_HEIGHT } from '@/components/seo/og-card';

export const dynamic = 'force-static';

export const alt = '思算 — 关于 AI、产品与工程的随笔';
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <OgCard
        title="关于 AI、产品与工程的随笔"
        byline="Feitong Yang"
        brand="思算"
        locale="zh"
      />
    ),
    size,
  );
}
