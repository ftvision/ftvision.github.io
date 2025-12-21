import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEssayBySlug, getEssaySlugsByLanguage, getTranslation } from '@/lib/essays';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { EssayLayout, EssayHeader } from '@/components/essay';

interface ZhEssayPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all Chinese essays
 */
export async function generateStaticParams() {
  const slugs = getEssaySlugsByLanguage('zh');
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for the essay page
 */
export async function generateMetadata({
  params,
}: ZhEssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    return {
      title: '文章未找到',
    };
  }

  // Build hreflang alternates
  const alternates: Metadata['alternates'] = {
    languages: {
      'zh': `/zh/essays/${slug}`,
    },
  };

  // Check for English translation
  const enTranslation = getTranslation(slug, 'en');
  if (enTranslation && enTranslation.slug !== slug) {
    alternates.languages!['en'] = `/essays/${enTranslation.slug}`;
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
      locale: 'zh_CN',
    },
    alternates,
  };
}

/**
 * Chinese essay page component
 */
export default async function ZhEssayPage({ params }: ZhEssayPageProps) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  // Ensure this is a Chinese essay
  if (essay.lang !== 'zh') {
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
          language="zh"
        />
      }
    >
      <MDXRemote source={content} components={getMDXComponents()} />
    </EssayLayout>
  );
}
