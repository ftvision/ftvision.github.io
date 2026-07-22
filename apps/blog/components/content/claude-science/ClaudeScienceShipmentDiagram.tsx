"use client";

import * as React from "react";
import { useReducedMotion } from "./AB-useReducedMotion";
import ShipmentDesktopSvg from "./svg/claude-science-shipment-desktop.svg";
import ShipmentMobileSvg from "./svg/claude-science-shipment-mobile.svg";

const TOTAL_STAGES = 4;
const STEP_MS = 520;

export function ClaudeScienceShipmentDiagram() {
  const [revealed, setRevealed] = React.useState(TOTAL_STAGES);
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = React.useCallback(() => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];
  }, []);

  const runUnpack = React.useCallback(() => {
    clearTimers();
    setRevealed(1);
    for (let step = 2; step <= TOTAL_STAGES; step += 1) {
      timers.current.push(
        setTimeout(() => setRevealed(step), (step - 1) * STEP_MS),
      );
    }
  }, [clearTimers]);

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRevealed(1);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(TOTAL_STAGES);
      return;
    }
    const element = rootRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      runUnpack();
      return clearTimers;
    }
    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played) {
          played = true;
          runUnpack();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [runUnpack, clearTimers]);

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
      <ShipmentDesktopSvg
        data-revealed={revealed}
        className="hidden h-auto w-full overflow-visible md:block"
      />
      <ShipmentMobileSvg
        data-revealed={revealed}
        className="h-auto w-full overflow-visible md:hidden"
      />
    </div>
  );
}
