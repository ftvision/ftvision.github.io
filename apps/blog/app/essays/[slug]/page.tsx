import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEssayBySlug, getEssaySlugs, getTranslation } from '@/lib/essays';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-options';
import { EssayLayout, EssayHeader } from '@/components/essay';

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all essays
 */
export async function generateStaticParams() {
  const slugs = getEssaySlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for the essay page
 */
export async function generateMetadata({
  params,
}: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    return {
      title: 'Essay Not Found',
    };
  }

  // Build hreflang alternates
  const alternates: Metadata['alternates'] = {
    languages: {
      'en': `/essays/${slug}`,
    },
  };

  // Check for Chinese translation
  const zhTranslation = getTranslation(slug, 'zh');
  if (zhTranslation && zhTranslation.slug !== slug) {
    alternates.languages!['zh'] = `/zh/essays/${zhTranslation.slug}`;
  }

  return {
    title: essay.title,
    description: essay.description,
    openGraph: {
      title: essay.title,
      description: essay.description,
      type: 'article',
      publishedTime: essay.date,
      tags: essay.topics,
    },
    alternates,
  };
}

/**
 * Essay page component
 */
export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  const { title, description, date, type, topics, readingTime, content } =
    essay;

  return (
    <EssayLayout
      header={
        <EssayHeader
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
