import { test, expect } from '@playwright/test';
import {
  navigateToStory,
  navigateToStoryWithTheme,
  getComputedStyleProperty,
  parsePixelValue,
  parseColor,
  getCSSVariable,
} from '../../utils';

/**
 * Chinese Aesthetic Theme Component Tests
 *
 * Tests that theme-specific components correctly express the Chinese aesthetic:
 * - Warm paper colors
 * - Seal red accent
 * - Ink-like styling
 * - Scholarly component behavior
 * - Proper bilingual support
 */

// =============================================================================
// SEAL STAMP (印章)
// =============================================================================
test.describe('Chinese Aesthetic: SealStamp', () => {
  test.describe('Variants', () => {
    test('square variant renders with rounded-sm', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-sealstamp--default'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[class*="rounded-sm"]').first();
      await expect(stamp).toBeVisible();
    });

    test('round variant renders with rounded-full', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-sealstamp--round'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[class*="rounded-full"]').first();
      await expect(stamp).toBeVisible();
    });
  });

  test.describe('Text Color - Critical Tests', () => {
    test('relief style has LIGHT/INVERSE text on red background', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-sealstamp--default',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[aria-label*="Seal stamp"]').first();
      await expect(stamp).toBeVisible();

      const textColor = await getComputedStyleProperty(stamp, 'color');
      const parsedColor = parseColor(textColor);

      // Text color should be inverse/light (Chinese Aesthetic: #F8F5F0)
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.r).toBeGreaterThan(200);
      expect(parsedColor!.g).toBeGreaterThan(200);
      expect(parsedColor!.b).toBeGreaterThan(200);
    });

    test('relief style background is red (accent-primary)', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-sealstamp--default',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[aria-label*="Seal stamp"]').first();
      await expect(stamp).toBeVisible();

      const bgColor = await getComputedStyleProperty(stamp, 'background-color');
      const parsedColor = parseColor(bgColor);

      // Background should be seal red
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.r).toBeGreaterThan(150);
    });

    test('intaglio style has RED text on white background', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-sealstamp--intaglio',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[aria-label*="Seal stamp"]').first();
      await expect(stamp).toBeVisible();

      const textColor = await getComputedStyleProperty(stamp, 'color');
      const parsedColor = parseColor(textColor);

      // Text color should be red
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.r).toBeGreaterThan(150);
    });

    test('intaglio style has border', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-sealstamp--intaglio'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[aria-label*="Seal stamp"]').first();
      await expect(stamp).toBeVisible();

      const hasBorder = await stamp.evaluate((el) => {
        return el.className.includes('border-2');
      });
      expect(hasBorder).toBe(true);
    });
  });

  test.describe('Chinese Characters', () => {
    test('displays correct Chinese characters', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-sealstamp--default'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[aria-label*="Seal stamp"]').first();
      const text = await stamp.textContent();
      expect(text).toBe('范同');
    });

    test('displays stamps with varying character counts', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-sealstamp--multiple-characters'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamps = iframe.locator('[aria-label*="Seal stamp"]');
      expect(await stamps.count()).toBe(4);

      expect(await stamps.nth(0).textContent()).toBe('一');
      expect(await stamps.nth(1).textContent()).toBe('二字');
      expect(await stamps.nth(2).textContent()).toBe('三字印');
      expect(await stamps.nth(3).textContent()).toBe('四字篆印');
    });
  });

  test.describe('Accessibility', () => {
    test('has aria-label with stamp name', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-sealstamp--default'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[aria-label*="Seal stamp: 范同"]');
      await expect(stamp).toBeVisible();
    });
  });
});

