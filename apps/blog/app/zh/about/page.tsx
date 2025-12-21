import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages';

export const metadata: Metadata = {
  title: '关于',
  description: '关于杨飞同 - 职业、背景和兴趣。',
};

export default function ZhAboutPage() {
  return <AboutPage language="zh" />;
}
