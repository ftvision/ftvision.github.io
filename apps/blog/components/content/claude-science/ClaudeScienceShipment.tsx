"use client";

import * as React from "react";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";

const RUNTIME_VERSION = "0.1.15-dev.20260701.t220242.shaaa553de-release";
const DAEMON_SHA =
  "1aedf014814f7c7295913b898cddf319f61d462ea8080a7bdfbb9cc06c9a384e";

type ShipmentMode = "bundle" | "runtime" | "provisioned";

interface EvidenceItem {
  id: string;
  mode: ShipmentMode;
  label: string;
  path: string;
  detail: string;
  inspect: string;
}

const MODES: Array<{ id: ShipmentMode; label: string }> = [
  { id: "bundle", label: "Bundle" },
  { id: "runtime", label: "Runtime" },
  { id: "provisioned", label: "Provisioned" },
];

const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: "signed-app",
    mode: "bundle",
    label: "Signed app shell",
    path: "/Applications/Claude Science.app",
    detail:
      "A signed AppKit launcher containing the seed daemon; bundle version 0.1.0-dev.20260630.t160235.sha2e3e6f9.",
    inspect:
      "codesign --verify --deep --strict '/Applications/Claude Science.app'",
  },
  {
    id: "seed-daemon",
    mode: "bundle",
    label: "Seed daemon",
    path: "Contents/Resources/bin/claude-science",
    detail:
      "The app-bundled bootstrap binary. Its SHA-256 differs from the later staged daemon.",
    inspect:
      "file '/Applications/Claude Science.app/Contents/Resources/bin/claude-science'",
  },
  {
    id: "staged-daemon",
    mode: "runtime",
    label: "Staged daemon",
    path: "~/.claude-science/bin/claude-science",
    detail: `Self-updating Bun executable, approximately 112 MB when downloaded. SHA-256 ${DAEMON_SHA}.`,
    inspect: "shasum -a 256 ~/.claude-science/bin/claude-science",
  },
  {
    id: "embedded-templates",
    mode: "runtime",
    label: "21 embedded templates",
    path: "embedded in ~/.claude-science/bin/claude-science",
    detail:
      "Daemon-embedded Python and R workers, SDK fragments, verification code, provenance support, and notebook replay shims.",
    inspect:
      "strings ~/.claude-science/bin/claude-science | rg 'FRAGMENT MODEL|_OperonSDK'",
  },
  {
    id: "runtime-payload",
    mode: "runtime",
    label: "Versioned runtime payload",
    path: `~/.claude-science/runtime/${RUNTIME_VERSION}`,
    detail:
      "About 95 MB: agents, kernels, compute, drizzle/sqlite, skills, MCP servers, seed archives, web-dist, micromamba, and support binaries.",
    inspect: "find ~/.claude-science/runtime/<version> -maxdepth 1 -print",
  },
  {
    id: "conda-tree",
    mode: "provisioned",
    label: "Conda substrate",
    path: "~/.claude-science/conda/",
    detail:
      "Approximately 3.7 GB of provisioned execution environments, managed separately from the versioned product runtime.",
    inspect: "du -sh ~/.claude-science/conda",
  },
  {
    id: "seed-assets",
    mode: "provisioned",
    label: "Expanded seed assets",
    path: "~/.claude-science/runtime/<version>/seed/",
    detail:
      "Expanded CRISPR, enzyme engineering, extremophile, and immunotherapy examples with reports, plans, data, and analysis outputs.",
    inspect:
      "tar -tzf ~/.claude-science/runtime/<version>/seed/assets_crispr_screen.tar.gz",
  },
];

const FIRST_EVIDENCE_BY_MODE: Record<ShipmentMode, string> = {
  bundle: "signed-app",
  runtime: "staged-daemon",
  provisioned: "conda-tree",
};

