import Link from 'next/link';
import { cn } from '@/lib/utils';
import { translate, formatDate, formatReadingTime } from '@/lib/i18n/translations';
import { getTopicLabel } from '@/lib/constants';
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
 * Editorial composition (hairline rule above heading, restrained typography)
 * intentionally matches the OG card so the on-page block and the social
 * card share a visual idiom. Distributes internal link equity to topically
 * adjacent essays, which is the single most undervalued SEO/GEO lever for
 * a long-tail blog.
 */
export function RelatedEssays({ essays, language, className }: RelatedEssaysProps) {
  if (essays.length === 0) return null;

  const heading = translate(language, 'essay.related.heading');
  const basePath = language === 'zh' ? '/zh/essays' : '/essays';

  return (
    <aside
      className={cn(
        'mx-auto mt-16 max-w-[42rem] border-t border-border pt-10',
        className,
      )}
      aria-labelledby="related-essays-heading"
    >
      <h2
        id="related-essays-heading"
        className="type-h4 text-figure-primary mb-6"
      >
        {heading}
      </h2>

      <ul className="flex flex-col divide-y divide-border">
        {essays.map((essay) => (
          <li key={essay.slug} className="py-5 first:pt-0 last:pb-0">
            <Link
              href={`${basePath}/${essay.slug}`}
              className="group block"
            >
              <p className="text-body-sm uppercase tracking-wide text-figure-muted">
                {essay.topics.length > 0
                  ? getTopicLabel(essay.topics[0], language)
                  : null}
              </p>
              <h3 className="type-h5 mt-1 font-serif text-figure-primary transition-colors group-hover:text-link">
                {essay.title}
              </h3>
              {essay.description ? (
                <p className="mt-2 line-clamp-2 text-body text-figure-secondary">
                  {essay.description}
                </p>
              ) : null}
              <p className="mt-2 flex items-center gap-2 text-body-sm text-figure-muted">
                <time dateTime={essay.date}>
                  {formatDate(language, essay.date)}
                </time>
                {essay.readingTime ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{formatReadingTime(language, essay.readingTime)}</span>
                  </>
                ) : null}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
