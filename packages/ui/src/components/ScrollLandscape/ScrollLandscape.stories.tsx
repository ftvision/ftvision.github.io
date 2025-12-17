import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ScrollLandscape } from './ScrollLandscape';

const meta: Meta<typeof ScrollLandscape> = {
  title: 'Components/Themes/Chinese Aesthetic/ScrollLandscape',
  component: ScrollLandscape,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ScrollLandscape (山水进度) - Scroll Progress Indicator

A scroll progress indicator inspired by traditional Chinese landscape painting (山水画).
As you scroll, the landscape "unrolls" like a traditional hand scroll (卷轴).

### Design Philosophy

*"行万里路，读万卷书"* (Travel ten thousand miles, read ten thousand books)

In Chinese art, the hand scroll format allows viewers to experience a landscape
progressively, revealing new scenes as they unroll the scroll. This component
brings that experience to digital reading.

### Variants

1. **Mountains (山)**: Layered mountain silhouettes with atmospheric perspective
2. **River (江河)**: Flowing water pattern that fills as you scroll
3. **Minimal**: Simple brush-stroke-like progress line

### Position Options

- **top**: Fixed at the top of the viewport (default)
- **bottom**: Fixed at the bottom of the viewport
- **floating**: A floating indicator in the corner

### Usage

\`\`\`tsx
// Basic usage - auto-tracks window scroll
<ScrollLandscape variant="mountains" />

// With percentage display
<ScrollLandscape variant="mountains" showPercentage />

// Controlled progress (for custom containers)
<ScrollLandscape progress={50} />

// Large landscape variant
<ScrollLandscape variant="mountains" size="lg" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['mountains', 'river', 'minimal'],
      description: 'Visual style of the progress indicator',
    },
    position: {
      control: 'radio',
      options: ['top', 'bottom', 'floating'],
      description: 'Position of the indicator',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Height of the indicator',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage text',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Manual progress value (0-100)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollLandscape>;

// Container for demonstrating scroll
const ScrollContainer = ({
  children,
  height = '200vh',
}: {
  children: React.ReactNode;
  height?: string;
}) => (
  <div style={{ height, padding: '2rem' }}>
    <div className="max-w-prose mx-auto">
      <h1 className="type-h1 text-figure-primary mb-6">论空的本质</h1>
      <h2 className="type-h3 text-figure-secondary mb-8">On the Nature of Emptiness</h2>

      {children}

      <div className="space-y-6 text-figure-secondary type-body">
        <p>
          The space between these words carries meaning. In Chinese calligraphy,
          the empty space (留白) is as important as the ink strokes. This philosophy
          extends to our approach to design.
        </p>
        <p>
          道可道，非常道。名可名，非常名。无名天地之始，有名万物之母。
          The Tao that can be told is not the eternal Tao. The name that can be
          named is not the eternal name.
        </p>
        <p>
          As you scroll through this content, notice how the landscape indicator
          reveals itself like a traditional hand scroll being unrolled. The mountains
          emerge from the mist, layer by layer, creating depth and atmosphere.
        </p>
        <p>
          故常无欲，以观其妙；常有欲，以观其徼。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。
        </p>
        <p>
          In traditional Chinese landscape painting, artists often depicted mountains
          receding into the distance with diminishing clarity—a technique called
          atmospheric perspective. Our mountains variant echoes this approach.
        </p>
        <p>
          上善若水。水善利万物而不争，处众人之所恶，故几于道。居善地，心善渊，与善仁，
          言善信，政善治，事善能，动善时。
        </p>
        <p>
          The river variant draws inspiration from the flowing waters depicted in
          classical paintings—the Yangtze and Yellow Rivers that have shaped Chinese
          civilization for millennia.
        </p>
        <p>
          夫唯不争，故无尤。持而盈之，不如其已；揣而锐之，不可长保。金玉满堂，莫之能守；
          富贵而骄，自遗其咎。功成身退，天之道也。
        </p>
      </div>
    </div>
  </div>
);

export const Mountains: Story = {
  args: {
    variant: 'mountains',
    position: 'top',
    size: 'md',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollLandscape {...args} data-testid="scroll-landscape" />
    </ScrollContainer>
  ),
};

export const MountainsLarge: Story = {
  name: 'Mountains (Large)',
  args: {
    variant: 'mountains',
    position: 'top',
    size: 'lg',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollLandscape {...args} data-testid="scroll-landscape-large" />
    </ScrollContainer>
  ),
};

export const River: Story = {
  args: {
    variant: 'river',
    position: 'top',
    size: 'md',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollLandscape {...args} data-testid="scroll-landscape-river" />
    </ScrollContainer>
  ),
};

export const RiverLarge: Story = {
  name: 'River (Large)',
  args: {
    variant: 'river',
    position: 'top',
    size: 'lg',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollLandscape {...args} />
    </ScrollContainer>
  ),
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    position: 'top',
    size: 'sm',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollLandscape {...args} data-testid="scroll-landscape-minimal" />
    </ScrollContainer>
  ),
};

export const WithPercentage: Story = {
  args: {
    variant: 'mountains',
    position: 'top',
    size: 'md',
    showPercentage: true,
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollLandscape {...args} data-testid="scroll-landscape-percentage" />
    </ScrollContainer>
  ),
};

export const BottomPosition: Story = {
  args: {
    variant: 'mountains',
    position: 'bottom',
    size: 'md',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollLandscape {...args} />
    </ScrollContainer>
  ),
};

export const Floating: Story = {
  args: {
    variant: 'mountains',
    position: 'floating',
    size: 'lg',
    showPercentage: true,
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollLandscape {...args} data-testid="scroll-landscape-floating" />
    </ScrollContainer>
  ),
};

export const ControlledProgress: Story = {
  name: 'Controlled Progress (Interactive)',
  render: () => {
    const [progress, setProgress] = React.useState(0);

    return (
      <div className="p-8 space-y-8">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="type-h3 text-figure-primary">Controlled Progress Demo</h2>
          <p className="type-body text-figure-secondary">
            Use the slider to control the progress value manually.
          </p>

          <div className="space-y-2">
            <label className="type-label text-figure-primary">
              Progress: {progress}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="type-caption text-figure-muted">Mountains (Large)</p>
            <div className="relative h-12 rounded overflow-hidden">
              <ScrollLandscape
                variant="mountains"
                size="lg"
                progress={progress}
                position={undefined}
                className="relative"
                data-testid="controlled-mountains"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="type-caption text-figure-muted">River (Large)</p>
            <div className="relative h-12 rounded overflow-hidden">
              <ScrollLandscape
                variant="river"
                size="lg"
                progress={progress}
                position={undefined}
                className="relative"
                data-testid="controlled-river"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="type-caption text-figure-muted">Minimal</p>
            <div className="relative h-2 rounded overflow-hidden">
              <ScrollLandscape
                variant="minimal"
                size="md"
                progress={progress}
                position={undefined}
                className="relative"
                data-testid="controlled-minimal"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <h2 className="type-h2 text-figure-primary">All Variants</h2>

      <div className="grid gap-8">
        <div className="space-y-2">
          <p className="type-label text-figure-muted">Mountains - 山 (50% progress)</p>
          <div className="relative h-12 rounded overflow-hidden border border-border">
            <ScrollLandscape
              variant="mountains"
              size="lg"
              progress={50}
              position={undefined}
              className="relative"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="type-label text-figure-muted">River - 江河 (50% progress)</p>
          <div className="relative h-12 rounded overflow-hidden border border-border">
            <ScrollLandscape
              variant="river"
              size="lg"
              progress={50}
              position={undefined}
              className="relative"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="type-label text-figure-muted">Minimal (50% progress)</p>
          <div className="relative h-2 rounded overflow-hidden border border-border">
            <ScrollLandscape
              variant="minimal"
              size="md"
              progress={50}
              position={undefined}
              className="relative"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <h2 className="type-h2 text-figure-primary">Size Comparison</h2>

      <div className="space-y-6">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} className="space-y-2">
            <p className="type-label text-figure-muted">
              {size.toUpperCase()} - {size === 'sm' ? '4px' : size === 'md' ? '8px' : size === 'lg' ? '32px' : '48px'}
            </p>
            <div className="relative rounded overflow-hidden border border-border">
              <ScrollLandscape
                variant="mountains"
                size={size}
                progress={65}
                position={undefined}
                className="relative"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
