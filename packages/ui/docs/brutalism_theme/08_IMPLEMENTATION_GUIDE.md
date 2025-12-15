# Brutalism Theme: Implementation Guide

> Step-by-step instructions for adding the brutalism theme to the design system.

## Overview

The theme system uses a three-layer architecture:
1. **Primitives** — Raw values (colors, fonts, radii) at `:root`
2. **Semantic** — Default semantic tokens at `:root`
3. **Themes** — Theme+mode overrides via `[data-theme][data-mode]` selectors

Adding a new theme requires:
1. Creating theme token files
2. Optionally adding new primitive colors
3. Rebuilding tokens
4. Updating Storybook for theme switching
5. (Optional) Blog app integration

---

## Step 1: Add Brutalist Primitive Colors

First, add pure brutalist colors to the primitive palette.

**File**: `packages/tokens/src/primitives/colors.json`

Add the following to `primitive.color`:

```json
{
  "primitive": {
    "color": {
      // ... existing colors ...

      "pure": {
        "black": { "value": "#000000" },
        "white": { "value": "#ffffff" },
        "red": { "value": "#ff0000" },
        "yellow": { "value": "#ffff00" },
        "cyan": { "value": "#00ffff" },
        "blue": { "value": "#0000ff" },
        "magenta": { "value": "#ff00ff" }
      },
      "brutalist": {
        "accent": { "value": "#ff0000" },
        "accent-dark": { "value": "#cc0000" },
        "accent-light": { "value": "#ff3333" }
      },
      "overlay": {
        // ... existing ...
        "black-80": { "value": "rgba(0, 0, 0, 0.8)" }
      }
    }
  }
}
```

---

## Step 2: Create Brutalism Theme Files

Create the theme directory and files:

```
packages/tokens/src/themes/brutalism/
├── light.json
└── dark.json
```

### Light Mode

**File**: `packages/tokens/src/themes/brutalism/light.json`

```json
{
  "color": {
    "bg": {
      "primary": { "value": "{primitive.color.pure.white}" },
      "secondary": { "value": "#f5f5f5" },
      "tertiary": { "value": "#e5e5e5" },
      "inverse": { "value": "{primitive.color.pure.black}" }
    },
    "text": {
      "primary": { "value": "{primitive.color.pure.black}" },
      "secondary": { "value": "#333333" },
      "muted": { "value": "#666666" },
      "inverse": { "value": "{primitive.color.pure.white}" }
    },
    "border": {
      "default": { "value": "{primitive.color.pure.black}" },
      "muted": { "value": "#cccccc" },
      "strong": { "value": "{primitive.color.pure.black}" }
    },
    "action": {
      "primary": { "value": "{primitive.color.pure.black}" },
      "primary-hover": { "value": "#333333" },
      "secondary": { "value": "transparent" },
      "secondary-hover": { "value": "#f5f5f5" }
    },
    "status": {
      "info": { "value": "{primitive.color.pure.blue}" },
      "info-bg": { "value": "#e6e6ff" },
      "success": { "value": "#008000" },
      "success-bg": { "value": "#e6ffe6" },
      "warning": { "value": "#cc8800" },
      "warning-bg": { "value": "#fff5e6" },
      "danger": { "value": "{primitive.color.pure.red}" },
      "danger-bg": { "value": "#ffe6e6" }
    },
    "accent": {
      "primary": { "value": "{primitive.color.brutalist.accent}" },
      "secondary": { "value": "{primitive.color.pure.black}" },
      "tertiary": { "value": "{primitive.color.pure.yellow}" }
    },
    "surface": {
      "code": { "value": "#f5f5f5" },
      "quote": { "value": "#f5f5f5" },
      "aside": { "value": "#e5e5e5" },
      "highlight": { "value": "{primitive.color.pure.yellow}" },
      "elevated": { "value": "{primitive.color.pure.white}" }
    },
    "link": {
      "default": { "value": "{primitive.color.brutalist.accent}" },
      "hover": { "value": "{primitive.color.brutalist.accent-dark}" },
      "visited": { "value": "#800080" },
      "active": { "value": "{primitive.color.brutalist.accent-dark}" }
    },
    "focus": {
      "ring": { "value": "{primitive.color.brutalist.accent}" },
      "ring-offset": { "value": "{primitive.color.pure.white}" }
    },
    "overlay": {
      "scrim": { "value": "{primitive.color.overlay.black-80}" },
      "light": { "value": "{primitive.color.overlay.white-70}" },
      "dark": { "value": "{primitive.color.overlay.black-50}" }
    },
    "data": {
      "1": { "value": "{primitive.color.pure.black}" },
      "2": { "value": "{primitive.color.brutalist.accent}" },
      "3": { "value": "{primitive.color.pure.blue}" },
      "4": { "value": "#008000" },
      "5": { "value": "{primitive.color.pure.yellow}" },
      "6": { "value": "{primitive.color.pure.cyan}" },
      "sequential-1": { "value": "#e5e5e5" },
      "sequential-2": { "value": "#b3b3b3" },
      "sequential-3": { "value": "#808080" },
      "sequential-4": { "value": "#4d4d4d" },
      "sequential-5": { "value": "{primitive.color.pure.black}" }
    }
  },
  "font": {
    "family": {
      "heading": { "value": "{primitive.font.family.mono}" },
      "body": { "value": "{primitive.font.family.mono}" },
      "code": { "value": "{primitive.font.family.mono}" }
    }
  },
  "radius": {
    "default": { "value": "{primitive.radius.none}" },
    "sm": { "value": "{primitive.radius.none}" },
    "lg": { "value": "{primitive.radius.none}" },
    "full": { "value": "{primitive.radius.none}" }
  },
  "border": {
    "width": {
      "default": { "value": "2px" },
      "thick": { "value": "4px" }
    }
  }
}
```

