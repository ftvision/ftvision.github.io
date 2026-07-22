"use client";

import * as React from "react";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";
import VerifierDesktopSvg from "./svg/verifier-timeline-desktop.svg";
import VerifierMobileSvg from "./svg/verifier-timeline-mobile.svg";

const SUPER = "var(--color-text-secondary)";
const EVID = "var(--color-data-1)";
const MAINT = "var(--color-action-primary)";
const STEP_MS = 1050;

const STEPS = [
  {
    cap: "The main agent runs. Before a tool batch it checks the predicate at a runner boundary. It is event-triggered, not a clock.",
    highlights: ["boundary"],
  },
  {
    cap: "The predicate holds: interval floor AND content signal. It forks. A detached reviewer is spawned, and the main agent does not wait.",
    highlights: ["predicate", "window"],
  },
  {
    cap: "In parallel: the main agent keeps executing forward while the reviewer traces the copied window in the background.",
    highlights: ["reviewer"],
  },
  {
    cap: "The reviewer writes a verdict to durable state. Independently, the main agent has reached completion.",
    highlights: ["verdict"],
  },
  {
    cap: "Only here does it block. The terminal barrier holds completion and waits for the pending verdict to land.",
    highlights: ["barrier"],
  },
  {
    cap: "Clean, so it delivers and finishes. A finding would bounce the agent for another turn (up to 3); a delegated output can be invalidated instead.",
    highlights: ["barrier", "outcome"],
  },
] as const;

export function VerifierTimeline() {
  const reduced = useReducedMotion();
  const [hop, setHop] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!playing) return;
    if (hop >= STEPS.length - 1) {
      const timer = window.setTimeout(() => setPlaying(false), STEP_MS);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(
      () => setHop((current) => current + 1),
      STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [playing, hop]);

  const play = () => {
    if (reduced || playing) return;
    setHop(0);
    setPlaying(true);
  };

  const svgState = {
    "data-active": playing ? STEPS[hop].highlights.join(" ") : undefined,
    "data-hop": hop,
    "data-playing": playing,
  } as const;

  return (
    <FigureScaffold
      eyebrow="Detached verification"
      title="Review forks off the main agent; only completion blocks"
      description="A checkpoint spawns a detached reviewer that runs in the background. The main agent never waits for it and keeps moving. The single blocking point is completion, where a terminal barrier reads the verdict and delivers, bounces the agent for another turn, or invalidates an output."
      caption="Figure 11. The first 120-second default is a checkpoint interval floor; the second is a separate mid-dispatch hold. Review is detached and non-blocking; the main agent only waits at completion, where the terminal barrier delivers, bounces for another turn, or invalidates."
      captionZh="图 11。图中第一个 120 秒，是检查点间隔的默认下限；第二个 120 秒，则是派发过程中的另一段暂缓时间。审查独立运行，不会阻塞主智能体；只有任务收尾时，主智能体才会等待。终止屏障随后决定是交付结果、打回再跑一轮，还是将输出作废。"
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
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: MAINT }}
              aria-hidden="true"
            />
            main agent
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: SUPER }}
              aria-hidden="true"
            />
            detached reviewer
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-0 w-6 border-t-2"
              style={{ borderColor: EVID }}
              aria-hidden="true"
            />
            evidence window
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-0 w-6 border-t border-dashed border-border-strong"
              aria-hidden="true"
            />
            reads verdict
          </span>
        </div>
      </div>

      <div className="mt-4 min-w-0 border-y border-border py-4">
        <VerifierDesktopSvg
          {...svgState}
          className="hidden h-auto w-full md:block"
        />
        <VerifierMobileSvg
          className="h-auto w-full md:hidden"
          aria-hidden="true"
        />
      </div>

      <p
        className="type-caption mt-3 border-l-2 border-action-primary pl-3 text-figure-secondary"
        aria-live="polite"
      >
        <span className="text-figure-muted">
          {hop + 1} / {STEPS.length}:
        </span>{" "}
        {STEPS[hop].cap}
      </p>
    </FigureScaffold>
  );
}
