"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";
import OrchestrationScaleSvg from "./svg/orchestration-scale.svg";

type ScenarioId = "lit" | "crispr";
type CodeCell = { label: string; code: string };
type Scenario = {
  tab: string;
  blurb: string;
  toolShort: string;
  nLabel: string;
  cells: CodeCell[];
};

const EXEC = "var(--color-data-1)";
const EVID = "var(--color-data-1)";
const MUTED = "var(--color-border-strong)";
const tint = (color: string) =>
  `color-mix(in srgb, ${color} 14%, var(--color-bg-primary))`;
const VIS = 8;
const STEP_MS = 240;

const SCENARIOS: Record<ScenarioId, Scenario> = {
  lit: {
    tab: "Literature sweep",
    blurb:
      "search_openalex and expand_citations fill a kernel table with ~240 papers; a host.llm() loop scores each abstract and pulls its effect. Two python cells.",
    toolShort: "host.llm()",
    nLabel: "×240",
    cells: [
      {
        label: "retrieve + triage, one kernel",
        code: `import json
papers = search_openalex(query, n=25)
for seed in papers[:3]:
    g = expand_citations(seed["doi"])
    papers += g["references"] + g["cited_by"]
for p in papers:                    # ~240 candidates
    prompt = rubric + "\n\n" + json.dumps(p)
    p.update(json.loads(host.llm(prompt)["text"]))`,
      },
      {
        label: "draw from the same live namespace",
        code: `keep = [p for p in papers if p["score"] >= 0.7]
plt.scatter([p["year"] for p in keep],
            [p["effect"] for p in keep])
plt.savefig("effects.png")          # -> artifact`,
      },
    ],
  },
  crispr: {
    tab: "CRISPR annotation",
    blurb:
      "A repl cell calls host.mcp once per gene into one ./handoff file; a python cell loads the user's matrix and computes enrichment. One repl cell, one python cell.",
    toolShort: "host.mcp()",
    nLabel: "× N genes",
    cells: [
      {
        label: "loop the connector, write one handoff",
        code: `import json
rows = [host.mcp("bio", "civic_search_genes",
                 entrez_symbol=g)
        for g in gene_ids]          # one call per gene
json.dump(rows,
          open("./handoff/gene_annotations.json", "w"))`,
      },
      {
        label: "load matrix + handoff, enrich",
        code: `mat = pd.read_parquet(user_matrix)
ann = json.load(open("./handoff/gene_annotations.json"))
hits = enrich(mat, ann)             # per-pathway
hits.to_parquet("./outputs/enrichment.parquet")`,
      },
    ],
  },
};

const ORDER: ScenarioId[] = ["lit", "crispr"];

