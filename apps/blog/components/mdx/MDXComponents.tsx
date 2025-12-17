import * as React from 'react';
import Link from 'next/link';

// UI components from @blog/ui
import {
  Blockquote,
  CodeBlock,
  InlineCode,
  Figure,
  FigureImage,
  Callout,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@blog/ui';

// Content components
import { Note, Marginnote, Reference, References, WideBlock } from '../content';

/**
 * Props type for MDX HTML elements
 */
type HTMLProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

/**
 * MDX component type mapping
 */
type MDXComponentMap = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<any>
>;

/**
 * Custom MDX component mappings
 *
 * Maps standard HTML elements to styled components and
 * provides custom MDX components for enhanced content.
 */
export function getMDXComponents(): MDXComponentMap {
  return {
    // ===================
    // Standard HTML elements
    // ===================

    // Headings - use prose styles
    h1: ({ children, ...props }: HTMLProps) => (
      <h1
        className="text-heading-lg font-bold tracking-tight mt-12 mb-6 first:mt-0"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: HTMLProps) => (
      <h2
        className="text-heading-md font-semibold tracking-tight mt-10 mb-4"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: HTMLProps) => (
      <h3
        className="text-heading-sm font-semibold tracking-tight mt-8 mb-3"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: HTMLProps) => (
      <h4 className="text-body-lg font-semibold mt-6 mb-2" {...props}>
        {children}
      </h4>
    ),

    // Paragraphs
    p: ({ children, ...props }: HTMLProps) => (
      <p className="text-body leading-relaxed my-4" {...props}>
        {children}
      </p>
    ),

    // Links
    a: ({
      href,
      children,
      ...props
    }: HTMLProps & { href?: string }) => {
      const isExternal = href?.startsWith('http');
      if (isExternal) {
        return (
          <a
            href={href}
            className="text-link hover:text-link-hover transition-colors underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href || '#'}
          className="text-link hover:text-link-hover transition-colors underline underline-offset-2"
          {...props}
        >
          {children}
        </Link>
      );
    },

    // Lists
    ul: ({ children, ...props }: HTMLProps) => (
      <ul
        className="my-4 ml-6 list-disc space-y-2 text-body [&>li]:pl-2"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: HTMLProps) => (
      <ol
        className="my-4 ml-6 list-decimal space-y-2 text-body [&>li]:pl-2"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }: HTMLProps) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),

    // Blockquote - use UI component
    blockquote: ({ children, ...props }: HTMLProps) => (
      <Blockquote className="my-6" {...props}>
        {children}
      </Blockquote>
    ),

    // Code - inline and block
    code: ({
      children,
      className,
      ...props
    }: HTMLProps & { className?: string }) => {
      // Check if this is a code block (has language class) or inline code
      const isCodeBlock = className?.startsWith('language-');
      if (isCodeBlock) {
        const language = className?.replace('language-', '') || 'text';
        return (
          <CodeBlock language={language} {...props}>
            {String(children).trim()}
          </CodeBlock>
        );
      }
      return <InlineCode {...props}>{children}</InlineCode>;
    },

    // Pre - wrapper for code blocks
    pre: ({ children }: HTMLProps) => {
      // The code element inside will handle the actual rendering
      return <div className="my-6">{children}</div>;
    },

    // Horizontal rule
    hr: (props: HTMLProps) => (
      <hr className="my-8 border-border" {...props} />
    ),

    // Strong and emphasis
    strong: ({ children, ...props }: HTMLProps) => (
      <strong className="font-semibold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: HTMLProps) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),

    // Images - use Next.js Image or Figure
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      if (!src) return null;
      return (
        <Figure caption={alt} className="my-6">
          <FigureImage src={src} alt={alt || ''} />
        </Figure>
      );
    },

    // Tables
    table: ({ children, ...props }: HTMLProps) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-body-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: HTMLProps) => (
      <thead className="border-b-2 border-border" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: HTMLProps) => (
      <tbody {...props}>{children}</tbody>
    ),
    tr: ({ children, ...props }: HTMLProps) => (
      <tr className="border-b border-border-subtle" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: HTMLProps) => (
      <th
        className="py-3 px-4 text-left font-semibold text-figure-primary"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: HTMLProps) => (
      <td className="py-3 px-4 text-figure-secondary" {...props}>
        {children}
      </td>
    ),

    // ===================
    // Custom MDX components
    // ===================

    // Sidenotes
    Note,
    Marginnote,

    // Citations
    Reference,
    References,

    // Layout
    WideBlock,

    // UI components exposed to MDX
    Callout,
    Badge,
    Figure,
    FigureImage,

    // Tabs
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,

    // Accordion
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  };
}

/**
 * Default MDX components export
 */
export const mdxComponents = getMDXComponents();
