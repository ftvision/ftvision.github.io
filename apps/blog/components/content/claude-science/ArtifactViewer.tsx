"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { FigureScaffold } from "./FigureScaffold";

/**
 * Figure — "Artifact governance".
 *
 * A Claude Science artifact is not just a rendered figure: it opens with a tab
 * bar that exposes every layer the artifact carries. This figure reproduces
 * that governance surface with five real screenshots from a live pet-genetics
 * session, viewing the artifact fig2_publication_trend.png.
 *
 * The tab bar is the product's own. Code, Execution Log, Messages, and
 * Environment are shipped tabs; Provenance is the artifact's right-click
 * context menu, included here as a fifth selectable view. The screenshots are
 * the shipped dark product UI and are shown verbatim — never recolored or
 * inverted.
 *
 * Performance: only the active tab's <img> is mounted (the inactive panels
 * render nothing), and each image is lazy-loaded.
 */

type TabId = "code" | "execution-log" | "messages" | "environment" | "provenance";

interface ArtifactTab {
  id: TabId;
  label: string;
  descriptor: string;
  src: string;
  alt: string;
}

const TABS: ArtifactTab[] = [
  {
    id: "code",
    label: "Code",
    descriptor: "The producing script, reconstructed",
    src: "/images/cs-ui-code.png",
    alt: "Claude Science artifact viewer for fig2_publication_trend.png with the Code tab selected. It shows an LLM-generated reconstruction of the Python script that produced the figure, with a banner pointing to the Execution Log for the raw record and a Download script button.",
  },
  {
    id: "execution-log",
    label: "Execution Log",
    descriptor: "The raw cells, errors and all",
    src: "/images/cs-ui-execution-log.png",
    alt: "The Execution Log tab of the same artifact, showing the raw recorded notebook cells. Cell 0 is flagged with an error on line one where importing requests fails, and cell 1 is the retry that switches to urllib. A Download notebook button sits above the cells.",
  },
  {
    id: "messages",
    label: "Messages",
    descriptor: "The agent's orchestration narrative",
    src: "/images/cs-ui-messages.png",
    alt: "The Messages tab, showing the agent's orchestration narrative: reading the onboarding profile, testing OpenAlex connectivity (which hits a ModuleNotFoundError for requests), collecting a corpus of 2,425 works, filtering to 1,558 relevant works, and extracting heritability values from abstracts.",
  },
  {
    id: "environment",
    label: "Environment",
    descriptor: "Python 3.11.15, 94 packages pinned",
    src: "/images/cs-ui-environment.png",
    alt: "The Environment tab, showing the pinned runtime: Python 3.11.15 with 94 packages, listed as a package-and-version table (brotli, ca-certificates, cairo, contourpy, and matplotlib dependencies among them).",
  },
  {
    id: "provenance",
    label: "Provenance",
    descriptor: "Where it came from, one right-click away",
    src: "/images/cs-ui-provenance-menu.png",
    alt: "The artifact's rendered figure, a chart titled Growth of companion-animal genetics literature, 1980 to 2025, with its right-click context menu open showing Star, Hide, View in context, Provenance, Copy link, Rename, Export Metadata, Export to Cloud, and Delete.",
  },
];

function ArtifactTabs({
  active,
  baseId,
  onSelect,
}: {
  active: TabId;
  baseId: string;
  onSelect: (id: TabId) => void;
}) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % TABS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + TABS.length) % TABS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = TABS.length - 1;
    }
    if (next === null) return;
    event.preventDefault();
    onSelect(TABS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Artifact view"
      aria-orientation="horizontal"
      className="inline-flex flex-wrap gap-1 rounded-[6px] border border-border bg-ground-secondary p-1"
    >
      {TABS.map((tab, index) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "rounded-[4px] px-3 py-1.5 font-sans text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-1 motion-reduce:transition-none",
              isActive
                ? "bg-ground-primary text-figure-primary shadow-sm"
                : "text-figure-secondary hover:text-figure-primary",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function ArtifactViewer() {
  const [active, setActive] = React.useState<TabId>("code");
  const [zoomed, setZoomed] = React.useState(false);
  const baseId = React.useId().replace(/:/g, "");
  const activeTab = TABS.find((tab) => tab.id === active) ?? TABS[0];

  // Close the enlarged overlay on Escape and lock background scroll while open.
  React.useEffect(() => {
    if (!zoomed) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomed]);

  return (
    <>
    <FigureScaffold
      eyebrow="Artifact governance"
      title="One artifact and the layers it carries"
      description="This generated figure from a live session opens with tabs for its reconstructed code, raw execution record, agent messages, and pinned environment. Its provenance is available from the artifact menu."
      caption="Figure. Real screenshots from a live pet-genetics session in Claude Science, viewing the artifact fig2_publication_trend.png. The tab bar is the product's own. Provenance is the artifact's right-click menu, shown here as a fifth view; nothing is recolored, so these are the shipped dark UI."
    >
      <p className="type-body-sm m-0 mb-4 text-figure-secondary">
        This is one real artifact from a live pet-genetics session. Switch tabs
        to read each layer it carries, straight from the product UI.
      </p>

      <div className="mb-4">
        <ArtifactTabs active={active} baseId={baseId} onSelect={setActive} />
        <p
          className="type-caption m-0 mt-2 text-figure-muted"
          aria-live="polite"
        >
          {activeTab.descriptor}
        </p>
      </div>

      <div className="border-t border-border pt-5">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`${baseId}-panel-${tab.id}`}
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              tabIndex={0}
              hidden={!isActive}
              className="focus-visible:outline-none"
            >
              {isActive ? (
                <button
                  type="button"
                  onClick={() => setZoomed(true)}
                  aria-label={`Enlarge screenshot: ${tab.label}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded border border-border bg-ground-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary"
                >
                  {/* Only the active tab's image is mounted; switching tabs
                      unmounts the previous one. A plain <img> keeps this lazy
                      and lets the screenshot scale to the container width;
                      next/image is intentionally avoided here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tab.src}
                    alt={tab.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                  <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-sans text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none">
                    Click to enlarge
                  </span>
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </FigureScaffold>
    {zoomed && typeof document !== "undefined"
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeTab.alt}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-[9999] flex cursor-zoom-out items-center justify-center bg-black/80 p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeTab.src}
              alt={activeTab.alt}
              className="h-auto max-h-[92vh] w-auto max-w-[96vw] rounded-lg object-contain shadow-2xl"
            />
            <button
              type="button"
              aria-label="Close enlarged image"
              onClick={() => setZoomed(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl leading-none text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ×
            </button>
          </div>,
          document.body,
        )
      : null}
    </>
  );
}
