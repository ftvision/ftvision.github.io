import { getAllReferences, getReferencesGroupedByCategory } from '@/lib/references';
import { translate, type Language } from '@/lib/i18n';
import { ReferenceList } from '@/components/reference';
import { getReferenceCategoryLabel, REFERENCE_CATEGORIES } from '@/lib/constants';

export interface ReferencesIndexPageProps {
  /** Language for the page content */
  language?: Language;
}

/**
 * Shared ReferencesIndexPage component
 *
 * Displays all references grouped by category.
 * Used by both `/references` (English) and `/zh/references` (Chinese) routes.
 *
 * This is a server component that fetches all references at build time.
 */
export function ReferencesIndexPage({ language = 'en' }: ReferencesIndexPageProps) {
  const basePath = language === 'zh' ? '/zh/references' : '/references';
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  // Get all references grouped by category for this language at build time
  const groupedReferences = getReferencesGroupedByCategory({ language, includeDrafts: false });

  // Get categories that have content
  const categoriesWithContent = REFERENCE_CATEGORIES.filter(
    (category) => groupedReferences[category].length > 0
  );

  // Total count
  const totalCount = Object.values(groupedReferences).reduce(
    (sum, refs) => sum + refs.length,
    0
  );

  return (
    <main className="mx-auto max-w-5xl px-inset-lg py-12">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-display font-serif text-figure-primary mb-2">
          {t('references.title')}
        </h1>
        <p className="text-body-lg text-figure-secondary">
          {t('references.description')}
        </p>
      </header>

      {/* Reference sections by category */}
      {totalCount === 0 ? (
        <div className="py-12 text-center text-figure-muted">
          <p>{t('references.empty')}</p>
        </div>
      ) : (
        <div className="space-y-12">
          {categoriesWithContent.map((category) => (
            <section key={category}>
              <h2 className="text-heading font-serif text-figure-primary mb-4 border-b border-border pb-2">
                {getReferenceCategoryLabel(category, language)}
              </h2>
              <ReferenceList
                references={groupedReferences[category]}
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
