import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LanguageToggle } from './LanguageToggle';
import { LanguageProvider } from '@/lib/i18n';
import { ThemeProvider } from './ThemeProvider';
import { ModeToggle } from './ModeToggle';
import { ThemeSelector } from './ThemeSelector';

const meta: Meta<typeof LanguageToggle> = {
  title: 'Blog / Layout / LanguageToggle',
  component: LanguageToggle,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        push: (path: string) => console.log('Navigate to:', path),
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider initialLanguage="en">
          <div className="p-8">
            <Story />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'border border-border rounded-full',
  },
};

export const ChineseLanguage: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider initialLanguage="zh">
          <div className="p-8">
            <Story />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
};

export const InContext: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider initialLanguage="en">
          <div className="flex items-center gap-4 p-4 bg-ground-secondary rounded-lg">
            <span className="text-body text-figure-secondary">
              Switch language:
            </span>
            <Story />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
};

export const InHeader: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider initialLanguage="en">
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
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithThemeControls: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider initialLanguage="en">
          <div className="flex items-center gap-2 p-4 bg-ground-primary rounded-lg border border-border">
            <Story />
            <ThemeSelector />
            <ModeToggle />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
};
