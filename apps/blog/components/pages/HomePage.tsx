import Link from 'next/link';
import { getRecentEssays } from '@/lib/essays';
import { EssayList } from '@/components/essay';
import { Button } from '@blog/ui';
import { translate, type Language } from '@/lib/i18n';

export interface HomePageProps {
  /** Language for the page content */
  language?: Language;
}

/**
 * Shared HomePage component
 *
 * Displays the landing page with hero section and recent essays.
 * Used by both `/` (English) and `/zh` (Chinese) routes.
 */
export function HomePage({ language = 'en' }: HomePageProps) {
  const basePath = language === 'zh' ? '/zh' : '';
  const recentEssays = getRecentEssays(5, { language });

  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  return (
    <main className="mx-auto max-w-4xl px-inset-lg py-12">
      {/* Hero section */}
      <section className="mb-16 text-center">
        <h1 className="text-display font-serif text-figure-primary mb-4">
          {t('site.name')}
        </h1>
        <p className="text-body-lg text-figure-secondary max-w-2xl mx-auto mb-8">
          {t('site.tagline')}
        </p>
        <nav className="flex justify-center gap-4">
          <Link href={`${basePath}/essays`}>
            <Button variant="primary" size="md">
              {t('home.browseAll')}
            </Button>
          </Link>
          <Link href={`${basePath}/about`}>
            <Button variant="secondary" size="md">
              {t('nav.about')}
            </Button>
          </Link>
        </nav>
      </section>

      {/* Recent essays section */}
      {recentEssays.length > 0 && (
        <section>
          <header className="mb-6 flex items-center justify-between">
            <h2 className="text-heading-lg font-serif text-figure-primary">
              {t('home.recentEssays')}
            </h2>
            <Link
              href={`${basePath}/essays`}
              className="text-body-sm text-link hover:text-link-hover"
            >
              {t('home.viewAll')} →
            </Link>
          </header>
          <EssayList
            essays={recentEssays}
            layout="list"
            variant="default"
            basePath={`${basePath}/essays`}
          />
        </section>
      )}
    </main>
  );
}
