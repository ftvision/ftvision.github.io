import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModeToggle } from './ModeToggle';
import { ThemeProvider } from './ThemeProvider';

const meta: Meta<typeof ModeToggle> = {
  title: 'Blog / Layout / ModeToggle',
  component: ModeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModeToggle>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'border border-border rounded-full',
  },
};

export const InContext: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="flex items-center gap-4 p-4 bg-ground-secondary rounded-lg">
          <span className="text-body text-figure-secondary">Select mode:</span>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const InHeader: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <header className="flex items-center justify-between w-full max-w-4xl p-4 border-b border-border bg-ground-primary">
          <span className="text-heading-sm font-semibold">Essays</span>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-6">
              <a
                href="#"
                className="text-body text-figure-secondary hover:text-figure-primary"
              >
                Essays
              </a>
              <a
                href="#"
                className="text-body text-figure-secondary hover:text-figure-primary"
              >
                About
              </a>
            </nav>
            <Story />
          </div>
        </header>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
