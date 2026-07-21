"use client";

import * as React from "react";
import { useReducedMotion } from "./AB-useReducedMotion";

export type ShipmentMode = "bundle" | "runtime" | "provisioned";
export type ShipmentStageId = "shell" | "daemon" | "runtime" | "provisioned";

export type ShipmentStage = {
  id: ShipmentStageId;
  label: string;
  size: string;
  path: string;
  /** What the previous layer does to unpack this one. */
  verb: string;
  /** Contents revealed when the box is unpacked. */
  contents: string[];
  /** Product payload (blue) versus separately provisioned state (green). */
  kind: "product" | "provisioned";
};

export const SHIPMENT_STAGES: ShipmentStage[] = [
  {
    id: "shell",
    label: "Signed app",
    size: "111 MB",
    path: "/Applications",
    verb: "ships",
    contents: ["seed daemon 0.1.0"],
    kind: "product",
  },
  {
    id: "daemon",
    label: "Staged daemon",
    size: "≈112 MB",
    path: "~/.claude-science/bin",
    verb: "stages",
    contents: ["host · dispatcher", "web service", "SDK templates ×21", "kernel manager"],
    kind: "product",
  },
  {
    id: "runtime",
    label: "Versioned runtime",
    size: "≈95 MB",
    path: "~/.claude-science/runtime",
    verb: "selects",
    contents: [
      "agents",
      "kernels",
      "compute",
      "skills",
      "mcp-servers",
      "drizzle/sqlite",
      "seed",
      "web-dist",
      "support bins",
    ],
    kind: "product",
  },
  {
    id: "provisioned",
    label: "Execution environments",
    size: "≈3.7 GB",
    path: "~/.claude-science/conda",
    verb: "provisions",
    contents: ["python env", "r env", "operon-mcp", "seed assets"],
    kind: "provisioned",
  },
];

const PRODUCT_ACCENT = "var(--color-data-1)";
const PROVISIONED_ACCENT = "var(--color-border-strong)";
const STEP_MS = 520;

function accentFor(stage: ShipmentStage) {
  return stage.kind === "provisioned" ? PROVISIONED_ACCENT : PRODUCT_ACCENT;
}

/** A layer group that fades and slides into place as it is unpacked. */
function Layer({
  index,
  revealed,
  origin = "left",
  children,
}: {
  index: number;
  revealed: number;
  origin?: "left" | "top";
  children: React.ReactNode;
}) {
  const shown = revealed > index;
  const hiddenShift =
    origin === "left" ? "translateX(-18px)" : "translateY(-16px)";
  return (
    <g
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : hiddenShift,
        transformBox: "fill-box",
        transformOrigin: "center",
        transition:
          "opacity 360ms ease-out, transform 360ms cubic-bezier(0.22,1,0.36,1)",
      }}
      className="motion-reduce:!transition-none"
    >
      {children}
    </g>
  );
}

type BoxGeometry = { x: number; y: number; w: number; h: number };

/**
 * One unpacked layer: a labeled box whose contents are visible, drawn as a
 * literal package or directory.
 */
function StationBox({
  stage,
  box,
  title,
  children,
}: {
  stage: ShipmentStage;
  box: BoxGeometry;
  title?: string;
  children?: React.ReactNode;
}) {
  const { x, y, w, h } = box;
  const accent = accentFor(stage);
  const provisioned = stage.kind === "provisioned";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        fill={
          provisioned ? "var(--color-border-strong)" : "var(--color-bg-secondary)"
        }
        fillOpacity={provisioned ? 0.08 : 1}
        stroke={accent}
        strokeWidth="1.4"
      />
      {children != null ? (
        <path
          d={`M${x} ${y + 46}H${x + w}`}
          stroke={accent}
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      ) : null}
      <text
        x={x + 12}
        y={y + 22}
        fill="var(--color-text-primary)"
        fontSize="13"
        fontWeight="600"
      >
        {title ?? stage.label}
      </text>
      <text
        x={x + w - 11}
        y={y + 22}
        textAnchor="end"
        fill={accent}
        fontFamily="var(--font-family-code)"
        fontSize="11"
        fontWeight="600"
      >
        {stage.size}
      </text>
      <text
        x={x + 12}
        y={y + 39}
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-code)"
        fontSize="9"
      >
        {stage.path}
      </text>
      {children}
    </g>
  );
}

