/**
 * Open Graph card template.
 *
 * Rendered by Satori (via next/og's ImageResponse) into a 1200x630 PNG.
 *
 * Satori implements a subset of CSS — only flexbox layout, basic typography,
 * solid colors, gradients, borders, transforms. No grid, no media queries,
 * no pseudo-elements. Use inline style props (not className) because no
 * stylesheet is loaded.
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export interface OgCardProps {
  title: string;
  /** Optional eyebrow / kicker text (e.g. "Essay", "Series", or topic) */
  kicker?: string;
  /** Author / publisher byline shown at the bottom */
  byline: string;
  /** Brand mark text shown in the corner */
  brand: string;
  /** "en" tunes typography for Latin, "zh" for CJK */
  locale: 'en' | 'zh';
}

const COLORS = {
  bg: '#0a0a0a',
  bgGradient: 'radial-gradient(circle at 30% 20%, #1f1f1f 0%, #0a0a0a 70%)',
  text: '#fafafa',
  muted: '#999999',
  accent: '#d4a017',
  rule: '#262626',
};

export function OgCard({ title, kicker, byline, brand, locale }: OgCardProps) {
  // Long titles wrap; keep within ~3 lines visually.
  const titleSize = title.length > 80 ? 64 : title.length > 50 ? 76 : 88;

  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: COLORS.bgGradient,
        color: COLORS.text,
        padding: '72px',
        fontFamily: locale === 'zh' ? 'serif' : 'serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 12,
            height: 12,
            background: COLORS.accent,
            borderRadius: 2,
          }}
        />
        <span
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: COLORS.muted,
          }}
        >
          {brand}
        </span>
        {kicker ? (
          <>
            <span
              style={{
                width: 1,
                height: 24,
                background: COLORS.rule,
                marginLeft: 8,
                marginRight: 8,
              }}
            />
            <span
              style={{
                fontSize: 22,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: COLORS.muted,
              }}
            >
              {kicker}
            </span>
          </>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -1,
          color: COLORS.text,
          maxWidth: OG_WIDTH - 144,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 24,
          borderTop: `1px solid ${COLORS.rule}`,
        }}
      >
        <span style={{ fontSize: 28, color: COLORS.text }}>{byline}</span>
        <span style={{ fontSize: 22, color: COLORS.muted }}>
          www.feitong.phd
        </span>
      </div>
    </div>
  );
}
