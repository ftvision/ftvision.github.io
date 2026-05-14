/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';

// Note: Next.js App Router layouts are server components that render html/body tags
// These cannot be rendered in jsdom. Instead, we test the module exports.

const layoutPaths = {
  en: '../app/(en)/layout',
  zh: '../app/(zh)/layout',
} as const;

describe.each(Object.entries(layoutPaths))('%s root layout', (_locale, path) => {
  it('exports a default function component', async () => {
    const mod = await import(path);
    expect(typeof mod.default).toBe('function');
  });

  it('exports metadata with required fields', async () => {
    const mod = await import(path);
    expect(mod.metadata).toBeDefined();
    expect(mod.metadata.title).toBeDefined();
    expect(mod.metadata.description).toBeDefined();
    expect(typeof mod.metadata.description).toBe('string');
  });

  it('has title with default and template', async () => {
    const mod = await import(path);
    const title = mod.metadata.title;
    expect(typeof title).toBe('object');
    expect(title).toHaveProperty('default');
    expect(title).toHaveProperty('template');
  });

  it('has OpenGraph metadata configured', async () => {
    const mod = await import(path);
    expect(mod.metadata.openGraph).toBeDefined();
    expect(mod.metadata.openGraph?.type).toBe('website');
  });

  it('sets metadataBase', async () => {
    const mod = await import(path);
    expect(mod.metadata.metadataBase).toBeInstanceOf(URL);
  });

  it('declares x-default hreflang', async () => {
    const mod = await import(path);
    expect(mod.metadata.alternates?.languages?.['x-default']).toBeDefined();
  });
});
