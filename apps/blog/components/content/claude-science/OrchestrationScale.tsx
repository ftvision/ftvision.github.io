"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";

/**
 * Figure C — "Code as orchestration".
 *
 * The single idea, framed the way Anthropic frames code execution with MCP:
 * with discrete tool use the model sits *inside* the loop — every call and
 * result passes through its context, so the context grows with N. With Claude
 * Science the model emits one code cell and the loop runs *off-model* inside the
 * kernel; only the code and one result reach the transcript, so it stays flat at
 * two tool calls while hundreds of governed round trips happen in the kernel.
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
  toolShort: string; // discrete tool node label
  toolCall: string; // the governed call the loop repeats
  nLabel: string; // magnitude of the loop
  cells: CodeCell[];
  discreteTag: string;
}

const EXEC = "var(--color-data-1)"; // execution / kernels
const EVID = "var(--color-data-5)"; // durable data
const PACKET = "var(--color-action-primary)"; // one item crossing
const MUTED = "var(--color-border-strong)";

const tint = (c: string) => `color-mix(in srgb, ${c} 14%, var(--color-bg-primary))`;

// Visible loop iterations. The label carries the true magnitude.
const VIS = 8;
const STEP_MS = 240;

const SCENARIOS: Record<ScenarioId, Scenario> = {
  lit: {
    tab: "Literature sweep",
    blurb:
      "search_openalex and expand_citations fill a kernel table with ~240 papers; a host.llm() loop scores each abstract and pulls its effect. Two python cells.",
    kernelLabel: "persistent python kernel",
    toolShort: "host.llm()",
    toolCall: "host.llm(rubric, p)",
    nLabel: "×240",
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
    toolShort: "host.mcp()",
    toolCall: 'host.mcp("bio", "annotate")',
    nLabel: "× N genes",
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
        <p className="type-overline m-0 text-figure-muted">What the model emits</p>
        <p className="type-caption m-0 text-figure-secondary">
          the whole sweep, 2 tool calls
        </p>
      </div>
      <div className="mx-auto grid max-w-2xl gap-3">
        {s.cells.map((cell, index) => (
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

function Keyframes() {
  return (
    <style>{`@keyframes cs-c-bounce{0%{offset-distance:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{offset-distance:100%;opacity:0}}@keyframes cs-c-orbit{from{offset-distance:0%}to{offset-distance:100%}}.cs-c-bnc{animation:cs-c-bounce 1.7s linear infinite}.cs-c-orb{animation:cs-c-orbit 1s linear infinite}`}</style>
  );
}

function DesktopDiagram({
  scenario,
  progress,
  running,
  titleId,
  descId,
}: {
  scenario: ScenarioId;
  progress: number;
  running: boolean;
  titleId: string;
  descId: string;
}) {
  const s = SCENARIOS[scenario];
  const modelFill = "var(--color-text-primary)";
  const modelText = "var(--color-bg-primary)";
  const t = "var(--color-text-primary)";
  const sub = "var(--color-text-secondary)";
  const mut = "var(--color-text-muted)";
  // The packet rides this rounded-rect track, drawn OUTSIDE the call box so it
  // never crosses the code text.
  const orbit =
    "M430 172 H640 A12 12 0 0 1 652 184 V218 A12 12 0 0 1 640 230 H430 A12 12 0 0 1 418 218 V184 A12 12 0 0 1 430 172 Z";

  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      viewBox="0 0 720 434"
      className="hidden h-auto w-full md:block"
    >
      <title id={titleId}>Where the loop runs, and what the transcript records</title>
      <desc id={descId}>
        With discrete tool use the model sits inside the loop: each call and
        result passes through it, and the model context grows with the number of
        iterations. With Claude Science the model emits one code cell and the loop
        runs inside the kernel; only one result returns, and the model transcript
        stays at two tool calls.
      </desc>
      <defs>
        <Keyframes />
        <marker id="cs-c-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M1 1 L8 5 L1 9" fill="none" stroke={EXEC} strokeWidth="1.6" />
        </marker>
      </defs>

      {/* ---- LEFT: discrete, model in the loop ---- */}
      <text x="20" y="22" fontSize="13" fontWeight="700" fill={t}>Discrete tool use</text>
      <text x="20" y="38" fontSize="10.5" fill={mut}>the model sits inside the loop</text>

      <rect x="80" y="56" width="150" height="40" rx="8" fill={modelFill} />
      <text x="155" y="81" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={modelText}>Model</text>
      <rect x="80" y="168" width="150" height="40" rx="8" fill={tint(EXEC)} stroke={EXEC} />
      <text x="155" y="193" textAnchor="middle" fontSize="12" fontWeight="600" fontFamily="var(--font-code, monospace)" fill={t}>{s.toolShort}</text>

      <path d="M138 96 L138 168" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-c-arr)" />
      <path d="M172 168 L172 96" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-c-arr)" />
      <text x="120" y="136" textAnchor="end" fontSize="9.5" fill={sub}>call</text>
      <text x="190" y="136" fontSize="9.5" fill={sub}>result</text>
      <text x="155" y="236" textAnchor="middle" fontSize="11" fontWeight="700" fill={EVID}>repeat {s.nLabel}</text>
      <text x="155" y="251" textAnchor="middle" fontSize="9.5" fill={mut}>every call + result passes through the model</text>
      {running ? (
        <circle r="5" fill={PACKET} className="cs-c-bnc" style={{ offsetPath: `path('M138 96 L138 168 L172 168 L172 96')` }} />
      ) : null}

      <line x1="360" y1="14" x2="360" y2="262" stroke="var(--color-border)" />

      {/* ---- RIGHT: code, loop off-model in the kernel ---- */}
      <text x="384" y="22" fontSize="13" fontWeight="700" fill={t}>Claude Science — code in the kernel</text>
      <text x="384" y="38" fontSize="10.5" fill={mut}>the loop runs off-model</text>

      <rect x="440" y="56" width="150" height="40" rx="8" fill={modelFill} />
      <text x="515" y="81" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={modelText}>Model</text>

      <rect x="400" y="150" width="270" height="104" rx="8" fill={tint(EXEC)} stroke={EXEC} />
      <text x="416" y="166" fontSize="10" fill={mut}>{s.kernelLabel.toUpperCase()}</text>
      {/* loop track: faint at rest, the packet rides it at run time */}
      <path d={orbit} fill="none" stroke={EXEC} strokeOpacity="0.45" strokeWidth="1.3" strokeDasharray="4 4" />
      {/* the repeated call, boxed so the track never crosses the text */}
      <rect x="430" y="182" width="210" height="38" rx="8" fill="var(--color-bg-primary)" stroke="var(--color-border-muted)" />
      <text x="535" y="205" textAnchor="middle" fontSize="11" fontFamily="var(--font-code, monospace)" fill={t}>{s.toolCall}</text>
      <text x="535" y="245" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={EVID}>repeats {s.nLabel}</text>
      {running ? (
        <circle r="5" fill={PACKET} className="cs-c-orb" style={{ offsetPath: `path('${orbit}')` }} />
      ) : null}

      <path d="M488 96 L488 150" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-c-arr)" />
      <path d="M542 150 L542 96" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-c-arr)" />
      <text x="480" y="128" textAnchor="end" fontSize="9.5" fill={sub}>1 code cell</text>
      <text x="550" y="128" fontSize="9.5" fill={sub}>1 result</text>

      {/* ---- BOTTOM: model context window ---- */}
      <line x1="20" y1="288" x2="700" y2="288" stroke="var(--color-border)" />
      <text x="20" y="310" fontSize="11" fontWeight="700" fill={mut}>MODEL CONTEXT WINDOW</text>

      <text x="20" y="336" fontSize="11.5" fontWeight="600" fill={t}>Discrete</text>
      <rect x="90" y="322" width="260" height="94" rx="5" fill="var(--color-bg-primary)" stroke="var(--color-border)" />
      {Array.from({ length: Math.min(progress, VIS) }).map((_, i) => (
        <g key={i}>
          <rect x="98" y={330 + i * 10} width="244" height="4" rx="1" fill={EXEC} opacity="0.85" />
          <rect x="98" y={335 + i * 10} width="244" height="4" rx="1" fill={MUTED} />
        </g>
      ))}
      <text x="342" y="410" textAnchor="end" fontSize="9" fill={EVID}>grows with N — {s.nLabel} …</text>

      <text x="384" y="336" fontSize="11.5" fontWeight="600" fill={t}>Claude Science</text>
      <rect x="480" y="322" width="220" height="94" rx="5" fill="var(--color-bg-primary)" stroke="var(--color-border)" />
      <rect x="490" y="332" width="200" height="16" rx="3" fill={tint(EXEC)} stroke={EXEC} />
      <text x="500" y="344" fontSize="9" fontFamily="var(--font-code, monospace)" fill={EXEC}>python · cell 1</text>
      <rect x="490" y="352" width="200" height="16" rx="3" fill={tint(EXEC)} stroke={EXEC} />
      <text x="500" y="364" fontSize="9" fontFamily="var(--font-code, monospace)" fill={EXEC}>python · cell 2</text>
      <text x="690" y="410" textAnchor="end" fontSize="9" fill={EXEC}>stays flat — 2 tool calls</text>
    </svg>
  );
}

