/**
 * ESLint configuration for Storybook
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['./react.js', 'plugin:storybook/recommended'],
  rules: {
    // Storybook specific rules
    'storybook/prefer-pascal-case': 'warn',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'storybook-static/',
  ],
};
