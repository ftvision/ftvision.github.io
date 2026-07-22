"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FigureScaffold } from "./FigureScaffold";
import ArtifactLineageSvg from "./svg/artifact-lineage.svg";

/**
 * Figure 6 — "Artifact lineage" (observed-vs-reconstructed toggle).
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

const MODES = [
  { id: "runtime", label: "As runtime observed" },
  { id: "full", label: "After reconstruction" },
] as const;

type Mode = (typeof MODES)[number]["id"];

export function ArtifactLineageExplorer() {
  const [mode, setMode] = React.useState<Mode>("full");
  const showRecon = mode === "full";

  return (
    <FigureScaffold
      eyebrow="Lineage · observed vs reconstructed"
      title="How each dependency is known"
      description="Runtime observation catches inputs a cell reads through supported paths. Post-hoc reconstruction can add dependencies it missed. Toggle between the runtime record and the graph after reconstruction."
      caption="Figure 6. Real lineage of one deliverable; the same split holds for all five in the run. The estimates file the cell read is observed; the raw JSON it never opened is reconstructed."
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
        <p
          className="type-caption m-0 mt-2 text-figure-muted"
          aria-live="polite"
        >
          {showRecon
            ? "The daemon inferred the raw-data dependency the cell never read directly."
            : "Runtime captured only the estimates file the cell actually read."}
        </p>
      </div>

      <div className="min-w-0 overflow-x-auto border-t border-border pt-5">
        <ArtifactLineageSvg
          data-mode={mode}
          className="block h-auto w-full min-w-[560px]"
        />
      </div>
    </FigureScaffold>
  );
}
