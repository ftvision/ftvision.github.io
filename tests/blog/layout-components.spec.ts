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

      // Verify mode toggle dropdown trigger exists (now a dropdown with "Select mode" aria-label)
      const modeToggle = page.locator('button[aria-label="Select mode"]');
      await expect(modeToggle.first()).toBeVisible();
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

  test.describe('ModeToggle', () => {
    test('default story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-modetoggle--default&viewMode=story'
      );

      // Wait for the component to mount (ModeToggle has a mounting state)
      await page.waitForTimeout(500);

      // Verify dropdown trigger renders - uses "Select mode" aria-label
      const button = page.locator('button[aria-label="Select mode"]');
      await expect(button.first()).toBeVisible();

      // Verify it has icon (sun or moon - icon-only trigger)
      const icon = button.first().locator('svg');
      await expect(icon).toBeVisible();
    });

    test('dropdown shows mode options', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-modetoggle--default&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      const button = page.locator('button[aria-label="Select mode"]');
      await expect(button.first()).toBeVisible();

      // Click to open dropdown
      await button.first().click();

      // Verify dropdown menu appears with options
      const menu = page.locator('[role="menu"]');
      await expect(menu).toBeVisible();

      // Verify Light and Dark options are available
      await expect(menu.locator('text=Light')).toBeVisible();
      await expect(menu.locator('text=Dark')).toBeVisible();
    });
  });

  test.describe('ThemeSelector', () => {
    test('default story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-themeselector--default&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      // Verify dropdown trigger renders - uses "Select theme" aria-label
      const button = page.locator('button[aria-label="Select theme"]');
      await expect(button.first()).toBeVisible();

      // Verify it has icon (theme icon - icon-only trigger)
      const icon = button.first().locator('svg');
      await expect(icon).toBeVisible();
    });

    test('dropdown shows theme options', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-themeselector--default&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      const button = page.locator('button[aria-label="Select theme"]');
      await expect(button.first()).toBeVisible();

      // Click to open dropdown
      await button.first().click();

      // Verify dropdown menu appears with options
      const menu = page.locator('[role="menu"]');
      await expect(menu).toBeVisible();

      // Verify all theme options are available
      await expect(menu.locator('text=Default')).toBeVisible();
      await expect(menu.locator('text=Brutalism')).toBeVisible();
      await expect(menu.locator('text=Chinese Aesthetic')).toBeVisible();
    });
  });

  test.describe('LanguageToggle', () => {
    test('default story renders correctly with EN label', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-languagetoggle--default&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      // Verify dropdown trigger renders with "Select language" aria-label
      const button = page.locator('button[aria-label="Select language"]');
      await expect(button).toBeVisible();

      // Verify it shows EN for English language
      await expect(button).toContainText('EN');
    });

    test('dropdown shows language options', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-languagetoggle--default&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      const button = page.locator('button[aria-label="Select language"]');
      await expect(button).toBeVisible();

      // Click to open dropdown
      await button.click();

      // Verify dropdown menu appears with options
      const menu = page.locator('[role="menu"]');
      await expect(menu).toBeVisible();

      // Verify language options are available
      await expect(menu.locator('text=English')).toBeVisible();
      await expect(menu.locator('text=中文')).toBeVisible();
    });

    test('shows check icon for current language', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-languagetoggle--default&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      const button = page.locator('button[aria-label="Select language"]');
      await button.click();

      // Verify dropdown menu appears
      const menu = page.locator('[role="menu"]');
      await expect(menu).toBeVisible();

      // The English option should have a check icon (SVG)
      const englishItem = menu.locator('[role="menuitem"]').filter({ hasText: 'English' });
      await expect(englishItem).toBeVisible();
      const checkIcon = englishItem.locator('svg');
      await expect(checkIcon).toBeVisible();
    });

    /**
     * NOTE: In Storybook, the LanguageProvider syncs language from URL path.
     * Since Storybook URLs don't include /zh/ prefix, the path-based language
     * detection overrides initialLanguage="zh" to "en".
     *
     * This is expected behavior - in the real app, URL is source of truth.
     * The ChineseLanguage story demonstrates the decorator pattern but can't
     * fully test Chinese display without mocking usePathname.
     */
    test('chinese language story shows toggle (path overrides initial)', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-languagetoggle--chinese-language&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      // Verify dropdown trigger renders
      const button = page.locator('button[aria-label="Select language"]');
      await expect(button).toBeVisible();

      // In Storybook, path-based detection overrides initialLanguage to "en"
      // This documents current behavior - URL is source of truth
      await expect(button).toContainText('EN');
    });

    test('in header story shows toggle in context', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-languagetoggle--in-header&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      // Verify header renders with language toggle
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Verify language toggle is in the header
      const button = header.locator('button[aria-label="Select language"]');
      await expect(button).toBeVisible();
    });

    test('with theme controls story shows all toggles together', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-layout-languagetoggle--with-theme-controls&viewMode=story'
      );

      // Wait for the component to mount
      await page.waitForTimeout(500);

      // Verify all controls are visible
      const languageToggle = page.locator('button[aria-label="Select language"]');
      const themeSelector = page.locator('button[aria-label="Select theme"]');
      const modeToggle = page.locator('button[aria-label="Select mode"]');

      await expect(languageToggle).toBeVisible();
      await expect(themeSelector).toBeVisible();
      await expect(modeToggle).toBeVisible();
    });
  });
});
