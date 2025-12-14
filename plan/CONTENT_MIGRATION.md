# Content Migration Guide

## Overview

This document provides detailed guidance for migrating content from Hugo markdown to Next.js MDX format.

---

## Content Inventory

### Blog Posts
| File | Language | Title | Notes |
|------|----------|-------|-------|
| `10k-code.md` | zh | 10000行代码后对软件工程的思考 | Has footnotes |
| `10k-cpp.md` | zh | C++相关 | |
| `job_search_reflection.en.md` | en | Job Search Reflection | |
| `meeting-how-to.md` | zh | 会议相关 | |
| `offer_negotiation.en.md` | en | Offer Negotiation | |
| `programmer_quality.md` | zh | 程序员素质 | |
| `programming_augmenting_intelligence.md` | zh | 编程增强智能 | |
| `reverse-interview.md` | zh | 反向面试 | |
| `short_pr.md` | zh | 短PR | |

### Collections
| File | Language | Title |
|------|----------|-------|
| `psych-writing.md` | zh | 心理学写作 |
| `system_design_interview.en.md` | en | System Design Interview |
| `vision-100.md` | zh | Vision 100 |
| `vision-100.en.md` | en | Vision 100 |

### Library (Paper Notes)
15+ paper review files, primarily in English.

### Digests
22 digest entries (`digest-001.md` through `digest-022.md`).

---

## Frontmatter Transformation

### Hugo Format (Current)
```yaml
---
title: 10000行代码后对软件工程的思考
date: 2019-02-01
categories:
- 软件开发
tags:
- C++
---
```

### MDX Format (Target)
```yaml
---
title: "10000行代码后对软件工程的思考"
date: "2019-02-01"
locale: "zh"
categories:
  - "软件开发"
tags:
  - "C++"
  - "software-engineering"
summary: "第一个10,000行代码的思考..."
---
```

### Key Changes
1. Add `locale` field (derive from filename or folder)
2. Add `summary` field (extract from first paragraph)
3. Quote all string values for consistency
4. Normalize tag naming (lowercase, hyphenated)

---

## Content Transformations

### Footnotes
Hugo/Markdown footnotes work in MDX:
```markdown
<!-- Input (works as-is) -->
这是一段文字[^1]

[^1]: 这是脚注内容
```

### Code Blocks
Standard fenced code blocks work:
```markdown
<!-- Input (works as-is) -->
```cpp
int main() {
    return 0;
}
```
```

### Images
Transform Hugo image references:
```markdown
<!-- Hugo Format -->
![Alt text](/images/post/image.png)

<!-- MDX Format -->
![Alt text](/images/post/image.png)
<!-- or with next/image -->
<Image src="/images/post/image.png" alt="Alt text" width={800} height={600} />
```

### Internal Links
Transform Hugo-style links:
```markdown
<!-- Hugo Format -->
[Link text]({{< ref "other-post.md" >}})

<!-- MDX Format -->
[Link text](/zh/blog/other-post)
```

### Hugo Shortcodes
Transform to MDX components:

```markdown
<!-- Hugo: info/warning boxes -->
{{< hint info >}}
This is info
{{< /hint >}}

<!-- MDX: Custom component -->
<Callout type="info">
This is info
</Callout>
```

```markdown
<!-- Hugo: tabs -->
{{< tabs "uniqueid" >}}
{{< tab "Tab1" >}}Content 1{{< /tab >}}
{{< tab "Tab2" >}}Content 2{{< /tab >}}
{{< /tabs >}}

<!-- MDX: Custom component -->
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab1</TabsTrigger>
    <TabsTrigger value="tab2">Tab2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

## File Organization

### Current Structure (Hugo)
```
content/
├── blog/
│   ├── _index.md
│   ├── _index.en.md
│   ├── 10k-code.md
│   └── job_search_reflection.en.md
├── collection/
│   ├── _index.md
│   └── vision-100.md
└── library/
    ├── _index.md
    └── Paper_Author_Year.en.md
```

### Target Structure (MDX)
```
apps/blog/content/
├── blog/
│   ├── zh/
│   │   ├── 10k-code.mdx
│   │   └── meeting-how-to.mdx
│   └── en/
│       └── job-search-reflection.mdx
├── collection/
│   ├── zh/
│   │   └── vision-100.mdx
│   └── en/
│       └── vision-100.mdx
└── library/
    └── en/
        └── paper-author-year.mdx
```

### Naming Conventions
- Use lowercase with hyphens: `job-search-reflection.mdx`
- Group by locale in subdirectories
- Remove `_index.md` files (handled by page components)

---

## Migration Script

### Automated Migration
```typescript
// scripts/migrate-content.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface MigrationResult {
  success: boolean;
  sourcePath: string;
  targetPath: string;
  errors: string[];
}

function migratePost(sourcePath: string, targetDir: string): MigrationResult {
  const result: MigrationResult = {
    success: true,
    sourcePath,
    targetPath: '',
    errors: [],
  };

  try {
    // Read source file
    const content = fs.readFileSync(sourcePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);

    // Determine locale
    const filename = path.basename(sourcePath);
    const locale = filename.includes('.en.') ? 'en' : 'zh';

    // Transform frontmatter
    const newFrontmatter = {
      title: frontmatter.title,
      date: frontmatter.date,
      locale,
      categories: frontmatter.categories || [],
      tags: frontmatter.tags || [],
      summary: extractSummary(body),
      draft: frontmatter.draft || false,
    };

    // Transform content
    const newBody = transformContent(body);

    // Generate new filename
    const slug = generateSlug(filename);
    const targetPath = path.join(targetDir, locale, `${slug}.mdx`);
    result.targetPath = targetPath;

    // Write new file
    const newContent = matter.stringify(newBody, newFrontmatter);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, newContent);

  } catch (error) {
    result.success = false;
    result.errors.push(error.message);
  }

  return result;
}

