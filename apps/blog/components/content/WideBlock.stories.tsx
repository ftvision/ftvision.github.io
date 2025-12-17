import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WideBlock } from './WideBlock';

const meta: Meta<typeof WideBlock> = {
  title: 'Blog / Content / WideBlock',
  component: WideBlock,
  decorators: [
    (Story) => (
      <div className="max-w-prose mx-auto p-8">
        <p className="text-body leading-relaxed mb-4">
          This is regular paragraph text that stays within the main content
          column. The WideBlock component below will extend beyond this width.
        </p>
        <Story />
        <p className="text-body leading-relaxed mt-4">
          And here is more regular paragraph text after the wide block,
          returning to the standard column width.
        </p>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WideBlock>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-ground-secondary p-8 rounded-lg">
        <p className="text-body text-center text-figure-secondary">
          This is a wide block that extends into the margin area.
          <br />
          Useful for diagrams, large images, or code blocks.
        </p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <figure className="m-0">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-64 rounded-lg flex items-center justify-center">
          <span className="text-white text-heading-md">Image Placeholder</span>
        </div>
        <figcaption className="text-caption text-figure-muted mt-2 text-center">
          A wide diagram showing the architecture of the system
        </figcaption>
      </figure>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    width: 'full',
    children: (
      <div className="bg-ground-inverse p-8">
        <p className="text-figure-inverse text-center">
          This block spans the full content area, including both margins.
        </p>
      </div>
    ),
  },
};

export const ScreenWidth: Story = {
  args: {
    width: 'screen',
    children: (
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-12">
        <p className="text-white text-center text-heading-sm">
          This block extends to the full viewport width (edge to edge).
        </p>
      </div>
    ),
  },
};

export const CodeBlock: Story = {
  args: {
    children: (
      <pre className="bg-ground-inverse text-figure-inverse p-6 rounded-lg overflow-x-auto text-body-sm font-mono">
        {`function transformer(input) {
  const embedded = embed(input);
  const attended = multiHeadAttention(embedded, embedded, embedded);
  const normalized = layerNorm(attended + embedded);
  const feedforward = mlp(normalized);
  return layerNorm(feedforward + normalized);
}`}
      </pre>
    ),
  },
};
