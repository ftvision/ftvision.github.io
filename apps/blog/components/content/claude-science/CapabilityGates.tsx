"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FigureScaffold } from "./FigureScaffold";

type KernelId = "analysis" | "control" | "reviewer";
type Evidence = "observed" | "source";

type Verdict = {
  result: "admit" | "block";
  // 1 = stopped at the kernel SDK surface, 2 = stopped at the daemon permit set.
  gate: 1 | 2 | null;
  where: string;
  evidence?: Evidence;
};

type Call = {
  id: string;
  code: string;
  note?: string;
};

type Kernel = {
  id: KernelId;
  label: string;
  short: string;
  blurb: string;
};

const ALLOW = "var(--color-status-success)";
const DENY = "var(--color-status-danger)";
const REACHED = "var(--color-data-1)";
const IDLE = "var(--color-border-muted)";

const KERNELS: Kernel[] = [
  {
    id: "analysis",
    label: "Analysis Python / R",
    short: "Analysis",
    blurb:
      "Data methods, not the control plane. host.mcp is never injected, so it fails inside the kernel. Forging the raw wire call slips past that, and only then does the daemon refuse it.",
  },
  {
    id: "control",
    label: "Control REPL",
    short: "Control",
    blurb:
      "The control kernel legitimately holds mcp, agents, and skills. These calls are admitted, so no bypass is needed and nothing has to be forged.",
  },
  {
    id: "reviewer",
    label: "Reviewer",
    short: "Reviewer",
    blurb:
      "Read-only by dispatcher rule. Even a model call is refused at the daemon, whatever the kernel surface happens to expose.",
  },
];

const CALLS: Call[] = [
  { id: "artifacts", code: "host.artifacts(...)" },
  { id: "llm", code: "host.llm(...)" },
  { id: "mcp", code: "host.mcp(...)" },
  {
    id: "raw",
    code: '_host_call("mcp", ...)',
    note: "raw transport, always loaded",
  },
];

const VERDICTS: Record<KernelId, Record<string, Verdict>> = {
  analysis: {
    artifacts: { result: "admit", gate: null, where: "admitted, then logged" },
    llm: { result: "admit", gate: null, where: "admitted, then logged" },
    mcp: {
      result: "block",
      gate: 1,
      where: "not injected in the kernel",
      evidence: "observed",
    },
    raw: {
      result: "block",
      gate: 2,
      where: "daemon permit set refuses it",
      evidence: "source",
    },
  },
  control: {
    artifacts: { result: "admit", gate: null, where: "admitted, then logged" },
    llm: { result: "admit", gate: null, where: "admitted, then logged" },
    mcp: { result: "admit", gate: null, where: "admitted, then logged" },
    raw: {
      result: "admit",
      gate: null,
      where: "mcp is allowed here",
    },
  },
  reviewer: {
    artifacts: { result: "admit", gate: null, where: "admitted, read-only" },
    llm: {
      result: "block",
      gate: 2,
      where: "daemon read-only set excludes it",
      evidence: "source",
    },
    mcp: {
      result: "block",
      gate: 2,
      where: "daemon read-only set excludes it",
      evidence: "source",
    },
    raw: {
      result: "block",
      gate: 2,
      where: "daemon read-only set excludes it",
      evidence: "source",
    },
  },
};

function summarize(kernel: KernelId) {
  const rows = CALLS.map((call) => VERDICTS[kernel][call.id]);
  const admitted = rows.filter((row) => row.result === "admit").length;
  const gate1 = rows.filter((row) => row.gate === 1).length;
  const gate2 = rows.filter((row) => row.gate === 2).length;
  const parts = [`${admitted} admitted`];
  if (gate1) parts.push(`${gate1} blocked in the kernel`);
  if (gate2) parts.push(`${gate2} blocked at the daemon`);
  return parts.join(", ");
}

