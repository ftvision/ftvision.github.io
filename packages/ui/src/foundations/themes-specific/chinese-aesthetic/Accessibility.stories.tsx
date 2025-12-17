import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Themes/Chinese Aesthetic/Accessibility',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Focus states using seal red focus ring.
 * 有教无类 — "Education without discrimination"
 */
export const FocusStates: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Focus States 焦点状态</h2>
        <p className="type-body text-figure-secondary mb-8">
          Seal red focus rings ensure keyboard navigation is visible and aesthetic. Use Tab key to
          navigate through the elements below.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Interactive Elements</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-6 py-2 bg-action-primary text-figure-inverse rounded">
              Primary Button
            </button>
            <button className="px-6 py-2 border border-border text-figure-primary rounded">
              Secondary Button
            </button>
            <a href="#" className="text-link underline">
              Link Element
            </a>
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Form Elements</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="type-label text-figure-primary block mb-2">Text Input</label>
              <input
                type="text"
                placeholder="Focus me with Tab"
                className="w-full px-4 py-2 border border-border rounded bg-ground-primary text-figure-primary"
              />
            </div>
            <div>
              <label className="type-label text-figure-primary block mb-2">Select</label>
              <select className="w-full px-4 py-2 border border-border rounded bg-ground-primary text-figure-primary">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label className="type-label text-figure-primary block mb-2">Textarea</label>
              <textarea
                placeholder="Focus me with Tab"
                className="w-full px-4 py-2 border border-border rounded bg-ground-primary text-figure-primary"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Custom Focusable Elements</h3>
          <div className="flex gap-4">
            <div
              tabIndex={0}
              className="p-4 border border-border rounded cursor-pointer hover:bg-ground-secondary"
            >
              <p className="type-label text-figure-primary">Focusable Card</p>
              <p className="type-caption text-figure-muted">tabIndex=0</p>
            </div>
            <div
              tabIndex={0}
              className="p-4 border border-border rounded cursor-pointer hover:bg-ground-secondary"
            >
              <p className="type-label text-figure-primary">Another Card</p>
              <p className="type-caption text-figure-muted">tabIndex=0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-status-info-bg border border-status-info rounded">
        <p className="type-body-sm text-figure-primary">
          <strong>Note:</strong> Focus rings use the seal red accent color (
          <code className="text-accent-primary">--color-focus-ring</code>) with a 2px width and 2px
          offset. This creates a distinctive, aesthetically appropriate focus indicator.
        </p>
      </div>
    </div>
  ),
};

/**
 * Color contrast compliance with WCAG standards.
 */
export const ContrastCompliance: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Contrast Compliance 对比度合规</h2>
        <p className="type-body text-figure-secondary mb-8">
          All text/background pairings meet WCAG AA standards. The ink-on-paper aesthetic naturally
          supports high contrast.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="type-h4 text-figure-primary">Text on Backgrounds</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-ground-primary rounded border border-border">
            <p className="type-label text-figure-primary mb-1">Primary Text on Primary BG</p>
            <p className="type-caption text-figure-muted">Ratio: 11.2:1 ✓ AAA</p>
          </div>
          <div className="p-6 bg-ground-primary rounded border border-border">
            <p className="type-label text-figure-secondary mb-1">Secondary Text on Primary BG</p>
            <p className="type-caption text-figure-muted">Ratio: 6.3:1 ✓ AA</p>
          </div>
          <div className="p-6 bg-ground-primary rounded border border-border">
            <p className="type-label text-figure-muted mb-1">Muted Text on Primary BG</p>
            <p className="type-caption text-figure-muted">Ratio: 4.6:1 ✓ AA</p>
          </div>
          <div className="p-6 bg-ground-primary rounded border border-border">
            <p className="type-label text-accent-primary mb-1">Accent (Seal Red) on Primary BG</p>
            <p className="type-caption text-figure-muted">Ratio: 5.8:1 ✓ AA</p>
          </div>
        </div>

        <h3 className="type-h4 text-figure-primary mt-8">Surface Colors</h3>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-6 bg-surface-code rounded">
            <p className="type-label text-figure-primary mb-1">Code Surface</p>
            <p className="type-caption text-figure-muted">Ratio: 10.8:1 ✓ AAA</p>
          </div>
          <div className="p-6 bg-surface-quote rounded">
            <p className="type-label text-figure-primary mb-1">Quote Surface</p>
            <p className="type-caption text-figure-muted">Ratio: 10.9:1 ✓ AAA</p>
          </div>
          <div className="p-6 bg-surface-aside rounded">
            <p className="type-label text-figure-primary mb-1">Aside Surface</p>
            <p className="type-caption text-figure-muted">Ratio: 10.7:1 ✓ AAA</p>
          </div>
        </div>

        <div className="p-4 bg-status-warning-bg border border-status-warning rounded mt-6">
          <p className="type-body-sm text-figure-primary">
            <strong>⚠ Celadon Note:</strong> The secondary accent (celadon green) has a 3.2:1 ratio
            on light backgrounds. Use only for large text, decorative elements, or non-text
            purposes.
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Typography accessibility for CJK content.
 */
