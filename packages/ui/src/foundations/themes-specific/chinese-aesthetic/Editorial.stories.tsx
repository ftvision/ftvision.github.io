import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Themes/Chinese Aesthetic/Editorial',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Editorial context showing the Chinese Aesthetic theme in a realistic article layout.
 */
export const ArticleLayout: Story = {
  render: () => (
    <article className="max-w-2xl">
      <header style={{ marginBottom: 'var(--spacing-breath)' }}>
        <span className="type-overline text-accent-primary">随笔 Essay</span>
        <h1 className="type-display text-figure-primary mt-2">On Emptiness and Intention</h1>
        <p className="type-h3 text-figure-secondary mt-2" style={{ fontWeight: 400 }}>
          留白与意在笔先
        </p>
        <p className="type-body-sm text-figure-secondary mt-6">
          Reflections on the philosophy that guides this design system
        </p>
        <div className="flex items-center gap-3 mt-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: 'var(--color-accent-primary)' }}
          >
            <span className="type-caption">印</span>
          </div>
          <p className="type-caption text-figure-muted">By the Scholar | 庚子年冬</p>
        </div>
      </header>

      <div className="space-y-6">
        <p className="type-body text-figure-primary">
          计白当黑 — "Count the white as black." In Chinese painting, the areas without ink are not
          empty. They are mist between mountains, silence between words, the space where imagination
          completes what the artist deliberately left unfinished.
        </p>

        <p className="type-body text-figure-primary">
          This is not Western minimalism, which removes until function is served. Chinese emptiness
          adds absence until presence is felt. The difference is subtle but profound.
        </p>

        <h2
          className="type-h2 text-figure-primary"
          style={{ marginTop: 'var(--spacing-breath)' }}
        >
          意在笔先
        </h2>
        <p
          className="type-caption text-figure-muted"
          style={{ marginTop: '-0.5rem', marginBottom: '1rem' }}
        >
          Intent Before Execution
        </p>

        <p className="type-body text-figure-primary">
          The calligrapher conceives the entire character—its energy, its rhythm, its spirit—before
          the brush touches paper. Once begun, there is no revision. The work is completed in the
          mind before it manifests.
        </p>

        <figure className="border-l-2 pl-6 my-8" style={{ borderColor: 'var(--color-accent-primary)' }}>
          <blockquote className="type-h3 text-figure-secondary italic">
            "书法之妙，在于神韵，不在于形似。"
          </blockquote>
          <p className="type-body text-figure-secondary mt-2">
            "The wonder of calligraphy lies in spirit resonance, not formal likeness."
          </p>
          <figcaption className="type-caption text-figure-muted mt-4">
            — 王羲之 (Wang Xizhi), the Sage of Calligraphy
          </figcaption>
        </figure>

        <p className="type-body text-figure-primary">
          Every token, every component, every interaction should feel inevitable. Not labored over,
          but arrived at. Design decisions are not compromises between options—they are expressions
          of a unified vision that existed before implementation began.
        </p>
      </div>

      <footer style={{ marginTop: 'var(--spacing-void)' }} className="border-t border-border pt-8">
        <p className="type-caption text-figure-muted text-center">
          Our readers are guests in the scholar's studio. This system is how we welcome them.
        </p>
      </footer>
    </article>
  ),
};

/**
 * Component showcase demonstrating how standard components adapt to the Chinese Aesthetic theme.
 */
export const ComponentShowcase: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Components in Context</h2>
        <p className="type-body text-figure-secondary mb-8">
          Standard components automatically adapt to the Chinese Aesthetic theme through token
          inheritance.
        </p>
      </div>

      {/* Buttons */}
      <div>
        <h3 className="type-h3 text-figure-primary mb-4">Actions</h3>
        <div className="flex gap-4 items-center">
          <button className="px-6 py-2 bg-action-primary text-figure-inverse rounded transition-colors hover:opacity-90">
            Primary 主要
          </button>
          <button className="px-6 py-2 border border-border text-figure-primary rounded transition-colors hover:bg-ground-secondary">
            Secondary 次要
          </button>
          <a href="#" className="text-link underline hover:text-link-hover transition-colors">
            Link 链接
          </a>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 className="type-h3 text-figure-primary mb-4">Surfaces</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-surface-elevated rounded border border-border">
            <p className="type-label text-figure-primary mb-2">Elevated Card</p>
            <p className="type-body-sm text-figure-secondary">
              Uses paper.silk background for a subtle lift.
            </p>
          </div>
          <div className="p-6 bg-surface-quote rounded">
            <p className="type-label text-figure-primary mb-2">Quote Surface</p>
            <p className="type-body-sm text-figure-secondary italic">"温故而知新"</p>
          </div>
          <div className="p-6 bg-surface-code rounded font-mono">
            <p className="type-label text-figure-primary mb-2">Code Surface</p>
            <p className="type-body-sm text-figure-secondary">const wisdom = true;</p>
          </div>
        </div>
      </div>

      {/* Status Colors */}
      <div>
        <h3 className="type-h3 text-figure-primary mb-4">Status (Traditional Colors)</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-status-info-bg border border-status-info rounded">
            <p className="type-label text-status-info">Info 青</p>
            <p className="type-caption text-figure-primary mt-1">Scholar's blue</p>
          </div>
          <div className="p-4 bg-status-success-bg border border-status-success rounded">
            <p className="type-label text-status-success">Success 玉绿</p>
            <p className="type-caption text-figure-primary mt-1">Jade green</p>
          </div>
          <div className="p-4 bg-status-warning-bg border border-status-warning rounded">
            <p className="type-label text-status-warning">Warning 黄</p>
            <p className="type-caption text-figure-primary mt-1">Imperial yellow</p>
          </div>
          <div className="p-4 bg-status-danger-bg border border-status-danger rounded">
            <p className="type-label text-status-danger">Danger 朱砂</p>
            <p className="type-caption text-figure-primary mt-1">Cinnabar</p>
          </div>
        </div>
      </div>

      {/* Accent Usage */}
      <div>
        <h3 className="type-h3 text-figure-primary mb-4">Accent Colors as Punctuation</h3>
        <p className="type-body-sm text-figure-secondary mb-4">
          Like a seal stamp on a painting—rare, meaningful, confident.
        </p>
        <div className="flex gap-6">
          <div className="flex-1 p-6 border border-border rounded">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: 'var(--color-accent-primary)' }}
              />
              <span className="type-label text-figure-primary">Seal Red</span>
            </div>
            <p className="type-body-sm text-figure-secondary">Primary actions, links, signatures</p>
          </div>
          <div className="flex-1 p-6 border border-border rounded">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: 'var(--color-accent-secondary)' }}
              />
              <span className="type-label text-figure-primary">Celadon</span>
            </div>
            <p className="type-body-sm text-figure-secondary">Success states, nature themes</p>
          </div>
          <div className="flex-1 p-6 border border-border rounded">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: 'var(--color-accent-tertiary)' }}
              />
              <span className="type-label text-figure-primary">Old Gold</span>
            </div>
            <p className="type-body-sm text-figure-secondary">Tertiary highlights, decorative</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
