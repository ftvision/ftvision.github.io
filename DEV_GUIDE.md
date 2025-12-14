# Development Guide

## Prerequisites

- Node.js 18+
- pnpm 9+

```bash
# Install pnpm if not already installed
npm install -g pnpm
```

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Build tokens (required before other packages)
pnpm --filter @blog/tokens build

# 3. Start development servers
pnpm dev
```

## Initial Setup

### First Time Setup

```bash
# Clone and enter the project
cd sarajevo

# Install all workspace dependencies
pnpm install

# Build design tokens
pnpm --filter @blog/tokens build

# Verify token build succeeded
ls packages/tokens/build/
# Should show: css/ js/
```

### After Pulling Changes

```bash
# Install any new dependencies
pnpm install

# Rebuild tokens if token files changed
pnpm --filter @blog/tokens build
```

## Common Commands

### Development

```bash
# Start all dev servers (once apps are created)
pnpm dev

# Start specific package
pnpm --filter @blog/blog dev      # Blog app
pnpm --filter @blog/tokens build  # Rebuild tokens
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @blog/tokens build
pnpm --filter @blog/ui build
pnpm --filter @blog/blog build
```

### Cleaning

```bash
# Clean all build artifacts
pnpm clean

# Clean and reinstall
pnpm clean && pnpm install
```

### Linting & Formatting

```bash
# Lint all packages
pnpm lint

# Format all files
pnpm format
```

## Package Dependencies

```
@blog/blog (apps/blog)
├── @blog/ui
│   └── @blog/tokens
└── @blog/config

@blog/ui (packages/ui)
├── @blog/tokens
└── @blog/config

@blog/tokens (packages/tokens)
└── (no internal dependencies)

@blog/config (packages/config)
└── (no internal dependencies)
```

**Build Order**: tokens → ui → blog

## Adding Dependencies

```bash
# Add to root (dev tools)
pnpm add -D -w <package>

# Add to specific package
pnpm --filter @blog/ui add <package>
pnpm --filter @blog/blog add <package>

# Add workspace dependency
pnpm --filter @blog/ui add @blog/tokens@workspace:*
```

## Creating New Packages

### New UI Component

1. Create component file:
   ```
   packages/ui/src/components/NewComponent.tsx
   ```

2. Export from index:
   ```typescript
   // packages/ui/src/index.tsx
   export { NewComponent } from '@ui/components/NewComponent';
   ```

3. Add story (once Storybook is set up):
   ```
   apps/docs/stories/NewComponent.stories.tsx
   ```

### New Blog Component

1. Create component file:
   ```
   apps/blog/components/NewComponent.tsx
   ```

2. Import UI primitives:
   ```typescript
   import { Card, Badge } from '@blog/ui';
   ```

### New Design Token

1. Edit token JSON in `packages/tokens/src/`:
   ```json
   // packages/tokens/src/colors.json
   {
     "color": {
       "brand": {
         "primary": { "value": "#your-color" }
       }
     }
   }
   ```

2. Rebuild tokens:
   ```bash
   pnpm --filter @blog/tokens build
   ```

3. Use in CSS or components:
   ```css
   color: var(--color-brand-primary);
   ```

## Troubleshooting

### "Module not found" errors

```bash
# Rebuild tokens
pnpm --filter @blog/tokens build

# Clear turbo cache
rm -rf .turbo

# Reinstall dependencies
pnpm install
```

### TypeScript path alias errors

Ensure your `tsconfig.json` extends the correct base:

```json
{
  "extends": "@blog/config/tsconfig/react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@ui/*": ["src/*"]
    }
  }
}
```

### Styles not applying

1. Check Tailwind content paths include the UI package:
   ```javascript
   // tailwind.config.js
   content: [
     './src/**/*.{ts,tsx}',
     '../../packages/ui/src/**/*.{ts,tsx}'
   ]
   ```

2. Verify globals.css imports tokens before Tailwind:
   ```css
   @import '@blog/tokens/css';
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### pnpm install fails

```bash
# Clear pnpm cache
pnpm store prune

# Remove lockfile and reinstall
rm pnpm-lock.yaml
pnpm install
```

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript + JavaScript

Workspace settings (`.vscode/settings.json`):
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

## Environment Variables

Create `.env.local` in `apps/blog/` for local development:

```bash
# Example (none required yet)
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deployment

The blog deploys to GitHub Pages via static export:

```bash
# Build for production
pnpm build

# Static files are output to docs/
```

The `docs/` directory is served by GitHub Pages at `ftvision.github.io`.
