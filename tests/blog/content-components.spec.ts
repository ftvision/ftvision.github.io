import { test, expect } from '@playwright/test';

/**
 * Blog Content Components Tests
 *
 * Verifies that blog-specific content components (sidenotes, references, etc.)
 * render correctly in Storybook.
 */

test.describe('Blog: Content Components', () => {
  test.describe('Note (Sidenote)', () => {
    test('default story renders note with superscript', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-note--default&viewMode=story'
      );

      // Wait for component to render
      await page.waitForTimeout(300);

      // Verify superscript number exists
      const superscript = page.locator('sup');
      await expect(superscript).toBeVisible();
      await expect(superscript).toContainText('1');
    });

    test('multiple notes story shows sequential numbers', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-note--multiple-notes&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Should have multiple superscript numbers
      const superscripts = page.locator('sup');
      await expect(superscripts).toHaveCount(3);
    });

    test('note has proper accessibility attributes', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-note--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify toggle button has aria-label
      const toggleButton = page.locator('.note-toggle');
      await expect(toggleButton).toHaveAttribute('aria-label', /Note \d+/);
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      await expect(toggleButton).toHaveAttribute('aria-controls', /note-content-/);

      // Verify note content has role="note"
      const noteContent = page.locator('.note-content');
      await expect(noteContent).toHaveAttribute('role', 'note');
    });

    test('note toggle expands content on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(
        '/iframe.html?id=blog-content-note--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const toggleButton = page.locator('.note-toggle');
      const noteContent = page.locator('.note-content');

      // Initially collapsed (max-h-0)
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      // Click to expand
      await toggleButton.click();
      await page.waitForTimeout(200);

      // Should now be expanded
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

      // Content should be visible with background styling
      await expect(noteContent).toHaveClass(/bg-ground-secondary/);
    });

    test('note content is hidden on mobile when collapsed', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(
        '/iframe.html?id=blog-content-note--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const noteContent = page.locator('.note-content');

      // On mobile, collapsed notes should have max-h-0 and opacity-0
      await expect(noteContent).toHaveClass(/max-h-0/);
      await expect(noteContent).toHaveClass(/opacity-0/);

      // Verify computed styles show it's effectively hidden
      const opacity = await noteContent.evaluate((el) =>
        window.getComputedStyle(el).opacity
      );
      expect(opacity).toBe('0');
    });

    test('note is always visible in right margin on desktop', async ({ page }) => {
      // Set desktop viewport (>= 1024px for lg: breakpoint)
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-content-note--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const noteContent = page.locator('.note-content');

      // On desktop, note content should have float positioning classes
      await expect(noteContent).toHaveClass(/lg:float-right/);
      await expect(noteContent).toHaveClass(/lg:clear-right/);

      // Verify computed style shows float positioning
      const float = await noteContent.evaluate((el) =>
        window.getComputedStyle(el).float
      );
      expect(float).toBe('right');

      // Verify it has negative margin to pull into the margin space
      const marginRight = await noteContent.evaluate((el) =>
        window.getComputedStyle(el).marginRight
      );
      expect(marginRight).toBe('-320px');

      // Verify it's visible (opacity should be 1 on desktop)
      const opacity = await noteContent.evaluate((el) =>
        window.getComputedStyle(el).opacity
      );
      expect(opacity).toBe('1');
    });

    test('note displays number prefix on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-content-note--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // The number prefix should be visible on desktop (hidden lg:inline)
      const numberPrefix = page.locator('.note-content span.lg\\:inline');
      await expect(numberPrefix).toBeVisible();

      // Should contain the note number followed by a period
      await expect(numberPrefix).toContainText('1.');
    });

    test('note toggle is non-interactive on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-content-note--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const toggleButton = page.locator('.note-toggle');

      // On desktop, toggle should have pointer-events: none
      await expect(toggleButton).toHaveClass(/lg:pointer-events-none/);

      const pointerEvents = await toggleButton.evaluate((el) =>
        window.getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    });
  });

  test.describe('Marginnote', () => {
    test('default story renders marginnote', async ({ page }) => {
      // Set mobile viewport where toggle is visible
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(
        '/iframe.html?id=blog-content-marginnote--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify marginnote toggle button exists (visible on mobile)
      const toggleButton = page.locator('.marginnote-toggle');
      await expect(toggleButton).toBeVisible();
    });

    test('marginnote has proper accessibility attributes', async ({ page }) => {
      // Set mobile viewport where toggle is visible
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(
        '/iframe.html?id=blog-content-marginnote--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify toggle button has aria-label
      const toggleButton = page.locator('.marginnote-toggle');
      await expect(toggleButton).toHaveAttribute('aria-label', 'Toggle margin note');
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      // Verify marginnote content has role="note"
      const noteContent = page.locator('.marginnote-content');
      await expect(noteContent).toHaveAttribute('role', 'note');
    });

    test('marginnote toggle expands content on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(
        '/iframe.html?id=blog-content-marginnote--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const toggleButton = page.locator('.marginnote-toggle');

      // Click to expand
      await toggleButton.click();
      await page.waitForTimeout(200);

      // Should now be expanded
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('marginnote content is hidden on mobile when collapsed', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(
        '/iframe.html?id=blog-content-marginnote--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const marginnoteContent = page.locator('.marginnote-content');

      // On mobile, collapsed marginnotes should have max-h-0 and opacity-0
      await expect(marginnoteContent).toHaveClass(/max-h-0/);
      await expect(marginnoteContent).toHaveClass(/opacity-0/);

      // Verify computed styles show it's effectively hidden
      const opacity = await marginnoteContent.evaluate((el) =>
        window.getComputedStyle(el).opacity
      );
      expect(opacity).toBe('0');
    });

    test('marginnote is always visible in right margin on desktop', async ({ page }) => {
      // Set desktop viewport (>= 1024px for lg: breakpoint)
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-content-marginnote--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const marginnoteContent = page.locator('.marginnote-content');

      // On desktop, marginnote content should have float positioning classes
      await expect(marginnoteContent).toHaveClass(/lg:float-right/);
      await expect(marginnoteContent).toHaveClass(/lg:clear-right/);

      // Verify computed style shows float positioning
      const float = await marginnoteContent.evaluate((el) =>
        window.getComputedStyle(el).float
      );
      expect(float).toBe('right');

      // Verify it has negative margin to pull into the margin space
      const marginRight = await marginnoteContent.evaluate((el) =>
        window.getComputedStyle(el).marginRight
      );
      expect(marginRight).toBe('-320px');

      // Verify it's visible (opacity should be 1 on desktop)
      const opacity = await marginnoteContent.evaluate((el) =>
        window.getComputedStyle(el).opacity
      );
      expect(opacity).toBe('1');
    });

    test('marginnote is italic on desktop (distinguishes from Note)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-content-marginnote--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const marginnoteContent = page.locator('.marginnote-content');

      // Marginnote should have italic class on desktop
      await expect(marginnoteContent).toHaveClass(/lg:italic/);

      // Verify computed style shows italic
      const fontStyle = await marginnoteContent.evaluate((el) =>
        window.getComputedStyle(el).fontStyle
      );
      expect(fontStyle).toBe('italic');
    });

    test('marginnote toggle is hidden on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-content-marginnote--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const toggleButton = page.locator('.marginnote-toggle');

      // On desktop, toggle should be hidden (lg:hidden class)
      await expect(toggleButton).toHaveClass(/lg:hidden/);

      // Verify computed style shows it's hidden
      const display = await toggleButton.evaluate((el) =>
        window.getComputedStyle(el).display
      );
      expect(display).toBe('none');
    });

    test('marginnote has no number (distinguishes from Note)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-content-marginnote--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const marginnoteContent = page.locator('.marginnote-content');
      const text = await marginnoteContent.textContent();

      // Marginnote content should NOT start with a number prefix like "1."
      expect(text).not.toMatch(/^\s*\d+\./);
    });
  });

  test.describe('Reference', () => {
    test('default story renders reference with bracket notation', async ({
      page,
    }) => {
      await page.goto(
        '/iframe.html?id=blog-content-reference--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify reference link exists with [1] format
      const refLink = page.locator('.reference-link');
      await expect(refLink).toBeVisible();
      await expect(refLink).toContainText('[1]');
    });

    test('reference link has proper aria-label with citation', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-reference--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify reference link has descriptive aria-label
      const refLink = page.locator('.reference-link');
      await expect(refLink).toHaveAttribute('aria-label', /Reference 1:/);
    });

    test('reference link points to correct anchor', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-reference--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify href format
      const refLink = page.locator('.reference-link');
      await expect(refLink).toHaveAttribute('href', /^#ref-/);
    });

    test('with references section shows citation list', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-reference--with-references-section&viewMode=story'
      );

      await page.waitForTimeout(500);

      // Verify references section exists
      const referencesSection = page.locator('.references-section');
      await expect(referencesSection).toBeVisible();

      // Verify there are list items
      const refItems = referencesSection.locator('li');
      const count = await refItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('references section renders all citations from context', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-reference--with-references-section&viewMode=story'
      );

      await page.waitForTimeout(500);

      // Verify references section has proper heading
      const heading = page.locator('#references-heading');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('References');

      // Verify each reference has an id anchor
      const refItems = page.locator('.references-section li[id^="ref-"]');
      const count = await refItems.count();
      expect(count).toBeGreaterThan(0);

      // Verify reference numbers are sequential [1], [2], [3]
      const refNumbers = page.locator('.references-section li span:first-child');
      const firstNumber = await refNumbers.first().textContent();
      expect(firstNumber).toContain('[1]');
    });

    test('multiple references get sequential numbers', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-reference--multiple-references&viewMode=story'
      );

      // Wait for component to render
      await page.waitForSelector('.reference-link', { timeout: 10000 });

      // Get all reference links
      const refLinks = page.locator('.reference-link');
      const count = await refLinks.count();
      expect(count).toBe(4); // The MultipleReferences story has 4 references

      // Verify they have sequential numbers
      const texts = await refLinks.allTextContents();
      expect(texts).toContain('[1]');
      expect(texts).toContain('[2]');
      expect(texts).toContain('[3]');
      expect(texts).toContain('[4]');
    });
  });

  test.describe('WideBlock', () => {
    test('default story renders wide block', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-wideblock--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify wide block container exists
      const wideBlock = page.locator('.wide-block');
      await expect(wideBlock).toBeVisible();
    });

    test('screen width story has full viewport width', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-wideblock--screen-width&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify wide block exists
      const wideBlock = page.locator('.wide-block');
      await expect(wideBlock).toBeVisible();

      // Verify it has the w-screen class for full viewport width
      await expect(wideBlock).toHaveClass(/w-screen/);
    });

    test('full width story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-wideblock--full-width&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify wide block exists
      const wideBlock = page.locator('.wide-block');
      await expect(wideBlock).toBeVisible();
    });

    test('wide block has proper margin classes', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-content-wideblock--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify wide block has vertical margin
      const wideBlock = page.locator('.wide-block');
      await expect(wideBlock).toHaveClass(/my-8/);
    });
  });
});
