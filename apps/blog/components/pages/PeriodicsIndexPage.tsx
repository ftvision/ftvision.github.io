import { getAllPeriodics } from '@/lib/periodics';
import { translate, type Language } from '@/lib/i18n';
import { PeriodicList } from '@/components/periodic';

export interface PeriodicsIndexPageProps {
  /** Language for the page content */
  language?: Language;
}

/**
 * Shared PeriodicsIndexPage component
 *
 * Displays all periodics in a chronological archive view.
 * Used by both `/periodics` (English) and `/zh/periodics` (Chinese) routes.
 *
 * This is a server component that fetches all periodics at build time.
 */
export function PeriodicsIndexPage({ language = 'en' }: PeriodicsIndexPageProps) {
  const basePath = language === 'zh' ? '/zh/periodics' : '/periodics';
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  // Get all periodics for this language at build time
  const allPeriodics = getAllPeriodics({ language, includeDrafts: false });

  return (
    <main className="mx-auto max-w-5xl px-inset-lg py-12">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-display font-serif text-figure-primary mb-2">
          {t('periodics.title')}
        </h1>
        <p className="text-body-lg text-figure-secondary">
          {t('periodics.description')}
        </p>
      </header>

      {/* Periodic list */}
      <PeriodicList
        periodics={allPeriodics}
        layout="list"
        basePath={basePath}
        language={language}
        emptyMessage={t('periodics.empty')}
      />
    </main>
  );
}
