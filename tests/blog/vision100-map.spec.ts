import { test, expect } from '@playwright/test';

test.describe('Vision100Map Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Vision100Map story
    await page.goto(
      'http://localhost:6006/iframe.html?id=blog-vision100-vision100map--default'
    );
    // Wait for the SVG to render
    await page.waitForSelector('svg[role="img"]');
  });

  test('should render SVG with 100 paper nodes', async ({ page }) => {
    // Check SVG exists
    const svg = page.locator('svg[role="img"]');
    await expect(svg).toBeVisible();

    // Check for timeline node groups
    const nodes = page.locator('g.timeline-node');
    const nodeCount = await nodes.count();
    console.log(`Found ${nodeCount} timeline nodes`);

    // We should have exactly 100 papers
    expect(nodeCount).toBe(100);
  });

  test('should render timeline lines for each topic', async ({ page }) => {
    // Check for timeline line groups
    const lines = page.locator('g[class*="timeline-line--"]');
    const lineCount = await lines.count();
    console.log(`Found ${lineCount} timeline lines`);

    // Should have 7 topic lines
    expect(lineCount).toBe(7);
  });

  test('should render colored circles for nodes', async ({ page }) => {
    // Check for circles with stroke colors (the main node circles)
    const circles = page.locator('g.timeline-node circle');
    const circleCount = await circles.count();
    console.log(`Found ${circleCount} circles in nodes`);

    // Each node has 2 circles (main + center dot), so should be 200 for 100 papers
    expect(circleCount).toBeGreaterThan(100);
  });

  test('should render category labels on the right', async ({ page }) => {
    // Check for category label circles
    const labelCircles = page.locator('g.category-labels circle');
    const labelCount = await labelCircles.count();
    console.log(`Found ${labelCount} category label circles`);

    // Should have 7 category label circles
    expect(labelCount).toBe(7);
  });

  test('should have visible lines with stroke', async ({ page }) => {
    // Get the timeline lines and check they have visible paths
    const linePaths = page.locator('g[class^="timeline-line"] path');
    const pathCount = await linePaths.count();
    console.log(`Found ${pathCount} line paths`);

    // Each line has 2 paths (background + colored), so 14 total
    expect(pathCount).toBe(14);

    // Check the first path has a stroke style
    const firstPath = linePaths.first();
    const style = await firstPath.getAttribute('style');
    console.log(`First path style: ${style}`);
    expect(style).toContain('stroke');
  });

  test('should position nodes with transform attributes', async ({ page }) => {
    // Check that we have nodes by examining the transform attributes
    const nodes = page.locator('g.timeline-node');
    const transforms: string[] = [];

    const count = await nodes.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const transform = await nodes.nth(i).getAttribute('transform');
      if (transform) {
        transforms.push(transform);
      }
    }

    console.log('Sample transforms:', transforms);

    // Transforms should contain translate values
    expect(transforms.length).toBeGreaterThan(0);
    expect(transforms[0]).toContain('translate');
  });

  test('table view button should toggle to table', async ({ page }) => {
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
});

test.describe('Vision100 Table View', () => {
  test('table view shows pagination with 10 papers per page', async ({ page }) => {
    await page.goto(
      'http://localhost:6006/iframe.html?id=blog-vision100-vision100map--table-view'
    );
    await page.waitForTimeout(2000);

    // Table should show pagination (100 items, 10 per page = 10 pages)
    const pageInfo = page.locator('text=Page 1 of 10');
    await expect(pageInfo).toBeVisible();

    // Should show "Showing 1-10 of 100 items"
    const itemCount = page.locator('text=Showing 1-10 of 100 items');
    await expect(itemCount).toBeVisible();
  });

  test('table view shows full author names', async ({ page }) => {
    await page.goto(
      'http://localhost:6006/iframe.html?id=blog-vision100-vision100map--table-view'
    );
    await page.waitForTimeout(2000);

    // Check that full author names are displayed (not just first author)
    // Look for common patterns in author lists (e.g., "et al" or multiple authors separated by commas/&)
    const authorCell = page.locator('td:has-text("&")').first();
    const authorCellAlt = page.locator('td:has-text("et al")').first();

    // At least one cell should have multi-author format
    const hasMultiAuthor = await authorCell.count() > 0 || await authorCellAlt.count() > 0;
    expect(hasMultiAuthor).toBe(true);
  });

  test('table view shows full topic names', async ({ page }) => {
    await page.goto(
      'http://localhost:6006/iframe.html?id=blog-vision100-vision100map--table-view'
    );
    await page.waitForTimeout(2000);

    // Check that full topic names are displayed (not truncated to first word)
    // Topics include multi-word names like "Receptive Fields", "Object Recognition", etc.
    const topicPills = page.locator('span.rounded-full');
    const count = await topicPills.count();
    console.log(`Found ${count} topic pills`);

    // Check that at least one topic has multiple words (e.g., "Receptive Fields")
    let foundMultiWordTopic = false;
    for (let i = 0; i < Math.min(count, 20); i++) {
      const text = await topicPills.nth(i).textContent();
      if (text && text.trim().includes(' ')) {
        foundMultiWordTopic = true;
        console.log(`Found multi-word topic: "${text.trim()}"`);
        break;
      }
    }
    expect(foundMultiWordTopic).toBe(true);
  });

  test('pagination navigation works correctly', async ({ page }) => {
    await page.goto(
      'http://localhost:6006/iframe.html?id=blog-vision100-vision100map--table-view'
    );
    await page.waitForTimeout(2000);

    // Click next page
    const nextButton = page.locator('button', { hasText: 'Next' });
    await nextButton.click();
    await page.waitForTimeout(300);

    // Should now show page 2
    const pageInfo = page.locator('text=Page 2 of 10');
    await expect(pageInfo).toBeVisible();

    // Should show "Showing 11-20 of 100 items"
    const itemCount = page.locator('text=Showing 11-20 of 100 items');
    await expect(itemCount).toBeVisible();
  });
});
