import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    // Co-located stories from packages/ui (Foundations & Components)
    '../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Co-located stories from apps/blog (Blog components)
    '../../../apps/blog/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Local stories
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // UI package alias
        '@ui': path.resolve(__dirname, '../../../packages/ui/src'),
        // Blog app alias (for @/ imports in blog components)
        '@': path.resolve(__dirname, '../../../apps/blog'),
        // Mock Next.js modules for Storybook
        'next/navigation': path.resolve(__dirname, '../mocks/next-navigation.ts'),
        'next/link': path.resolve(__dirname, '../mocks/next-link.tsx'),
      };
    }

    // Define process.env for Next.js compatibility
    config.define = {
      ...config.define,
      'process.env': {},
    };

    return config;
  },
};

export default config;
