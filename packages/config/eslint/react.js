/**
 * ESLint configuration for React packages
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    './base.js',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React specific rules
    'react/prop-types': 'off', // We use TypeScript for prop types
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/jsx-no-comment-textnodes': 'warn',
  },
  overrides: [
    {
      // Storybook files often use hooks in render functions
      files: ['**/*.stories.tsx', '**/*.stories.ts'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
};