### Dark Mode

**File**: `packages/tokens/src/themes/brutalism/dark.json`

```json
{
  "color": {
    "bg": {
      "primary": { "value": "{primitive.color.pure.black}" },
      "secondary": { "value": "#0a0a0a" },
      "tertiary": { "value": "#1a1a1a" },
      "inverse": { "value": "{primitive.color.pure.white}" }
    },
    "text": {
      "primary": { "value": "{primitive.color.pure.white}" },
      "secondary": { "value": "#cccccc" },
      "muted": { "value": "#999999" },
      "inverse": { "value": "{primitive.color.pure.black}" }
    },
    "border": {
      "default": { "value": "{primitive.color.pure.white}" },
      "muted": { "value": "#333333" },
      "strong": { "value": "{primitive.color.pure.white}" }
    },
    "action": {
      "primary": { "value": "{primitive.color.pure.white}" },
      "primary-hover": { "value": "#e5e5e5" },
      "secondary": { "value": "transparent" },
      "secondary-hover": { "value": "#1a1a1a" }
    },
    "status": {
      "info": { "value": "#66b2ff" },
      "info-bg": { "value": "#001a33" },
      "success": { "value": "#66ff66" },
      "success-bg": { "value": "#003300" },
      "warning": { "value": "#ffcc00" },
      "warning-bg": { "value": "#332600" },
      "danger": { "value": "#ff6666" },
      "danger-bg": { "value": "#330000" }
    },
    "accent": {
      "primary": { "value": "{primitive.color.brutalist.accent}" },
      "secondary": { "value": "{primitive.color.pure.white}" },
      "tertiary": { "value": "{primitive.color.pure.yellow}" }
    },
    "surface": {
      "code": { "value": "#0a0a0a" },
      "quote": { "value": "#0a0a0a" },
      "aside": { "value": "#1a1a1a" },
      "highlight": { "value": "#666600" },
      "elevated": { "value": "#0a0a0a" }
    },
    "link": {
      "default": { "value": "{primitive.color.brutalist.accent}" },
      "hover": { "value": "{primitive.color.brutalist.accent-light}" },
      "visited": { "value": "#cc66cc" },
      "active": { "value": "{primitive.color.brutalist.accent-light}" }
    },
    "focus": {
      "ring": { "value": "{primitive.color.brutalist.accent}" },
      "ring-offset": { "value": "{primitive.color.pure.black}" }
    },
    "overlay": {
      "scrim": { "value": "{primitive.color.overlay.black-80}" },
      "light": { "value": "{primitive.color.overlay.white-50}" },
      "dark": { "value": "{primitive.color.overlay.black-50}" }
    },
    "data": {
      "1": { "value": "{primitive.color.pure.white}" },
      "2": { "value": "{primitive.color.brutalist.accent}" },
      "3": { "value": "#66b2ff" },
      "4": { "value": "#66ff66" },
      "5": { "value": "{primitive.color.pure.yellow}" },
      "6": { "value": "{primitive.color.pure.cyan}" },
      "sequential-1": { "value": "#1a1a1a" },
      "sequential-2": { "value": "#4d4d4d" },
      "sequential-3": { "value": "#808080" },
      "sequential-4": { "value": "#b3b3b3" },
      "sequential-5": { "value": "{primitive.color.pure.white}" }
    }
  },
  "font": {
    "family": {
      "heading": { "value": "{primitive.font.family.mono}" },
      "body": { "value": "{primitive.font.family.mono}" },
      "code": { "value": "{primitive.font.family.mono}" }
    }
  },
  "radius": {
    "default": { "value": "{primitive.radius.none}" },
    "sm": { "value": "{primitive.radius.none}" },
    "lg": { "value": "{primitive.radius.none}" },
    "full": { "value": "{primitive.radius.none}" }
  },
  "border": {
    "width": {
      "default": { "value": "2px" },
      "thick": { "value": "4px" }
    }
  }
}
```