function KernelToggle({
  kernel,
  onSelect,
}: {
  kernel: KernelId;
  onSelect: (id: KernelId) => void;
}) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = KERNELS.findIndex((item) => item.id === kernel);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % KERNELS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + KERNELS.length) % KERNELS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = KERNELS.length - 1;
    }
    if (next === null) return;
    event.preventDefault();
    onSelect(KERNELS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="type-overline m-0 text-figure-muted">Kernel kind</p>
        <p className="type-caption m-0 text-figure-secondary" aria-live="polite">
          {KERNELS[activeIndex].label}: {summarize(kernel)}
        </p>
      </div>
      <div
        role="tablist"
        aria-label="Select a kernel kind"
        className="inline-flex flex-wrap gap-1 rounded-[6px] border border-border bg-ground-secondary p-1"
      >
        {KERNELS.map((item, index) => {
          const isActive = item.id === kernel;
          return (
            <button
              key={item.id}
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "rounded-[4px] px-3 py-1.5 font-sans text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-1 motion-reduce:transition-none",
                isActive
                  ? "bg-ground-primary text-figure-primary shadow-sm"
                  : "text-figure-secondary hover:text-figure-primary",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PassMark({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" fill="var(--color-bg-primary)" />
      <path
        d={`M ${x - 5} ${y} l 3.4 3.6 l 7.2 -8.6`}
        fill="none"
        stroke={ALLOW}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function StopMark({
  x,
  y,
  evidence,
}: {
  x: number;
  y: number;
  evidence?: Evidence;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" fill="var(--color-bg-primary)" />
      <path
        d={`M ${x - 5} ${y - 5} L ${x + 5} ${y + 5} M ${x + 5} ${y - 5} L ${x - 5} ${y + 5}`}
        fill="none"
        stroke={DENY}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {evidence === "source" ? (
        <circle
          cx={x + 10}
          cy={y - 10}
          r="3"
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth="1.2"
        />
      ) : (
        <circle cx={x + 10} cy={y - 10} r="2.6" fill="var(--color-text-muted)" />
      )}
    </g>
  );
}

const LANE_Y = [168, 236, 304, 372];
const G1 = 372;
const G2 = 628;
const CHIP_RIGHT = 256;
const CARD_LEFT = 712;

function GateDiagram({
  kernel,
  markerId,
  titleId,
  descriptionId,
}: {
  kernel: KernelId;
  markerId: string;
  titleId: string;
  descriptionId: string;
}) {
  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      viewBox="0 0 960 462"
      className="hidden h-auto w-full md:block"
    >
      <title id={titleId}>
        Two gates decide which kernel calls reach the daemon
      </title>
      <desc id={descriptionId}>
        Four calls from the selected kernel pass left to right through a kernel
        SDK surface gate and a daemon permit set gate. Each call is marked
        admitted, blocked in the kernel, or blocked at the daemon, with the
        evidence tier shown on every block.
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
        <text
          x={G1}
          y="58"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="12"
        >
          GATE 1
        </text>
        <text
          x={G1}
          y="82"
          textAnchor="middle"
          fill="var(--color-text-primary)"
          fontSize="16"
          fontWeight="600"
        >
          kernel SDK surface
        </text>
        <text
          x={G1}
          y="102"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="11"
        >
          ergonomic, bypassable
        </text>

        <text
          x={G2}
          y="58"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="12"
        >
          GATE 2
        </text>
        <text
          x={G2}
          y="82"
          textAnchor="middle"
          fill="var(--color-text-primary)"
          fontSize="16"
          fontWeight="600"
        >
          daemon permit set
        </text>
        <text
          x={G2}
          y="102"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="11"
        >
          the real boundary
        </text>

        <line
          x1={G1}
          y1="128"
          x2={G1}
          y2="410"
          stroke="var(--color-border-strong)"
          strokeWidth="1"
          strokeDasharray="5 4"
        />
        <line
          x1={G2 - 3}
          y1="122"
          x2={G2 - 3}
          y2="416"
          stroke="var(--color-border-strong)"
          strokeWidth="1.2"
        />
        <line
          x1={G2 + 3}
          y1="122"
          x2={G2 + 3}
          y2="416"
          stroke="var(--color-border-strong)"
          strokeWidth="1.2"
        />

        {CALLS.map((call, index) => {
          const y = LANE_Y[index];
          const verdict = VERDICTS[kernel][call.id];
          const blockedAt1 = verdict.gate === 1;
          const blockedAt2 = verdict.gate === 2;
          const admit = verdict.result === "admit";
          const reachesG2 = !blockedAt1;
          const stopX = blockedAt1 ? G1 : blockedAt2 ? G2 : null;
          const accent = admit ? ALLOW : DENY;

          return (
            <g key={call.id}>
              <rect
                x="24"
                y={y - 22}
                width="232"
                height="44"
                rx="4"
                fill="var(--color-surface-code)"
                stroke="var(--color-border-default)"
              />
              <text
                x="40"
                y={call.note ? y - 3 : y + 5}
                fill="var(--color-text-primary)"
                fontSize="13"
                fontFamily="monospace"
              >
                {call.code}
              </text>
              {call.note ? (
                <text
                  x="40"
                  y={y + 14}
                  fill="var(--color-text-muted)"
                  fontSize="10.5"
                >
                  {call.note}
                </text>
              ) : null}

              <line
                x1={CHIP_RIGHT}
                y1={y}
                x2={G1}
                y2={y}
                stroke={REACHED}
                strokeWidth="2"
                className="transition-[stroke] duration-200 motion-reduce:transition-none"
              />
              <line
                x1={G1}
                y1={y}
                x2={G2}
                y2={y}
                stroke={reachesG2 ? REACHED : IDLE}
                strokeWidth="2"
                strokeDasharray={reachesG2 ? undefined : "3 5"}
                opacity={reachesG2 ? 1 : 0.5}
                className="transition-[stroke,opacity] duration-200 motion-reduce:transition-none"
              />

              {stopX !== null ? (
                <line
                  x1={stopX}
                  y1={y}
                  x2={CARD_LEFT}
                  y2={y}
                  stroke={IDLE}
                  strokeWidth="1.5"
                  strokeDasharray="1.5 4"
                  opacity="0.6"
                />
              ) : (
                <line
                  x1={G2}
                  y1={y}
                  x2={CARD_LEFT}
                  y2={y}
                  stroke={ALLOW}
                  strokeWidth="2"
                  markerEnd={`url(#${markerId})`}
                />
              )}

              {blockedAt1 ? (
                <StopMark x={G1} y={y} evidence={verdict.evidence} />
              ) : (
                <PassMark x={G1} y={y} />
              )}
              {reachesG2 ? (
                blockedAt2 ? (
                  <StopMark x={G2} y={y} evidence={verdict.evidence} />
                ) : (
                  <PassMark x={G2} y={y} />
                )
              ) : null}

              <rect
                x={CARD_LEFT}
                y={y - 24}
                width="224"
                height="48"
                rx="4"
                fill="var(--color-bg-secondary)"
                stroke="var(--color-border-muted)"
              />
              <rect
                x={CARD_LEFT}
                y={y - 24}
                width="4"
                height="48"
                fill={accent}
              />
              <text
                x={CARD_LEFT + 16}
                y={y - 4}
                fill="var(--color-text-primary)"
                fontSize="13"
                fontWeight="600"
              >
                {admit ? "admitted" : blockedAt1 ? "blocked in kernel" : "blocked at daemon"}
              </text>
              <text
                x={CARD_LEFT + 16}
                y={y + 13}
                fill="var(--color-text-muted)"
                fontSize="10.5"
              >
                {verdict.where}
              </text>
            </g>
          );
        })}

        <line
          x1="24"
          y1="436"
          x2="52"
          y2="436"
          stroke={ALLOW}
          strokeWidth="2"
          markerEnd={`url(#${markerId})`}
        />
        <text x="60" y="440" fill="var(--color-text-secondary)" fontSize="11">
          admitted
        </text>
        <circle cx="176" cy="436" r="2.6" fill="var(--color-text-muted)" />
        <text x="186" y="440" fill="var(--color-text-secondary)" fontSize="11">
          block observed locally
        </text>
        <circle
          cx="358"
          cy="436"
          r="3"
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth="1.2"
        />
        <text x="368" y="440" fill="var(--color-text-secondary)" fontSize="11">
          block read from daemon source, not run
        </text>
      </g>
    </svg>
  );
}

function MobileList({ kernel }: { kernel: KernelId }) {
  return (
    <ul
      className="m-0 list-none space-y-3 p-0 md:hidden"
      style={{ listStyle: "none" }}
      aria-label="Call verdicts for the selected kernel"
    >
      {CALLS.map((call) => {
        const verdict = VERDICTS[kernel][call.id];
        const admit = verdict.result === "admit";
        const label = admit
          ? "admitted"
          : verdict.gate === 1
            ? "blocked in kernel"
            : "blocked at daemon";
        return (
          <li
            key={call.id}
            className="border-l-2 pl-3"
            style={{
              listStyle: "none",
              borderColor: admit
                ? "var(--color-status-success)"
                : "var(--color-status-danger)",
            }}
          >
            <p className="m-0 font-code text-[0.8rem] text-figure-primary">
              {call.code}
            </p>
            <p className="type-caption m-0 mt-1 text-figure-primary">
              {label}
              <span className="text-figure-muted"> — {verdict.where}</span>
            </p>
            {verdict.evidence ? (
              <p className="type-caption m-0 mt-0.5 text-figure-muted">
                {verdict.evidence === "observed"
                  ? "Observed locally."
                  : "Read from daemon source, not run."}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function CapabilityGates() {
  const [kernel, setKernel] = React.useState<KernelId>("analysis");
  const svgId = React.useId().replace(/:/g, "");
  const active = KERNELS.find((item) => item.id === kernel)!;

  return (
    <FigureScaffold
      eyebrow="Capability boundary"
      title="Two gates decide what a kernel may do"
      description="The same host calls, judged against one kernel at a time. A missing SDK method stops a call inside the Python runtime, but that gate is ergonomic. The daemon permit set is the gate that actually contains the kernel."
      caption="Figure C2. Gate 1 is the injected SDK surface: absent methods raise in the kernel before any host round trip. Gate 2 is the daemon permit set, checked after the call crosses the process boundary. A hand-forged _host_call skips gate 1 but not gate 2."
    >
      <KernelToggle kernel={kernel} onSelect={setKernel} />

      <div className="mt-5 border-y border-border py-4">
        <GateDiagram
          kernel={kernel}
          markerId={`${svgId}-arrow`}
          titleId={`${svgId}-title`}
          descriptionId={`${svgId}-description`}
        />
        <MobileList kernel={kernel} />
      </div>

      <div
        className="mt-5 border-l-2 pl-4"
        style={{ borderColor: "var(--color-data-1)" }}
        aria-live="polite"
      >
        <p className="type-overline m-0 text-figure-muted">{active.label}</p>
        <p className="type-body-sm mb-0 mt-2 text-figure-secondary">
          {active.blurb}
        </p>
      </div>
    </FigureScaffold>
  );
}
