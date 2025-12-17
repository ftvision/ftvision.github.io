import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Themes/Chinese Aesthetic/Color',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * The Chinese Aesthetic theme's cross-dynasty color palette.
 * Ink gradients, paper tones, stone surfaces, and traditional accent colors.
 */
export const InkGradients: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">墨分五色 — Ink Divided Into Five Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          From scorched black (焦) to clear wash (清) — the full range of ink density.
        </p>
      </div>

      <div className="flex gap-0 h-24 rounded overflow-hidden">
        <div className="flex-1 flex items-end justify-center pb-2" style={{ backgroundColor: '#0A0A0A' }}>
          <span className="type-caption text-white">焦 Scorched</span>
        </div>
        <div className="flex-1 flex items-end justify-center pb-2" style={{ backgroundColor: '#1A1A1A' }}>
          <span className="type-caption text-white">浓 Dense</span>
        </div>
        <div className="flex-1 flex items-end justify-center pb-2" style={{ backgroundColor: '#2E2E2E' }}>
          <span className="type-caption text-white">重 Heavy</span>
        </div>
        <div className="flex-1 flex items-end justify-center pb-2" style={{ backgroundColor: '#525252' }}>
          <span className="type-caption text-white">中 Medium</span>
        </div>
        <div className="flex-1 flex items-end justify-center pb-2" style={{ backgroundColor: '#8B8B8B' }}>
          <span className="type-caption text-figure-primary">淡 Light</span>
        </div>
        <div className="flex-1 flex items-end justify-center pb-2" style={{ backgroundColor: '#B8B8B8' }}>
          <span className="type-caption text-figure-primary">薄 Faint</span>
        </div>
        <div className="flex-1 flex items-end justify-center pb-2" style={{ backgroundColor: '#E5E0D8' }}>
          <span className="type-caption text-figure-primary">清 Wash</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Paper tones for light mode backgrounds.
 */
export const PaperTones: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">纸色 — Paper Tones</h2>
        <p className="type-body text-figure-secondary mb-6">
          Warm whites that feel like aged Xuan paper, not clinical LCD white.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 p-6 rounded border border-border" style={{ backgroundColor: '#F8F5F0' }}>
          <p className="type-label text-figure-primary">Aged Paper</p>
          <p className="type-caption text-figure-muted">旧纸 #F8F5F0</p>
        </div>
        <div className="flex-1 p-6 rounded border border-border" style={{ backgroundColor: '#FFFEF9' }}>
          <p className="type-label text-figure-primary">Raw Silk</p>
          <p className="type-caption text-figure-muted">绢 #FFFEF9</p>
        </div>
        <div className="flex-1 p-6 rounded border border-border" style={{ backgroundColor: '#F5F3ED' }}>
          <p className="type-label text-figure-primary">Xuan Paper</p>
          <p className="type-caption text-figure-muted">宣纸 #F5F3ED</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Stone surfaces for dark mode backgrounds.
 */
export const StoneSurfaces: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">石色 — Stone Surfaces (Dark Mode)</h2>
        <p className="type-body text-figure-secondary mb-6">
          Not LCD black—the warm darkness of inkstone and mountain rock.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 p-6 rounded" style={{ backgroundColor: '#121210' }}>
          <p className="type-label text-white">Inkstone</p>
          <p className="type-caption text-gray-400">砚 #121210</p>
        </div>
        <div className="flex-1 p-6 rounded" style={{ backgroundColor: '#1E1E1C' }}>
          <p className="type-label text-white">Slate</p>
          <p className="type-caption text-gray-400">板岩 #1E1E1C</p>
        </div>
        <div className="flex-1 p-6 rounded" style={{ backgroundColor: '#2A2A28' }}>
          <p className="type-label text-white">Mountain Rock</p>
          <p className="type-caption text-gray-400">山石 #2A2A28</p>
        </div>
        <div className="flex-1 p-6 rounded" style={{ backgroundColor: '#3D3D3A' }}>
          <p className="type-label text-white">Weathered Stone</p>
          <p className="type-caption text-gray-400">风化石 #3D3D3A</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Cross-dynasty accent colors: Seal Red, Celadon, Old Gold.
 */
export const AccentColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Cross-Dynasty Accents</h2>
        <p className="type-body text-figure-secondary mb-6">
          A cross-dynasty synthesis: Song celadon for calm, Tang vermillion for accent.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <div className="h-24 rounded mb-2" style={{ backgroundColor: '#C14B3E' }} />
          <p className="type-label text-figure-primary">Seal Red 印泥红</p>
          <p className="type-caption text-figure-muted">Tang Dynasty punctuation</p>
          <p className="type-caption text-figure-muted font-mono">#C14B3E</p>
        </div>
        <div>
          <div className="h-24 rounded mb-2" style={{ backgroundColor: '#8FAE89' }} />
          <p className="type-label text-figure-primary">Celadon Green 青瓷绿</p>
          <p className="type-caption text-figure-muted">Song Dynasty refinement</p>
          <p className="type-caption text-figure-muted font-mono">#8FAE89</p>
        </div>
        <div>
          <div className="h-24 rounded mb-2" style={{ backgroundColor: '#B8860B' }} />
          <p className="type-label text-figure-primary">Old Gold 古金</p>
          <p className="type-caption text-figure-muted">Tang Dynasty confidence</p>
          <p className="type-caption text-figure-muted font-mono">#B8860B</p>
        </div>
      </div>
    </div>
  ),
};
