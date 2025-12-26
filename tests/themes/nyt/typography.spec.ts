import { test, expect } from '@playwright/test';

/**
 * NYT Theme Typography Tests
 *
 * Verifies that the NYT theme typography tokens are correctly applied
 * to essay content in Storybook.
 *
 * Expected values from tokens:
 * - Font family: Georgia, 'Times New Roman', serif
 * - Body font size: 1rem (16px at default)
 * - Body line height: 1.6
 * - H1 font size: 2.441rem (~39px)
 * - H2 font size: 1.953rem (~31px)
 * - H3 font size: 1.563rem (~25px)
 * - Body font weight: 400
 * - H1 font weight: 700
 * - H2 font weight: 600
 */

test.describe('NYT Theme: Typography', () => {
  test.describe('EssayLayout Typography', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to the EssayLayout story with NYT theme
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );
      await page.waitForSelector('.essay-layout', { timeout: 10000 });
    });

    test('body text uses serif font family (Georgia)', async ({ page }) => {
      const paragraph = page.locator('.essay-content p').first();

      const fontFamily = await paragraph.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      // NYT theme should use Georgia serif font
      // The computed value may include fallbacks, so check for Georgia
      expect(fontFamily.toLowerCase()).toContain('georgia');
    });

    test('body text has correct font size (1rem = 16px)', async ({ page }) => {
      const paragraph = page.locator('.essay-content p').first();

      const fontSize = await paragraph.evaluate((el) =>
        window.getComputedStyle(el).fontSize
      );

      // Body text should be 1rem = 16px (at default browser settings)
      // Allow for slight variations (15-17px)
      const size = parseFloat(fontSize);
      expect(size).toBeGreaterThanOrEqual(15);
      expect(size).toBeLessThanOrEqual(17);
    });

    test('body text has correct line height (1.6)', async ({ page }) => {
      const paragraph = page.locator('.essay-content p').first();

      const lineHeight = await paragraph.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const lh = parseFloat(style.lineHeight);
        const fs = parseFloat(style.fontSize);
        // Return the ratio
        return lh / fs;
      });

      // Line height should be approximately 1.6
      // Allow for small variations (prose styles may add slight adjustments)
      expect(lineHeight).toBeGreaterThanOrEqual(1.5);
      expect(lineHeight).toBeLessThanOrEqual(1.8);
    });

    test('body text has correct font weight (400)', async ({ page }) => {
      const paragraph = page.locator('.essay-content p').first();

      const fontWeight = await paragraph.evaluate((el) =>
        window.getComputedStyle(el).fontWeight
      );

      // Body weight should be 400 (normal)
      expect(fontWeight).toBe('400');
    });

    test('h2 headings use serif font family', async ({ page }) => {
      const h2 = page.locator('.essay-content h2').first();

      const fontFamily = await h2.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      // Headlines should also use serif font in NYT theme
      expect(fontFamily.toLowerCase()).toContain('georgia');
    });

    test('h2 headings have larger font size than body', async ({ page }) => {
      const h2 = page.locator('.essay-content h2').first();
      const paragraph = page.locator('.essay-content p').first();

      const h2FontSize = await h2.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      const pFontSize = await paragraph.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // H2 (1.953rem ~31px) should be larger than body (1rem ~16px)
      expect(h2FontSize).toBeGreaterThan(pFontSize);
      // Roughly 1.9x the body size
      const ratio = h2FontSize / pFontSize;
      expect(ratio).toBeGreaterThanOrEqual(1.5);
      expect(ratio).toBeLessThanOrEqual(2.5);
    });

    test('h2 headings have bolder weight than body', async ({ page }) => {
      const h2 = page.locator('.essay-content h2').first();
      const paragraph = page.locator('.essay-content p').first();

      const h2Weight = await h2.evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontWeight)
      );
      const pWeight = await paragraph.evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontWeight)
      );

      // H2 should be 600 (semibold), body should be 400
      expect(h2Weight).toBeGreaterThan(pWeight);
      expect(h2Weight).toBeGreaterThanOrEqual(600);
    });

    test('h2 has tighter line height than body', async ({ page }) => {
      const h2 = page.locator('.essay-content h2').first();
      const paragraph = page.locator('.essay-content p').first();

      const h2LineHeight = await h2.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return parseFloat(style.lineHeight) / parseFloat(style.fontSize);
      });
      const pLineHeight = await paragraph.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return parseFloat(style.lineHeight) / parseFloat(style.fontSize);
      });

      // H2 line-height (1.2) should be tighter than body (1.6)
      expect(h2LineHeight).toBeLessThan(pLineHeight);
    });
  });

  test.describe('EssayHeader Typography', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essayheader--guide&viewMode=story'
      );
      await page.waitForSelector('.essay-header', { timeout: 10000 });
    });

    test('title uses serif font family', async ({ page }) => {
      const title = page.locator('.essay-header h1');

      const fontFamily = await title.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      expect(fontFamily.toLowerCase()).toContain('georgia');
    });

    test('title has large font size (display scale)', async ({ page }) => {
      const title = page.locator('.essay-header h1');

      const fontSize = await title.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // Display should be 3.052rem (~49px)
      // Allow range of 32-52px for flexibility
      expect(fontSize).toBeGreaterThanOrEqual(32);
      expect(fontSize).toBeLessThanOrEqual(52);
    });

    test('title has bold weight (700)', async ({ page }) => {
      const title = page.locator('.essay-header h1');

      const fontWeight = await title.evaluate((el) =>
        window.getComputedStyle(el).fontWeight
      );

      // Title uses type-display which includes font-weight: 700
      expect(parseInt(fontWeight)).toBeGreaterThanOrEqual(700);
    });

    test('type badge uses correct styling', async ({ page }) => {
      // The type badge should have smaller text with proper weight
      const badge = page.locator('.essay-header').getByText('Guide', { exact: true });

      const fontSize = await badge.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // Badge text should be smaller than body text (label/overline size ~12.8px)
      expect(fontSize).toBeLessThanOrEqual(16);
    });

    test('description uses correct typography', async ({ page }) => {
      const description = page.locator('.essay-header p').first();

      const fontSize = await description.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      const fontWeight = await description.evaluate((el) =>
        window.getComputedStyle(el).fontWeight
      );

      // Description should be body or slightly larger text
      expect(fontSize).toBeGreaterThanOrEqual(14);
      expect(fontSize).toBeLessThanOrEqual(20);
      // Normal weight
      expect(fontWeight).toBe('400');
    });

    test('date/reading time uses muted styling', async ({ page }) => {
      const timeElement = page.locator('time');

      const color = await timeElement.evaluate((el) =>
        window.getComputedStyle(el).color
      );

      // Muted text should not be pure black (should be lighter)
      // RGB values should not all be very dark (0)
      const rgb = color.match(/\d+/g)?.map(Number) || [];
      // At least one channel should be noticeably light (muted)
      // --color-text-muted: #71717a (113, 113, 122)
      if (rgb.length >= 3) {
        const isNotPureBlack = rgb.some((val) => val > 50);
        expect(isNotPureBlack).toBe(true);
      }
    });
  });

  test.describe('CSS Custom Properties', () => {
    test('NYT theme sets correct font-family-body CSS variable', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );
      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      const fontFamilyVar = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue(
          '--font-family-body'
        );
      });

      // NYT theme should set Georgia as body font
      expect(fontFamilyVar.toLowerCase()).toContain('georgia');
    });

    test('NYT theme sets correct font-family-heading CSS variable', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );
      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      const fontFamilyVar = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue(
          '--font-family-heading'
        );
      });

      // NYT theme should set Georgia for headings
      expect(fontFamilyVar.toLowerCase()).toContain('georgia');
    });

    test('semantic font size tokens are defined', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );
      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      const tokens = await page.evaluate(() => {
        const style = getComputedStyle(document.documentElement);
        return {
          display: style.getPropertyValue('--font-size-display'),
          h1: style.getPropertyValue('--font-size-h1'),
          h2: style.getPropertyValue('--font-size-h2'),
          h3: style.getPropertyValue('--font-size-h3'),
          body: style.getPropertyValue('--font-size-body'),
          bodySm: style.getPropertyValue('--font-size-body-sm'),
          caption: style.getPropertyValue('--font-size-caption'),
        };
      });

      // All tokens should be defined (non-empty)
      expect(tokens.display).toBeTruthy();
      expect(tokens.h1).toBeTruthy();
      expect(tokens.h2).toBeTruthy();
      expect(tokens.h3).toBeTruthy();
      expect(tokens.body).toBeTruthy();
      expect(tokens.bodySm).toBeTruthy();
      expect(tokens.caption).toBeTruthy();

      // Verify expected values
      expect(tokens.body.trim()).toBe('1rem');
      expect(tokens.h1.trim()).toBe('2.441rem');
      expect(tokens.h2.trim()).toBe('1.953rem');
    });

    test('semantic line height tokens are defined', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );
      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      const tokens = await page.evaluate(() => {
        const style = getComputedStyle(document.documentElement);
        return {
          body: style.getPropertyValue('--font-line-height-body'),
          h1: style.getPropertyValue('--font-line-height-h1'),
          h2: style.getPropertyValue('--font-line-height-h2'),
        };
      });

      // Verify expected values
      expect(tokens.body.trim()).toBe('1.6');
      expect(tokens.h1.trim()).toBe('1.15');
      expect(tokens.h2.trim()).toBe('1.2');
    });

    test('semantic font weight tokens are defined', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );
      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      const tokens = await page.evaluate(() => {
        const style = getComputedStyle(document.documentElement);
        return {
          body: style.getPropertyValue('--font-weight-body'),
          h1: style.getPropertyValue('--font-weight-h1'),
          h2: style.getPropertyValue('--font-weight-h2'),
        };
      });

      // Verify expected values
      expect(tokens.body.trim()).toBe('400');
      expect(tokens.h1.trim()).toBe('700');
      expect(tokens.h2.trim()).toBe('600');
    });
  });
});
