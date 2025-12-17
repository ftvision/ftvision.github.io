import type { Meta, StoryObj } from '@storybook/react';
import { MoonGate } from './MoonGate';

const meta: Meta<typeof MoonGate> = {
  title: 'Components/Themes/Chinese Aesthetic/MoonGate',
  component: MoonGate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## MoonGate (月门) - Decorative Frame Component

The Moon Gate is inspired by traditional Chinese garden architecture. In classical
Chinese gardens, a **月门 (yuèmén)** is a circular opening in a wall that frames
views and creates a sense of passage between spaces.

### Design Philosophy

- **Framing**: The circular opening frames content like a window into another world
- **Symbolism**: The full circle represents the moon, completion, and harmony
- **Transition**: Creates visual and conceptual boundaries between spaces

### Architectural Variants

1. **Full (月门)**: Complete circle - the classic moon gate
2. **Arch (拱门)**: Traditional archway with rounded top
3. **Window (窗)**: Rectangular frame with rounded top corners

### Usage

Use MoonGate to frame images, create visual focal points, or add traditional
Chinese aesthetic elements to your design.

\`\`\`tsx
<MoonGate variant="full" size="md" bordered>
  <img src="landscape.jpg" alt="Garden view" />
</MoonGate>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['full', 'arch', 'window'],
      description: 'Shape variant: full circle, arch, or window',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Maximum width constraint',
    },
    bordered: {
      control: 'boolean',
      description: 'Add a decorative border ring',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MoonGate>;

// Landscape gradient to simulate a scenic view
const LandscapeGradient = () => (
  <div
    className="w-full h-full"
    style={{
      background: `linear-gradient(180deg,
        #87CEEB 0%,
        #87CEEB 40%,
        #98D8AA 40%,
        #2E7D32 60%,
        #1B5E20 100%)`,
      minHeight: '200px',
    }}
  />
);

// Ink wash style gradient (水墨画)
const InkWashGradient = () => (
  <div
    className="w-full h-full"
    style={{
      background: `linear-gradient(180deg,
        #F5F5F5 0%,
        #E0E0E0 30%,
        #9E9E9E 60%,
        #616161 100%)`,
      minHeight: '200px',
    }}
  />
);

export const Full: Story = {
  args: {
    variant: 'full',
    size: 'md',
  },
  render: (args) => (
    <MoonGate {...args}>
      <LandscapeGradient />
    </MoonGate>
  ),
};

export const Arch: Story = {
  args: {
    variant: 'arch',
    size: 'md',
  },
  render: (args) => (
    <MoonGate {...args}>
      <div className="w-full aspect-[3/4]">
        <LandscapeGradient />
      </div>
    </MoonGate>
  ),
};

export const Window: Story = {
  args: {
    variant: 'window',
    size: 'md',
  },
  render: (args) => (
    <MoonGate {...args}>
      <div className="w-full aspect-[4/5]">
        <LandscapeGradient />
      </div>
    </MoonGate>
  ),
};

export const Bordered: Story = {
  args: {
    variant: 'full',
    size: 'md',
    bordered: true,
  },
  render: (args) => (
    <MoonGate {...args}>
      <InkWashGradient />
    </MoonGate>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <div className="flex flex-col items-center gap-2">
        <MoonGate variant="full" size="sm">
          <LandscapeGradient />
        </MoonGate>
        <span className="type-caption text-figure-muted">月门 Full</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MoonGate variant="arch" size="sm">
          <div className="w-full aspect-[3/4]">
            <LandscapeGradient />
          </div>
        </MoonGate>
        <span className="type-caption text-figure-muted">拱门 Arch</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MoonGate variant="window" size="sm">
          <div className="w-full aspect-[4/5]">
            <LandscapeGradient />
          </div>
        </MoonGate>
        <span className="type-caption text-figure-muted">窗 Window</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <div className="flex flex-col items-center gap-2">
        <MoonGate variant="full" size="sm">
          <InkWashGradient />
        </MoonGate>
        <span className="type-caption text-figure-muted">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MoonGate variant="full" size="md">
          <InkWashGradient />
        </MoonGate>
        <span className="type-caption text-figure-muted">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MoonGate variant="full" size="lg">
          <InkWashGradient />
        </MoonGate>
        <span className="type-caption text-figure-muted">Large</span>
      </div>
    </div>
  ),
};

export const WithRealImage: Story = {
  name: 'With Scenic View',
  render: () => (
    <MoonGate variant="full" size="lg" bordered data-testid="moongate-scenic">
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(180deg,
            #FFE4B5 0%,
            #DEB887 20%,
            #8B7355 40%,
            #556B2F 60%,
            #2F4F4F 100%)`,
          minHeight: '400px',
        }}
        data-testid="moongate-scenic-content"
      />
    </MoonGate>
  ),
};

export const InContext: Story = {
  render: () => (
    <article className="max-w-lg">
      <h2 className="type-h2 text-figure-primary mb-4">The Garden View</h2>
      <p className="type-body text-figure-secondary mb-6">
        In Chinese garden design, the moon gate (月门) frames a view, transforming
        an ordinary scene into a contemplative moment. The circular opening
        represents the full moon — a symbol of completion and harmony.
      </p>

      <figure className="mb-6">
        <MoonGate variant="full" size="full" bordered>
          <div className="w-full aspect-square">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 30%,
                  #F5F5DC 0%,
                  #E8E8D0 30%,
                  #C0C0A0 70%,
                  #808060 100%)`,
              }}
            >
              <span className="type-h2 text-figure-muted opacity-50">山水</span>
            </div>
          </div>
        </MoonGate>
        <figcaption className="type-caption text-figure-muted text-center mt-3">
          图一：Through the moon gate, a landscape awaits
        </figcaption>
      </figure>

      <p className="type-body text-figure-secondary">
        Walking through a moon gate is like stepping into a painting. The frame
        creates a boundary that separates the mundane from the poetic, inviting
        contemplation and wonder.
      </p>
    </article>
  ),
};
