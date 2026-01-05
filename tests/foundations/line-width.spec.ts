import { test, expect } from '@playwright/test';

/**
 * Theme Line Width Tests
 *
 * Verifies that essay content line widths are consistent across themes.
 * The EssayLayout uses fixed rem values (48rem = 768px on xl screens) to ensure
 * consistent line widths regardless of theme font size or family.
 */

test.describe('Theme Line Width Comparison', () => {
  const themes = ['nyt', 'chinese-aesthetic', 'brutalism'] as const;

  test.describe('EssayLayout content width', () => {
    for (const theme of themes) {
      test(`${theme} theme - measures content width on desktop`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });

        // Navigate to EssayLayout story
        await page.goto(
          `/iframe.html?id=blog-essay-essaylayout--default&viewMode=story&globals=theme:${theme}`
        );

        await page.waitForSelector('.essay-layout', { timeout: 10000 });

        // Get the essay-content element
        const contentArea = page.locator('.essay-content');
        await expect(contentArea).toBeVisible();

        // Measure computed styles
        const styles = await contentArea.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            maxWidth: computed.maxWidth,
            width: rect.width,
            fontSize: computed.fontSize,
            fontFamily: computed.fontFamily,
          };
        });

        console.log(`Theme: ${theme}`);
        console.log(`  Max-width: ${styles.maxWidth}`);
        console.log(`  Actual width: ${styles.width}px`);
        console.log(`  Font-size: ${styles.fontSize}`);
        console.log(`  Font-family: ${styles.fontFamily.slice(0, 50)}...`);

        // Verify max-width is set to fixed pixel value (768px = 48rem on xl screens)
        expect(styles.maxWidth).toMatch(/px/);
      });
    }

    test('all themes have same content width on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      const contentWidths: Record<string, number> = {};

      for (const theme of themes) {
        await page.goto(
          `/iframe.html?id=blog-essay-essaylayout--default&viewMode=story&globals=theme:${theme}`
        );

        await page.waitForSelector('.essay-layout', { timeout: 10000 });

        const contentArea = page.locator('.essay-content');
        await expect(contentArea).toBeVisible();

        const width = await contentArea.evaluate((el) => {
          return el.getBoundingClientRect().width;
        });

        contentWidths[theme] = width;
      }

      console.log('\n=== Content Width Comparison ===');
      console.log('NYT width:', contentWidths['nyt'], 'px');
      console.log('Chinese-aesthetic width:', contentWidths['chinese-aesthetic'], 'px');
      console.log('Brutalism width:', contentWidths['brutalism'], 'px');

      // All themes should have the same content width (672px = 42rem)
      const expectedWidth = 672;
      const tolerance = 2; // Allow small rounding differences

      expect(Math.abs(contentWidths['nyt'] - expectedWidth)).toBeLessThanOrEqual(tolerance);
      expect(Math.abs(contentWidths['chinese-aesthetic'] - expectedWidth)).toBeLessThanOrEqual(tolerance);
      expect(Math.abs(contentWidths['brutalism'] - expectedWidth)).toBeLessThanOrEqual(tolerance);
    });

    test('documents font sizes across themes (vary by design)', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      const fontSizes: Record<string, string> = {};
      const fontFamilies: Record<string, string> = {};

      for (const theme of themes) {
        await page.goto(
          `/iframe.html?id=blog-essay-essaylayout--default&viewMode=story&globals=theme:${theme}`
        );

        await page.waitForSelector('.essay-layout', { timeout: 10000 });

        const contentArea = page.locator('.essay-content');
        await expect(contentArea).toBeVisible();

        const styles = await contentArea.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            fontSize: computed.fontSize,
            fontFamily: computed.fontFamily,
          };
        });

        fontSizes[theme] = styles.fontSize;
        fontFamilies[theme] = styles.fontFamily;
      }

      console.log('\n=== Font Style Comparison ===');
      console.log('NYT font-size:', fontSizes['nyt'], '| font-family:', fontFamilies['nyt'].slice(0, 40));
      console.log('Chinese-aesthetic font-size:', fontSizes['chinese-aesthetic'], '| font-family:', fontFamilies['chinese-aesthetic'].slice(0, 40));
      console.log('Brutalism font-size:', fontSizes['brutalism'], '| font-family:', fontFamilies['brutalism'].slice(0, 40));

      // All themes should have valid font sizes (this is a documentation test)
      for (const theme of themes) {
        const size = parseFloat(fontSizes[theme]);
        expect(size).toBeGreaterThan(0);
        expect(fontFamilies[theme]).toBeTruthy();
      }
    });
  });
});
