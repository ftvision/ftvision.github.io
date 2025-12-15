import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
  title: 'Foundations/Motion',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Duration tokens define how long transitions take.
 * Most interactions should use `fast` or `normal`.
 */
export const Durations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">Duration Tokens</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Duration reflects cognitive distance. Nearby elements animate quickly;
          major context shifts take longer. Watch the balls move at different speeds.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { name: 'instant', value: '0ms', ms: 50, usage: 'Immediate state changes' },
          { name: 'fast', value: '100ms', ms: 100, usage: 'Micro-interactions: hover, focus' },
          { name: 'normal', value: '200ms', ms: 200, usage: 'Standard transitions: dropdowns' },
          { name: 'slow', value: '300ms', ms: 300, usage: 'Emphasis: modals appearing' },
          { name: 'deliberate', value: '500ms', ms: 500, usage: 'Major transitions: page sections' },
          { name: 'dramatic', value: '800ms', ms: 800, usage: 'Rare: hero animations' },
        ].map(({ name, value, ms, usage }) => (
          <div key={name} className="flex items-center gap-gutter-md">
            <div className="w-28 type-label text-figure-primary">{name}</div>
            <div className="w-16 type-caption text-figure-muted">{value}</div>
            <div className="flex-1 h-8 bg-ground-secondary rounded relative overflow-hidden">
              <div
                className="absolute w-6 h-6 rounded-full top-1 motion-demo-ball"
                style={{
                  backgroundColor: '#2563eb',
                  '--demo-duration': `${ms * 4}ms`,
                  animation: `slide-ball ${ms * 4}ms ease-in-out infinite alternate`,
                } as React.CSSProperties}
              />
            </div>
            <div className="w-64 type-caption text-figure-secondary">{usage}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide-ball {
          from { left: 4px; }
          to { left: calc(100% - 28px); }
        }
        /* Force animation even with reduced motion for demo purposes */
        @media (prefers-reduced-motion: reduce) {
          .motion-demo-ball {
            animation-duration: var(--demo-duration) !important;
            animation-iteration-count: infinite !important;
          }
        }
      `}</style>
    </div>
  ),
};

/**
 * Easing curves define the acceleration pattern of transitions.
 */
export const Easing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">Easing Curves</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Easing reflects intent. Elements entering use ease-out (gentle landing).
          Elements exiting use ease-in (gentle departure).
        </p>
      </div>

      <div className="space-y-6">
        {[
          { name: 'ease-out (enter)', cssVar: '--motion-easing-enter', desc: 'Fast start, gentle landing', color: '#2563eb' },
          { name: 'ease-in (exit)', cssVar: '--motion-easing-exit', desc: 'Gentle start, fast exit', color: '#dc2626' },
          { name: 'ease-in-out (move)', cssVar: '--motion-easing-move', desc: 'Symmetric transform', color: '#16a34a' },
          { name: 'linear', cssVar: '--motion-easing-linear', desc: 'Constant speed, mechanical', color: '#9333ea' },
          { name: 'spring', cssVar: '--motion-easing-spring', desc: 'Playful overshoot', color: '#ea580c' },
        ].map(({ name, cssVar, desc, color }) => (
          <div key={name} className="flex items-center gap-gutter-md">
            <div className="w-40 type-label text-figure-primary">{name}</div>
            <div className="flex-1 h-12 rounded relative overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
              <div
                className="absolute w-8 h-8 rounded top-2 motion-demo-easing"
                style={{
                  backgroundColor: color,
                  animation: `slide-right 2s var(${cssVar}) infinite alternate`,
                }}
              />
            </div>
            <div className="w-48 type-caption text-figure-secondary">{desc}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide-right {
          from { left: 8px; }
          to { left: calc(100% - 40px); }
        }
        /* Force animation even with reduced motion for demo purposes */
        @media (prefers-reduced-motion: reduce) {
          .motion-demo-easing {
            animation-duration: 2s !important;
            animation-iteration-count: infinite !important;
          }
        }
      `}</style>
    </div>
  ),
};

/**
 * Interactive examples showing motion in common UI patterns.
 */
