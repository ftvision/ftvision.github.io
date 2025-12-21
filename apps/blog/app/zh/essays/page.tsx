import type { Metadata } from 'next';
import { EssaysIndexPage, parseTypeParam, parseTopicsParam } from '@/components/pages';

export const metadata: Metadata = {
  title: '文章',
  description: '关于技术、AI、产品思维和职业发展的文章。',
};

interface ZhEssaysPageProps {
  searchParams: Promise<{ type?: string; topics?: string }>;
}

export default async function ZhEssaysPage({ searchParams }: ZhEssaysPageProps) {
  const params = await searchParams;
  const selectedType = parseTypeParam(params.type);
  const selectedTopics = parseTopicsParam(params.topics);

  return (
    <EssaysIndexPage
      language="zh"
      selectedType={selectedType}
      selectedTopics={selectedTopics}
    />
  );
}
