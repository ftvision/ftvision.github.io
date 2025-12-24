import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPeriodicBySlug, getPeriodicSlugs, getPeriodicTranslation } from '@/lib/periodics';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-options';
import { EssayLayout } from '@/components/essay';
import { PeriodicHeader } from '@/components/periodic';

interface PeriodicPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all periodics
 */
export async function generateStaticParams() {
  const slugs = getPeriodicSlugs();
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
      title: 'Periodic Not Found',
    };
  }

  // Build hreflang alternates
  const alternates: Metadata['alternates'] = {
    languages: {
      'en': `/periodics/${slug}`,
    },
  };

  // Check for Chinese translation
  const zhTranslation = getPeriodicTranslation(slug, 'zh');
  if (zhTranslation && zhTranslation.slug !== slug) {
    alternates.languages!['zh'] = `/zh/periodics/${zhTranslation.slug}`;
  }

  return {
    title: periodic.title,
    description: periodic.description || `${periodic.title} - Issue #${periodic.issue}`,
    openGraph: {
      title: periodic.title,
      description: periodic.description || `${periodic.title} - Issue #${periodic.issue}`,
      type: 'article',
      publishedTime: periodic.date,
      tags: periodic.topics,
    },
    alternates,
  };
}

/**
 * Periodic page component
 */
export default async function PeriodicPage({ params }: PeriodicPageProps) {
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
        />
      }
    >
      <MDXRemote source={content} components={getMDXComponents()} options={{ mdxOptions }} />
    </EssayLayout>
  );
}
