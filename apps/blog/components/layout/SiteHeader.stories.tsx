import type { Meta, StoryObj } from '@storybook/react';
import { SiteHeader } from './SiteHeader';
import { ThemeProvider } from './ThemeProvider';
import { ModeToggle } from './ModeToggle';
import { LanguageProvider } from '@/lib/i18n';

const meta: Meta<typeof SiteHeader> = {
  title: 'Blog / Layout / SiteHeader',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider initialLanguage="en">
          <Story />
        </LanguageProvider>
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
    actions: <ModeToggle />,
  },
};

export const CustomSiteName: Story = {
  args: {
    siteName: 'My Blog',
    actions: <ModeToggle />,
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
    actions: <ModeToggle />,
  },
};