---

## Step 3: Rebuild Tokens

Run the token build script:

```bash
cd packages/tokens
pnpm build
```

This will generate:
- `build/css/theme-brutalism-light.css`
- `build/css/theme-brutalism-dark.css`
- Updated `build/css/index.css` with imports

The build script automatically discovers themes in `src/themes/` directories.

---

## Step 4: Update Storybook

Add brutalism to the theme switcher in Storybook.

**File**: `apps/storybook/.storybook/preview.tsx`

Change line 32 from:
```typescript
items: ['nyt'],
```

To:
```typescript
items: ['nyt', 'brutalism'],
```

**Full context:**
```typescript
globalTypes: {
  theme: {
    description: 'Theme',
    defaultValue: 'nyt',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: ['nyt', 'brutalism'],  // <-- Add brutalism here
      dynamicTitle: true,
    },
  },
  // ...
},
```

Now you can select "brutalism" from the theme dropdown in Storybook's toolbar.

---

## Step 5: Verify the Build

Run Storybook to verify the theme works:

```bash
pnpm --filter @blog/storybook dev
```

1. Open Storybook in browser
2. Use the Theme dropdown (paintbrush icon) to select "brutalism"
3. Use the Mode dropdown (sun icon) to toggle light/dark
4. Verify components update with brutalist styling

---

## How Users Pick Themes

### In Storybook

Users select themes via the toolbar:
- **Theme dropdown**: paintbrush icon → `nyt` or `brutalism`
- **Mode dropdown**: sun icon → `light` or `dark`

### In the Blog App (Future)

When the blog app is built, theme selection will work via data attributes:

```html
<!-- Set on root element -->
<html data-theme="brutalism" data-mode="light">
```

**JavaScript API:**
```javascript
// Switch theme
document.documentElement.dataset.theme = 'brutalism';

// Switch mode
document.documentElement.dataset.mode = 'dark';

// Get current theme
const currentTheme = document.documentElement.dataset.theme;
```

