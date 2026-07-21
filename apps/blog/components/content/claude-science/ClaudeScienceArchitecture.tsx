"use client";

import * as React from "react";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";

// Essay colour grammar: three systems, one hue each.
const EXEC = "var(--color-data-1)"; // execution / kernels
const SUPER = "var(--color-text-secondary)"; // supervision / reviewer
const EVID = "var(--color-data-1)"; // evidence / artifacts
const NEUTRAL = "var(--color-text-muted)";
const QUERY = "var(--color-action-primary)"; // the traced query packet

// Theme-safe tinted fill: mostly the page background, lightly system-coloured.
const tint = (c: string) => `color-mix(in srgb, ${c} 14%, var(--color-bg-primary))`;

const STEP_MS = 700;
const DUR_S = STEP_MS / 1000;

// One query's life. Each hop is one real edge the packet travels; between spokes
// the packet returns to the daemon rather than cutting across the diagram.
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

// Each edge is a real drawn connector (or its reverse); the packet stays on the
// lines and always passes back through the daemon between spokes.
const DESKTOP_EDGES = [
  "M375 62 L375 110", // user -> daemon
  "M300 150 L250 150", // daemon -> repl
  "M145 176 L145 198", // repl -> handoff (write)
  "M145 240 L145 260", // handoff -> python (read)
  "M250 283 L300 272", // python -> daemon (host call back)
  "M450 149 L468 149", // daemon -> mcp
  "M450 300 L480 300", // daemon -> artifact
  "M375 360 L375 408", // daemon -> reviewer
];

// Mobile is a daemon "spine" at x=64: every worker and record taps the spine
// separately, so nothing chains to its neighbour. The packet rides the spine
// out to each box and back.
const MOBILE_EDGES = [
  "M180 50 L180 82", // user -> daemon
  "M64 168 L64 249 L100 249", // daemon spine -> repl
  "M210 274 L210 310", // repl -> handoff (write)
  "M210 354 L210 398", // handoff -> python (read)
  "M100 423 L64 423", // python -> daemon spine
  "M64 423 L64 583 L100 583", // daemon -> mcp
  "M100 583 L64 583 L64 664 L100 664", // mcp -> daemon -> artifact
  "M100 664 L64 664 L64 746 L100 746", // artifact -> daemon -> reviewer
];

function FlowKeyframes() {
  return (
    <style>{`@keyframes cs-arch-query{from{offset-distance:0%}to{offset-distance:100%}}`}</style>
  );
}

// One packet on one edge; the parent remounts it (via key) each hop.
function QueryPacket({ path }: { path: string }) {
  return (
    <circle
      r="5.5"
      fill={QUERY}
      stroke="var(--color-bg-primary)"
      strokeWidth="1.5"
      style={{
        offsetPath: `path('${path}')`,
        offsetRotate: "0deg",
        animation: `cs-arch-query ${DUR_S}s linear both`,
      }}
    />
  );
}

const arrowMarker = (id: string) => (
  <marker
    id={id}
    viewBox="0 0 10 10"
    refX="8"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <path d="M1 1 L8 5 L1 9" fill="none" stroke={NEUTRAL} strokeWidth="1.6" />
  </marker>
);

