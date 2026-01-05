import type { Metadata } from 'next';
import { SeriesIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: 'Series',
  description:
    'Curated resources, bibliographies, and reading lists.',
  alternates: {
    languages: {
      'en': '/series',
      'zh': '/zh/series',
    },
  },
};

export default function SeriesPage() {
  return <SeriesIndexPage language="en" />;
}
