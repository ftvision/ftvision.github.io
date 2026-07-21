"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FigureScaffold } from "./FigureScaffold";

/**
 * Figure E — "Artifact lineage" (redesigned, observed-vs-reconstructed toggle).
 *
 * A real deliverable's dependency edges, split by how each one is known. The
 * split is real, not illustrative: it comes from the recorded dependency-mapping
 * consensus for this artifact version. The report was built from the estimates
 * table its cell read directly (observed; recorded consensus "both") and the raw
 * JSON the cell never opened (reconstructed; the daemon's post-hoc inference,
 * recorded consensus "haiku_only"). Its own v1 is the parent version.
 *
 * The toggle is the point. "As runtime observed it" shows only the edge a wrapped
 * read captured; "after reconstruction" adds the inferred edge the daemon filled
 * in. That is the essay's observed-before-reconstructed, made live on real data.
 * Every deliverable in this run shows the same split.
 */

const EVID = "var(--color-data-1)"; // evidence / lineage
const NEUTRAL = "var(--color-text-muted)";
const tint = (c: string) => `color-mix(in srgb, ${c} 14%, var(--color-bg-primary))`;

const MODES = [
  { id: "runtime", label: "As runtime observed" },
  { id: "full", label: "After reconstruction" },
] as const;

type Mode = (typeof MODES)[number]["id"];

