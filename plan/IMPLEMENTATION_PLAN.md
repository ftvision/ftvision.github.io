# Implementation Plan

## Overview

This document outlines the step-by-step implementation plan for rebuilding the blog with Next.js + MDX.

---

## Phase 1: Monorepo Foundation

### Objective
Set up the monorepo structure with Turborepo, pnpm, and basic configuration.

### Tasks

#### 1.1 Initialize Monorepo Root
- [ ] Create root `package.json` with workspace scripts
- [ ] Create `pnpm-workspace.yaml`
- [ ] Create `turbo.json` for build orchestration
- [ ] Update `.gitignore` for new structure

#### 1.2 Create Config Package
```
packages/config/
├── tsconfig/
│   ├── base.json
│   ├── react.json
│   └── nextjs.json
├── tailwind.config.js
├── package.json
└── README.md
```

#### 1.3 Create Tokens Package
```
packages/tokens/
├── src/
│   ├── colors.json
│   ├── spacing.json
│   ├── typography.json
│   └── shadows.json
├── style-dictionary.config.js
├── package.json
└── README.md
```

### Validation Checklist
- [ ] `pnpm install` succeeds
- [ ] `pnpm --filter @blog/tokens build` generates CSS/JS
- [ ] TypeScript configs extend correctly

---

## Phase 2: UI Package

### Objective
Create the component library with essential primitives.

### Tasks

#### 2.1 Package Setup
- [ ] Create `packages/ui/package.json` with dependencies
- [ ] Set up TypeScript configuration
- [ ] Configure Tailwind for the package
- [ ] Create `cn()` utility function

#### 2.2 Core Components
Create minimal set of components needed for the blog:

| Component | Priority | Description |
|-----------|----------|-------------|
| Button | High | Basic button with variants |
| Card | High | Content container |
| Badge | High | Category/tag labels |
| Input | Medium | Search input |
| Tabs | Medium | Tabbed content for code examples |
| ThemeProvider | High | Dark/light mode |

#### 2.3 Component Pattern
Each component follows CVA pattern:
```typescript
// Example: Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' }
  },
  defaultVariants: { variant: 'primary', size: 'md' }
});
```

### Validation Checklist
- [ ] All components export correctly
- [ ] TypeScript types are complete
- [ ] Components render with Tailwind styles

---

## Phase 3: Blog App Skeleton

### Objective
Create the Next.js 14 blog application with basic routing.

### Tasks

#### 3.1 Initialize Next.js App
```bash
cd apps
pnpm create next-app@latest blog --typescript --tailwind --app --src-dir
```

#### 3.2 Configure for Monorepo
- [ ] Update `next.config.js` with `transpilePackages`
- [ ] Configure Tailwind to include UI package paths
- [ ] Import token CSS in `globals.css`
- [ ] Set up static export configuration

#### 3.3 Create Basic Layouts
```
apps/blog/app/
├── layout.tsx          # Root layout
├── [locale]/
│   ├── layout.tsx      # Locale layout
│   └── page.tsx        # Home page
```

#### 3.4 Configure i18n
- [ ] Install and configure next-intl
- [ ] Create locale routing middleware
- [ ] Set up message files for zh/en

### Validation Checklist
- [ ] `pnpm --filter @blog/blog dev` starts on :3000
- [ ] Root layout renders
- [ ] Theme toggle works
- [ ] Locale switching works

---

## Phase 4: MDX Configuration

### Objective
Set up MDX for content authoring with custom components.

### Tasks

#### 4.1 Install MDX Dependencies
```bash
pnpm --filter @blog/blog add @next/mdx @mdx-js/loader @mdx-js/react
pnpm --filter @blog/blog add gray-matter
pnpm --filter @blog/blog add rehype-pretty-code shiki
pnpm --filter @blog/blog add remark-gfm
```

#### 4.2 Configure next.config.js
```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // ... other config
});
```

#### 4.3 Create MDX Components File
```typescript
// apps/blog/mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import { Callout, CodeBlock, Tabs } from '@/components/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    CodeBlock,
    Tabs,
    // Custom heading styles, etc.
  };
}
```

#### 4.4 Create Content Utilities
```typescript
// apps/blog/lib/content.ts
- getPostBySlug(slug, locale)
- getAllPosts(locale)
- getPostSlugs()
```

### Validation Checklist
- [ ] MDX files render correctly
- [ ] Custom components work in MDX
- [ ] Code highlighting works
- [ ] Frontmatter parsing works

---

## Phase 5: Content Pages

### Objective
Build out all content page types with proper layouts.

### Tasks

#### 5.1 Blog Section
- [ ] Create blog listing page (`/[locale]/blog/page.tsx`)
- [ ] Create blog post page (`/[locale]/blog/[slug]/page.tsx`)
- [ ] Implement PostCard component
- [ ] Implement PostList component
- [ ] Add pagination (if needed)

#### 5.2 Collection Section
- [ ] Create collection listing page
- [ ] Create collection detail page
- [ ] Implement CollectionCard component

#### 5.3 Library Section
- [ ] Create library listing page
- [ ] Create paper note page
- [ ] Implement PaperNote component

#### 5.4 About Section
- [ ] Create about page
- [ ] Create resume subpage
- [ ] Implement profile components

#### 5.5 Shared Components
- [ ] TableOfContents (auto-generated from headings)
- [ ] ReadingTime component
- [ ] ShareButtons component
- [ ] NavigationLinks (prev/next post)

