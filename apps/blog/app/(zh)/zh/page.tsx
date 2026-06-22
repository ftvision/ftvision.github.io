import type { Metadata } from 'next';
import { LandingPage } from '@/components/pages';

export const metadata: Metadata = {
  alternates: {
    canonical: '/zh/',
    languages: {
      en: '/',
      zh: '/zh/',
      'x-default': '/',
    },
  },
};

export default function ZhPage() {
  return <LandingPage language="zh" />;
}
