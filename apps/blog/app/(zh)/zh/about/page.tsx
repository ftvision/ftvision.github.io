import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages';

export const metadata: Metadata = {
  title: '关于',
  description: '关于 Feitong Yang — 职业、背景和兴趣。',
  alternates: {
    canonical: '/zh/about',
    languages: {
      en: '/about',
      zh: '/zh/about',
      'x-default': '/about',
    },
  },
};

export default function ZhAboutPage() {
  return <AboutPage language="zh" />;
}
