import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 *
 * Test organization:
 * - tests/foundations/  - Design token tests (spacing, motion, typography, color)
 * - tests/components/   - Component-specific tests
 * - tests/themes/       - Theme-specific visual regression tests
 * - tests/utils/        - Shared test utilities (not tests themselves)
 *
 * To run specific test suites:
 *   npx playwright test --project=foundations
 *   npx playwright test --project=components
 *   npx playwright test --project=themes-nyt
 */
export default defineConfig({
  testDir: './tests',
  // Ignore utility files
  testIgnore: ['**/utils/**', '**/*.png'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],

  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Foundations tests - design token verification
    {
      name: 'foundations',
      testDir: './tests/foundations',
      use: { ...devices['Desktop Chrome'] },
    },

    // Component tests - individual component behavior
    {
      name: 'components',
      testDir: './tests/components',
      use: { ...devices['Desktop Chrome'] },
    },

    // NYT Theme visual regression tests
    {
      name: 'themes-nyt',
      testDir: './tests/themes/nyt',
      use: { ...devices['Desktop Chrome'] },
    },

    // Brutalism Theme tests
    {
      name: 'themes-brutalism',
      testDir: './tests/themes/brutalism',
      use: { ...devices['Desktop Chrome'] },
    },

    // Blog components tests
    {
      name: 'blog',
      testDir: './tests/blog',
      use: { ...devices['Desktop Chrome'] },
    },

    // Chinese Aesthetic Theme tests
    {
      name: 'themes-chinese-aesthetic',
      testDir: './tests/themes/chinese-aesthetic',
      use: { ...devices['Desktop Chrome'] },
    },

    // Cross-browser testing (run selectively)
    {
      name: 'webkit',
      testDir: './tests/foundations',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'firefox',
      testDir: './tests/foundations',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  // Webserver configuration for local development
  webServer: {
    command: 'pnpm --filter @blog/storybook dev',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
