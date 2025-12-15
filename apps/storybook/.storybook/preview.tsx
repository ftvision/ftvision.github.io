import type { Preview } from '@storybook/react';

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
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'nyt',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['nyt', 'brutalism'],
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
