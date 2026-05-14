import type { Metadata } from 'next';
import { PeriodicsIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: '文摘',
  description: '精选文摘、更新日志和笔记',
  alternates: {
    canonical: '/zh/periodics',
    languages: {
      en: '/periodics',
      zh: '/zh/periodics',
      'x-default': '/periodics',
    },
  },
};

export default function ZhPeriodicsPage() {
  return <PeriodicsIndexPage language="zh" />;
}
