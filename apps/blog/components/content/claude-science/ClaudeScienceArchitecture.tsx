"use client";

import * as React from "react";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";
import ArchitectureDesktopSvg from "./svg/claude-science-architecture-desktop.svg";
import ArchitectureMobileSvg from "./svg/claude-science-architecture-mobile.svg";

// Essay colour grammar: three systems, one hue each.
const EXEC = "var(--color-data-1)";
const SUPER = "var(--color-text-secondary)";
const EVID = "var(--color-data-1)";
const QUERY = "var(--color-action-primary)";

const STEP_MS = 700;

// One query's life. The SVGs own the geometry and the motion paths; this
// controller only advances the semantic state exposed through data attributes.
const JOURNEY_NODES = [
  "daemon",
  "repl",
  "handoff",
  "python",
  "daemon",
  "mcp",
  "artifact",
  "reviewer",
] as const;
const CAPTIONS = [
  "A query arrives; the daemon takes authority.",
  "The daemon starts the control kernel to orchestrate.",
  "The control kernel writes a handoff file — shared cwd, not memory.",
  "The data kernel reads the file and runs the analysis.",
  "A privileged call returns across the host-call boundary to the daemon.",
  "The daemon calls an external connector.",
  "The daemon records the result as a versioned artifact.",
  "At a checkpoint, a read-only reviewer wakes to check it.",
];
const N_HOPS = CAPTIONS.length;

export function ClaudeScienceArchitecture() {
  const prefersReducedMotion = useReducedMotion();
  const [hop, setHop] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [runId, setRunId] = React.useState(0);

  React.useEffect(() => {
    if (!isPlaying) return;
    if (hop >= N_HOPS - 1) {
      const timer = window.setTimeout(() => setIsPlaying(false), STEP_MS);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setHop((h) => h + 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [isPlaying, hop]);

  const playFlow = () => {
    if (prefersReducedMotion || isPlaying) return;
    setRunId((r) => r + 1);
    setHop(0);
    setIsPlaying(true);
  };

  const active = isPlaying ? JOURNEY_NODES[hop] : undefined;
  const svgState = {
    "data-active": active,
    "data-hop": hop,
    "data-playing": isPlaying,
  } as const;

  return (
    <FigureScaffold
      eyebrow="Runtime architecture"
      title="One daemon, everything subordinate"
      description="Kernels compute and hand data off through files; the daemon owns authority, connectors, and durable evidence. Play to follow one query — hop by hop, always back through the daemon."
      caption={
        <>
          <strong>
            Figure B. Kernels hold state; the daemon owns authority and history.
          </strong>{" "}
          The control kernel and data kernels share a workspace, not memory;
          every privileged call crosses the host-call boundary; lineage is
          observed at runtime before it is reconstructed; the reviewer wakes on
          checkpoints. Roles are read from the local runtime and extracted daemon
          fragments.
        </>
      }
    >
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        {prefersReducedMotion ? (
          <span className="type-caption text-figure-muted">
            Static diagram (reduced motion).
          </span>
        ) : (
          <button
            type="button"
            className="min-h-11 border border-border px-3 py-2 type-label text-figure-primary transition-colors hover:bg-ground-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-wait disabled:text-figure-muted"
            onClick={playFlow}
            disabled={isPlaying}
          >
            {isPlaying ? "Tracing a query…" : "▶ Trace one query"}
          </button>
        )}
        <div
          className="flex flex-wrap gap-x-5 gap-y-2 type-caption text-figure-secondary"
          aria-label="Diagram notation"
        >
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: QUERY }}
              aria-hidden="true"
            />
            the query
          </span>
          {(
            [
              ["execution", EXEC],
              ["supervision", SUPER],
              ["evidence", EVID],
            ] as const
          ).map(([label, color]) => (
            <span key={label} className="inline-flex items-center gap-2">
              <span
                className="h-0 w-6 border-t-2"
                style={{ borderColor: color }}
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
          <span className="inline-flex items-center gap-2">
            <span
              className="h-0 w-6 border-t border-dashed border-border-strong"
              aria-hidden="true"
            />
            gated · fallback
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-0 w-6 border-t-2 border-dotted border-border-strong"
              aria-hidden="true"
            />
            event-triggered
          </span>
        </div>
      </div>

      <div className="mt-4 min-w-0 border-y border-border py-4">
        <ArchitectureDesktopSvg
          key={`desktop-${runId}`}
          {...svgState}
          className="hidden h-auto w-full md:block"
        />
        <ArchitectureMobileSvg
          key={`mobile-${runId}`}
          {...svgState}
          className="h-auto w-full md:hidden"
          aria-hidden="true"
        />
      </div>

      <p
        className="type-caption mt-3 border-l-2 border-action-primary pl-3 text-figure-secondary"
        aria-live="polite"
      >
        <span className="text-figure-muted">
          {hop + 1} / {N_HOPS}:
        </span>{" "}
        {CAPTIONS[hop]}
      </p>
    </FigureScaffold>
  );
}
