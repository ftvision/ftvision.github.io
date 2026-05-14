import type { Metadata } from 'next';
import { SITE_AUTHOR, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: '思算 — 关于 AI、产品与工程的随笔',
    template: '%s | 思算',
  },
  description: '思算 — Feitong Yang 关于 AI、软件工程、产品思考与职业的随笔。',
  keywords: ['思算', 'Algo Mind', 'Feitong Yang', '随笔', '博客', 'AI', '技术', '产品', '职业'],
  authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
  creator: SITE_AUTHOR.name,
  publisher: '思算',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '思算',
    url: `${SITE_URL}/zh`,
  },
  alternates: {
    canonical: '/zh',
    languages: {
      'en': '/',
      'zh': '/zh',
      'x-default': '/',
    },
  },
};

interface ZhLayoutProps {
  children: React.ReactNode;
}

/**
 * Chinese language layout wrapper
 *
 * This layout wraps all /zh/* routes and sets the language context to Chinese.
 * The actual <html lang> attribute and LanguageProvider are handled in the root layout.
 */
export default function ZhLayout({ children }: ZhLayoutProps) {
  return <>{children}</>;
}
