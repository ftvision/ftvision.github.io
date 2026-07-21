"use client";

import * as React from "react";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";

// Shared colour grammar with Figure B: one hue per system.
const EXEC = "var(--color-data-1)"; // main agent thread
const SUPER = "var(--color-text-secondary)"; // detached reviewer thread
const EVID = "var(--color-data-1)"; // snapshotted evidence window
const NEUTRAL = "var(--color-text-muted)";
const MAINT = "var(--color-action-primary)"; // the main-agent token

const tint = (c: string) =>
  `color-mix(in srgb, ${c} 14%, var(--color-bg-primary))`;

const STEP_MS = 1050;
const DUR_S = STEP_MS / 1000;

// A fork/join timeline. The main agent (blue) never waits for review; a detached
// reviewer (green) runs in parallel. The only join is at completion. Every token
// edge below lies exactly on a drawn rail or connector.
type Step = {
  cap: string;
  main: string | null; // blue token edge, always on the main lane
  review: string | null; // green token edge, always on the reviewer rail / connectors
  wait?: boolean; // main agent parked at the barrier
  hl: string[];
};

const STEPS: Step[] = [
  {
    cap: "The main agent runs. Before a tool batch it checks the predicate at a runner boundary. It is event-triggered, not a clock.",
    main: "M60 110 L333 110",
    review: null,
    hl: ["boundary"],
  },
  {
    cap: "The predicate holds: interval floor AND content signal. It forks. A detached reviewer is spawned, and the main agent does not wait.",
    main: "M349 110 L540 110",
    review: "M341 264 L341 345",
    hl: ["predicate", "window"],
  },
  {
    cap: "In parallel: the main agent keeps executing forward while the reviewer traces the copied window in the background.",
    main: "M540 110 L706 110",
    review: "M341 345 L525 345",
    hl: ["reviewer"],
  },
  {
    cap: "The reviewer writes a verdict to durable state. Independently, the main agent has reached completion.",
    main: "M706 110 L802 110",
    review: "M525 345 L720 345",
    hl: ["verdict"],
  },
  {
    cap: "Only here does it block. The terminal barrier holds completion and waits for the pending verdict to land.",
    main: null,
    review: "M772 345 L772 158 L804 158",
    wait: true,
    hl: ["barrier"],
  },
  {
    cap: "Clean, so it delivers and finishes. A finding would bounce the agent for another turn (up to 3); a delegated output can be invalidated instead.",
    main: "M820 110 L888 110",
    review: null,
    hl: ["barrier", "outcome"],
  },
];
const N = STEPS.length;

function TokenKeyframes() {
  return (
    <style>{`@keyframes cs-vt-fj{from{offset-distance:0%}to{offset-distance:100%}}`}</style>
  );
}

function Token({ path, color }: { path: string; color: string }) {
  return (
    <circle
      r="5.5"
      fill={color}
      stroke="var(--color-bg-primary)"
      strokeWidth="1.5"
      style={{
        offsetPath: `path('${path}')`,
        offsetRotate: "0deg",
        animation: `cs-vt-fj ${DUR_S}s linear both`,
      }}
    />
  );
}

const arrowMarker = (id: string, color = NEUTRAL) => (
  <marker
    id={id}
    viewBox="0 0 10 10"
    refX="8"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <path d="M1 1 L8 5 L1 9" fill="none" stroke={color} strokeWidth="1.6" />
  </marker>
);

function ClockGlyph({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round">
      <circle cx={x} cy={y} r="7" />
      <path d={`M${x} ${y - 3.7} L${x} ${y} L${x + 3.2} ${y + 2}`} />
    </g>
  );
}

function SignalGlyph({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g stroke={color} fill="none" strokeWidth="1.3" strokeLinecap="round">
      <rect x={x - 5.5} y={y - 7.5} width="11" height="15" rx="1.6" />
      <path
        d={`M${x - 2.5} ${y - 3.5} H${x + 2.5} M${x - 2.5} ${y} H${x + 2.5} M${x - 2.5} ${y + 3.5} H${x + 1}`}
        strokeWidth="1"
      />
    </g>
  );
}

function EyeGlyph({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g stroke={color} fill="none" strokeWidth="1.4">
      <path
        d={`M${x - 8} ${y} Q${x} ${y - 7} ${x + 8} ${y} Q${x} ${y + 7} ${x - 8} ${y} Z`}
      />
      <circle cx={x} cy={y} r="2.4" fill={color} stroke="none" />
    </g>
  );
}

