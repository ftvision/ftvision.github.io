import { getAllEssays } from '@/lib/essays';
import { translate, type Language } from '@/lib/i18n';
import { EssaysPageContent } from './EssaysPageContent';

export interface EssaysIndexPageProps {
  /** Language for the page content */
  language?: Language;
}

/**
 * Shared EssaysIndexPage component
 *
 * Displays all essays with type and topic filters.
 * Used by both `/essays` (English) and `/zh/essays` (Chinese) routes.
 *
 * This is a server component that fetches all essays at build time
 * and delegates filtering to the client-side EssaysPageContent component.
 */
export function EssaysIndexPage({ language = 'en' }: EssaysIndexPageProps) {
  const basePath = language === 'zh' ? '/zh/essays' : '/essays';
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  // Get all essays for this language at build time
  const allEssays = getAllEssays({ language, includeDrafts: false });

  return (
    <main className="mx-auto max-w-3xl px-inset-lg py-16">
      {/* Page header - static content */}
      <header className="mb-10">
        <h1 className="type-display text-balance text-figure-primary">
          {t('nav.essays')}
        </h1>
        <p className="mt-3 type-body text-figure-secondary">
          {t('site.tagline')}
        </p>
      </header>

      {/* Client-side filtering */}
      <EssaysPageContent
        essays={allEssays}
        language={language}
        basePath={basePath}
      />
    </main>
  );
}
