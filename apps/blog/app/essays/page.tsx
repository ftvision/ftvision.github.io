import type { Metadata } from 'next';
import { EssaysIndexPage } from '@/components/pages';

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

export default function EssaysPage() {
  return <EssaysIndexPage language="en" />;
}
