# Developer Guide

This guide is for **app developers** building pages, features, and app-level components for the blog.

## Quick Start

### 1. Find the Right Component

Before building something new, check if it already exists:

| Need | Look In | Example |
|------|---------|---------|
| Basic UI (buttons, cards) | `@blog/ui` | `import { Button, Card } from '@blog/ui'` |
| Blog-specific UI | `apps/blog/components/` | `import { EssayCard } from '@/components/essay'` |
| Page templates | `apps/blog/components/pages/` | `import { HomePage } from '@/components/pages'` |

### 2. Use the Right Typography

**Always use `type-*` classes for headings:**

```tsx
// Correct - complete typography preset
<h1 className="type-display text-figure-primary">Title</h1>
<h2 className="type-h2 text-figure-primary">Section</h2>
<p className="type-body text-figure-primary">Body text</p>

// Incorrect - missing font weight
<h1 className="text-display font-serif">Title</h1>
```

**Typography Scale Reference:**

| Class | Use For | Size | Weight |
|-------|---------|------|--------|
| `type-display` | Hero titles, feature headlines | 3.052rem | 700 |
| `type-h1` | Page titles, article headlines | 2.441rem | 700 |
| `type-h2` | Section headers | 1.953rem | 600 |
| `type-h3` | Subsection headers | 1.563rem | 600 |
| `type-h4` | Minor headers | 1.25rem | 500 |
| `type-body` | Main content | 1rem | 400 |
| `type-body-sm` | Secondary content | 0.875rem | 400 |
| `type-caption` | Captions, footnotes | 0.8rem | 400 |
| `type-label` | UI labels, buttons | 0.8rem | 500 |
| `type-overline` | Category tags (uppercase) | 0.8rem | 600 |

### 3. Use the Right Colors

**Ground/Figure Naming:**

```tsx
// Backgrounds (ground = what things sit ON)
<div className="bg-ground-primary">     // Main background
<div className="bg-ground-secondary">   // Card/section backgrounds
<div className="bg-ground-tertiary">    // Nested backgrounds

// Text (figure = what you SEE)
<p className="text-figure-primary">     // Main text
<p className="text-figure-secondary">   // Supporting text
<p className="text-figure-muted">       // De-emphasized text
```

---

## Building a New Page

### Step 1: Create the Page Component

Create a page component in `apps/blog/components/pages/`:

```tsx
// apps/blog/components/pages/MyNewPage.tsx
import { Button } from '@blog/ui';
import { useLanguage } from '@/lib/i18n';

interface MyNewPageProps {
  language: 'en' | 'zh';
}

export function MyNewPage({ language }: MyNewPageProps) {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="type-display text-figure-primary mb-8">
        {t('myPage.title')}
      </h1>
      {/* Content */}
    </div>
  );
}
```

### Step 2: Create the Route

Create the Next.js route in `apps/blog/app/`:

```tsx
// apps/blog/app/my-page/page.tsx
import { MyNewPage } from '@/components/pages';

export const metadata = {
  title: 'My Page | Blog',
  description: 'Description of my page',
};

export default function Page() {
  return <MyNewPage language="en" />;
}
```

### Step 3: Add i18n Route (if needed)

```tsx
// apps/blog/app/zh/my-page/page.tsx
import { MyNewPage } from '@/components/pages';

export const metadata = {
  title: '我的页面 | 博客',
  description: '我的页面描述',
};

export default function Page() {
  return <MyNewPage language="zh" />;
}
```

---

## Building a New Component

### Step 1: Determine the Layer

| Component Type | Layer | Location |
|---------------|-------|----------|
| Reusable across any app | 2-3 | `packages/ui/` (consult architects) |
| Blog-specific | 4 | `apps/blog/components/` |

### Step 2: Create the Component

```tsx
// apps/blog/components/feature/MyComponent.tsx
import { Card, Badge } from '@blog/ui';
import { cn } from '@/lib/utils';

export interface MyComponentProps {
  title: string;
  tags: string[];
  className?: string;
}

export function MyComponent({ title, tags, className }: MyComponentProps) {
  return (
    <Card className={cn('p-4', className)}>
      <h3 className="type-h3 text-figure-primary mb-2">{title}</h3>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" size="sm">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
```

