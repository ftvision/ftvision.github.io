import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getSeriesBySlug, getSeriesSlugsByLanguage, getSeriesTranslation } from '@/lib/series';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-options';
import { EssayLayout } from '@/components/essay';
import { SeriesHeader } from '@/components/series';

interface SeriesPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all Chinese series
 */
export async function generateStaticParams() {
  const slugs = getSeriesSlugsByLanguage('zh');
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
      title: '系列未找到',
    };
  }

  // Build hreflang alternates
  const alternates: Metadata['alternates'] = {
    languages: {
      'zh': `/zh/series/${slug}`,
    },
  };

  // Check for English translation
  const enTranslation = getSeriesTranslation(slug, 'en');
  if (enTranslation && enTranslation.slug !== slug) {
    alternates.languages!['en'] = `/series/${enTranslation.slug}`;
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
 * Chinese series page component
 */
export default async function ZhSeriesItemPage({ params }: SeriesPageProps) {
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
          language="zh"
        />
      }
    >
      <MDXRemote source={content} components={getMDXComponents()} options={{ mdxOptions }} />
    </EssayLayout>
  );
}