export const InteractiveExamples: Story = {
  render: function InteractiveDemo() {
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="space-y-12">
        <div>
          <h2 className="type-h3 text-figure-primary mb-stack-sm">Interactive Examples</h2>
          <p className="type-body-sm text-figure-secondary mb-stack-lg">
            Hover and click to see motion tokens in action.
          </p>
        </div>

        {/* Button Hover */}
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Button Hover (duration-fast, ease-default)</h3>
          <div className="flex gap-gutter-md">
            <button
              className="px-inset-lg py-inset-sm bg-action-primary text-figure-inverse rounded transition-hover hover:bg-action-primary-hover"
              onMouseEnter={() => setIsHovered('btn1')}
              onMouseLeave={() => setIsHovered(null)}
            >
              Primary Button
            </button>
            <button
              className="px-inset-lg py-inset-sm bg-ground-secondary text-figure-primary border border-border rounded transition-hover hover:bg-ground-tertiary hover:border-border-strong"
            >
              Secondary Button
            </button>
          </div>
          <p className="type-caption text-figure-muted">
            Uses <code className="font-code">transition-hover</code> preset
          </p>
        </div>

        {/* Card Lift */}
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Card Lift (duration-fast, ease-default)</h3>
          <div className="flex gap-gutter-lg">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-inset-lg bg-ground-primary border border-border rounded shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md"
                style={{
                  transition: 'transform var(--motion-duration-fast) var(--motion-easing-default), box-shadow var(--motion-duration-fast) var(--motion-easing-default)',
                }}
              >
                <p className="type-label text-figure-primary mb-stack-xs">Card {n}</p>
                <p className="type-caption text-figure-secondary">Hover to lift</p>
              </div>
            ))}
          </div>
          <p className="type-caption text-figure-muted">
            Uses <code className="font-code">duration-fast</code> + <code className="font-code">ease-default</code>
          </p>
        </div>

        {/* Accordion Expand */}
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Accordion (duration-normal, ease-move)</h3>
          <div className="max-w-md">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-inset-md bg-ground-secondary text-figure-primary rounded-t border border-border flex justify-between items-center transition-hover hover:bg-ground-tertiary"
            >
              <span className="type-label">Click to {isExpanded ? 'collapse' : 'expand'}</span>
              <span
                className="transition-transform duration-normal"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transitionTimingFunction: 'var(--motion-easing-move)'
                }}
              >
                ▼
              </span>
            </button>
            <div
              className="overflow-hidden transition-expand border-x border-b border-border rounded-b"
              style={{
                maxHeight: isExpanded ? '200px' : '0px',
              }}
            >
              <div className="p-inset-md bg-ground-primary">
                <p className="type-body-sm text-figure-secondary">
                  This content expands and collapses with the accordion.
                  The easing curve is symmetric (ease-in-out) because the
                  element is transforming in place, not entering or exiting.
                </p>
              </div>
            </div>
          </div>
          <p className="type-caption text-figure-muted">
            Uses <code className="font-code">transition-expand</code> preset with <code className="font-code">ease-move</code>
          </p>
        </div>

        {/* Focus Ring */}
        <div className="space-y-4">
          <h3 className="type-h4 text-figure-primary">Focus Ring (duration-fast, ease-default)</h3>
          <input
            type="text"
            placeholder="Tab to focus this input"
            className="w-full max-w-md px-inset-md py-inset-sm bg-ground-primary border border-border rounded transition-hover focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/20"
          />
          <p className="type-caption text-figure-muted">
            Focus states should be immediate but smooth
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Common motion patterns with their recommended duration and easing.
 */
