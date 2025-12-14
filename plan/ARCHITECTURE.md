# Blog Redesign Architecture

## Overview

This document describes the architecture for rebuilding the personal blog from Hugo/PaperMod to a Next.js + MDX design system approach.

---

## Current State Analysis

### Existing Structure
```
sarajevo/
├── content/
│   ├── about/          # About pages (zh/en)
│   ├── blog/           # Blog posts (~10 posts)
│   ├── collection/     # Curated collections
│   ├── digest/         # Weekly digests (~22 entries)
│   ├── library/        # Paper notes/reviews
│   └── logging/        # Dev logs
├── docs/               # Built output (GitHub Pages)
├── archetypes/         # Hugo templates
├── config.yml          # Hugo configuration
└── themes/PaperMod/    # Hugo theme (external)
```

### Current Features
- Multi-language (Chinese primary, English secondary)
- PaperMod theme with dark/light mode
- Categories and tags
- Search (Fuse.js)
- Table of contents
- Reading time estimation

---

## Proposed Architecture

### 5-Layer Design System

```
Layer 5: Pages/Views        → apps/blog/app/
         Route handlers, full pages, layouts

Layer 4: App Components     → apps/blog/components/
         Blog-specific: PostCard, DigestList, PaperNote

Layer 3: Pattern Components → packages/ui/ (complex)
         Reusable patterns: Modal, Tabs, SearchDialog

Layer 2: Primitive Components → packages/ui/ (basic)
         Generic UI: Button, Card, Badge, Input

Layer 1: Design Tokens      → packages/tokens/
         Colors, spacing, typography, shadows
```

### Directory Structure

```
sarajevo/
├── packages/
│   ├── tokens/
│   │   ├── src/
│   │   │   ├── colors.json
│   │   │   ├── spacing.json
│   │   │   ├── typography.json
│   │   │   └── shadows.json
│   │   ├── build/              # Generated CSS/JS
│   │   ├── style-dictionary.config.js
│   │   └── package.json
│   │
│   ├── ui/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Tabs.tsx
│   │   │   │   └── ...
│   │   │   ├── lib/
│   │   │   │   └── utils.ts    # cn() utility
│   │   │   └── index.tsx
│   │   ├── package.json
│   │   └── tailwind.config.js
│   │
│   └── config/
│       ├── tsconfig/
│       │   ├── base.json
│       │   ├── react.json
│       │   └── nextjs.json
│       ├── tailwind.config.js
│       └── package.json
│
├── apps/
│   └── blog/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── globals.css
│       │   ├── [locale]/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   ├── blog/
│       │   │   │   ├── page.tsx
│       │   │   │   └── [slug]/page.tsx
│       │   │   ├── collection/
│       │   │   ├── library/
│       │   │   └── about/
│       │   └── ...
│       ├── components/
│       │   ├── PostCard.tsx
│       │   ├── PostList.tsx
│       │   ├── DigestEntry.tsx
│       │   ├── PaperNote.tsx
│       │   ├── TableOfContents.tsx
│       │   ├── LanguageSwitcher.tsx
│       │   └── ThemeToggle.tsx
│       ├── content/            # MDX content files
│       │   ├── blog/
│       │   │   └── zh/
│       │   │       └── 10k-code.mdx
│       │   ├── collection/
│       │   ├── library/
│       │   └── about/
│       ├── lib/
│       │   ├── mdx.ts          # MDX utilities
│       │   ├── content.ts      # Content fetching
│       │   └── i18n.ts         # Internationalization
│       ├── mdx-components.tsx  # Custom MDX components
│       ├── next.config.js
│       ├── tailwind.config.js
│       └── package.json
│
├── content/                    # Legacy Hugo content (reference)
├── docs/                       # Static export output
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── .gitignore
```

---

## Technology Stack

### Core
| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | Framework | 14.x (App Router) |
| React | UI Library | 18.x |
| TypeScript | Type Safety | 5.x |
| Tailwind CSS | Styling | 3.x |