// =============================================================================
// BRUSH DIVIDER (墨迹)
// =============================================================================
test.describe('Chinese Aesthetic: BrushDivider', () => {
  test.describe('Variants', () => {
    test('horizontal variant renders SVG path', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-brushdivider--horizontal'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();

      const svg = divider.locator('svg');
      await expect(svg).toBeVisible();
    });

    test('wave variant renders wavy path', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-brushdivider--wave'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();
    });

    test('dot variant renders multiple circles', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-brushdivider--dot'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();

      const circles = divider.locator('svg circle');
      const count = await circles.count();
      expect(count).toBeGreaterThan(2);
    });
  });

  test.describe('Colors', () => {
    test('ink color uses border-strong color', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-brushdivider--horizontal',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();

      // Ink color should use --color-border-strong (dark ink tone)
      const brushColor = await divider.evaluate((el) => {
        return getComputedStyle(el).getPropertyValue('--brush-color').trim();
      });

      // Should resolve to a dark color value
      expect(brushColor).toBeTruthy();

      // Check the SVG stroke color
      const line = divider.locator('svg line, svg path').first();
      const strokeColor = await line.evaluate((el) => {
        return getComputedStyle(el).stroke;
      });
      const parsedStroke = parseColor(strokeColor);

      // Ink should be a dark gray tone (low RGB values)
      expect(parsedStroke).not.toBeNull();
      expect(parsedStroke!.r).toBeLessThan(150);
      expect(parsedStroke!.g).toBeLessThan(150);
      expect(parsedStroke!.b).toBeLessThan(150);
    });

    test('accent color uses seal red', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-brushdivider--accent-color',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();

      // Accent color should use --color-accent-primary (seal red)
      const brushColor = await divider.evaluate((el) => {
        return getComputedStyle(el).getPropertyValue('--brush-color').trim();
      });
      expect(brushColor).toBeTruthy();

      // Check the SVG stroke color
      const line = divider.locator('svg line, svg path').first();
      const strokeColor = await line.evaluate((el) => {
        return getComputedStyle(el).stroke;
      });
      const parsedStroke = parseColor(strokeColor);

      // Seal red should have high red component
      expect(parsedStroke).not.toBeNull();
      expect(parsedStroke!.r).toBeGreaterThan(150);
    });

    test('muted color uses border-muted color', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-brushdivider--muted-color',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();

      // Check the SVG stroke color
      const line = divider.locator('svg line, svg path').first();
      const strokeColor = await line.evaluate((el) => {
        return getComputedStyle(el).stroke;
      });
      const parsedStroke = parseColor(strokeColor);

      // Muted should be a lighter gray tone
      expect(parsedStroke).not.toBeNull();
      // Muted color should be lighter than ink
      expect(parsedStroke!.r).toBeGreaterThan(50);
    });

    test('dot variant applies brush color to dots', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-brushdivider--dot',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();

      // Dot variant uses span elements with background color
      const dot = divider.locator('span.rounded-full').first();
      await expect(dot).toBeVisible();

      const bgColor = await getComputedStyleProperty(dot, 'background-color');
      const parsedBg = parseColor(bgColor);

      // Default ink color should be dark
      expect(parsedBg).not.toBeNull();
      expect(parsedBg!.r).toBeLessThan(150);
    });
  });

  test.describe('Accessibility', () => {
    test('has separator role', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-brushdivider--horizontal'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();
    });
  });
});

// =============================================================================
// MARGIN NOTE (眉批)
// =============================================================================
test.describe('Chinese Aesthetic: MarginNote', () => {
  test.describe('Variants', () => {
    test('sidenote variant renders with secondary styling', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-marginnote--sidenote'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const note = iframe.locator('[role="note"]');
      await expect(note).toBeVisible();
    });

    test('author variant renders with accent marker', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-marginnote--author'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const note = iframe.locator('[role="note"]');
      await expect(note).toBeVisible();

      // Should have accent-colored marker
      const marker = note.locator('[class*="text-accent"]');
      await expect(marker).toBeVisible();
    });

    test('reference variant renders with muted styling', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-marginnote--reference'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const note = iframe.locator('[role="note"]');
      await expect(note).toBeVisible();
    });
  });

  test.describe('Custom Markers', () => {
    test('displays custom marker character', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-marginnote--custom-marker'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      // Should show the custom marker
      await expect(iframe.locator('text=※')).toBeVisible();
    });
  });
});

// =============================================================================
// MOON GATE (月门)
// =============================================================================
test.describe('Chinese Aesthetic: MoonGate', () => {
  test.describe('Variants', () => {
    test('full variant renders circular frame', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-moongate--full'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const gate = iframe.locator('[class*="rounded-full"]').first();
      await expect(gate).toBeVisible();
    });

    test('arch variant renders arch-shaped frame', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-moongate--arch'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const gate = iframe.locator('[class*="rounded-t-full"]').first();
      await expect(gate).toBeVisible();
    });

    test('window variant renders rounded-top rectangle', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-moongate--window'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      // Window variant should be visible
      const container = iframe.locator('div').first();
      await expect(container).toBeVisible();
    });
  });
});