function MobileDiagram({
  scenario,
  progress,
}: {
  scenario: ScenarioId;
  progress: number;
}) {
  const s = SCENARIOS[scenario];
  return (
    <div className="grid gap-3 md:hidden">
      {/* Discrete */}
      <div className="rounded-[4px] border border-border bg-ground-primary p-3">
        <p className="type-label m-0 text-figure-primary">Discrete tool use</p>
        <p className="type-caption m-0 mt-0.5 text-figure-muted">
          the model sits inside the loop
        </p>
        <p className="type-caption m-0 mt-2 text-figure-secondary">
          <span className="font-medium text-figure-primary">Model → {s.toolShort} → Model</span>, repeated{" "}
          <span className="font-medium" style={{ color: EVID }}>{s.nLabel}</span>. Every call and result passes through the model.
        </p>
        <div className="mt-2 flex flex-wrap gap-1" aria-hidden="true">
          {Array.from({ length: Math.min(progress, VIS) }).map((_, i) => (
            <span key={i} className="flex flex-col gap-[2px]">
              <span className="block h-1 w-5 rounded-[1px]" style={{ backgroundColor: EXEC, opacity: 0.85 }} />
              <span className="block h-1 w-5 rounded-[1px]" style={{ backgroundColor: MUTED }} />
            </span>
          ))}
          <span className="type-caption self-center" style={{ color: EVID }}>{s.nLabel} …</span>
        </div>
        <p className="type-caption m-0 mt-1 text-figure-muted">Context grows with N.</p>
      </div>

      {/* Claude Science */}
      <div className="rounded-[4px] border border-border bg-ground-primary p-3">
        <p className="type-label m-0 text-figure-primary">Claude Science — code in the kernel</p>
        <p className="type-caption m-0 mt-0.5 text-figure-muted">the loop runs off-model</p>
        <p className="type-caption m-0 mt-2 text-figure-secondary">
          Model emits <span className="font-medium text-figure-primary">1 code cell</span>; the loop runs{" "}
          <span className="font-medium" style={{ color: EVID }}>{s.nLabel}</span> inside the kernel; only{" "}
          <span className="font-medium text-figure-primary">1 result</span> returns.
        </p>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          <span className="rounded-[3px] px-1.5 py-0.5 font-code text-[0.7rem]" style={{ backgroundColor: tint(EXEC), color: EXEC }}>python · cell 1</span>
          <span className="rounded-[3px] px-1.5 py-0.5 font-code text-[0.7rem]" style={{ backgroundColor: tint(EXEC), color: EXEC }}>python · cell 2</span>
        </div>
        <p className="type-caption m-0 mt-1 text-figure-muted">Transcript stays flat — 2 tool calls.</p>
      </div>
    </div>
  );
}

