'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type ReadingPass = 'full' | 'argument' | 'spine';

export type ReadingPassCopy = {
  label: string;
  time: string;
  summary: string;
};

interface ReadingDepthContextValue {
  activePass: ReadingPass;
  setActivePass: (pass: ReadingPass) => void;
}

const ReadingDepthContext = React.createContext<ReadingDepthContextValue | null>(
  null
);

const PASS_COPY: Record<ReadingPass, ReadingPassCopy> = {
  full: {
    label: 'Full',
    time: '45 min',
    summary: 'Complete essay, examples, notes, and source detail.',
  },
  argument: {
    label: 'Argument',
    time: '15 min',
    summary: 'Load-bearing passages, examples, and consequences.',
  },
  spine: {
    label: 'Spine',
    time: '5 min',
    summary: 'Opening claim and section list.',
  },
};

export interface ReadingDepthProps {
  children: React.ReactNode;
  className?: string;
  defaultPass?: ReadingPass;
  heading?: string;
  ariaLabel?: string;
  passCopy?: Partial<Record<ReadingPass, Partial<ReadingPassCopy>>>;
  storageKey?: string;
}

export interface PassContentProps {
  pass: ReadingPass;
  children: React.ReactNode;
  className?: string;
}

export interface ReadingDepthPointProps {
  number?: number | string;
  title: string;
  claim: string;
  explanation: string;
  example?: string;
  takeaway?: string;
  className?: string;
}

export interface ReadingDepthExcerptProps {
  number?: number | string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface ReadingDepthListProps {
  items: string[];
  className?: string;
}

function useReadingDepth() {
  const context = React.useContext(ReadingDepthContext);
  if (!context) {
    throw new Error('ReadingDepth components must be used inside ReadingDepth.');
  }
  return context;
}

export function ReadingDepth({
  children,
  className,
  defaultPass = 'full',
  heading = 'Reading depth',
  ariaLabel,
  passCopy,
  storageKey,
}: ReadingDepthProps) {
  const [activePass, setActivePassState] = React.useState<ReadingPass>(defaultPass);
  const copy = React.useMemo(
    () => ({
      full: { ...PASS_COPY.full, ...passCopy?.full },
      argument: { ...PASS_COPY.argument, ...passCopy?.argument },
      spine: { ...PASS_COPY.spine, ...passCopy?.spine },
    }),
    [passCopy]
  );

  React.useEffect(() => {
    if (!storageKey) return;
    const storedPass = window.localStorage.getItem(storageKey);
    if (
      storedPass === 'full' ||
      storedPass === 'argument' ||
      storedPass === 'spine'
    ) {
      setActivePassState(storedPass);
    }
  }, [storageKey]);

  const setActivePass = React.useCallback(
    (pass: ReadingPass) => {
      setActivePassState(pass);
      if (storageKey) {
        window.localStorage.setItem(storageKey, pass);
      }
    },
    [storageKey]
  );

  const value = React.useMemo(
    () => ({ activePass, setActivePass }),
    [activePass, setActivePass]
  );

  React.useEffect(() => {
    document.documentElement.dataset.readingPass = activePass;
    return () => {
      delete document.documentElement.dataset.readingPass;
    };
  }, [activePass]);

  return (
    <ReadingDepthContext.Provider value={value}>
      <section className={cn('reading-depth my-8', className)}>
        <div className="sticky top-4 z-10 mb-8 border border-border bg-ground-primary/95 p-3 shadow-sm backdrop-blur">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="type-overline text-figure-muted">{heading}</p>
              <p className="mt-1 text-body-sm text-figure-secondary">
                {copy[activePass].summary}
              </p>
            </div>
            <p className="text-caption text-figure-muted">
              {copy[activePass].time}
            </p>
          </div>

          <div
            className="grid grid-cols-3 gap-1 border border-border bg-ground-secondary p-1"
            role="tablist"
            aria-label={ariaLabel ?? heading}
          >
            {(['spine', 'argument', 'full'] as ReadingPass[]).map((pass) => {
              const isActive = activePass === pass;
              return (
                <button
                  key={pass}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActivePass(pass)}
                  className={cn(
                    'min-h-10 px-3 py-2 text-left transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-link',
                    isActive
                      ? 'bg-ground-primary text-figure-primary shadow-sm'
                      : 'text-figure-muted hover:bg-ground-primary hover:text-figure-primary'
                  )}
                >
                  <span className="block text-label font-semibold">
                    {copy[pass].label}
                  </span>
                  <span className="block text-caption">{copy[pass].time}</span>
                </button>
              );
            })}
          </div>
        </div>

        {children}
      </section>
    </ReadingDepthContext.Provider>
  );
}

export function PassContent({ pass, children, className }: PassContentProps) {
  const { activePass } = useReadingDepth();
  const isActive = activePass === pass;

  return (
    <div
      hidden={!isActive}
      data-reading-pass-content={pass}
      className={cn('reading-depth-pass', className)}
    >
      {children}
    </div>
  );
}

export function ReadingDepthPoint({
  number,
  title,
  claim,
  explanation,
  example,
  takeaway,
  className,
}: ReadingDepthPointProps) {
  return (
    <article className={cn('border-t border-border py-5 first:border-t-0', className)}>
      <div className="mb-3 flex gap-3">
        {number !== undefined && (
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-border text-caption font-semibold text-figure-secondary">
            {number}
          </span>
        )}
        <div
          role="heading"
          aria-level={3}
          className="m-0 text-body-lg font-semibold leading-snug text-figure-primary"
        >
          {title}
        </div>
      </div>
      <div className="space-y-3 pl-10">
        <p className="m-0 text-body-sm leading-relaxed text-figure-primary">
          <span className="font-semibold">Claim: </span>
          {claim}
        </p>
        <p className="m-0 text-body-sm leading-relaxed text-figure-secondary">
          <span className="font-semibold text-figure-primary">Reason: </span>
          {explanation}
        </p>
        {example ? (
          <p className="m-0 text-body-sm leading-relaxed text-figure-secondary">
            <span className="font-semibold text-figure-primary">Example: </span>
            {example}
          </p>
        ) : null}
        {takeaway ? (
          <p className="m-0 border-l border-border pl-3 text-body-sm leading-relaxed text-figure-primary">
            {takeaway}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function ReadingDepthExcerpt({
  number,
  title,
  children,
  className,
}: ReadingDepthExcerptProps) {
  return (
    <article className={cn('border-t border-border py-6 first:border-t-0', className)}>
      <div className="mb-3 flex gap-3">
        {number !== undefined && (
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-border text-caption font-semibold text-figure-secondary">
            {number}
          </span>
        )}
        <div
          role="heading"
          aria-level={3}
          className="m-0 text-body-lg font-semibold leading-snug text-figure-primary"
        >
          {title}
        </div>
      </div>
      <div className="space-y-3 pl-10 text-figure-secondary [&>p]:m-0 [&>p]:text-body-sm [&>p]:leading-relaxed">
        {children}
      </div>
    </article>
  );
}

export function ReadingDepthList({ items, className }: ReadingDepthListProps) {
  return (
    <div role="list" className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <div key={`${index}-${item}`} role="listitem" className="flex gap-3">
          <span className="shrink-0 text-figure-muted">{index + 1}.</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
