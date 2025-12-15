# Playwright Tests

Visual and functional tests for Feitong's Blog Design System.

## Directory Structure

```
tests/
├── foundations/      # Design token tests (theme-agnostic)
│   ├── spacing.spec.ts
│   ├── motion.spec.ts
│   ├── typography.spec.ts  (future)
│   └── color.spec.ts       (future)
├── components/       # Component behavior tests
│   └── button.spec.ts      (future)
├── themes/           # Theme-specific visual regression tests
│   └── nyt/
│       └── visual.spec.ts  (future)
└── utils/            # Shared test utilities
    ├── index.ts
    └── storybook.ts
```

## Test Categories

### Foundations Tests (`tests/foundations/`)

Design token verification tests that are **theme-agnostic**. These tests verify that spacing, motion, typography, and color tokens are correctly applied, regardless of which theme is active.

**When to add here:**

- Testing that CSS custom properties have correct values
- Testing that token scales increase progressively
- Testing that semantic tokens map correctly to primitives

### Component Tests (`tests/components/`)

Functional tests for individual components. These test component behavior, accessibility, and interactions.

**When to add here:**

- Testing component variants render correctly
- Testing keyboard navigation and focus management
- Testing ARIA attributes and accessibility

### Theme Tests (`tests/themes/{theme-name}/`)

Theme-specific visual regression tests. Each theme gets its own subdirectory.

**When to add here:**

- Visual screenshot comparisons for a specific theme
- Theme-specific color palette verification
- Brand-specific typography rendering

## Running Tests

```bash
# Run all tests
pnpm test:e2e

# Run specific project
npx playwright test --project=foundations
npx playwright test --project=components
npx playwright test --project=themes-nyt

# Run cross-browser tests
npx playwright test --project=webkit
npx playwright test --project=firefox

# Run with UI mode (debugging)
npx playwright test --ui

# Update snapshots
npx playwright test --update-snapshots
```

## Writing Tests

### Using Test Utilities

```typescript
import { test, expect } from "@playwright/test";
import {
  navigateToStory,
  getCSSVariables,
  getComputedStyleProperty,
  parsePixelValue,
} from "../utils";

test("example test", async ({ page }) => {
  // Navigate to a Storybook story
  const iframe = await navigateToStory(page, "foundations-spacing--stack");

  // Get CSS custom properties
  const vars = await getCSSVariables(iframe, [
    "--spacing-stack-sm",
    "--spacing-stack-md",
  ]);

  // Get computed style
  const gap = await getComputedStyleProperty(someLocator, "gap");
  const gapValue = parsePixelValue(gap);

  expect(gapValue).toBe(16);
});
```

### Adding a New Theme

1. Create directory: `tests/themes/{theme-name}/`
2. Add visual regression tests specific to that theme
3. Add project to `playwright.config.ts`:

```typescript
{
  name: 'themes-{theme-name}',
  testDir: './tests/themes/{theme-name}',
  use: { ...devices['Desktop Chrome'] },
},
```

### Test Naming Conventions

- Use descriptive test names that explain what is being verified
- Group related tests in `test.describe()` blocks
- Use consistent naming: `{feature}.spec.ts`

## CI Integration

Tests run automatically in CI. The configuration:

- Runs with a single worker for stability
- Retries failed tests twice
- Generates HTML report and artifacts
- Starts Storybook automatically via `webServer` config
