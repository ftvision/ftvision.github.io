/**
 * Font loading for next/og's ImageResponse.
 *
 * Reads font binaries from node_modules at build time and returns the
 * shape Satori expects. Only invoked during static export's render of
 * the opengraph-image routes — these files never ship to the browser.
 */

import fs from 'node:fs';
import path from 'node:path';

const FONT_ROOT = path.join(
  process.cwd(),
  'node_modules/@fontsource',
);

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 700;
  style: 'normal' | 'italic';
};

function load(filePath: string): Buffer {
  return fs.readFileSync(filePath);
}

/** Latin serif: Source Serif Pro 400 / 400-italic / 700. */
export function latinFonts(): OgFont[] {
  const dir = path.join(FONT_ROOT, 'source-serif-pro/files');
  return [
    {
      name: 'Source Serif Pro',
      data: load(path.join(dir, 'source-serif-pro-latin-400-normal.woff')),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Source Serif Pro',
      data: load(path.join(dir, 'source-serif-pro-latin-400-italic.woff')),
      weight: 400,
      style: 'italic',
    },
    {
      name: 'Source Serif Pro',
      data: load(path.join(dir, 'source-serif-pro-latin-700-normal.woff')),
      weight: 700,
      style: 'normal',
    },
  ];
}

/** Simplified Chinese serif: Noto Serif SC 400 / 700. ~4 MB build-time. */
export function cjkFonts(): OgFont[] {
  const dir = path.join(FONT_ROOT, 'noto-serif-sc/files');
  return [
    {
      name: 'Noto Serif SC',
      data: load(path.join(dir, 'noto-serif-sc-chinese-simplified-400-normal.woff')),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Noto Serif SC',
      data: load(path.join(dir, 'noto-serif-sc-chinese-simplified-700-normal.woff')),
      weight: 700,
      style: 'normal',
    },
  ];
}

export function ogFontsFor(locale: 'en' | 'zh'): OgFont[] {
  return locale === 'zh' ? [...latinFonts(), ...cjkFonts()] : latinFonts();
}
