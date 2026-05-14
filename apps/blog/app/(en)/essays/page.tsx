import type { Metadata } from 'next';
import { EssaysIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: 'Essays',
  description:
    'Essays on technology, AI, product thinking, and career development.',
  alternates: {
    canonical: '/essays',
    languages: {
      en: '/essays',
      zh: '/zh/essays',
      'x-default': '/essays',
    },
  },
};

export default function EssaysPage() {
  return <EssaysIndexPage language="en" />;
}
