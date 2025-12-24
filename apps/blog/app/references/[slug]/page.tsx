import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getReferenceBySlug, getReferenceSlugs, getReferenceTranslation } from '@/lib/references';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-options';
import { EssayLayout } from '@/components/essay';
import { ReferenceHeader } from '@/components/reference';

interface ReferencePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all references
 */
export async function generateStaticParams() {
  const slugs = getReferenceSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for the reference page
 */
export async function generateMetadata({
  params,
}: ReferencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const reference = getReferenceBySlug(slug);

  if (!reference) {
    return {
      title: 'Reference Not Found',
    };
  }

  // Build hreflang alternates
  const alternates: Metadata['alternates'] = {
    languages: {
      'en': `/references/${slug}`,
    },
  };

  // Check for Chinese translation
  const zhTranslation = getReferenceTranslation(slug, 'zh');
  if (zhTranslation && zhTranslation.slug !== slug) {
    alternates.languages!['zh'] = `/zh/references/${zhTranslation.slug}`;
  }

  return {
    title: reference.title,
    description: reference.description,
    openGraph: {
      title: reference.title,
      description: reference.description,
      type: 'article',
      publishedTime: reference.date,
      modifiedTime: reference.updated,
      tags: reference.topics,
    },
    alternates,
  };
}

/**
 * Reference page component
 */
export default async function ReferencePage({ params }: ReferencePageProps) {
  const { slug } = await params;
  const reference = getReferenceBySlug(slug);

  if (!reference) {
    notFound();
  }

  const { title, description, date, updated, category, topics, itemCount, readingTime, content } =
    reference;

  return (
    <EssayLayout
      header={
        <ReferenceHeader
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
