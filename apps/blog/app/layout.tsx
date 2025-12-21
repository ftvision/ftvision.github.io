import type { Metadata } from 'next';
import '@blog/tokens/css';
import './globals.css';
import {
  SiteHeader,
  SiteFooter,
  ThemeProvider,
  ModeToggle,
  ThemeSelector,
  LanguageToggle,
} from '../components/layout';
import { LanguageProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  title: {
    default: 'Essays',
    template: '%s | Essays',
  },
  description: 'Personal essays on technology, AI, product, and career.',
  keywords: ['essays', 'blog', 'technology', 'AI', 'product', 'career'],
  authors: [{ name: 'Author' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Essays',
  },
  alternates: {
    languages: {
      'en': '/',
      'zh': '/zh',
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Header actions component - Language, Theme, and Mode selectors
 */
function HeaderActions() {
  return (
    <div className="flex items-center gap-1">
      <LanguageToggle />
      <ThemeSelector />
      <ModeToggle />
    </div>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="nyt" data-mode="light" suppressHydrationWarning>
      <head>
        {/* Script to prevent flash of wrong theme */}
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

                  // Language detection
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
      <body className="flex min-h-screen flex-col bg-ground-primary text-figure-primary antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <SiteHeader actions={<HeaderActions />} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
