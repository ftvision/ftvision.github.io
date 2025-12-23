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
    <main className="mx-auto max-w-5xl px-inset-lg py-12">
      {/* Page header - static content */}
      <header className="mb-8">
        <h1 className="text-display font-serif text-figure-primary mb-2">
          {t('nav.essays')}
        </h1>
        <p className="text-body-lg text-figure-secondary">
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
