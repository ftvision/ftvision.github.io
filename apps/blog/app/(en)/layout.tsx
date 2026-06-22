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
import { CloudflareAnalytics } from '@/components/analytics';
import { siteGraph } from '@/lib/jsonld';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Algo Mind — Intelligence is an algorithm',
    template: '%s | Algo Mind',
  },
  description:
    'Algo Mind — essays by Feitong Yang on intelligence as computation: AI agents, software engineering, product, and how minds work.',
  keywords: ['Algo Mind', 'Feitong Yang', 'essays', 'AI', 'AI agents', 'cognitive science', 'software engineering', 'product'],
  authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
  creator: SITE_AUTHOR.name,
  publisher: 'Algo Mind',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Algo Mind',
    url: SITE_URL,
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      zh: '/zh/',
      'x-default': '/',
    },
  },
};

interface EnRootLayoutProps {
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

export default function EnRootLayout({ children }: EnRootLayoutProps) {
  return (
    <html lang="en" data-theme="nyt" data-mode="light" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Algo Mind — Essays"
          href="/feed.xml"
        />
        <JsonLd data={siteGraph('en')} />
        <CloudflareAnalytics />
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
          <LanguageProvider initialLanguage="en">
            <SiteHeader actions={<HeaderActions />} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
