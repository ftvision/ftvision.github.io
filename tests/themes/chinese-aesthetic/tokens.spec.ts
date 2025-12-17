import { test, expect } from '@playwright/test';
import {
  navigateToStoryWithTheme,
  parsePixelValue,
  getCSSVariable,
} from '../../utils';

/**
 * Chinese Aesthetic Theme Token Tests
 *
 * Tests that the Chinese Aesthetic theme correctly implements:
 * - Ink-gradient color palette (墨分五色)
 * - Paper/Stone surface colors
 * - Seal red accent color (印泥红)
 * - CJK-optimized typography
 * - Contemplative spacing (留白)
 * - Calligraphic motion curves
 */
test.describe('Chinese Aesthetic Theme: Color Tokens', () => {
  test.describe('Light Mode', () => {
    test('has warm paper background (aged paper tone)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'foundations-themes-chinese-aesthetic-color--ink-gradients',
        'chinese-aesthetic',
        'light'
      );

      const bgColor = await getCSSVariable(iframe, '--color-bg-primary');

      // Should be #F8F5F0 (aged paper)
      expect(bgColor.toLowerCase()).toBe('#f8f5f0');
    });

    test('has ink-heavy text color', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'foundations-themes-chinese-aesthetic-color--ink-gradients',
        'chinese-aesthetic',
        'light'
      );

      const textColor = await getCSSVariable(iframe, '--color-text-primary');

      // Should be #2E2E2E (ink heavy)
      expect(textColor.toLowerCase()).toBe('#2e2e2e');
    });

    test('has seal red accent color (印泥红)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'foundations-themes-chinese-aesthetic-color--accent-colors',
        'chinese-aesthetic',
        'light'
      );

      const accentColor = await getCSSVariable(iframe, '--color-accent-primary');

      // Should be #C14B3E (seal red)
      expect(accentColor.toLowerCase()).toBe('#c14b3e');
    });

    test('has celadon green secondary accent (青瓷绿)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'foundations-themes-chinese-aesthetic-color--accent-colors',
        'chinese-aesthetic',
        'light'
      );

      const secondaryAccent = await getCSSVariable(iframe, '--color-accent-secondary');

      // Should be #8FAE89 (celadon green)
      expect(secondaryAccent.toLowerCase()).toBe('#8fae89');
    });

    test('has old gold tertiary accent (古金)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'foundations-themes-chinese-aesthetic-color--accent-colors',
        'chinese-aesthetic',
        'light'
      );

      const tertiaryAccent = await getCSSVariable(iframe, '--color-accent-tertiary');

      // Should be #B8860B (old gold)
      expect(tertiaryAccent.toLowerCase()).toBe('#b8860b');
    });
  });

  test.describe('Dark Mode', () => {
    test('has inkstone background (砚)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'foundations-themes-chinese-aesthetic-color--stone-surfaces',
        'chinese-aesthetic',
        'dark'
      );

      const bgColor = await getCSSVariable(iframe, '--color-bg-primary');

      // Should be #121210 (inkstone)
      expect(bgColor.toLowerCase()).toBe('#121210');
    });

    test('has ink wash text color', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'foundations-themes-chinese-aesthetic-color--stone-surfaces',
        'chinese-aesthetic',
        'dark'
      );

      const textColor = await getCSSVariable(iframe, '--color-text-primary');

      // Should be #E5E0D8 (ink wash)
      expect(textColor.toLowerCase()).toBe('#e5e0d8');
    });

    test('has lighter seal red accent for dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'foundations-themes-chinese-aesthetic-color--accent-colors',
        'chinese-aesthetic',
        'dark'
      );

      const accentColor = await getCSSVariable(iframe, '--color-accent-primary');

      // Should be #D4756A (lighter seal red for dark mode)
      expect(accentColor.toLowerCase()).toBe('#d4756a');
    });
  });
});

