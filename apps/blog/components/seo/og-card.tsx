/**
 * Open Graph card — editorial composition.
 *
 * Visual lineage: The New Yorker social cards adapted to Algo Mind's
 * brand tokens. Every color in COLORS below maps to a real token in
 * packages/tokens/src/themes/nyt/light.json — no eyeballed values.
 * Composition is restrained, with a dominant serif title and hairline
 * rules in the site's neutral border color.
 *
 * Rendered by Satori (via next/og ImageResponse) into a 1200×630 PNG
 * at build time. Satori supports a subset of CSS: flexbox, basic
 * typography, solid colors, gradients, borders. All styles are inline.
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export interface OgCardProps {
  title: string;
  /** Eyebrow text — topic, issue, category. Rendered small-caps. */
  kicker?: string;
  /** Byline rendered below the title. Italic in EN, regular in ZH. */
  byline: string;
  /** Brand wordmark rendered top-left. */
  brand: string;
  /** Locale tunes typography: italic in EN, no italics in ZH. */
  locale: 'en' | 'zh';
}

/**
 * Palette sampled from packages/tokens/src/themes/nyt/light.json.
 * Each value here maps to a real token, not an eyeballed color.
 */
const COLORS = {
  /** color.bg.primary → primitive.color.white */
  surface: '#ffffff',
  /** color.text.primary → primitive.color.gray.900 */
  ink: '#18181b',
  /** color.text.muted → primitive.color.gray.500 */
  muted: '#71717a',
  /** color.accent.primary → primitive.color.nyt-blue.DEFAULT */
  accent: '#326891',
  /** color.border.default → primitive.color.gray.200 */
  rule: '#e4e4e7',
} as const;

const SERIF_LATIN = '"Source Serif Pro", serif';
const SERIF_CJK = '"Noto Serif SC", "Source Serif Pro", serif';

const PAD_X = 88;
const INNER_WIDTH = OG_WIDTH - PAD_X * 2;

export function OgCard({ title, kicker, byline, brand, locale }: OgCardProps) {
  const fontFamily = locale === 'zh' ? SERIF_CJK : SERIF_LATIN;

  // Title scales by length so it always fits ~3 visual lines.
  const len = title.length;
  const titleSize = len > 80 ? 64 : len > 50 ? 76 : 92;

  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        background: COLORS.surface,
        color: COLORS.ink,
        padding: `72px ${PAD_X}px`,
        fontFamily,
      }}
    >
      {/* Top: masthead + kicker. Bottom border of this row is the hairline. */}
      <div
        style={{
          display: 'flex',
          width: INNER_WIDTH,
          alignItems: 'center',
          gap: 18,
          paddingBottom: 22,
          borderBottom: `1px solid ${COLORS.rule}`,
        }}
      >
        <span
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: locale === 'zh' ? 4 : 6,
            textTransform: locale === 'zh' ? 'none' : 'uppercase',
            color: COLORS.accent,
          }}
        >
          {brand}
        </span>
        {kicker ? (
          <span
            style={{
              fontFamily,
              fontSize: 20,
              letterSpacing: locale === 'zh' ? 3 : 4,
              textTransform: locale === 'zh' ? 'none' : 'uppercase',
              color: COLORS.muted,
              borderLeft: `1px solid ${COLORS.rule}`,
              paddingLeft: 18,
            }}
          >
            {kicker}
          </span>
        ) : null}
      </div>

      {/* Middle: dominant serif title, centered vertically. */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          width: INNER_WIDTH,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily,
            fontWeight: 700,
            fontSize: titleSize,
            lineHeight: 1.08,
            letterSpacing: locale === 'zh' ? 0 : -1,
            color: COLORS.ink,
            maxWidth: INNER_WIDTH,
          }}
        >
          {title}
        </div>
      </div>

      {/* Bottom: italic byline, domain footer. Top border is the hairline. */}
      <div
        style={{
          display: 'flex',
          width: INNER_WIDTH,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 22,
          borderTop: `1px solid ${COLORS.rule}`,
        }}
      >
        <span
          style={{
            fontFamily,
            fontStyle: locale === 'zh' ? 'normal' : 'italic',
            fontSize: 28,
            color: COLORS.ink,
          }}
        >
          {locale === 'zh' ? byline : `by ${byline}`}
        </span>
        <span
          style={{
            fontFamily,
            fontSize: 18,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: COLORS.muted,
          }}
        >
          www.feitong.phd
        </span>
      </div>
    </div>
  );
}