const ASSEMBLY_STEPS = [
  "Ready: the dashed route is a reconstructed staging relationship.",
  "1. The signed app shell starts from its bundled seed daemon.",
  "2. A self-updating daemon is staged under ~/.claude-science/bin.",
  "3. The daemon selects the 0.1.15 versioned runtime payload.",
  "4. Runtime provisioning leaves larger conda environments and seed assets on disk.",
];

const DESKTOP_TRACE_POINTS = [
  { x: 128, y: 185 },
  { x: 320, y: 185 },
  { x: 560, y: 185 },
  { x: 918, y: 185 },
];

const MOBILE_TRACE_POINTS = [
  { x: 180, y: 132 },
  { x: 180, y: 294 },
  { x: 180, y: 474 },
  { x: 180, y: 682 },
];

function groupStyle(active: boolean, axis: "x" | "y" = "y") {
  const offset = active ? -8 : 0;
  return {
    opacity: active ? 1 : 0.44,
    transform:
      axis === "y" ? `translateY(${offset}px)` : `translateX(${offset}px)`,
    transformBox: "fill-box" as const,
    transformOrigin: "center",
  };
}

function AssemblySegment({ d, active }: { d: string; active: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      pathLength={1}
      stroke="var(--color-action-primary)"
      strokeDasharray={1}
      strokeDashoffset={active ? 0 : 1}
      strokeLinecap="round"
      strokeWidth={3}
      className="transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none"
    />
  );
}

