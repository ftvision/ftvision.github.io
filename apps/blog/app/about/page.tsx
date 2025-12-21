import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Feitong Yang - career, background, and interests.',
  alternates: {
    languages: {
      'en': '/about',
      'zh': '/zh/about',
    },
  },
};

export default function Page() {
  return <AboutPage language="en" />;
}