function extractSummary(content: string): string {
  // Extract first paragraph as summary
  const match = content.match(/^[^#\n].+/m);
  if (match) {
    return match[0].slice(0, 200).trim();
  }
  return '';
}

function transformContent(content: string): string {
  let result = content;

  // Transform Hugo shortcodes to MDX components
  result = transformShortcodes(result);

  // Transform internal links
  result = transformLinks(result);

  return result;
}

function transformShortcodes(content: string): string {
  // Transform hint shortcode to Callout
  content = content.replace(
    /\{\{<\s*hint\s+(info|warning|danger)\s*>\}\}([\s\S]*?)\{\{<\s*\/hint\s*>\}\}/g,
    '<Callout type="$1">$2</Callout>'
  );

  return content;
}

function transformLinks(content: string): string {
  // Transform Hugo ref links
  content = content.replace(
    /\{\{<\s*ref\s+"([^"]+)"\s*>\}\}/g,
    (_, ref) => {
      const slug = ref.replace('.md', '').replace('.en', '');
      return `/blog/${slug}`;
    }
  );

  return content;
}

function generateSlug(filename: string): string {
  return filename
    .replace('.en.md', '')
    .replace('.md', '')
    .replace(/_/g, '-')
    .toLowerCase();
}

// Run migration
const SOURCE_DIR = './content';
const TARGET_DIR = './apps/blog/content';

// Migrate blog posts
const blogDir = path.join(SOURCE_DIR, 'blog');
fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.md') && !f.startsWith('_'))
  .forEach(file => {
    const result = migratePost(
      path.join(blogDir, file),
      path.join(TARGET_DIR, 'blog')
    );
    console.log(result.success ? '✓' : '✗', file, result.targetPath);
    if (result.errors.length) console.log('  Errors:', result.errors);
  });
```

### Manual Review Checklist
After automated migration, manually review each file:

- [ ] Frontmatter is valid YAML
- [ ] Title displays correctly (especially quotes in Chinese)
- [ ] Date parses correctly
- [ ] Categories and tags migrated
- [ ] Code blocks render
- [ ] Internal links work
- [ ] Images display
- [ ] Footnotes work
- [ ] No broken MDX components

---

## Content-Specific Notes

### Blog Post: 10k-code.md
- Contains Chinese text with footnotes
- Has code examples (C++)
- References other posts

**Migration steps:**
1. Add `locale: "zh"` to frontmatter
2. Verify footnotes render
3. Test code highlighting

### Collection: vision-100.md
- Has both Chinese and English versions
- May have special formatting

**Migration steps:**
1. Create separate `zh/vision-100.mdx` and `en/vision-100.mdx`
2. Cross-link between language versions

### Library Posts
- Academic paper reviews
- May have citations, tables

**Migration steps:**
1. Preserve citation formatting
2. Consider adding `Citation` MDX component

### Digests
- 22 short entries
- Weekly summaries

**Migration decision:**
- **Option A**: Migrate all individually
- **Option B**: Consolidate into year-based archives
- **Option C**: Create single "digest archive" page with all entries

---

## Testing Migration

### Validation Script
```typescript
// scripts/validate-migration.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = './apps/blog/content';

function validateFile(filePath: string): string[] {
  const errors: string[] = [];
  const content = fs.readFileSync(filePath, 'utf-8');

  try {
    const { data } = matter(content);

    // Check required fields
    if (!data.title) errors.push('Missing title');
    if (!data.date) errors.push('Missing date');
    if (!data.locale) errors.push('Missing locale');

    // Check date format
    if (data.date && isNaN(Date.parse(data.date))) {
      errors.push(`Invalid date: ${data.date}`);
    }

    // Check locale value
    if (data.locale && !['zh', 'en'].includes(data.locale)) {
      errors.push(`Invalid locale: ${data.locale}`);
    }

  } catch (e) {
    errors.push(`Parse error: ${e.message}`);
  }

  return errors;
}

// Run validation
function walkDir(dir: string, callback: (file: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const filePath = path.join(dir, f);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath, callback);
    } else if (f.endsWith('.mdx')) {
      callback(filePath);
    }
  });
}

let hasErrors = false;
walkDir(CONTENT_DIR, (file) => {
  const errors = validateFile(file);
  if (errors.length) {
    hasErrors = true;
    console.log(`\n✗ ${file}`);
    errors.forEach(e => console.log(`  - ${e}`));
  } else {
    console.log(`✓ ${file}`);
  }
});

process.exit(hasErrors ? 1 : 0);
```

### Visual Comparison
1. Run old Hugo site and new Next.js site side by side
2. Compare each page visually
3. Check:
   - Layout matches (or improved)
   - Typography consistent
   - Code highlighting works
   - Links navigate correctly

---

## Rollback Plan

If migration fails or issues are found:

1. **Keep old content**: Don't delete `content/` until fully validated
2. **Git branches**: Work on migration in feature branch
3. **Parallel deployment**: Both sites can coexist during transition
4. **Quick revert**: `git checkout` to restore Hugo setup

---

## Post-Migration Tasks

1. **Set up redirects** (if URLs change)
2. **Update sitemap**
3. **Submit to search engines**
4. **Update any external links** (social profiles, etc.)
5. **Archive old Hugo config** or delete
