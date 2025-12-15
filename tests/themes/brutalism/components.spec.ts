import { test, expect } from '@playwright/test';
import {
  navigateToStoryWithTheme,
  getComputedStyleProperty,
  parsePixelValue,
  parseColor,
  getCSSVariable,
} from '../../utils';

/**
 * Brutalism Theme Component Tests
 *
 * Tests that components correctly express the brutalism theme:
 * - Zero border radius
 * - Thick borders (2px default, 4px thick)
 * - High contrast colors (black/white)
 * - Monospace typography
 * - Correct text colors on buttons
 */
test.describe('Brutalism Theme: Components', () => {
  test.describe('Button', () => {
    test('primary button has visible white text on black background', async ({
      page,
    }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-button--primary',
        'brutalism',
        'light'
      );

      // Wait for iframe content to be fully loaded and get visible button
      const button = iframe.locator('button:visible').first();
      await expect(button).toBeVisible({ timeout: 10000 });

      // Get computed styles
      const backgroundColor = await getComputedStyleProperty(
        button,
        'background-color'
      );
      const textColor = await getComputedStyleProperty(button, 'color');

      const bgParsed = parseColor(backgroundColor);
      const textParsed = parseColor(textColor);

      // Background should be black (or very dark)
      expect(bgParsed).not.toBeNull();
      if (bgParsed) {
        expect(bgParsed.r).toBeLessThan(50);
        expect(bgParsed.g).toBeLessThan(50);
        expect(bgParsed.b).toBeLessThan(50);
      }

      // Text should be white (or very light)
      expect(textParsed).not.toBeNull();
      if (textParsed) {
        expect(textParsed.r).toBeGreaterThan(200);
        expect(textParsed.g).toBeGreaterThan(200);
        expect(textParsed.b).toBeGreaterThan(200);
      }
    });

    test('button has zero border radius', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-button--primary',
        'brutalism',
        'light'
      );

      const button = iframe.locator('button').first();
      const borderRadius = await getComputedStyleProperty(
        button,
        'border-radius'
      );

      expect(parsePixelValue(borderRadius)).toBe(0);
    });

    test('button has 2px border', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-button--secondary',
        'brutalism',
        'light'
      );

      const button = iframe.locator('button:visible').first();
      await expect(button).toBeVisible({ timeout: 10000 });
      const borderWidth = await getComputedStyleProperty(
        button,
        'border-width'
      );

      expect(parsePixelValue(borderWidth)).toBe(2);
    });

    test('button uses monospace font', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-button--primary',
        'brutalism',
        'light'
      );

      const button = iframe.locator('button:visible').first();
      await expect(button).toBeVisible({ timeout: 10000 });
      const fontFamily = await getComputedStyleProperty(button, 'font-family');

      // Should contain monospace font
      expect(fontFamily.toLowerCase()).toMatch(
        /mono|menlo|consolas|sf mono|ui-monospace/
      );
    });
  });

  test.describe('Card', () => {
    test('card has zero border radius', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-card--default',
        'brutalism',
        'light'
      );

      // Find the card container
      const card = iframe.locator('[class*="border"]').first();
      await expect(card).toBeVisible();

      const borderRadius = await getComputedStyleProperty(
        card,
        'border-radius'
      );
      expect(parsePixelValue(borderRadius)).toBe(0);
    });

    test('card has 2px border', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-card--default',
        'brutalism',
        'light'
      );

      const card = iframe.locator('[class*="border"]').first();
      const borderWidth = await getComputedStyleProperty(card, 'border-width');

      expect(parsePixelValue(borderWidth)).toBe(2);
    });

    test('card border is black (high contrast)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-card--default',
        'brutalism',
        'light'
      );

      const card = iframe.locator('[class*="border"]').first();
      const borderColor = await getComputedStyleProperty(
        card,
        'border-color'
      );

      const colorParsed = parseColor(borderColor);
      expect(colorParsed).not.toBeNull();

      // Border should be black or very dark
      if (colorParsed) {
        expect(colorParsed.r).toBeLessThan(50);
        expect(colorParsed.g).toBeLessThan(50);
        expect(colorParsed.b).toBeLessThan(50);
      }
    });
  });

  test.describe('Callout', () => {
    test('callout has zero border radius', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-callout--info',
        'brutalism',
        'light'
      );

      const callout = iframe.locator('[class*="border"]').first();
      await expect(callout).toBeVisible();

      const borderRadius = await getComputedStyleProperty(
        callout,
        'border-radius'
      );
      expect(parsePixelValue(borderRadius)).toBe(0);
    });

    test('callout has thick left border (4px)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-callout--info',
        'brutalism',
        'light'
      );

      // Wait for the callout to fully render - it contains emoji icons
      // Look for an element containing the info emoji which indicates story is loaded
      const calloutContent = iframe.locator('span:has-text("ℹ️")');
      await expect(calloutContent).toBeVisible({ timeout: 15000 });

      // Now get the parent callout div that has the border styling
      // The callout has border-solid class applied
      const callout = iframe.locator('[class*="border-solid"]').first();
      await expect(callout).toBeVisible();
      const borderLeftWidth = await getComputedStyleProperty(
        callout,
        'border-left-width'
      );

      // Brutalism has 4px thick border
      expect(parsePixelValue(borderLeftWidth)).toBe(4);
    });
  });

  test.describe('Input', () => {
    test('input has zero border radius', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'primitives-input--default',
        'brutalism',
        'light'
      );

      const input = iframe.locator('input').first();
      await expect(input).toBeVisible();

      const borderRadius = await getComputedStyleProperty(
        input,
        'border-radius'
      );
      expect(parsePixelValue(borderRadius)).toBe(0);
    });

    test('input has 2px border', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'primitives-input--default',
        'brutalism',
        'light'
      );

      const input = iframe.locator('input').first();
      const borderWidth = await getComputedStyleProperty(input, 'border-width');

      expect(parsePixelValue(borderWidth)).toBe(2);
    });
  });
});

