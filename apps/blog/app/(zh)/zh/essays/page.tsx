import type { Metadata } from 'next';
import { EssaysIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: '文章',
  description: '关于技术、AI、产品思维和职业发展的文章。',
  alternates: {
    canonical: '/zh/essays/',
    languages: {
      en: '/essays/',
      zh: '/zh/essays/',
      'x-default': '/essays/',
    },
  },
};

export default function ZhEssaysPage() {
  return <EssaysIndexPage language="zh" />;
}