### Step 3: Create a Story (optional but recommended)

```tsx
// apps/blog/components/feature/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';
import { ThemeProvider } from '../layout/ThemeProvider';
import { LanguageProvider } from '@/lib/i18n';

const meta: Meta<typeof MyComponent> = {
  title: 'Blog / Feature / MyComponent',
  component: MyComponent,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider initialLanguage="en">
          <Story />
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    title: 'Example Title',
    tags: ['tag1', 'tag2'],
  },
};
```

---

## Working with i18n

### Using Translations

```tsx
import { useLanguage } from '@/lib/i18n';

function MyComponent() {
  const { t, formatDate, language } = useLanguage();

  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.greeting', { name: 'User' })}</p>
      <time>{formatDate('2024-01-15')}</time>
    </div>
  );
}
```

### Adding Translations

Edit the locale files:

```json
// apps/blog/lib/i18n/locales/en.json
{
  "myPage": {
    "title": "My Page Title",
    "description": "Page description"
  }
}

// apps/blog/lib/i18n/locales/zh.json
{
  "myPage": {
    "title": "我的页面标题",
    "description": "页面描述"
  }
}
```

---

## Working with Content

### Loading Essays

```tsx
import { getEssays, getEssayBySlug } from '@/lib/essays';

// Get all essays for a language
const essays = await getEssays('en');

// Get single essay
const essay = await getEssayBySlug('my-essay-slug', 'en');
```

### Loading Periodics

```tsx
import { getPeriodics, getPeriodicBySlug } from '@/lib/periodics';

const periodics = await getPeriodics('en');
const periodic = await getPeriodicBySlug('issue-1', 'en');
```

### Loading References

```tsx
import { getReferences, getReferenceBySlug } from '@/lib/references';

const references = await getReferences('en');
const reference = await getReferenceBySlug('my-reference', 'en');
```

---

## Common Patterns

### Card with Link

```tsx
import Link from 'next/link';
import { Card, CardHeader, CardContent, Badge } from '@blog/ui';

<Link href={`/essays/${slug}`} className="block">
  <Card className="hover:bg-ground-secondary transition-colors">
    <CardHeader>
      <Badge variant="primary" size="sm">{type}</Badge>
    </CardHeader>
    <CardContent>
      <h3 className="type-h3 text-figure-primary">{title}</h3>
      <p className="type-body-sm text-figure-secondary">{description}</p>
    </CardContent>
  </Card>
</Link>
```

### Filter Bar

```tsx
import { Button, Badge } from '@blog/ui';

<div className="flex flex-wrap gap-2">
  {topics.map((topic) => (
    <Button
      key={topic}
      variant={selected === topic ? 'primary' : 'ghost'}
      size="sm"
      onClick={() => setSelected(topic)}
    >
      {topic}
    </Button>
  ))}
</div>
```

### Responsive Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <ItemCard key={item.id} {...item} />
  ))}
</div>
```

---

## Testing Your Components

### Run Storybook

```bash
pnpm --filter @blog/storybook dev
```

Then visit http://localhost:6006

### Run Playwright Tests

```bash
# Run all blog tests
npx playwright test --project=blog

# Run specific test file
npx playwright test tests/blog/my-component.spec.ts
```

---

## Checklist for New Components

- [ ] Uses `type-*` classes for typography (not `text-*` for headings)
- [ ] Uses `text-figure-*` for text colors
- [ ] Uses `bg-ground-*` for backgrounds
- [ ] Imports from `@blog/ui` for primitives
- [ ] Has TypeScript interface for props
- [ ] Has Storybook story with required decorators
- [ ] Supports i18n if displaying user-facing text
- [ ] Uses `cn()` utility for conditional classes

---

## Related Documentation

- [Design System](./DESIGN_SYSTEM.md) - Full architecture overview
- [Architect Guide](./ARCHITECT_GUIDE.md) - For modifying the design system
- [MDX Components](../MDX_COMPONENTS.md) - Components for content authors
