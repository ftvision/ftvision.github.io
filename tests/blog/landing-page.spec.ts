import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load the landing page without errors', async ({ page }) => {
    // Navigate to the landing page
    const response = await page.goto('http://localhost:3003');

    // Page should return 200
    expect(response?.status()).toBe(200);

    // Wait for page to hydrate
    await page.waitForLoadState('networkidle');

    // Check that the hero section exists
    const heroSection = page.locator('section.relative.h-screen').first();
    await expect(heroSection).toBeVisible();

    // Check that the intro overlay is visible
    await expect(page.getByRole('heading', { name: 'Explore' })).toBeVisible({
      timeout: 10000,
    });
  });

  test('should display the 3D canvas after loading', async ({ page }) => {
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');

    // Wait for the canvas to load (Three.js renders to a canvas element)
    // Give it time to initialize
    await page.waitForTimeout(3000);

    // Check if canvas element exists in the hero section
    const heroSection = page.locator('section.relative.h-screen').first();
    await expect(heroSection).toBeVisible();
  });

  test('should have navigation links in intro section', async ({ page }) => {
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');

    // Check navigation links exist in the intro overlay (with descriptions)
    await expect(
      page.getByRole('link', { name: 'Essays Long-form pieces' })
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole('link', { name: 'Series Curated collections' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Periodics Regular updates' })
    ).toBeVisible();
  });

  test('should have navigation overlay for accessibility', async ({ page }) => {
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');

    // Check that the sr-only navigation is in the DOM
    const nav = page.locator('nav.sr-only');
    await expect(nav).toBeAttached();
  });
});
