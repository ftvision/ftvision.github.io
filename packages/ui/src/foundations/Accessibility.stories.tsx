import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Accessibility',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Color contrast requirements and current compliance status.
 * All foreground/background combinations must meet WCAG AA standards.
 */
export const ContrastCompliance: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Contrast Compliance</h2>
        <p className="type-body text-figure-secondary mb-6">
          All text/background combinations meet WCAG AA standards. Normal text requires 4.5:1,
          large text (18px+ bold or 24px+) requires 3:1.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="type-h4 text-figure-primary">Text on Primary Background</h3>
        <div className="p-6 bg-ground-primary border border-border rounded space-y-3">
          <p className="text-figure-primary type-body">Primary text (gray-900 on white) — 16.8:1 ratio</p>
          <p className="text-figure-secondary type-body">Secondary text (gray-600 on white) — 7.0:1 ratio</p>
          <p className="text-figure-muted type-body">Muted text (gray-500 on white) — 4.6:1 ratio</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="type-h4 text-figure-primary">Text on Secondary Background</h3>
        <div className="p-6 bg-ground-secondary border border-border rounded space-y-3">
          <p className="text-figure-primary type-body">Primary text on secondary bg — Passes</p>
          <p className="text-figure-secondary type-body">Secondary text on secondary bg — Passes</p>
          <p className="text-figure-muted type-body">Muted text on secondary bg — Passes</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="type-h4 text-figure-primary">Inverse Text</h3>
        <div className="p-6 bg-ground-inverse rounded space-y-3">
          <p className="text-figure-inverse type-body">Inverse text (white on gray-900) — 16.8:1 ratio</p>
        </div>
      </div>

      <div className="p-4 bg-status-info-bg border border-status-info rounded">
        <p className="type-label text-status-info">Status colors are tested against their respective backgrounds</p>
      </div>
    </div>
  ),
};

/**
 * Focus indicators for keyboard navigation.
 * All interactive elements must have visible focus states.
 */
export const FocusIndicators: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Focus Indicators</h2>
        <p className="type-body text-figure-secondary mb-6">
          Focus rings must be visible, consistent, and meet 3:1 contrast against adjacent colors.
          Use Tab to navigate through the examples below.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Interactive Elements</h3>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-4 py-2 rounded text-figure-inverse touch-target"
              style={{ backgroundColor: 'var(--color-action-primary)' }}
            >
              Primary Button
            </button>
            <button className="px-4 py-2 bg-action-secondary border border-border rounded text-figure-primary touch-target">
              Secondary Button
            </button>
            <a href="#" className="text-link underline px-2 py-2">
              Link Text
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Form Inputs</h3>
          <div className="flex flex-wrap gap-4 max-w-md">
            <input
              type="text"
              placeholder="Text input"
              className="flex-1 px-4 py-2 border border-border rounded bg-ground-primary text-figure-primary touch-target"
            />
            <select className="px-4 py-2 border border-border rounded bg-ground-primary text-figure-primary touch-target">
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="checkbox-demo" className="w-5 h-5" />
            <label htmlFor="checkbox-demo" className="type-body text-figure-primary">Checkbox label</label>
          </div>
        </div>

        <div className="p-4 bg-surface-code rounded">
          <p className="type-caption text-figure-muted mb-2">Focus Ring Tokens</p>
          <code className="type-body-sm text-figure-primary">
            --focus-ring-width: 2px<br />
            --focus-ring-offset: 2px<br />
            --color-focus-ring: #326891 (NYT blue)
          </code>
        </div>
      </div>
    </div>
  ),
};

/**
 * Touch target sizes for mobile accessibility.
 * Interactive elements must be at least 44x44 CSS pixels.
 */
export const TouchTargets: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Touch Targets</h2>
        <p className="type-body text-figure-secondary mb-6">
          WCAG 2.5.5 requires interactive elements to be at least 44×44 CSS pixels.
          Our comfortable target is 48×48 pixels.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Minimum (44px)</h3>
          <div className="flex items-center gap-4">
            <button
              className="touch-target flex items-center justify-center border border-border rounded bg-ground-secondary"
              aria-label="Icon button"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="type-caption text-figure-muted">44×44px minimum touch target</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Comfortable (48px)</h3>
          <div className="flex items-center gap-4">
            <button
              className="touch-target-comfortable flex items-center justify-center border border-border rounded bg-ground-secondary"
              aria-label="Icon button comfortable"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="type-caption text-figure-muted">48×48px comfortable touch target</span>
          </div>
        </div>

        <div className="p-4 bg-surface-code rounded">
          <p className="type-caption text-figure-muted mb-2">Touch Target Tokens</p>
          <code className="type-body-sm text-figure-primary">
            --size-touch-min: 2.75rem (44px)<br />
            --size-touch-comfortable: 3rem (48px)
          </code>
        </div>
      </div>
    </div>
  ),
};

/**
 * Screen reader utilities for visually hidden content.
 */
