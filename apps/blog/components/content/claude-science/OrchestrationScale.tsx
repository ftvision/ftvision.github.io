"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";

/**
 * Figure C — "Code as orchestration".
 *
 * The single idea: one cell of code collapses N operations into a flat model
 * transcript. A coded loop issues N governed round trips (to a connector or a
 * model, across the daemon) from inside a persistent kernel, while the model's
 * transcript only ever records ~2 tool calls and the working set (papers,
 * genes) stays in the kernel. Discrete tool use spends one call/result pair per
 * item, so its context grows with N.
 *
 * Two shipped scenarios the reader switches between:
 *   - Literature sweep (literature-review skill): search_openalex +
 *     expand_citations fill a kernel table with ~240 papers; a host.llm() loop
 *     triages each; matplotlib draws. Two python cells.
 *   - CRISPR annotation: a repl cell loops host.mcp over gene ids into one
 *     ./handoff file; a python cell loads the matrix and computes enrichment.
 *     One repl cell, one python cell.
 */

type ScenarioId = "lit" | "crispr";
type CellKind = "python" | "repl";

interface CodeCell {
  kind: CellKind;
  label: string;
  code: string;
}

interface Scenario {
  tab: string;
  blurb: string;
  kernelLabel: string;
  loopGlyph: string;
  workingSet: string;
  connectorOverline: string;
  connectorTitle: string;
  connectorSub: string;
  roundTrips: string;
  flow: string[];
  cells: CodeCell[];
  discreteTag: string;
}

// The three systems of the essay's visual grammar.
const EXEC = "var(--color-data-1)"; // execution / kernels
const GOVERN = "var(--color-data-3)"; // daemon authority
const EVIDENCE = "var(--color-data-5)"; // durable data / handoff
const IDLE = "var(--color-border-muted)";

// How many loop iterations the diagram draws. The label carries the true
// magnitude (hundreds of papers, every gene); the marks are a representative
// sample of a much longer loop.
const LOOP_TICKS = 9;

const SCENARIOS: Record<ScenarioId, Scenario> = {
  lit: {
    tab: "Literature sweep",
    blurb:
      "search_openalex and expand_citations fill a kernel table with ~240 papers; a host.llm() loop scores each abstract and pulls its effect. Two python cells.",
    kernelLabel: "persistent python kernel",
    loopGlyph: "for p in papers:",
    workingSet: "candidates table · ~240 rows",
    connectorOverline: "MODEL · VIA DAEMON",
    connectorTitle: "host.llm(rubric, p)",
    connectorSub: "score + extract the effect",
    roundTrips: "≈ 240 host.llm() round trips",
    flow: ["OpenAlex sweep", "kernel table", "host.llm ×N", "matplotlib", "effects.png"],
    cells: [
      {
        kind: "python",
        label: "retrieve + triage, one kernel",
        code: `papers = search_openalex(query, n=25)
for seed in papers[:3]:
    g = expand_citations(seed["doi"])
    papers += g["references"] + g["cited_by"]
for p in papers:                    # ~240 candidates
    p["score"], p["effect"] = host.llm(rubric, p)`,
      },
      {
        kind: "python",
        label: "draw from the same live namespace",
        code: `keep = [p for p in papers if p["score"] >= 0.7]
plt.scatter([p["year"] for p in keep],
            [p["effect"] for p in keep])
plt.savefig("effects.png")          # -> artifact`,
      },
    ],
    discreteTag: "× ~240 candidates",
  },
  crispr: {
    tab: "CRISPR annotation",
    blurb:
      "A repl cell calls host.mcp once per gene into one ./handoff file; a python cell loads the user's matrix and computes enrichment. One repl cell, one python cell.",
    kernelLabel: "control repl kernel",
    loopGlyph: "for g in gene_ids:",
    workingSet: "gene ids + annotation rows",
    connectorOverline: "CONNECTOR · VIA DAEMON",
    connectorTitle: 'host.mcp("bio", "annotate")',
    connectorSub: "one governed call per gene",
    roundTrips: "one host.mcp() call per gene",
    flow: ["gene ids", "host.mcp ×N", "handoff.json", "enrich()", "enrichment.parquet"],
    cells: [
      {
        kind: "repl",
        label: "loop the connector, write one handoff",
        code: `import json
rows = [host.mcp("bio", "annotate", {"gene": g})
        for g in gene_ids]          # one call per gene
json.dump(rows,
          open("./handoff/gene_annotations.json", "w"))`,
      },
      {
        kind: "python",
        label: "load matrix + handoff, enrich",
        code: `mat = pd.read_parquet(user_matrix)
ann = json.load(open("./handoff/gene_annotations.json"))
hits = enrich(mat, ann)             # per-pathway
hits.to_parquet("./outputs/enrichment.parquet")`,
      },
    ],
    discreteTag: "× N genes",
  },
};

