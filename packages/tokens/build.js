#!/usr/bin/env node
/**
 * Token Build Script
 *
 * Builds CSS custom properties for:
 * 1. Primitives - Raw values (:root)
 * 2. Semantic - Default semantic tokens (:root)
 * 3. Themes - Theme+mode specific overrides ([data-theme][data-mode])
 *
 * Output files:
 * - build/css/primitives.css
 * - build/css/semantic.css
 * - build/css/theme-{name}-{mode}.css
 * - build/css/index.css (imports all)
 * - build/js/primitives.js
 * - build/js/semantic.js
 */

const StyleDictionary = require('style-dictionary').default;
const fs = require('fs');
const path = require('path');

const BUILD_PATH = 'build/';
const CSS_PATH = `${BUILD_PATH}css/`;
const JS_PATH = `${BUILD_PATH}js/`;

// Ensure build directories exist
fs.mkdirSync(CSS_PATH, { recursive: true });
fs.mkdirSync(JS_PATH, { recursive: true });

// Custom format for theme CSS with data attribute selectors
const themeVariablesFormat = {
  name: 'css/theme-variables',
  format: function ({ dictionary, options }) {
    const { theme, mode } = options;
    const selector = `[data-theme="${theme}"][data-mode="${mode}"]`;

    const variables = dictionary.allTokens
      .filter((token) => !token.path[0].startsWith('primitive'))
      .map((token) => `  --${token.name}: ${token.value};`)
      .join('\n');

    return `${selector} {\n${variables}\n}`;
  },
};

async function build() {
  // Build primitives
  console.log('Building primitives...');
  const primitiveSD = new StyleDictionary({
    source: ['src/primitives/**/*.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: CSS_PATH,
        files: [
          {
            destination: 'primitives.css',
            format: 'css/variables',
          },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: JS_PATH,
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
  });
  await primitiveSD.buildAllPlatforms();

  // Build semantic (default tokens)
  console.log('Building semantic tokens...');
  const semanticSD = new StyleDictionary({
    source: ['src/primitives/**/*.json', 'src/semantic/**/*.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: CSS_PATH,
        files: [
          {
            destination: 'semantic.css',
            format: 'css/variables',
            filter: (token) => !token.path[0].startsWith('primitive'),
          },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: JS_PATH,
        files: [
          {
            destination: 'semantic.js',
            format: 'javascript/es6',
            filter: (token) => !token.path[0].startsWith('primitive'),
          },
          {
            destination: 'semantic.d.ts',
            format: 'typescript/es6-declarations',
            filter: (token) => !token.path[0].startsWith('primitive'),
          },
        ],
      },
    },
  });
  await semanticSD.buildAllPlatforms();

  // Discover and build themes
  const themesDir = path.join(__dirname, 'src/themes');
  const themeFiles = [];

  if (fs.existsSync(themesDir)) {
    const themes = fs
      .readdirSync(themesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const theme of themes) {
      const themeDir = path.join(themesDir, theme);
      const modes = ['light', 'dark'];

      for (const mode of modes) {
        const modeFile = path.join(themeDir, `${mode}.json`);
        if (fs.existsSync(modeFile)) {
          console.log(`Building theme: ${theme}/${mode}...`);

          const themeSD = new StyleDictionary({
            hooks: {
              formats: {
                'css/theme-variables': themeVariablesFormat.format,
              },
            },
            source: ['src/primitives/**/*.json', modeFile],
            platforms: {
              css: {
                transformGroup: 'css',
                buildPath: CSS_PATH,
                files: [
                  {
                    destination: `theme-${theme}-${mode}.css`,
                    format: 'css/theme-variables',
                    options: { theme, mode },
                  },
                ],
              },
            },
          });
          await themeSD.buildAllPlatforms();
          themeFiles.push(`theme-${theme}-${mode}.css`);
        }
      }
    }
  }

  // Create index.css that imports all files
  console.log('Creating index.css...');
  const imports = [
    '@import "./primitives.css";',
    '@import "./semantic.css";',
    ...themeFiles.map((f) => `@import "./${f}";`),
  ].join('\n');

  fs.writeFileSync(path.join(CSS_PATH, 'index.css'), imports + '\n');

  // Create tokens.js that re-exports everything
  console.log('Creating tokens.js...');
  const jsExports = `// Re-export all tokens
export * from './primitives.js';
export * from './semantic.js';
`;
  fs.writeFileSync(path.join(JS_PATH, 'tokens.js'), jsExports);

  // Create tokens.d.ts
  const dtsExports = `// Re-export all tokens
export * from './primitives';
export * from './semantic';
`;
  fs.writeFileSync(path.join(JS_PATH, 'tokens.d.ts'), dtsExports);

  console.log('✓ Token build complete!');
  console.log(`  CSS: ${CSS_PATH}`);
  console.log(`  JS:  ${JS_PATH}`);
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