/** Desktop handoff routed over the top of the boxes, clear of their contents. */
function TopElbow({
  rx,
  lx,
  top,
  bus,
  verb,
  markerId,
}: {
  rx: number;
  lx: number;
  top: number;
  bus: number;
  verb: string;
  markerId: string;
}) {
  const ex = rx - 20;
  const nx = lx + 20;
  return (
    <g aria-hidden="true">
      <path
        d={`M${ex} ${top}V${bus}H${nx}V${top}`}
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="1.4"
        strokeDasharray="5 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#${markerId})`}
      />
      <text
        x={(rx + lx) / 2}
        y={bus - 7}
        textAnchor="middle"
        fill="var(--color-text-secondary)"
        fontFamily="var(--font-family-code)"
        fontSize="10"
      >
        {verb}
      </text>
    </g>
  );
}

/** Vertical handoff for the stacked mobile layout. */
function DownArrow({
  x,
  y1,
  y2,
  verb,
  markerId,
}: {
  x: number;
  y1: number;
  y2: number;
  verb: string;
  markerId: string;
}) {
  return (
    <g aria-hidden="true">
      <path
        d={`M${x} ${y1}V${y2}`}
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="1.3"
        strokeDasharray="5 4"
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
      <text
        x={x + 12}
        y={(y1 + y2) / 2 + 3}
        fill="var(--color-text-secondary)"
        fontFamily="var(--font-family-code)"
        fontSize="10"
      >
        {verb}
      </text>
    </g>
  );
}