export function OrchestrationScale() {
  const reducedMotion = useReducedMotion();
  const [scenario, setScenario] = React.useState<ScenarioId>("lit");
  const [progress, setProgress] = React.useState(VIS);
  const [running, setRunning] = React.useState(false);
  const ids = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    if (!running) return undefined;
    if (progress >= VIS) {
      setRunning(false);
      return undefined;
    }
    const id = window.setTimeout(() => {
      setProgress((value) => Math.min(value + 1, VIS));
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [running, progress]);

  React.useEffect(() => {
    if (reducedMotion) {
      setRunning(false);
      setProgress(VIS);
    }
  }, [reducedMotion]);

  function selectScenario(id: ScenarioId) {
    setScenario(id);
    setRunning(false);
    setProgress(VIS);
  }

  function runLoop() {
    if (reducedMotion) {
      setProgress(VIS);
      return;
    }
    setProgress(0);
    setRunning(true);
  }

  const s = SCENARIOS[scenario];

  return (
    <FigureScaffold
      eyebrow="Code as orchestration"
      title="Where the loop runs"
      description="With discrete tool use the model sits inside the loop, so its context grows with every call. Claude Science emits one code cell and runs the loop off-model in the kernel — hundreds of governed round trips, two tool calls in the transcript."
      caption="Figure C. Discrete tool use puts the model in the loop: each call and result passes through its context, which grows with N. Claude Science emits one code cell and runs the loop inside the kernel, so the transcript stays at two tool calls while the working set never leaves the kernel. Grounded in the shipped literature-review skill and the CRISPR gene-annotation loop; the contrast follows Anthropic's code-execution-with-MCP framing."
    >
      <ScenarioTabs scenario={scenario} onSelect={selectScenario} />

      <p className="type-body-sm m-0 border-b border-border pb-4 text-figure-secondary" aria-live="polite">
        {s.blurb}
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
              <span aria-live="polite" className="type-caption text-figure-muted">
                {running ? `running: ${progress} / ${VIS}` : "showing the full loop"}
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
        <DesktopDiagram
          scenario={scenario}
          progress={progress}
          running={running}
          titleId={`${ids}-title`}
          descId={`${ids}-desc`}
        />
        <MobileDiagram scenario={scenario} progress={progress} />
      </div>
    </FigureScaffold>
  );
}
