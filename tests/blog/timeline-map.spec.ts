import { test, expect } from '@playwright/test';

test.describe('TimelineMap Component', () => {
  test('Default story renders SVG with nodes', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=blog-content-timelinemap--default');

    // Wait and capture any errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.waitForTimeout(3000);

    // Log errors if any
    if (errors.length > 0) {
      console.log('Page errors:', errors);
    }

    // Check for SVG
    const svg = page.locator('svg[role="img"]');
    const svgCount = await svg.count();
    console.log('SVG count:', svgCount);

    // Check for timeline nodes
    const nodes = page.locator('g.timeline-node');
    const nodeCount = await nodes.count();
    console.log('Node count:', nodeCount);

    // Should have 15 books
    expect(nodeCount).toBe(15);
  });

  test('HeroMode story renders TimelineMap in grid layout with full-width breakout', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=blog-content-timelinemap--hero-mode');

    // Wait for render
    await page.waitForTimeout(3000);

    // Check that the grid layout exists
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();

    // Check for SVG
    const svg = page.locator('svg[role="img"]');
    const svgCount = await svg.count();
    console.log('SVG count in grid:', svgCount);
    expect(svgCount).toBe(1);

    // Check for timeline nodes
    const nodes = page.locator('g.timeline-node');
    const nodeCount = await nodes.count();
    console.log('Node count in grid:', nodeCount);
    expect(nodeCount).toBe(15);

    // Verify timeline-map container spans full viewport width
    const timelineMap = page.locator('.timeline-map');
    const viewportSize = page.viewportSize();
    const mapBox = await timelineMap.boundingBox();

    if (mapBox && viewportSize) {
      // Hero container left edge should be at or near viewport left (x ≈ 0)
      console.log('TimelineMap left edge:', mapBox.x);
      console.log('TimelineMap width:', mapBox.width);
      console.log('Viewport width:', viewportSize.width);
      expect(mapBox.x).toBeLessThan(50); // Allow tolerance for scrollbar
      // TimelineMap width should be close to viewport width
      expect(Math.abs(mapBox.width - viewportSize.width)).toBeLessThan(50);
    }
  });

  test('HeroMode alignment is correct at different viewport sizes', async ({ page }) => {
    const viewportSizes = [
      { width: 375, height: 800, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1024, height: 768, name: 'lg' },
      { width: 1240, height: 800, name: 'custom-1240' },
      { width: 1280, height: 800, name: 'xl' },
      { width: 1440, height: 900, name: 'desktop' },
    ];

    for (const size of viewportSizes) {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto('http://localhost:6006/iframe.html?id=blog-content-timelinemap--hero-mode');
      await page.waitForTimeout(2000);

      const timelineMap = page.locator('.timeline-map');
      const mapBox = await timelineMap.boundingBox();

      console.log(`${size.name} (${size.width}px): left=${mapBox?.x}, width=${mapBox?.width}`);

      if (mapBox) {
        // Hero container should start near left edge at all sizes
        expect(mapBox.x).toBeLessThan(50);
        // Hero container width should be close to viewport width
        expect(Math.abs(mapBox.width - size.width)).toBeLessThan(50);
      }
    }
  });

  test('HeroMode maintains alignment on resize', async ({ page }) => {
    // Start at xl breakpoint
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:6006/iframe.html?id=blog-content-timelinemap--hero-mode');
    await page.waitForTimeout(2000);

    const timelineMap = page.locator('.timeline-map');

    // Resize to smaller (below xl breakpoint)
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.waitForTimeout(1000);

    let mapBox = await timelineMap.boundingBox();
    console.log(`After resize to 1024px: left=${mapBox?.x}, width=${mapBox?.width}`);

    if (mapBox) {
      expect(mapBox.x).toBeLessThan(50);
      expect(Math.abs(mapBox.width - 1024)).toBeLessThan(50);
    }

    // Resize back to xl
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(1000);

    mapBox = await timelineMap.boundingBox();
    console.log(`After resize back to 1280px: left=${mapBox?.x}, width=${mapBox?.width}`);

    if (mapBox) {
      expect(mapBox.x).toBeLessThan(50);
      expect(Math.abs(mapBox.width - 1280)).toBeLessThan(50);
    }
  });

  test('Table view is clickable with view toggle buttons', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=blog-content-timelinemap--hero-mode');
    await page.waitForTimeout(2000);

    // Find the table view button and click it
    const tableButton = page.locator('button', { hasText: 'Table' });
    await expect(tableButton).toBeVisible();
    await tableButton.click();

    // Wait for table to render
    await page.waitForTimeout(500);

    // Verify table is visible
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Click map button to switch back
    const mapButton = page.locator('button', { hasText: 'Map' });
    await mapButton.click();
    await page.waitForTimeout(500);

    // SVG should be visible again
    const svg = page.locator('svg[role="img"]');
    await expect(svg).toBeVisible();
  });

  test('Table view shows pagination controls', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=blog-content-timelinemap--table-view');
    await page.waitForTimeout(2000);

    // Table should have pagination controls (15 items, 10 per page = 2 pages)
    const pagination = page.locator('button', { hasText: 'Next' });
    await expect(pagination).toBeVisible();

    // Should show "Page 1 of 2"
    const pageInfo = page.locator('text=Page 1 of 2');
    await expect(pageInfo).toBeVisible();
  });
});