test.describe('Brutalism Theme: Design Tokens', () => {
  test('has correct accent color (red)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'brutalism',
      'light'
    );

    const accentColor = await getCSSVariable(iframe, '--color-accent-primary');

    // Brutalism accent is #ff0000 (pure red)
    expect(accentColor.toLowerCase()).toBe('#ff0000');
  });

  test('has zero radius tokens', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'brutalism',
      'light'
    );

    const radiusDefault = await getCSSVariable(iframe, '--radius-default');
    const radiusSm = await getCSSVariable(iframe, '--radius-sm');
    const radiusLg = await getCSSVariable(iframe, '--radius-lg');

    expect(parsePixelValue(radiusDefault)).toBe(0);
    expect(parsePixelValue(radiusSm)).toBe(0);
    expect(parsePixelValue(radiusLg)).toBe(0);
  });

  test('has thick border tokens', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'brutalism',
      'light'
    );

    const borderDefault = await getCSSVariable(iframe, '--border-width-default');
    const borderThick = await getCSSVariable(iframe, '--border-width-thick');

    expect(parsePixelValue(borderDefault)).toBe(2);
    expect(parsePixelValue(borderThick)).toBe(4);
  });

  test('has fast motion durations', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'brutalism',
      'light'
    );

    const durationFast = await getCSSVariable(iframe, '--motion-duration-fast');
    const durationNormal = await getCSSVariable(
      iframe,
      '--motion-duration-normal'
    );

    // Brutalism has faster durations (50ms fast, 100ms normal vs NYT's 100ms/200ms)
    expect(durationFast).toBe('50ms');
    expect(durationNormal).toBe('100ms');
  });

  test('uses linear easing by default', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'brutalism',
      'light'
    );

    const easingDefault = await getCSSVariable(iframe, '--motion-easing-default');

    expect(easingDefault).toBe('linear');
  });
});