### Validation Checklist
- [ ] All routes accessible
- [ ] Content renders correctly
- [ ] Navigation works
- [ ] Locale switching preserves route

---

## Phase 6: Content Migration

### Objective
Migrate existing Hugo content to MDX format.

### Tasks

#### 6.1 Create Migration Script
```typescript
// scripts/migrate-content.ts
- Read Hugo markdown files
- Parse frontmatter
- Transform to MDX format
- Handle footnotes
- Handle shortcodes
```

#### 6.2 Migrate Blog Posts
| Post | Status |
|------|--------|
| 10k-code.md | Pending |
| 10k-cpp.md | Pending |
| job_search_reflection.en.md | Pending |
| meeting-how-to.md | Pending |
| offer_negotiation.en.md | Pending |
| programmer_quality.md | Pending |
| programming_augmenting_intelligence.md | Pending |
| reverse-interview.md | Pending |
| short_pr.md | Pending |

#### 6.3 Migrate Collections
- [ ] psych-writing.md
- [ ] system_design_interview.en.md
- [ ] vision-100.md / vision-100.en.md

#### 6.4 Migrate Library
- [ ] All paper notes (15+ files)

#### 6.5 Migrate Digests
Decision: Keep or archive?
- Option A: Migrate all 22 digests
- Option B: Archive digests, keep only recent
- Option C: Create digest archive page without individual routes

### Validation Checklist
- [ ] All content renders correctly
- [ ] Links work
- [ ] Images display
- [ ] Code blocks highlight properly
- [ ] Footnotes work

---

## Phase 7: Features & Polish

### Objective
Add remaining features and polish the experience.

### Tasks

#### 7.1 Search
- [ ] Implement client-side search with Fuse.js
- [ ] Create search index at build time
- [ ] Add SearchDialog component
- [ ] Add keyboard shortcut (Cmd/Ctrl + K)

#### 7.2 RSS Feed
- [ ] Generate RSS at build time
- [ ] Add feed link to layout

#### 7.3 SEO
- [ ] Configure metadata for all pages
- [ ] Add Open Graph images
- [ ] Add structured data (JSON-LD)
- [ ] Create sitemap

#### 7.4 Performance
- [ ] Optimize images with next/image
- [ ] Add font optimization
- [ ] Verify Core Web Vitals

#### 7.5 Accessibility
- [ ] Test with screen reader
- [ ] Verify keyboard navigation
- [ ] Check color contrast

### Validation Checklist
- [ ] Search works
- [ ] RSS feed validates
- [ ] Lighthouse score > 90
- [ ] No accessibility errors

---

## Phase 8: Deployment

### Objective
Configure static export and deploy to GitHub Pages.

### Tasks

#### 8.1 Static Export Configuration
```javascript
// next.config.js
module.exports = {
  output: 'export',
  distDir: 'docs',
  images: { unoptimized: true }, // Required for static export
  trailingSlash: true,
};
```

#### 8.2 Build Script
```json
{
  "scripts": {
    "build": "next build",
    "export": "next build && touch docs/.nojekyll"
  }
}
```

#### 8.3 GitHub Pages Setup
- [ ] Ensure CNAME file is copied to output
- [ ] Add `.nojekyll` file
- [ ] Test deployment

#### 8.4 CI/CD (Optional)
- [ ] GitHub Actions workflow for auto-deploy
- [ ] Build validation on PRs

### Validation Checklist
- [ ] Static export succeeds
- [ ] All pages accessible
- [ ] CNAME preserved
- [ ] Site works on GitHub Pages

---

## Phase 9: Cleanup

### Objective
Remove old Hugo setup and finalize migration.

### Tasks

#### 9.1 Archive Old Content
- [ ] Move old `content/` to `content-archive/` or delete
- [ ] Remove Hugo `config.yml`
- [ ] Remove `archetypes/` directory

#### 9.2 Update Documentation
- [ ] Update root README.md
- [ ] Document content authoring workflow
- [ ] Document deployment process

#### 9.3 Final Verification
- [ ] All URLs match old structure (or set up redirects)
- [ ] No broken links
- [ ] Analytics working (if applicable)

---

## Timeline Estimates

| Phase | Complexity | Dependencies |
|-------|------------|--------------|
| Phase 1: Foundation | Low | None |
| Phase 2: UI Package | Medium | Phase 1 |
| Phase 3: Blog Skeleton | Medium | Phase 1, 2 |
| Phase 4: MDX Setup | Medium | Phase 3 |
| Phase 5: Content Pages | Medium | Phase 4 |
| Phase 6: Migration | High | Phase 5 |
| Phase 7: Features | Medium | Phase 6 |
| Phase 8: Deployment | Low | Phase 7 |
| Phase 9: Cleanup | Low | Phase 8 |

---

## Risk Mitigation

### Risk: Static Export Limitations
**Mitigation**: Use `output: 'export'` from start, avoid features requiring server.

### Risk: i18n Complexity
**Mitigation**: Start with simple file-based approach, add complexity as needed.

### Risk: Content Migration Errors
**Mitigation**: Run parallel sites during migration, verify each page.

### Risk: Breaking URLs
**Mitigation**: Map old URLs to new, set up redirects if needed.

---

## Success Criteria

1. **Functional Parity**: All existing content accessible
2. **Performance**: Lighthouse score > 90
3. **Interactivity**: MDX components work as expected
4. **Maintainability**: Clear component structure
5. **Developer Experience**: Fast local development
6. **Deployment**: Automated build to GitHub Pages
