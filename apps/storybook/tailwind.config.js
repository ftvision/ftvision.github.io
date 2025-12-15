const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './stories/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ground: background/surface colors (what things sit ON)
        ground: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          inverse: 'var(--color-bg-inverse)',
        },
        // Figure: foreground/content colors (what you SEE)
        figure: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          muted: 'var(--color-border-muted)',
          strong: 'var(--color-border-strong)',
        },
        action: {
          primary: 'var(--color-action-primary)',
          'primary-hover': 'var(--color-action-primary-hover)',
          secondary: 'var(--color-action-secondary)',
          'secondary-hover': 'var(--color-action-secondary-hover)',
        },
        status: {
          info: 'var(--color-status-info)',
          'info-bg': 'var(--color-status-info-bg)',
          success: 'var(--color-status-success)',
          'success-bg': 'var(--color-status-success-bg)',
          warning: 'var(--color-status-warning)',
          'warning-bg': 'var(--color-status-warning-bg)',
          danger: 'var(--color-status-danger)',
          'danger-bg': 'var(--color-status-danger-bg)',
        },
        // Accent colors for highlights and editorial elements
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          tertiary: 'var(--color-accent-tertiary)',
        },
        // Surface colors for distinct content regions
        surface: {
          code: 'var(--color-surface-code)',
          quote: 'var(--color-surface-quote)',
          aside: 'var(--color-surface-aside)',
          highlight: 'var(--color-surface-highlight)',
          elevated: 'var(--color-surface-elevated)',
        },
        // Link colors with state variants
        link: {
          DEFAULT: 'var(--color-link-default)',
          hover: 'var(--color-link-hover)',
          visited: 'var(--color-link-visited)',
          active: 'var(--color-link-active)',
        },
        // Focus ring colors
        focus: {
          ring: 'var(--color-focus-ring)',
          'ring-offset': 'var(--color-focus-ring-offset)',
        },
        // Overlay colors for modals and scrims
        overlay: {
          scrim: 'var(--color-overlay-scrim)',
          light: 'var(--color-overlay-light)',
          dark: 'var(--color-overlay-dark)',
        },
        // Data visualization categorical colors
        data: {
          1: 'var(--color-data-1)',
          2: 'var(--color-data-2)',
          3: 'var(--color-data-3)',
          4: 'var(--color-data-4)',
          5: 'var(--color-data-5)',
          6: 'var(--color-data-6)',
          'seq-1': 'var(--color-data-sequential-1)',
          'seq-2': 'var(--color-data-sequential-2)',
          'seq-3': 'var(--color-data-sequential-3)',
          'seq-4': 'var(--color-data-sequential-4)',
          'seq-5': 'var(--color-data-sequential-5)',
        },
      },
      fontFamily: {
        heading: 'var(--font-family-heading)',
        body: 'var(--font-family-body)',
        code: 'var(--font-family-code)',
      },
      fontSize: {
        // Semantic type sizes with line-height pairings
        display: ['var(--font-size-display)', { lineHeight: 'var(--font-line-height-display)', letterSpacing: 'var(--font-letter-spacing-display)' }],
        h1: ['var(--font-size-h1)', { lineHeight: 'var(--font-line-height-h1)', letterSpacing: 'var(--font-letter-spacing-h1)' }],
        h2: ['var(--font-size-h2)', { lineHeight: 'var(--font-line-height-h2)', letterSpacing: 'var(--font-letter-spacing-h2)' }],
        h3: ['var(--font-size-h3)', { lineHeight: 'var(--font-line-height-h3)', letterSpacing: 'var(--font-letter-spacing-h3)' }],
        h4: ['var(--font-size-h4)', { lineHeight: 'var(--font-line-height-h4)', letterSpacing: 'var(--font-letter-spacing-h4)' }],
        body: ['var(--font-size-body)', { lineHeight: 'var(--font-line-height-body)', letterSpacing: 'var(--font-letter-spacing-body)' }],
        'body-sm': ['var(--font-size-body-sm)', { lineHeight: 'var(--font-line-height-body-sm)', letterSpacing: 'var(--font-letter-spacing-body-sm)' }],
        caption: ['var(--font-size-caption)', { lineHeight: 'var(--font-line-height-caption)', letterSpacing: 'var(--font-letter-spacing-caption)' }],
        label: ['var(--font-size-label)', { lineHeight: 'var(--font-line-height-label)', letterSpacing: 'var(--font-letter-spacing-label)' }],
        overline: ['var(--font-size-overline)', { lineHeight: 'var(--font-line-height-overline)', letterSpacing: 'var(--font-letter-spacing-overline)' }],
      },
      fontWeight: {
        display: 'var(--font-weight-display)',
        h1: 'var(--font-weight-h1)',
        h2: 'var(--font-weight-h2)',
        h3: 'var(--font-weight-h3)',
        h4: 'var(--font-weight-h4)',
        body: 'var(--font-weight-body)',
        'body-sm': 'var(--font-weight-body-sm)',
        caption: 'var(--font-weight-caption)',
        label: 'var(--font-weight-label)',
        overline: 'var(--font-weight-overline)',
      },
      lineHeight: {
        tighter: 'var(--primitive-font-line-height-tighter)',
        tight: 'var(--primitive-font-line-height-tight)',
        snug: 'var(--primitive-font-line-height-snug)',
        cozy: 'var(--primitive-font-line-height-cozy)',
        normal: 'var(--primitive-font-line-height-normal)',
        relaxed: 'var(--primitive-font-line-height-relaxed)',
        loose: 'var(--primitive-font-line-height-loose)',
      },
      spacing: {
        // Stack: vertical spacing between stacked elements
        'stack-xs': 'var(--spacing-stack-xs)',
        'stack-sm': 'var(--spacing-stack-sm)',
        'stack-md': 'var(--spacing-stack-md)',
        'stack-lg': 'var(--spacing-stack-lg)',
        'stack-xl': 'var(--spacing-stack-xl)',
        'stack-2xl': 'var(--spacing-stack-2xl)',
        'stack-3xl': 'var(--spacing-stack-3xl)',
        // Inline: horizontal spacing between inline elements
        'inline-xs': 'var(--spacing-inline-xs)',
        'inline-sm': 'var(--spacing-inline-sm)',
        'inline-md': 'var(--spacing-inline-md)',
        'inline-lg': 'var(--spacing-inline-lg)',
        'inline-xl': 'var(--spacing-inline-xl)',
        // Inset: internal padding within containers
        'inset-xs': 'var(--spacing-inset-xs)',
        'inset-sm': 'var(--spacing-inset-sm)',
        'inset-md': 'var(--spacing-inset-md)',
        'inset-lg': 'var(--spacing-inset-lg)',
        'inset-xl': 'var(--spacing-inset-xl)',
        // Gutter: space between columns or grid items
        'gutter-xs': 'var(--spacing-gutter-xs)',
        'gutter-sm': 'var(--spacing-gutter-sm)',
        'gutter-md': 'var(--spacing-gutter-md)',
        'gutter-lg': 'var(--spacing-gutter-lg)',
        'gutter-xl': 'var(--spacing-gutter-xl)',
        // Section: large-scale spacing between page sections
        'section-sm': 'var(--spacing-section-sm)',
        'section-md': 'var(--spacing-section-md)',
        'section-lg': 'var(--spacing-section-lg)',
        'section-xl': 'var(--spacing-section-xl)',
        'section-2xl': 'var(--spacing-section-2xl)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius-default)',
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width-default)',
        thick: 'var(--border-width-thick)',
      },
      // Motion: durations and easing
      transitionDuration: {
        instant: 'var(--motion-duration-instant)',
        fast: 'var(--motion-duration-fast)',
        normal: 'var(--motion-duration-normal)',
        slow: 'var(--motion-duration-slow)',
        deliberate: 'var(--motion-duration-deliberate)',
        dramatic: 'var(--motion-duration-dramatic)',
      },
      transitionTimingFunction: {
        default: 'var(--motion-easing-default)',
        enter: 'var(--motion-easing-enter)',
        exit: 'var(--motion-easing-exit)',
        move: 'var(--motion-easing-move)',
        spring: 'var(--motion-easing-spring)',
      },
    },
  },
  plugins: [
    // Custom typography utility plugin for complete semantic type styles
    plugin(function({ addUtilities }) {
      addUtilities({
        '.type-display': {
          fontSize: 'var(--font-size-display)',
          lineHeight: 'var(--font-line-height-display)',
          fontWeight: 'var(--font-weight-display)',
          letterSpacing: 'var(--font-letter-spacing-display)',
          fontFamily: 'var(--font-family-heading)',
        },
        '.type-h1': {
          fontSize: 'var(--font-size-h1)',
          lineHeight: 'var(--font-line-height-h1)',
          fontWeight: 'var(--font-weight-h1)',
          letterSpacing: 'var(--font-letter-spacing-h1)',
          fontFamily: 'var(--font-family-heading)',
        },
        '.type-h2': {
          fontSize: 'var(--font-size-h2)',
          lineHeight: 'var(--font-line-height-h2)',
          fontWeight: 'var(--font-weight-h2)',
          letterSpacing: 'var(--font-letter-spacing-h2)',
          fontFamily: 'var(--font-family-heading)',
        },
        '.type-h3': {
          fontSize: 'var(--font-size-h3)',
          lineHeight: 'var(--font-line-height-h3)',
          fontWeight: 'var(--font-weight-h3)',
          letterSpacing: 'var(--font-letter-spacing-h3)',
          fontFamily: 'var(--font-family-heading)',
        },
        '.type-h4': {
          fontSize: 'var(--font-size-h4)',
          lineHeight: 'var(--font-line-height-h4)',
          fontWeight: 'var(--font-weight-h4)',
          letterSpacing: 'var(--font-letter-spacing-h4)',
          fontFamily: 'var(--font-family-heading)',
        },
        '.type-body': {
          fontSize: 'var(--font-size-body)',
          lineHeight: 'var(--font-line-height-body)',
          fontWeight: 'var(--font-weight-body)',
          letterSpacing: 'var(--font-letter-spacing-body)',
          fontFamily: 'var(--font-family-body)',
        },
        '.type-body-sm': {
          fontSize: 'var(--font-size-body-sm)',
          lineHeight: 'var(--font-line-height-body-sm)',
          fontWeight: 'var(--font-weight-body-sm)',
          letterSpacing: 'var(--font-letter-spacing-body-sm)',
          fontFamily: 'var(--font-family-body)',
        },
        '.type-caption': {
          fontSize: 'var(--font-size-caption)',
          lineHeight: 'var(--font-line-height-caption)',
          fontWeight: 'var(--font-weight-caption)',
          letterSpacing: 'var(--font-letter-spacing-caption)',
          fontFamily: 'var(--font-family-body)',
        },
        '.type-label': {
          fontSize: 'var(--font-size-label)',
          lineHeight: 'var(--font-line-height-label)',
          fontWeight: 'var(--font-weight-label)',
          letterSpacing: 'var(--font-letter-spacing-label)',
          fontFamily: 'var(--font-family-body)',
        },
        '.type-overline': {
          fontSize: 'var(--font-size-overline)',
          lineHeight: 'var(--font-line-height-overline)',
          fontWeight: 'var(--font-weight-overline)',
          letterSpacing: 'var(--font-letter-spacing-overline)',
          fontFamily: 'var(--font-family-body)',
          textTransform: 'uppercase',
        },
      });
    }),
    // Spacing utility plugin
    plugin(function({ addUtilities }) {
      const spacingUtils = {};

      // Stack spacing (vertical margins)
      ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].forEach(size => {
        spacingUtils[`.mb-stack-${size}`] = { marginBottom: `var(--spacing-stack-${size})` };
        spacingUtils[`.mt-stack-${size}`] = { marginTop: `var(--spacing-stack-${size})` };
        spacingUtils[`.my-stack-${size}`] = { marginTop: `var(--spacing-stack-${size})`, marginBottom: `var(--spacing-stack-${size})` };
        spacingUtils[`.pb-stack-${size}`] = { paddingBottom: `var(--spacing-stack-${size})` };
        spacingUtils[`.pt-stack-${size}`] = { paddingTop: `var(--spacing-stack-${size})` };
        spacingUtils[`.py-stack-${size}`] = { paddingTop: `var(--spacing-stack-${size})`, paddingBottom: `var(--spacing-stack-${size})` };
        spacingUtils[`.h-stack-${size}`] = { height: `var(--spacing-stack-${size})` };
        spacingUtils[`.gap-y-stack-${size}`] = { rowGap: `var(--spacing-stack-${size})` };
      });

      // Inline spacing (horizontal margins)
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        spacingUtils[`.ml-inline-${size}`] = { marginLeft: `var(--spacing-inline-${size})` };
        spacingUtils[`.mr-inline-${size}`] = { marginRight: `var(--spacing-inline-${size})` };
        spacingUtils[`.mx-inline-${size}`] = { marginLeft: `var(--spacing-inline-${size})`, marginRight: `var(--spacing-inline-${size})` };
        spacingUtils[`.pl-inline-${size}`] = { paddingLeft: `var(--spacing-inline-${size})` };
        spacingUtils[`.pr-inline-${size}`] = { paddingRight: `var(--spacing-inline-${size})` };
        spacingUtils[`.px-inline-${size}`] = { paddingLeft: `var(--spacing-inline-${size})`, paddingRight: `var(--spacing-inline-${size})` };
        spacingUtils[`.gap-x-inline-${size}`] = { columnGap: `var(--spacing-inline-${size})` };
      });

      // Inset spacing (padding)
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        spacingUtils[`.p-inset-${size}`] = { padding: `var(--spacing-inset-${size})` };
        spacingUtils[`.px-inset-${size}`] = { paddingLeft: `var(--spacing-inset-${size})`, paddingRight: `var(--spacing-inset-${size})` };
        spacingUtils[`.py-inset-${size}`] = { paddingTop: `var(--spacing-inset-${size})`, paddingBottom: `var(--spacing-inset-${size})` };
        spacingUtils[`.pt-inset-${size}`] = { paddingTop: `var(--spacing-inset-${size})` };
        spacingUtils[`.pb-inset-${size}`] = { paddingBottom: `var(--spacing-inset-${size})` };
        spacingUtils[`.pl-inset-${size}`] = { paddingLeft: `var(--spacing-inset-${size})` };
        spacingUtils[`.pr-inset-${size}`] = { paddingRight: `var(--spacing-inset-${size})` };
      });

      // Gutter spacing (gaps)
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        spacingUtils[`.gap-gutter-${size}`] = { gap: `var(--spacing-gutter-${size})` };
        spacingUtils[`.gap-x-gutter-${size}`] = { columnGap: `var(--spacing-gutter-${size})` };
        spacingUtils[`.gap-y-gutter-${size}`] = { rowGap: `var(--spacing-gutter-${size})` };
      });

      // Section spacing (large margins)
      ['sm', 'md', 'lg', 'xl', '2xl'].forEach(size => {
        spacingUtils[`.mt-section-${size}`] = { marginTop: `var(--spacing-section-${size})` };
        spacingUtils[`.mb-section-${size}`] = { marginBottom: `var(--spacing-section-${size})` };
        spacingUtils[`.my-section-${size}`] = { marginTop: `var(--spacing-section-${size})`, marginBottom: `var(--spacing-section-${size})` };
        spacingUtils[`.pt-section-${size}`] = { paddingTop: `var(--spacing-section-${size})` };
        spacingUtils[`.pb-section-${size}`] = { paddingBottom: `var(--spacing-section-${size})` };
        spacingUtils[`.py-section-${size}`] = { paddingTop: `var(--spacing-section-${size})`, paddingBottom: `var(--spacing-section-${size})` };
      });

      addUtilities(spacingUtils);
    }),
    // Motion transition presets
    plugin(function({ addUtilities }) {
      addUtilities({
        // Common transition presets
        '.transition-hover': {
          transitionProperty: 'background-color, border-color, color, fill, stroke',
          transitionDuration: 'var(--motion-duration-fast)',
          transitionTimingFunction: 'var(--motion-easing-default)',
        },
        '.transition-transform': {
          transitionProperty: 'transform, box-shadow',
          transitionDuration: 'var(--motion-duration-fast)',
          transitionTimingFunction: 'var(--motion-easing-default)',
        },
        '.transition-fade': {
          transitionProperty: 'opacity',
          transitionDuration: 'var(--motion-duration-normal)',
          transitionTimingFunction: 'var(--motion-easing-default)',
        },
        '.transition-expand': {
          transitionProperty: 'height, max-height, padding',
          transitionDuration: 'var(--motion-duration-normal)',
          transitionTimingFunction: 'var(--motion-easing-move)',
        },
        '.transition-modal-enter': {
          transitionProperty: 'opacity, transform',
          transitionDuration: 'var(--motion-duration-slow)',
          transitionTimingFunction: 'var(--motion-easing-enter)',
        },
        '.transition-modal-exit': {
          transitionProperty: 'opacity, transform',
          transitionDuration: 'var(--motion-duration-normal)',
          transitionTimingFunction: 'var(--motion-easing-exit)',
        },
      });
    }),
    // Accessibility utilities
    plugin(function({ addUtilities, addBase }) {
      addUtilities({
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        },
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
        '.touch-target': {
          minWidth: 'var(--size-touch-min)',
          minHeight: 'var(--size-touch-min)',
        },
        '.touch-target-comfortable': {
          minWidth: 'var(--size-touch-comfortable)',
          minHeight: 'var(--size-touch-comfortable)',
        },
        '.focus-ring': {
          outline: 'var(--focus-ring-width) solid var(--color-focus-ring)',
          outlineOffset: 'var(--focus-ring-offset)',
        },
        // Ensure inverse text color works for buttons
        '.text-inverse': {
          color: 'var(--color-text-inverse)',
        },
        // Border width utilities for design tokens
        '.border-l-thick': {
          borderLeftWidth: 'var(--border-width-thick)',
        },
        '.border-r-thick': {
          borderRightWidth: 'var(--border-width-thick)',
        },
        '.border-t-thick': {
          borderTopWidth: 'var(--border-width-thick)',
        },
        '.border-b-thick': {
          borderBottomWidth: 'var(--border-width-thick)',
        },
        '.border-thick': {
          borderWidth: 'var(--border-width-thick)',
        },
      });
      addBase({
        ':focus-visible': {
          outline: 'var(--focus-ring-width) solid var(--color-focus-ring)',
          outlineOffset: 'var(--focus-ring-offset)',
        },
        '.prose': {
          maxWidth: '65ch',
        },
      });
    }),
  ],
};