export const Patterns: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">Motion Patterns</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Reference for common UI patterns and their recommended motion tokens.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="type-label text-figure-primary text-left p-inset-sm">Pattern</th>
              <th className="type-label text-figure-primary text-left p-inset-sm">Duration</th>
              <th className="type-label text-figure-primary text-left p-inset-sm">Easing</th>
              <th className="type-label text-figure-primary text-left p-inset-sm">Tailwind Classes</th>
            </tr>
          </thead>
          <tbody>
            {[
              { pattern: 'Hover color change', duration: 'fast', easing: 'default', classes: 'transition-hover' },
              { pattern: 'Focus ring appear', duration: 'fast', easing: 'default', classes: 'transition-hover' },
              { pattern: 'Dropdown open', duration: 'normal', easing: 'enter', classes: 'duration-normal ease-enter' },
              { pattern: 'Dropdown close', duration: 'fast', easing: 'exit', classes: 'duration-fast ease-exit' },
              { pattern: 'Modal enter', duration: 'slow', easing: 'enter', classes: 'transition-modal-enter' },
              { pattern: 'Modal exit', duration: 'normal', easing: 'exit', classes: 'transition-modal-exit' },
              { pattern: 'Tooltip appear', duration: 'normal', easing: 'default', classes: 'transition-fade' },
              { pattern: 'Card lift (hover)', duration: 'fast', easing: 'default', classes: 'transition-transform' },
              { pattern: 'Accordion expand', duration: 'normal', easing: 'move', classes: 'transition-expand' },
              { pattern: 'Page section reveal', duration: 'deliberate', easing: 'enter', classes: 'duration-deliberate ease-enter' },
            ].map(({ pattern, duration, easing, classes }) => (
              <tr key={pattern} className="border-b border-border-muted">
                <td className="type-body-sm text-figure-primary p-inset-sm">{pattern}</td>
                <td className="type-caption text-figure-secondary p-inset-sm">{duration}</td>
                <td className="type-caption text-figure-secondary p-inset-sm">{easing}</td>
                <td className="font-code type-caption text-figure-muted p-inset-sm">{classes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

/**
 * Things that should NOT be animated.
 */
export const AntiPatterns: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-sm">What We Don't Animate</h2>
        <p className="type-body-sm text-figure-secondary mb-stack-lg">
          Some things should remain instant and stable.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-gutter-lg">
        <div className="p-inset-lg bg-status-danger-bg border border-status-danger/30 rounded">
          <h3 className="type-h4 text-status-danger mb-stack-sm">Never Animate</h3>
          <ul className="space-y-2">
            <li className="type-body-sm text-figure-primary">Body text appearance</li>
            <li className="type-body-sm text-figure-primary">Core navigation</li>
            <li className="type-body-sm text-figure-primary">Error messages and warnings</li>
            <li className="type-body-sm text-figure-primary">Frequently repeated actions</li>
            <li className="type-body-sm text-figure-primary">Critical information</li>
          </ul>
        </div>

        <div className="p-inset-lg bg-status-success-bg border border-status-success/30 rounded">
          <h3 className="type-h4 text-status-success mb-stack-sm">Good Candidates</h3>
          <ul className="space-y-2">
            <li className="type-body-sm text-figure-primary">Hover and focus states</li>
            <li className="type-body-sm text-figure-primary">Modal/dialog entry</li>
            <li className="type-body-sm text-figure-primary">Accordion expand/collapse</li>
            <li className="type-body-sm text-figure-primary">Dropdown menus</li>
            <li className="type-body-sm text-figure-primary">Card interactions</li>
          </ul>
        </div>
      </div>

      <div className="p-inset-lg bg-ground-secondary rounded">
        <h3 className="type-h4 text-figure-primary mb-stack-sm">The Golden Rule</h3>
        <p className="type-body text-figure-secondary">
          "The best animation is the one you remove. If an interaction works without
          animation, question whether animation adds value."
        </p>
      </div>
    </div>
  ),
};

/**
 * Tailwind utility class reference for motion.
 */
export const TailwindUtilities: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="type-h3 text-figure-primary mb-stack-md">Motion Utilities</h2>
        <p className="type-body text-figure-secondary mb-stack-lg">
          Tailwind classes for duration and easing.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-gutter-lg">
        <div className="p-inset-md bg-ground-secondary rounded">
          <h3 className="type-h4 text-figure-primary mb-stack-sm">Duration Classes</h3>
          <div className="font-code type-caption space-y-1">
            <p>duration-instant</p>
            <p>duration-fast</p>
            <p>duration-normal</p>
            <p>duration-slow</p>
            <p>duration-deliberate</p>
            <p>duration-dramatic</p>
          </div>
        </div>

        <div className="p-inset-md bg-ground-secondary rounded">
          <h3 className="type-h4 text-figure-primary mb-stack-sm">Easing Classes</h3>
          <div className="font-code type-caption space-y-1">
            <p>ease-default (entering)</p>
            <p>ease-enter (entering)</p>
            <p>ease-exit (leaving)</p>
            <p>ease-move (transforming)</p>
            <p>ease-spring (playful)</p>
          </div>
        </div>

        <div className="p-inset-md bg-ground-secondary rounded col-span-2">
          <h3 className="type-h4 text-figure-primary mb-stack-sm">Transition Presets</h3>
          <div className="font-code type-caption space-y-1 grid grid-cols-2 gap-gutter-md">
            <p>transition-hover — colors (fast)</p>
            <p>transition-transform — transform, shadow (fast)</p>
            <p>transition-fade — opacity (normal)</p>
            <p>transition-expand — height, padding (normal)</p>
            <p>transition-modal-enter — opacity, transform (slow)</p>
            <p>transition-modal-exit — opacity, transform (normal)</p>
          </div>
        </div>
      </div>

      <div className="p-inset-lg bg-ground-secondary rounded">
        <h3 className="type-h4 text-figure-primary mb-stack-sm">Example Usage</h3>
        <div className="font-code type-caption bg-ground-primary p-inset-md rounded">
          <pre>{`// Button with hover transition
<button className="transition-hover hover:bg-action-primary-hover">

// Card with lift effect
<div className="transition-transform hover:-translate-y-1 hover:shadow-lg">

// Modal backdrop
<div className="transition-fade opacity-0 data-[open]:opacity-100">

// Custom combination
<div className="transition-all duration-normal ease-enter">`}</pre>
        </div>
      </div>
    </div>
  ),
};