const ORDER: ScenarioId[] = ["lit", "crispr"];

const KIND_ACCENT: Record<CellKind, string> = {
  python: EXEC,
  repl: GOVERN,
};

function ScenarioTabs({
  scenario,
  onSelect,
}: {
  scenario: ScenarioId;
  onSelect: (id: ScenarioId) => void;
}) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % ORDER.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + ORDER.length) % ORDER.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = ORDER.length - 1;
    }
    if (next === null) return;
    event.preventDefault();
    onSelect(ORDER[next]);
    refs.current[next]?.focus();
  }

  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="tablist"
        aria-label="Shipped scenario"
        className="inline-flex flex-wrap gap-1 rounded-[6px] border border-border bg-ground-secondary p-1"
      >
        {ORDER.map((id, index) => {
          const isActive = id === scenario;
          return (
            <button
              key={id}
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "rounded-[4px] px-3 py-1.5 font-sans text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-1 motion-reduce:transition-none",
                isActive
                  ? "bg-ground-primary text-figure-primary shadow-sm"
                  : "text-figure-secondary hover:text-figure-primary",
              )}
            >
              {SCENARIOS[id].tab}
            </button>
          );
        })}
      </div>
      <p className="type-caption m-0 text-figure-muted">
        Both cost 2 tool calls in the transcript.
      </p>
    </div>
  );
}

