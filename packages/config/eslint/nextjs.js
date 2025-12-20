/**
 * ESLint configuration for Next.js apps
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'next/typescript',
  ],
  rules: {
    // Allow unused vars with underscore prefix
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // Next.js specific overrides
    'react/no-unescaped-entities': 'off',
    'import/no-anonymous-default-export': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    '*.config.js',
    '*.config.ts',
  ],
};
