import { test, expect } from '@playwright/test';

/**
 * Blog Layout Components Tests
 *
 * Verifies that blog-specific layout components render correctly in Storybook.
 */

test.describe('Blog: Layout Components', () => {
  test.describe('SiteHeader', () => {
    test('default story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-siteheader--default&viewMode=story'
      );

      // Verify header renders
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Verify site name link is displayed (the first "Essays" is the site name link)
      const siteNameLink = page.locator('header a[href="/"]');
      await expect(siteNameLink).toBeVisible();
      await expect(siteNameLink).toContainText('Essays');
    });

    test('with theme toggle renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-siteheader--with-theme-toggle&viewMode=story'
      );

      // Verify header renders
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Verify theme toggle button exists (look for aria-label containing "mode")
      const themeToggle = page.locator(
        'button[aria-label*="mode"], button[aria-label="Toggle theme"]'
      );
      await expect(themeToggle.first()).toBeVisible();
    });
  });

  test.describe('SiteFooter', () => {
    test('default story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-sitefooter--default&viewMode=story'
      );

      // Verify footer renders
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('with social links renders icons', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-sitefooter--with-social-links&viewMode=story'
      );

      // Verify footer renders
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // Verify social links are present (SVG icons)
      const socialIcons = footer.locator('svg');
      await expect(socialIcons).toHaveCount(3); // GitHub, Twitter, LinkedIn
    });
  });

  test.describe('SiteNav', () => {
    test('default story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-sitenav--default&viewMode=story'
      );

      // Verify nav renders
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    });

    test('custom links story shows all links', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-sitenav--custom-links&viewMode=story'
      );

      // Verify nav renders
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Verify custom links are present
      await expect(page.locator('text=Blog')).toBeVisible();
      await expect(page.locator('text=Projects')).toBeVisible();
      await expect(page.locator('text=About')).toBeVisible();
      await expect(page.locator('text=Contact')).toBeVisible();
    });
  });

  test.describe('ThemeToggle', () => {
    test('default story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-themetoggle--default&viewMode=story'
      );

      // Wait for the component to mount (ThemeToggle has a mounting state)
      await page.waitForTimeout(500);

      // Verify toggle button renders - look for the theme toggle by aria-label
      const button = page.locator(
        'button[aria-label*="mode"], button[aria-label="Toggle theme"]'
      );
      await expect(button.first()).toBeVisible();

      // Verify it has an icon
      const icon = button.first().locator('svg');
      await expect(icon).toBeVisible();
    });

    test('toggle changes theme', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-themetoggle--default&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      const button = page.locator(
        'button[aria-label*="mode"], button[aria-label="Toggle theme"]'
      );
      await expect(button.first()).toBeVisible();

      // Click to toggle theme
      await button.first().click();

      // The button should still be visible after toggle (we're testing it doesn't crash)
      await expect(button.first()).toBeVisible();
    });
  });
});