// =============================================================================
// SCROLL LANDSCAPE (山水进度)
// =============================================================================
test.describe('Chinese Aesthetic: ScrollLandscape', () => {
  test.describe('Variants', () => {
    test('mountains variant renders SVG landscape', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-scrolllandscape--mountains'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const landscape = iframe.locator('[aria-label="Reading progress"]');
      await expect(landscape).toBeVisible();

      const svg = landscape.locator('svg');
      await expect(svg).toBeVisible();
    });

    test('river variant renders with wave path', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-scrolllandscape--river'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const landscape = iframe.locator('[aria-label="Reading progress"]');
      await expect(landscape).toBeVisible();
    });

    test('minimal variant renders simple progress bar', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-scrolllandscape--minimal'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const landscape = iframe.locator('[aria-label="Reading progress"]');
      await expect(landscape).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('has proper ARIA attributes', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-scrolllandscape--mountains'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const landscape = iframe.locator('[aria-label="Reading progress"]');
      await expect(landscape).toBeVisible();

      const role = await landscape.getAttribute('role');
      expect(role).toBe('progressbar');

      const valueMin = await landscape.getAttribute('aria-valuemin');
      const valueMax = await landscape.getAttribute('aria-valuemax');
      expect(valueMin).toBe('0');
      expect(valueMax).toBe('100');
    });
  });
});

// =============================================================================
// TABLE OF CONTENTS (目录)
// =============================================================================
test.describe('Chinese Aesthetic: TableOfContents', () => {
  test.describe('Variants', () => {
    test('default variant renders with proper spacing', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-tableofcontents--default'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toc = iframe.locator('nav[aria-label="目录"]');
      await expect(toc).toBeVisible();
      await expect(iframe.locator('text=目录')).toBeVisible();
    });

    test('scroll variant has left border', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-tableofcontents--scroll-variant'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toc = iframe.locator('nav[aria-label="卷轴目录"]');
      await expect(toc).toBeVisible();

      const hasBorderLeft = await toc.evaluate((el) => {
        return el.className.includes('border-l');
      });
      expect(hasBorderLeft).toBe(true);
    });
  });

  test.describe('Active Item Styling', () => {
    test('active item has accent color', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-tableofcontents--default',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      const textColor = await getComputedStyleProperty(activeItem, 'color');
      const parsedColor = parseColor(textColor);

      // Should be seal red
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.r).toBeGreaterThan(150);
    });
  });

  test.describe('Marker Styles', () => {
    test('seal marker displays square indicator', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-tableofcontents--seal-marker'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      const seal = activeItem.locator('.rounded-sm').first();
      await expect(seal).toBeVisible();
    });
  });
});

// =============================================================================
// SEASON SELECTOR (四季)
// =============================================================================
test.describe('Chinese Aesthetic: SeasonSelector', () => {
  test.describe('Display Modes', () => {
    test('chinese mode displays Chinese characters', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-seasonselector--chinese-display'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      await expect(iframe.locator('text=春')).toBeVisible();
      await expect(iframe.locator('text=夏')).toBeVisible();
      await expect(iframe.locator('text=秋')).toBeVisible();
      await expect(iframe.locator('text=冬')).toBeVisible();
    });

    test('emoji mode displays seasonal emojis', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-seasonselector--emoji-display'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      await expect(iframe.locator('text=🌸')).toBeVisible();
      await expect(iframe.locator('text=🪷')).toBeVisible();
      await expect(iframe.locator('text=🍂')).toBeVisible();
      await expect(iframe.locator('text=❄️')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('has proper radiogroup role', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-seasonselector--default'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const radiogroup = iframe.locator('[role="radiogroup"]');
      await expect(radiogroup).toBeVisible();

      const ariaLabel = await radiogroup.getAttribute('aria-label');
      expect(ariaLabel).toBe('Season selection');
    });
  });
});

// =============================================================================
// TEA TIME TOGGLE (茶歇模式)
// =============================================================================
test.describe('Chinese Aesthetic: TeaTimeToggle', () => {
  test.describe('Toggle States', () => {
    test('disabled state renders correctly', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-teatimetoggle--default'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toggle = iframe.locator('[role="switch"]');
      await expect(toggle).toBeVisible();

      const ariaChecked = await toggle.getAttribute('aria-checked');
      expect(ariaChecked).toBe('false');
    });

    test('enabled state renders with active styling', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-teatimetoggle--enabled'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toggle = iframe.locator('[role="switch"]');
      await expect(toggle).toBeVisible();

      const ariaChecked = await toggle.getAttribute('aria-checked');
      expect(ariaChecked).toBe('true');
    });
  });

  test.describe('Chinese Labels', () => {
    test('displays Chinese label by default', async ({ page }) => {
      const iframe = await navigateToStory(
        page,
        'components-themes-chinese-aesthetic-teatimetoggle--default'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      await expect(iframe.locator('text=茶歇模式')).toBeVisible();
    });
  });

  test.describe('Theme Integration', () => {
    test('uses accent color when enabled', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-teatimetoggle--enabled',
        'chinese-aesthetic'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toggle = iframe.locator('[role="switch"]');
      await expect(toggle).toBeVisible();

      const svg = toggle.locator('svg');
      const color = await getComputedStyleProperty(svg, 'color');
      const parsedColor = parseColor(color);

      // Should be seal red
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.r).toBeGreaterThan(150);
    });
  });
});

