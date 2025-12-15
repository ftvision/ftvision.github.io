import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const SpacingBlock = ({ size, label }: { size: string; label: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-24 type-caption text-figure-muted text-right">{label}</div>
    <div
      className="bg-action-primary h-4"
      style={{ width: `var(--spacing-${size})` }}
    />
    <div className="type-caption text-figure-secondary">
      {size}
    </div>
  </div>
);

/**
 * Stack spacing is for vertical spacing between stacked elements.
 * Use for margins between paragraphs, form fields, and list items.
 */
export const Stack: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">Stack Spacing</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Vertical spacing between stacked elements. "How much air between this and the next thing?"
        </p>
      </div>
      <div className="space-y-3 p-inset-md bg-ground-secondary rounded">
        <SpacingBlock size="stack-xs" label="4px" />
        <SpacingBlock size="stack-sm" label="8px" />
        <SpacingBlock size="stack-md" label="16px" />
        <SpacingBlock size="stack-lg" label="24px" />
        <SpacingBlock size="stack-xl" label="32px" />
        <SpacingBlock size="stack-2xl" label="48px" />
        <SpacingBlock size="stack-3xl" label="64px" />
      </div>
    </div>
  ),
};

/**
 * Inline spacing is for horizontal spacing between inline elements.
 * Use for gaps between icons and text, buttons in a row.
 */
export const Inline: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">Inline Spacing</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Horizontal spacing between inline elements. "How much air between this and the thing beside it?"
        </p>
      </div>
      <div className="space-y-3 p-inset-md bg-ground-secondary rounded">
        <SpacingBlock size="inline-xs" label="4px" />
        <SpacingBlock size="inline-sm" label="8px" />
        <SpacingBlock size="inline-md" label="16px" />
        <SpacingBlock size="inline-lg" label="24px" />
        <SpacingBlock size="inline-xl" label="32px" />
      </div>
    </div>
  ),
};

/**
 * Inset spacing is for internal padding within containers.
 * Use for card padding, modal padding, button padding.
 */
export const Inset: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">Inset Spacing</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Internal padding within containers. "How much breathing room inside this box?"
        </p>
      </div>
      <div className="space-y-3 p-inset-md bg-ground-secondary rounded">
        <SpacingBlock size="inset-xs" label="4px" />
        <SpacingBlock size="inset-sm" label="8px" />
        <SpacingBlock size="inset-md" label="16px" />
        <SpacingBlock size="inset-lg" label="24px" />
        <SpacingBlock size="inset-xl" label="32px" />
      </div>
    </div>
  ),
};

/**
 * Gutter spacing is for space between columns or grid items.
 * Use for grid gaps, column gaps in layouts.
 */
export const Gutter: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">Gutter Spacing</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Space between columns or grid items. "How much air between grid cells?"
        </p>
      </div>
      <div className="space-y-3 p-inset-md bg-ground-secondary rounded">
        <SpacingBlock size="gutter-xs" label="8px" />
        <SpacingBlock size="gutter-sm" label="12px" />
        <SpacingBlock size="gutter-md" label="16px" />
        <SpacingBlock size="gutter-lg" label="24px" />
        <SpacingBlock size="gutter-xl" label="32px" />
      </div>
    </div>
  ),
};

/**
 * Section spacing is for large-scale spacing between major page sections.
 * Use for separating hero from content, footer from main, etc.
 */
export const Section: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">Section Spacing</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Large-scale spacing between major page sections. "How much air between this section and the next?"
        </p>
      </div>
      <div className="space-y-3 p-inset-md bg-ground-secondary rounded">
        <SpacingBlock size="section-sm" label="32px" />
        <SpacingBlock size="section-md" label="48px" />
        <SpacingBlock size="section-lg" label="64px" />
        <SpacingBlock size="section-xl" label="80px" />
        <SpacingBlock size="section-2xl" label="96px" />
      </div>
    </div>
  ),
};

/**
 * Demonstrates spacing in context with typography relationships.
 */
