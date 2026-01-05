import { test, expect } from '@playwright/test';
import {
  navigateToStoryWithTheme,
  getComputedStyleProperty,
  parsePixelValue,
  parseColor,
  getCSSVariable,
} from '../utils';

/**
 * Navigation Component Tests
 *
 * Tests that TableOfContents correctly adapts to different themes
 * using navigation semantic tokens.
 *
 * Theme visual differences:
 * - NYT: Thin 1px left border, serif font, classic newspaper style
 * - Chinese Aesthetic: No border, seal markers available
 * - Brutalism: Thick 4px border, inverted active state, monospace font
 */

test.describe('TableOfContents: Cross-Theme Tests', () => {
  test.describe('Border Width by Theme', () => {
    test('NYT theme has 1px border (classic newspaper)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'nyt',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toc = iframe.locator('nav').first();
      const borderWidth = await getComputedStyleProperty(toc, 'border-left-width');
      expect(parsePixelValue(borderWidth)).toBe(1);
    });

    test('Chinese Aesthetic theme has no border', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'chinese-aesthetic',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toc = iframe.locator('nav').first();
      const borderWidth = await getComputedStyleProperty(toc, 'border-left-width');
      expect(parsePixelValue(borderWidth)).toBe(0);
    });

    test('Brutalism theme has 4px border (thick geometric)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'brutalism',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toc = iframe.locator('nav').first();
      const borderWidth = await getComputedStyleProperty(toc, 'border-left-width');
      expect(parsePixelValue(borderWidth)).toBe(4);
    });
  });

  test.describe('Active State Styling by Theme', () => {
    test('NYT: active item uses accent color text on secondary bg', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'nyt',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      const textColor = await getComputedStyleProperty(activeItem, 'color');
      const parsedColor = parseColor(textColor);

      // NYT accent is blue
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.b).toBeGreaterThan(100);
    });

    test('Chinese Aesthetic: active item uses seal red accent', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'chinese-aesthetic',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      const textColor = await getComputedStyleProperty(activeItem, 'color');
      const parsedColor = parseColor(textColor);

      // Chinese aesthetic accent is seal red
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.r).toBeGreaterThan(150);
    });

    test('Brutalism: active item has inverted colors (white on black)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'brutalism',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      const bgColor = await getComputedStyleProperty(activeItem, 'background-color');
      const textColor = await getComputedStyleProperty(activeItem, 'color');

      const bgParsed = parseColor(bgColor);
      const textParsed = parseColor(textColor);

      // Background should be dark/black
      expect(bgParsed).not.toBeNull();
      expect(bgParsed!.r).toBeLessThan(50);

      // Text should be light/white
      expect(textParsed).not.toBeNull();
      expect(textParsed!.r).toBeGreaterThan(200);
    });
  });

  test.describe('Navigation Tokens', () => {
    test('navigation tokens are defined for NYT', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'nyt',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });

      const borderWidth = await getCSSVariable(iframe, '--navigation-toc-border-width');
      const borderColor = await getCSSVariable(iframe, '--navigation-toc-border-color');
      const activeText = await getCSSVariable(iframe, '--navigation-toc-active-text');

      expect(borderWidth).toBeTruthy();
      expect(borderColor).toBeTruthy();
      expect(activeText).toBeTruthy();
    });

    test('navigation tokens are defined for Chinese Aesthetic', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'chinese-aesthetic',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });

      const borderWidth = await getCSSVariable(iframe, '--navigation-toc-border-width');
      const activeBorder = await getCSSVariable(iframe, '--navigation-toc-active-border');

      expect(borderWidth).toBe('0');
      expect(activeBorder).toBeTruthy();
    });

    test('navigation tokens are defined for Brutalism', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--default',
        'brutalism',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });

      const borderWidth = await getCSSVariable(iframe, '--navigation-toc-border-width');
      const activeBg = await getCSSVariable(iframe, '--navigation-toc-active-bg');
      const activeText = await getCSSVariable(iframe, '--navigation-toc-active-text');

      expect(parsePixelValue(borderWidth)).toBe(4);
      expect(activeBg).toBeTruthy();
      expect(activeText).toBeTruthy();
    });
  });

  test.describe('Common Functionality', () => {
    const themes = ['nyt', 'chinese-aesthetic', 'brutalism'] as const;

    for (const theme of themes) {
      test(`${theme}: renders navigation landmark`, async ({ page }) => {
        const iframe = await navigateToStoryWithTheme(
          page,
          'components-navigation-tableofcontents--default',
          theme,
          'light'
        );

        await iframe.locator('body').waitFor({ state: 'visible' });
        await page.waitForTimeout(500);

        const nav = iframe.locator('nav');
        await expect(nav).toBeVisible();
      });

      test(`${theme}: active item has aria-current`, async ({ page }) => {
        const iframe = await navigateToStoryWithTheme(
          page,
          'components-navigation-tableofcontents--default',
          theme,
          'light'
        );

        await iframe.locator('body').waitFor({ state: 'visible' });
        await page.waitForTimeout(500);

        const activeItem = iframe.locator('[aria-current="location"]');
        await expect(activeItem).toBeVisible();
      });

      test(`${theme}: links are focusable`, async ({ page }) => {
        const iframe = await navigateToStoryWithTheme(
          page,
          'components-navigation-tableofcontents--default',
          theme,
          'light'
        );

        await iframe.locator('body').waitFor({ state: 'visible' });
        await page.waitForTimeout(500);

        const link = iframe.locator('nav a').first();
        await link.focus();

        const isFocused = await link.evaluate((el) => document.activeElement === el);
        expect(isFocused).toBe(true);
      });
    }
  });

  test.describe('Marker Styles', () => {
    test('dot marker renders correctly across themes', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--dot-marker',
        'nyt',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      // Dot marker should be visible
      const dot = activeItem.locator('.rounded-full').first();
      await expect(dot).toBeVisible();
    });

    test('seal marker renders correctly', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--seal-marker',
        'chinese-aesthetic',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      // Seal marker should be visible (square shape)
      const seal = activeItem.locator('.rounded-sm').first();
      await expect(seal).toBeVisible();
    });

    test('line marker renders correctly', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-navigation-tableofcontents--line-marker',
        'nyt',
        'light'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      // Line marker uses absolute positioning
      const line = activeItem.locator('.absolute').first();
      await expect(line).toBeVisible();
    });
  });
});
