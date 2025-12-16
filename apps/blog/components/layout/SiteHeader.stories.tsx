import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SiteHeader } from './SiteHeader';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof SiteHeader> = {
  title: 'Blog / Layout / SiteHeader',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {
  args: {
    siteName: 'Essays',
  },
};

export const WithThemeToggle: Story = {
  args: {
    siteName: 'Essays',
    actions: <ThemeToggle />,
  },
};

export const CustomSiteName: Story = {
  args: {
    siteName: 'My Blog',
    actions: <ThemeToggle />,
  },
};

export const WithCustomNavigation: Story = {
  args: {
    siteName: 'Essays',
    navigation: (
      <nav className="flex items-center gap-6">
        <a href="#" className="text-body text-figure-secondary hover:text-figure-primary">
          Home
        </a>
        <a href="#" className="text-body text-figure-secondary hover:text-figure-primary">
          Articles
        </a>
        <a href="#" className="text-body text-figure-secondary hover:text-figure-primary">
          Projects
        </a>
        <a href="#" className="text-body text-figure-secondary hover:text-figure-primary">
          Contact
        </a>
      </nav>
    ),
    actions: <ThemeToggle />,
  },
};