export const TypographyAccessibility: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Typography Accessibility 字体无障碍</h2>
        <p className="type-body text-figure-secondary mb-8">
          CJK-optimized typography ensures readability for Chinese characters while maintaining
          accessibility standards.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Minimum Sizes for CJK</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 type-label text-figure-primary">Context</th>
                  <th className="text-left py-2 type-label text-figure-primary">WCAG Minimum</th>
                  <th className="text-left py-2 type-label text-figure-primary">Our Default</th>
                  <th className="text-left py-2 type-label text-figure-primary">Status</th>
                </tr>
              </thead>
              <tbody className="type-body-sm text-figure-secondary">
                <tr className="border-b border-border">
                  <td className="py-2">Body text</td>
                  <td className="py-2">16px</td>
                  <td className="py-2">18px (1.125rem)</td>
                  <td className="py-2 text-status-success">✓ Exceeds</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Caption text</td>
                  <td className="py-2">14px</td>
                  <td className="py-2">14.4px (0.9rem)</td>
                  <td className="py-2 text-status-success">✓ Meets</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Button text</td>
                  <td className="py-2">16px</td>
                  <td className="py-2">16px (1rem)</td>
                  <td className="py-2 text-status-success">✓ Meets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Line Height for Readability</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded">
              <p className="type-label text-figure-primary mb-2">WCAG 1.4.12 Requirement</p>
              <p className="type-body-sm text-figure-secondary">Minimum line height: 1.5</p>
            </div>
            <div className="p-6 border border-border rounded bg-ground-secondary">
              <p className="type-label text-figure-primary mb-2">Our CJK Body Line Height</p>
              <p className="type-body-sm text-figure-secondary">
                Line height: 1.8 <span className="text-status-success">(+0.3 above minimum)</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Relative Units</h3>
          <p className="type-body text-figure-secondary mb-4">
            All typography uses relative units (rem, em) rather than fixed px values. This allows
            users to adjust text spacing without loss of content (WCAG 1.4.12).
          </p>
          <div className="p-4 bg-surface-code rounded font-mono type-caption text-figure-secondary">
            <code>--font-size-body: 1.125rem; /* Not 18px */</code>
            <br />
            <code>--font-line-height-body: 1.8; /* Unitless for inheritance */</code>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Keyboard navigation patterns.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Keyboard Navigation 键盘导航</h2>
        <p className="type-body text-figure-secondary mb-8">
          All interactive elements are fully keyboard accessible. The scholar's studio welcomes
          every reader.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Standard Interactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 type-label text-figure-primary">Element</th>
                  <th className="text-left py-2 type-label text-figure-primary">Key</th>
                  <th className="text-left py-2 type-label text-figure-primary">Action</th>
                </tr>
              </thead>
              <tbody className="type-body-sm text-figure-secondary">
                <tr className="border-b border-border">
                  <td className="py-2">Links</td>
                  <td className="py-2">
                    <kbd className="px-2 py-1 bg-surface-code rounded">Enter</kbd>
                  </td>
                  <td className="py-2">Activate link</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Buttons</td>
                  <td className="py-2">
                    <kbd className="px-2 py-1 bg-surface-code rounded">Enter</kbd> /{' '}
                    <kbd className="px-2 py-1 bg-surface-code rounded">Space</kbd>
                  </td>
                  <td className="py-2">Activate button</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Inputs</td>
                  <td className="py-2">
                    <kbd className="px-2 py-1 bg-surface-code rounded">Tab</kbd>
                  </td>
                  <td className="py-2">Focus input, type to enter</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Dropdowns</td>
                  <td className="py-2">
                    <kbd className="px-2 py-1 bg-surface-code rounded">↑</kbd>{' '}
                    <kbd className="px-2 py-1 bg-surface-code rounded">↓</kbd>
                  </td>
                  <td className="py-2">Navigate options</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Skip Link Demo</h3>
          <p className="type-body-sm text-figure-secondary mb-4">
            Skip links allow keyboard users to bypass navigation. Press Tab at the top of a page to
            reveal them.
          </p>
          <div className="p-6 border border-border rounded bg-ground-secondary">
            <a
              href="#main-content"
              className="inline-block px-4 py-2 bg-action-primary text-figure-inverse rounded"
            >
              跳至主要内容 / Skip to main content
            </a>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Color independence - never rely on color alone.
 */
