import { getSeriesGroupedByCategory } from '@/lib/series';
import { translate, type Language } from '@/lib/i18n';
import { SeriesList } from '@/components/series';
import { getSeriesCategoryLabel, SERIES_CATEGORIES } from '@/lib/constants';

export interface SeriesIndexPageProps {
  /** Language for the page content */
  language?: Language;
}

/**
 * Shared SeriesIndexPage component
 *
 * Displays all series grouped by category.
 * Used by both `/series` (English) and `/zh/series` (Chinese) routes.
 *
 * This is a server component that fetches all series at build time.
 */
export function SeriesIndexPage({ language = 'en' }: SeriesIndexPageProps) {
  const basePath = language === 'zh' ? '/zh/series' : '/series';
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  // Get all series grouped by category for this language at build time
  const groupedSeries = getSeriesGroupedByCategory({ language, includeDrafts: false });

  // Get categories that have content
  const categoriesWithContent = SERIES_CATEGORIES.filter(
    (category) => groupedSeries[category].length > 0
  );

  // Total count
  const totalCount = Object.values(groupedSeries).reduce(
    (sum, items) => sum + items.length,
    0
  );

  return (
    <main className="mx-auto max-w-5xl lg:max-w-6xl px-inset-lg py-12">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-display font-serif text-figure-primary mb-2">
          {t('series.title')}
        </h1>
        <p className="text-body-lg text-figure-secondary">
          {t('series.description')}
        </p>
      </header>

      {/* Series sections by category */}
      {totalCount === 0 ? (
        <div className="py-12 text-center text-figure-muted">
          <p>{t('series.empty')}</p>
        </div>
      ) : (
        <div className="space-y-12">
          {categoriesWithContent.map((category) => (
            <section key={category}>
              <h2 className="text-heading font-serif text-figure-primary mb-4 border-b border-border pb-2">
                {getSeriesCategoryLabel(category, language)}
              </h2>
              <SeriesList
                series={groupedSeries[category]}
                layout="list"
                basePath={basePath}
                language={language}
              />
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
