"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FigureScaffold, InlineCodeLabel } from "./FigureScaffold";

/**
 * Figure E — "Artifact lineage".
 *
 * The single idea: an artifact version traces back to the exact versioned
 * inputs it was built from, and every dependency edge is marked by HOW it is
 * known — observed while the code ran (solid), reconstructed after the fact
 * (dashed), or still pending (dotted). Parent-version links are a separate thin
 * style.
 *
 * The graph is the hero. All three provenance lanes are visible at once, before
 * any interaction. Selecting a node emphasises its ancestry without moving any
 * node. A single toggle demonstrates `extraction_pending` on report.md v2:
 * zero current edges is not proof of zero inputs.
 *
 * Data is the essay's CRISPR probe. Filenames, checksums, and sizes are
 * synthetic; the schema follows Claude Science 0.1.15.
 */

type NodeId =
  | "count-matrix"
  | "gene-annotations"
  | "normalized-hits"
  | "enrichment"
  | "figure-3"
  | "report-v1"
  | "report-v2";

type EdgeKind = "observed" | "reconstructed" | "pending" | "parent";

interface LineageNode {
  id: NodeId;
  file: string;
  version: string;
  origin: string; // full description, shown in the summary
  originShort: string; // shortened, shown in the SVG label
  checksum: string;
  meta: string; // content-type + synthetic size
  parent: NodeId | null;
  x: number; // top-left in the fixed viewBox
  y: number;
}

interface LineageEdge {
  id: string;
  from: NodeId; // upstream source
  to: NodeId; // downstream dependent
  kind: EdgeKind;
  path: string;
  label?: string;
  lx?: number;
  ly?: number;
}

// The essay's evidence-system colour. Lanes are distinguished by line STYLE,
// not hue, so the whole graph reads as one system.
const EVIDENCE = "var(--color-data-5)";
const PARENT_COLOR = "var(--color-border-strong)";

const NODE_W = 172;
const NODE_H = 56;

const NODE_ORDER: NodeId[] = [
  "count-matrix",
  "gene-annotations",
  "normalized-hits",
  "enrichment",
  "figure-3",
  "report-v1",
  "report-v2",
];

const NODES: Record<NodeId, LineageNode> = {
  "count-matrix": {
    id: "count-matrix",
    file: "count-matrix.h5ad",
    version: "v1",
    origin: "User upload",
    originShort: "user upload",
    checksum: "sha256:1a2b...9f0e",
    meta: "AnnData · 41.2 MB",
    parent: null,
    x: 10,
    y: 22,
  },
  "gene-annotations": {
    id: "gene-annotations",
    file: "gene-annotations.json",
    version: "v1",
    origin: "control-REPL host.mcp handoff",
    originShort: "REPL handoff",
    checksum: "sha256:7c4d...2a10",
    meta: "JSON · 88 KB",
    parent: null,
    x: 10,
    y: 300,
  },
  "normalized-hits": {
    id: "normalized-hits",
    file: "normalized-hits.parquet",
    version: "v1",
    origin: "Python cell: wrapped read_h5ad, then normalize",
    originShort: "python cell",
    checksum: "sha256:b1e5...77c3",
    meta: "Parquet · 2.7 MB",
    parent: null,
    x: 216,
    y: 160,
  },
  enrichment: {
    id: "enrichment",
    file: "enrichment.parquet",
    version: "v1",
    origin: "Python cell: pathway enrichment",
    originShort: "python cell",
    checksum: "sha256:9d02...4e6a",
    meta: "Parquet · 610 KB",
    parent: null,
    x: 422,
    y: 160,
  },
  "figure-3": {
    id: "figure-3",
    file: "figure-3.png",
    version: "v1",
    origin: "Python cell: wrapped savefig",
    originShort: "savefig",
    checksum: "sha256:c3f8...10bd",
    meta: "PNG · 240 KB",
    parent: null,
    x: 628,
    y: 22,
  },
  "report-v1": {
    id: "report-v1",
    file: "report.md",
    version: "v1",
    origin: "Report draft",
    originShort: "draft",
    checksum: "sha256:84c1...7a2f",
    meta: "Markdown · 18.4 KB",
    parent: null,
    x: 628,
    y: 160,
  },
  "report-v2": {
    id: "report-v2",
    file: "report.md",
    version: "v2",
    origin: "Correction of v1",
    originShort: "correction",
    checksum: "sha256:d90a...5b22",
    meta: "Markdown · 19.1 KB",
    parent: "report-v1",
    x: 628,
    y: 300,
  },
};

