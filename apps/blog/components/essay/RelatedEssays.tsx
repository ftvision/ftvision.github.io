import Link from 'next/link';
import { cn } from '@/lib/utils';
import { translate, formatReadingTime } from '@/lib/i18n/translations';
import type { EssayMeta, Language } from '@/types/content';

export interface RelatedEssaysProps {
  /** Pre-computed list of related essays. Empty list renders nothing. */
  essays: EssayMeta[];
  /** Language for labels, dates, and link paths. */
  language: Language;
  /** Optional className for the wrapping <aside>. */
  className?: string;
}

/**
 * "Related essays" footer rendered at the bottom of essay detail pages.
 *
 * Composition: a small uppercase eyebrow followed by a numbered list of
 * essay titles, each with reading time on the right and a hairline rule
 * between rows. Modeled on the back-of-book "Further Reading" appendix
 * in printed essay collections — quiet, typographic, easy to skim, no
 * card boxes. The visual register matches the OG card so the on-page
 * footer and the social card share an idiom.
 */
export function RelatedEssays({ essays, language, className }: RelatedEssaysProps) {
  if (essays.length === 0) return null;

  const heading = translate(language, 'essay.related.heading');
  const basePath = language === 'zh' ? '/zh/essays' : '/essays';

  return (
    <aside
      className={cn(
        'mx-auto mt-16 max-w-[42rem] border-t border-border pt-8',
        className,
      )}
      aria-labelledby="related-essays-heading"
    >
      <h2
        id="related-essays-heading"
        className="text-body-sm uppercase tracking-widest text-figure-muted mb-2"
      >
        {heading}
      </h2>

      <ol className="flex flex-col">
        {essays.map((essay, i) => (
          <li
            key={essay.slug}
            className="border-b border-border last:border-b-0"
          >
            <Link
              href={`${basePath}/${essay.slug}`}
              className="group flex items-baseline gap-6 py-4 transition-colors"
            >
              <span
                aria-hidden="true"
                className="font-serif text-body-sm tabular-nums text-figure-muted"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-serif text-figure-primary transition-colors group-hover:text-link">
                {essay.title}
              </span>
              {essay.readingTime ? (
                <span className="shrink-0 text-body-sm text-figure-muted">
                  {formatReadingTime(language, essay.readingTime)}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
