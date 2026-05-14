#!/usr/bin/env node
/**
 * Post-build: append `.png` to Next.js opengraph-image files.
 *
 * Next 14's `opengraph-image.tsx` file convention emits PNGs without a
 * `.png` extension. The Next dev/preview server adds the right
 * Content-Type from a route manifest, but with `output: 'export'` we
 * ship raw files to a generic static host (GitHub Pages). Those hosts
 * type files by extension and serve unknown ones as
 * `application/octet-stream`, which Facebook/Twitter/LinkedIn scrapers
 * reject.
 *
 * This script renames each `opengraph-image-<hash>` to
 * `opengraph-image-<hash>.png` and rewrites the references in the
 * sibling HTML files so meta tags still point at the right URL.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'out');

const FILENAME_RE = /^opengraph-image-[A-Za-z0-9]+$/;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

async function main() {
  const renames = new Map(); // oldBasename → newBasename
  const renamedPaths = [];

  for await (const file of walk(OUT_DIR)) {
    const base = path.basename(file);
    if (FILENAME_RE.test(base)) {
      const next = `${base}.png`;
      const target = path.join(path.dirname(file), next);
      await fs.rename(file, target);
      renames.set(base, next);
      renamedPaths.push(target);
    }
  }

  if (renames.size === 0) {
    console.log('postbuild-og: no opengraph-image files found, skipping');
    return;
  }

  console.log(`postbuild-og: renamed ${renames.size} OG images, rewriting refs`);

  // Rewrite references in HTML and text-based files. We don't touch
  // binary files (PNG, JPG, etc.) and we cap rewrites to extensions
  // where references could plausibly live.
  const REWRITABLE_EXT = new Set(['.html', '.txt', '.xml', '.json']);

  for await (const file of walk(OUT_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (!REWRITABLE_EXT.has(ext)) continue;

    let content = await fs.readFile(file, 'utf-8');
    let changed = false;
    for (const [oldName, newName] of renames) {
      if (content.includes(oldName)) {
        // Replace bare references — but not ones already followed by ".png"
        // (which would create a double extension on re-runs).
        const re = new RegExp(`${oldName}(?!\\.png)`, 'g');
        const updated = content.replace(re, newName);
        if (updated !== content) {
          content = updated;
          changed = true;
        }
      }
    }
    if (changed) {
      await fs.writeFile(file, content, 'utf-8');
    }
  }

  console.log('postbuild-og: done');
}

main().catch((err) => {
  console.error('postbuild-og failed:', err);
  process.exit(1);
});
