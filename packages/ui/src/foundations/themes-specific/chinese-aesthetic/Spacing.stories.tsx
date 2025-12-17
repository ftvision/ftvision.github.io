import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Themes/Chinese Aesthetic/Spacing',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * The 留白 (Liúbái) spacing philosophy — generous emptiness that carries meaning.
 * Includes breath, void, and vast-void spacing tokens.
 */
export const LiubaiPhilosophy: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">留白 (Liúbái) — Generous Emptiness</h2>
        <p className="type-body text-figure-secondary mb-8">
          "Count the white as black." Empty space is not absence—it is presence. Our spacing tokens
          encode philosophically grounded emptiness.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="type-h3 text-figure-primary">Contemplative Spacing Scale</h3>

        <div className="space-y-4 p-6 bg-ground-secondary rounded">
          {[
            {
              name: 'breath',
              value: '6rem (96px)',
              chinese: '气',
              desc: 'Contemplative pause between sections',
            },
            {
              name: 'void',
              value: '8rem (128px)',
              chinese: '虚',
              desc: 'Dramatic emptiness for hero openings',
            },
            {
              name: 'vast-void',
              value: '12rem (192px)',
              chinese: '大虚',
              desc: 'Maximum emptiness — rare, intentional',
            },
          ].map(({ name, value, chinese, desc }) => (
            <div key={name} className="flex items-center gap-4">
              <div className="w-24">
                <p className="type-label text-figure-primary">{name}</p>
                <p className="type-caption text-figure-muted">{chinese}</p>
              </div>
              <div
                className="bg-accent-primary h-4 rounded"
                style={{ width: `var(--spacing-${name})` }}
              />
              <div>
                <p className="type-caption text-figure-secondary">{value}</p>
                <p className="type-caption text-figure-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Visual demonstration of 留白 in practice.
 */
export const LiubaiInPractice: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">留白 in Practice</h2>
        <p className="type-body text-figure-secondary mb-6">
          See how generous spacing creates presence and draws attention to content.
        </p>
      </div>

      <div className="border border-border rounded overflow-hidden">
        <div className="bg-ground-secondary" style={{ height: 'var(--spacing-void)' }} />
        <div className="p-6 text-center">
          <p className="type-h2 text-figure-primary">A Title in Emptiness</p>
          <p className="type-body text-figure-secondary mt-2">
            The void above is not wasted space—it creates presence.
          </p>
        </div>
        <div className="bg-ground-secondary" style={{ height: 'var(--spacing-breath)' }} />
      </div>
      <p className="type-caption text-figure-muted text-center">
        Notice how the generous spacing makes the content feel more precious.
      </p>
    </div>
  ),
};

/**
 * Comparison with standard spacing.
 */
export const SpacingComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Spacing Comparison</h2>
        <p className="type-body text-figure-secondary mb-6">
          Compare standard section spacing with contemplative 留白 spacing.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border border-border rounded overflow-hidden">
          <p className="type-label text-figure-muted p-2 bg-ground-secondary text-center">
            section-lg (64px)
          </p>
          <div className="bg-ground-tertiary" style={{ height: 'var(--spacing-section-lg)' }} />
          <div className="p-4 text-center">
            <p className="type-body-sm text-figure-secondary">Standard section break</p>
          </div>
        </div>

        <div className="border border-border rounded overflow-hidden">
          <p className="type-label text-figure-muted p-2 bg-ground-secondary text-center">
            breath (96px)
          </p>
          <div className="bg-accent-primary/20" style={{ height: 'var(--spacing-breath)' }} />
          <div className="p-4 text-center">
            <p className="type-body-sm text-figure-secondary">Contemplative pause</p>
          </div>
        </div>
      </div>

      <p className="type-caption text-figure-muted">
        The breath spacing is 50% larger, creating a more meditative rhythm.
      </p>
    </div>
  ),
};