function DesktopShipmentGraphic({
  mode,
  assemblyStep,
}: {
  mode: ShipmentMode;
  assemblyStep: number;
}) {
  const point = DESKTOP_TRACE_POINTS[Math.max(0, assemblyStep - 1)];

  return (
    <svg
      className="hidden h-auto w-full overflow-visible sm:block"
      viewBox="0 0 960 390"
      role="img"
      aria-labelledby="shipment-title-desktop shipment-desc-desktop"
    >
      <title id="shipment-title-desktop">
        Exploded installation specimen for Claude Science 0.1.15
      </title>
      <desc id="shipment-desc-desktop">
        The signed app contains a seed daemon. A staged daemon owns host logic
        and embeds 21 SDK or worker templates. A separate versioned runtime
        contains agents, kernels, compute, migrations, skills, MCP servers, seed
        archives, and the web app. Provisioned conda environments and seed
        assets occupy the larger mutable machine state. Dashed arrows are a
        reconstructed staging relationship.
      </desc>

      <text
        x="20"
        y="24"
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-code)"
        fontSize="11"
      >
        EXPLODED INSTALLATION SPECIMEN / DARWIN-ARM64
      </text>
      <text
        x="940"
        y="24"
        textAnchor="end"
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-body)"
        fontSize="11"
      >
        footprint cue is log-compressed, not a scale drawing
      </text>

      <g
        style={groupStyle(mode === "bundle")}
        className="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
      >
        <rect
          x="20"
          y="76"
          width="120"
          height="218"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <path
          d="M20 108H140"
          stroke="var(--color-border-default)"
          strokeWidth="1"
        />
        <text
          x="32"
          y="98"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          SIGNED BUNDLE
        </text>
        <text
          x="32"
          y="136"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-body)"
          fontSize="15"
          fontWeight="500"
        >
          Claude Science.app
        </text>
        <text
          x="32"
          y="158"
          fill="var(--color-text-secondary)"
          fontFamily="var(--font-family-body)"
          fontSize="11"
        >
          AppKit launcher
        </text>
        <rect
          x="32"
          y="190"
          width="96"
          height="72"
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-default)"
        />
        <text
          x="42"
          y="212"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="9"
        >
          Resources/bin
        </text>
        <text
          x="42"
          y="234"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          seed daemon
        </text>
        <text
          x="42"
          y="250"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="9"
        >
          0.1.0 / 2e3e6f9
        </text>
      </g>

      <g
        style={groupStyle(mode === "runtime")}
        className="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
      >
        <rect
          x="180"
          y="92"
          width="150"
          height="188"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <path
          d="M180 124H330"
          stroke="var(--color-border-default)"
          strokeWidth="1"
        />
        <text
          x="192"
          y="114"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          STAGED DAEMON / ~112 MB
        </text>
        <text
          x="192"
          y="148"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="11"
          fontWeight="500"
        >
          ~/.claude-science/bin
        </text>
        <text
          x="192"
          y="166"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="11"
        >
          /claude-science
        </text>
        <path
          d="M192 184H318M192 205H318M192 226H318M192 247H318"
          stroke="var(--color-border-default)"
        />
        <text x="198" y="198" fill="var(--color-text-secondary)" fontSize="10">
          host / dispatcher
        </text>
        <text x="198" y="219" fill="var(--color-text-secondary)" fontSize="10">
          web service
        </text>
        <text x="198" y="240" fill="var(--color-text-secondary)" fontSize="10">
          SDK templates x 21
        </text>
        <text x="198" y="261" fill="var(--color-text-secondary)" fontSize="10">
          kernel manager
        </text>
      </g>

      <g
        style={groupStyle(mode === "runtime")}
        className="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
      >
        <rect
          x="370"
          y="72"
          width="200"
          height="228"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <path
          d="M370 104H570"
          stroke="var(--color-border-default)"
          strokeWidth="1"
        />
        <text
          x="382"
          y="94"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          VERSIONED RUNTIME / ~95 MB
        </text>
        <text
          x="382"
          y="128"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="11"
          fontWeight="500"
        >
          0.1.15...shaaa553de-release
        </text>
        {[
          ["agents", 382, 148],
          ["kernels", 472, 148],
          ["compute", 382, 181],
          ["drizzle/sqlite", 472, 181],
          ["skills", 382, 214],
          ["mcp-servers", 472, 214],
          ["seed", 382, 247],
          ["web-dist", 472, 247],
          ["support bins", 382, 280],
        ].map(([label, x, y]) => (
          <g key={String(label)}>
            <rect
              x={Number(x)}
              y={Number(y)}
              width="78"
              height="25"
              fill="var(--color-bg-primary)"
              stroke="var(--color-border-default)"
            />
            <text
              x={Number(x) + 6}
              y={Number(y) + 16}
              fill="var(--color-text-secondary)"
              fontFamily="var(--font-family-code)"
              fontSize="9"
            >
              {label}
            </text>
          </g>
        ))}
      </g>

      <g
        style={groupStyle(mode === "provisioned")}
        className="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
      >
        <rect
          x="610"
          y="46"
          width="330"
          height="282"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <path
          d="M610 78H940"
          stroke="var(--color-border-default)"
          strokeWidth="1"
        />
        <text
          x="622"
          y="68"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          PROVISIONED MACHINE STATE / APP HOME ~4.1 GB
        </text>
        <rect
          x="628"
          y="104"
          width="294"
          height="138"
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-default)"
        />
        <text
          x="646"
          y="136"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="14"
          fontWeight="500"
        >
          ~/.claude-science/conda/
        </text>
        <text
          x="646"
          y="159"
          fill="var(--color-text-secondary)"
          fontFamily="var(--font-family-body)"
          fontSize="12"
        >
          Python and R execution substrate
        </text>
        <text
          x="646"
          y="216"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="20"
        >
          ~3.7 GB
        </text>
        <rect
          x="628"
          y="258"
          width="294"
          height="50"
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-default)"
        />
        <text
          x="646"
          y="287"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="12"
        >
          seed-assets/ / expanded examples
        </text>
      </g>

      <g fill="none" stroke="var(--color-text-muted)" strokeWidth="1.25">
        <path d="M140 185H180" strokeDasharray="5 5" />
        <path d="M330 185H370" strokeDasharray="5 5" />
        <path d="M570 185H610" strokeDasharray="5 5" />
      </g>
      <g
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-body)"
        fontSize="9"
      >
        <text x="160" y="174" textAnchor="middle">
          stage
        </text>
        <text x="350" y="174" textAnchor="middle">
          select
        </text>
        <text x="590" y="174" textAnchor="middle">
          provision
        </text>
      </g>

      <AssemblySegment d="M140 185H180" active={assemblyStep >= 2} />
      <AssemblySegment d="M330 185H370" active={assemblyStep >= 3} />
      <AssemblySegment d="M570 185H610" active={assemblyStep >= 4} />
      {assemblyStep > 0 ? (
        <circle
          cx={point.x}
          cy={point.y}
          r="6"
          fill="var(--color-action-primary)"
          stroke="var(--color-bg-primary)"
          strokeWidth="2"
          className="transition-[cx,cy] duration-500 ease-out motion-reduce:transition-none"
        />
      ) : null}

      <path
        d="M20 354H940"
        stroke="var(--color-border-default)"
        strokeWidth="1"
      />
      <text
        x="20"
        y="376"
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-code)"
        fontSize="10"
      >
        INTERPRETATION
      </text>
      <text
        x="128"
        y="376"
        fill="var(--color-text-primary)"
        fontFamily="var(--font-family-body)"
        fontSize="13"
      >
        Not one environment: a daemon, a versioned product payload, and
        execution state.
      </text>
    </svg>
  );
}

