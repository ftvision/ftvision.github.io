/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './themes/ft_personal/layouts/**/*.html',
    './content/**/*.md',
    './content/**/*.html',
    './layouts/**/*.html',
  ],
  darkMode: 'media', // Use system preference for dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'Consolas',
          'monospace',
        ],
      },
      fontWeight: {
        'extra-light': 200,
        light: 300,
        normal: 400,
        medium: 500,
        'semi-bold': 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
            fontSize: '1.125rem',
            h1: {
              fontWeight: '300',
              fontSize: '3rem',
              lineHeight: '1.2',
              marginBottom: '2rem',
              marginTop: '3rem',
              letterSpacing: '-0.025em',
              color: '#111827',
            },
            h2: {
              fontWeight: '300',
              fontSize: '2.25rem',
              lineHeight: '1.3',
              marginTop: '3rem',
              marginBottom: '1.5rem',
              letterSpacing: '-0.025em',
              color: '#111827',
            },
            h3: {
              fontWeight: '400',
              fontSize: '1.875rem',
              lineHeight: '1.4',
              marginTop: '2rem',
              marginBottom: '1rem',
              letterSpacing: '-0.025em',
              color: '#111827',
            },
            h4: {
              fontWeight: '500',
              fontSize: '1.5rem',
              lineHeight: '1.5',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              color: '#111827',
            },
            p: {
              marginBottom: '1.5rem',
              lineHeight: '1.75',
              color: '#374151',
            },
            blockquote: {
              fontWeight: '300',
              fontSize: '1.25rem',
              lineHeight: '1.6',
              fontStyle: 'italic',
              borderLeftWidth: '4px',
              borderLeftColor: '#d1d5db',
              paddingLeft: '1.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              color: '#6b7280',
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
                color: '#1d4ed8',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              fontWeight: '500',
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontFamily:
                'SF Mono, Monaco, Inconsolata, Roboto Mono, Consolas, monospace',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              borderRadius: '0.5rem',
              border: '1px solid #374151',
              padding: '1.5rem',
              overflowX: 'auto',
              lineHeight: '1.7',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            ul: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
            },
            ol: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              lineHeight: '1.75',
              color: '#374151',
            },
            img: {
              borderRadius: '0.5rem',
              boxShadow:
                '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
            },
            table: {
              fontSize: '0.875rem',
              lineHeight: '1.7',
            },
            th: {
              backgroundColor: '#f9fafb',
              borderWidth: '1px',
              borderColor: '#d1d5db',
              fontWeight: '600',
              padding: '0.75rem 1rem',
            },
            td: {
              borderWidth: '1px',
              borderColor: '#d1d5db',
              padding: '0.75rem 1rem',
            },
          },
        },
        xl: {
          css: {
            fontSize: '1.25rem',
            lineHeight: '1.8',
            h1: {
              fontSize: '4rem',
              lineHeight: '1.1',
            },
            h2: {
              fontSize: '3rem',
              lineHeight: '1.2',
            },
            h3: {
              fontSize: '2.25rem',
              lineHeight: '1.3',
            },
            h4: {
              fontSize: '1.875rem',
              lineHeight: '1.4',
            },
            blockquote: {
              fontSize: '1.5rem',
              lineHeight: '1.6',
            },
          },
        },
        dark: {
          css: {
            color: '#d1d5db',
            h1: { color: '#f9fafb' },
            h2: { color: '#f9fafb' },
            h3: { color: '#f9fafb' },
            h4: { color: '#f9fafb' },
            h5: { color: '#f9fafb' },
            h6: { color: '#f9fafb' },
            strong: { color: '#f9fafb' },
            p: { color: '#d1d5db' },
            li: { color: '#d1d5db' },
            blockquote: {
              color: '#9ca3af',
              borderLeftColor: '#4b5563',
            },
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            code: {
              backgroundColor: '#374151',
              color: '#e5e7eb',
            },
            pre: {
              backgroundColor: '#1f2937',
              borderColor: '#374151',
            },
            th: {
              backgroundColor: '#374151',
              borderColor: '#4b5563',
              color: '#f9fafb',
            },
            td: {
              borderColor: '#4b5563',
            },
            img: {
              borderColor: '#4b5563',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
