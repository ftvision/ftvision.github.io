import type { Metadata } from 'next';
import '@blog/tokens/css';
import './globals.css';

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
};

interface RootLayoutProps {
  children: React.ReactNode;
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
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-ground-primary text-figure-primary antialiased">
        {children}
      </body>
    </html>
  );
}
