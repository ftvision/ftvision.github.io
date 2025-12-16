import { describe, it, expect } from 'vitest';
import {
  isValidEssayType,
  isValidTopic,
  isValidLanguage,
  validateFrontmatter,
  type EssayType,
  type Topic,
  type Language,
} from '../types/content';

describe('Content Types', () => {
  describe('Type Guards', () => {
    describe('isValidEssayType', () => {
      it('returns true for valid essay types', () => {
        const validTypes: EssayType[] = ['guide', 'deep-dive', 'opinion', 'review', 'narrative'];
        validTypes.forEach((type) => {
          expect(isValidEssayType(type)).toBe(true);
        });
      });

      it('returns false for invalid essay types', () => {
        expect(isValidEssayType('invalid')).toBe(false);
        expect(isValidEssayType('')).toBe(false);
        expect(isValidEssayType(null)).toBe(false);
        expect(isValidEssayType(undefined)).toBe(false);
        expect(isValidEssayType(123)).toBe(false);
      });
    });

    describe('isValidTopic', () => {
      it('returns true for valid topics', () => {
        const validTopics: Topic[] = ['technical', 'ai', 'product', 'career'];
        validTopics.forEach((topic) => {
          expect(isValidTopic(topic)).toBe(true);
        });
      });

      it('returns false for invalid topics', () => {
        expect(isValidTopic('invalid')).toBe(false);
        expect(isValidTopic('')).toBe(false);
        expect(isValidTopic(null)).toBe(false);
      });
    });

    describe('isValidLanguage', () => {
      it('returns true for valid languages', () => {
        const validLanguages: Language[] = ['en', 'zh'];
        validLanguages.forEach((lang) => {
          expect(isValidLanguage(lang)).toBe(true);
        });
      });

      it('returns false for invalid languages', () => {
        expect(isValidLanguage('fr')).toBe(false);
        expect(isValidLanguage('')).toBe(false);
      });
    });
  });

  describe('validateFrontmatter', () => {
    const validFrontmatter = {
      title: 'Test Essay',
      description: 'A test essay description',
      date: '2024-01-15',
      type: 'guide',
      topics: ['technical', 'ai'],
    };

    it('validates correct frontmatter', () => {
      const result = validateFrontmatter(validFrontmatter);
      expect(result.title).toBe('Test Essay');
      expect(result.description).toBe('A test essay description');
      expect(result.date).toBe('2024-01-15');
      expect(result.type).toBe('guide');
      expect(result.topics).toEqual(['technical', 'ai']);
      expect(result.lang).toBe('en'); // default
    });

    it('accepts optional lang field', () => {
      const result = validateFrontmatter({ ...validFrontmatter, lang: 'zh' });
      expect(result.lang).toBe('zh');
    });

    it('accepts optional draft field', () => {
      const result = validateFrontmatter({ ...validFrontmatter, draft: true });
      expect(result.draft).toBe(true);
    });

    it('throws for missing title', () => {
      const { title, ...rest } = validFrontmatter;
      expect(() => validateFrontmatter(rest)).toThrow('title is required');
    });

    it('throws for missing description', () => {
      const { description, ...rest } = validFrontmatter;
      expect(() => validateFrontmatter(rest)).toThrow('description is required');
    });

    it('throws for missing date', () => {
      const { date, ...rest } = validFrontmatter;
      expect(() => validateFrontmatter(rest)).toThrow('date is required');
    });

    it('throws for invalid type', () => {
      expect(() =>
        validateFrontmatter({ ...validFrontmatter, type: 'invalid' })
      ).toThrow('type must be one of');
    });

    it('throws for invalid topics', () => {
      expect(() =>
        validateFrontmatter({ ...validFrontmatter, topics: ['invalid'] })
      ).toThrow('topics must be an array');
    });

    it('throws for invalid lang', () => {
      expect(() =>
        validateFrontmatter({ ...validFrontmatter, lang: 'fr' })
      ).toThrow('lang must be one of');
    });

    it('throws for invalid draft type', () => {
      expect(() =>
        validateFrontmatter({ ...validFrontmatter, draft: 'yes' })
      ).toThrow('draft must be a boolean');
    });
  });
});
