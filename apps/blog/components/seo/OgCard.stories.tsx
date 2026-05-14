import type { Meta, StoryObj } from '@storybook/react';
// Loads @font-face declarations into the Storybook iframe so the OG card
// renders with the same typefaces Satori uses at build time. The browser
// rendering is not pixel-identical to Satori, but it's close enough for
// composition and typography iteration.
import '@fontsource/source-serif-pro/400.css';
import '@fontsource/source-serif-pro/400-italic.css';
import '@fontsource/source-serif-pro/700.css';
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-serif-sc/700.css';
import { OgCard, OG_WIDTH, OG_HEIGHT } from './og-card';

/**
 * Wraps the 1200×630 card in a scaled, scrollable frame so it fits the
 * Storybook viewport while preserving the true pixel dimensions of the
 * render.
 */
function ScaledFrame({ children, scale }: { children: React.ReactNode; scale: number }) {
  return (
    <div
      style={{
        width: OG_WIDTH * scale,
        height: OG_HEIGHT * scale,
        overflow: 'hidden',
        border: '1px dashed #cccccc',
        background: '#ffffff',
      }}
    >
      <div
        style={{
          width: OG_WIDTH,
          height: OG_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}

const meta = {
  title: 'SEO/OgCard',
  component: OgCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Open Graph social-share card. Editorial composition inspired by The New Yorker — cream surface, Source Serif Pro (EN) or Noto Serif SC (ZH), centered classical layout with nyt-blue (`#326891`) hairlines. Rendered at 1200×630 by Satori at build time. This story shows the JSX in the browser at scaled sizes; the live PNG output may differ slightly in font rendering.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    kicker: { control: 'text' },
    byline: { control: 'text' },
    brand: { control: 'text' },
    locale: { control: { type: 'radio' }, options: ['en', 'zh'] },
  },
  render: (args) => (
    <ScaledFrame scale={0.6}>
      <OgCard {...args} />
    </ScaledFrame>
  ),
} satisfies Meta<typeof OgCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── EN ─────────────────────────────────────────────────────────────────────

export const EnglishEssay: Story = {
  args: {
    title: 'The Era of Decision Games',
    kicker: 'Technical',
    byline: 'Feitong Yang',
    brand: 'Algo Mind',
    locale: 'en',
  },
};

export const EnglishEssayLongTitle: Story = {
  args: {
    title: 'How AI Will Take Your Tasks But Not Your Job — and What Comes After',
    kicker: 'AI',
    byline: 'Feitong Yang',
    brand: 'Algo Mind',
    locale: 'en',
  },
};

export const EnglishPeriodic: Story = {
  args: {
    title: 'Reading Digest, Mid-May 2026',
    kicker: 'Issue 14',
    byline: 'Feitong Yang',
    brand: 'Algo Mind',
    locale: 'en',
  },
};

export const EnglishSeries: Story = {
  args: {
    title: 'One Hundred Economics Papers',
    kicker: 'Reading List',
    byline: 'Feitong Yang',
    brand: 'Algo Mind',
    locale: 'en',
  },
};

export const EnglishHome: Story = {
  args: {
    title: 'Essays on AI, Product, Engineering',
    byline: 'Feitong Yang',
    brand: 'Algo Mind',
    locale: 'en',
  },
};

// ─── ZH ─────────────────────────────────────────────────────────────────────

export const ChineseEssay: Story = {
  args: {
    title: '决策博弈的时代',
    kicker: '技术',
    byline: 'Feitong Yang',
    brand: '思算',
    locale: 'zh',
  },
};

export const ChineseEssayLongTitle: Story = {
  args: {
    title: '从零基础到写完 10,000 行 C++ 代码',
    kicker: '技术',
    byline: 'Feitong Yang',
    brand: '思算',
    locale: 'zh',
  },
};

export const ChinesePeriodic: Story = {
  args: {
    title: '5月文摘',
    kicker: '第 14 期',
    byline: 'Feitong Yang',
    brand: '思算',
    locale: 'zh',
  },
};

export const ChineseHome: Story = {
  args: {
    title: '关于 AI、产品与工程的随笔',
    byline: 'Feitong Yang',
    brand: '思算',
    locale: 'zh',
  },
};

// ─── Side-by-side ───────────────────────────────────────────────────────────

export const SideBySide: Story = {
  args: EnglishEssay.args,
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <ScaledFrame scale={0.5}>
        <OgCard
          title="The Era of Decision Games"
          kicker="Technical"
          byline="Feitong Yang"
          brand="Algo Mind"
          locale="en"
        />
      </ScaledFrame>
      <ScaledFrame scale={0.5}>
        <OgCard
          title="决策博弈的时代"
          kicker="技术"
          byline="Feitong Yang"
          brand="思算"
          locale="zh"
        />
      </ScaledFrame>
    </div>
  ),
};

// ─── Pixel-accurate ─────────────────────────────────────────────────────────
// The PNG that Satori generates is what social platforms render. This
// variant renders the card at true 1200×630 px — what scrapers see.
export const PixelAccurate: Story = {
  args: EnglishEssay.args,
  render: (args) => (
    <ScaledFrame scale={1}>
      <OgCard {...args} />
    </ScaledFrame>
  ),
};
