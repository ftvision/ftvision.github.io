import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSelector } from './ThemeSelector';
import { ThemeProvider } from './ThemeProvider';
import { ModeToggle } from './ModeToggle';

const meta: Meta<typeof ThemeSelector> = {
  title: 'Blog / Layout / ThemeSelector',
  component: ThemeSelector,
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
type Story = StoryObj<typeof ThemeSelector>;

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
          <span className="text-body text-figure-secondary">Select theme:</span>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const WithModeToggle: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="flex items-center gap-2 p-4 bg-ground-primary rounded-lg border border-border">
          <Story />
          <ModeToggle />
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
            <ModeToggle />
          </div>
        </header>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
