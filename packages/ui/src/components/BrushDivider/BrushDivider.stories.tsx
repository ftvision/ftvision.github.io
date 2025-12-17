import type { Meta, StoryObj } from '@storybook/react';
import { BrushDivider } from './BrushDivider';

const meta: Meta<typeof BrushDivider> = {
  title: 'Components/Themes/Chinese Aesthetic/BrushDivider',
  component: BrushDivider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['horizontal', 'wave', 'dot', 'flick'],
    },
    brushColor: {
      control: 'radio',
      options: ['ink', 'accent', 'muted'],
    },
    spacing: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
    },
    animated: {
      control: 'boolean',
    },
    triggerOn: {
      control: 'radio',
      options: ['mount', 'viewport'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrushDivider>;

export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
    brushColor: 'ink',
    spacing: 'md',
  },
};

export const Wave: Story = {
  args: {
    variant: 'wave',
    brushColor: 'ink',
    spacing: 'md',
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    brushColor: 'ink',
    spacing: 'md',
  },
};

export const Flick: Story = {
  args: {
    variant: 'flick',
    brushColor: 'ink',
    spacing: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <p className="type-label text-figure-muted mb-2">Horizontal</p>
        <BrushDivider variant="horizontal" spacing="none" />
      </div>
      <div>
        <p className="type-label text-figure-muted mb-2">Wave</p>
        <BrushDivider variant="wave" spacing="none" />
      </div>
      <div>
        <p className="type-label text-figure-muted mb-2">Dot</p>
        <BrushDivider variant="dot" spacing="none" />
      </div>
      <div>
        <p className="type-label text-figure-muted mb-2">Flick</p>
        <BrushDivider variant="flick" spacing="none" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-6 max-w-lg">
      <div>
        <p className="type-label text-figure-muted mb-2">Ink (default)</p>
        <BrushDivider brushColor="ink" spacing="none" />
      </div>
      <div>
        <p className="type-label text-figure-muted mb-2">Accent (Seal Red)</p>
        <BrushDivider brushColor="accent" spacing="none" />
      </div>
      <div>
        <p className="type-label text-figure-muted mb-2">Muted</p>
        <BrushDivider brushColor="muted" spacing="none" />
      </div>
    </div>
  ),
};

export const AccentColor: Story = {
  args: {
    variant: 'horizontal',
    brushColor: 'accent',
    spacing: 'md',
  },
};

export const MutedColor: Story = {
  args: {
    variant: 'horizontal',
    brushColor: 'muted',
    spacing: 'md',
  },
};

export const AnimatedOnMount: Story = {
  args: {
    variant: 'horizontal',
    animated: true,
    triggerOn: 'mount',
  },
};

export const AnimatedWave: Story = {
  args: {
    variant: 'wave',
    animated: true,
    brushColor: 'accent',
  },
};

export const AnimatedDots: Story = {
  args: {
    variant: 'dot',
    animated: true,
  },
};

export const InContext: Story = {
  render: () => (
    <article className="max-w-lg">
      <h2 className="type-h2 text-figure-primary mb-4">On Emptiness</h2>
      <p className="type-body text-figure-secondary mb-4">
        计白当黑 — "Count the white as black." In Chinese painting, the areas without
        ink are not empty.
      </p>

      <BrushDivider variant="wave" brushColor="accent" />

      <p className="type-body text-figure-secondary mb-4">
        They are mist between mountains, silence between words, the space where
        imagination completes what the artist deliberately left unfinished.
      </p>

      <BrushDivider variant="dot" brushColor="muted" />

      <p className="type-caption text-figure-muted italic">
        — From the Scholar's Studio
      </p>
    </article>
  ),
};