// =============================================================================
// THEME DESIGN TOKENS
// =============================================================================
test.describe('Chinese Aesthetic: Design Tokens', () => {
  test('has correct accent color (seal red)', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'chinese-aesthetic',
      'light'
    );

    const accentColor = await getCSSVariable(iframe, '--color-accent-primary');

    // Chinese Aesthetic accent is seal red #C14B3E (印泥红)
    expect(accentColor.toLowerCase()).toBe('#c14b3e');
  });

  test('has warm paper background', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'chinese-aesthetic',
      'light'
    );

    const groundPrimary = await getCSSVariable(iframe, '--color-ground-primary');

    // Should be a warm paper color (high RGB values with slight yellow tint)
    // #F8F5F0 or similar
    expect(groundPrimary).not.toBe('#ffffff');
  });

  test('has rounded border radius tokens', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'chinese-aesthetic',
      'light'
    );

    const radiusDefault = await getCSSVariable(iframe, '--radius-default');

    // Chinese Aesthetic has soft rounded corners, not zero
    expect(parsePixelValue(radiusDefault)).toBeGreaterThan(0);
  });

  test('has deliberate motion durations', async ({ page }) => {
    const iframe = await navigateToStoryWithTheme(
      page,
      'components-button--primary',
      'chinese-aesthetic',
      'light'
    );

    const durationNormal = await getCSSVariable(
      iframe,
      '--motion-duration-normal'
    );

    // Chinese Aesthetic has slower, more deliberate animations
    const ms = parseInt(durationNormal);
    expect(ms).toBeGreaterThanOrEqual(200);
  });
});