function DesktopArchitecture({
  playing,
  active,
  hop,
  runId,
  titleId,
  descId,
}: {
  playing: boolean;
  active: string | null;
  hop: number;
  runId: number;
  titleId: string;
  descId: string;
}) {
  const t = "var(--color-text-primary)";
  const sub = "var(--color-text-secondary)";
  const mut = "var(--color-text-muted)";
  const inv = "var(--color-bg-primary)";
  const sw = (id: string, base = 1.4) => (active === id ? 3 : base);

  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      viewBox="0 0 720 480"
      className="hidden h-auto w-full md:block"
    >
      <title id={titleId}>Daemon-centered Claude Science architecture</title>
      <desc id={descId}>
        The daemon is the central authority. A stdlib control-plane repl and
        persistent Python and R data-plane kernels are subordinate workers that
        exchange data through files in a shared workspace, not shared memory.
        Every privileged call crosses a host-call boundary into the daemon,
        which mediates external connectors and owns the versioned artifact store
        whose lineage is observed from runtime tags before it is reconstructed. A
        read-only reviewer wakes on checkpoints. Play traces one query, hop by
        hop, always back through the daemon.
      </desc>
      <defs>
        <FlowKeyframes />
        {arrowMarker("cs-arch-arrow")}
      </defs>

      {/* grouping panels */}
      <rect x="24" y="96" width="252" height="332" rx="10" fill="none" stroke="var(--color-border-strong)" strokeDasharray="5 4" />
      <text x="36" y="115" fontSize="10.5" fontWeight="600" fill={mut}>EXECUTION · workers</text>
      <rect x="468" y="238" width="228" height="150" rx="10" fill="none" stroke="var(--color-border-strong)" strokeDasharray="5 4" />
      <text x="480" y="257" fontSize="10.5" fontWeight="600" fill={mut}>EVIDENCE · durable records</text>

      {/* connectors */}
      <path d="M375 62 L375 110" fill="none" stroke={NEUTRAL} strokeWidth="1.5" markerEnd="url(#cs-arch-arrow)" />
      <path d="M250 150 L300 150" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-arch-arrow)" markerStart="url(#cs-arch-arrow)" />
      <path d="M250 283 L300 272" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-arch-arrow)" markerStart="url(#cs-arch-arrow)" />
      <path d="M250 345 L300 332" fill="none" stroke={EXEC} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#cs-arch-arrow)" markerStart="url(#cs-arch-arrow)" />
      <path d="M145 176 L145 198" fill="none" stroke={NEUTRAL} strokeWidth="1.5" markerEnd="url(#cs-arch-arrow)" />
      <path d="M145 240 L145 260" fill="none" stroke={NEUTRAL} strokeWidth="1.5" markerEnd="url(#cs-arch-arrow)" />
      <path d="M450 149 L468 149" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-arch-arrow)" />
      <path d="M450 300 L480 300" fill="none" stroke={EVID} strokeWidth="1.6" markerEnd="url(#cs-arch-arrow)" />
      <path d="M375 360 L375 408" fill="none" stroke={SUPER} strokeWidth="1.5" strokeDasharray="1.5 4" markerEnd="url(#cs-arch-arrow)" />

      <text x="152" y="192" fontSize="9.5" fill={mut}>write</text>
      <text x="152" y="255" fontSize="9.5" fill={mut}>read</text>
      <text x="384" y="150" fontSize="9.5" fill={mut} textAnchor="end">host call</text>
      <text x="382" y="388" fontSize="9.5" fill={SUPER}>on checkpoint</text>

      {/* host-call boundary */}
      <line x1="286" y1="122" x2="286" y2="352" stroke="var(--color-border-strong)" strokeDasharray="5 4" />
      <text transform="rotate(-90 293 300)" x="293" y="300" textAnchor="middle" fontSize="10" fill={mut}>host-call boundary</text>

      {/* user */}
      <rect x="300" y="28" width="150" height="34" rx="8" fill="var(--color-bg-secondary)" stroke={active === "user" ? QUERY : "var(--color-border)"} strokeWidth={sw("user")} />
      <text x="375" y="50" textAnchor="middle" fontSize="12" fill={t}>User · local web UI</text>

      {/* daemon */}
      <rect x="300" y="110" width="150" height="250" rx="10" fill={t} stroke={active === "daemon" ? QUERY : "none"} strokeWidth={active === "daemon" ? 3 : 0} />
      <text x="375" y="182" textAnchor="middle" fontSize="17" fontWeight="600" fill={inv}>Daemon</text>
      <text x="375" y="202" textAnchor="middle" fontSize="11" fill={inv} opacity="0.72">the authority</text>
      <line x1="322" y1="218" x2="428" y2="218" stroke={inv} strokeOpacity="0.2" />
      <text x="375" y="242" textAnchor="middle" fontSize="11" fill={inv} opacity="0.86">permits · records</text>
      <text x="375" y="260" textAnchor="middle" fontSize="11" fill={inv} opacity="0.86">review · connectors</text>

      {/* repl */}
      <rect x="40" y="126" width="210" height="50" rx="8" fill={tint(EXEC)} stroke={EXEC} strokeWidth={sw("repl")} />
      <text x="145" y="150" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={t}>repl — control plane</text>
      <text x="145" y="167" textAnchor="middle" fontSize="10" fill={sub}>stdlib · connectors, agents</text>

      {/* handoff */}
      <rect x="66" y="198" width="158" height="42" rx="6" fill="var(--color-surface-code)" stroke={active === "handoff" ? QUERY : "var(--color-border-strong)"} strokeWidth={sw("handoff", 1)} />
      <text x="145" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill={t} fontFamily="var(--font-code, monospace)">./handoff/*.json</text>
      <text x="145" y="231" textAnchor="middle" fontSize="9" fill={mut}>shared cwd — files, not memory</text>

      {/* python */}
      <rect x="40" y="260" width="210" height="50" rx="8" fill={tint(EXEC)} stroke={EXEC} strokeWidth={sw("python")} />
      <text x="145" y="284" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={t}>Python / R kernels</text>
      <text x="145" y="301" textAnchor="middle" fontSize="10" fill={sub}>data plane · persistent state</text>

      {/* compute */}
      <rect x="40" y="322" width="210" height="46" rx="8" fill="var(--color-bg-primary)" stroke={EXEC} strokeWidth="1.4" strokeDasharray="5 4" />
      <text x="145" y="343" textAnchor="middle" fontSize="11.5" fontWeight="600" fill={t}>Compute provider</text>
      <text x="145" y="358" textAnchor="middle" fontSize="9.5" fill={sub}>gated · remote</text>

      {/* mcp */}
      <rect x="468" y="122" width="228" height="54" rx="8" fill="var(--color-bg-secondary)" stroke={active === "mcp" ? QUERY : "var(--color-border)"} strokeWidth={sw("mcp")} />
      <text x="582" y="146" textAnchor="middle" fontSize="12" fontWeight="600" fill={t}>MCP · connectors · app tiles</text>
      <text x="582" y="163" textAnchor="middle" fontSize="10" fill={sub}>the external world</text>

      {/* artifact + lineage */}
      <rect x="480" y="264" width="204" height="52" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth={sw("artifact")} />
      <text x="582" y="287" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={t}>Artifact store</text>
      <text x="582" y="304" textAnchor="middle" fontSize="10" fill={sub}>versioned records</text>
      <text x="484" y="342" fontSize="10" fontWeight="600" fill={mut}>lineage</text>
      <line x1="484" y1="356" x2="510" y2="356" stroke={EVID} strokeWidth="2" />
      <text x="516" y="360" fontSize="9.5" fill={sub}>runtime tags → observed</text>
      <line x1="484" y1="376" x2="510" y2="376" stroke={mut} strokeWidth="2" strokeDasharray="5 4" />
      <text x="516" y="380" fontSize="9.5" fill={sub}>reconstruction → fallback</text>

      {/* reviewer */}
      <rect x="300" y="408" width="150" height="52" rx="8" fill={tint(SUPER)} stroke={SUPER} strokeWidth={sw("reviewer")} />
      <text x="375" y="432" textAnchor="middle" fontSize="13" fontWeight="600" fill={t}>Reviewer</text>
      <text x="375" y="449" textAnchor="middle" fontSize="10" fill={sub}>background · read-only</text>

      {playing ? (
        <QueryPacket key={`${runId}-${hop}`} path={DESKTOP_EDGES[hop]} />
      ) : null}
    </svg>
  );
}

