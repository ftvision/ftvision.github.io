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
