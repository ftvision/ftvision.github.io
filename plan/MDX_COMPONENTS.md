# MDX Component Specifications

## Overview

This document specifies the custom MDX components available for use in blog content. These components enable interactive and rich content experiences while maintaining consistency with the design system.

---

## Component Categories

### 1. Content Enhancement
- Callout
- Quote
- Definition

### 2. Code & Technical
- CodeBlock
- CodeGroup
- LiveCode (future)

### 3. Navigation & Structure
- Tabs
- Accordion
- TableOfContents

### 4. Media
- Image (enhanced)
- Video
- Diagram

### 5. Academic
- Citation
- Footnote
- Math (KaTeX)

---

## Component Specifications

### Callout

Highlighted message boxes for tips, warnings, and information.

**Props:**
```typescript
interface CalloutProps {
  type: 'info' | 'warning' | 'danger' | 'success' | 'note';
  title?: string;
  children: React.ReactNode;
}
```

**Usage:**
```mdx
<Callout type="info" title="Did you know?">
  This is an informational callout with helpful context.
</Callout>

<Callout type="warning">
  Be careful with this operation!
</Callout>

<Callout type="danger">
  This action is irreversible.
</Callout>
```

**Visual Design:**
| Type | Background | Border | Icon |
|------|------------|--------|------|
| info | blue-50 | blue-500 | ℹ️ |
| warning | amber-50 | amber-500 | ⚠️ |
| danger | red-50 | red-500 | 🚫 |
| success | green-50 | green-500 | ✅ |
| note | gray-50 | gray-500 | 📝 |

**Implementation:**
```typescript
// apps/blog/components/mdx/Callout.tsx
import { cn } from '@blog/ui';
import type { CalloutProps } from '@/components/mdx/types';

const calloutStyles = {
  info: 'bg-blue-50 border-blue-500 text-blue-900',
  warning: 'bg-amber-50 border-amber-500 text-amber-900',
  danger: 'bg-red-50 border-red-500 text-red-900',
  success: 'bg-green-50 border-green-500 text-green-900',
  note: 'bg-gray-50 border-gray-500 text-gray-900',
};

const icons = {
  info: 'ℹ️',
  warning: '⚠️',
  danger: '🚫',
  success: '✅',
  note: '📝',
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={cn('border-l-4 p-4 my-4 rounded-r', calloutStyles[type])}>
      <div className="flex items-start gap-2">
        <span className="text-xl">{icons[type]}</span>
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="prose-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
```

---

### CodeBlock

Enhanced code blocks with syntax highlighting, copy button, filename, and line highlighting.

**Props:**
```typescript
interface CodeBlockProps {
  language?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  children: string;
}
```

**Usage:**
```mdx
<CodeBlock language="typescript" filename="utils.ts" highlightLines={[2, 3]}>
{`function add(a: number, b: number): number {
  const sum = a + b;
  return sum;
}`}
</CodeBlock>
```

**Features:**
- Syntax highlighting via Shiki/rehype-pretty-code
- Copy to clipboard button
- Optional filename header
- Optional line numbers
- Line highlighting
- Dark/light theme support

**Note:** Most code blocks will use standard markdown fenced code blocks, which are automatically enhanced by rehype-pretty-code. The `<CodeBlock>` component is for advanced cases.

---

### CodeGroup

Group multiple code blocks (e.g., for different languages or before/after).

**Props:**
```typescript
interface CodeGroupProps {
  children: React.ReactNode;
}

interface CodeGroupItemProps {
  title: string;
  children: React.ReactNode;
}
```

**Usage:**
```mdx
<CodeGroup>
  <CodeGroupItem title="TypeScript">
    ```typescript
    const greeting: string = "Hello";
    ```
  </CodeGroupItem>
  <CodeGroupItem title="JavaScript">
    ```javascript
    const greeting = "Hello";
    ```
  </CodeGroupItem>
</CodeGroup>
```

---

### Tabs

Generic tabbed content container.

**Props:**
```typescript
interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}
```

