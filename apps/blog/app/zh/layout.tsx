import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '文章',
    template: '%s | 文章',
  },
  description: '关于技术、AI、产品和职业的个人文章。',
  keywords: ['文章', '博客', '技术', 'AI', '产品', '职业'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '文章',
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
