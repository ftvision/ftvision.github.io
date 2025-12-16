/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';

// Note: Next.js App Router layouts are server components that render html/body tags
// These cannot be rendered in jsdom. Instead, we test the module exports.

describe('RootLayout', () => {
  it('exports a default function component', async () => {
    const layoutModule = await import('../app/layout');
    expect(typeof layoutModule.default).toBe('function');
  });

  it('exports metadata with required fields', async () => {
    const layoutModule = await import('../app/layout');

    expect(layoutModule.metadata).toBeDefined();
    expect(layoutModule.metadata.title).toBeDefined();
    expect(layoutModule.metadata.description).toBeDefined();
    expect(typeof layoutModule.metadata.description).toBe('string');
  });

  it('has correct metadata title structure', async () => {
    const layoutModule = await import('../app/layout');

    // Title can be a string or an object with default/template
    const title = layoutModule.metadata.title;
    if (typeof title === 'object' && title !== null) {
      expect(title).toHaveProperty('default');
    } else {
      expect(typeof title).toBe('string');
    }
  });

  it('has OpenGraph metadata configured', async () => {
    const layoutModule = await import('../app/layout');

    expect(layoutModule.metadata.openGraph).toBeDefined();
    expect(layoutModule.metadata.openGraph?.type).toBe('website');
  });
});
