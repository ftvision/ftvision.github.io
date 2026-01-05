import { test, expect } from '@playwright/test';

/**
 * Blog Essay Components Tests
 *
 * Verifies that essay-specific components (EssayLayout, EssayHeader)
 * render correctly in Storybook.
 */

test.describe('Blog: Essay Components', () => {
  test.describe('EssayHeader', () => {
    test('guide story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essayheader--guide&viewMode=story'
      );

      // Wait for the component to fully render
      await page.waitForSelector('.essay-header', { timeout: 10000 });

      // Verify header renders with title
      await expect(
        page.locator('text=How Transformers Work')
      ).toBeVisible();

      // Verify type badge (use exact match to avoid ambiguity)
      await expect(
        page.locator('.essay-header').getByText('Guide', { exact: true })
      ).toBeVisible();

      // Verify topic badges (use exact match)
      await expect(
        page.locator('.essay-header').getByText('Technical', { exact: true })
      ).toBeVisible();
      await expect(
        page.locator('.essay-header').getByText('AI', { exact: true })
      ).toBeVisible();
    });

    test('deep-dive story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essayheader--deep-dive&viewMode=story'
      );

      await page.waitForSelector('.essay-header', { timeout: 10000 });

      // Verify type badge shows "Deep Dive"
      await expect(page.locator('text=Deep Dive')).toBeVisible();
    });

    test('opinion story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essayheader--opinion&viewMode=story'
      );

      await page.waitForSelector('.essay-header', { timeout: 10000 });

      // Verify type badge shows "Opinion"
      await expect(page.locator('text=Opinion')).toBeVisible();
    });

    test('without description story renders correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essayheader--without-description&viewMode=story'
      );

      await page.waitForSelector('.essay-header', { timeout: 10000 });

      // Verify title renders
      await expect(
        page.locator('text=Quick Tips for Better Git Commits')
      ).toBeVisible();
    });

    test('displays formatted date correctly', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essayheader--guide&viewMode=story'
      );

      await page.waitForSelector('.essay-header', { timeout: 10000 });

      // Verify date is displayed (format: Month Day, Year)
      const timeElement = page.locator('time');
      await expect(timeElement).toBeVisible();
      await expect(timeElement).toHaveAttribute('dateTime', '2024-12-14');
    });

    test('displays reading time when provided', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essayheader--guide&viewMode=story'
      );

      await page.waitForSelector('.essay-header', { timeout: 10000 });

      // Verify reading time is displayed
      await expect(page.locator('text=15 min read')).toBeVisible();
    });
  });

  test.describe('EssayLayout', () => {
    test('default story renders with header and content', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );

      // Wait for the layout to render
      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Verify layout container exists
      const article = page.locator('article.essay-layout');
      await expect(article).toBeVisible();

      // Verify title is present (in EssayHeader)
      await expect(
        page.locator('text=How Transformers Work')
      ).toBeVisible();

      // Verify content paragraphs exist
      const paragraphs = page.locator('article p');
      const count = await paragraphs.count();
      expect(count).toBeGreaterThan(0);
    });

    test('h2 headings have proper typography styling', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Verify h2 headings exist
      const h2Heading = page.locator('.essay-content h2').first();
      await expect(h2Heading).toBeVisible();
      await expect(h2Heading).toContainText('The Key Innovation: Self-Attention');

      // Verify h2 has larger font size than paragraph text (computed style)
      const h2FontSize = await h2Heading.evaluate((el) =>
        window.getComputedStyle(el).fontSize
      );
      const paragraph = page.locator('.essay-content p').first();
      const pFontSize = await paragraph.evaluate((el) =>
        window.getComputedStyle(el).fontSize
      );

      // h2 should be larger than paragraph text
      const h2Size = parseFloat(h2FontSize);
      const pSize = parseFloat(pFontSize);
      expect(h2Size).toBeGreaterThan(pSize);
    });

    test('without header story renders content only', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--without-header&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Verify layout container exists
      const article = page.locator('article.essay-layout');
      await expect(article).toBeVisible();

      // Content should still be visible
      const paragraphs = page.locator('article p');
      const count = await paragraphs.count();
      expect(count).toBeGreaterThan(0);
    });

    test('with multiple notes story shows sidenotes', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-multiple-notes&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Verify layout renders
      const article = page.locator('article.essay-layout');
      await expect(article).toBeVisible();

      // Verify note toggle buttons exist (superscripts are inside buttons)
      const noteToggles = page.locator('.note-toggle');
      const count = await noteToggles.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('layout provides NoteProvider context for sidenotes', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-multiple-notes&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Notes should have sequential numbers (proving NoteProvider works)
      const superscripts = page.locator('.note-toggle sup');
      const texts = await superscripts.allTextContents();

      // Verify we have multiple notes with sequential numbers
      expect(texts.length).toBeGreaterThanOrEqual(2);
      expect(texts[0]).toBe('1');
      expect(texts[1]).toBe('2');
    });

    test('layout has proper structure with right margin space on tablet', async ({ page }) => {
      // Set tablet viewport (lg breakpoint, before xl grid kicks in)
      await page.setViewportSize({ width: 1024, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Verify layout has right padding for sidenote margin space on tablet
      const article = page.locator('article.essay-layout');
      await expect(article).toHaveClass(/lg:pr-\[340px\]/);
    });

    test('layout content has max-width for readability', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Content area should have max-width prose class
      const contentArea = page.locator('.essay-content');
      await expect(contentArea).toHaveClass(/max-w-prose/);
    });

    test('sidenotes use float positioning on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-multiple-notes&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Note content should have float positioning classes
      const noteContent = page.locator('.note-content').first();
      await expect(noteContent).toHaveClass(/lg:float-right/);
      await expect(noteContent).toHaveClass(/lg:clear-right/);

      // Verify computed style shows float positioning
      const float = await noteContent.evaluate((el) =>
        window.getComputedStyle(el).float
      );
      expect(float).toBe('right');
    });

    test('layout provides ReferenceProvider context for citations', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-references&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Verify layout renders
      const article = page.locator('article.essay-layout');
      await expect(article).toBeVisible();

      // Verify reference links exist with sequential numbers
      const refLinks = page.locator('.reference-link');
      const count = await refLinks.count();
      expect(count).toBe(3);

      // Verify numbers are sequential [1], [2], [3]
      const texts = await refLinks.allTextContents();
      expect(texts).toContain('[1]');
      expect(texts).toContain('[2]');
      expect(texts).toContain('[3]');
    });

    test('ReferenceProvider enables References section without additional wrapping', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-references&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Wait for references to render via subscription
      await page.waitForTimeout(500);

      // Verify references section exists and has all citations
      const referencesSection = page.locator('.references-section');
      await expect(referencesSection).toBeVisible();

      // Should have 3 reference items
      const refItems = referencesSection.locator('li');
      const count = await refItems.count();
      expect(count).toBe(3);

      // Verify citations are displayed
      await expect(referencesSection).toContainText('Bahdanau');
      await expect(referencesSection).toContainText('Vaswani');
      await expect(referencesSection).toContainText('Devlin');
    });

    test('references section renders after content without setTimeout hack', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-references&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // The references section should appear quickly via subscription pattern
      // (not relying on setTimeout)
      const referencesSection = page.locator('.references-section');

      // Wait for visibility with a reasonable timeout
      await expect(referencesSection).toBeVisible({ timeout: 2000 });

      // Verify it has the heading
      await expect(page.locator('#references-heading')).toHaveText('References');
    });

    test('layout supports both notes and references together', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-references&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Verify notes work (there's one note in the WithReferences story)
      const noteToggles = page.locator('.note-toggle');
      const noteCount = await noteToggles.count();
      expect(noteCount).toBe(1);

      // Verify references work
      const refLinks = page.locator('.reference-link');
      const refCount = await refLinks.count();
      expect(refCount).toBe(3);

      // Both should have proper sequential numbering
      const noteSup = page.locator('.note-toggle sup');
      await expect(noteSup).toHaveText('1');

      const refTexts = await refLinks.allTextContents();
      expect(refTexts).toContain('[1]');
      expect(refTexts).toContain('[2]');
      expect(refTexts).toContain('[3]');
    });
  });

  test.describe('EssayLayout Table of Contents', () => {
    test('ToC is hidden on mobile/tablet viewports', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // ToC nav should not be visible on mobile
      const tocNav = page.locator('nav[aria-label="Table of contents"]');
      await expect(tocNav).not.toBeVisible();
    });

    test('ToC is hidden on tablet viewport (1024px)', async ({ page }) => {
      // Test tablet viewport (below xl breakpoint of 1280px)
      await page.setViewportSize({ width: 1024, height: 768 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // ToC nav should not be visible on tablet
      const tocNav = page.locator('nav[aria-label="Table of contents"]');
      await expect(tocNav).not.toBeVisible();
    });

    test('ToC is visible on desktop viewport (xl: 1280px+)', async ({ page }) => {
      // Set desktop viewport (xl breakpoint)
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // ToC nav should be visible on desktop
      const tocNav = page.locator('nav[aria-label="Table of contents"]');
      await expect(tocNav).toBeVisible();
    });

    test('ToC displays all heading items from toc prop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      const tocNav = page.locator('nav[aria-label="Table of contents"]');

      // Verify all ToC items are present
      await expect(tocNav.getByText('Introduction')).toBeVisible();
      await expect(tocNav.getByText('The Key Innovation: Self-Attention')).toBeVisible();
      await expect(tocNav.getByText('Parallel Processing')).toBeVisible();
      await expect(tocNav.getByText('Architecture Overview')).toBeVisible();
      await expect(tocNav.getByText('The Encoder')).toBeVisible();
      await expect(tocNav.getByText('The Decoder')).toBeVisible();
      await expect(tocNav.getByText('Conclusion')).toBeVisible();
    });

    test('ToC is in a separate column from content (not overlapping)', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Get bounding boxes of ToC and content
      const tocNav = page.locator('nav[aria-label="Table of contents"]');
      const essayHeader = page.locator('.essay-header-container');

      const tocBox = await tocNav.boundingBox();
      const headerBox = await essayHeader.boundingBox();

      expect(tocBox).not.toBeNull();
      expect(headerBox).not.toBeNull();

      if (tocBox && headerBox) {
        // ToC should be entirely to the left of the header
        // ToC right edge should be less than or equal to header left edge
        expect(tocBox.x + tocBox.width).toBeLessThanOrEqual(headerBox.x);
      }
    });

    test('ToC uses CSS Grid layout on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // The wrapper should use CSS Grid on desktop
      const wrapper = page.locator('.essay-layout-wrapper');
      const display = await wrapper.evaluate((el) =>
        window.getComputedStyle(el).display
      );

      expect(display).toBe('grid');
    });

    test('ToC is sticky when scrolling', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      const tocNav = page.locator('nav[aria-label="Table of contents"]');

      // Verify ToC has sticky positioning
      const position = await tocNav.evaluate((el) =>
        window.getComputedStyle(el).position
      );
      expect(position).toBe('sticky');
    });

    test('ToC items have proper indentation for nested headings', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      const tocNav = page.locator('nav[aria-label="Table of contents"]');

      // h2 items should not have left padding (or have pl-0)
      const h2Button = tocNav.getByText('Introduction');
      const h2PaddingLeft = await h2Button.evaluate((el) =>
        window.getComputedStyle(el).paddingLeft
      );

      // h3 items should have left padding (pl-3 = 0.75rem = 12px)
      const h3Button = tocNav.getByText('Parallel Processing');
      const h3PaddingLeft = await h3Button.evaluate((el) =>
        window.getComputedStyle(el).paddingLeft
      );

      // h3 should have more padding than h2
      const h2Padding = parseFloat(h2PaddingLeft);
      const h3Padding = parseFloat(h3PaddingLeft);
      expect(h3Padding).toBeGreaterThan(h2Padding);
    });

    test('clicking ToC item scrolls to heading', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--with-table-of-contents&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // Get initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);

      // Click on "Conclusion" in ToC
      const tocNav = page.locator('nav[aria-label="Table of contents"]');
      await tocNav.getByText('Conclusion').click();

      // Wait for smooth scroll to complete
      await page.waitForTimeout(500);

      // Verify scroll position changed (scrolled down to conclusion)
      const finalScroll = await page.evaluate(() => window.scrollY);
      expect(finalScroll).toBeGreaterThan(initialScroll);
    });

    test('layout without toc prop does not show ToC sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(
        '/iframe.html?id=blog-essay-essaylayout--default&viewMode=story'
      );

      await page.waitForSelector('.essay-layout', { timeout: 10000 });

      // ToC nav should not exist when no toc prop is provided
      const tocNav = page.locator('nav[aria-label="Table of contents"]');
      const tocContent = page.locator('nav[aria-label="Table of contents"] ul');

      // The nav element might exist but be empty
      const itemCount = await tocContent.locator('li').count();
      expect(itemCount).toBe(0);
    });
  });
});
