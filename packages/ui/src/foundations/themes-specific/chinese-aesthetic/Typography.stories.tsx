import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Themes/Chinese Aesthetic/Typography',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const sampleChineseText = '山不在高，有仙则名。水不在深，有龙则灵。';
const sampleBilingualTitle = "The Scholar's Studio";
const sampleBilingualSubtitle = '书房';

/**
 * Bilingual typography optimized for Chinese and English reading.
 * Larger base size (18px) and generous line height (1.8) for CJK characters.
 */
export const BilingualTypeScale: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Bilingual Type System</h2>
        <p className="type-body text-figure-secondary mb-8">
          Typography that honors both Chinese and Western traditions. CJK-optimized sizes,
          line heights, and serif font stacks.
        </p>
      </div>

      <div className="space-y-8">
        <div className="border-b border-border pb-6">
          <span className="type-overline text-figure-muted">Display 题额</span>
          <p className="type-display text-figure-primary mt-2">{sampleBilingualTitle}</p>
          <p className="type-display text-figure-primary">{sampleBilingualSubtitle}</p>
          <p className="type-caption text-figure-muted mt-2">
            3.433rem / 1.2 / 700 — "The inscription above the scholar's door"
          </p>
        </div>

        <div className="border-b border-border pb-6">
          <span className="type-overline text-figure-muted">Body 正文</span>
          <p className="type-body text-figure-primary mt-2">{sampleChineseText}</p>
          <p className="type-body text-figure-primary mt-4">
            The mountain need not be high; if there is a divine being, it becomes famous. The water
            need not be deep; if there is a dragon, it becomes numinous.
          </p>
          <p className="type-caption text-figure-muted mt-2">
            1.125rem (18px) / 1.8 line-height — optimized for CJK readability
          </p>
        </div>

        <div className="border-b border-border pb-6">
          <span className="type-overline text-figure-muted">Caption 注释</span>
          <p className="type-caption text-figure-secondary mt-2">
            出自刘禹锡《陋室铭》— From Liu Yuxi's "Inscription on a Humble Room"
          </p>
          <p className="type-caption text-figure-muted mt-2">0.9rem / 1.6 — for annotations and metadata</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Hybrid font stack: Source Serif Pro for Latin, Noto Serif CJK for Chinese.
 */
export const FontStack: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Hybrid Font Stack</h2>
        <p className="type-body text-figure-secondary mb-6">
          Uses Source Serif Pro for Latin characters, falls back to Noto Serif CJK SC for Chinese.
          This ensures optimal rendering for both scripts.
        </p>
      </div>

      <div className="p-6 bg-ground-secondary rounded">
        <p className="type-label text-figure-primary mb-2">Current Stack</p>
        <p className="type-caption text-figure-muted font-mono break-all">
          'Source Serif Pro', 'Source Serif 4', 'Noto Serif CJK SC', 'Source Han Serif SC', 'Songti
          SC', 'SimSun', serif
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-border rounded bg-ground-secondary">
          <p className="type-label text-figure-primary">Source Serif Pro</p>
          <p className="type-caption text-figure-muted">
            Adobe's Latin serif — designed to harmonize with Source Han Serif
          </p>
        </div>
        <div className="p-4 border border-border rounded">
          <p className="type-label text-figure-primary">Noto Serif CJK SC / Source Han Serif SC</p>
          <p className="type-caption text-figure-muted">
            Google/Adobe's CJK serif — used for Chinese characters
          </p>
        </div>
        <div className="p-4 border border-border rounded">
          <p className="type-label text-figure-primary">Songti SC / SimSun</p>
          <p className="type-caption text-figure-muted">System fallbacks for macOS and Windows</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Side-by-side comparison of different font approaches.
 */
export const FontComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Font Approach Comparison</h2>
        <p className="type-body text-figure-secondary mb-6">
          Compare how English text renders with different font strategies.
        </p>
      </div>

      <div className="space-y-6">
        {/* Pure CJK Font */}
        <div className="p-6 border border-border rounded">
          <p className="type-label text-accent-primary mb-2">CJK Font Only (Noto Serif CJK SC)</p>
          <p
            className="text-figure-primary text-lg"
            style={{ fontFamily: "'Noto Serif SC', 'Songti SC', serif" }}
          >
            The quick brown fox jumps over the lazy dog. Typography matters.
          </p>
          <p
            className="text-figure-secondary mt-2"
            style={{ fontFamily: "'Noto Serif SC', 'Songti SC', serif" }}
          >
            When a reader encounters a well-designed page, they do not consciously register the
            typography. They simply feel: this is trustworthy.
          </p>
        </div>

        {/* Hybrid Stack (current) */}
        <div className="p-6 border border-border rounded bg-ground-secondary">
          <p className="type-label text-accent-primary mb-2">
            Hybrid Stack (Source Serif Pro + Noto Serif CJK) — Current
          </p>
          <p className="type-body text-figure-primary">
            The quick brown fox jumps over the lazy dog. Typography matters.
          </p>
          <p className="type-body text-figure-secondary mt-2">
            When a reader encounters a well-designed page, they do not consciously register the
            typography. They simply feel: this is trustworthy.
          </p>
        </div>

        {/* Mixed Content */}
        <div className="p-6 border border-border rounded">
          <p className="type-label text-accent-primary mb-2">Mixed Chinese/English Content</p>
          <p className="type-body text-figure-primary">
            在 Typography 的世界里，The quick brown fox 跳过了 lazy dog。这是一个关于 design
            system 的故事。
          </p>
          <p className="type-body text-figure-secondary mt-2">
            计白当黑 — "Count the white as black." In Chinese painting, emptiness is presence.
          </p>
        </div>
      </div>

      <div className="p-4 bg-status-info-bg border border-status-info rounded">
        <p className="type-body-sm text-figure-primary">
          <strong>Note:</strong> The hybrid approach uses Source Serif Pro (optimized for Latin) as
          the primary font, which gracefully falls back to Noto Serif CJK SC when Chinese characters
          are encountered.
        </p>
      </div>
    </div>
  ),
};

/**
 * Line height comparison for CJK text.
 */
export const LineHeightComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Line Height for CJK</h2>
        <p className="type-body text-figure-secondary mb-6">
          Chinese characters need more vertical breathing room than Latin text.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded">
          <p className="type-label text-figure-primary mb-2">Standard (1.5)</p>
          <p className="text-figure-secondary" style={{ lineHeight: '1.5' }}>
            {sampleChineseText}斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。
          </p>
        </div>
        <div className="p-6 border border-border rounded bg-ground-secondary">
          <p className="type-label text-figure-primary mb-2">CJK Optimized (1.8)</p>
          <p className="text-figure-secondary" style={{ lineHeight: '1.8' }}>
            {sampleChineseText}斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。
          </p>
        </div>
      </div>

      <p className="type-caption text-figure-muted">
        The 1.8 line height allows each character to breathe, improving readability for dense CJK
        text.
      </p>
    </div>
  ),
};
