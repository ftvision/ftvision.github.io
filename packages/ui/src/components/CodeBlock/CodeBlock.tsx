'use client';

import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cn } from '@ui/lib/utils';

// Custom theme based on our design tokens
// Using 'as const' to make the literal types work with react-syntax-highlighter
const customTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: 'var(--color-text-primary)',
    background: 'none',
    fontFamily: 'var(--font-code)',
    fontSize: '0.875rem',
    lineHeight: '1.75',
    textAlign: 'left' as const,
    whiteSpace: 'pre' as const,
    wordSpacing: 'normal',
    wordBreak: 'normal' as const,
    wordWrap: 'normal' as const,
    tabSize: 2,
    hyphens: 'none' as const,
  },
  'pre[class*="language-"]': {
    color: 'var(--color-text-primary)',
    background: 'transparent',
    fontFamily: 'var(--font-code)',
    fontSize: '0.875rem',
    lineHeight: '1.75',
    textAlign: 'left' as const,
    whiteSpace: 'pre' as const,
    wordSpacing: 'normal',
    wordBreak: 'normal' as const,
    wordWrap: 'normal' as const,
    tabSize: 2,
    hyphens: 'none' as const,
    padding: 0,
    margin: 0,
    overflow: 'auto' as const,
  },
  comment: {
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
  },
  prolog: {
    color: 'var(--color-text-muted)',
  },
  doctype: {
    color: 'var(--color-text-muted)',
  },
  cdata: {
    color: 'var(--color-text-muted)',
  },
  punctuation: {
    color: 'var(--color-text-secondary)',
  },
  property: {
    color: 'var(--color-accent-primary)',
  },
  tag: {
    color: 'var(--color-accent-primary)',
  },
  boolean: {
    color: 'var(--color-accent-secondary)',
  },
  number: {
    color: 'var(--color-accent-secondary)',
  },
  constant: {
    color: 'var(--color-accent-secondary)',
  },
  symbol: {
    color: 'var(--color-accent-secondary)',
  },
  deleted: {
    color: 'var(--color-status-danger)',
  },
  selector: {
    color: 'var(--color-accent-primary)',
  },
  'attr-name': {
    color: 'var(--color-accent-primary)',
  },
  string: {
    color: 'var(--color-status-success)',
  },
  char: {
    color: 'var(--color-status-success)',
  },
  builtin: {
    color: 'var(--color-accent-secondary)',
  },
  inserted: {
    color: 'var(--color-status-success)',
  },
  operator: {
    color: 'var(--color-text-secondary)',
  },
  entity: {
    color: 'var(--color-text-secondary)',
    cursor: 'help',
  },
  url: {
    color: 'var(--color-link-default)',
  },
  '.language-css .token.string': {
    color: 'var(--color-status-success)',
  },
  '.style .token.string': {
    color: 'var(--color-status-success)',
  },
  variable: {
    color: 'var(--color-accent-primary)',
  },
  atrule: {
    color: 'var(--color-accent-secondary)',
  },
  'attr-value': {
    color: 'var(--color-status-success)',
  },
  function: {
    color: 'var(--color-accent-secondary)',
  },
  'class-name': {
    color: 'var(--color-accent-primary)',
  },
  keyword: {
    color: 'var(--color-accent-primary)',
    fontWeight: 500,
  },
  regex: {
    color: 'var(--color-status-warning)',
  },
  important: {
    color: 'var(--color-status-danger)',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
};

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Programming language for syntax highlighting */
  language?: string;
  /** Filename to display in header */
  filename?: string;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Starting line number */
  startLine?: number;
  /** Lines to highlight (array of line numbers) */
  highlightLines?: number[];
  /** Whether to show copy button */
  showCopy?: boolean;
  /** Code content as string */
  children: string;
}

// Language detection from filename extension
const detectLanguageFromFilename = (filename: string): string => {
  const extensionMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    py: 'python',
    rb: 'ruby',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cs: 'csharp',
    php: 'php',
    go: 'go',
    rs: 'rust',
    kt: 'kotlin',
    swift: 'swift',
    m: 'objectivec',
    r: 'r',
    sql: 'sql',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    yml: 'yaml',
    yaml: 'yaml',
    json: 'json',
    xml: 'xml',
    html: 'html',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    less: 'less',
    md: 'markdown',
    txt: 'text',
  };

  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? (extensionMap[extension] || 'text') : 'text';
};

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({
    className,
    language,
    filename,
    showLineNumbers = false,
    startLine = 1,
    highlightLines = [],
    showCopy = true,
    children,
    ...props
  }, ref) => {
    const [copied, setCopied] = React.useState(false);

    // Detect language from filename if not explicitly provided
    const detectedLanguage = React.useMemo(() => {
      if (language) return language;
      if (filename) return detectLanguageFromFilename(filename);
      return 'text';
    }, [language, filename]);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div
        ref={ref}
        className={cn('my-6 rounded-lg overflow-hidden border border-border bg-surface-code', className)}
        {...props}
      >
        {/* Header */}
        {(filename || language) && (
          <div className="flex items-center justify-between px-4 py-2 bg-ground-tertiary border-b border-border">
            <div className="flex items-center gap-2">
              {filename && (
                <span className="text-caption font-medium text-figure-primary">
                  {filename}
                </span>
              )}
              {language && !filename && (
                <span className="text-caption text-figure-muted uppercase">
                  {language}
                </span>
              )}
            </div>
            {showCopy && (
              <button
                onClick={handleCopy}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded text-caption',
                  'transition-colors duration-fast',
                  'text-figure-muted hover:text-figure-primary hover:bg-ground-secondary',
                  'focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2'
                )}
                aria-label={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? (
                  <>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Code content */}
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={detectedLanguage}
            style={customTheme}
            showLineNumbers={showLineNumbers}
            startingLineNumber={startLine}
            wrapLines={true}
            lineProps={(lineNumber) => {
              const isHighlighted = highlightLines.includes(lineNumber);
              return {
                style: {
                  backgroundColor: isHighlighted ? 'var(--color-surface-highlight)' : 'transparent',
                  display: 'block',
                },
              };
            }}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.75',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'var(--font-code)',
              },
            }}
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1em',
              color: 'var(--color-text-muted)',
              textAlign: 'right',
              userSelect: 'none',
              borderRight: '1px solid var(--color-border)',
              marginRight: '1em',
            }}
          >
            {children}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
);
CodeBlock.displayName = 'CodeBlock';

// Inline code component
export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {}

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        'px-1.5 py-0.5 rounded font-code text-body-sm',
        'bg-surface-code text-accent-primary',
        className
      )}
      {...props}
    />
  )
);
InlineCode.displayName = 'InlineCode';

export { CodeBlock, InlineCode };