export const ScreenReaderUtilities: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Screen Reader Utilities</h2>
        <p className="type-body text-figure-secondary mb-6">
          Content can be visually hidden while remaining accessible to screen readers.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">.sr-only Example</h3>
          <p className="type-body text-figure-secondary">
            The button below has visually hidden text for screen readers:
          </p>
          <button className="touch-target flex items-center justify-center border border-border rounded bg-ground-secondary">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">Delete item</span>
          </button>
          <p className="type-caption text-figure-muted">
            Screen readers will announce: &quot;Delete item, button&quot;
          </p>
        </div>

        <div className="p-4 bg-surface-code rounded">
          <p className="type-caption text-figure-muted mb-2">.sr-only CSS</p>
          <pre className="type-body-sm text-figure-primary overflow-x-auto">
{`.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
};

/**
 * Reduced motion preferences for users with vestibular disorders.
 */
export const ReducedMotion: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Reduced Motion</h2>
        <p className="type-body text-figure-secondary mb-6">
          Users with vestibular disorders can enable &quot;Reduce motion&quot; in system preferences.
          Our design system respects this preference.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">How It Works</h3>
          <div className="p-4 bg-surface-aside rounded">
            <ol className="type-body text-figure-primary space-y-2 list-decimal list-inside">
              <li>User enables &quot;Reduce motion&quot; in system preferences</li>
              <li>CSS media query <code className="bg-surface-code px-1 rounded">@media (prefers-reduced-motion: reduce)</code> activates</li>
              <li>All animations and transitions use near-instant duration (0.01ms)</li>
              <li>Essential feedback (color changes) still works without motion</li>
            </ol>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Token Support</h3>
          <div className="p-4 bg-surface-code rounded">
            <code className="type-body-sm text-figure-primary">
              --motion-duration-reduced: 0.01ms
            </code>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Implementation</h3>
          <div className="p-4 bg-surface-code rounded">
            <pre className="type-body-sm text-figure-primary overflow-x-auto">
{`@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Typography accessibility guidelines.
 */
export const TypographyAccessibility: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Typography Accessibility</h2>
        <p className="type-body text-figure-secondary mb-6">
          Text must be readable at various zoom levels and respect user preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Minimum Sizes</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 type-label text-figure-primary">Context</th>
                  <th className="text-left py-2 type-label text-figure-primary">Minimum</th>
                  <th className="text-left py-2 type-label text-figure-primary">Our Value</th>
                </tr>
              </thead>
              <tbody className="type-body text-figure-secondary">
                <tr className="border-b border-border-muted">
                  <td className="py-2">Body text</td>
                  <td className="py-2">16px</td>
                  <td className="py-2">16px (1rem)</td>
                </tr>
                <tr className="border-b border-border-muted">
                  <td className="py-2">Caption text</td>
                  <td className="py-2">12px</td>
                  <td className="py-2">12.8px (0.8rem)</td>
                </tr>
                <tr className="border-b border-border-muted">
                  <td className="py-2">Button text</td>
                  <td className="py-2">14px</td>
                  <td className="py-2">16px (1rem)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Line Length</h3>
          <p className="type-body text-figure-secondary">
            Optimal reading: 45-75 characters per line. Maximum: 80 characters.
          </p>
          <div className="prose p-4 bg-surface-quote rounded">
            <p className="type-body text-figure-primary">
              This paragraph demonstrates the optimal line length for reading. The .prose class
              sets max-width to 65ch (approximately 65 characters), which falls within the
              recommended range for comfortable reading. Long lines of text are harder to track
              from line to line.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Line Height</h3>
          <p className="type-body text-figure-secondary">
            WCAG requires users can adjust line height to 1.5× font size. Our body text uses 1.6.
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Complete accessibility checklist for component development.
 */
export const Checklist: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-4">Accessibility Checklist</h2>
        <p className="type-body text-figure-secondary mb-6">
          Use this checklist when developing or reviewing components.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            category: 'Perceivable',
            items: [
              'Text meets 4.5:1 contrast ratio (normal) or 3:1 (large)',
              'UI components meet 3:1 contrast against adjacent colors',
              'Color is not the only way to convey information',
              'Images have meaningful alt text',
            ],
          },
          {
            category: 'Operable',
            items: [
              'All functionality available via keyboard',
              'Focus order is logical and intuitive',
              'Focus indicators are visible (using focus tokens)',
              'Touch targets are at least 44×44px',
              'No content causes seizures (no flashing >3 times/second)',
            ],
          },
          {
            category: 'Understandable',
            items: [
              'Language is specified on the page',
              'Error messages are clear and helpful',
              'Labels are associated with form inputs',
              'Navigation is consistent',
            ],
          },
          {
            category: 'Robust',
            items: [
              'Valid HTML is used',
              'ARIA attributes are correct and complete',
              'Content works with assistive technologies',
              'Components are tested with screen readers',
            ],
          },
        ].map(({ category, items }) => (
          <div key={category} className="space-y-3">
            <h3 className="type-h4 text-figure-primary">{category}</h3>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 flex-shrink-0" />
                  <span className="type-body text-figure-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ),
};
