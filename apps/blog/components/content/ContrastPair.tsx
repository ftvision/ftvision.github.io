'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContrastPairProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Layout mode. `narrow` (default) shows both blocks side-by-side. `wide`
   * switches to a toggle: one block at a time, full reading-column width.
   * Use `wide` for dense content (numbered lists, multi-paragraph anecdotes)
   * where side-by-side columns become too narrow to read comfortably.
   */
  width?: 'narrow' | 'wide';
}

export interface ContrastBlockProps {
  /** Override the default label */
  label?: string;
  children: React.ReactNode;
  className?: string;
}

// Editorial OKLCH tones — desaturated, hue-anchored. Light + dark variants.
// The outer block sets `color`; the rule uses `border-current`, marker and
// label inherit. Body content explicitly resets to `text-figure-primary`.
const POSITIVE_TONE = cn(
  'text-[oklch(50%_0.09_145)]',
  '[[data-mode=dark]_&]:text-[oklch(72%_0.09_145)]'
);

const NEGATIVE_TONE = cn(
  'text-[oklch(48%_0.12_25)]',
  '[[data-mode=dark]_&]:text-[oklch(70%_0.10_25)]'
);

const POSITIVE_DEFAULT_LABEL = 'When it worked';
const NEGATIVE_DEFAULT_LABEL = "When it didn't";

type BlockKind = 'positive' | 'negative';

// In tabs mode, ContrastPair renders its children twice: once to gather
// triggers, once to show content. Children read this context to decide
// what to render. We cannot inspect children directly because
// `next-mdx-remote/rsc` wraps client components in React.lazy, so the
// element `type` field is an opaque lazy proxy — not the component.
interface ContrastContextValue {
  phase: 'trigger' | 'content';
  active: BlockKind;
  setActive: (kind: BlockKind) => void;
  registerTabRef: (kind: BlockKind, el: HTMLButtonElement | null) => void;
  onTabKeyDown: (
    e: React.KeyboardEvent<HTMLButtonElement>,
    kind: BlockKind
  ) => void;
}

const ContrastContext = React.createContext<ContrastContextValue | null>(null);

// ---------------------------------------------------------------------------
// Side-by-side rendering (default mode and the fallback when used outside
// a ContrastPair tabs context)
// ---------------------------------------------------------------------------

