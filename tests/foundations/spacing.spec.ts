import { test, expect } from '@playwright/test';
import {
  navigateToStory,
  getComputedStyleProperty,
  parsePixelValue,
} from '../utils';

/**
 * Spacing System Tests
 *
 * Tests the design token spacing system including:
 * - Gutter spacing (grid gaps)
 * - Inset spacing (padding)
 * - Stack spacing (vertical rhythm)
 *
 * These tests are theme-agnostic and verify the spacing token values
 * are correctly applied regardless of the active theme.
 */
test.describe('Foundations: Spacing System', () => {
  test.describe('Gutter Spacing (Grid Gaps)', () => {
    test('applies progressive gap sizes to grid layouts', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'foundations-spacing--grid-example'
      );

      await iframe.locator('text=Grid with Gutter Spacing').waitFor();

      // The grid example uses grid-cols-4 with three different gap sizes
      const grids = iframe.locator('.grid.grid-cols-4');
      await expect(grids).toHaveCount(3);

      const gaps = await Promise.all([
        getComputedStyleProperty(grids.nth(0), 'gap'),
        getComputedStyleProperty(grids.nth(1), 'gap'),
        getComputedStyleProperty(grids.nth(2), 'gap'),
      ]);

      const [gapXs, gapMd, gapXl] = gaps.map(parsePixelValue);

      // Verify gaps increase progressively
      expect(gapXs).toBeLessThan(gapMd);
      expect(gapMd).toBeLessThan(gapXl);

      // Verify expected token values: xs=8px, md=16px, xl=32px
      expect(gapXs).toBeCloseTo(8, 0);
      expect(gapMd).toBeCloseTo(16, 0);
      expect(gapXl).toBeCloseTo(32, 0);
    });
  });

  test.describe('Inset Spacing (Padding)', () => {
    test('applies progressive padding sizes to containers', async ({
      page,
    }) => {
      const iframe = await navigateToStory(
        page,
        'foundations-spacing--inset-examples'
      );

      await iframe.locator('text=Inset Padding Examples').waitFor();

      // The InsetExamples story has 5 containers with different p-inset-* classes
      // They use bg-ground-secondary with border
      const containers = iframe.locator(
        '.flex.gap-gutter-lg > .bg-ground-secondary.border'
      );

      // Should have 5 containers: xs, sm, md, lg, xl
      await expect(containers).toHaveCount(5);

      const paddings: number[] = [];
      for (let i = 0; i < 5; i++) {
        const padding = await getComputedStyleProperty(
          containers.nth(i),
          'padding'
        );
        paddings.push(parsePixelValue(padding));
      }

      // Verify paddings increase progressively
      for (let i = 1; i < paddings.length; i++) {
        expect(paddings[i]).toBeGreaterThan(paddings[i - 1]);
      }
    });
  });

  test.describe('Stack Spacing (Vertical Rhythm)', () => {
    test('applies progressive vertical spacing values', async ({ page }) => {
      const iframe = await navigateToStory(page, 'foundations-spacing--stack');

      await iframe.locator('text=Stack Spacing').waitFor();

      const bars = iframe.locator('.bg-action-primary.h-4');

      // Should have 7 bars: xs, sm, md, lg, xl, 2xl, 3xl
      await expect(bars).toHaveCount(7);

      const widths: number[] = [];
      for (let i = 0; i < 7; i++) {
        const width = await bars.nth(i).evaluate((el) => {
          return el.getBoundingClientRect().width;
        });
        widths.push(width);
      }

      // Verify widths increase progressively
      for (let i = 1; i < widths.length; i++) {
        expect(widths[i]).toBeGreaterThan(widths[i - 1]);
      }

      // Verify expected token values
      // xs=4px, sm=8px, md=16px, lg=24px, xl=32px, 2xl=48px, 3xl=64px
      const expectedValues = [4, 8, 16, 24, 32, 48, 64];
      widths.forEach((width, i) => {
        expect(width).toBeCloseTo(expectedValues[i], 0);
      });
    });
  });
});
