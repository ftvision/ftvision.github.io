import { notFound, redirect } from 'next/navigation';
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
 * Generate static paths for all periodics (handles both Chinese content and English-only redirects)
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
          <span>中</span>
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
 * Component shown when content exists in English but not Chinese
 */
function EnglishVersionAvailable() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="type-h1 text-figure-primary mb-4">英文内容</h1>
      <p className="type-body text-figure-secondary">
        此文摘为英文撰写。请使用页面顶部的语言切换按钮切换至英文。
      </p>
      <LanguageTogglePreview highlight="en" />
    </div>
  );
}

/**
 * Chinese periodic page component
 */
export default async function ZhPeriodicPage({ params }: PeriodicPageProps) {
  const { slug } = await params;
  const periodic = getPeriodicBySlug(slug);

  // Content doesn't exist at all
  if (!periodic) {
    notFound();
  }

  // Content exists but is in English, not Chinese
  if (periodic.lang === 'en') {
    // Check if there's a Chinese translation we can redirect to
    const zhTranslation = getPeriodicTranslation(slug, 'zh');
    if (zhTranslation && zhTranslation.slug !== slug) {
      redirect(`/zh/periodics/${zhTranslation.slug}`);
    }
    return <EnglishVersionAvailable />;
  }

  const { title, description, date, issue, type, topics, readingTime, content, toc } =
    periodic;

  return (
    <EssayLayout
      toc={toc}
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