function MobileShipmentGraphic({
  mode,
  assemblyStep,
}: {
  mode: ShipmentMode;
  assemblyStep: number;
}) {
  const point = MOBILE_TRACE_POINTS[Math.max(0, assemblyStep - 1)];

  return (
    <svg
      className="h-auto w-full overflow-visible sm:hidden"
      viewBox="0 0 360 760"
      role="img"
      aria-labelledby="shipment-title-mobile shipment-desc-mobile"
    >
      <title id="shipment-title-mobile">
        Exploded installation specimen for Claude Science 0.1.15
      </title>
      <desc id="shipment-desc-mobile">
        A vertical exploded view of the signed app, staged daemon, versioned
        runtime, and provisioned conda and seed state. Solid boxes are observed;
        dashed connectors reconstruct the staging relationship.
      </desc>

      <text
        x="16"
        y="22"
        fill="var(--color-text-muted)"
        fontFamily="var(--font-family-code)"
        fontSize="11"
      >
        INSTALLATION SPECIMEN / OBSERVED BOXES
      </text>

      <g
        style={groupStyle(mode === "bundle", "x")}
        className="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
      >
        <rect
          x="72"
          y="48"
          width="216"
          height="122"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <text
          x="88"
          y="72"
          fill="var(--color-text-muted)"
          fontSize="10"
          fontFamily="var(--font-family-code)"
        >
          SIGNED BUNDLE
        </text>
        <text
          x="88"
          y="98"
          fill="var(--color-text-primary)"
          fontSize="15"
          fontWeight="500"
        >
          Claude Science.app
        </text>
        <text x="88" y="122" fill="var(--color-text-secondary)" fontSize="11">
          AppKit launcher
        </text>
        <rect
          x="88"
          y="136"
          width="184"
          height="22"
          fill="var(--color-bg-primary)"
          stroke="var(--color-border-default)"
        />
        <text
          x="98"
          y="151"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="9"
        >
          Resources/bin/claude-science / seed
        </text>
      </g>

      <path
        d="M180 170V212"
        stroke="var(--color-text-muted)"
        strokeDasharray="5 5"
      />
      <text x="194" y="196" fill="var(--color-text-muted)" fontSize="10">
        inferred staging
      </text>

      <g
        style={groupStyle(mode === "runtime", "x")}
        className="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
      >
        <rect
          x="60"
          y="212"
          width="240"
          height="132"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <text
          x="76"
          y="236"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          STAGED DAEMON / ~112 MB
        </text>
        <text
          x="76"
          y="262"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="11"
          fontWeight="500"
        >
          ~/.claude-science/bin/claude-science
        </text>
        <text x="76" y="287" fill="var(--color-text-secondary)" fontSize="11">
          host / dispatcher - web service
        </text>
        <text x="76" y="309" fill="var(--color-text-secondary)" fontSize="11">
          21 SDK templates - kernel manager
        </text>
        <text
          x="76"
          y="331"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="9"
        >
          SHA-256 1aedf014...a384e
        </text>
      </g>

      <path
        d="M180 344V388"
        stroke="var(--color-text-muted)"
        strokeDasharray="5 5"
      />
      <text x="194" y="370" fill="var(--color-text-muted)" fontSize="10">
        select
      </text>

      <g
        style={groupStyle(mode === "runtime", "x")}
        className="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
      >
        <rect
          x="42"
          y="388"
          width="276"
          height="166"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <text
          x="58"
          y="412"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          VERSIONED RUNTIME / ~95 MB
        </text>
        <text
          x="58"
          y="437"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
          fontWeight="500"
        >
          0.1.15...shaaa553de-release
        </text>
        <text
          x="58"
          y="466"
          fill="var(--color-text-secondary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          agents / kernels / compute
        </text>
        <text
          x="58"
          y="489"
          fill="var(--color-text-secondary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          drizzle/sqlite / skills / mcp-servers
        </text>
        <text
          x="58"
          y="512"
          fill="var(--color-text-secondary)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          seed / web-dist / micromamba / support
        </text>
        <text x="58" y="539" fill="var(--color-text-muted)" fontSize="10">
          about 950 files across 174 directories
        </text>
      </g>

      <path
        d="M180 554V598"
        stroke="var(--color-text-muted)"
        strokeDasharray="5 5"
      />
      <text x="194" y="580" fill="var(--color-text-muted)" fontSize="10">
        provision
      </text>

      <g
        style={groupStyle(mode === "provisioned", "x")}
        className="transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
      >
        <rect
          x="20"
          y="598"
          width="320"
          height="126"
          fill="var(--color-bg-secondary)"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
        />
        <text
          x="36"
          y="622"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-family-code)"
          fontSize="10"
        >
          PROVISIONED / APP HOME ~4.1 GB
        </text>
        <text
          x="36"
          y="653"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="12"
          fontWeight="500"
        >
          conda/ ~3.7 GB
        </text>
        <text x="36" y="675" fill="var(--color-text-secondary)" fontSize="10">
          persistent Python and R execution substrate
        </text>
        <text
          x="36"
          y="704"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-family-code)"
          fontSize="11"
        >
          seed-assets/ / expanded examples
        </text>
      </g>

      <AssemblySegment d="M180 170V212" active={assemblyStep >= 2} />
      <AssemblySegment d="M180 344V388" active={assemblyStep >= 3} />
      <AssemblySegment d="M180 554V598" active={assemblyStep >= 4} />
      {assemblyStep > 0 ? (
        <circle
          cx={point.x}
          cy={point.y}
          r="6"
          fill="var(--color-action-primary)"
          stroke="var(--color-bg-primary)"
          strokeWidth="2"
          className="transition-[cx,cy] duration-500 ease-out motion-reduce:transition-none"
        />
      ) : null}

      <text x="20" y="750" fill="var(--color-text-primary)" fontSize="11">
        Interpretation: daemon + product payload + execution state.
      </text>
    </svg>
  );
}