**React Context (recommended pattern):**
```tsx
// ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'nyt' | 'brutalism';
type Mode = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('nyt');
  const [mode, setModeState] = useState<Mode>('light');

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    document.documentElement.dataset.mode = newMode;
    localStorage.setItem('mode', newMode);
  };

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  // Initialize from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedMode = localStorage.getItem('mode') as Mode | null;

    if (savedTheme) setTheme(savedTheme);
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

**Usage in components:**
```tsx
function ThemeSwitcher() {
  const { theme, mode, setTheme, toggleMode } = useTheme();

  return (
    <div className="flex gap-inline-sm">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="border-2 border-border p-inset-xs"
      >
        <option value="nyt">NYT</option>
        <option value="brutalism">Brutalism</option>
      </select>

      <button
        onClick={toggleMode}
        className="border-2 border-border p-inset-xs"
      >
        {mode === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
}
```

### URL-Based Theme Selection (Optional)

For shareable theme demos:

```tsx
// Read theme from URL on page load
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const urlTheme = params.get('theme') as Theme | null;
  const urlMode = params.get('mode') as Mode | null;

  if (urlTheme) setTheme(urlTheme);
  if (urlMode) setMode(urlMode);
}, []);
```

URL: `https://yourblog.com?theme=brutalism&mode=dark`

---

## File Structure After Implementation

```
packages/tokens/
├── src/
│   ├── primitives/
│   │   └── colors.json          # Add brutalist primitives
│   ├── semantic/
│   │   └── base.json
│   └── themes/
│       ├── _template.json
│       ├── nyt/
│       │   ├── light.json
│       │   └── dark.json
│       └── brutalism/           # NEW
│           ├── light.json       # NEW
│           └── dark.json        # NEW
├── build/
│   └── css/
│       ├── primitives.css
│       ├── semantic.css
│       ├── theme-nyt-light.css
│       ├── theme-nyt-dark.css
│       ├── theme-brutalism-light.css   # GENERATED
│       ├── theme-brutalism-dark.css    # GENERATED
│       └── index.css                   # UPDATED
└── build.js

apps/storybook/
└── .storybook/
    └── preview.tsx              # Add 'brutalism' to items array
```

---

## Generated CSS Output

After building, `theme-brutalism-light.css` will contain:

```css
[data-theme="brutalism"][data-mode="light"] {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-tertiary: #e5e5e5;
  --color-bg-inverse: #000000;
  --color-text-primary: #000000;
  --color-text-secondary: #333333;
  --color-text-muted: #666666;
  --color-text-inverse: #ffffff;
  --color-border-default: #000000;
  --color-border-muted: #cccccc;
  --color-border-strong: #000000;
  /* ... all other tokens ... */
  --font-family-heading: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  --font-family-body: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  --radius-default: 0;
  --radius-sm: 0;
  --radius-lg: 0;
  --border-width-default: 2px;
  --border-width-thick: 4px;
}
```

---

## Verification Checklist

After implementation, verify:

- [ ] `pnpm --filter @blog/tokens build` completes without errors
- [ ] `build/css/theme-brutalism-light.css` exists
- [ ] `build/css/theme-brutalism-dark.css` exists
- [ ] `build/css/index.css` includes brutalism imports
- [ ] Storybook shows "brutalism" in theme dropdown
- [ ] Switching to brutalism changes component appearance
- [ ] Light/dark mode toggle works for brutalism
- [ ] Components have monospace fonts
- [ ] Components have no border-radius
- [ ] Borders are thicker (2px default)
- [ ] Colors are high contrast (pure black/white)

---

## Troubleshooting

### Theme not appearing in Storybook
- Check `preview.tsx` has 'brutalism' in the items array
- Restart Storybook dev server

### Tokens not updating
- Run `pnpm --filter @blog/tokens build`
- Clear browser cache
- Check `build/css/index.css` has the import

### CSS variables not defined
- Verify theme file JSON syntax is valid
- Check primitive references exist (e.g., `{primitive.color.pure.black}`)
- Look for build errors in console

### Wrong fonts loading
- Verify `primitive.font.family.mono` exists in `primitives/typography.json`
- Check browser DevTools for computed font-family

---

## Next Steps

After basic implementation:

1. **Add brutalist-specific primitive colors** to `colors.json`
2. **Create brutalism Storybook stories** showing theme differences
3. **Add theme documentation page** in Storybook
4. **Test all components** in brutalism theme
5. **Adjust token values** based on visual testing
6. **Add theme to blog app** when built
