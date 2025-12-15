# Blog App Structure

Detailed file structure and code patterns for `apps/blog/`.

---

## Directory Structure

```
apps/blog/
├── app/                        # Layer 5: Pages
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home
│   ├── globals.css             # Token imports
│   ├── essays/
│   │   ├── page.tsx            # Essay index
│   │   └── [slug]/
│   │       └── page.tsx        # Essay page
│   └── about/
│       └── page.tsx            # About page
│
├── components/                 # Layer 4: App Components
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SiteNav.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── MobileMenu.tsx
│   │   └── index.ts
│   │
│   ├── essay/
│   │   ├── EssayCard.tsx
│   │   ├── EssayList.tsx
│   │   ├── EssayHeader.tsx
│   │   ├── EssayFilters.tsx
│   │   ├── EssayLayout.tsx
│   │   └── index.ts
│   │
│   ├── content/
│   │   ├── Note.tsx
│   │   ├── NoteContext.tsx
│   │   ├── Marginnote.tsx
│   │   ├── Reference.tsx
│   │   ├── ReferenceContext.tsx
│   │   ├── References.tsx
│   │   ├── WideBlock.tsx
│   │   └── index.ts
│   │
│   ├── about/
│   │   ├── NowSection.tsx
│   │   ├── Timeline.tsx
│   │   ├── ResumeSection.tsx
│   │   └── index.ts
│   │
│   └── mdx/
│       └── MDXComponents.tsx
│
├── lib/
│   ├── essays.ts               # Content fetching
│   ├── mdx.ts                  # MDX processing
│   ├── theme.ts                # Theme utilities
│   └── references.ts           # Reference parsing
│
├── types/
│   └── content.ts              # TypeScript types
│
├── content/
│   └── essays/                 # MDX files
│
├── public/
│   └── images/
│
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## TypeScript Types

```typescript
// types/content.ts

export type EssayType = 'guide' | 'deep-dive' | 'opinion' | 'review' | 'narrative';

export type Topic = 'technical' | 'ai' | 'product' | 'career';

export type Language = 'en' | 'zh';

export interface EssayMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: EssayType;
  topics: Topic[];
  lang: Language;
  draft?: boolean;
  readingTime?: number;  // calculated
}

export interface Essay extends EssayMeta {
  content: React.ReactNode;  // compiled MDX
}
```

---

## Frontmatter Schema

```yaml
---
title: string (required)
description: string (required)
date: YYYY-MM-DD (required)
type: guide | deep-dive | opinion | review | narrative (required)
topics: [technical, ai, product, career] (required, array)
lang: en | zh (required)
draft: boolean (optional, default false)
---
```

---

## Content Fetching

```typescript
// lib/essays.ts

// Get all essays (for index page)
export async function getAllEssays(): Promise<EssayMeta[]>

// Get single essay with content (for essay page)
export async function getEssayBySlug(slug: string): Promise<Essay | null>

// Get all slugs (for static generation)
export async function getEssaySlugs(): Promise<string[]>
```

---

## MDX Component Mapping

```typescript
// components/mdx/MDXComponents.tsx

import {
  Blockquote,
  Figure,
  FigureImage,
  CodeBlock,
  InlineCode,
  Callout,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@blog/ui';

import { Note, Marginnote, Reference, References, WideBlock } from '../content';

export const mdxComponents = {
  // HTML element overrides
  blockquote: Blockquote,
  pre: CodeBlock,
  code: InlineCode,

  // From @blog/ui (Layer 2-3)
  Figure,
  FigureImage,
  Callout,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,

  // Blog-specific (Layer 4)
  Note,
  Marginnote,
  Reference,
  References,
  WideBlock,
};
```

---

## Theme Integration

```typescript
// app/layout.tsx
<html data-theme="nyt" data-mode="light">
  <body className="bg-ground-primary text-figure-primary">
    {children}
  </body>
</html>
```

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.tsx',
    './components/**/*.tsx',
    '../../packages/ui/src/**/*.tsx',
  ],
  presets: [require('@blog/config/tailwind.config')],
};
```

---

## Dependencies

```json
{
  "dependencies": {
    "@blog/tokens": "workspace:*",
    "@blog/ui": "workspace:*",
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "reading-time": "^1.5.0"
  },
  "devDependencies": {
    "@blog/config": "workspace:*",
    "typescript": "^5.7.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0"
  }
}
```

---

## Component → @blog/ui Mapping

| App Component | Uses from @blog/ui |
|---------------|-------------------|
| `SiteHeader` | Button, Dropdown |
| `SiteFooter` | Separator |
| `SiteNav` | Button |
| `ThemeToggle` | Button, Tooltip |
| `MobileMenu` | Modal or Dropdown, Button |
| `EssayCard` | Card, Badge |
| `EssayHeader` | Badge, Byline |
| `EssayFilters` | Button, Badge |
| `Note` | Tooltip (mobile fallback) |
| `NowSection` | Card |
| `ResumeSection` | Accordion |