export const TypographyRelationship: Story = {
  render: () => (
    <div className="max-w-xl">
      <h2 className="type-h3 text-figure-primary mb-stack-md">Typography & Spacing</h2>

      <div className="p-inset-lg bg-ground-secondary rounded mb-stack-lg">
        <p className="type-caption text-figure-muted mb-stack-xs">Heading-to-Body: stack-sm (8px)</p>
        <div className="border-l-2 border-action-primary pl-inset-md">
          <h3 className="type-h2 text-figure-primary">Article Headline</h3>
          <div className="h-stack-sm" />
          <p className="type-body text-figure-primary">
            First paragraph of body text. The tight spacing indicates this content
            belongs to the heading above.
          </p>
        </div>
      </div>

      <div className="p-inset-lg bg-ground-secondary rounded mb-stack-lg">
        <p className="type-caption text-figure-muted mb-stack-xs">Paragraph-to-Paragraph: stack-md (16px)</p>
        <div className="border-l-2 border-action-primary pl-inset-md">
          <p className="type-body text-figure-primary">
            First paragraph ends here. The normal paragraph spacing creates
            rhythm without suggesting a new section.
          </p>
          <div className="h-stack-md" />
          <p className="type-body text-figure-primary">
            Second paragraph begins. The consistent spacing creates a
            comfortable reading cadence.
          </p>
        </div>
      </div>

      <div className="p-inset-lg bg-ground-secondary rounded">
        <p className="type-caption text-figure-muted mb-stack-xs">Section-to-Section: stack-2xl (48px)</p>
        <div className="border-l-2 border-action-primary pl-inset-md">
          <p className="type-body text-figure-primary">
            End of Section A. The large spacing clearly indicates a major
            content boundary.
          </p>
          <div className="h-stack-2xl" />
          <h3 className="type-h2 text-figure-primary">Section B</h3>
          <div className="h-stack-sm" />
          <p className="type-body text-figure-primary">
            Beginning of new section. Readers immediately understand
            this is a distinct topic.
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Examples of inset padding applied to containers.
 */
export const InsetExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="type-h3 text-figure-primary">Inset Padding Examples</h2>

      <div className="flex gap-gutter-lg flex-wrap">
        <div className="p-inset-xs bg-ground-secondary border border-border rounded">
          <p className="type-caption text-figure-primary">inset-xs (4px)</p>
          <p className="type-caption text-figure-muted">Badges, chips</p>
        </div>

        <div className="p-inset-sm bg-ground-secondary border border-border rounded">
          <p className="type-caption text-figure-primary">inset-sm (8px)</p>
          <p className="type-caption text-figure-muted">Compact buttons</p>
        </div>

        <div className="p-inset-md bg-ground-secondary border border-border rounded">
          <p className="type-body-sm text-figure-primary">inset-md (16px)</p>
          <p className="type-caption text-figure-muted">Default cards</p>
        </div>

        <div className="p-inset-lg bg-ground-secondary border border-border rounded">
          <p className="type-body text-figure-primary">inset-lg (24px)</p>
          <p className="type-caption text-figure-muted">Generous cards</p>
        </div>

        <div className="p-inset-xl bg-ground-secondary border border-border rounded">
          <p className="type-body text-figure-primary">inset-xl (32px)</p>
          <p className="type-caption text-figure-muted">Modals, dialogs</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Grid layout example using gutter spacing.
 * The colored backgrounds make the gaps clearly visible.
 */
export const GridExample: Story = {
  render: () => (
    <div className="space-y-12">
      <h2 className="type-h3 text-figure-primary">Grid with Gutter Spacing</h2>
      <p className="type-body-sm text-figure-secondary">
        The gaps between grid items increase from 8px to 32px.
        Notice how the spacing affects the visual density.
      </p>

      <div>
        <p className="type-label text-figure-primary mb-2">gap-gutter-xs (8px) — Tight</p>
        <div className="bg-action-primary/20 p-1 rounded">
          <div className="grid grid-cols-4 gap-gutter-xs">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="p-inset-sm bg-ground-primary border border-border rounded text-center">
                <p className="type-caption text-figure-primary">{n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="type-label text-figure-primary mb-2">gap-gutter-md (16px) — Default</p>
        <div className="bg-action-primary/20 p-1 rounded">
          <div className="grid grid-cols-4 gap-gutter-md">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="p-inset-sm bg-ground-primary border border-border rounded text-center">
                <p className="type-caption text-figure-primary">{n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="type-label text-figure-primary mb-2">gap-gutter-xl (32px) — Wide</p>
        <div className="bg-action-primary/20 p-1 rounded">
          <div className="grid grid-cols-4 gap-gutter-xl">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="p-inset-sm bg-ground-primary border border-border rounded text-center">
                <p className="type-caption text-figure-primary">{n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Tailwind utility class reference for spacing.
 */
export const TailwindUtilities: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-md">Spacing Utilities</h2>
        <p className="type-body text-figure-secondary mb-stack-lg">
          Semantic spacing tokens work with all Tailwind spacing utilities:
          margin, padding, gap, width, height.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-gutter-lg">
        <div className="p-inset-md bg-ground-secondary rounded">
          <h3 className="type-h4 text-figure-primary mb-stack-sm">Margin</h3>
          <div className="font-code type-caption space-y-1">
            <p>m-stack-md, mt-stack-lg</p>
            <p>mx-inline-sm, my-stack-md</p>
            <p>mb-stack-xl, ml-inline-xs</p>
          </div>
        </div>

        <div className="p-inset-md bg-ground-secondary rounded">
          <h3 className="type-h4 text-figure-primary mb-stack-sm">Padding</h3>
          <div className="font-code type-caption space-y-1">
            <p>p-inset-md, p-inset-lg</p>
            <p>px-inset-md, py-inset-sm</p>
            <p>pt-inset-lg, pr-inset-md</p>
          </div>
        </div>

        <div className="p-inset-md bg-ground-secondary rounded">
          <h3 className="type-h4 text-figure-primary mb-stack-sm">Gap</h3>
          <div className="font-code type-caption space-y-1">
            <p>gap-gutter-md, gap-gutter-lg</p>
            <p>gap-x-inline-sm, gap-y-stack-md</p>
          </div>
        </div>

        <div className="p-inset-md bg-ground-secondary rounded">
          <h3 className="type-h4 text-figure-primary mb-stack-sm">Size</h3>
          <div className="font-code type-caption space-y-1">
            <p>w-stack-xl, h-section-md</p>
            <p>min-h-section-lg</p>
            <p>space-y-stack-md</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
