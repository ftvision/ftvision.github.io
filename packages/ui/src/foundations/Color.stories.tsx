import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Color',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

interface ColorSwatchProps {
  name: string;
  variable: string;
  className: string;
  textClass?: string;
}

const ColorSwatch = ({ name, variable, className, textClass = 'text-figure-primary' }: ColorSwatchProps) => (
  <div className="flex items-center gap-4">
    <div className={`w-16 h-16 rounded border border-border ${className}`} />
    <div>
      <p className={`type-label ${textClass}`}>{name}</p>
      <p className="type-caption text-figure-muted">{variable}</p>
    </div>
  </div>
);

interface ColorRowProps {
  name: string;
  variable: string;
  className: string;
  hex?: string;
}

const ColorRow = ({ name, variable, className, hex }: ColorRowProps) => (
  <div className="flex items-center gap-4 py-2">
    <div className={`w-12 h-12 rounded border border-border flex-shrink-0 ${className}`} />
    <div className="flex-1 min-w-0">
      <p className="type-label text-figure-primary">{name}</p>
      <p className="type-caption text-figure-muted">{variable}</p>
    </div>
    {hex && <p className="type-caption text-figure-muted font-mono">{hex}</p>}
  </div>
);

/**
 * Background and surface colors for different elevation levels.
 * These define the ground on which content sits.
 */
export const BackgroundColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Background Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          Background colors define the surfaces on which content sits. Use primary for main content areas,
          secondary for subtle differentiation, and tertiary for nested containers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-ground-primary border border-border rounded">
          <p className="type-label text-figure-primary">Primary</p>
          <p className="type-caption text-figure-muted">--color-bg-primary</p>
          <p className="type-body-sm text-figure-secondary mt-2">Main content area</p>
        </div>

        <div className="p-6 bg-ground-secondary border border-border rounded">
          <p className="type-label text-figure-primary">Secondary</p>
          <p className="type-caption text-figure-muted">--color-bg-secondary</p>
          <p className="type-body-sm text-figure-secondary mt-2">Subtle differentiation</p>
        </div>

        <div className="p-6 bg-ground-tertiary border border-border rounded">
          <p className="type-label text-figure-primary">Tertiary</p>
          <p className="type-caption text-figure-muted">--color-bg-tertiary</p>
          <p className="type-body-sm text-figure-secondary mt-2">Nested containers</p>
        </div>

        <div className="p-6 bg-ground-inverse border border-border rounded">
          <p className="type-label text-figure-inverse">Inverse</p>
          <p className="type-caption text-figure-inverse opacity-70">--color-bg-inverse</p>
          <p className="type-body-sm text-figure-inverse opacity-80 mt-2">Inverted contexts</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Text colors for different hierarchical levels.
 * Primary for main content, secondary for supporting text, muted for less important information.
 */
export const TextColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Text Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          Text colors create visual hierarchy. Use primary for main content, secondary for supporting text,
          and muted for metadata or less important information.
        </p>
      </div>

      <div className="space-y-4 p-6 bg-ground-primary border border-border rounded">
        <p className="type-h2 text-figure-primary">Primary Text</p>
        <p className="type-body text-figure-secondary">Secondary text for supporting information and descriptions.</p>
        <p className="type-caption text-figure-muted">Muted text for metadata, timestamps, and less important details.</p>
      </div>

      <div className="space-y-4 p-6 bg-ground-inverse rounded">
        <p className="type-h2 text-figure-inverse">Inverse Text</p>
        <p className="type-body text-figure-inverse opacity-80">Used on dark backgrounds for proper contrast.</p>
      </div>
    </div>
  ),
};

/**
 * The NYT accent blue and supporting accent colors.
 * Used for links, interactive elements, and editorial highlights.
 */