export function ClaudeScienceShipment() {
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = React.useState<ShipmentMode>("runtime");
  const [selectedEvidenceId, setSelectedEvidenceId] =
    React.useState("staged-daemon");
  const [assemblyStep, setAssemblyStep] = React.useState(0);
  const [isTracing, setIsTracing] = React.useState(false);

  React.useEffect(() => {
    if (!isTracing) return;

    if (prefersReducedMotion) {
      setAssemblyStep(4);
      setIsTracing(false);
      return;
    }

    if (assemblyStep >= 4) {
      setIsTracing(false);
      return;
    }

    const timer = window.setTimeout(
      () => setAssemblyStep((step) => step + 1),
      560,
    );
    return () => window.clearTimeout(timer);
  }, [assemblyStep, isTracing, prefersReducedMotion]);

  const selectedEvidence =
    EVIDENCE_ITEMS.find((item) => item.id === selectedEvidenceId) ??
    EVIDENCE_ITEMS[2];
  const visibleEvidence = EVIDENCE_ITEMS.filter((item) => item.mode === mode);

  const selectMode = (nextMode: ShipmentMode) => {
    setMode(nextMode);
    setSelectedEvidenceId(FIRST_EVIDENCE_BY_MODE[nextMode]);
  };

  const traceAssembly = () => {
    if (prefersReducedMotion) {
      setAssemblyStep(4);
      setIsTracing(false);
      return;
    }

    setAssemblyStep(1);
    setIsTracing(true);
  };

  return (
    <FigureScaffold
      eyebrow="Install anatomy"
      title="What ships to your machine"
      description="The 0.1.15 specimen separates the signed bootstrap bundle, staged daemon and embedded templates, versioned product runtime, and larger provisioned execution state. Solid boxes are observed; dashed staging relations are reconstruction."
      caption={
        <>
          <strong>
            Figure A. Claude Science arrives as more than a Python environment.
          </strong>{" "}
          The daemon and runtime are directly observed in the target
          installation. The one-shot assembly route is intentionally dashed
          because this pass did not preserve one complete unpacker for every
          directory.
        </>
      }
    >
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex max-w-full flex-wrap border border-border p-1"
          role="group"
          aria-label="Inspect installation state"
        >
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mode === item.id}
              className={`min-h-11 px-3 py-2 type-label transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                mode === item.id
                  ? "bg-action-primary text-figure-inverse"
                  : "text-figure-secondary hover:bg-ground-secondary hover:text-figure-primary"
              }`}
              onClick={() => selectMode(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="min-h-11 border border-border px-3 py-2 type-label text-figure-primary transition-colors hover:bg-ground-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-wait disabled:text-figure-muted"
          onClick={traceAssembly}
          disabled={isTracing}
        >
          {isTracing ? "Tracing assembly..." : "Trace assembly once"}
        </button>
      </div>

      <div className="mt-5 min-w-0">
        <DesktopShipmentGraphic mode={mode} assemblyStep={assemblyStep} />
        <MobileShipmentGraphic mode={mode} assemblyStep={assemblyStep} />
      </div>

      <p
        className="type-caption mt-3 border-l-2 border-dashed border-border-strong pl-3 text-figure-secondary"
        aria-live="polite"
      >
        {ASSEMBLY_STEPS[assemblyStep]}
      </p>

      <div
        className="mt-5 border-y border-border"
        aria-label={`${mode} inventory`}
      >
        {visibleEvidence.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selectedEvidenceId === item.id}
            className={`grid min-h-11 w-full min-w-0 gap-1 border-b border-border px-2 py-3 text-left last:border-b-0 sm:grid-cols-[minmax(9rem,0.55fr)_minmax(0,1fr)] sm:items-baseline ${
              selectedEvidenceId === item.id
                ? "bg-ground-secondary text-figure-primary"
                : "text-figure-secondary hover:bg-ground-secondary hover:text-figure-primary"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus-ring`}
            onClick={() => setSelectedEvidenceId(item.id)}
          >
            <span className="type-label">{item.label}</span>
            <code className="min-w-0 break-all font-code text-[0.75rem] leading-5">
              {item.path}
            </code>
          </button>
        ))}
      </div>

      <div className="mt-4 grid min-w-0 gap-2 border-l-2 border-action-primary pl-3 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.55fr)] sm:gap-6">
        <div className="min-w-0">
          <p className="type-overline mb-1 text-action-primary">
            Observed evidence
          </p>
          <p className="type-body-sm m-0 text-figure-primary [overflow-wrap:anywhere]">
            {selectedEvidence.detail}
          </p>
        </div>
        <div className="min-w-0">
          <p className="type-overline mb-1 text-figure-muted">
            Inspect locally
          </p>
          <code className="block break-words font-code text-[0.75rem] leading-5 text-figure-secondary">
            {selectedEvidence.inspect}
          </code>
        </div>
      </div>
    </FigureScaffold>
  );
}