function ScenarioTabs({
  scenario,
  onSelect,
}: {
  scenario: ScenarioId;
  onSelect: (id: ScenarioId) => void;
}) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % ORDER.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + ORDER.length) % ORDER.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = ORDER.length - 1;
    if (next === null) return;
    event.preventDefault();
    onSelect(ORDER[next]);
    refs.current[next]?.focus();
  };

  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="tablist"
        aria-label="Shipped scenario"
        className="inline-flex flex-wrap gap-1 rounded-[6px] border border-border bg-ground-secondary p-1"
      >
        {ORDER.map((id, index) => {
          const active = id === scenario;
          return (
            <button
              key={id}
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "rounded-[4px] px-3 py-1.5 font-sans text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-1 motion-reduce:transition-none",
                active
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
      <div className="mx-auto grid max-w-2xl gap-3">
        {SCENARIOS[scenario].cells.map((cell, index) => (
          <div
            key={cell.label}
            className="min-w-0 overflow-hidden rounded-[6px] border border-border bg-ground-secondary"
          >
            <div className="flex items-baseline justify-between gap-2 border-b border-border bg-ground-primary px-3 py-1.5">
              <span className="type-overline m-0 font-code text-figure-muted">
                Python 3
              </span>
              <span className="type-caption m-0 truncate text-figure-muted">
                {cell.label}
              </span>
            </div>
            <div className="flex">
              <span
                aria-hidden="true"
                className="shrink-0 select-none whitespace-nowrap py-3 pl-3 pr-2 font-code text-[0.72rem] leading-5 text-action-primary"
              >
                In [{index + 1}]:
              </span>
              <pre className="type-caption m-0 min-w-0 flex-1 overflow-x-auto whitespace-pre py-3 pr-3 font-code leading-5 text-figure-primary">
                <code>{cell.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileDiagram({
  scenario,
  progress,
}: {
  scenario: ScenarioId;
  progress: number;
}) {
  const current = SCENARIOS[scenario];
  return (
    <div className="grid gap-3 md:hidden">
      <div className="rounded-[4px] border border-border bg-ground-primary p-3">
        <p className="type-label m-0 text-figure-primary">Discrete tool use</p>
        <p className="type-caption m-0 mt-0.5 text-figure-muted">
          the model sits inside the loop
        </p>
        <p className="type-caption m-0 mt-2 text-figure-secondary">
          <span className="font-medium text-figure-primary">
            Model → {current.toolShort} → Model
          </span>
          , repeated{" "}
          <span className="font-medium" style={{ color: EVID }}>
            {current.nLabel}
          </span>
          . Every call and result passes through the model.
        </p>
        <div className="mt-2 flex flex-wrap gap-1" aria-hidden="true">
          {Array.from({ length: Math.min(progress, VIS) }).map((_, index) => (
            <span key={index} className="flex flex-col gap-[2px]">
              <span
                className="block h-1 w-5 rounded-[1px]"
                style={{ backgroundColor: EXEC, opacity: 0.85 }}
              />
              <span
                className="block h-1 w-5 rounded-[1px]"
                style={{ backgroundColor: MUTED }}
              />
            </span>
          ))}
          <span className="type-caption self-center" style={{ color: EVID }}>
            {current.nLabel} …
          </span>
        </div>
        <p className="type-caption m-0 mt-1 text-figure-muted">
          Context grows with N.
        </p>
      </div>
      <div className="rounded-[4px] border border-border bg-ground-primary p-3">
        <p className="type-label m-0 text-figure-primary">
          Claude Science — code in the kernel
        </p>
        <p className="type-caption m-0 mt-0.5 text-figure-muted">
          the loop runs off-model
        </p>
        <p className="type-caption m-0 mt-2 text-figure-secondary">
          Model emits{" "}
          <span className="font-medium text-figure-primary">2 code cells</span>;
          the loop runs{" "}
          <span className="font-medium" style={{ color: EVID }}>
            {current.nLabel}
          </span>{" "}
          inside the kernel;{" "}
          <span className="font-medium text-figure-primary">
            2 compact results
          </span>{" "}
          return.
        </p>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          <span
            className="rounded-[3px] px-1.5 py-0.5 font-code text-[0.7rem]"
            style={{ backgroundColor: tint(EXEC), color: EXEC }}
          >
            python · cell 1
          </span>
          <span
            className="rounded-[3px] px-1.5 py-0.5 font-code text-[0.7rem]"
            style={{ backgroundColor: tint(EXEC), color: EXEC }}
          >
            python · cell 2
          </span>
        </div>
        <p className="type-caption m-0 mt-1 text-figure-muted">
          Transcript stays flat — 2 tool calls.
        </p>
      </div>
    </div>
  );
}

export function OrchestrationScale() {
  const reducedMotion = useReducedMotion();
  const [scenario, setScenario] = React.useState<ScenarioId>("lit");
  const [progress, setProgress] = React.useState(VIS);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    if (progress >= VIS) {
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(
      () => setProgress((value) => Math.min(value + 1, VIS)),
      STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [running, progress]);

  React.useEffect(() => {
    if (reducedMotion) {
      setRunning(false);
      setProgress(VIS);
    }
  }, [reducedMotion]);

  const selectScenario = (id: ScenarioId) => {
    setScenario(id);
    setRunning(false);
    setProgress(VIS);
  };
  const runLoop = () => {
    if (reducedMotion) {
      setProgress(VIS);
      return;
    }
    setProgress(0);
    setRunning(true);
  };
  const current = SCENARIOS[scenario];

  return (
    <FigureScaffold
      eyebrow="Code as orchestration"
      title="Where the loop runs"
      description="With discrete tool use the model sits inside the loop, so its context grows with every call. Claude Science uses two code-cell tool calls while hundreds of governed round trips run inside the kernels."
      caption="Figure 4. Discrete tool use puts the model in the loop: each call and result passes through its context, which grows with N. Here Claude Science uses two code-cell tool calls, so the number of model-level tool calls stays fixed while the inner loop scales. The working table stays in the kernel; individual host-call inputs and compact results cross the boundary. Grounded in the shipped literature-review skill and the CRISPR gene-annotation loop."
    >
      <ScenarioTabs scenario={scenario} onSelect={selectScenario} />
      <p
        className="type-body-sm m-0 border-b border-border pb-4 text-figure-secondary"
        aria-live="polite"
      >
        {current.blurb}
      </p>
      <div className="border-b border-border py-5">
        <CodeCells scenario={scenario} />
      </div>
      <div className="py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="type-overline m-0 text-figure-muted">
            One loop, two ways to run it
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
                  ? `running: ${progress} / ${VIS}`
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
        <OrchestrationScaleSvg
          data-scenario={scenario}
          data-running={running}
          style={
            { "--progress-height": `${progress * 9}px` } as React.CSSProperties
          }
          className="hidden h-auto w-full md:block"
        />
        <MobileDiagram scenario={scenario} progress={progress} />
      </div>
    </FigureScaffold>
  );
}
