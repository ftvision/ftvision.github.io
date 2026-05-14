import type { Metadata } from 'next';
import { SeriesIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: '系列',
  description: '精选资源、文献和阅读清单',
  alternates: {
    canonical: '/zh/series',
    languages: {
      en: '/series',
      zh: '/zh/series',
      'x-default': '/series',
    },
  },
};

export default function ZhSeriesPage() {
  return <SeriesIndexPage language="zh" />;
}