**Usage:**
```mdx
<Tabs defaultValue="concept">
  <TabsList>
    <TabsTrigger value="concept">Concept</TabsTrigger>
    <TabsTrigger value="example">Example</TabsTrigger>
    <TabsTrigger value="exercise">Exercise</TabsTrigger>
  </TabsList>
  <TabsContent value="concept">
    The concept explanation goes here...
  </TabsContent>
  <TabsContent value="example">
    A practical example...
  </TabsContent>
  <TabsContent value="exercise">
    Try this yourself...
  </TabsContent>
</Tabs>
```

**Implementation:**
Use Radix UI Tabs primitive with custom styling.

---

### Accordion

Collapsible content sections.

**Props:**
```typescript
interface AccordionProps {
  type?: 'single' | 'multiple';
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
}
```

**Usage:**
```mdx
<Accordion type="single">
  <AccordionItem value="q1" title="What is MDX?">
    MDX is a format that lets you write JSX in your markdown documents.
  </AccordionItem>
  <AccordionItem value="q2" title="Why use MDX?">
    MDX enables interactive and reusable content components.
  </AccordionItem>
</Accordion>
```

---

### Image (Enhanced)

Enhanced image component with caption, zoom, and lazy loading.

**Props:**
```typescript
interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}
```

**Usage:**
```mdx
<Image
  src="/images/architecture-diagram.png"
  alt="System architecture diagram"
  caption="Figure 1: High-level system architecture"
  width={800}
  height={600}
/>
```

**Features:**
- Optimized loading via next/image
- Optional caption below image
- Click to zoom (using a modal)
- Responsive sizing

---

### Citation

Academic citation reference.

**Props:**
```typescript
interface CitationProps {
  id: string;
  authors: string;
  year: number;
  title: string;
  venue?: string;
  url?: string;
}
```

**Usage:**
```mdx
Recent research <Citation id="smith2023" authors="Smith et al." year={2023} title="Deep Learning Advances" venue="NeurIPS" /> shows that...

## References
<CitationList />
```

**Features:**
- Inline citation markers
- Auto-generated reference list
- Link to paper if URL provided

---

### Definition

Inline term definition with tooltip.

**Props:**
```typescript
interface DefinitionProps {
  term: string;
  children: React.ReactNode;
}
```

**Usage:**
```mdx
The <Definition term="API">Application Programming Interface</Definition> provides
a way for different software systems to communicate.
```

**Features:**
- Dotted underline on term
- Tooltip on hover with definition
- Works on mobile (tap to show)

---

### Math

Mathematical equations using KaTeX.

**Usage:**
```mdx
Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

**Implementation:**
Configure remark-math and rehype-katex in MDX pipeline:
```javascript
// next.config.js
const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
```

Add KaTeX CSS to globals.css:
```css
@import 'katex/dist/katex.min.css';
```

---

### Diagram

Embed diagrams using Mermaid or custom SVG.

**Props:**
```typescript
interface DiagramProps {
  type?: 'mermaid' | 'svg';
  caption?: string;
  children: string;
}
```

**Usage (Mermaid):**
```mdx
<Diagram type="mermaid" caption="User flow diagram">
{`
graph TD
    A[User visits] --> B{Logged in?}
    B -->|Yes| C[Dashboard]
    B -->|No| D[Login page]
`}
</Diagram>
```

**Usage (SVG):**
```mdx
<Diagram type="svg" caption="Custom diagram">
  <svg>...</svg>
</Diagram>
```

---

### Quote

Enhanced blockquote with attribution.

**Props:**
```typescript
interface QuoteProps {
  author?: string;
  source?: string;
  children: React.ReactNode;
}
```

**Usage:**
```mdx
<Quote author="Donald Knuth" source="The Art of Computer Programming">
  Premature optimization is the root of all evil.
