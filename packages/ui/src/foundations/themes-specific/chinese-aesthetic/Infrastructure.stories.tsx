import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Themes/Chinese Aesthetic/Infrastructure',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Ink-wash style shadows that feel organic and paper-like.
 * 影随形生 — "Shadow follows form"
 */
export const InkShadows: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Ink Shadows 墨影</h2>
        <p className="type-body text-figure-secondary mb-8">
          Shadows that feel like ink wash—soft, diffuse, organic. Not harsh drop shadows.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { name: 'shadow-sm', label: 'Small', desc: 'Subtle lift' },
          { name: 'shadow-md', label: 'Medium', desc: 'Interactive elements' },
          { name: 'shadow-lg', label: 'Large', desc: 'Elevated panels' },
          { name: 'shadow-xl', label: 'Extra Large', desc: 'Maximum elevation' },
        ].map(({ name, label, desc }) => (
          <div
            key={name}
            className="p-6 bg-surface-elevated rounded"
            style={{ boxShadow: `var(--${name})` }}
          >
            <p className="type-label text-figure-primary mb-1">{label}</p>
            <p className="type-caption text-figure-muted">{desc}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="type-h4 text-figure-primary mb-4">Shadow Character</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded">
            <p className="type-label text-figure-primary mb-1">Ink Wash</p>
            <p className="type-caption text-figure-muted">Soft edges, gradual falloff</p>
          </div>
          <div className="p-4 border border-border rounded">
            <p className="type-label text-figure-primary mb-1">Paper Lifting</p>
            <p className="type-caption text-figure-muted">Cards feel like sheets lifting</p>
          </div>
          <div className="p-4 border border-border rounded">
            <p className="type-label text-figure-primary mb-1">Stone Depth</p>
            <p className="type-caption text-figure-muted">Dark mode: depth in rock</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-surface-code rounded font-mono type-caption text-figure-secondary">
        <code>/* Light Mode */</code>
        <br />
        <code>--shadow-sm: 0 1px 3px rgba(26,26,26,0.05);</code>
        <br />
        <code>--shadow-md: 0 4px 12px rgba(26,26,26,0.08);</code>
        <br />
        <code>--shadow-lg: 0 8px 24px rgba(26,26,26,0.1);</code>
        <br />
        <code>--shadow-xl: 0 16px 48px rgba(26,26,26,0.12);</code>
      </div>
    </div>
  ),
};

/**
 * Z-Index scale for layered content.
 * 层峦叠嶂 — "Layered peaks and ridges"
 */
export const ZIndexScale: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Z-Index Scale 层叠</h2>
        <p className="type-body text-figure-secondary mb-8">
          Like layered mountains in a landscape painting—near elements dark and detailed, distant
          elements faint.
        </p>
      </div>

      <div className="space-y-2">
        {[
          { token: 'z-landscape', value: '800', desc: 'Scroll progress landscape' },
          { token: 'z-toast', value: '700', desc: 'Toast notifications' },
          { token: 'z-tooltip', value: '600', desc: 'Tooltips' },
          { token: 'z-popover', value: '500', desc: 'Popovers' },
          { token: 'z-modal', value: '400', desc: 'Modal dialogs' },
          { token: 'z-overlay', value: '300', desc: 'Overlays/Scrims' },
          { token: 'z-sticky', value: '200', desc: 'Sticky headers' },
          { token: 'z-dropdown', value: '100', desc: 'Dropdown menus' },
          { token: 'z-raised', value: '10', desc: 'Raised cards' },
          { token: 'z-base', value: '0', desc: 'Base content' },
        ].map(({ token, value, desc }, index) => (
          <div
            key={token}
            className="flex items-center gap-4 p-3 rounded"
            style={{
              marginLeft: `${(9 - index) * 16}px`,
              backgroundColor:
                index === 0
                  ? 'var(--color-accent-primary)'
                  : index < 5
                    ? 'var(--color-bg-tertiary)'
                    : 'var(--color-bg-secondary)',
              color: index === 0 ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
            }}
          >
            <span className="type-label w-32">{token}</span>
            <span className="type-caption text-figure-muted w-16">{value}</span>
            <span className="type-body-sm">{desc}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-status-info-bg border border-status-info rounded">
        <p className="type-body-sm text-figure-primary">
          <strong>Guideline:</strong> Use semantic tokens, never raw numbers. <code>z-max</code>{' '}
          (9999) is an escape hatch—if you need it, check your stacking context.
        </p>
      </div>
    </div>
  ),
};

/**
 * Container widths for layout control.
 * 方寸之间 — "Within a square inch"
 */
export const ContainerWidths: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Container Widths 容器</h2>
        <p className="type-body text-figure-secondary mb-8">
          Containment is not limitation—it is focus. Like landscapes within album leaves.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { token: 'container-xs', value: '20rem (320px)', desc: 'Mobile minimum' },
          { token: 'container-sm', value: '24rem (384px)', desc: 'Small cards' },
          { token: 'container-md', value: '32rem (512px)', desc: 'Medium content' },
          { token: 'container-prose', value: '42rem (672px)', desc: 'Long-form reading (wider for CJK)' },
          { token: 'container-content', value: '48rem (768px)', desc: 'Standard article' },
          { token: 'container-wide', value: '64rem (1024px)', desc: 'Wide layouts' },
          { token: 'container-max', value: '80rem (1280px)', desc: 'Maximum site width' },
        ].map(({ token, value, desc }) => (
          <div key={token} className="flex items-center gap-4">
            <div className="w-40">
              <p className="type-label text-figure-primary">{token}</p>
            </div>
            <div className="w-40">
              <p className="type-caption text-figure-muted">{value}</p>
            </div>
            <div className="flex-1">
              <p className="type-body-sm text-figure-secondary">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-ground-secondary rounded">
        <h3 className="type-h4 text-figure-primary mb-4">The 42rem Prose Width</h3>
        <p className="type-body text-figure-secondary">
          Standard Western recommendation is 65ch (~65 characters). For Chinese content, 42rem
          accommodates both scripts: ~65 Latin characters or ~40 Chinese characters (CJK characters
          are wider).
        </p>
      </div>
    </div>
  ),
};

