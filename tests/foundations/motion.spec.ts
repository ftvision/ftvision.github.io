import { test, expect } from '@playwright/test';
import {
  navigateToStory,
  getCSSVariables,
  getComputedStyleProperty,
} from '../utils';

/**
 * Motion System Tests
 *
 * Tests the design token motion system including:
 * - Duration tokens (timing values)
 * - Easing tokens (animation curves)
 * - Transition presets (combined duration + easing)
 *
 * These tests are theme-agnostic and verify motion tokens
 * are correctly applied regardless of the active theme.
 */
test.describe('Foundations: Motion System', () => {
  test.describe('Duration Tokens', () => {
    test('duration CSS variables have correct values', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'foundations-motion--durations'
      );

      await iframe.locator('text=Duration Tokens').waitFor();

      const durations = await getCSSVariables(iframe, [
        '--motion-duration-instant',
        '--motion-duration-fast',
        '--motion-duration-normal',
        '--motion-duration-slow',
        '--motion-duration-deliberate',
        '--motion-duration-dramatic',
      ]);

      expect(durations['--motion-duration-instant']).toBe('0ms');
      expect(durations['--motion-duration-fast']).toBe('100ms');
      expect(durations['--motion-duration-normal']).toBe('200ms');
      expect(durations['--motion-duration-slow']).toBe('300ms');
      expect(durations['--motion-duration-deliberate']).toBe('500ms');
      expect(durations['--motion-duration-dramatic']).toBe('800ms');
    });
  });

  test.describe('Easing Tokens', () => {
    test('easing CSS variables have correct curve definitions', async ({
      page,
    }) => {
      const iframe = await navigateToStory(page, 'foundations-motion--easing');

      await iframe.locator('text=Easing Curves').waitFor();

      const easings = await getCSSVariables(iframe, [
        '--motion-easing-default',
        '--motion-easing-enter',
        '--motion-easing-exit',
        '--motion-easing-move',
        '--motion-easing-linear',
        '--motion-easing-spring',
      ]);

      // Verify easing curves are cubic-bezier functions (except linear)
      expect(easings['--motion-easing-default']).toContain('cubic-bezier');
      expect(easings['--motion-easing-enter']).toContain('cubic-bezier');
      expect(easings['--motion-easing-exit']).toContain('cubic-bezier');
      expect(easings['--motion-easing-move']).toContain('cubic-bezier');
      expect(easings['--motion-easing-linear']).toBe('linear');
      expect(easings['--motion-easing-spring']).toContain('cubic-bezier');
    });
  });

  test.describe('Transition Presets', () => {
    test('card lift effect applies correct motion tokens', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'foundations-motion--interactive-examples'
      );

      await iframe.locator('text=Card Lift').waitFor();

      // Get the card container by finding the parent of "Card 1" text
      const card = iframe.locator('text=Card 1').locator('..');

      const transition = await getComputedStyleProperty(card, 'transition');

      // Verify transition includes transform property
      expect(transition).toContain('transform');

      // Verify motion duration token (100ms = fast)
      expect(transition).toMatch(/(100ms|0\.1s)/);

      // Verify ease-out curve
      expect(transition).toContain('cubic-bezier(0, 0, 0.2, 1)');

      // Verify box-shadow is also transitioned
      expect(transition).toContain('box-shadow');
    });

    test('elements with transition classes have transitions applied', async ({
      page,
    }) => {
      const iframe = await navigateToStory(
        page,
        'foundations-motion--interactive-examples'
      );

      await iframe.locator('text=Card Lift').waitFor();

      const element = iframe.locator('.hover\\:-translate-y-1').first();

      const hasTransition = await element.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return (
          style.transitionProperty !== 'none' &&
          style.transitionProperty !== ''
        );
      });

      expect(hasTransition).toBe(true);
    });
  });

  test.describe('CSS Custom Properties', () => {
    test('motion variables are available in document root', async ({
      page,
    }) => {
      const iframe = await navigateToStory(
        page,
        'foundations-motion--interactive-examples'
      );

      await iframe.locator('text=Interactive Examples').waitFor();

      const motionVars = await getCSSVariables(iframe, [
        '--motion-duration-fast',
        '--motion-easing-default',
      ]);

      expect(motionVars['--motion-duration-fast']).toBe('100ms');
      expect(motionVars['--motion-easing-default']).toContain('cubic-bezier');
    });
  });
});