test.describe('Chinese Aesthetic Theme: Typography Tokens', () => {
  test('uses CJK serif font stack', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-typography--bilingual-type-scale',
      'chinese-aesthetic',
      'light'
    );

    const fontFamily = await getCSSVariable(iframe, '--font-family-body');

    // Should include Noto Serif CJK SC
    expect(fontFamily).toContain('Noto Serif CJK SC');
  });

  test('has larger body font size (18px)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-typography--bilingual-type-scale',
      'chinese-aesthetic',
      'light'
    );

    const bodySize = await getCSSVariable(iframe, '--font-size-body');

    // Should be 1.125rem (18px)
    expect(bodySize).toBe('1.125rem');
  });

  test('has generous line height for CJK body text (1.8)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-typography--bilingual-type-scale',
      'chinese-aesthetic',
      'light'
    );

    const bodyLineHeight = await getCSSVariable(iframe, '--font-line-height-body');

    // Should be 1.8 for CJK readability
    expect(bodyLineHeight).toBe('1.8');
  });
});

test.describe('Chinese Aesthetic Theme: Spacing Tokens (留白)', () => {
  test('has breath spacing token (6rem)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-spacing--liubai-philosophy',
      'chinese-aesthetic',
      'light'
    );

    const breathSpacing = await getCSSVariable(iframe, '--spacing-breath');

    // Should be 6rem (96px)
    expect(breathSpacing).toBe('6rem');
  });

  test('has void spacing token (8rem)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-spacing--liubai-philosophy',
      'chinese-aesthetic',
      'light'
    );

    const voidSpacing = await getCSSVariable(iframe, '--spacing-void');

    // Should be 8rem (128px)
    expect(voidSpacing).toBe('8rem');
  });

  test('has vast-void spacing token (12rem)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-spacing--liubai-philosophy',
      'chinese-aesthetic',
      'light'
    );

    const vastVoidSpacing = await getCSSVariable(iframe, '--spacing-vast-void');

    // Should be 12rem (192px)
    expect(vastVoidSpacing).toBe('12rem');
  });
});

test.describe('Chinese Aesthetic Theme: Motion Tokens', () => {
  test('has deliberate duration (500ms)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-motion--contemplative-durations',
      'chinese-aesthetic',
      'light'
    );

    const deliberateDuration = await getCSSVariable(iframe, '--motion-duration-deliberate');

    // Should be 500ms (longer than typical UI)
    expect(deliberateDuration).toBe('500ms');
  });

  test('has ceremonial duration (1200ms)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-motion--contemplative-durations',
      'chinese-aesthetic',
      'light'
    );

    const ceremonialDuration = await getCSSVariable(iframe, '--motion-duration-ceremonial');

    // Should be 1200ms for special moments
    expect(ceremonialDuration).toBe('1200ms');
  });

  test('has brush-enter easing (fast attack, slow release)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-motion--calligraphic-easing',
      'chinese-aesthetic',
      'light'
    );

    const enterEasing = await getCSSVariable(iframe, '--motion-easing-enter');

    // Should be cubic-bezier(0.0, 0.0, 0.2, 1) for brush-enter
    expect(enterEasing).toContain('cubic-bezier');
    expect(enterEasing).toContain('0.2');
  });

  test('has ink-spread reveal easing', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-motion--calligraphic-easing',
      'chinese-aesthetic',
      'light'
    );

    const revealEasing = await getCSSVariable(iframe, '--motion-easing-reveal');

    // Should be cubic-bezier(0.0, 0.0, 0.1, 1) for ink-spread
    expect(revealEasing).toContain('cubic-bezier');
    expect(revealEasing).toContain('0.1');
  });
});

test.describe('Chinese Aesthetic Theme: Border Tokens', () => {
  test('has subtle border width (1px)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-editorial--component-showcase',
      'chinese-aesthetic',
      'light'
    );

    const borderWidth = await getCSSVariable(iframe, '--border-width-default');

    // Chinese Aesthetic uses subtle 1px borders
    expect(parsePixelValue(borderWidth)).toBe(1);
  });

  test('has minimal default border radius', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'foundations-themes-chinese-aesthetic-editorial--component-showcase',
      'chinese-aesthetic',
      'light'
    );

    const radiusDefault = await getCSSVariable(iframe, '--radius-default');

    // Chinese Aesthetic uses minimal/no border radius for a refined look
    expect(parsePixelValue(radiusDefault)).toBe(0);
  });
});
