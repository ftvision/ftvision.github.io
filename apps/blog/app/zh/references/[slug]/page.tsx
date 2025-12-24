import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getReferenceBySlug, getReferenceSlugsByLanguage, getReferenceTranslation } from '@/lib/references';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-options';
import { EssayLayout } from '@/components/essay';
import { ReferenceHeader } from '@/components/reference';

interface ReferencePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all Chinese references
 */
export async function generateStaticParams() {
  const slugs = getReferenceSlugsByLanguage('zh');
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
      title: '参考未找到',
    };
  }

  // Build hreflang alternates
  const alternates: Metadata['alternates'] = {
    languages: {
      'zh': `/zh/references/${slug}`,
    },
  };

  // Check for English translation
  const enTranslation = getReferenceTranslation(slug, 'en');
  if (enTranslation && enTranslation.slug !== slug) {
    alternates.languages!['en'] = `/references/${enTranslation.slug}`;
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
 * Chinese reference page component
 */
export default async function ZhReferencePage({ params }: ReferencePageProps) {
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
          language="zh"
        />
      }
    >
      <MDXRemote source={content} components={getMDXComponents()} options={{ mdxOptions }} />
    </EssayLayout>
  );
}
