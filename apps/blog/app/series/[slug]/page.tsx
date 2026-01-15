import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getSeriesBySlug, getSeriesSlugs, getSeriesTranslation } from '@/lib/series';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-options';
import { EssayLayout } from '@/components/essay';
import { SeriesHeader } from '@/components/series';

interface SeriesPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all series
 */
export async function generateStaticParams() {
  const slugs = getSeriesSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for the series page
 */
export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    return {
      title: 'Series Not Found',
    };
  }

  // Build hreflang alternates
  const alternates: Metadata['alternates'] = {
    languages: {
      'en': `/series/${slug}`,
    },
  };

  // Check for Chinese translation
  const zhTranslation = getSeriesTranslation(slug, 'zh');
  if (zhTranslation && zhTranslation.slug !== slug) {
    alternates.languages!['zh'] = `/zh/series/${zhTranslation.slug}`;
  }

  return {
    title: series.title,
    description: series.description,
    openGraph: {
      title: series.title,
      description: series.description,
      type: 'article',
      publishedTime: series.date,
      modifiedTime: series.updated,
      tags: series.topics,
    },
    alternates,
  };
}

/**
 * Static preview of the language toggle dropdown
 */
function LanguageTogglePreview({ highlight }: { highlight: 'en' | 'zh' }) {
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <div className="mt-8 inline-block rounded-lg border border-border bg-ground-secondary p-6" aria-hidden="true">
      <div className="inline-flex flex-col items-end">
        {/* Trigger button */}
        <div className="inline-flex items-center justify-center rounded-md p-2 min-w-[36px] text-sm font-medium bg-ground-tertiary text-figure-primary">
          <span>EN</span>
        </div>
        {/* Dropdown menu */}
        <div className="mt-1 min-w-[120px] rounded-md border border-border bg-ground-primary p-1 shadow-lg">
          <div className={`flex items-center justify-between gap-4 px-3 py-2 rounded-sm text-sm ${highlight === 'en' ? 'bg-ground-secondary' : ''}`}>
            <span>English</span>
            {highlight === 'en' && <CheckIcon />}
          </div>
          <div className={`flex items-center justify-between gap-4 px-3 py-2 rounded-sm text-sm ${highlight === 'zh' ? 'bg-ground-secondary' : ''}`}>
            <span>中文</span>
            {highlight === 'zh' && <CheckIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Component shown when content exists in Chinese but not English
 */
function ChineseVersionAvailable() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="type-h1 text-figure-primary mb-4">Content in Chinese</h1>
      <p className="type-body text-figure-secondary">
        This series is written in Chinese. Use the language toggle in the header to switch to Chinese.
      </p>
      <LanguageTogglePreview highlight="zh" />
    </div>
  );
}

/**
 * Series page component
 */
export default async function SeriesItemPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  // Content doesn't exist at all
  if (!series) {
    notFound();
  }

  // Content exists but is in Chinese, not English
  if (series.lang === 'zh') {
    return <ChineseVersionAvailable />;
  }

  const { title, description, date, updated, category, topics, itemCount, readingTime, content, toc } =
    series;

  return (
    <EssayLayout
      toc={toc}
      header={
        <SeriesHeader
          category={category}
          topics={topics}
          title={title}
          description={description}
          date={date}
          updated={updated}
          itemCount={itemCount}
          readingTime={readingTime}
        />
      }
    >
      <MDXRemote source={content} components={getMDXComponents()} options={{ mdxOptions }} />
    </EssayLayout>
  );
}
