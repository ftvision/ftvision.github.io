import type { Metadata } from 'next';
import { ReferencesIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: 'References',
  description:
    'Curated resources, bibliographies, and reading lists.',
  alternates: {
    languages: {
      'en': '/references',
      'zh': '/zh/references',
    },
  },
};

export default function ReferencesPage() {
  return <ReferencesIndexPage language="en" />;
}