function ContentList({
  items,
  x,
  y,
  columns = 1,
  colWidth = 0,
  lineHeight = 19,
}: {
  items: string[];
  x: number;
  y: number;
  columns?: number;
  colWidth?: number;
  lineHeight?: number;
}) {
  const perCol = Math.ceil(items.length / columns);
  return (
    <g aria-hidden="true">
      {items.map((item, i) => {
        const col = Math.floor(i / perCol);
        const row = i % perCol;
        const cx = x + col * colWidth;
        const cy = y + row * lineHeight;
        return (
          <g key={item}>
            <circle cx={cx + 2} cy={cy - 3} r="1.4" fill="var(--color-text-muted)" />
            <text
              x={cx + 9}
              y={cy}
              fill="var(--color-text-secondary)"
              fontFamily="var(--font-family-code)"
              fontSize="9.5"
            >
              {item}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Marker({ id }: { id: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 8 8"
      refX="6.5"
      refY="4"
      markerWidth="6"
      markerHeight="6"
      orient="auto"
    >
      <path d="M0 1L7 4L0 7Z" fill="var(--color-border-strong)" />
    </marker>
  );
}

function DesktopUnpack({
  revealed,
  markerId,
}: {
  revealed: number;
  markerId: string;
}) {
  const top = 100;
  const bus = 66;
  const boxes: Record<ShipmentStageId, BoxGeometry> = {
    shell: { x: 16, y: top, w: 150, h: 62 },
    daemon: { x: 226, y: top, w: 178, h: 156 },
    runtime: { x: 464, y: top, w: 228, h: 210 },
    provisioned: { x: 758, y: top, w: 226, h: 252 },
  };
  const stageById = Object.fromEntries(
    SHIPMENT_STAGES.map((s) => [s.id, s]),
  ) as Record<ShipmentStageId, ShipmentStage>;
  const right = (id: ShipmentStageId) => boxes[id].x + boxes[id].w;

  return (
    <svg
      className="hidden h-auto w-full overflow-visible md:block"
      viewBox="0 0 1000 372"
      role="img"
      aria-labelledby="shipment-desktop-title shipment-desktop-desc"
    >
      <title id="shipment-desktop-title">
        Unpacking the Claude Science 0.1.15 installation
      </title>
      <desc id="shipment-desktop-desc">
        The signed app ships a seed daemon. It stages a self-updating daemon,
        which selects a versioned runtime of agents, kernels, compute, skills,
        and MCP servers, which in turn provisions the much larger Python, R, and
        MCP execution environments. Each box lists its contents; dashed arrows
        are the reconstructed staging handoff.
      </desc>

      <defs>
        <Marker id={markerId} />
      </defs>

      <text
        x="16"
        y="24"
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-code)"
        fontSize="11"
      >
        UNPACKED INSTALLATION · DARWIN-ARM64
      </text>
      <text
        x="984"
        y="24"
        textAnchor="end"
        fill="var(--color-text-muted)"
        fontSize="11"
      >
        dashed = reconstructed staging · box size not to scale
      </text>

      {/* Handoffs routed over the top, each revealed with its target box. */}
      <Layer index={1} revealed={revealed}>
        <TopElbow
          rx={right("shell")}
          lx={boxes.daemon.x}
          top={top}
          bus={bus}
          verb={stageById.daemon.verb}
          markerId={markerId}
        />
      </Layer>
      <Layer index={2} revealed={revealed}>
        <TopElbow
          rx={right("daemon")}
          lx={boxes.runtime.x}
          top={top}
          bus={bus}
          verb={stageById.runtime.verb}
          markerId={markerId}
        />
      </Layer>
      <Layer index={3} revealed={revealed}>
        <TopElbow
          rx={right("runtime")}
          lx={boxes.provisioned.x}
          top={top}
          bus={bus}
          verb={stageById.provisioned.verb}
          markerId={markerId}
        />
      </Layer>

      {/* Layer 1 — Signed app: a small signed shell, nothing but the bootstrap. */}
      <Layer index={0} revealed={revealed}>
        <StationBox stage={stageById.shell} box={boxes.shell} />
      </Layer>

      {/* Layer 2 — Staged daemon. */}
      <Layer index={1} revealed={revealed}>
        <StationBox stage={stageById.daemon} box={boxes.daemon}>
          <ContentList
            items={stageById.daemon.contents}
            x={boxes.daemon.x + 14}
            y={boxes.daemon.y + 70}
            lineHeight={22}
          />
        </StationBox>
      </Layer>

      {/* Layer 3 — Versioned runtime, the actual product distribution. */}
      <Layer index={2} revealed={revealed}>
        <StationBox stage={stageById.runtime} box={boxes.runtime}>
          <ContentList
            items={stageById.runtime.contents}
            x={boxes.runtime.x + 14}
            y={boxes.runtime.y + 70}
            columns={2}
            colWidth={112}
            lineHeight={21}
          />
        </StationBox>
      </Layer>

      {/* Layer 4 — Provisioned environments, the dominant machine state. */}
      <Layer index={3} revealed={revealed}>
        <StationBox
          stage={stageById.provisioned}
          box={boxes.provisioned}
          title="Environments"
        >
          <ContentList
            items={stageById.provisioned.contents}
            x={boxes.provisioned.x + 14}
            y={boxes.provisioned.y + 70}
            lineHeight={22}
          />
          <text
            x={boxes.provisioned.x + 14}
            y={boxes.provisioned.y + 202}
            fill={PROVISIONED_ACCENT}
            fontSize="30"
            fontWeight="600"
          >
            ≈95%
          </text>
          <text
            x={boxes.provisioned.x + 14}
            y={boxes.provisioned.y + 224}
            fill="var(--color-text-secondary)"
            fontFamily="var(--font-family-code)"
            fontSize="10"
          >
            of the ~3.9 GB app home
          </text>
        </StationBox>
      </Layer>
    </svg>
  );
}

function MobileUnpack({
  revealed,
  markerId,
}: {
  revealed: number;
  markerId: string;
}) {
  const stageById = Object.fromEntries(
    SHIPMENT_STAGES.map((s) => [s.id, s]),
  ) as Record<ShipmentStageId, ShipmentStage>;
  const x = 16;
  const w = 328;
  const boxes: Record<ShipmentStageId, BoxGeometry> = {
    shell: { x, y: 44, w, h: 56 },
    daemon: { x, y: 134, w, h: 132 },
    runtime: { x, y: 300, w, h: 188 },
    provisioned: { x, y: 522, w, h: 210 },
  };
  const midX = x + w / 2;

  return (
    <svg
      className="h-auto w-full overflow-visible md:hidden"
      viewBox="0 0 360 760"
      role="img"
      aria-labelledby="shipment-mobile-title shipment-mobile-desc"
    >
      <title id="shipment-mobile-title">
        Unpacking the Claude Science 0.1.15 installation
      </title>
      <desc id="shipment-mobile-desc">
        The signed app stages a daemon, which selects a versioned runtime, which
        provisions the much larger Python, R, and MCP execution environments.
        Each box lists its contents; dashed arrows are the reconstructed staging
        handoff.
      </desc>

      <defs>
        <Marker id={markerId} />
      </defs>

      <text
        x="16"
        y="22"
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-code)"
        fontSize="10"
      >
        UNPACKED · DARWIN-ARM64
      </text>
      <text x="16" y="35" fill="var(--color-text-muted)" fontSize="9">
        dashed = reconstructed staging
      </text>

      <Layer index={1} revealed={revealed} origin="top">
        <DownArrow
          x={midX}
          y1={boxes.shell.y + boxes.shell.h}
          y2={boxes.daemon.y}
          verb={stageById.daemon.verb}
          markerId={markerId}
        />
      </Layer>
      <Layer index={2} revealed={revealed} origin="top">
        <DownArrow
          x={midX}
          y1={boxes.daemon.y + boxes.daemon.h}
          y2={boxes.runtime.y}
          verb={stageById.runtime.verb}
          markerId={markerId}
        />
      </Layer>
      <Layer index={3} revealed={revealed} origin="top">
        <DownArrow
          x={midX}
          y1={boxes.runtime.y + boxes.runtime.h}
          y2={boxes.provisioned.y}
          verb={stageById.provisioned.verb}
          markerId={markerId}
        />
      </Layer>

      <Layer index={0} revealed={revealed} origin="top">
        <StationBox stage={stageById.shell} box={boxes.shell} />
      </Layer>

      <Layer index={1} revealed={revealed} origin="top">
        <StationBox stage={stageById.daemon} box={boxes.daemon}>
          <ContentList
            items={stageById.daemon.contents}
            x={x + 14}
            y={boxes.daemon.y + 68}
            columns={2}
            colWidth={158}
            lineHeight={20}
          />
        </StationBox>
      </Layer>

      <Layer index={2} revealed={revealed} origin="top">
        <StationBox stage={stageById.runtime} box={boxes.runtime}>
          <ContentList
            items={stageById.runtime.contents}
            x={x + 14}
            y={boxes.runtime.y + 68}
            columns={3}
            colWidth={104}
            lineHeight={21}
          />
        </StationBox>
      </Layer>

      <Layer index={3} revealed={revealed} origin="top">
        <StationBox stage={stageById.provisioned} box={boxes.provisioned}>
          <ContentList
            items={stageById.provisioned.contents}
            x={x + 14}
            y={boxes.provisioned.y + 68}
            columns={2}
            colWidth={158}
            lineHeight={21}
          />
          <text
            x={x + w - 14}
            y={boxes.provisioned.y + 148}
            textAnchor="end"
            fill={PROVISIONED_ACCENT}
            fontSize="30"
            fontWeight="600"
          >
            ≈95%
          </text>
          <text
            x={x + w - 14}
            y={boxes.provisioned.y + 170}
            textAnchor="end"
            fill="var(--color-text-secondary)"
            fontFamily="var(--font-family-code)"
            fontSize="10"
          >
            of the ~3.9 GB app home
          </text>
        </StationBox>
      </Layer>
    </svg>
  );
}

export function ClaudeScienceShipmentDiagram() {
  const total = SHIPMENT_STAGES.length;
  const [revealed, setRevealed] = React.useState(total);
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const uid = React.useId().replace(/:/g, "");

  const clearTimers = React.useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  const runUnpack = React.useCallback(() => {
    clearTimers();
    setRevealed(1);
    for (let step = 2; step <= total; step += 1) {
      timers.current.push(
        setTimeout(() => setRevealed(step), (step - 1) * STEP_MS),
      );
    }
  }, [clearTimers, total]);

  // Collapse to the first layer before first paint so the unpack can play
  // without a flash. Reduced motion keeps the fully unpacked state.
  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRevealed(1);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(total);
      return;
    }
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      runUnpack();
      return () => clearTimers();
    }
    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played) {
          played = true;
          runUnpack();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [runUnpack, clearTimers, total]);

  return (
    <div ref={rootRef} className="py-3">
      {!reduce ? (
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            onClick={runUnpack}
            className="inline-flex min-h-9 items-center gap-1.5 border border-border px-3 py-1 type-caption text-figure-secondary transition-colors hover:bg-ground-secondary hover:text-figure-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            <span aria-hidden="true">↻</span> Replay unpack
          </button>
        </div>
      ) : null}
      <DesktopUnpack revealed={revealed} markerId={`${uid}-arrow-d`} />
      <MobileUnpack revealed={revealed} markerId={`${uid}-arrow-m`} />
    </div>
  );
}