function Boundary({
  x,
  y,
  state,
}: {
  x: number;
  y: number;
  state: "skip" | "fire" | "active";
}) {
  const color =
    state === "active"
      ? MAINT
      : state === "fire"
        ? "var(--color-text-primary)"
        : NEUTRAL;
  const dim = state === "skip";
  return (
    <g opacity={dim ? 0.5 : 1}>
      <line x1={x} y1={y - 11} x2={x} y2={y + 11} stroke={color} strokeWidth="1.1" />
      <path
        d={`M${x} ${y - 6.5} L${x + 6.5} ${y} L${x} ${y + 6.5} L${x - 6.5} ${y} Z`}
        fill="var(--color-bg-primary)"
        stroke={color}
        strokeWidth={state === "skip" ? 1.2 : 1.6}
      />
      {dim ? (
        <path
          d={`M${x - 2.8} ${y - 2.8} L${x + 2.8} ${y + 2.8} M${x + 2.8} ${y - 2.8} L${x - 2.8} ${y + 2.8}`}
          stroke={NEUTRAL}
          strokeWidth="1.1"
        />
      ) : null}
    </g>
  );
}

// --- desktop -----------------------------------------------------------------

function DesktopForkJoin({
  active,
  hop,
  playing,
  reduced,
  titleId,
  descId,
}: {
  active: string[];
  hop: number;
  playing: boolean;
  reduced: boolean;
  titleId: string;
  descId: string;
}) {
  const t = "var(--color-text-primary)";
  const sub = "var(--color-text-secondary)";
  const mut = "var(--color-text-muted)";
  const on = (id: string) => active.includes(id);
  const sw = (id: string, base = 1.4) => (on(id) ? 2.6 : base);
  const step = playing ? STEPS[hop] : null;

  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      viewBox="0 0 960 440"
      className="hidden h-auto w-full font-sans md:block"
    >
      <title id={titleId}>A fork/join view of Claude Science verification</title>
      <desc id={descId}>
        The main agent thread runs left to right and never stops at a checkpoint.
        When a predicate holds, the checkpoint forks a detached reviewer onto a
        separate parallel lane; the main agent keeps moving. The reviewer traces
        a snapshotted window and writes a verdict to durable state. The only
        blocking point is completion, where a terminal barrier reads that verdict
        and either delivers and finishes, bounces the agent for another turn up
        to three times, or invalidates an undelivered delegated output.
      </desc>
      <defs>
        <TokenKeyframes />
        {arrowMarker("cs-fj-arrow")}
        {arrowMarker("cs-fj-arrow-super", SUPER)}
        {arrowMarker("cs-fj-arrow-exec", EXEC)}
      </defs>

      {/* ================= structural rails & connectors (bottom layer) ===== */}

      {/* MAIN AGENT lane: one continuous line */}
      <line x1="56" y1="110" x2="812" y2="110" stroke={EXEC} strokeWidth="1.8" />
      {[140, 196, 470, 540, 600, 660, 720].map((x) => (
        <rect key={x} x={x} y="105" width="6" height="10" rx="1" fill={EXEC} opacity="0.5" />
      ))}

      {/* fork drop: main lane -> predicate */}
      <path
        d="M341 116 L341 150"
        fill="none"
        stroke={on("predicate") ? MAINT : NEUTRAL}
        strokeWidth="1.4"
        markerEnd="url(#cs-fj-arrow)"
      />

      {/* spawn: predicate -> reviewer lane (visible part above the window) */}
      <path
        d="M341 264 L341 306"
        fill="none"
        stroke={on("predicate") || on("window") ? SUPER : NEUTRAL}
        strokeWidth="1.5"
        markerEnd="url(#cs-fj-arrow-super)"
      />

      {/* DETACHED REVIEWER rail: one continuous line the green token rides
          (hidden behind the boxes, visible in the gaps between them) */}
      <line x1="250" y1="345" x2="800" y2="345" stroke={SUPER} strokeWidth="1.4" opacity="0.6" />

      {/* verdict -> barrier: a DATA dependency the barrier reads (dashed) */}
      <path
        d="M772 306 L772 158 L806 158"
        fill="none"
        stroke={on("barrier") ? MAINT : NEUTRAL}
        strokeWidth="1.3"
        strokeDasharray="5 4"
        markerEnd="url(#cs-fj-arrow)"
      />

      {/* bounce / re-run arc: the reviewer's authority forces another turn */}
      <path
        d="M808 92 L808 46 Q808 38 800 38 L466 38 Q458 38 458 46 L458 102"
        fill="none"
        stroke={SUPER}
        strokeWidth="1.6"
        markerEnd="url(#cs-fj-arrow-super)"
        opacity={on("outcome") ? 1 : 0.6}
      />

      {/* finish line: main lane continues past the barrier once delivered */}
      <path
        d="M818 110 L888 110"
        fill="none"
        stroke={EXEC}
        strokeWidth="1.7"
        markerEnd="url(#cs-fj-arrow-exec)"
        opacity={on("outcome") ? 1 : 0.6}
      />
      {/* invalidate outcome */}
      <path
        d="M818 130 L842 130"
        fill="none"
        stroke={SUPER}
        strokeWidth="1.5"
        markerEnd="url(#cs-fj-arrow-super)"
        opacity={on("outcome") ? 1 : 0.6}
      />

      {/* ================= tokens (above rails, BEHIND the boxes) =========== */}
      {playing && step?.main ? (
        <Token key={`m-${hop}`} path={step.main} color={MAINT} />
      ) : null}
      {playing && step?.review ? (
        <Token key={`r-${hop}`} path={step.review} color={SUPER} />
      ) : null}

      {/* ================= predicate gate (fork) =========================== */}
      <rect
        x="230" y="150" width="222" height="114" rx="10"
        fill={on("predicate") ? tint(MAINT) : "var(--color-bg-secondary)"}
        stroke={on("predicate") ? MAINT : "var(--color-border-strong)"}
        strokeWidth={on("predicate") ? 2.2 : 1.4}
      />
      <text x="244" y="171" fontSize="10.5" fontWeight="600" fill={t}>checkpoint predicate</text>
      <ClockGlyph x={258} y={196} color={sub} />
      <text x="274" y="192" fontSize="10.5" fontWeight="600" fill={t}>interval floor</text>
      <text x="274" y="205" fontSize="8.5" fill={sub}>≥ 120 s since last checkpoint</text>
      <text x="440" y="196" fontSize="9" fontWeight="600" fill={sub} textAnchor="end" style={{ fontVariantNumeric: "tabular-nums" }}>120 s</text>
      <text x="341" y="223" fontSize="9.5" fontWeight="600" fill={sub} textAnchor="middle">AND</text>
      <SignalGlyph x={258} y={244} color={sub} />
      <text x="274" y="240" fontSize="10.5" fontWeight="600" fill={t}>content signal · any one</text>
      <text x="274" y="253" fontSize="8.5" fill={sub}>3 artifacts · structural block · 2,000 chars</text>

      {/* ================= reviewer lane boxes (cover the rail + tokens) ==== */}
      <rect
        x="250" y="306" width="160" height="78" rx="9"
        fill={tint(EVID)} stroke={EVID} strokeWidth={sw("window")}
      />
      <text x="330" y="330" fontSize="11" fontWeight="600" fill={t} textAnchor="middle">bounded window</text>
      <text x="330" y="348" fontSize="8.5" fill={sub} textAnchor="middle">messages · execution · artifact</text>
      <text x="330" y="360" fontSize="8.5" fill={sub} textAnchor="middle">plan · provenance</text>
      <text x="330" y="374" fontSize="8.5" fill={mut} textAnchor="middle">a snapshot, not a live feed</text>

      <rect
        x="440" y="306" width="170" height="78" rx="9"
        fill={tint(SUPER)} stroke={SUPER} strokeWidth={sw("reviewer")}
      />
      <EyeGlyph x={525} y={332} color={SUPER} />
      <text x="525" y="358" fontSize="11" fontWeight="600" fill={t} textAnchor="middle">reviewer</text>
      <text x="525" y="372" fontSize="8.5" fill={sub} textAnchor="middle">traces · trace, don&apos;t recompute</text>

      <rect
        x="640" y="306" width="160" height="78" rx="9"
        fill={on("verdict") ? tint(SUPER) : "var(--color-bg-secondary)"}
        stroke={on("verdict") ? SUPER : "var(--color-border-strong)"}
        strokeWidth={sw("verdict")}
      />
      <text x="720" y="330" fontSize="11" fontWeight="600" fill={t} textAnchor="middle">verdict</text>
      <text x="720" y="348" fontSize="8.5" fill={sub} textAnchor="middle">finding / notice</text>
      <text x="720" y="362" fontSize="8.5" fill={mut} textAnchor="middle">written to durable state</text>

      {/* ================= labels & barrier (top layer) ==================== */}
      <text x="56" y="58" fontSize="11" fontWeight="600" fill={t}>MAIN AGENT</text>
      <text x="56" y="72" fontSize="9" fill={mut}>main operon · one continuous thread</text>
      <Boundary x={250} y={110} state="skip" />
      <text x="250" y="130" fontSize="8.5" fill={mut} textAnchor="middle">skip</text>
      <Boundary x={341} y={110} state={on("boundary") ? "active" : "fire"} />
      <text x="341" y="94" fontSize="9.5" fontWeight="600" fill={on("boundary") ? MAINT : t} textAnchor="middle">checkpoint fires</text>
      <text x="600" y="100" fontSize="9" fill={sub} textAnchor="middle">keeps moving · non-blocking</text>
      <text x="612" y="34" fontSize="9" fontWeight="600" fill={SUPER} textAnchor="middle">bounce · re-run another turn (≤ 3)</text>

      <text x="392" y="284" fontSize="9" fontWeight="600" fill={SUPER}>spawn · non-blocking</text>
      <text x="392" y="296" fontSize="8.5" fill={mut}>hold: coalesce, merge if busy</text>

      <text x="56" y="300" fontSize="10.5" fontWeight="600" fill={SUPER}>DETACHED REVIEWER</text>
      <text x="56" y="313" fontSize="9" fill={mut}>background · read-only · runs in parallel</text>

      <text x="812" y="238" fontSize="8.5" fill={mut} textAnchor="middle">barrier reads</text>
      <text x="812" y="249" fontSize="8.5" fill={mut} textAnchor="middle">the verdict</text>

      {/* terminal barrier bars */}
      <line x1="809" y1="86" x2="809" y2="150" stroke={on("barrier") ? MAINT : "var(--color-text-primary)"} strokeWidth={on("barrier") ? 2.6 : 2} />
      <line x1="815" y1="86" x2="815" y2="150" stroke={on("barrier") ? MAINT : "var(--color-text-primary)"} strokeWidth={on("barrier") ? 1.8 : 1.1} />
      {step?.wait ? (
        <g>
          <circle cx="806" cy="110" r="7" fill="none" stroke={MAINT} strokeWidth="1.6" />
          {!reduced ? (
            <circle cx="806" cy="110" r="7" fill="none" stroke={MAINT} strokeWidth="1.2">
              <animate attributeName="r" values="7;15;7" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.85;0;0.85" dur="1.4s" repeatCount="indefinite" />
            </circle>
          ) : null}
        </g>
      ) : null}
      <text x="812" y="170" fontSize="10" fontWeight="600" fill={t} textAnchor="middle">terminal barrier</text>
      <text x="812" y="183" fontSize="8.5" fill={mut} textAnchor="middle">the only blocking point</text>
      <text x="812" y="194" fontSize="8.5" fill={mut} textAnchor="middle">waits for the verdict</text>

      <text x="848" y="106" fontSize="9.5" fill={t}>finish · deliver</text>
      <text x="848" y="133" fontSize="9" fill={t}>invalidate · delegated output</text>
    </svg>
  );
}

