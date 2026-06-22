import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEssayBySlug, getEssaySlugs, getRelatedEssays, getTranslation } from '@/lib/essays';
import { getEssayReadingDepth } from '@/lib/essay-reading';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-options';
import { EssayLayout, EssayHeader, RelatedEssays } from '@/components/essay';
import { EssayReadingDepth } from '@/components/essay/EssayReadingDepth';
import { JsonLd } from '@/components/seo';
import { breadcrumbSchema, essayPostingSchema } from '@/lib/jsonld';

interface ZhEssayPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all essays (handles both Chinese content and English-only redirects)
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
}: ZhEssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    return { title: '文章未找到' };
  }

  if (essay.lang !== 'zh') {
    return {
      title: '英文内容',
      robots: { index: false, follow: true },
    };
  }

  const alternates: Metadata['alternates'] = {
    canonical: `/zh/essays/${slug}/`,
    languages: {
      zh: `/zh/essays/${slug}/`,
    },
    types: {
      'text/markdown': `/zh/essays/${slug}/raw.md`,
    },
  };

  const enTranslation = getTranslation(slug, 'en');
  if (enTranslation && enTranslation.slug !== slug) {
    alternates.languages!['en'] = `/essays/${enTranslation.slug}/`;
    alternates.languages!['x-default'] = `/essays/${enTranslation.slug}/`;
  } else {
    alternates.languages!['x-default'] = `/zh/essays/${slug}/`;
  }

  const ogOverride = essay.image
    ? { openGraph: { images: [essay.image] }, twitter: { images: [essay.image] } }
    : {};

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
      ...ogOverride.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      ...ogOverride.twitter,
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
        此文章为英文撰写。请使用页面顶部的语言切换按钮切换至英文。
      </p>
      <LanguageTogglePreview highlight="en" />
    </div>
  );
}

/**
 * Chinese essay page component
 */
export default async function ZhEssayPage({ params }: ZhEssayPageProps) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  // Content doesn't exist at all
  if (!essay) {
    notFound();
  }

  // Content exists but is in English, not Chinese
  if (essay.lang === 'en') {
    // Check if there's a Chinese translation we can redirect to
    const zhTranslation = getTranslation(slug, 'zh');
    if (zhTranslation && zhTranslation.slug !== slug) {
      redirect(`/zh/essays/${zhTranslation.slug}`);
    }
    return <EnglishVersionAvailable />;
  }

  const { title, description, date, type, topics, readingTime, content, toc } =
    essay;
  const urlPath = `/zh/essays/${slug}`;
  const related = getRelatedEssays(slug, { limit: 3 });
  const readingDepth = getEssayReadingDepth(slug);
  const fullContent = (
    <MDXRemote source={content} components={getMDXComponents()} options={{ mdxOptions }} />
  );

  return (
    <>
      <JsonLd data={essayPostingSchema(essay, urlPath)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: '首页', url: '/zh' },
          { name: '文章', url: '/zh/essays' },
          { name: title, url: urlPath },
        ])}
      />
      <EssayLayout
        toc={toc}
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
        footer={<RelatedEssays essays={related} language="zh" />}
      >
        {readingDepth ? (
          <EssayReadingDepth readingDepth={readingDepth} full={fullContent} />
        ) : (
          fullContent
        )}
      </EssayLayout>
    </>
  );
}
