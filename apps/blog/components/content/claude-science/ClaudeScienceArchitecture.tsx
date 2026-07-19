"use client";

import * as React from "react";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";

type SystemId = "execution" | "verification" | "evidence";
type SystemMode = "all" | SystemId;

interface Point {
  x: number;
  y: number;
}

const SYSTEMS: Array<{ id: SystemMode; label: string }> = [
  { id: "all", label: "All paths" },
  { id: "execution", label: "Execution" },
  { id: "verification", label: "Verification" },
  { id: "evidence", label: "Evidence" },
];

const SYSTEM_COLORS: Record<SystemId, string> = {
  execution: "var(--color-data-1)",
  verification: "var(--color-data-3)",
  evidence: "var(--color-data-5)",
};

const TRACE_STEPS = [
  "Ready: the faint route shows one work unit crossing the harness.",
  "1. The repl control kernel issues a governed host request.",
  "2. The local daemon evaluates dispatch and permits.",
  "3. A persistent data kernel, shell process, or compute provider performs the work.",
  "4. The daemon records execution and privileged host-call evidence.",
  "5. New activity reaches the checkpoint predicate.",
  "6. A detached REVIEWER traces the recorded evidence.",
  "7. Findings meet the terminal delivery barrier.",
  "8. Artifact versions, dependencies, and verification state are persisted.",
  "9. A replay export projects recorded host responses outside the daemon.",
];

const DESKTOP_TRACE_POINTS: Point[] = [
  { x: 155, y: 126 },
  { x: 420, y: 291 },
  { x: 475, y: 118 },
  { x: 168, y: 560 },
  { x: 778, y: 251 },
  { x: 800, y: 348 },
  { x: 780, y: 555 },
  { x: 472, y: 555 },
  { x: 815, y: 640 },
];

const MOBILE_TRACE_POINTS: Point[] = [
  { x: 180, y: 104 },
  { x: 112, y: 392 },
  { x: 104, y: 199 },
  { x: 100, y: 855 },
  { x: 100, y: 603 },
  { x: 260, y: 603 },
  { x: 260, y: 697 },
  { x: 260, y: 855 },
  { x: 260, y: 940 },
];

function systemOpacity(mode: SystemMode, system: SystemId) {
  return mode === "all" || mode === system ? 1 : 0.16;
}

