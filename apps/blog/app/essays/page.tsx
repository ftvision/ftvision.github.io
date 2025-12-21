import type { Metadata } from 'next';
import { EssaysIndexPage, parseTypeParam, parseTopicsParam } from '@/components/pages';

export const metadata: Metadata = {
  title: 'Essays',
  description:
    'Essays on technology, AI, product thinking, and career development.',
  alternates: {
    languages: {
      'en': '/essays',
      'zh': '/zh/essays',
    },
  },
};

interface EssaysPageProps {
  searchParams: Promise<{ type?: string; topics?: string }>;
}

export default async function EssaysPage({ searchParams }: EssaysPageProps) {
  const params = await searchParams;
  const selectedType = parseTypeParam(params.type);
  const selectedTopics = parseTopicsParam(params.topics);

  return (
    <EssaysIndexPage
      language="en"
      selectedType={selectedType}
      selectedTopics={selectedTopics}
    />
  );
}