export const ColorIndependence: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Color Independence 色彩独立性</h2>
        <p className="type-body text-figure-secondary mb-8">
          Color reinforces meaning but never carries it alone. Information is conveyed through
          icon + text + color.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Status Indicators</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-status-info-bg border border-status-info rounded flex items-start gap-3">
              <span className="text-status-info">ℹ️</span>
              <div>
                <p className="type-label text-status-info">Note 注</p>
                <p className="type-body-sm text-figure-primary">
                  Color + Icon + Text ensures accessibility.
                </p>
              </div>
            </div>
            <div className="p-4 bg-status-success-bg border border-status-success rounded flex items-start gap-3">
              <span className="text-status-success">✓</span>
              <div>
                <p className="type-label text-status-success">Success 成功</p>
                <p className="type-body-sm text-figure-primary">
                  The icon reinforces the success state.
                </p>
              </div>
            </div>
            <div className="p-4 bg-status-warning-bg border border-status-warning rounded flex items-start gap-3">
              <span className="text-status-warning">⚠</span>
              <div>
                <p className="type-label text-status-warning">Warning 警告</p>
                <p className="type-body-sm text-figure-primary">
                  Warning is clear without relying on color.
                </p>
              </div>
            </div>
            <div className="p-4 bg-status-danger-bg border border-status-danger rounded flex items-start gap-3">
              <span className="text-status-danger">✕</span>
              <div>
                <p className="type-label text-status-danger">Error 错误</p>
                <p className="type-body-sm text-figure-primary">
                  Error state uses icon, text, and color.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-status-danger-bg border border-status-danger rounded">
          <h4 className="type-label text-status-danger mb-2">✕ Anti-Pattern</h4>
          <div className="p-4 border border-status-danger rounded bg-ground-primary">
            <p className="type-body-sm" style={{ color: '#B84C4C' }}>
              This action cannot be undone
            </p>
            <p className="type-caption text-figure-muted mt-2">
              ↑ Color alone is not accessible. Users with color blindness may not perceive the
              warning.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Bilingual screen reader considerations.
 */
export const BilingualAccessibility: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="type-h2 text-figure-primary mb-2">Bilingual Accessibility 双语无障碍</h2>
        <p className="type-body text-figure-secondary mb-8">
          Proper language attributes allow screen readers to switch pronunciation modes for Chinese
          and English content.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Language Attributes</h3>
          <div className="p-6 bg-surface-code rounded font-mono type-caption text-figure-secondary space-y-4">
            <div>
              <p className="text-figure-muted mb-1">{'<!-- Bilingual heading -->'}</p>
              <code>
                {'<h1>'}
                <br />
                {'  <span lang="zh">虚室生白</span>'}
                <br />
                {'  <span lang="en">In emptiness, light is born</span>'}
                <br />
                {'</h1>'}
              </code>
            </div>
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Live Example</h3>
          <div className="p-6 border border-border rounded">
            <h4 className="type-h3 text-figure-primary">
              <span lang="zh">计白当黑</span>
              <br />
              <span lang="en" className="type-body-sm text-figure-secondary font-normal">
                Count the white as black
              </span>
            </h4>
            <p className="type-body text-figure-secondary mt-4">
              <span lang="zh">在中国绘画中，留白不是空白。</span>{' '}
              <span lang="en">In Chinese painting, emptiness is not empty.</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="type-h4 text-figure-primary mb-4">Decorative Elements</h3>
          <p className="type-body text-figure-secondary mb-4">
            Decorative brushstrokes should be hidden from screen readers:
          </p>
          <div className="p-6 bg-surface-code rounded font-mono type-caption text-figure-secondary">
            <code>{'<svg aria-hidden="true" class="brush-divider">'}</code>
            <br />
            <code>{'  <!-- decorative path -->'}</code>
            <br />
            <code>{'</svg>'}</code>
          </div>
        </div>
      </div>
    </div>
  ),
};
