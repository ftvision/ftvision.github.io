import type { Metadata } from 'next';
import { LandingPage } from '@/components/pages';

export const metadata: Metadata = {
  title: {
    absolute: '思算 — 关于 AI、产品与工程的随笔',
  },
  alternates: {
    canonical: '/zh',
    languages: {
      en: '/',
      zh: '/zh',
      'x-default': '/',
    },
  },
};

export default function ZhPage() {
  return <LandingPage language="zh" />;
}
