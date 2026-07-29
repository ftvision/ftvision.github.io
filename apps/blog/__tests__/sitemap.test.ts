/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest';
import sitemap from '../app/sitemap';

describe('sitemap canonical URLs', () => {
  it('uses the production origin and trailing-slash route shape', () => {
    const entries = sitemap();

    for (const entry of entries) {
      const entryUrl = new URL(entry.url);
      expect(entryUrl.origin).toBe('https://feitong.phd');
      expect(entryUrl.pathname.endsWith('/')).toBe(true);

      const languages = entry.alternates?.languages;
      if (!languages) continue;

      for (const alternate of Object.values(languages)) {
        const alternateUrl = new URL(alternate);
        expect(alternateUrl.origin).toBe('https://feitong.phd');
        expect(alternateUrl.pathname.endsWith('/')).toBe(true);
      }
    }
  });
});
