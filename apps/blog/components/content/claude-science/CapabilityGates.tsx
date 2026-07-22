"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FigureScaffold } from "./FigureScaffold";
import CapabilityGatesSvg from "./svg/capability-gates.svg";

type KernelId = "analysis" | "control" | "reviewer";
type Evidence = "observed" | "source";
type Verdict = {
  result: "admit" | "block";
  gate: 1 | 2 | null;
  where: string;
  evidence?: Evidence;
};
type Call = { id: string; code: string; note?: string };
type Kernel = { id: KernelId; label: string; blurb: string };

const KERNELS: Kernel[] = [
  {
    id: "analysis",
    label: "Analysis Python / R",
    blurb:
      "Data methods, not the control plane. host.mcp is never injected, so it fails inside the kernel. Forging the raw wire call slips past that, and only then does the daemon refuse it.",
  },
  {
    id: "control",
    label: "Control REPL",
    blurb:
      "The control kernel legitimately holds mcp, agents, and skills. These calls are admitted, so no bypass is needed and nothing has to be forged.",
  },
  {
    id: "reviewer",
    label: "Reviewer",
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
    raw: { result: "admit", gate: null, where: "mcp is allowed here" },
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
  const parts = [
    `${rows.filter((row) => row.result === "admit").length} admitted`,
  ];
  const gate1 = rows.filter((row) => row.gate === 1).length;
  const gate2 = rows.filter((row) => row.gate === 2).length;
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
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % KERNELS.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + KERNELS.length) % KERNELS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = KERNELS.length - 1;
    if (next === null) return;
    event.preventDefault();
    onSelect(KERNELS[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="type-overline m-0 text-figure-muted">Kernel kind</p>
        <p
          className="type-caption m-0 text-figure-secondary"
          aria-live="polite"
        >
          {KERNELS[activeIndex].label}: {summarize(kernel)}
        </p>
      </div>
      <div
        role="tablist"
        aria-label="Select a kernel kind"
        className="inline-flex flex-wrap gap-1 rounded-[6px] border border-border bg-ground-secondary p-1"
      >
        {KERNELS.map((item, index) => {
          const active = item.id === kernel;
          return (
            <button
              key={item.id}
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "rounded-[4px] px-3 py-1.5 font-sans text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-1 motion-reduce:transition-none",
                active
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

function MobileList({ kernel }: { kernel: KernelId }) {
  return (
    <ul
      className="m-0 list-none space-y-3 p-0 md:hidden"
      style={{ listStyle: "none" }}
      aria-label="Call verdicts for the selected kernel"
    >
      {CALLS.map((call) => {
        const verdict = VERDICTS[kernel][call.id];
        const admitted = verdict.result === "admit";
        const label = admitted
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
              borderColor: admitted
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
  const active = KERNELS.find((item) => item.id === kernel)!;
  return (
    <FigureScaffold
      eyebrow="Capability boundary"
      title="Two gates decide what a kernel may do"
      description="The same host calls, judged against one kernel at a time. A missing SDK method stops a call inside the Python runtime, but that gate is ergonomic. The daemon permit set is the gate that actually contains the kernel."
      caption="Figure 5. Gate 1 is the injected SDK surface: absent methods raise in the kernel before any host round trip. Gate 2 is the daemon permit set, checked after the call crosses the process boundary. A hand-forged _host_call skips gate 1 but not gate 2."
      captionZh="图 5。第一道关卡是注入内核的 SDK 界面：方法不存在，调用还没离开内核就会报错。第二道关卡是守护进程的许可集，调用跨过进程边界后才检查。手工伪造 _host_call 能绕过第一关，却绕不过第二关。"
    >
      <KernelToggle kernel={kernel} onSelect={setKernel} />
      <div className="mt-5 border-y border-border py-4">
        <CapabilityGatesSvg
          data-kernel={kernel}
          className="hidden h-auto w-full md:block"
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
