import type { Metadata } from 'next';
import '@blog/tokens/css';
import '../globals.css';
import {
  SiteHeader,
  SiteFooter,
  ThemeProvider,
  ModeToggle,
  ThemeSelector,
  LanguageToggle,
} from '@/components/layout';
import { LanguageProvider } from '@/lib/i18n';
import { SITE_AUTHOR, SITE_URL } from '@/lib/constants';
import { JsonLd } from '@/components/seo';
import { siteGraph } from '@/lib/jsonld';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
      en: '/',
      zh: '/zh',
      'x-default': '/',
    },
  },
};

interface ZhRootLayoutProps {
  children: React.ReactNode;
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-1">
      <LanguageToggle />
      <ThemeSelector />
      <ModeToggle />
    </div>
  );
}

export default function ZhRootLayout({ children }: ZhRootLayoutProps) {
  return (
    <html lang="zh" data-theme="nyt" data-mode="light" data-language="zh" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/atom+xml"
          title="思算 — 随笔"
          href="/zh/feed.xml"
        />
        <JsonLd data={siteGraph('zh')} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const mode = localStorage.getItem('theme-mode');
                  const theme = localStorage.getItem('theme-name') || 'nyt';
                  if (mode) {
                    document.documentElement.dataset.mode = mode;
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.dataset.mode = 'dark';
                  }
                  document.documentElement.dataset.theme = theme;

                  const lang = localStorage.getItem('language-preference');
                  if (lang) {
                    document.documentElement.lang = lang;
                    document.documentElement.dataset.language = lang;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-clip bg-ground-primary text-figure-primary antialiased">
        <ThemeProvider>
          <LanguageProvider initialLanguage="zh">
            <SiteHeader actions={<HeaderActions />} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