</Quote>
```

---

## Typography Overrides

These components override default markdown elements:

### Headings

```typescript
// All headings get anchor links and custom styling
const components = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
      <a href={`#${props.id}`} className="anchor-link">
        {props.children}
      </a>
    </h1>
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props}>
      <a href={`#${props.id}`} className="anchor-link">
        {props.children}
      </a>
    </h2>
  ),
  // ...
};
```

### Links

```typescript
// External links get icon and open in new tab
const components = {
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:underline"
        {...props}
      >
        {children}
        {isExternal && <ExternalLinkIcon className="inline ml-1 w-3 h-3" />}
      </a>
    );
  },
};
```

### Code (Inline)

```typescript
const components = {
  code: ({ children, ...props }) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
};
```

### Tables

```typescript
const components = {
  table: (props) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b-2 border-gray-200 px-4 py-2 text-left font-semibold" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-gray-100 px-4 py-2" {...props} />
  ),
};
```

---

## MDX Component Registration

### mdx-components.tsx

```typescript
// apps/blog/mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import {
  Callout,
  CodeBlock,
  CodeGroup,
  CodeGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  Image,
  Citation,
  CitationList,
  Definition,
  Diagram,
  Quote,
} from '@/components/mdx';
import {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomLink,
  CustomInlineCode,
  CustomPre,
  CustomTable,
  CustomTh,
  CustomTd,
} from '@/components/mdx/typography';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components
    Callout,
    CodeBlock,
    CodeGroup,
    CodeGroupItem,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Accordion,
    AccordionItem,
    Image,
    Citation,
    CitationList,
    Definition,
    Diagram,
    Quote,

    // Typography overrides
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
    a: CustomLink,
    code: CustomInlineCode,
    pre: CustomPre,
    table: CustomTable,
    th: CustomTh,
    td: CustomTd,

    // Spread any additional components
    ...components,
  };
}
```

---

## Implementation Priority

### Phase 1: Essential (MVP)
1. **Callout** - Critical for tips/warnings
2. **CodeBlock** - Enhanced via rehype-pretty-code
3. **Image** - Enhanced images with captions
4. **Typography overrides** - Consistent styling

### Phase 2: Content Structure
5. **Tabs** - For multi-language examples
6. **Quote** - For citations
7. **Accordion** - For FAQs

### Phase 3: Academic Features
8. **Citation** - Paper references
9. **Math** - Equations
10. **Diagram** - Mermaid diagrams

### Phase 4: Advanced
11. **Definition** - Glossary terms
12. **CodeGroup** - Multi-file examples
13. **LiveCode** - Interactive code playground

---

## Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-tabs": "^1.0.0",
    "@radix-ui/react-accordion": "^1.0.0",
    "@radix-ui/react-tooltip": "^1.0.0",
    "mermaid": "^10.0.0",
    "katex": "^0.16.0"
  },
  "devDependencies": {
    "rehype-pretty-code": "^0.12.0",
    "rehype-katex": "^7.0.0",
    "remark-math": "^6.0.0",
    "remark-gfm": "^4.0.0",
    "shiki": "^1.0.0"
  }
}
```

---

## Example Blog Post with Components

```mdx
---
title: "Building a Design System"
date: "2024-01-15"
locale: "en"
tags: ["design-system", "react", "typescript"]
---

# Building a Design System

<Callout type="info">
  This post covers the fundamentals of building a design system from scratch.
</Callout>

## Why Design Systems Matter

<Quote author="Brad Frost" source="Atomic Design">
  Design systems are the core building blocks of modern web applications.
</Quote>

## Implementation

<Tabs defaultValue="typescript">
  <TabsList>
    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
  </TabsList>
  <TabsContent value="typescript">
    ```typescript
    interface ButtonProps {
      variant: 'primary' | 'secondary';
      children: React.ReactNode;
    }
    ```
  </TabsContent>
  <TabsContent value="javascript">
    ```javascript
    // Button component
    function Button({ variant, children }) {
      return <button className={variant}>{children}</button>;
    }
    ```
  </TabsContent>
</Tabs>

## Architecture

<Diagram type="mermaid" caption="Design system architecture">
{`
graph TB
    A[Tokens] --> B[Primitives]
    B --> C[Patterns]
    C --> D[App Components]
    D --> E[Pages]
`}
</Diagram>

## Key Takeaways

<Callout type="success" title="Summary">
  - Start with tokens
  - Build primitives
  - Compose patterns
  - Keep it simple
</Callout>
```
