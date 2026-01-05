import { test, expect } from '@playwright/test';

/**
 * Blog Editorial Components Tests
 *
 * Verifies that editorial components (FeaturedCard, EditorialSection, EditorialGrid, Item)
 * render correctly in Storybook.
 */

test.describe('Blog: Editorial Components', () => {
  test.describe('Item', () => {
    test('default story renders item with title and description', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-item--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify item container exists
      const item = page.locator('.editorial-item');
      await expect(item).toBeVisible();

      // Verify title link exists
      const titleLink = item.locator('a');
      await expect(titleLink).toBeVisible();
      await expect(titleLink).toContainText('迷之魔数：7');

      // Verify description exists
      const description = item.locator('p');
      await expect(description).toBeVisible();
    });

    test('item title is styled as accent color link', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-item--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const titleLink = page.locator('.editorial-item a');
      await expect(titleLink).toHaveClass(/text-accent-primary/);
    });

    test('external link opens in new tab', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-item--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const titleLink = page.locator('.editorial-item a');
      await expect(titleLink).toHaveAttribute('target', '_blank');
      await expect(titleLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('internal link does not have target blank', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-item--internal-link&viewMode=story'
      );

      await page.waitForTimeout(300);

      const titleLink = page.locator('.editorial-item a');
      await expect(titleLink).not.toHaveAttribute('target', '_blank');
    });

    test('item without description renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-item--without-description&viewMode=story'
      );

      await page.waitForTimeout(300);

      const item = page.locator('.editorial-item');
      await expect(item).toBeVisible();

      // Should not have description paragraph
      const description = item.locator('p');
      await expect(description).toHaveCount(0);
    });

    test('multiple items render in list', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-item--multiple-items&viewMode=story'
      );

      await page.waitForTimeout(300);

      const items = page.locator('.editorial-item');
      await expect(items).toHaveCount(3);
    });

    test('item has red accent bullet point', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-item--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const bullet = page.locator('.editorial-item span[aria-hidden="true"]');
      await expect(bullet).toBeVisible();
      await expect(bullet).toHaveClass(/text-accent-primary/);
      await expect(bullet).toContainText('○');
    });
  });

  test.describe('EditorialSection', () => {
    test('default story renders section with title', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialsection--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const section = page.locator('.editorial-section');
      await expect(section).toBeVisible();

      const title = section.locator('h3');
      await expect(title).toBeVisible();
      await expect(title).toContainText('观点讨论');
    });

    test('section with description renders prose', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialsection--with-description&viewMode=story'
      );

      await page.waitForTimeout(300);

      const section = page.locator('.editorial-section');
      const description = section.locator('p').first();
      await expect(description).toBeVisible();
      await expect(description).toContainText('从眼睛看见世界');
    });

    test('card variant has border and padding', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialsection--card-variant&viewMode=story'
      );

      await page.waitForTimeout(300);

      const section = page.locator('.editorial-section');
      await expect(section).toHaveClass(/p-6/);
      await expect(section).toHaveClass(/border/);
    });

    test('card variant title has bottom border', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialsection--card-variant&viewMode=story'
      );

      await page.waitForTimeout(300);

      const title = page.locator('.editorial-section h3');
      await expect(title).toHaveClass(/border-b/);
      await expect(title).toHaveClass(/pb-2/);
    });

    test('section title uses serif font', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialsection--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const title = page.locator('.editorial-section h3');
      await expect(title).toHaveClass(/font-serif/);
    });

    test('section contains child items', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialsection--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Check for items container and links within the section
      const itemsContainer = page.locator('.editorial-section-items');
      await expect(itemsContainer).toBeVisible();

      // Verify there are links (items) within the section
      const links = page.locator('.editorial-section a');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('FeaturedCard', () => {
    test('default story renders featured card', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const card = page.locator('.featured-card');
      await expect(card).toBeVisible();
    });

    test('featured card has accent left border', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const card = page.locator('.featured-card');
      await expect(card).toHaveClass(/border-l-4/);
      await expect(card).toHaveClass(/border-accent-primary/);
    });

    test('featured card displays title as link', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const titleLink = page.locator('.featured-card h2 a');
      await expect(titleLink).toBeVisible();
      await expect(titleLink).toContainText('知识的诅咒');
    });

    test('featured card title uses serif font', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const titleLink = page.locator('.featured-card h2 a');
      await expect(titleLink).toHaveClass(/font-serif/);
    });

    test('featured card displays label badge', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Look for badge with label text - Badge uses uppercase tracking-wider class
      const badge = page.locator('.featured-card span.uppercase');
      await expect(badge).toBeVisible();
      await expect(badge).toContainText('精选');
    });

    test('featured card without label has no badge', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--without-label&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Badge should not exist - check for uppercase class which is used on badge
      const badge = page.locator('.featured-card span.uppercase');
      await expect(badge).toHaveCount(0);
    });

    test('featured card displays source attribution', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const card = page.locator('.featured-card');
      await expect(card).toContainText('知乎专栏');
    });

    test('featured card displays description', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const description = page.locator('.featured-card p');
      await expect(description).toBeVisible();
      await expect(description).toContainText('为什么专家往往难以');
    });

    test('featured card has read link', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const readLink = page.locator('.featured-card').locator('text=阅读 →');
      await expect(readLink).toBeVisible();
    });

    test('external link shows arrow indicator', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      const arrow = page.locator('.featured-card h2 span[aria-hidden="true"]');
      await expect(arrow).toContainText('↗');
    });

    test('internal link does not show arrow indicator', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--internal-link&viewMode=story'
      );

      await page.waitForTimeout(300);

      const arrow = page.locator('.featured-card h2 span[aria-hidden="true"]');
      await expect(arrow).toHaveCount(0);
    });

    test('only title underlines on hover, not entire card', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-featuredcard--default&viewMode=story'
      );

      await page.waitForTimeout(300);

      // Verify the card container is a div, not an anchor
      const card = page.locator('.featured-card');
      const tagName = await card.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');

      // Verify title link has hover:underline class
      const titleLink = page.locator('.featured-card h2 a');
      await expect(titleLink).toHaveClass(/hover:underline/);
    });
  });

  test.describe('EditorialGrid', () => {
    test('two column grid renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--two-columns&viewMode=story'
      );

      await page.waitForTimeout(300);

      const grid = page.locator('.editorial-grid');
      await expect(grid).toBeVisible();
      await expect(grid).toHaveClass(/grid/);
    });

    test('two column grid has md:grid-cols-2 class', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--two-columns&viewMode=story'
      );

      await page.waitForTimeout(300);

      const grid = page.locator('.editorial-grid');
      await expect(grid).toHaveClass(/md:grid-cols-2/);
    });

    test('three column grid has md:grid-cols-3 class', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--three-columns&viewMode=story'
      );

      await page.waitForTimeout(300);

      const grid = page.locator('.editorial-grid');
      await expect(grid).toHaveClass(/md:grid-cols-3/);
    });

    test('grid is single column on mobile', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--two-columns&viewMode=story'
      );

      await page.waitForTimeout(300);

      const grid = page.locator('.editorial-grid');
      await expect(grid).toHaveClass(/grid-cols-1/);
    });

    test('grid has proper gap spacing', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--two-columns&viewMode=story'
      );

      await page.waitForTimeout(300);

      const grid = page.locator('.editorial-grid');
      await expect(grid).toHaveClass(/gap-6/);
    });

    test('grid contains editorial sections', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--two-columns&viewMode=story'
      );

      await page.waitForTimeout(300);

      const sections = page.locator('.editorial-grid .editorial-section');
      await expect(sections).toHaveCount(2);
    });

    test('full page composition renders all components', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--full-page-composition&viewMode=story'
      );

      await page.waitForTimeout(500);

      // Verify featured card exists
      const featuredCard = page.locator('.featured-card');
      await expect(featuredCard).toBeVisible();

      // Verify multiple grids exist
      const grids = page.locator('.editorial-grid');
      const gridCount = await grids.count();
      expect(gridCount).toBeGreaterThanOrEqual(3);

      // Verify sections exist
      const sections = page.locator('.editorial-section');
      const sectionCount = await sections.count();
      expect(sectionCount).toBeGreaterThanOrEqual(6);
    });

    test('grid is responsive - collapses on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--two-columns&viewMode=story'
      );

      await page.waitForTimeout(300);

      const grid = page.locator('.editorial-grid');

      // On mobile, grid-cols-1 should be active (single column)
      const gridTemplateColumns = await grid.evaluate((el) =>
        window.getComputedStyle(el).gridTemplateColumns
      );

      // Should be a single column (one value, not two)
      const columnCount = gridTemplateColumns.split(' ').length;
      expect(columnCount).toBe(1);
    });

    test('grid shows two columns on desktop', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1024, height: 768 });

      await page.goto(
        '/iframe.html?id=blog-editorial-editorialgrid--two-columns&viewMode=story'
      );

      await page.waitForTimeout(300);

      const grid = page.locator('.editorial-grid');

      // On desktop (md+), grid-cols-2 should be active
      const gridTemplateColumns = await grid.evaluate((el) =>
        window.getComputedStyle(el).gridTemplateColumns
      );

      // Should have two columns
      const columnCount = gridTemplateColumns.split(' ').length;
      expect(columnCount).toBe(2);
    });
  });
});