const EDGES: LineageEdge[] = [
  {
    id: "cm-nh",
    from: "count-matrix",
    to: "normalized-hits",
    kind: "observed",
    path: "M 182 50 C 206 50, 194 188, 216 188",
  },
  {
    id: "ga-nh",
    from: "gene-annotations",
    to: "normalized-hits",
    kind: "reconstructed",
    path: "M 182 328 C 206 328, 194 188, 216 188",
  },
  {
    id: "nh-en",
    from: "normalized-hits",
    to: "enrichment",
    kind: "observed",
    path: "M 388 188 L 422 188",
  },
  {
    id: "en-fig",
    from: "enrichment",
    to: "figure-3",
    kind: "observed",
    path: "M 508 160 C 520 96, 560 50, 628 50",
  },
  {
    id: "en-r1",
    from: "enrichment",
    to: "report-v1",
    kind: "observed",
    path: "M 594 188 L 628 188",
  },
  {
    id: "fig-r1",
    from: "figure-3",
    to: "report-v1",
    kind: "observed",
    path: "M 714 78 L 714 160",
  },
  {
    id: "r1-r2",
    from: "report-v1",
    to: "report-v2",
    kind: "parent",
    path: "M 714 216 L 714 300",
    label: "parent",
    lx: 725,
    ly: 262,
  },
  {
    id: "en-r2",
    from: "enrichment",
    to: "report-v2",
    kind: "pending",
    path: "M 508 216 C 522 296, 562 328, 628 328",
    label: "pending",
    lx: 548,
    ly: 300,
  },
];

// The pending edge is the only one that collapses under extraction_pending.
const PENDING_EDGE_ID = "en-r2";

const LANE_LABEL: Record<EdgeKind, string> = {
  observed: "observed",
  reconstructed: "reconstructed",
  pending: "pending",
  parent: "parent",
};

// Upstream reachability. Follows every edge kind so ancestry includes both the
// dependency chain and the parent-version link.
function collectAncestry(id: NodeId, pendingOn: boolean): Set<NodeId> {
  const active = EDGES.filter(
    (edge) => !(pendingOn && edge.id === PENDING_EDGE_ID),
  );
  const seen = new Set<NodeId>([id]);
  const stack: NodeId[] = [id];
  while (stack.length > 0) {
    const current = stack.pop() as NodeId;
    active
      .filter((edge) => edge.to === current)
      .forEach((edge) => {
        if (!seen.has(edge.from)) {
          seen.add(edge.from);
          stack.push(edge.from);
        }
      });
  }
  return seen;
}

function directInputs(id: NodeId): LineageEdge[] {
  return EDGES.filter((edge) => edge.to === id && edge.kind !== "parent");
}

function EdgeSwatch({ kind }: { kind: EdgeKind }) {
  const isParent = kind === "parent";
  const dash =
    kind === "reconstructed" ? "6 5" : kind === "pending" ? "1.5 4" : undefined;
  return (
    <svg
      width="30"
      height="8"
      viewBox="0 0 30 8"
      aria-hidden="true"
      className="shrink-0"
    >
      <line
        x1="1"
        y1="4"
        x2="29"
        y2="4"
        stroke={isParent ? PARENT_COLOR : EVIDENCE}
        strokeWidth={isParent ? 1 : kind === "pending" ? 1.25 : 2}
        strokeDasharray={dash}
        strokeLinecap={kind === "pending" ? "round" : undefined}
        opacity={kind === "pending" ? 0.8 : 1}
      />
    </svg>
  );
}