export const AccentColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Accent Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          Accent colors are used sparingly for emphasis, interactive elements, and editorial highlights.
          The primary accent is the classic NYT blue (#326891).
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="h-24 rounded" style={{ backgroundColor: 'var(--color-accent-primary)' }} />
          <p className="type-label text-figure-primary">Primary</p>
          <p className="type-caption text-figure-muted">--color-accent-primary</p>
          <p className="type-caption text-figure-muted font-mono">#326891</p>
        </div>

        <div className="space-y-2">
          <div className="h-24 rounded" style={{ backgroundColor: 'var(--color-accent-secondary)' }} />
          <p className="type-label text-figure-primary">Secondary</p>
          <p className="type-caption text-figure-muted">--color-accent-secondary</p>
        </div>

        <div className="space-y-2">
          <div className="h-24 rounded" style={{ backgroundColor: 'var(--color-accent-tertiary)' }} />
          <p className="type-label text-figure-primary">Tertiary</p>
          <p className="type-caption text-figure-muted">--color-accent-tertiary</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Link colors with hover, visited, and active states.
 * Essential for accessible interactive text elements.
 */
export const LinkColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Link Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          Link colors indicate interactive text. The visited state helps users track their reading history.
        </p>
      </div>

      <div className="space-y-4 p-6 bg-ground-primary border border-border rounded">
        <p className="type-body">
          This is a paragraph with a{' '}
          <a href="#" className="text-link hover:text-link-hover underline">default link</a>
          {' '}that changes on hover.
        </p>
        <p className="type-body">
          This is a{' '}
          <span className="text-link-visited underline">visited link</span>
          {' '}showing where the user has been.
        </p>
        <p className="type-body">
          And this is an{' '}
          <span className="text-link-active underline">active link</span>
          {' '}while being clicked.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <ColorRow name="Default" variable="--color-link-default" className="bg-link" />
        <ColorRow name="Hover" variable="--color-link-hover" className="bg-link-hover" />
        <ColorRow name="Visited" variable="--color-link-visited" className="bg-link-visited" />
        <ColorRow name="Active" variable="--color-link-active" className="bg-link-active" />
      </div>
    </div>
  ),
};

/**
 * Surface colors for distinct content regions like code blocks, quotes, and asides.
 */
export const SurfaceColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Surface Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          Surface colors differentiate content regions. Each serves a specific editorial purpose.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-surface-code rounded font-code">
          <p className="type-caption text-figure-muted mb-2">Code Surface</p>
          <pre className="type-body-sm text-figure-primary">const greeting = &quot;Hello, World!&quot;;</pre>
        </div>

        <div className="p-4 bg-surface-quote border-l-4 border-accent-primary">
          <p className="type-caption text-figure-muted mb-2">Quote Surface</p>
          <blockquote className="type-body text-figure-primary italic">
            &ldquo;Color does not add a pleasant quality to design—it reinforces it.&rdquo;
          </blockquote>
          <cite className="type-caption text-figure-secondary">— Pierre Bonnard</cite>
        </div>

        <div className="p-4 bg-surface-aside rounded border border-border">
          <p className="type-caption text-figure-muted mb-2">Aside Surface</p>
          <p className="type-body-sm text-figure-secondary">
            Additional context or related information that supports the main content.
          </p>
        </div>

        <div className="p-4 bg-ground-primary">
          <p className="type-caption text-figure-muted mb-2">Highlight</p>
          <p className="type-body text-figure-primary">
            Text can be <mark className="bg-surface-highlight px-1">highlighted</mark> to draw attention.
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Status colors for feedback: info, success, warning, and danger.
 */
export const StatusColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Status Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          Status colors communicate system feedback. Each color has a foreground and background variant.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-status-info-bg border border-status-info rounded">
          <p className="type-label text-status-info">Info</p>
          <p className="type-body-sm text-figure-primary mt-1">Informational messages and guidance.</p>
        </div>

        <div className="p-4 bg-status-success-bg border border-status-success rounded">
          <p className="type-label text-status-success">Success</p>
          <p className="type-body-sm text-figure-primary mt-1">Successful actions and confirmations.</p>
        </div>

        <div className="p-4 bg-status-warning-bg border border-status-warning rounded">
          <p className="type-label text-status-warning">Warning</p>
          <p className="type-body-sm text-figure-primary mt-1">Cautions and potential issues.</p>
        </div>

        <div className="p-4 bg-status-danger-bg border border-status-danger rounded">
          <p className="type-label text-status-danger">Danger</p>
          <p className="type-body-sm text-figure-primary mt-1">Errors and destructive actions.</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Data visualization palette with categorical and sequential colors.
 */
