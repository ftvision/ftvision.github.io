import type { Preview } from '@storybook/react';

import '@fontsource-variable/archivo';
import '@fontsource-variable/brygada-1918';
import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/newsreader/standard.css';
import '@fontsource-variable/newsreader/standard-italic.css';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource-variable/source-serif-4/opsz.css';
import '@fontsource-variable/vollkorn';
import '@fontsource/instrument-serif';
import '@fontsource/libre-caslon-display';
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-serif-sc/600.css';

// Import token CSS
import '@blog/tokens/css';

// Import Tailwind styles
import '../styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--color-bg-primary)' },
        { name: 'dark', value: '#09090b' },
      ],
    },
    viewport: {
      viewports: {
        mobile1: {
          name: 'Mobile (320px)',
          styles: { width: '320px', height: '568px' },
        },
        mobile2: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
        },
        laptop: {
          name: 'Laptop (1024px)',
          styles: { width: '1024px', height: '768px' },
        },
        desktop: {
          name: 'Desktop (1440px)',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'nyt',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['nyt', 'brutalism', 'chinese-aesthetic'],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'sun',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'nyt';
      const mode = context.globals.mode || 'light';

      // Set data attributes on document for theme switching
      document.documentElement.dataset.theme = theme;
      document.documentElement.dataset.mode = mode;

      return <Story />;
    },
  ],
};

export default preview;