function Legend() {
  const items: EdgeKind[] = [
    "observed",
    "reconstructed",
    "pending",
    "parent",
  ];
  const copy: Record<EdgeKind, string> = {
    observed: "observed at runtime",
    reconstructed: "reconstructed (fallback)",
    pending: "pending extraction",
    parent: "parent version",
  };
  return (
    <div className="min-w-0">
      <p className="type-overline mb-2 text-figure-muted">How each edge is known</p>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4 xl:flex xl:flex-wrap xl:gap-x-5"
      >
        {items.map((kind) => (
          <li key={kind} className="flex items-center gap-2">
            <EdgeSwatch kind={kind} />
            <span className="type-caption text-figure-secondary">
              {copy[kind]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LaneTag({ kind }: { kind: EdgeKind }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[3px] border border-border bg-ground-primary px-1.5 py-0.5">
      <EdgeSwatch kind={kind} />
      <span className="type-caption text-figure-secondary">
        {LANE_LABEL[kind]}
      </span>
    </span>
  );
}

function NodeSelector({
  selectedId,
  onSelect,
}: {
  selectedId: NodeId | null;
  onSelect: (id: NodeId) => void;
}) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const tabbableIndex = selectedId ? NODE_ORDER.indexOf(selectedId) : 0;

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % NODE_ORDER.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + NODE_ORDER.length) % NODE_ORDER.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = NODE_ORDER.length - 1;
    }
    if (next === null) return;
    event.preventDefault();
    onSelect(NODE_ORDER[next]);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="listbox"
      aria-label="Artifact version to trace"
      aria-orientation="horizontal"
      className="flex flex-wrap gap-1.5"
    >
      {NODE_ORDER.map((id, index) => {
        const node = NODES[id];
        const active = selectedId === id;
        return (
          <button
            key={id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="option"
            aria-selected={active}
            tabIndex={index === tabbableIndex ? 0 : -1}
            onClick={() => onSelect(id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "type-caption min-h-9 rounded-[4px] border px-2.5 py-1.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-action-primary motion-reduce:transition-none",
              active
                ? "border-transparent bg-action-primary text-figure-inverse"
                : "border-border bg-ground-secondary text-figure-secondary hover:bg-ground-tertiary hover:text-figure-primary",
            )}
          >
            <span className="font-medium">{node.file}</span>{" "}
            <span className={active ? "opacity-80" : "text-figure-muted"}>
              {node.version}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function LineageDiagram({
  selectedId,
  ancestry,
  pendingOn,
  onSelect,
  svgId,
}: {
  selectedId: NodeId | null;
  ancestry: Set<NodeId>;
  pendingOn: boolean;
  onSelect: (id: NodeId) => void;
  svgId: string;
}) {
  const hasSel = selectedId !== null;

  return (
    <svg
      viewBox="0 0 812 392"
      role="img"
      aria-labelledby={`${svgId}-title ${svgId}-desc`}
      className="hidden h-auto w-full sm:block"
    >
      <title id={`${svgId}-title`}>CRISPR artifact-version lineage graph</title>
      <desc id={`${svgId}-desc`}>
        Seven versioned artifacts, from the uploaded count matrix through two
        report versions. Solid edges were observed at runtime, one dashed edge
        was reconstructed after the fact, a dotted edge is pending extraction,
        and a thin parent edge links report.md v1 to its correction v2.
        Selecting a version emphasises its ancestry; node positions never move.
      </desc>
      <defs>
        <marker
          id={`${svgId}-dep`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={EVIDENCE} />
        </marker>
        <marker
          id={`${svgId}-parent`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path
            d="M 1 1 L 9 5 L 1 9"
            fill="none"
            stroke={PARENT_COLOR}
            strokeWidth="1.5"
          />
        </marker>
      </defs>

      {EDGES.map((edge) => {
        if (pendingOn && edge.id === PENDING_EDGE_ID) return null;
        const isParent = edge.kind === "parent";
        const highlighted = hasSel && ancestry.has(edge.to);
        const dimmed = hasSel && !highlighted;
        const dash =
          edge.kind === "reconstructed"
            ? "7 6"
            : edge.kind === "pending"
              ? "1.5 5"
              : undefined;
        const baseWidth =
          edge.kind === "pending" ? 1.25 : isParent ? 1 : 1.75;
        const width = highlighted
          ? edge.kind === "pending"
            ? 2
            : isParent
              ? 1.4
              : 2.5
          : baseWidth;
        const showLabel = Boolean(edge.label) && (!hasSel || highlighted);

        return (
          <g
            key={edge.id}
            aria-hidden="true"
            className="transition-opacity duration-200 motion-reduce:transition-none"
            opacity={dimmed ? 0.18 : edge.kind === "pending" ? 0.85 : 1}
          >
            <path
              d={edge.path}
              fill="none"
              stroke={isParent ? PARENT_COLOR : EVIDENCE}
              strokeWidth={width}
              strokeDasharray={dash}
              strokeLinecap={edge.kind === "pending" ? "round" : undefined}
              markerEnd={`url(#${svgId}-${isParent ? "parent" : "dep"})`}
            />
            {showLabel ? (
              <text
                x={edge.lx}
                y={edge.ly}
                textAnchor="middle"
                fill="var(--color-text-muted)"
                fontSize="10.5"
                letterSpacing="0"
              >
                {edge.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {NODE_ORDER.map((id) => {
        const node = NODES[id];
        const isSelected = selectedId === id;
        const inAncestry = ancestry.has(id);
        const dimmed = hasSel && !isSelected && !inAncestry;
        const pendingNode = pendingOn && id === "report-v2";

        return (
          <g
            key={id}
            className="cursor-pointer transition-opacity duration-200 motion-reduce:transition-none"
            opacity={dimmed ? 0.34 : 1}
            onClick={() => onSelect(id)}
          >
            <rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={NODE_H}
              rx="4"
              fill={
                isSelected
                  ? "var(--color-bg-secondary)"
                  : "var(--color-bg-primary)"
              }
              stroke={isSelected ? EVIDENCE : "var(--color-border-default)"}
              strokeWidth={isSelected ? 2.5 : 1}
              strokeDasharray={pendingNode ? "5 4" : undefined}
            />
            <rect
              x={node.x}
              y={node.y}
              width="4"
              height={NODE_H}
              rx="2"
              fill={EVIDENCE}
            />
            <text
              x={node.x + 15}
              y={node.y + 23}
              fill="var(--color-text-primary)"
              fontSize="12.5"
              fontWeight="500"
              letterSpacing="0"
            >
              {node.file}
            </text>
            <text
              x={node.x + 15}
              y={node.y + 41}
              fill="var(--color-text-muted)"
              fontSize="11"
              letterSpacing="0"
            >
              {node.version} · {node.originShort}
            </text>
          </g>
        );
      })}

      {pendingOn ? (
        <text
          x="714"
          y="378"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="11"
          letterSpacing="0"
        >
          0 edges · extraction_pending=true
        </text>
      ) : null}
    </svg>
  );
}

function MobileLineage({
  selectedId,
  pendingOn,
}: {
  selectedId: NodeId | null;
  pendingOn: boolean;
}) {
  const displayId: NodeId = selectedId ?? "report-v1";
  const node = NODES[displayId];
  const collapsed = pendingOn && displayId === "report-v2";
  const inputs = collapsed ? [] : directInputs(displayId);
  const parent = node.parent ? NODES[node.parent] : null;

  return (
    <div className="sm:hidden" aria-label="Selected version and what it was built from">
      <p className="type-overline mb-2 text-figure-muted">
        {selectedId ? "Selected version" : "Example: report.md v1"}
      </p>
      <div
        className="rounded-[4px] border border-l-2 border-border bg-ground-primary p-3"
        style={{ borderLeftColor: EVIDENCE }}
      >
        <p className="type-label m-0 break-words text-figure-primary">
          {node.file} <span className="text-figure-muted">{node.version}</span>
        </p>
        <p className="type-caption m-0 mt-1 text-figure-secondary">
          {node.origin}
        </p>
      </div>

      <p className="type-overline mb-2 mt-4 text-figure-muted">Built from</p>
      {collapsed ? (
        <div
          className="rounded-[4px] border border-l-2 border-dashed border-border bg-ground-secondary p-3"
          style={{ borderLeftColor: EVIDENCE }}
        >
          <p className="type-caption m-0 text-figure-secondary">
            0 dependency edges. <InlineCodeLabel>extraction_pending=true</InlineCodeLabel>{" "}
            is not proof of zero inputs.
          </p>
        </div>
      ) : inputs.length > 0 ? (
        <ul role="list" className="space-y-2">
          {inputs.map((edge) => {
            const source = NODES[edge.from];
            return (
              <li
                key={edge.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-[4px] border border-l-2 border-border bg-ground-primary p-2.5"
                style={{
                  borderLeftColor: EVIDENCE,
                  borderLeftStyle:
                    edge.kind === "reconstructed"
                      ? "dashed"
                      : edge.kind === "pending"
                        ? "dotted"
                        : "solid",
                }}
              >
                <span className="type-caption min-w-0 break-words text-figure-primary">
                  {source.file}{" "}
                  <span className="text-figure-muted">{source.version}</span>
                </span>
                <LaneTag kind={edge.kind} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="type-caption m-0 text-figure-secondary">
          Original input. No upstream versions.
        </p>
      )}

      <p className="type-overline mb-1 mt-4 text-figure-muted">Parent version</p>
      <p className="type-caption m-0 text-figure-primary">
        {parent ? (
          <>
            {parent.file}{" "}
            <span className="text-figure-muted">{parent.version}</span>
          </>
        ) : (
          "None"
        )}
      </p>
    </div>
  );
}

function VersionSummary({
  selectedId,
  pendingOn,
}: {
  selectedId: NodeId | null;
  pendingOn: boolean;
}) {
  if (!selectedId) {
    return (
      <div>
        <p className="type-overline text-figure-muted">No version selected</p>
        <p className="type-body-sm mb-0 mt-2 text-figure-secondary">
          Select a version to trace what it was built from, and how each input
          is known: observed while the code ran, reconstructed afterward, or
          still pending.
        </p>
      </div>
    );
  }

  const node = NODES[selectedId];
  const collapsed = pendingOn && selectedId === "report-v2";
  const inputs = collapsed ? [] : directInputs(selectedId);
  const parent = node.parent ? NODES[node.parent] : null;

  return (
    <div>
      <header className="border-b border-border pb-3">
        <p className="type-label m-0 text-figure-primary">
          {node.file} <span className="text-figure-muted">· {node.version}</span>
        </p>
        <p className="type-caption m-0 mt-1 text-figure-secondary">
          {node.origin}
        </p>
        <p className="type-caption m-0 mt-1.5 text-figure-muted">
          <InlineCodeLabel>{node.checksum}</InlineCodeLabel>{" "}
          <span className="ml-1">{node.meta}</span>
        </p>
      </header>

      <div className="border-b border-border py-3">
        <p className="type-overline mb-2 text-figure-muted">Built from</p>
        {collapsed ? (
          <p className="type-caption m-0 text-figure-secondary">
            0 dependency edges.{" "}
            <InlineCodeLabel>extraction_pending=true</InlineCodeLabel> is not
            proof of zero inputs. report.md v2&rsquo;s inputs (enrichment.parquet
            v1, figure-3.png v1) may still converge.
          </p>
        ) : inputs.length > 0 ? (
          <ul role="list" className="space-y-2">
            {inputs.map((edge) => {
              const source = NODES[edge.from];
              return (
                <li
                  key={edge.id}
                  className="flex flex-wrap items-center justify-between gap-2"
                >
                  <span className="type-caption min-w-0 break-words text-figure-primary">
                    {source.file}{" "}
                    <span className="text-figure-muted">{source.version}</span>
                  </span>
                  <LaneTag kind={edge.kind} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="type-caption m-0 text-figure-secondary">
            Original input. No upstream versions.
          </p>
        )}
      </div>

      <div className="pt-3">
        <p className="type-overline mb-1 text-figure-muted">Parent version</p>
        <p className="type-caption m-0 text-figure-primary">
          {parent ? (
            <>
              {parent.file}{" "}
              <span className="text-figure-muted">{parent.version}</span>
            </>
          ) : (
            "None. This is an original version."
          )}
        </p>
      </div>
    </div>
  );
}

export function ArtifactLineageExplorer() {
  const [selectedId, setSelectedId] = React.useState<NodeId | null>(null);
  const [pendingOn, setPendingOn] = React.useState(false);
  const svgId = React.useId().replace(/:/g, "");

  const ancestry = React.useMemo(
    () =>
      selectedId ? collectAncestry(selectedId, pendingOn) : new Set<NodeId>(),
    [selectedId, pendingOn],
  );

  function togglePending(checked: boolean) {
    setPendingOn(checked);
    // The pending case lives on report.md v2; focus the reader on it so the
    // "0 edges" state is the selected node.
    if (checked) setSelectedId("report-v2");
  }

  return (
    <FigureScaffold
      eyebrow="Artifact lineage"
      title="What a version was built from, and how each input is known"
      description="Every artifact version points back to the exact versions it was built from. Each dependency edge is marked by how it is known: observed while the code ran, reconstructed afterward, or still pending. Select a version to trace its ancestry."
      caption="Figure E. A fixed lineage graph for the essay's CRISPR probe. Filenames, checksums, and sizes are synthetic illustration; the schema (versioned inputs, runtime-observed versus reconstructed edges, parent_version_id, and extraction_pending) follows Claude Science 0.1.15."
    >
      <div className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <Legend />
        <label className="type-caption flex min-h-9 shrink-0 cursor-pointer items-center gap-2 text-figure-primary">
          <input
            type="checkbox"
            checked={pendingOn}
            onChange={(event) => togglePending(event.target.checked)}
            className="size-4 accent-[var(--color-action-primary)]"
          />
          extraction_pending (report.md v2)
        </label>
      </div>

      <div className="mt-4">
        <p className="type-overline mb-2 text-figure-muted">Select a version</p>
        <NodeSelector selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      <div className="mt-4 grid min-w-0 gap-px overflow-hidden rounded-[4px] border border-border bg-border xl:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.75fr)]">
        <section
          aria-label="Artifact lineage graph"
          className="min-w-0 bg-ground-primary p-3 sm:p-4"
        >
          <LineageDiagram
            selectedId={selectedId}
            ancestry={ancestry}
            pendingOn={pendingOn}
            onSelect={setSelectedId}
            svgId={svgId}
          />
          <MobileLineage selectedId={selectedId} pendingOn={pendingOn} />
        </section>

        <section
          aria-live="polite"
          aria-label="Selected version summary"
          className="min-w-0 border-l-2 bg-ground-secondary p-4 sm:p-5"
          style={{ borderLeftColor: EVIDENCE }}
        >
          <VersionSummary selectedId={selectedId} pendingOn={pendingOn} />
        </section>
      </div>
    </FigureScaffold>
  );
}