export const DataVisualization: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Data Visualization</h2>
        <p className="type-body text-figure-secondary mb-6">
          Coordinated colors for charts and graphics. Categorical colors distinguish different series,
          while sequential colors show progression.
        </p>
      </div>

      <div>
        <h3 className="type-h4 text-figure-primary mb-4">Categorical Colors</h3>
        <p className="type-body-sm text-figure-secondary mb-4">
          Use for distinct categories in bar charts, pie charts, and legends.
        </p>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 h-16 bg-data-1 rounded" />
          <div className="flex-1 h-16 bg-data-2 rounded" />
          <div className="flex-1 h-16 bg-data-3 rounded" />
          <div className="flex-1 h-16 bg-data-4 rounded" />
          <div className="flex-1 h-16 bg-data-5 rounded" />
          <div className="flex-1 h-16 bg-data-6 rounded" />
        </div>
        <div className="grid grid-cols-6 gap-2">
          <p className="type-caption text-figure-muted text-center">data-1</p>
          <p className="type-caption text-figure-muted text-center">data-2</p>
          <p className="type-caption text-figure-muted text-center">data-3</p>
          <p className="type-caption text-figure-muted text-center">data-4</p>
          <p className="type-caption text-figure-muted text-center">data-5</p>
          <p className="type-caption text-figure-muted text-center">data-6</p>
        </div>
      </div>

      <div>
        <h3 className="type-h4 text-figure-primary mb-4">Sequential Colors</h3>
        <p className="type-body-sm text-figure-secondary mb-4">
          Use for heat maps, choropleth maps, and showing intensity or progression.
        </p>
        <div className="flex gap-0 mb-4">
          <div className="flex-1 h-16 bg-data-seq-1" />
          <div className="flex-1 h-16 bg-data-seq-2" />
          <div className="flex-1 h-16 bg-data-seq-3" />
          <div className="flex-1 h-16 bg-data-seq-4" />
          <div className="flex-1 h-16 bg-data-seq-5" />
        </div>
        <div className="flex justify-between">
          <p className="type-caption text-figure-muted">Low</p>
          <p className="type-caption text-figure-muted">High</p>
        </div>
      </div>

      <div className="p-6 bg-ground-secondary rounded">
        <h3 className="type-h4 text-figure-primary mb-4">Example: Simple Bar Chart</h3>
        <div className="flex items-end gap-2 h-40">
          <div className="flex-1 bg-data-1 rounded-t" style={{ height: '60%' }} />
          <div className="flex-1 bg-data-2 rounded-t" style={{ height: '85%' }} />
          <div className="flex-1 bg-data-3 rounded-t" style={{ height: '45%' }} />
          <div className="flex-1 bg-data-4 rounded-t" style={{ height: '70%' }} />
          <div className="flex-1 bg-data-5 rounded-t" style={{ height: '55%' }} />
          <div className="flex-1 bg-data-6 rounded-t" style={{ height: '90%' }} />
        </div>
        <div className="flex gap-2 mt-2">
          <p className="flex-1 type-caption text-figure-muted text-center">Jan</p>
          <p className="flex-1 type-caption text-figure-muted text-center">Feb</p>
          <p className="flex-1 type-caption text-figure-muted text-center">Mar</p>
          <p className="flex-1 type-caption text-figure-muted text-center">Apr</p>
          <p className="flex-1 type-caption text-figure-muted text-center">May</p>
          <p className="flex-1 type-caption text-figure-muted text-center">Jun</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Overlay colors for modals, image overlays, and scrims.
 */
export const OverlayColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Overlay Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          Overlay colors create depth and focus. Use scrims for modals, and light/dark overlays for images with text.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="relative h-40 bg-ground-tertiary rounded overflow-hidden">
          <div className="absolute inset-0 bg-overlay-scrim" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="type-label text-white">Scrim (50%)</p>
          </div>
        </div>

        <div className="relative h-40 bg-ground-inverse rounded overflow-hidden">
          <div className="absolute inset-0 bg-overlay-light" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="type-label text-figure-primary">Light Overlay</p>
          </div>
        </div>

        <div className="relative h-40 bg-ground-secondary rounded overflow-hidden">
          <div className="absolute inset-0 bg-overlay-dark" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="type-label text-white">Dark Overlay</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Focus ring colors for accessibility.
 */
