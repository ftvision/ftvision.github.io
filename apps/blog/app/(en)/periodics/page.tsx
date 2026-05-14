import type { Metadata } from 'next';
import { PeriodicsIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: 'Periodics',
  description:
    'Curated digests, changelogs, and notes on technology, AI, and more.',
  alternates: {
    canonical: '/periodics',
    languages: {
      en: '/periodics',
      zh: '/zh/periodics',
      'x-default': '/periodics',
    },
  },
};

export default function PeriodicsPage() {
  return <PeriodicsIndexPage language="en" />;
}
