import { Page, FrameLocator } from '@playwright/test';

/**
 * Storybook test utilities
 * Provides helpers for interacting with Storybook in Playwright tests
 */

export const STORYBOOK_URL = 'http://localhost:6006';
export const STORYBOOK_IFRAME_SELECTOR = 'iframe#storybook-preview-iframe';

/**
 * Navigate to a Storybook story and wait for it to load
 */
export async function navigateToStory(
  page: Page,
  storyPath: string
): Promise<FrameLocator> {
  const url = `${STORYBOOK_URL}/?path=/story/${storyPath}`;
  await page.goto(url);
  await page.waitForSelector(STORYBOOK_IFRAME_SELECTOR);
  return page.frameLocator(STORYBOOK_IFRAME_SELECTOR);
}

/**
 * Get the Storybook preview iframe
 */
export function getStorybookIframe(page: Page): FrameLocator {
  return page.frameLocator(STORYBOOK_IFRAME_SELECTOR);
}

/**
 * Get CSS custom property value from the iframe's document root
 */
export async function getCSSVariable(
  iframe: FrameLocator,
  variableName: string
): Promise<string> {
  return iframe.locator('body').evaluate((_, varName) => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }, variableName);
}

/**
 * Get multiple CSS custom properties at once
 */
export async function getCSSVariables(
  iframe: FrameLocator,
  variableNames: string[]
): Promise<Record<string, string>> {
  return iframe.locator('body').evaluate((_, varNames) => {
    const style = getComputedStyle(document.documentElement);
    const result: Record<string, string> = {};
    for (const name of varNames) {
      result[name] = style.getPropertyValue(name).trim();
    }
    return result;
  }, variableNames);
}

/**
 * Get computed style property for an element
 */
export async function getComputedStyleProperty(
  locator: ReturnType<FrameLocator['locator']>,
  property: string
): Promise<string> {
  return locator.evaluate((el, prop) => {
    return window.getComputedStyle(el).getPropertyValue(prop);
  }, property);
}

/**
 * Parse a CSS pixel value to number
 */
export function parsePixelValue(value: string): number {
  return parseFloat(value.replace('px', ''));
}

/**
 * Parse a CSS color value to RGB object
 */
export function parseColor(
  value: string
): { r: number; g: number; b: number } | null {
  // Handle rgb(r, g, b) format
  const rgbMatch = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
    };
  }
  // Handle rgba(r, g, b, a) format
  const rgbaMatch = value.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
    };
  }
  return null;
}

/**
 * Set the theme in Storybook via the toolbar
 * Themes are set via data-theme attribute on documentElement
 */
export async function setTheme(
  page: Page,
  theme: 'nyt' | 'brutalism'
): Promise<void> {
  // Click the theme toolbar button
  const themeButton = page.locator('[title="Theme"]');
  await themeButton.click();

  // Select the theme from dropdown
  const themeOption = page.locator(`[id*="${theme}"]`).first();
  await themeOption.click();

  // Wait for theme to apply
  await page.waitForTimeout(100);
}

/**
 * Set the color mode in Storybook via the toolbar
 */
export async function setMode(page: Page, mode: 'light' | 'dark'): Promise<void> {
  // Click the mode toolbar button
  const modeButton = page.locator('[title="Mode"]');
  await modeButton.click();

  // Select the mode from dropdown
  const modeOption = page.locator(`[id*="${mode}"]`).first();
  await modeOption.click();

  // Wait for mode to apply
  await page.waitForTimeout(100);
}

/**
 * Navigate to story with specific theme
 */
export async function navigateToStoryWithTheme(
  page: Page,
  storyPath: string,
  theme: 'nyt' | 'brutalism',
  mode: 'light' | 'dark' = 'light'
): Promise<FrameLocator> {
  // Navigate with theme globals in URL
  const url = `${STORYBOOK_URL}/?path=/story/${storyPath}&globals=theme:${theme};mode:${mode}`;
  await page.goto(url);
  await page.waitForSelector(STORYBOOK_IFRAME_SELECTOR);
  // Wait for iframe content to load and theme to apply
  const iframe = page.frameLocator(STORYBOOK_IFRAME_SELECTOR);
  // Wait for body to be visible inside iframe
  await iframe.locator('body').waitFor({ state: 'visible', timeout: 10000 });
  // Additional wait for CSS to fully compute
  await page.waitForTimeout(500);
  return iframe;
}