function SvgNode({
  x,
  y,
  width,
  height,
  system,
  label,
  title,
  lines = [],
  dashed = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  system: SystemId;
  label: string;
  title: string;
  lines?: string[];
  dashed?: boolean;
}) {
  const color = SYSTEM_COLORS[system];

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="var(--color-bg-primary)"
        stroke="var(--color-border-strong)"
        strokeDasharray={dashed ? "5 4" : undefined}
        strokeWidth="1.25"
      />
      <path d={`M${x} ${y}V${y + height}`} stroke={color} strokeWidth="3" />
      <text
        x={x + 12}
        y={y + 18}
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-code)"
        fontSize="9"
      >
        {label}
      </text>
      <text
        x={x + 12}
        y={y + 39}
        fill="var(--color-text-primary)"
        fontFamily="var(--font-family-body)"
        fontSize="13"
        fontWeight="500"
      >
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          key={line}
          x={x + 12}
          y={y + 57 + index * 15}
          fill="var(--color-text-secondary)"
          fontFamily="var(--font-family-body)"
          fontSize="10"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function FlowPath({
  d,
  label,
  labelAt,
  system,
  markerId,
  dashed = false,
}: {
  d: string;
  label: string;
  labelAt: Point;
  system: SystemId;
  markerId: string;
  dashed?: boolean;
}) {
  const color = SYSTEM_COLORS[system];

  return (
    <g>
      <path
        d={d}
        fill="none"
        markerEnd={`url(#${markerId})`}
        stroke={color}
        strokeDasharray={dashed ? "5 4" : undefined}
        strokeWidth="1.5"
      />
      {label ? (
        <text
          x={labelAt.x}
          y={labelAt.y}
          fill="var(--color-text-secondary)"
          fontFamily="var(--font-family-body)"
          fontSize="9"
          textAnchor="middle"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function TraceSegment({
  d,
  active,
  system,
}: {
  d: string;
  active: boolean;
  system: SystemId;
}) {
  return (
    <path
      d={d}
      fill="none"
      pathLength={1}
      stroke={SYSTEM_COLORS[system]}
      strokeDasharray={1}
      strokeDashoffset={active ? 0 : 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      className="transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none"
    />
  );
}

function ArrowMarkers({ suffix }: { suffix: string }) {
  return (
    <defs>
      {(["execution", "verification", "evidence"] as SystemId[]).map(
        (system) => (
          <marker
            key={system}
            id={`architecture-${system}-${suffix}`}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0 0L7 3.5L0 7Z" fill={SYSTEM_COLORS[system]} />
          </marker>
        ),
      )}
    </defs>
  );
}

function DesktopArchitectureGraphic({
  mode,
  traceStep,
  reducedMotion,
}: {
  mode: SystemMode;
  traceStep: number;
  reducedMotion: boolean;
}) {
  const point = DESKTOP_TRACE_POINTS[Math.max(0, traceStep - 1)];
  const traceColor =
    traceStep <= 3
      ? SYSTEM_COLORS.execution
      : traceStep <= 7
        ? traceStep === 4
          ? SYSTEM_COLORS.evidence
          : SYSTEM_COLORS.verification
        : SYSTEM_COLORS.evidence;

  return (
    <svg
      className="hidden h-auto w-full overflow-visible sm:block"
      viewBox="0 0 960 690"
      role="img"
      aria-labelledby="architecture-title-desktop architecture-desc-desktop"
    >
      <title id="architecture-title-desktop">
        Daemon-centered Claude Science architecture
      </title>
      <desc id="architecture-desc-desktop">
        The central local daemon owns dispatch and permits, identity and
        approvals, persistence, and runtime lifecycle. An execution circuit
        connects a repl control kernel to persistent Python and R kernels, shell
        execution, and remote compute. A verification circuit connects a
        checkpoint predicate, detached reviewer, optional bookmarker, and
        terminal barrier. An evidence circuit stores execution and host-call
        logs, artifact versions and dependencies, verification checks, and
        replay exports. These paths are an analytical grouping of directly
        observed components and flows.
      </desc>
      <ArrowMarkers suffix="desktop" />

      <g
        style={{ opacity: systemOpacity(mode, "execution") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <rect
          x="28"
          y="38"
          width="904"
          height="160"
          fill="none"
          stroke={SYSTEM_COLORS.execution}
          strokeDasharray="7 6"
          strokeOpacity="0.55"
        />
        <text
          x="44"
          y="58"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          EXECUTION / ANALYTICAL CIRCUIT
        </text>
        <SvgNode
          x={52}
          y={82}
          width={206}
          height={86}
          system="execution"
          label="CONTROL PLANE"
          title="repl control kernel"
          lines={["stdlib-only", "MCP / agents / skills / compute"]}
        />
        <SvgNode
          x={335}
          y={70}
          width={280}
          height={104}
          system="execution"
          label="DATA PLANE"
          title="persistent Python / R"
          lines={["shell process", "shared cwd; separate memory"]}
        />
        <SvgNode
          x={690}
          y={82}
          width={220}
          height={86}
          system="execution"
          label="EXTERNAL CAPABILITY"
          title="remote compute provider"
          lines={["available when configured"]}
          dashed
        />
        <FlowPath
          d="M258 126H335"
          label="handoff files"
          labelAt={{ x: 296, y: 117 }}
          system="execution"
          markerId="architecture-execution-desktop"
        />
        <FlowPath
          d="M615 126H690"
          label="dispatch"
          labelAt={{ x: 652, y: 117 }}
          system="execution"
          markerId="architecture-execution-desktop"
          dashed
        />
      </g>

      <g
        style={{ opacity: systemOpacity(mode, "verification") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <rect
          x="652"
          y="210"
          width="280"
          height="270"
          fill="none"
          stroke={SYSTEM_COLORS.verification}
          strokeDasharray="7 6"
          strokeOpacity="0.55"
        />
        <text
          x="668"
          y="230"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          SUPERVISION / ANALYTICAL CIRCUIT
        </text>
        <SvgNode
          x={680}
          y={248}
          width={220}
          height={70}
          system="verification"
          label="EVENT-TRIGGERED"
          title="checkpoint predicate"
          lines={["activity + interval gates"]}
        />
        <SvgNode
          x={700}
          y={342}
          width={200}
          height={70}
          system="verification"
          label="DETACHED / READ-ONLY"
          title="REVIEWER"
          lines={["trace; do not recompute"]}
        />
        <SvgNode
          x={700}
          y={426}
          width={200}
          height={42}
          system="verification"
          label="SHIPPED; DEFAULT OFF"
          title="BOOKMARKER"
          dashed
        />
        <path
          d="M666 326V456M672 326V456"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <text
          x="658"
          y="391"
          textAnchor="end"
          fill="var(--color-text-secondary)"
          fontFamily="var(--font-family-body)"
          fontSize="9"
        >
          terminal barrier
        </text>
        <FlowPath
          d="M790 318V342"
          label="enqueue"
          labelAt={{ x: 827, y: 334 }}
          system="verification"
          markerId="architecture-verification-desktop"
        />
        <FlowPath
          d="M800 412V426"
          label="optional"
          labelAt={{ x: 839, y: 423 }}
          system="verification"
          markerId="architecture-verification-desktop"
          dashed
        />
      </g>

      <g
        style={{ opacity: systemOpacity(mode, "evidence") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <rect
          x="28"
          y="494"
          width="904"
          height="176"
          fill="none"
          stroke={SYSTEM_COLORS.evidence}
          strokeDasharray="7 6"
          strokeOpacity="0.55"
        />
        <text
          x="44"
          y="514"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          EVIDENCE / ANALYTICAL CIRCUIT
        </text>
        <SvgNode
          x={52}
          y={530}
          width={232}
          height={78}
          system="evidence"
          label="EXECUTION INTERSECTION"
          title="execution_log + host_call_log"
          lines={["source / effects / errors"]}
        />
        <SvgNode
          x={350}
          y={530}
          width={244}
          height={78}
          system="evidence"
          label="DURABLE PRODUCT OUTPUT"
          title="artifact_versions"
          lines={["artifact_dependencies / lineage"]}
        />
        <SvgNode
          x={660}
          y={530}
          width={240}
          height={78}
          system="evidence"
          label="SUPERVISION INTERSECTION"
          title="verification_checks + findings"
          lines={["delivery state / invalidation"]}
        />
        <SvgNode
          x={690}
          y={622}
          width={210}
          height={38}
          system="evidence"
          label="PORTABLE PROJECTION"
          title="replay export"
        />
        <FlowPath
          d="M284 569H350"
          label="produce"
          labelAt={{ x: 317, y: 560 }}
          system="evidence"
          markerId="architecture-evidence-desktop"
        />
        <FlowPath
          d="M594 569H660"
          label="verify"
          labelAt={{ x: 627, y: 560 }}
          system="evidence"
          markerId="architecture-evidence-desktop"
        />
        <FlowPath
          d="M780 608V622"
          label="replay"
          labelAt={{ x: 816, y: 619 }}
          system="evidence"
          markerId="architecture-evidence-desktop"
        />
      </g>

      <g>
        <rect
          x="326"
          y="216"
          width="304"
          height="232"
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <rect
          x="334"
          y="224"
          width="288"
          height="216"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <path
          d="M334 270H622M478 270V440M334 355H622"
          stroke="var(--color-border-default)"
        />
        <path
          d="M334 224H622"
          stroke="var(--color-action-primary)"
          strokeWidth="4"
        />
        <text
          x="350"
          y="248"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          LOCAL DAEMON / OPERON AUTHORITY BOUNDARY
        </text>
        <text
          x="350"
          y="294"
          fill="var(--color-text-primary)"
          fontSize="13"
          fontWeight="500"
        >
          dispatch + permits
        </text>
        <text
          x="494"
          y="294"
          fill="var(--color-text-primary)"
          fontSize="13"
          fontWeight="500"
        >
          identity + approvals
        </text>
        <text
          x="350"
          y="380"
          fill="var(--color-text-primary)"
          fontSize="13"
          fontWeight="500"
        >
          persistence
        </text>
        <text
          x="494"
          y="380"
          fill="var(--color-text-primary)"
          fontSize="13"
          fontWeight="500"
        >
          runtime lifecycle
        </text>
        <text x="350" y="318" fill="var(--color-text-secondary)" fontSize="10">
          profile gates
        </text>
        <text x="350" y="333" fill="var(--color-text-secondary)" fontSize="10">
          handler validation
        </text>
        <text x="494" y="318" fill="var(--color-text-secondary)" fontSize="10">
          capability decisions
        </text>
        <text x="350" y="404" fill="var(--color-text-secondary)" fontSize="10">
          SQLite + artifact state
        </text>
        <text x="494" y="404" fill="var(--color-text-secondary)" fontSize="10">
          kernels + runtime payload
        </text>
      </g>

      <g
        style={{ opacity: systemOpacity(mode, "execution") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <FlowPath
          d="M155 168V202H410V216"
          label="request"
          labelAt={{ x: 282, y: 193 }}
          system="execution"
          markerId="architecture-execution-desktop"
        />
        <FlowPath
          d="M478 216V174"
          label="permit / refuse"
          labelAt={{ x: 530, y: 198 }}
          system="execution"
          markerId="architecture-execution-desktop"
        />
        <FlowPath
          d="M622 306H650V126H690"
          label="dispatch"
          labelAt={{ x: 657, y: 188 }}
          system="execution"
          markerId="architecture-execution-desktop"
          dashed
        />
      </g>

      <g
        style={{ opacity: systemOpacity(mode, "verification") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <FlowPath
          d="M622 288H680"
          label="trigger"
          labelAt={{ x: 651, y: 279 }}
          system="verification"
          markerId="architecture-verification-desktop"
        />
        <FlowPath
          d="M700 378H672"
          label="finding / pass"
          labelAt={{ x: 686, y: 369 }}
          system="verification"
          markerId="architecture-verification-desktop"
        />
        <FlowPath
          d="M672 432H780V530"
          label="delivery state"
          labelAt={{ x: 735, y: 484 }}
          system="verification"
          markerId="architecture-verification-desktop"
        />
      </g>

      <g
        style={{ opacity: systemOpacity(mode, "evidence") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <FlowPath
          d="M390 440V470H168V530"
          label="record"
          labelAt={{ x: 280, y: 461 }}
          system="evidence"
          markerId="architecture-evidence-desktop"
        />
        <FlowPath
          d="M530 440V530"
          label="persist"
          labelAt={{ x: 554, y: 487 }}
          system="evidence"
          markerId="architecture-evidence-desktop"
        />
      </g>

      <path
        d="M155 126L420 291L475 118L168 560L778 251L800 348L780 555L472 555L815 640"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeDasharray="3 7"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
      <TraceSegment
        d="M155 126L420 291"
        active={traceStep >= 2}
        system="execution"
      />
      <TraceSegment
        d="M420 291L475 118"
        active={traceStep >= 3}
        system="execution"
      />
      <TraceSegment
        d="M475 118L168 560"
        active={traceStep >= 4}
        system="evidence"
      />
      <TraceSegment
        d="M168 560L778 251"
        active={traceStep >= 5}
        system="verification"
      />
      <TraceSegment
        d="M778 251L800 348"
        active={traceStep >= 6}
        system="verification"
      />
      <TraceSegment
        d="M800 348L780 555"
        active={traceStep >= 7}
        system="verification"
      />
      <TraceSegment
        d="M780 555L472 555"
        active={traceStep >= 8}
        system="evidence"
      />
      <TraceSegment
        d="M472 555L815 640"
        active={traceStep >= 9}
        system="evidence"
      />

      {traceStep > 0 ? (
        <circle
          cx={point.x}
          cy={point.y}
          r="7"
          fill={traceColor}
          stroke="var(--color-bg-primary)"
          strokeWidth="2"
          className="transition-[cx,cy,fill] duration-500 ease-out motion-reduce:transition-none"
        />
      ) : null}

      {reducedMotion && traceStep > 0 ? (
        <g
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-strong)"
          textAnchor="middle"
          fontFamily="var(--font-family-code)"
          fontSize="8"
        >
          {DESKTOP_TRACE_POINTS.map((tracePoint, index) => (
            <g key={`${tracePoint.x}-${tracePoint.y}`}>
              <circle cx={tracePoint.x} cy={tracePoint.y} r="9" />
              <text
                x={tracePoint.x}
                y={tracePoint.y + 3}
                fill="var(--color-text-primary)"
                stroke="none"
              >
                {index + 1}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}

function MobileArchitectureGraphic({
  mode,
  traceStep,
  reducedMotion,
}: {
  mode: SystemMode;
  traceStep: number;
  reducedMotion: boolean;
}) {
  const point = MOBILE_TRACE_POINTS[Math.max(0, traceStep - 1)];
  const traceColor =
    traceStep <= 3
      ? SYSTEM_COLORS.execution
      : traceStep <= 7
        ? traceStep === 4
          ? SYSTEM_COLORS.evidence
          : SYSTEM_COLORS.verification
        : SYSTEM_COLORS.evidence;

  return (
    <svg
      className="h-auto w-full overflow-visible sm:hidden"
      viewBox="0 0 360 990"
      role="img"
      aria-labelledby="architecture-title-mobile architecture-desc-mobile"
    >
      <title id="architecture-title-mobile">
        Daemon-centered Claude Science architecture
      </title>
      <desc id="architecture-desc-mobile">
        A vertical map of the execution, daemon authority, verification, and
        evidence circuits. The daemon remains the same authority boundary for
        every section. A faint route crosses the harness once.
      </desc>
      <ArrowMarkers suffix="mobile" />

      <g
        style={{ opacity: systemOpacity(mode, "execution") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <rect
          x="14"
          y="26"
          width="332"
          height="236"
          fill="none"
          stroke={SYSTEM_COLORS.execution}
          strokeDasharray="7 6"
          strokeOpacity="0.55"
        />
        <text
          x="28"
          y="47"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          EXECUTION / ANALYTICAL CIRCUIT
        </text>
        <SvgNode
          x={30}
          y={66}
          width={300}
          height={76}
          system="execution"
          label="CONTROL PLANE"
          title="repl control kernel"
          lines={["stdlib-only / governed host calls"]}
        />
        <SvgNode
          x={30}
          y={162}
          width={144}
          height={82}
          system="execution"
          label="DATA PLANE"
          title="Python / R"
          lines={["persistent state", "shared cwd"]}
        />
        <SvgNode
          x={186}
          y={162}
          width={144}
          height={82}
          system="execution"
          label="PROCESS LANES"
          title="shell / compute"
          lines={["provider-gated"]}
          dashed
        />
        <FlowPath
          d="M180 142V152H102V162"
          label="handoff"
          labelAt={{ x: 137, y: 155 }}
          system="execution"
          markerId="architecture-execution-mobile"
        />
        <FlowPath
          d="M174 203H186"
          label=""
          labelAt={{ x: 180, y: 194 }}
          system="execution"
          markerId="architecture-execution-mobile"
          dashed
        />
      </g>

      <g>
        <rect
          x="26"
          y="292"
          width="308"
          height="216"
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <rect
          x="34"
          y="300"
          width="292"
          height="200"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <path
          d="M34 342H326M180 342V500M34 416H326"
          stroke="var(--color-border-default)"
        />
        <path
          d="M34 300H326"
          stroke="var(--color-action-primary)"
          strokeWidth="4"
        />
        <text
          x="50"
          y="325"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          SAME LOCAL DAEMON BOUNDARY
        </text>
        <text
          x="50"
          y="370"
          fill="var(--color-text-primary)"
          fontSize="12"
          fontWeight="500"
        >
          dispatch + permits
        </text>
        <text
          x="194"
          y="370"
          fill="var(--color-text-primary)"
          fontSize="12"
          fontWeight="500"
        >
          identity + approvals
        </text>
        <text
          x="50"
          y="444"
          fill="var(--color-text-primary)"
          fontSize="12"
          fontWeight="500"
        >
          persistence
        </text>
        <text
          x="194"
          y="444"
          fill="var(--color-text-primary)"
          fontSize="12"
          fontWeight="500"
        >
          runtime lifecycle
        </text>
        <text x="50" y="391" fill="var(--color-text-secondary)" fontSize="9">
          profile gates
        </text>
        <text x="194" y="391" fill="var(--color-text-secondary)" fontSize="9">
          capability decisions
        </text>
        <text x="50" y="465" fill="var(--color-text-secondary)" fontSize="9">
          SQLite + artifacts
        </text>
        <text x="194" y="465" fill="var(--color-text-secondary)" fontSize="9">
          kernels + payload
        </text>
      </g>

      <g
        style={{ opacity: systemOpacity(mode, "verification") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <rect
          x="14"
          y="536"
          width="332"
          height="218"
          fill="none"
          stroke={SYSTEM_COLORS.verification}
          strokeDasharray="7 6"
          strokeOpacity="0.55"
        />
        <text
          x="28"
          y="557"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          SUPERVISION / ANALYTICAL CIRCUIT
        </text>
        <SvgNode
          x={30}
          y={574}
          width={140}
          height={70}
          system="verification"
          label="EVENT-TRIGGERED"
          title="checkpoint"
          lines={["predicate"]}
        />
        <SvgNode
          x={190}
          y={574}
          width={140}
          height={70}
          system="verification"
          label="DETACHED"
          title="REVIEWER"
          lines={["read-only trace"]}
        />
        <SvgNode
          x={30}
          y={672}
          width={140}
          height={54}
          system="verification"
          label="DEFAULT OFF"
          title="BOOKMARKER"
          dashed
        />
        <path
          d="M181 660V730M187 660V730"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <text x="196" y="664" fill="var(--color-text-secondary)" fontSize="9">
          terminal barrier
        </text>
        <SvgNode
          x={190}
          y={672}
          width={140}
          height={54}
          system="verification"
          label="DELIVERY STATE"
          title="findings / pass"
        />
        <FlowPath
          d="M170 609H190"
          label="enqueue"
          labelAt={{ x: 180, y: 600 }}
          system="verification"
          markerId="architecture-verification-mobile"
        />
        <FlowPath
          d="M260 644V672"
          label="review"
          labelAt={{ x: 287, y: 662 }}
          system="verification"
          markerId="architecture-verification-mobile"
        />
      </g>

      <g
        style={{ opacity: systemOpacity(mode, "evidence") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <rect
          x="14"
          y="782"
          width="332"
          height="192"
          fill="none"
          stroke={SYSTEM_COLORS.evidence}
          strokeDasharray="7 6"
          strokeOpacity="0.55"
        />
        <text
          x="28"
          y="803"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          EVIDENCE / ANALYTICAL CIRCUIT
        </text>
        <SvgNode
          x={30}
          y={822}
          width={140}
          height={68}
          system="evidence"
          label="RECORDED"
          title="execution_log"
          lines={["+ host_call_log"]}
        />
        <SvgNode
          x={190}
          y={822}
          width={140}
          height={68}
          system="evidence"
          label="VERSIONED"
          title="artifacts"
          lines={["+ dependencies"]}
        />
        <SvgNode
          x={30}
          y={910}
          width={140}
          height={48}
          system="evidence"
          label="VERIFIED"
          title="checks / findings"
        />
        <SvgNode
          x={190}
          y={910}
          width={140}
          height={48}
          system="evidence"
          label="PORTABLE"
          title="replay export"
        />
        <FlowPath
          d="M170 856H190"
          label="persist"
          labelAt={{ x: 180, y: 847 }}
          system="evidence"
          markerId="architecture-evidence-mobile"
        />
        <FlowPath
          d="M260 890V910"
          label="replay"
          labelAt={{ x: 288, y: 905 }}
          system="evidence"
          markerId="architecture-evidence-mobile"
        />
      </g>

      <g
        style={{ opacity: systemOpacity(mode, "execution") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <FlowPath
          d="M180 142V292"
          label="request"
          labelAt={{ x: 206, y: 277 }}
          system="execution"
          markerId="architecture-execution-mobile"
        />
        <FlowPath
          d="M112 292V244"
          label="permit / refuse"
          labelAt={{ x: 77, y: 276 }}
          system="execution"
          markerId="architecture-execution-mobile"
        />
      </g>
      <g
        style={{ opacity: systemOpacity(mode, "verification") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <FlowPath
          d="M250 508V550H100V574"
          label="trigger"
          labelAt={{ x: 164, y: 528 }}
          system="verification"
          markerId="architecture-verification-mobile"
        />
      </g>
      <g
        style={{ opacity: systemOpacity(mode, "evidence") }}
        className="transition-opacity duration-300 motion-reduce:transition-none"
      >
        <FlowPath
          d="M112 508V520H6V856H30"
          label="record"
          labelAt={{ x: 40, y: 847 }}
          system="evidence"
          markerId="architecture-evidence-mobile"
        />
        <FlowPath
          d="M250 508V520H354V856H330"
          label="persist"
          labelAt={{ x: 320, y: 847 }}
          system="evidence"
          markerId="architecture-evidence-mobile"
        />
      </g>

      <path
        d="M180 104L112 392L104 199L100 855L100 603L260 603L260 697L260 855L260 940"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeDasharray="3 7"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
      <TraceSegment
        d="M180 104L112 392"
        active={traceStep >= 2}
        system="execution"
      />
      <TraceSegment
        d="M112 392L104 199"
        active={traceStep >= 3}
        system="execution"
      />
      <TraceSegment
        d="M104 199L100 855"
        active={traceStep >= 4}
        system="evidence"
      />
      <TraceSegment
        d="M100 855L100 603"
        active={traceStep >= 5}
        system="verification"
      />
      <TraceSegment
        d="M100 603L260 603"
        active={traceStep >= 6}
        system="verification"
      />
      <TraceSegment
        d="M260 603L260 697"
        active={traceStep >= 7}
        system="verification"
      />
      <TraceSegment
        d="M260 697L260 855"
        active={traceStep >= 8}
        system="evidence"
      />
      <TraceSegment
        d="M260 855L260 940"
        active={traceStep >= 9}
        system="evidence"
      />

      {traceStep > 0 ? (
        <circle
          cx={point.x}
          cy={point.y}
          r="7"
          fill={traceColor}
          stroke="var(--color-bg-primary)"
          strokeWidth="2"
          className="transition-[cx,cy,fill] duration-500 ease-out motion-reduce:transition-none"
        />
      ) : null}

      {reducedMotion && traceStep > 0 ? (
        <g
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-strong)"
          textAnchor="middle"
          fontFamily="var(--font-family-code)"
          fontSize="8"
        >
          {MOBILE_TRACE_POINTS.map((tracePoint, index) => (
            <g key={`${tracePoint.x}-${tracePoint.y}`}>
              <circle cx={tracePoint.x} cy={tracePoint.y} r="9" />
              <text
                x={tracePoint.x}
                y={tracePoint.y + 3}
                fill="var(--color-text-primary)"
                stroke="none"
              >
                {index + 1}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}

export function ClaudeScienceArchitecture() {
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = React.useState<SystemMode>("all");
  const [traceStep, setTraceStep] = React.useState(0);
  const [isTracing, setIsTracing] = React.useState(false);

  React.useEffect(() => {
    if (!isTracing) return;

    if (prefersReducedMotion) {
      setTraceStep(9);
      setIsTracing(false);
      return;
    }

    if (traceStep >= 9) {
      setIsTracing(false);
      return;
    }

    const timer = window.setTimeout(
      () => setTraceStep((step) => step + 1),
      540,
    );
    return () => window.clearTimeout(timer);
  }, [isTracing, prefersReducedMotion, traceStep]);

  const traceWorkflow = () => {
    setMode("all");

    if (prefersReducedMotion) {
      setTraceStep(9);
      setIsTracing(false);
      return;
    }

    setTraceStep(1);
    setIsTracing(true);
  };

  return (
    <FigureScaffold
      eyebrow="Runtime architecture"
      title="The daemon-centered harness"
      description="Execution, verification, and artifact evidence cross one daemon-owned authority boundary. Selecting a path preserves the whole topology; the workflow trace follows one work unit through it."
      caption={
        <>
          <strong>
            Figure B. Kernels hold state; the daemon owns authority and history.
          </strong>{" "}
          The paths are analytical, while the gates, workers, reviewer flow,
          persistence tables, and replay machinery are directly observed in the
          local runtime and extracted daemon fragments.
        </>
      }
    >
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div
          className="grid w-full max-w-sm grid-cols-2 border border-border p-1 sm:inline-flex sm:w-auto sm:max-w-full sm:flex-wrap"
          role="group"
          aria-label="Select architecture circuit"
        >
          {SYSTEMS.map((system) => (
            <button
              key={system.id}
              type="button"
              aria-pressed={mode === system.id}
              className={`min-h-11 px-3 py-2 type-label transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                mode === system.id
                  ? "bg-action-primary text-figure-inverse"
                  : "text-figure-secondary hover:bg-ground-secondary hover:text-figure-primary"
              }`}
              onClick={() => setMode(system.id)}
            >
              {system.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="min-h-11 border border-border px-3 py-2 type-label text-figure-primary transition-colors hover:bg-ground-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-wait disabled:text-figure-muted"
          onClick={traceWorkflow}
          disabled={isTracing}
        >
          {isTracing ? "Tracing workflow..." : "Trace one workflow"}
        </button>
      </div>

      <div
        className="mt-4 flex flex-wrap gap-x-5 gap-y-2 type-caption text-figure-secondary"
        aria-label="Diagram notation"
      >
        {(["execution", "verification", "evidence"] as SystemId[]).map(
          (system) => (
            <span key={system} className="inline-flex items-center gap-2">
              <span
                className="h-0 w-6 border-t-2"
                style={{ borderColor: SYSTEM_COLORS[system] }}
                aria-hidden="true"
              />
              {system}
            </span>
          ),
        )}
        <span className="inline-flex items-center gap-2">
          <span
            className="h-0 w-6 border-t border-dashed border-border-strong"
            aria-hidden="true"
          />
          analytical grouping or optional path
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2 w-6 border-y border-border-strong"
            aria-hidden="true"
          />
          authority or delivery boundary
        </span>
      </div>

      <div className="mt-4 min-w-0">
        <DesktopArchitectureGraphic
          mode={mode}
          traceStep={traceStep}
          reducedMotion={prefersReducedMotion}
        />
        <MobileArchitectureGraphic
          mode={mode}
          traceStep={traceStep}
          reducedMotion={prefersReducedMotion}
        />
      </div>

      <p
        className="type-caption mt-3 border-l-2 border-action-primary pl-3 text-figure-secondary"
        aria-live="polite"
      >
        {TRACE_STEPS[traceStep]}
      </p>

      <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-3 sm:gap-6">
        <p className="type-caption m-0 text-figure-secondary">
          <strong className="text-figure-primary">Execution:</strong> kernel
          requests cross daemon permit and handler validation.
        </p>
        <p className="type-caption m-0 text-figure-secondary">
          <strong className="text-figure-primary">Verification:</strong>{" "}
          detached review can still bind terminal delivery.
        </p>
        <p className="type-caption m-0 text-figure-secondary">
          <strong className="text-figure-primary">Evidence:</strong> logs,
          artifacts, lineage, checks, and replay survive the message loop.
        </p>
      </div>
    </FigureScaffold>
  );
}