### Monorepo
| Technology | Purpose |
|------------|---------|
| Turborepo | Build orchestration |
| pnpm | Package management |

### Content
| Technology | Purpose |
|------------|---------|
| MDX | Interactive markdown |
| @next/mdx | MDX integration |
| gray-matter | Frontmatter parsing |
| rehype-pretty-code | Code highlighting |
| remark-gfm | GitHub-flavored markdown |

### Design System
| Technology | Purpose |
|------------|---------|
| Style Dictionary | Token transformation |
| CVA | Component variants |
| clsx + tailwind-merge | Class utilities |

### i18n
| Technology | Purpose |
|------------|---------|
| next-intl | Internationalization |

---

## Path Aliases Configuration

All packages use absolute imports via TypeScript path aliases for cleaner imports.

### UI Package (`packages/ui/tsconfig.json`)
```json
{
  "extends": "@blog/config/tsconfig/react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@ui/*": ["src/*"]
    }
  },
  "include": ["src/**/*"]
}
```

### Blog App (`apps/blog/tsconfig.json`)
```json
{
  "extends": "@blog/config/tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/content/*": ["content/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Import Examples
```typescript
// In packages/ui/src/components/Card.tsx
import { cn } from '@ui/lib/utils';

// In apps/blog/components/PostCard.tsx
import { Card, Badge } from '@blog/ui';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/lib/content';
```

---

## Content Model

### Blog Post (MDX)
```mdx
---
title: "10000行代码后对软件工程的思考"
date: 2019-02-01
locale: zh
categories:
  - 软件开发
tags:
  - C++
  - software-engineering
summary: "第一个10,000行代码的思考..."
---

# Content here

<Callout type="info">
  Interactive component example
</Callout>
```

### Frontmatter Schema
```typescript
interface PostFrontmatter {
  title: string;
  date: string;
  locale: 'zh' | 'en';
  categories?: string[];
  tags?: string[];
  summary?: string;
  draft?: boolean;
}

interface CollectionFrontmatter {
  title: string;
  description: string;
  locale: 'zh' | 'en';
}

