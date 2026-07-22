"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface FigureScaffoldProps {
  eyebrow: string;
  title: string;
  description: string;
  caption: React.ReactNode;
  captionZh?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FigureScaffold({
  eyebrow,
  title,
  description,
  caption,
  captionZh,
  children,
  className,
}: FigureScaffoldProps) {
  const { language } = useLanguage();

  return (
    <figure aria-label={title} className={cn("my-10 min-w-0", className)}>
      <div className="border-y border-border py-5 sm:py-6">
        <header className="grid gap-3 border-b border-border pb-5 md:grid-cols-[minmax(0,0.85fr)_minmax(18rem,1.15fr)] md:items-end md:gap-8">
          <div className="min-w-0">
            <p className="type-overline mb-2 text-action-primary">{eyebrow}</p>
            <h3 className="type-h3 text-figure-primary">{title}</h3>
          </div>
          <p className="type-body-sm m-0 max-w-2xl text-figure-secondary">
            {description}
          </p>
        </header>
        <div className="min-w-0 pt-5 sm:pt-6">{children}</div>
      </div>
      <figcaption className="type-caption mt-3 max-w-3xl text-figure-muted">
        {language === "zh" && captionZh ? captionZh : caption}
      </figcaption>
    </figure>
  );
}

interface DiagramNodeProps {
  label: string;
  title: string;
  children?: React.ReactNode;
  accent?: string;
  className?: string;
  muted?: boolean;
}

export function DiagramNode({
  label,
  title,
  children,
  accent = "var(--color-data-1)",
  className,
  muted = false,
}: DiagramNodeProps) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-[4px] border border-border border-l-2 bg-ground-primary p-3 sm:p-4",
        muted && "border-dashed bg-ground-secondary text-figure-muted",
        className,
      )}
      style={{ borderLeftColor: accent }}
    >
      <p className="type-overline mb-1 text-figure-muted">{label}</p>
      <p className="type-label m-0 break-words text-figure-primary">{title}</p>
      {children ? (
        <div className="type-caption mt-2 text-figure-secondary">
          {children}
        </div>
      ) : null}
    </div>
  );
}

interface FlowConnectorProps {
  label?: string;
  direction?: "horizontal" | "vertical";
}

export function FlowConnector({
  label,
  direction = "horizontal",
}: FlowConnectorProps) {
  if (direction === "vertical") {
    return (
      <div
        aria-hidden="true"
        className="flex min-h-8 flex-col items-center justify-center text-figure-muted"
      >
        <span className="h-5 border-l border-border-strong" />
        <span className="type-caption mt-1">{label ?? "v"}</span>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex min-h-8 items-center justify-center gap-1 text-figure-muted"
    >
      {label ? (
        <span className="type-caption hidden xl:inline">{label}</span>
      ) : null}
      <span className="type-label">-&gt;</span>
    </div>
  );
}

export function InlineCodeLabel({ children }: { children: React.ReactNode }) {
  return (
    <code className="break-all rounded-[3px] bg-ground-tertiary px-1.5 py-0.5 font-code text-[0.75rem] leading-5 text-figure-primary">
      {children}
    </code>
  );
}
