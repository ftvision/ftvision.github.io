import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEssayBySlug, getEssaySlugsByLanguage } from '@/lib/essays';
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
