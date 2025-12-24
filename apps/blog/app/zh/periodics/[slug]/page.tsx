import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPeriodicBySlug, getPeriodicSlugsByLanguage, getPeriodicTranslation } from '@/lib/periodics';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-options';
import { EssayLayout } from '@/components/essay';
import { PeriodicHeader } from '@/components/periodic';

interface PeriodicPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all Chinese periodics
 */
export async function generateStaticParams() {
  const slugs = getPeriodicSlugsByLanguage('zh');
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for the periodic page
 */
export async function generateMetadata({
  params,
}: PeriodicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const periodic = getPeriodicBySlug(slug);

  if (!periodic) {
    return {
      title: '文摘未找到',
    };
  }

  // Build hreflang alternates
  const alternates: Metadata['alternates'] = {
    languages: {
      'zh': `/zh/periodics/${slug}`,
    },
  };

  // Check for English translation
  const enTranslation = getPeriodicTranslation(slug, 'en');
  if (enTranslation && enTranslation.slug !== slug) {
    alternates.languages!['en'] = `/periodics/${enTranslation.slug}`;
  }

  return {
    title: periodic.title,
    description: periodic.description || `${periodic.title} - 第${periodic.issue}期`,
    openGraph: {
      title: periodic.title,
      description: periodic.description || `${periodic.title} - 第${periodic.issue}期`,
      type: 'article',
      publishedTime: periodic.date,
      tags: periodic.topics,
    },
    alternates,
  };
}

/**
 * Chinese periodic page component
 */
export default async function ZhPeriodicPage({ params }: PeriodicPageProps) {
  const { slug } = await params;
  const periodic = getPeriodicBySlug(slug);

  if (!periodic) {
    notFound();
  }

  const { title, description, date, issue, type, topics, readingTime, content } =
    periodic;

  return (
    <EssayLayout
      header={
        <PeriodicHeader
          issue={issue}
          type={type}
          topics={topics}
          title={title}
          description={description}
          date={date}
          readingTime={readingTime}
          language="zh"
        />
      }
    >
      <MDXRemote source={content} components={getMDXComponents()} options={{ mdxOptions }} />
    </EssayLayout>
  );
}