// --- mobile (static, structure-faithful) ------------------------------------

function MobileForkJoin() {
  const t = "var(--color-text-primary)";
  const sub = "var(--color-text-secondary)";
  const mut = "var(--color-text-muted)";

  return (
    <svg viewBox="0 0 360 720" className="h-auto w-full font-sans md:hidden" aria-hidden="true">
      <defs>
        {arrowMarker("cs-fj-arrow-m")}
        {arrowMarker("cs-fj-arrow-m-super", SUPER)}
        {arrowMarker("cs-fj-arrow-m-exec", EXEC)}
      </defs>

      {/* main agent thread: a continuous rail down the left */}
      <text x="20" y="30" fontSize="10.5" fontWeight="600" fill={t}>MAIN AGENT</text>
      <text x="20" y="43" fontSize="8.5" fill={mut}>one continuous thread · never blocks at the fork</text>
      <line x1="40" y1="58" x2="40" y2="612" stroke={EXEC} strokeWidth="1.8" />

      <Boundary x={40} y={92} state="fire" />
      <text x="54" y="88" fontSize="8.5" fontWeight="600" fill={t}>checkpoint fires</text>

      <path d="M40 100 L40 120 L96 120" fill="none" stroke={NEUTRAL} strokeWidth="1.4" markerEnd="url(#cs-fj-arrow-m)" />
      <rect x="96" y="98" width="248" height="96" rx="9" fill="var(--color-bg-secondary)" stroke="var(--color-border-strong)" strokeWidth="1.4" />
      <text x="108" y="118" fontSize="10" fontWeight="600" fill={t}>checkpoint predicate</text>
      <ClockGlyph x={118} y={140} color={sub} />
      <text x="134" y="137" fontSize="9.5" fontWeight="600" fill={t}>interval floor</text>
      <text x="134" y="149" fontSize="8" fill={sub}>≥ 120 s since last checkpoint</text>
      <text x="330" y="140" fontSize="8.5" fontWeight="600" fill={sub} textAnchor="end">120 s</text>
      <text x="220" y="166" fontSize="9" fontWeight="600" fill={sub} textAnchor="middle">AND</text>
      <SignalGlyph x={118} y={180} color={sub} />
      <text x="134" y="177" fontSize="9.5" fontWeight="600" fill={t}>content signal · any one</text>
      <text x="134" y="188" fontSize="7.8" fill={sub}>3 artifacts · block · 2,000 chars</text>

      <text x="48" y="230" fontSize="8.5" fill={sub}>keeps moving</text>
      <text x="48" y="241" fontSize="8.5" fill={sub}>non-blocking</text>

      <path d="M220 194 L220 214 L250 214" fill="none" stroke={SUPER} strokeWidth="1.5" markerEnd="url(#cs-fj-arrow-m-super)" />
      <text x="128" y="212" fontSize="8.5" fontWeight="600" fill={SUPER}>spawn · non-blocking →</text>
      <rect x="120" y="230" width="228" height="250" rx="10" fill="none" stroke={SUPER} strokeWidth="1.1" strokeDasharray="5 4" />
      <text x="132" y="248" fontSize="9.5" fontWeight="600" fill={SUPER}>DETACHED REVIEWER · background</text>

      <rect x="134" y="258" width="200" height="58" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth="1.4" />
      <text x="234" y="280" fontSize="10" fontWeight="600" fill={t} textAnchor="middle">bounded window</text>
      <text x="234" y="296" fontSize="8" fill={sub} textAnchor="middle">snapshot · msgs · exec · artifact</text>
      <text x="234" y="307" fontSize="8" fill={sub} textAnchor="middle">plan · provenance</text>
      <path d="M234 316 L234 334" fill="none" stroke={SUPER} strokeWidth="1.4" markerEnd="url(#cs-fj-arrow-m-super)" />
      <rect x="134" y="334" width="200" height="52" rx="8" fill={tint(SUPER)} stroke={SUPER} strokeWidth="1.4" />
      <EyeGlyph x={234} y={356} color={SUPER} />
      <text x="234" y="378" fontSize="10" fontWeight="600" fill={t} textAnchor="middle">reviewer · read-only</text>
      <path d="M234 386 L234 404" fill="none" stroke={SUPER} strokeWidth="1.4" markerEnd="url(#cs-fj-arrow-m-super)" />
      <rect x="134" y="404" width="200" height="58" rx="8" fill="var(--color-bg-secondary)" stroke="var(--color-border-strong)" strokeWidth="1.4" />
      <text x="234" y="426" fontSize="10" fontWeight="600" fill={t} textAnchor="middle">verdict</text>
      <text x="234" y="442" fontSize="8" fill={sub} textAnchor="middle">finding / notice</text>
      <text x="234" y="453" fontSize="8" fill={mut} textAnchor="middle">→ durable state</text>

      <path d="M134 433 L40 433" fill="none" stroke={NEUTRAL} strokeWidth="1.3" strokeDasharray="5 4" markerEnd="url(#cs-fj-arrow-m)" />
      <text x="128" y="476" fontSize="8" fill={mut} textAnchor="end">barrier reads verdict</text>

      <line x1="24" y1="512" x2="180" y2="512" stroke={t} strokeWidth="2.4" />
      <line x1="24" y1="518" x2="180" y2="518" stroke={t} strokeWidth="1.2" />
      <circle cx="40" cy="515" r="6" fill="none" stroke={MAINT} strokeWidth="1.6" />
      <text x="24" y="540" fontSize="10" fontWeight="600" fill={t}>terminal barrier</text>
      <text x="24" y="552" fontSize="8.5" fill={mut}>the only blocking point · waits for the verdict</text>

      <path d="M40 566 L40 582 L60 582" fill="none" stroke={EXEC} strokeWidth="1.5" markerEnd="url(#cs-fj-arrow-m-exec)" />
      <text x="66" y="585" fontSize="9.5" fill={t}>finish · deliver</text>
      <path d="M40 594 L60 594" fill="none" stroke={SUPER} strokeWidth="1.5" markerEnd="url(#cs-fj-arrow-m-super)" />
      <text x="66" y="597" fontSize="9.5" fill={t}>bounce · re-run another turn (≤ 3)</text>
      <path d="M40 606 L60 606" fill="none" stroke={SUPER} strokeWidth="1.5" markerEnd="url(#cs-fj-arrow-m-super)" />
      <text x="66" y="609" fontSize="9.5" fill={t}>invalidate · delegated output</text>
    </svg>
  );
}