export function ArtifactLineageExplorer() {
  const [mode, setMode] = React.useState<Mode>("full");
  const baseId = React.useId().replace(/:/g, "");
  const showRecon = mode === "full";

  return (
    <FigureScaffold
      eyebrow="Lineage · observed vs reconstructed"
      title="How each dependency is known"
      description="Runtime observation catches inputs a cell reads through supported paths. Post-hoc reconstruction can add dependencies it missed. Toggle between the runtime record and the graph after reconstruction."
      caption="Figure E. Real lineage of one deliverable; the same split holds for all five in the run. The estimates file the cell read is observed; the raw JSON it never opened is reconstructed."
    >
      <div className="mb-4">
        <div
          role="group"
          aria-label="Lineage view"
          className="inline-flex flex-wrap gap-1 rounded-[6px] border border-border bg-ground-secondary p-1"
        >
          {MODES.map((m) => {
            const isActive = m.id === mode;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setMode(m.id)}
                className={cn(
                  "rounded-[4px] px-3 py-1.5 font-sans text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-1 motion-reduce:transition-none",
                  isActive
                    ? "bg-ground-primary text-figure-primary shadow-sm"
                    : "text-figure-secondary hover:text-figure-primary",
                )}
              >
                {m.label}
              </button>
            );
          })}
        </div>
        <p className="type-caption m-0 mt-2 text-figure-muted" aria-live="polite">
          {showRecon
            ? "The daemon inferred the raw-data dependency the cell never read directly."
            : "Runtime captured only the estimates file the cell actually read."}
        </p>
      </div>

      <div className="min-w-0 overflow-x-auto border-t border-border pt-5">
        <svg
          viewBox="0 0 720 258"
          role="img"
          aria-labelledby={`${baseId}-t`}
          className="block h-auto w-full min-w-[560px]"
        >
          <title id={`${baseId}-t`}>
            The report was built from the estimates table (observed, drawn solid)
            and the raw JSON (reconstructed, drawn dashed, shown only after
            reconstruction). Its own v1 is the parent version.
          </title>
          <defs>
            <marker id={`${baseId}-obs`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M1 1 L8 5 L1 9" fill="none" stroke={EVID} strokeWidth="1.6" />
            </marker>
            <marker id={`${baseId}-mut`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M1 1 L8 5 L1 9" fill="none" stroke={NEUTRAL} strokeWidth="1.6" />
            </marker>
            <marker id={`${baseId}-par`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M1 1 L8 5 L1 9" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.6" />
            </marker>
          </defs>

          {/* observed edge: estimates -> report (always shown) */}
          <path
            d="M226 85 C 372 85, 356 127, 488 127"
            fill="none"
            stroke={EVID}
            strokeWidth="1.8"
            markerEnd={`url(#${baseId}-obs)`}
          >
            <title>Observed — the analysis cell read this file directly at runtime.</title>
          </path>
          <text x="330" y="78" fontSize="9.5" fontStyle="italic" fill={NEUTRAL} textAnchor="middle">observed</text>

          {/* reconstructed edge: unparsed -> report (only after reconstruction) */}
          <g style={{ opacity: showRecon ? 1 : 0, transition: "opacity .3s ease" }} aria-hidden={!showRecon}>
            <path
              d="M226 199 C 372 199, 360 147, 488 147"
              fill="none"
              stroke={NEUTRAL}
              strokeWidth="1.6"
              strokeDasharray="5 4"
              markerEnd={`url(#${baseId}-mut)`}
            >
              <title>Reconstructed — inferred after the run; the cell never read the raw JSON directly.</title>
            </path>
            <text x="330" y="206" fontSize="9.5" fontStyle="italic" fill={NEUTRAL} textAnchor="middle">reconstructed</text>
          </g>

          {/* parent edge: report v1 -> v2 */}
          <path d="M599 74 L599 100" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.4" strokeDasharray="2 3" markerEnd={`url(#${baseId}-par)`}>
            <title>Parent version — v2 is a revision of v1.</title>
          </path>
          <text x="611" y="90" fontSize="9" fill="var(--color-text-secondary)">revised from v1</text>

          {/* observed input node */}
          <rect x="16" y="62" width="210" height="46" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth="1.4" />
          <text x="30" y="82" fontSize="11" fontWeight="600" fill="var(--color-text-primary)">heritability_estimates.csv</text>
          <text x="30" y="98" fontSize="9.5" fill="var(--color-text-secondary)">v1 · read by the cell</text>

          {/* reconstructed input node (dimmed until reconstruction links it) */}
          <g style={{ opacity: showRecon ? 1 : 0.4, transition: "opacity .3s ease" }}>
            <rect x="16" y="176" width="210" height="46" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth="1.4" strokeDasharray={showRecon ? undefined : "4 3"} />
            <text x="30" y="196" fontSize="11" fontWeight="600" fill="var(--color-text-primary)">unparsed.json</text>
            <text x="30" y="212" fontSize="9.5" fill="var(--color-text-secondary)">v1 · raw data, never read directly</text>
          </g>

          {/* parent node */}
          <rect x="490" y="44" width="222" height="30" rx="8" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.2" opacity="0.55" />
          <text x="504" y="63" fontSize="9.5" fill="var(--color-text-secondary)">report.md v1 · previous draft</text>

          {/* deliverable node */}
          <rect x="490" y="100" width="222" height="58" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth="2" />
          <text x="504" y="123" fontSize="10.5" fontWeight="600" fill="var(--color-text-primary)">pet_genetics_heritability</text>
          <text x="504" y="138" fontSize="10.5" fontWeight="600" fill="var(--color-text-primary)">_report.md</text>
          <text x="504" y="153" fontSize="9.5" fill="var(--color-text-secondary)">v2 · the deliverable</text>

          {/* legend */}
          <g transform="translate(16 244)">
            <line x1="0" y1="0" x2="28" y2="0" stroke={EVID} strokeWidth="1.8" />
            <text x="34" y="4" fontSize="9.5" fill="var(--color-text-secondary)">observed</text>
            <line x1="120" y1="0" x2="148" y2="0" stroke={NEUTRAL} strokeWidth="1.6" strokeDasharray="5 4" />
            <text x="154" y="4" fontSize="9.5" fill="var(--color-text-secondary)">reconstructed</text>
            <line x1="264" y1="0" x2="292" y2="0" stroke="var(--color-border-strong)" strokeWidth="1.4" strokeDasharray="2 3" />
            <text x="298" y="4" fontSize="9.5" fill="var(--color-text-secondary)">parent version</text>
          </g>
        </svg>
      </div>
    </FigureScaffold>
  );
}
