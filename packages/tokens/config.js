/**
 * Style Dictionary Configuration
 *
 * This is the base config. The actual build is handled by build.js
 * which runs multiple Style Dictionary builds for:
 * - Primitives (raw values)
 * - Semantic (default semantic tokens)
 * - Themes (theme-specific overrides)
 */

module.exports = {
  source: ['src/primitives/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'primitives.css',
          format: 'css/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'primitives.js',
          format: 'javascript/es6',
        },
        {
          destination: 'primitives.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
};