// --- figure ------------------------------------------------------------------

export function VerifierTimeline() {
  const reduced = useReducedMotion();
  const [hop, setHop] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const titleId = React.useId().replace(/:/g, "");
  const descId = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    if (!playing) return;
    if (hop >= N - 1) {
      const timer = window.setTimeout(() => setPlaying(false), STEP_MS);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setHop((h) => h + 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, hop]);

  const play = () => {
    if (reduced || playing) return;
    setHop(0);
    setPlaying(true);
  };

  const active = playing ? STEPS[hop].hl : [];

  return (
    <FigureScaffold
      eyebrow="Detached verification"
      title="Review forks off the main agent; only completion blocks"
      description="A checkpoint spawns a detached reviewer that runs in the background. The main agent never waits for it and keeps moving. The single blocking point is completion, where a terminal barrier reads the verdict and delivers, bounces the agent for another turn, or invalidates an output."
      caption="Figure D. The first 120-second default is a checkpoint interval floor; the second is a separate mid-dispatch hold. Review is detached and non-blocking; the main agent only waits at completion, where the terminal barrier delivers, bounces for another turn, or invalidates."
    >
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        {reduced ? (
          <span className="type-caption text-figure-muted">
            Static diagram (reduced motion).
          </span>
        ) : (
          <button
            type="button"
            className="min-h-11 border border-border px-3 py-2 type-label text-figure-primary transition-colors hover:bg-ground-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-wait disabled:text-figure-muted"
            onClick={play}
            disabled={playing}
          >
            {playing ? "Running…" : "▶ Fork one checkpoint"}
          </button>
        )}
        <div
          className="flex flex-wrap gap-x-5 gap-y-2 type-caption text-figure-secondary"
          aria-label="Diagram notation"
        >
          <span className="inline-flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: MAINT }} aria-hidden="true" />
            main agent
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: SUPER }} aria-hidden="true" />
            detached reviewer
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0 w-6 border-t-2" style={{ borderColor: EVID }} aria-hidden="true" />
            evidence window
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0 w-6 border-t border-dashed border-border-strong" aria-hidden="true" />
            reads verdict
          </span>
        </div>
      </div>

      <div className="mt-4 min-w-0 border-y border-border py-4">
        <DesktopForkJoin
          active={active}
          hop={hop}
          playing={playing}
          reduced={reduced}
          titleId={titleId}
          descId={descId}
        />
        <MobileForkJoin />
      </div>

      <p
        className="type-caption mt-3 border-l-2 border-action-primary pl-3 text-figure-secondary"
        aria-live="polite"
      >
        <span className="text-figure-muted">
          {hop + 1} / {N}:
        </span>{" "}
        {STEPS[hop].cap}
      </p>
    </FigureScaffold>
  );
}