/**
 * Aspect ratios including traditional Chinese formats.
 * 画幅 — "Painting formats"
 */
export const AspectRatios: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Aspect Ratios 画幅</h2>
        <p className="type-body text-figure-secondary mb-8">
          Traditional Chinese painting uses distinctive proportions—hand scrolls, hanging scrolls,
          album leaves.
        </p>
      </div>

      <div>
        <h3 className="type-h4 text-figure-primary mb-4">Standard Formats</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { ratio: '1/1', name: 'square', desc: 'Thumbnails' },
            { ratio: '4/3', name: 'photo', desc: 'Photography' },
            { ratio: '16/9', name: 'video', desc: 'Video embeds' },
            { ratio: '3/4', name: 'portrait', desc: 'Portrait' },
          ].map(({ ratio, name, desc }) => (
            <div key={name}>
              <div
                className="bg-ground-tertiary border border-border rounded flex items-center justify-center mb-2"
                style={{ aspectRatio: ratio, maxHeight: '120px' }}
              >
                <span className="type-caption text-figure-muted">{ratio}</span>
              </div>
              <p className="type-label text-figure-primary">{name}</p>
              <p className="type-caption text-figure-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="type-h4 text-figure-primary mb-4">Traditional Chinese Formats</h3>
        <div className="space-y-6">
          <div>
            <p className="type-label text-accent-primary mb-2">卷轴 Handscroll (3:1)</p>
            <div
              className="bg-ground-tertiary border border-border rounded flex items-center justify-center"
              style={{ aspectRatio: '3/1', maxHeight: '100px' }}
            >
              <span className="type-caption text-figure-muted">Horizontal reading format</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="type-label text-accent-primary mb-2">挂轴 Hanging Scroll (1:2)</p>
              <div
                className="bg-ground-tertiary border border-border rounded flex items-center justify-center"
                style={{ aspectRatio: '1/2', maxHeight: '200px' }}
              >
                <span className="type-caption text-figure-muted">Vertical display</span>
              </div>
            </div>
            <div>
              <p className="type-label text-accent-primary mb-2">册页 Album Leaf (5:4)</p>
              <div
                className="bg-ground-tertiary border border-border rounded flex items-center justify-center"
                style={{ aspectRatio: '5/4', maxHeight: '200px' }}
              >
                <span className="type-caption text-figure-muted">Bound collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Prose styling tokens for long-form reading.
 * 书卷气 — "The air of books and scrolls"
 */
export const ProseStyles: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Prose Styles 文章排版</h2>
        <p className="type-body text-figure-secondary mb-8">
          书卷气 — "The air of books and scrolls." Typography for sustained reading.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 type-label text-figure-primary">Token</th>
              <th className="text-left py-2 type-label text-figure-primary">Value</th>
              <th className="text-left py-2 type-label text-figure-primary">Purpose</th>
            </tr>
          </thead>
          <tbody className="type-body-sm text-figure-secondary">
            <tr className="border-b border-border">
              <td className="py-2 font-mono">prose-p-spacing</td>
              <td className="py-2">1.5em</td>
              <td className="py-2">Space between paragraphs</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 font-mono">prose-heading-mt</td>
              <td className="py-2">2.5em</td>
              <td className="py-2">Margin-top for headings</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 font-mono">prose-heading-mb</td>
              <td className="py-2">0.75em</td>
              <td className="py-2">Margin-bottom for headings</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 font-mono">prose-blockquote-my</td>
              <td className="py-2">2em</td>
              <td className="py-2">Blockquote vertical margin</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 font-mono">prose-figure-my</td>
              <td className="py-2">2.5em</td>
              <td className="py-2">Figure vertical margin</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 font-mono">prose-hr-my</td>
              <td className="py-2">3em</td>
              <td className="py-2">Horizontal rule margin</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="type-h4 text-figure-primary mb-4">Example Article Excerpt</h3>
        <div
          className="p-8 bg-ground-secondary rounded"
          style={{ maxWidth: 'var(--container-prose)' }}
        >
          <h4 className="type-h3 text-figure-primary" style={{ marginBottom: 'var(--prose-heading-mb)' }}>
            On Emptiness and Intention
          </h4>
          <p className="type-body text-figure-primary" style={{ marginBottom: 'var(--prose-p-spacing)' }}>
            计白当黑 — "Count the white as black." In Chinese painting, the areas without ink are
            not empty. They are mist between mountains, silence between words.
          </p>
          <p className="type-body text-figure-primary">
            This is not Western minimalism, which removes until function is served. Chinese
            emptiness adds absence until presence is felt.
          </p>
        </div>
      </div>
    </div>
  ),
};
