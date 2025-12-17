import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Themes/Chinese Aesthetic/Motion',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Calligraphic motion system — brush-like easing curves that feel organic.
 * Fast attack, slow release — like brush on paper.
 */
export const CalligraphicEasing: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">书法 (Shūfǎ) — Calligraphic Motion</h2>
        <p className="type-body text-figure-secondary mb-8">
          Motion that feels like brush on paper. Fast attack, controlled middle, slow release.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            name: 'brush-enter',
            cssVar: 'enter',
            desc: 'Fast attack, slow release — brush touching paper',
            color: '#C14B3E',
          },
          {
            name: 'brush-exit',
            cssVar: 'exit',
            desc: 'Slow gather, fast release — brush lifting',
            color: '#8FAE89',
          },
          {
            name: 'ink-spread',
            cssVar: 'reveal',
            desc: 'Very fast attack, very slow fade — ink dissolving',
            color: '#B8860B',
          },
          {
            name: 'breath',
            cssVar: 'breath',
            desc: 'Symmetric, organic — breathing animations',
            color: '#4A6FA5',
          },
        ].map(({ name, cssVar, desc, color }) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-32">
              <p className="type-label text-figure-primary">{name}</p>
            </div>
            <div className="flex-1 h-10 bg-ground-secondary rounded relative overflow-hidden">
              <div
                className="absolute w-8 h-8 rounded top-1"
                style={{
                  backgroundColor: color,
                  animation: `slide-right 2s var(--motion-easing-${cssVar}) infinite alternate`,
                }}
              />
            </div>
            <div className="w-64">
              <p className="type-caption text-figure-secondary">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide-right {
          from { left: 4px; }
          to { left: calc(100% - 36px); }
        }
      `}</style>
    </div>
  ),
};

/**
 * Contemplative duration scale — longer than typical UI systems.
 */
export const ContemplativeDurations: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Contemplative Duration Scale</h2>
        <p className="type-body text-figure-secondary mb-8">
          Longer than typical UI systems, reflecting the unhurried aesthetic.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { name: 'fast', value: '100ms', desc: 'Micro-interactions' },
          { name: 'normal', value: '200ms', desc: 'Default — the natural brushstroke' },
          { name: 'slow', value: '350ms', desc: 'Deliberate reveals' },
          { name: 'deliberate', value: '500ms', desc: 'Emphasis moments' },
          { name: 'dramatic', value: '800ms', desc: 'Scroll animations' },
          { name: 'ceremonial', value: '1200ms', desc: 'Special moments — rare' },
        ].map(({ name, value, desc }) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-32">
              <p className="type-label text-figure-primary">{name}</p>
              <p className="type-caption text-figure-muted">{value}</p>
            </div>
            <div className="flex-1 h-8 bg-ground-secondary rounded relative overflow-hidden">
              <div
                className="absolute w-6 h-6 rounded-full top-1"
                style={{
                  backgroundColor: 'var(--color-accent-primary)',
                  animation: `slide-ball ${parseInt(value) * 4}ms var(--motion-easing-enter) infinite alternate`,
                }}
              />
            </div>
            <div className="w-48">
              <p className="type-caption text-figure-secondary">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide-ball {
          from { left: 4px; }
          to { left: calc(100% - 28px); }
        }
      `}</style>
    </div>
  ),
};

/**
 * Motion philosophy comparison.
 */
export const MotionPhilosophy: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Motion Philosophy</h2>
        <p className="type-body text-figure-secondary mb-6">
          Chinese Aesthetic motion is unhurried and intentional, like calligraphy.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded">
          <h3 className="type-h4 text-figure-primary mb-4">Western UI Motion</h3>
          <ul className="space-y-2">
            <li className="type-body-sm text-figure-secondary">• Fast and efficient (50-200ms)</li>
            <li className="type-body-sm text-figure-secondary">• Snappy, responsive feel</li>
            <li className="type-body-sm text-figure-secondary">• Ease-out for enters</li>
            <li className="type-body-sm text-figure-secondary">• Functional purpose</li>
          </ul>
        </div>

        <div className="p-6 border border-border rounded bg-ground-secondary">
          <h3 className="type-h4 text-figure-primary mb-4">Chinese Aesthetic Motion</h3>
          <ul className="space-y-2">
            <li className="type-body-sm text-figure-secondary">• Contemplative (100-1200ms)</li>
            <li className="type-body-sm text-figure-secondary">• Unhurried, meditative feel</li>
            <li className="type-body-sm text-figure-secondary">• Brush-derived easings</li>
            <li className="type-body-sm text-figure-secondary">• Aesthetic + functional purpose</li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-ground-secondary rounded">
        <p className="type-body text-figure-secondary italic">
          "The brush moves like breath—sometimes quick, sometimes slow, but always with intention."
        </p>
      </div>
    </div>
  ),
};