function MobileArchitecture({
  playing,
  active,
  hop,
  runId,
}: {
  playing: boolean;
  active: string | null;
  hop: number;
  runId: number;
}) {
  const t = "var(--color-text-primary)";
  const sub = "var(--color-text-secondary)";
  const mut = "var(--color-text-muted)";
  const inv = "var(--color-bg-primary)";
  const sw = (id: string, base = 1.4) => (active === id ? 3 : base);

  return (
    <svg viewBox="0 0 360 800" className="h-auto w-full md:hidden" aria-hidden="true">
      <defs>
        <FlowKeyframes />
        {arrowMarker("cs-arch-arrow-m")}
      </defs>

      {/* daemon authority spine: every box taps it separately */}
      <line x1="64" y1="168" x2="64" y2="746" stroke="var(--color-border-strong)" strokeWidth="1.6" />

      {/* taps off the spine (each box connects to the daemon, not to its neighbour) */}
      <path d="M64 249 L100 249" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-arch-arrow-m)" markerStart="url(#cs-arch-arrow-m)" />
      <path d="M64 423 L100 423" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-arch-arrow-m)" markerStart="url(#cs-arch-arrow-m)" />
      <path d="M64 500 L100 500" fill="none" stroke={EXEC} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#cs-arch-arrow-m)" markerStart="url(#cs-arch-arrow-m)" />
      <path d="M64 583 L100 583" fill="none" stroke={EXEC} strokeWidth="1.6" markerEnd="url(#cs-arch-arrow-m)" markerStart="url(#cs-arch-arrow-m)" />
      <path d="M64 664 L100 664" fill="none" stroke={EVID} strokeWidth="1.6" markerEnd="url(#cs-arch-arrow-m)" markerStart="url(#cs-arch-arrow-m)" />
      <path d="M64 746 L100 746" fill="none" stroke={SUPER} strokeWidth="1.5" strokeDasharray="1.5 4" markerEnd="url(#cs-arch-arrow-m)" />

      {/* internal handoff flow */}
      <path d="M210 274 L210 310" fill="none" stroke={NEUTRAL} strokeWidth="1.5" markerEnd="url(#cs-arch-arrow-m)" />
      <path d="M210 354 L210 398" fill="none" stroke={NEUTRAL} strokeWidth="1.5" markerEnd="url(#cs-arch-arrow-m)" />
      <text x="222" y="296" fontSize="9.5" fill={mut}>write</text>
      <text x="222" y="380" fontSize="9.5" fill={mut}>read</text>
      <text x="150" y="742" fontSize="9.5" fill={SUPER}>on checkpoint</text>
      <text x="150" y="496" fontSize="9.5" fill={mut}>gated</text>

      {/* user -> daemon */}
      <path d="M180 50 L180 82" fill="none" stroke={NEUTRAL} strokeWidth="1.5" markerEnd="url(#cs-arch-arrow-m)" />

      {/* host-call boundary */}
      <line x1="44" y1="190" x2="316" y2="190" stroke="var(--color-border-strong)" strokeDasharray="5 4" />
      <text x="316" y="184" textAnchor="end" fontSize="9.5" fill={mut}>host-call boundary</text>

      {/* section labels (generous gap above first box) */}
      <text x="100" y="210" fontSize="10.5" fontWeight="600" fill={mut}>EXECUTION · workers</text>
      <text x="100" y="624" fontSize="10.5" fontWeight="600" fill={mut}>EVIDENCE · records</text>

      {/* user */}
      <rect x="105" y="16" width="150" height="34" rx="8" fill="var(--color-bg-secondary)" stroke={active === "user" ? QUERY : "var(--color-border)"} strokeWidth={sw("user")} />
      <text x="180" y="38" textAnchor="middle" fontSize="12" fill={t}>User · local web UI</text>

      {/* daemon */}
      <rect x="64" y="82" width="232" height="86" rx="10" fill={t} stroke={active === "daemon" ? QUERY : "none"} strokeWidth={active === "daemon" ? 3 : 0} />
      <text x="180" y="114" textAnchor="middle" fontSize="16" fontWeight="600" fill={inv}>Daemon</text>
      <text x="180" y="134" textAnchor="middle" fontSize="10.5" fill={inv} opacity="0.8">the authority</text>
      <text x="180" y="152" textAnchor="middle" fontSize="10" fill={inv} opacity="0.75">permits · records · review · connectors</text>

      {/* repl */}
      <rect x="100" y="224" width="220" height="50" rx="8" fill={tint(EXEC)} stroke={EXEC} strokeWidth={sw("repl")} />
      <text x="210" y="247" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={t}>repl — control plane</text>
      <text x="210" y="263" textAnchor="middle" fontSize="9.5" fill={sub}>stdlib · connectors, agents</text>

      {/* handoff */}
      <rect x="130" y="310" width="160" height="44" rx="6" fill="var(--color-surface-code)" stroke={active === "handoff" ? QUERY : "var(--color-border-strong)"} strokeWidth={sw("handoff", 1)} />
      <text x="210" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill={t} fontFamily="var(--font-code, monospace)">./handoff/*.json</text>
      <text x="210" y="344" textAnchor="middle" fontSize="8.5" fill={mut}>files, not memory</text>

      {/* python */}
      <rect x="100" y="398" width="220" height="50" rx="8" fill={tint(EXEC)} stroke={EXEC} strokeWidth={sw("python")} />
      <text x="210" y="421" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={t}>Python / R kernels</text>
      <text x="210" y="437" textAnchor="middle" fontSize="9.5" fill={sub}>data plane · persistent state</text>

      {/* compute */}
      <rect x="100" y="478" width="220" height="44" rx="8" fill="var(--color-bg-primary)" stroke={EXEC} strokeWidth="1.4" strokeDasharray="5 4" />
      <text x="210" y="504" textAnchor="middle" fontSize="11.5" fontWeight="600" fill={t}>Compute provider · gated</text>

      {/* mcp */}
      <rect x="100" y="558" width="220" height="50" rx="8" fill="var(--color-bg-secondary)" stroke={active === "mcp" ? QUERY : "var(--color-border)"} strokeWidth={sw("mcp")} />
      <text x="210" y="581" textAnchor="middle" fontSize="12" fontWeight="600" fill={t}>MCP · connectors · app tiles</text>
      <text x="210" y="597" textAnchor="middle" fontSize="9.5" fill={sub}>the external world</text>

      {/* artifact */}
      <rect x="100" y="638" width="220" height="52" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth={sw("artifact")} />
      <text x="210" y="662" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={t}>Artifact store</text>
      <text x="210" y="678" textAnchor="middle" fontSize="9.5" fill={sub}>versioned · lineage observed first</text>

      {/* reviewer */}
      <rect x="100" y="720" width="220" height="52" rx="8" fill={tint(SUPER)} stroke={SUPER} strokeWidth={sw("reviewer")} />
      <text x="210" y="744" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={t}>Reviewer</text>
      <text x="210" y="760" textAnchor="middle" fontSize="9.5" fill={sub}>background · read-only</text>

      {playing ? (
        <QueryPacket key={`${runId}-${hop}`} path={MOBILE_EDGES[hop]} />
      ) : null}
    </svg>
  );
}

export function ClaudeScienceArchitecture() {
  const prefersReducedMotion = useReducedMotion();
  const [hop, setHop] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [runId, setRunId] = React.useState(0);
  const titleId = React.useId().replace(/:/g, "");
  const descId = React.useId().replace(/:/g, "");

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

  const active = isPlaying ? JOURNEY_NODES[hop] : null;

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
        <DesktopArchitecture
          playing={isPlaying}
          active={active}
          hop={hop}
          runId={runId}
          titleId={titleId}
          descId={descId}
        />
        <MobileArchitecture
          playing={isPlaying}
          active={active}
          hop={hop}
          runId={runId}
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