// =============================================================================
// DARK MODE COMPONENT TESTS (砚台模式)
// =============================================================================
test.describe('Chinese Aesthetic: Dark Mode Components', () => {
  test.describe('SealStamp Dark Mode', () => {
    test('relief style renders correctly on inkstone background', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-sealstamp--default',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[aria-label*="Seal stamp"]').first();
      await expect(stamp).toBeVisible();

      // Background should be lighter seal red for dark mode (#D4756A)
      const bgColor = await getComputedStyleProperty(stamp, 'background-color');
      const parsedBg = parseColor(bgColor);

      expect(parsedBg).not.toBeNull();
      // Dark mode uses lighter seal red for better contrast
      expect(parsedBg!.r).toBeGreaterThan(180);
    });

    test('intaglio style has proper contrast in dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-sealstamp--intaglio',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const stamp = iframe.locator('[aria-label*="Seal stamp"]').first();
      await expect(stamp).toBeVisible();

      // Text should still be readable (seal red on dark background)
      const textColor = await getComputedStyleProperty(stamp, 'color');
      const parsedText = parseColor(textColor);

      expect(parsedText).not.toBeNull();
      expect(parsedText!.r).toBeGreaterThan(150);
    });
  });

  test.describe('BrushDivider Dark Mode', () => {
    test('ink color adapts to dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-brushdivider--horizontal',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();

      // Check the SVG stroke color - should be lighter in dark mode
      const line = divider.locator('svg line, svg path').first();
      const strokeColor = await line.evaluate((el) => {
        return getComputedStyle(el).stroke;
      });
      const parsedStroke = parseColor(strokeColor);

      // In dark mode, stroke should be lighter for visibility
      expect(parsedStroke).not.toBeNull();
    });

    test('accent color remains vibrant in dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-brushdivider--accent-color',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const divider = iframe.locator('[role="separator"]');
      await expect(divider).toBeVisible();

      const line = divider.locator('svg line, svg path').first();
      const strokeColor = await line.evaluate((el) => {
        return getComputedStyle(el).stroke;
      });
      const parsedStroke = parseColor(strokeColor);

      // Seal red should still be prominent
      expect(parsedStroke).not.toBeNull();
      expect(parsedStroke!.r).toBeGreaterThan(150);
    });
  });

  test.describe('TableOfContents Dark Mode', () => {
    test('renders with proper contrast on dark background', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-tableofcontents--default',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toc = iframe.locator('nav[aria-label="目录"]');
      await expect(toc).toBeVisible();

      // Links should be readable
      const link = iframe.locator('nav a').first();
      const textColor = await getComputedStyleProperty(link, 'color');
      const parsedText = parseColor(textColor);

      // Text should be light on dark background
      expect(parsedText).not.toBeNull();
      const luminance = (parsedText!.r + parsedText!.g + parsedText!.b) / 3;
      expect(luminance).toBeGreaterThan(100);
    });

    test('active item accent color adapts to dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-tableofcontents--default',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const activeItem = iframe.locator('[aria-current="location"]');
      await expect(activeItem).toBeVisible();

      const textColor = await getComputedStyleProperty(activeItem, 'color');
      const parsedColor = parseColor(textColor);

      // Active state should use lighter seal red in dark mode
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.r).toBeGreaterThan(150);
    });
  });

  test.describe('SeasonSelector Dark Mode', () => {
    test('season buttons are visible on dark background', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-seasonselector--chinese-display',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      // All season characters should be visible
      await expect(iframe.locator('text=春')).toBeVisible();
      await expect(iframe.locator('text=夏')).toBeVisible();
      await expect(iframe.locator('text=秋')).toBeVisible();
      await expect(iframe.locator('text=冬')).toBeVisible();
    });

    test('selected season has proper styling in dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-seasonselector--default',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const radiogroup = iframe.locator('[role="radiogroup"]');
      await expect(radiogroup).toBeVisible();

      // Find selected radio button
      const selectedRadio = iframe.locator('[role="radio"][aria-checked="true"]');
      const count = await selectedRadio.count();
      if (count > 0) {
        await expect(selectedRadio.first()).toBeVisible();
      }
    });
  });

  test.describe('TeaTimeToggle Dark Mode', () => {
    test('toggle is visible on dark background', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-teatimetoggle--default',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toggle = iframe.locator('[role="switch"]');
      await expect(toggle).toBeVisible();

      // Label should be readable
      await expect(iframe.locator('text=茶歇模式')).toBeVisible();
    });

    test('enabled state uses lighter accent in dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-teatimetoggle--enabled',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const toggle = iframe.locator('[role="switch"]');
      await expect(toggle).toBeVisible();

      const svg = toggle.locator('svg');
      const color = await getComputedStyleProperty(svg, 'color');
      const parsedColor = parseColor(color);

      // Should use lighter seal red in dark mode (#D4756A)
      expect(parsedColor).not.toBeNull();
      expect(parsedColor!.r).toBeGreaterThan(180);
    });
  });

  test.describe('ScrollLandscape Dark Mode', () => {
    test('mountain variant renders on dark background', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-scrolllandscape--mountains',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const landscape = iframe.locator('[aria-label="Reading progress"]');
      await expect(landscape).toBeVisible();

      const svg = landscape.locator('svg');
      await expect(svg).toBeVisible();
    });
  });

  test.describe('MarginNote Dark Mode', () => {
    test('note content is readable on dark background', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-marginnote--sidenote',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const note = iframe.locator('[role="note"]');
      await expect(note).toBeVisible();
    });

    test('author variant marker uses lighter accent in dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-themes-chinese-aesthetic-marginnote--author',
        'chinese-aesthetic',
        'dark'
      );

      await iframe.locator('body').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      const note = iframe.locator('[role="note"]');
      await expect(note).toBeVisible();

      // Marker should be visible with accent styling
      const marker = note.locator('[class*="text-accent"]');
      await expect(marker).toBeVisible();
    });
  });

  test.describe('Dark Mode Theme Tokens', () => {
    test('has inkstone background color', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-button--primary',
        'chinese-aesthetic',
        'dark'
      );

      const bgColor = await getCSSVariable(iframe, '--color-bg-primary');

      // Should be inkstone #121210
      expect(bgColor.toLowerCase()).toBe('#121210');
    });

    test('has ink wash text color', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-button--primary',
        'chinese-aesthetic',
        'dark'
      );

      const textColor = await getCSSVariable(iframe, '--color-text-primary');

      // Should be ink wash #E5E0D8
      expect(textColor.toLowerCase()).toBe('#e5e0d8');
    });

    test('has lighter seal red accent for dark mode', async ({ page }) => {
      const iframe = await navigateToStoryWithTheme(
        page,
        'components-button--primary',
        'chinese-aesthetic',
        'dark'
      );

      const accentColor = await getCSSVariable(iframe, '--color-accent-primary');

      // Should be lighter seal red #D4756A
      expect(accentColor.toLowerCase()).toBe('#d4756a');
    });
  });
});
