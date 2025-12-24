import type { Metadata } from 'next';
import { PeriodicsIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: 'Periodics',
  description:
    'Curated digests, changelogs, and notes on technology, AI, and more.',
  alternates: {
    languages: {
      'en': '/periodics',
      'zh': '/zh/periodics',
    },
  },
};

export default function PeriodicsPage() {
  return <PeriodicsIndexPage language="en" />;
}
