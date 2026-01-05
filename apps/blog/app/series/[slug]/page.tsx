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
 * Series page component
 */
export default async function SeriesItemPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
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