export const FocusColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Focus Colors</h2>
        <p className="type-body text-figure-secondary mb-6">
          Focus rings indicate keyboard focus for accessibility. They must be visible against all backgrounds.
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <button
          className="px-4 py-2 bg-action-primary text-figure-inverse rounded ring-2 ring-focus-ring ring-offset-2 ring-offset-focus-ring-offset"
        >
          Focused Button
        </button>
        <input
          type="text"
          placeholder="Focused Input"
          className="px-4 py-2 border border-border rounded ring-2 ring-focus-ring ring-offset-2 ring-offset-focus-ring-offset"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <ColorRow name="Focus Ring" variable="--color-focus-ring" className="bg-focus-ring" />
        <ColorRow name="Ring Offset" variable="--color-focus-ring-offset" className="bg-focus-ring-offset border" />
      </div>
    </div>
  ),
};

/**
 * Complete color palette overview with all token categories.
 */
export const CompletePalette: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Complete Color Palette</h2>
        <p className="type-body text-figure-secondary mb-6">
          All semantic color tokens organized by category. Each token maps to CSS custom properties
          that adapt automatically between light and dark modes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="type-h4 text-figure-primary mb-4 border-b border-border pb-2">Background</h3>
          <div className="space-y-2">
            <ColorRow name="Primary" variable="bg-primary" className="bg-ground-primary border" />
            <ColorRow name="Secondary" variable="bg-secondary" className="bg-ground-secondary" />
            <ColorRow name="Tertiary" variable="bg-tertiary" className="bg-ground-tertiary" />
            <ColorRow name="Inverse" variable="bg-inverse" className="bg-ground-inverse" />
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4 border-b border-border pb-2">Text</h3>
          <div className="space-y-2">
            <ColorRow name="Primary" variable="text-primary" className="bg-figure-primary" />
            <ColorRow name="Secondary" variable="text-secondary" className="bg-figure-secondary" />
            <ColorRow name="Muted" variable="text-muted" className="bg-figure-muted" />
            <ColorRow name="Inverse" variable="text-inverse" className="bg-figure-inverse border" />
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4 border-b border-border pb-2">Accent</h3>
          <div className="space-y-2">
            <ColorRow name="Primary" variable="accent-primary" className="bg-accent-primary" />
            <ColorRow name="Secondary" variable="accent-secondary" className="bg-accent-secondary" />
            <ColorRow name="Tertiary" variable="accent-tertiary" className="bg-accent-tertiary" />
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4 border-b border-border pb-2">Link</h3>
          <div className="space-y-2">
            <ColorRow name="Default" variable="link-default" className="bg-link" />
            <ColorRow name="Hover" variable="link-hover" className="bg-link-hover" />
            <ColorRow name="Visited" variable="link-visited" className="bg-link-visited" />
            <ColorRow name="Active" variable="link-active" className="bg-link-active" />
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4 border-b border-border pb-2">Surface</h3>
          <div className="space-y-2">
            <ColorRow name="Code" variable="surface-code" className="bg-surface-code" />
            <ColorRow name="Quote" variable="surface-quote" className="bg-surface-quote" />
            <ColorRow name="Aside" variable="surface-aside" className="bg-surface-aside" />
            <ColorRow name="Highlight" variable="surface-highlight" className="bg-surface-highlight" />
            <ColorRow name="Elevated" variable="surface-elevated" className="bg-surface-elevated border" />
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4 border-b border-border pb-2">Status</h3>
          <div className="space-y-2">
            <ColorRow name="Info" variable="status-info" className="bg-status-info" />
            <ColorRow name="Success" variable="status-success" className="bg-status-success" />
            <ColorRow name="Warning" variable="status-warning" className="bg-status-warning" />
            <ColorRow name="Danger" variable="status-danger" className="bg-status-danger" />
          </div>
        </div>
      </div>
    </div>
  ),
};
