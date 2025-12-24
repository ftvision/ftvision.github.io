import type { Metadata } from 'next';
import { ReferencesIndexPage } from '@/components/pages';

export const metadata: Metadata = {
  title: '参考',
  description: '精选资源、文献和阅读清单',
  alternates: {
    languages: {
      'en': '/references',
      'zh': '/zh/references',
    },
  },
};

export default function ZhReferencesPage() {
  return <ReferencesIndexPage language="zh" />;
}
