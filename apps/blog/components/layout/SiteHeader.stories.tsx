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

export const CustomLinks: Story = {
  args: {
    siteName: 'Essays',
    links: [
      { href: '/', label: 'Home' },
      { href: '/essays', label: 'Essays' },
      { href: '/projects', label: 'Projects' },
      { href: '/about', label: 'About' },
    ],
    actions: <ThemeToggle />,
  },
};