function ContrastBlockSideBySide({
  kind,
  label,
  children,
  className,
}: ContrastBlockProps & { kind: BlockKind }) {
  const tone = kind === 'positive' ? POSITIVE_TONE : NEGATIVE_TONE;
  const marker = kind === 'positive' ? '+' : '−';
  const defaultLabel =
    kind === 'positive' ? POSITIVE_DEFAULT_LABEL : NEGATIVE_DEFAULT_LABEL;

  return (
    <div className={cn('flex-1', tone, className)}>
      <div className="border-t border-current pt-3">
        <p className="type-overline mb-3 flex items-baseline gap-2">
          <span aria-hidden="true" className="font-medium not-italic">
            {marker}
          </span>
          <span>{label ?? defaultLabel}</span>
        </p>
        <div
          className={cn(
            'type-body text-figure-primary leading-relaxed',
            '[&>p:first-child]:mt-0 [&>p:last-child]:mb-0'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tabs rendering. Two phases driven by ContrastContext:
//   - 'trigger': render the button only (sits inside the parent's tablist)
//   - 'content': render the body only when this block is active
// ---------------------------------------------------------------------------

function ContrastBlockTabsTrigger({
  kind,
  label,
  ctx,
}: {
  kind: BlockKind;
  label?: string;
  ctx: ContrastContextValue;
}) {
  const tone = kind === 'positive' ? POSITIVE_TONE : NEGATIVE_TONE;
  const marker = kind === 'positive' ? '+' : '−';
  const defaultLabel =
    kind === 'positive' ? POSITIVE_DEFAULT_LABEL : NEGATIVE_DEFAULT_LABEL;
  const isActive = ctx.active === kind;

  return (
    <button
      ref={(el) => ctx.registerTabRef(kind, el)}
      type="button"
      role="tab"
      id={`contrast-tab-${kind}`}
      aria-selected={isActive}
      aria-controls={`contrast-panel-${kind}`}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => ctx.setActive(kind)}
      onKeyDown={(e) => ctx.onTabKeyDown(e, kind)}
      className={cn(
        'flex-1 text-left',
        'border-t pt-3 pb-1',
        'transition-colors duration-fast',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2',
        'cursor-pointer',
        isActive
          ? cn(tone, 'border-current')
          : 'border-border-subtle text-figure-muted hover:text-figure-secondary'
      )}
    >
      <span className="type-overline flex items-baseline gap-2">
        <span aria-hidden="true" className="font-medium not-italic">
          {marker}
        </span>
        <span>{label ?? defaultLabel}</span>
      </span>
    </button>
  );
}

function ContrastBlockTabsContent({
  kind,
  children,
  ctx,
}: {
  kind: BlockKind;
  children: React.ReactNode;
  ctx: ContrastContextValue;
}) {
  if (ctx.active !== kind) return null;
  return (
    <div
      role="tabpanel"
      id={`contrast-panel-${kind}`}
      aria-labelledby={`contrast-tab-${kind}`}
      tabIndex={0}
      className={cn(
        'type-body text-figure-primary leading-relaxed',
        'focus-visible:outline-none',
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0'
      )}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public components
// ---------------------------------------------------------------------------

function ContrastBlock({
  kind,
  label,
  children,
  className,
}: ContrastBlockProps & { kind: BlockKind }) {
  const ctx = React.useContext(ContrastContext);

  if (!ctx) {
    return (
      <ContrastBlockSideBySide kind={kind} label={label} className={className}>
        {children}
      </ContrastBlockSideBySide>
    );
  }

  if (ctx.phase === 'trigger') {
    return <ContrastBlockTabsTrigger kind={kind} label={label} ctx={ctx} />;
  }

  return (
    <ContrastBlockTabsContent kind={kind} ctx={ctx}>
      {children}
    </ContrastBlockTabsContent>
  );
}

/**
 * Paired example for "when it worked" / "when it didn't" anecdotes.
 *
 * Two presentations:
 * - `width="narrow"` (default): blocks side-by-side on desktop, stacked on
 *   mobile. Each block has a thin hairline rule, an uppercase label with a
 *   small typographic marker, and body content.
 * - `width="wide"`: blocks rendered as a toggle. One block at a time, full
 *   column width. The active tab takes the tone color; inactive is muted.
 *   Use for dense content where side-by-side columns become too narrow.
 *
 * Usage in MDX:
 * ```mdx
 * <ContrastPair>
 *   <ContrastPositive>...</ContrastPositive>
 *   <ContrastNegative>...</ContrastNegative>
 * </ContrastPair>
 *
 * <ContrastPair width="wide">
 *   <ContrastPositive label="长处">
 *     1. ...
 *     2. ...
 *   </ContrastPositive>
 *   <ContrastNegative label="短处">...</ContrastNegative>
 * </ContrastPair>
 * ```
 */
export function ContrastPair({
  children,
  className,
  width = 'narrow',
}: ContrastPairProps) {
  if (width === 'wide') {
    return (
      <ContrastTabsLayout className={className}>{children}</ContrastTabsLayout>
    );
  }

  return (
    <div
      className={cn(
        'my-8',
        'flex flex-col gap-6',
        'md:flex-row md:gap-8',
        className
      )}
    >
      {children}
    </div>
  );
}

function ContrastTabsLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = React.useState<BlockKind>('positive');
  const tabRefs = React.useRef<Record<BlockKind, HTMLButtonElement | null>>({
    positive: null,
    negative: null,
  });

  const registerTabRef = React.useCallback(
    (kind: BlockKind, el: HTMLButtonElement | null) => {
      tabRefs.current[kind] = el;
    },
    []
  );

  const onTabKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, kind: BlockKind) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const next: BlockKind = kind === 'positive' ? 'negative' : 'positive';
      setActive(next);
      tabRefs.current[next]?.focus();
    },
    []
  );

  const triggerCtx: ContrastContextValue = React.useMemo(
    () => ({
      phase: 'trigger',
      active,
      setActive,
      registerTabRef,
      onTabKeyDown,
    }),
    [active, registerTabRef, onTabKeyDown]
  );

  const contentCtx: ContrastContextValue = React.useMemo(
    () => ({
      phase: 'content',
      active,
      setActive,
      registerTabRef,
      onTabKeyDown,
    }),
    [active, registerTabRef, onTabKeyDown]
  );

  return (
    <div className={cn('my-8', className)}>
      <div role="tablist" className="flex gap-6 mb-4">
        <ContrastContext.Provider value={triggerCtx}>
          {children}
        </ContrastContext.Provider>
      </div>
      <ContrastContext.Provider value={contentCtx}>
        {children}
      </ContrastContext.Provider>
    </div>
  );
}

export function ContrastPositive({
  label,
  children,
  className,
}: ContrastBlockProps) {
  return (
    <ContrastBlock kind="positive" label={label} className={className}>
      {children}
    </ContrastBlock>
  );
}

export function ContrastNegative({
  label,
  children,
  className,
}: ContrastBlockProps) {
  return (
    <ContrastBlock kind="negative" label={label} className={className}>
      {children}
    </ContrastBlock>
  );
}