interface LibraryFrontmatter {
  title: string;
  authors: string[];
  year: number;
  venue?: string;
  locale: 'zh' | 'en';
  tags?: string[];
}
```

---

## Routing Structure

### URL Patterns
```
/                           → Home (redirects to /zh)
/zh                         → Chinese home
/en                         → English home
/zh/blog                    → Chinese blog listing
/zh/blog/10k-code           → Chinese blog post
/en/blog                    → English blog listing
/zh/collection              → Collections
/zh/library                 → Paper notes
/zh/about                   → About page
```

### File-based Routing
```
apps/blog/app/
├── [locale]/
│   ├── layout.tsx          → Locale layout with i18n provider
│   ├── page.tsx            → Home page
│   ├── blog/
│   │   ├── page.tsx        → Blog listing
│   │   └── [slug]/
│   │       └── page.tsx    → Individual post
│   ├── collection/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── library/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── about/
│       └── page.tsx
└── layout.tsx              → Root layout
```

---

## Component Architecture

### UI Package Components (Layer 2)

```typescript
// packages/ui/src/index.tsx
// Primitive components - no business logic
// Uses absolute imports via path alias (@ui/*)
export { Button } from '@ui/components/Button';
export { Card } from '@ui/components/Card';
export { Badge } from '@ui/components/Badge';
export { Input } from '@ui/components/Input';
export { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/components/Tabs';
export { ThemeProvider, useTheme } from '@ui/components/ThemeProvider';
export { cn } from '@ui/lib/utils';
```

### Blog App Components (Layer 4)

```typescript
// apps/blog/components/index.ts
// Blog-specific components with business logic
// Uses absolute imports via path alias (@/*)
export { PostCard } from '@/components/PostCard';        // Uses Card, Badge
export { PostList } from '@/components/PostList';        // Uses PostCard
export { TableOfContents } from '@/components/TableOfContents';
export { LanguageSwitcher } from '@/components/LanguageSwitcher';
export { SearchDialog } from '@/components/SearchDialog'; // Uses Input, Card
export { ThemeToggle } from '@/components/ThemeToggle';  // Uses Button
```

### MDX Components

```typescript
// Custom components available in MDX
const mdxComponents = {
  // Override default elements
  h1: (props) => <h1 className="..." {...props} />,
  h2: (props) => <h2 className="..." {...props} />,
  pre: (props) => <CodeBlock {...props} />,

  // Custom components
  Callout: CalloutComponent,
  Tabs: TabsComponent,
  CodeBlock: CodeBlockComponent,
  Citation: CitationComponent,
  Diagram: DiagramComponent,
};
```

---

## Design Tokens

### Color Palette (Minimal Starter)
```json
{
  "color": {
    "gray": {
      "50": { "value": "#fafafa" },
      "100": { "value": "#f4f4f5" },
      "200": { "value": "#e4e4e7" },
      "300": { "value": "#d4d4d8" },
      "400": { "value": "#a1a1aa" },
      "500": { "value": "#71717a" },
      "600": { "value": "#52525b" },
      "700": { "value": "#3f3f46" },
      "800": { "value": "#27272a" },
      "900": { "value": "#18181b" }
    },
    "accent": {
      "primary": { "value": "#3b82f6" },
      "secondary": { "value": "#8b5cf6" }
    }
  }
}
```

### Typography
```json
{
  "font": {
    "family": {
      "sans": { "value": "system-ui, -apple-system, sans-serif" },
      "serif": { "value": "Georgia, serif" },
      "mono": { "value": "ui-monospace, monospace" }
    },
    "size": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "1.875rem" }
    }
  }
}
```

---

## Build & Deployment

### Build Pipeline
```
1. pnpm install
2. pnpm --filter @blog/tokens build    → Generate CSS/JS tokens
3. pnpm --filter @blog/blog build      → Build Next.js app
4. next export                          → Static HTML to docs/
```

### GitHub Pages Deployment
- Output directory: `docs/`
- CNAME file preserved
- Static export with `output: 'export'` in next.config.js

### Turborepo Configuration
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "out/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## Performance Considerations

### Static Generation
- All pages statically generated at build time
- MDX compiled to optimized JavaScript
- Images optimized with next/image

### Bundle Optimization
- Only import components actually used
- Code splitting per route
- Tailwind CSS purging

### Caching
- Turborepo caching for faster rebuilds
- Browser caching for static assets

---

## Migration Path

### Phase 1: Preserve
- Keep existing `docs/` output working
- Hugo site remains functional during development

### Phase 2: Parallel Development
- New Next.js app in `apps/blog/`
- Content migrated to `apps/blog/content/`

### Phase 3: Switch
- Update build script to use Next.js export
- Verify all URLs work
- Remove Hugo configuration

### Phase 4: Cleanup
- Archive old Hugo content
- Remove theme dependencies
- Update documentation

---

## Future Extensibility

### Potential Additions
- **RSS Feed**: Generate at build time
- **Search**: Client-side with Fuse.js or Algolia
- **Comments**: Giscus (GitHub Discussions)
- **Analytics**: Plausible or simple-analytics
- **Newsletter**: Integration with email service

### New Content Types
- Interactive tutorials
- Code playgrounds
- Data visualizations
- Timeline/changelog

---

## Decision Log

| Decision | Rationale |
|----------|-----------|
| Next.js over Astro | Better React ecosystem, MDX support, familiar to author |
| App Router over Pages | Latest patterns, better layouts, server components |
| MDX over plain Markdown | Interactive components, custom styling |
| Monorepo structure | Reusable design system, clear separation |
| Static export | Simple hosting, GitHub Pages compatible |
| next-intl over next-i18n-routing | Better App Router support, simpler API |

---

## References

- [Next.js App Router](https://nextjs.org/docs/app)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [next-intl](https://next-intl-docs.vercel.app/)