function CodeCells({ scenario }: { scenario: ScenarioId }) {
  const s = SCENARIOS[scenario];
  return (
    <section aria-label="The two tool calls the model emits">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="type-overline m-0 text-figure-muted">
          What the model emits
        </p>
        <p className="type-caption m-0 text-figure-secondary">
          the whole sweep, 2 tool calls
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {s.cells.map((cell, index) => (
          <div
            key={cell.label}
            className="min-w-0 overflow-hidden rounded-[4px] border border-l-2 border-border bg-ground-primary"
            style={{ borderLeftColor: KIND_ACCENT[cell.kind] }}
          >
            <div className="flex items-baseline justify-between gap-2 border-b border-border px-3 py-2">
              <p className="type-overline m-0 text-figure-secondary">
                <span
                  className="font-code"
                  style={{ color: KIND_ACCENT[cell.kind] }}
                >
                  {cell.kind}
                </span>{" "}
                · cell {index + 1}
              </p>
              <p className="type-caption m-0 truncate text-figure-muted">
                {cell.label}
              </p>
            </div>
            <pre className="type-caption m-0 overflow-x-auto whitespace-pre p-3 font-code leading-5 text-figure-primary">
              <code>{cell.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
}

function DataflowStrip({ scenario }: { scenario: ScenarioId }) {
  const s = SCENARIOS[scenario];
  return (
    <div
      className="flex flex-wrap items-center gap-x-1.5 gap-y-2"
      aria-label="Dataflow for the selected scenario"
    >
      <span className="type-overline mr-1 text-figure-muted">lineage</span>
      {s.flow.map((step, index) => {
        const isLast = index === s.flow.length - 1;
        return (
          <React.Fragment key={step}>
            <span
              className="type-caption rounded-[3px] border border-border bg-ground-secondary px-2 py-0.5 font-code text-figure-secondary"
              style={
                isLast
                  ? {
                      borderColor: EVIDENCE,
                      color: "var(--color-text-primary)",
                    }
                  : undefined
              }
            >
              {step}
            </span>
            {!isLast ? (
              <span aria-hidden="true" className="type-caption text-figure-muted">
                &rarr;
              </span>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function DesktopFanout({
  scenario,
  progress,
  markerId,
  titleId,
  descriptionId,
}: {
  scenario: ScenarioId;
  progress: number;
  markerId: string;
  titleId: string;
  descriptionId: string;
}) {
  const s = SCENARIOS[scenario];

  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      viewBox="0 0 760 224"
      className="hidden h-auto w-full md:block"
    >
      <title id={titleId}>
        One code cell fans out into N governed round trips
      </title>
      <desc id={descriptionId}>
        A persistent kernel on the left holds the working set and runs a loop.
        Solid arrows cross a double-ruled daemon authority boundary to a
        connector or model on the right and return, once per iteration. A row of
        marks tallies the governed round trips. The working set never leaves the
        kernel.
      </desc>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-text-muted)" />
        </marker>
      </defs>

      <g aria-hidden="true">
        {/* Persistent kernel (execution) */}
        <rect
          x="14"
          y="26"
          width="250"
          height="158"
          rx="5"
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-default)"
        />
        <line x1="17" y1="30" x2="17" y2="180" stroke={EXEC} strokeWidth="2.5" />
        <text
          x="34"
          y="50"
          fill="var(--color-text-muted)"
          fontSize="10.5"
          letterSpacing="0.4"
        >
          {s.kernelLabel.toUpperCase()}
        </text>
        <text
          x="34"
          y="79"
          fill="var(--color-text-primary)"
          fontSize="13"
          fontFamily="monospace"
        >
          {s.loopGlyph}
        </text>
        <rect
          x="32"
          y="92"
          width="216"
          height="66"
          rx="4"
          fill="var(--color-surface-code)"
          stroke="var(--color-border-muted)"
        />
        <text x="44" y="112" fill="var(--color-text-muted)" fontSize="9.5">
          WORKING SET
        </text>
        <text x="44" y="130" fill="var(--color-text-primary)" fontSize="11.5">
          {s.workingSet}
        </text>
        <text x="44" y="147" fill={EVIDENCE} fontSize="10">
          stays in the kernel
        </text>

        {/* Daemon authority boundary (supervision) */}
        <line x1="316" y1="20" x2="316" y2="192" stroke="var(--color-border-strong)" strokeWidth="1" />
        <line x1="322" y1="20" x2="322" y2="192" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text
          x="319"
          y="14"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="10.5"
          letterSpacing="0.4"
        >
          DAEMON
        </text>
        <text
          x="319"
          y="206"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="9.5"
        >
          governs every crossing
        </text>

        {/* Round-trip arrows across the boundary */}
        <line
          x1="264"
          y1="96"
          x2="452"
          y2="96"
          stroke={GOVERN}
          strokeWidth="2"
          markerEnd={`url(#${markerId})`}
        />
        <line
          x1="452"
          y1="118"
          x2="264"
          y2="118"
          stroke={GOVERN}
          strokeWidth="1.6"
          markerEnd={`url(#${markerId})`}
        />
        <text
          x="358"
          y="112"
          textAnchor="middle"
          fill={GOVERN}
          fontSize="11"
          fontWeight="600"
        >
          ×N
        </text>

        {/* Connector / model node (right) */}
        <rect
          x="452"
          y="58"
          width="294"
          height="96"
          rx="5"
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-default)"
        />
        <line x1="455" y1="62" x2="455" y2="150" stroke={EXEC} strokeWidth="2.5" />
        <text
          x="472"
          y="84"
          fill="var(--color-text-muted)"
          fontSize="10"
          letterSpacing="0.4"
        >
          {s.connectorOverline}
        </text>
        <text
          x="472"
          y="108"
          fill="var(--color-text-primary)"
          fontSize="13.5"
          fontFamily="monospace"
        >
          {s.connectorTitle}
        </text>
        <text x="472" y="128" fill="var(--color-text-muted)" fontSize="10.5">
          {s.connectorSub}
        </text>

        {/* Governed round-trip tally */}
        <text x="468" y="176" fill="var(--color-text-muted)" fontSize="9.5">
          {s.roundTrips}
        </text>
        {Array.from({ length: LOOP_TICKS }).map((_, index) => (
          <circle
            key={index}
            cx={470 + index * 30}
            cy={196}
            r="5"
            fill={index < progress ? GOVERN : IDLE}
            className="transition-[fill] duration-150 motion-reduce:transition-none"
          />
        ))}
        <text x={470 + LOOP_TICKS * 30} y="200" fill="var(--color-text-muted)" fontSize="12">
          …
        </text>
      </g>
    </svg>
  );
}

function MobileFanout({
  scenario,
  progress,
}: {
  scenario: ScenarioId;
  progress: number;
}) {
  const s = SCENARIOS[scenario];
  return (
    <div className="md:hidden" aria-label="One cell fans out into N governed round trips">
      <div
        className="rounded-[4px] border border-l-2 border-border bg-ground-primary p-3"
        style={{ borderLeftColor: EXEC }}
      >
        <p className="type-overline m-0 text-figure-muted">
          {s.kernelLabel.toUpperCase()}
        </p>
        <p className="m-0 mt-1 font-code text-[0.8rem] text-figure-primary">
          {s.loopGlyph}
        </p>
        <div className="mt-2 rounded-[3px] bg-surface-code p-2">
          <p className="type-caption m-0 text-figure-primary">{s.workingSet}</p>
          <p className="type-caption m-0" style={{ color: EVIDENCE }}>
            stays in the kernel
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center py-1 text-figure-muted">
        <span className="h-4 border-l border-border-strong" aria-hidden="true" />
        <span className="type-caption" style={{ color: GOVERN }}>
          ×N across the daemon
        </span>
        <span className="h-4 border-l border-border-strong" aria-hidden="true" />
      </div>

      <div
        className="rounded-[4px] border border-l-2 border-border bg-ground-primary p-3"
        style={{ borderLeftColor: GOVERN }}
      >
        <p className="type-overline m-0 text-figure-muted">
          {s.connectorOverline}
        </p>
        <p className="m-0 mt-1 break-words font-code text-[0.8rem] text-figure-primary">
          {s.connectorTitle}
        </p>
        <p className="type-caption m-0 mt-1 text-figure-muted">
          {s.roundTrips}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5" aria-hidden="true">
          {Array.from({ length: LOOP_TICKS }).map((_, index) => (
            <span
              key={index}
              className="size-2 rounded-full transition-[background-color] duration-150 motion-reduce:transition-none"
              style={{
                backgroundColor: index < progress ? GOVERN : IDLE,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TranscriptMeter({
  scenario,
  progress,
}: {
  scenario: ScenarioId;
  progress: number;
}) {
  const s = SCENARIOS[scenario];
  const iterations = Array.from({ length: progress });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Claude Science: two tool calls, flat context */}
      <div className="min-w-0">
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <p className="type-label m-0 text-figure-primary">Claude Science</p>
          <p
            className="type-caption m-0 rounded-[3px] px-1.5 py-0.5 font-medium"
            style={{ color: EXEC, backgroundColor: "var(--color-bg-secondary)" }}
          >
            2 tool calls
          </p>
        </div>
        <div className="flex h-[168px] flex-col-reverse gap-1.5 overflow-hidden rounded-[4px] border border-border bg-ground-secondary p-2">
          {s.cells.map((cell) => (
            <div
              key={cell.label}
              className="flex min-h-[34px] items-center gap-2 rounded-[3px] border border-l-2 border-border bg-ground-primary px-2 py-1"
              style={{ borderLeftColor: KIND_ACCENT[cell.kind] }}
            >
              <span
                className="type-overline font-code"
                style={{ color: KIND_ACCENT[cell.kind] }}
              >
                {cell.kind}
              </span>
              <span className="type-caption truncate text-figure-secondary">
                {cell.label}
              </span>
            </div>
          ))}
        </div>
        <p className="type-caption mt-2 text-figure-muted">
          Context stays flat. The papers and genes never enter the transcript.
        </p>
      </div>

      {/* Discrete tool use: N call/result pairs, context grows with N */}
      <div className="min-w-0">
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <p className="type-label m-0 text-figure-primary">Discrete tool use</p>
          <p
            className="type-caption m-0 rounded-[3px] px-1.5 py-0.5 font-medium text-figure-secondary"
            style={{ backgroundColor: "var(--color-bg-secondary)" }}
          >
            {s.discreteTag}
          </p>
        </div>
        <div className="relative h-[168px] overflow-hidden rounded-[4px] border border-border bg-ground-secondary p-2">
          <div className="flex h-full flex-col-reverse gap-[3px]" aria-hidden="true">
            {iterations.map((_, index) => (
              <React.Fragment key={index}>
                <div
                  className="h-[7px] shrink-0 rounded-[1px] opacity-80"
                  style={{ backgroundColor: EXEC }}
                />
                <div
                  className="h-[7px] shrink-0 rounded-[1px]"
                  style={{ backgroundColor: "var(--color-border-strong)" }}
                />
              </React.Fragment>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-14"
            style={{
              background:
                "linear-gradient(var(--color-bg-secondary), transparent)",
            }}
          />
          <p
            className="type-caption absolute right-2 top-1.5 m-0 font-medium text-figure-muted"
          >
            {s.discreteTag} …
          </p>
        </div>
        <p className="type-caption mt-2 text-figure-muted">
          One call and one result per item, so the context grows with N.
        </p>
      </div>
    </div>
  );
}

export function OrchestrationScale() {
  const reducedMotion = useReducedMotion();
  const [scenario, setScenario] = React.useState<ScenarioId>("lit");
  const [progress, setProgress] = React.useState(LOOP_TICKS);
  const [running, setRunning] = React.useState(false);
  const ids = React.useId().replace(/:/g, "");

  // Advance one iteration at a time, then stop. No looping animation.
  React.useEffect(() => {
    if (!running) return undefined;
    if (progress >= LOOP_TICKS) {
      setRunning(false);
      return undefined;
    }
    const id = window.setTimeout(() => {
      setProgress((value) => Math.min(value + 1, LOOP_TICKS));
    }, 95);
    return () => window.clearTimeout(id);
  }, [running, progress]);

  // Reduced motion always shows the completed loop.
  React.useEffect(() => {
    if (reducedMotion) {
      setRunning(false);
      setProgress(LOOP_TICKS);
    }
  }, [reducedMotion]);

  function selectScenario(id: ScenarioId) {
    setScenario(id);
    setRunning(false);
    setProgress(LOOP_TICKS);
  }

  function runLoop() {
    if (reducedMotion) {
      setProgress(LOOP_TICKS);
      return;
    }
    setProgress(0);
    setRunning(true);
  }

  const s = SCENARIOS[scenario];

  return (
    <FigureScaffold
      eyebrow="Code as orchestration"
      title="One call, many operations"
      description="Switch between two shipped workflows. Each is a couple of tool calls in the transcript, but a for-loop inside the cell fans out into hundreds of governed round trips, with the papers or genes held in the kernel."
      caption="Figure C. One coded cell issues N governed round trips across the daemon while the working set stays in the kernel, so the model's transcript records only two tool calls. Discrete tool use spends one call-and-result pair per item, so its context grows with N. Grounded in the shipped literature-review skill and the CRISPR gene-annotation loop."
    >
      <ScenarioTabs scenario={scenario} onSelect={selectScenario} />

      <p className="type-body-sm m-0 border-b border-border pb-4 text-figure-secondary" aria-live="polite">
        {s.blurb}
      </p>

      <div className="border-b border-border py-5">
        <CodeCells scenario={scenario} />
      </div>

      <div className="border-b border-border py-5">
        <p className="type-body-sm m-0 mb-4 text-figure-secondary">
          One cell issues{" "}
          <span className="font-medium text-figure-primary">
            N governed round trips
          </span>{" "}
          across the daemon. The model&rsquo;s transcript never sees them; the
          working set stays in the kernel.
        </p>
        <DesktopFanout
          scenario={scenario}
          progress={progress}
          markerId={`${ids}-arrow`}
          titleId={`${ids}-title`}
          descriptionId={`${ids}-desc`}
        />
        <MobileFanout scenario={scenario} progress={progress} />
        <div className="mt-4">
          <DataflowStrip scenario={scenario} />
        </div>
      </div>

      <div className="py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="type-overline m-0 text-figure-muted">
            Transcript cost
          </p>
          {reducedMotion ? (
            <p className="type-caption m-0 text-figure-muted">
              Showing the completed loop.
            </p>
          ) : (
            <div className="flex items-center gap-3">
              <span
                aria-live="polite"
                className="type-caption text-figure-muted"
              >
                {running
                  ? `fanning out: ${progress} / ${LOOP_TICKS}`
                  : "showing the full loop"}
              </span>
              <button
                type="button"
                onClick={runLoop}
                disabled={running}
                className="type-caption min-h-9 rounded-[4px] border border-border bg-ground-secondary px-3 py-1.5 font-medium text-figure-primary transition-colors duration-150 hover:bg-ground-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-1 disabled:opacity-50 motion-reduce:transition-none"
              >
                {running ? "Running…" : "Run the loop"}
              </button>
            </div>
          )}
        </div>
        <TranscriptMeter scenario={scenario} progress={progress} />
      </div>
    </FigureScaffold>
  );
}
