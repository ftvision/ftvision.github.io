import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const sampleText = 'The quick brown fox jumps over the lazy dog';
const longText =
  'When a reader encounters a Times headline, they do not consciously register the typography. They simply feel: this is important. That feeling is not magic. It is the accumulated weight of a consistent system applied thousands of times until it becomes invisible.';

/**
 * The complete type scale using semantic `.type-*` utilities.
 * Each level includes size, line-height, weight, letter-spacing, and font-family.
 */
export const TypeScale: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Display</span>
        <p className="type-display text-figure-primary mt-2">
          {sampleText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          3.052rem / 1.1 / 700 / -0.02em
        </p>
      </div>

      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Heading 1</span>
        <p className="type-h1 text-figure-primary mt-2">
          {sampleText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          2.441rem / 1.15 / 700 / -0.01em
        </p>
      </div>

      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Heading 2</span>
        <p className="type-h2 text-figure-primary mt-2">
          {sampleText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          1.953rem / 1.2 / 600 / -0.01em
        </p>
      </div>

      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Heading 3</span>
        <p className="type-h3 text-figure-primary mt-2">
          {sampleText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          1.563rem / 1.25 / 600 / 0
        </p>
      </div>

      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Heading 4</span>
        <p className="type-h4 text-figure-primary mt-2">
          {sampleText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          1.25rem / 1.3 / 500 / 0
        </p>
      </div>

      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Body</span>
        <p className="type-body text-figure-primary mt-2">
          {longText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          1rem / 1.6 / 400 / 0
        </p>
      </div>

      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Body Small</span>
        <p className="type-body-sm text-figure-primary mt-2">
          {longText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          0.875rem / 1.5 / 400 / 0
        </p>
      </div>

      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Caption</span>
        <p className="type-caption text-figure-primary mt-2">
          {sampleText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          0.8rem / 1.5 / 400 / 0.01em
        </p>
      </div>

      <div className="border-b border-border pb-4">
        <span className="type-overline text-figure-muted">Label</span>
        <p className="type-label text-figure-primary mt-2">
          {sampleText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          0.8rem / 1.5 / 500 / 0.01em
        </p>
      </div>

      <div>
        <span className="type-overline text-figure-muted">Overline</span>
        <p className="type-overline text-figure-primary mt-2">
          {sampleText}
        </p>
        <p className="type-caption text-figure-muted mt-2">
          0.8rem / 1.3 / 600 / 0.08em / uppercase
        </p>
      </div>
    </div>
  ),
};

/**
 * Editorial context example showing typography in a realistic article layout.
 */
export const EditorialContext: Story = {
  render: () => (
    <article className="max-w-2xl">
      <header className="mb-8">
        <span className="type-overline text-figure-muted">Opinion</span>
        <h1 className="type-display text-figure-primary mt-2">
          The Design System That Dares to Disappear
        </h1>
        <p className="type-body-sm text-figure-secondary mt-4">
          On building interfaces that serve the content, not themselves
        </p>
        <p className="type-caption text-figure-muted mt-4">
          By Jane Designer | December 13, 2024
        </p>
      </header>

      <div className="space-y-6">
        <p className="type-body text-figure-primary">
          When a reader encounters a well-designed page, they do not consciously register the
          typography. They simply feel: this is trustworthy. That feeling is not magic. It is
          the accumulated weight of a consistent system applied thousands of times until it
          becomes invisible.
        </p>

        <h2 className="type-h2 text-figure-primary">
          The Three Laws of Editorial Typography
        </h2>

        <p className="type-body text-figure-primary">
          First, hierarchy must be unambiguous. If two text elements could be confused for
          the same level, the system has failed. Headlines and subheads must be visually
          distinct at a glance—not through subtle 2px differences, but through clear,
          confident contrast in size and weight.
        </p>

        <h3 className="type-h3 text-figure-primary">
          Reading is Rhythm
        </h3>

        <p className="type-body text-figure-primary">
          Body text exists to be consumed in long stretches. The interplay of font size,
          line height, and line length creates a cadence. Too tight, the eye stumbles.
          Too loose, attention drifts. The tokens must encode optimal reading rhythm,
          not just sizes.
        </p>

        <h4 className="type-h4 text-figure-primary">
          Scale Creates Harmony
        </h4>

        <p className="type-body text-figure-primary">
          A 1.25 type scale is not arbitrary—it is musical. Each step relates to the
          others mathematically. Random sizes create visual dissonance. Our scale is deliberate.
        </p>

        <figure className="my-8 border-l-2 border-border pl-4">
          <blockquote className="type-h3 text-figure-secondary italic">
            "The role of the designer is to be a good host, to anticipate the needs of the guest."
          </blockquote>
          <figcaption className="type-caption text-figure-muted mt-2">
            — Charles Eames
          </figcaption>
        </figure>

        <p className="type-body text-figure-primary">
          Our readers are our guests. This system is how we welcome them.
        </p>
      </div>
    </article>
  ),
};

/**
 * Visual comparison of all text sizes for at-a-glance hierarchy verification.
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="type-display text-figure-primary">Display — 3.052rem (49px)</p>
      <p className="type-h1 text-figure-primary">Heading 1 — 2.441rem (39px)</p>
      <p className="type-h2 text-figure-primary">Heading 2 — 1.953rem (31px)</p>
      <p className="type-h3 text-figure-primary">Heading 3 — 1.563rem (25px)</p>
      <p className="type-h4 text-figure-primary">Heading 4 — 1.25rem (20px)</p>
      <p className="type-body text-figure-primary">Body — 1rem (16px)</p>
      <p className="type-body-sm text-figure-primary">Body Small — 0.875rem (14px)</p>
      <p className="type-caption text-figure-primary">Caption — 0.8rem (13px)</p>
      <p className="type-label text-figure-primary">Label — 0.8rem (13px)</p>
      <p className="type-overline text-figure-primary">Overline — 0.8rem (13px)</p>
    </div>
  ),
};

/**
 * Tailwind utility classes for typography.
 * Shows the two approaches: `.type-*` (complete) and `text-*` (size+line-height only).
 */
export const TailwindUtilities: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">
          Complete Type Utilities (Recommended)
        </h2>
        <p className="type-body text-figure-secondary mb-4">
          Use <code className="font-code bg-ground-secondary px-1 rounded">.type-*</code> classes
          for complete typographic styling including font-family, size, weight, line-height,
          and letter-spacing.
        </p>
        <div className="bg-ground-secondary p-4 rounded font-code type-body-sm">
          <p>.type-display</p>
          <p>.type-h1, .type-h2, .type-h3, .type-h4</p>
          <p>.type-body, .type-body-sm</p>
          <p>.type-caption, .type-label, .type-overline</p>
        </div>
      </div>

      <div>
        <h2 className="type-h3 text-figure-primary mb-4">
          Size-Only Utilities
        </h2>
        <p className="type-body text-figure-secondary mb-4">
          Use <code className="font-code bg-ground-secondary px-1 rounded">text-*</code> classes
          when you only need to set font-size and line-height (e.g., for custom weight/family).
        </p>
        <div className="bg-ground-secondary p-4 rounded font-code type-body-sm">
          <p>text-display, text-h1, text-h2, text-h3, text-h4</p>
          <p>text-body, text-body-sm, text-caption, text-label, text-overline</p>
        </div>
      </div>

      <div>
        <h2 className="type-h3 text-figure-primary mb-4">
          Font Weight Utilities
        </h2>
        <p className="type-body text-figure-secondary mb-4">
          Semantic weight utilities that match each type level's default weight.
        </p>
        <div className="bg-ground-secondary p-4 rounded font-code type-body-sm">
          <p>font-display (700), font-h1 (700), font-h2 (600)</p>
          <p>font-h3 (600), font-h4 (500), font-body (400)</p>
          <p>font-label (500), font-overline (600)</p>
        </div>
      </div>
    </div>
  ),
};
