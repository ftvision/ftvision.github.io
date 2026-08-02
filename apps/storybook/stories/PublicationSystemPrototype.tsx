import type { ComponentType } from "react";
import { useMemo, useState } from "react";

import { EditorialCommandmentsPrototype } from "./EditorialCommandmentsPrototype";
import { EditorialHomePrototype } from "./EditorialHomePrototype";
import { EditorialReadingPrototype } from "./EditorialReadingPrototype";
import {
  ModernistCommandments,
  ModernistLanding,
  ModernistPublicationRenderer,
  ModernistRejectionEssay,
  ModernistVision100,
} from "./ModernistPublicationSystem";

import "./publication-system-prototype.css";

export type PublicationSystemId = "fine-press" | "modernist";

export type WorkId =
  | "landing"
  | "rejection-letter"
  | "product-commandments"
  | "vision-100";

export type WorkKind =
  | "front-table"
  | "narrative-essay"
  | "structured-essay"
  | "reference-work";

export type PresentationId =
  | "front-table"
  | "rejection-letter"
  | "product-commandments"
  | "vision-paper-atlas";

export interface WorkManifest {
  id: WorkId;
  slug: string;
  kind: WorkKind;
  presentation: PresentationId;
  title: string;
  description: string;
}

export type WorkRenderer = ComponentType<{ manifest: WorkManifest }>;

export interface PublicationSystemDefinition {
  id: PublicationSystemId;
  label: string;
  description: string;
  renderers: {
    fallback: WorkRenderer;
    byKind: Partial<Record<WorkKind, WorkRenderer>>;
    byPresentation: Partial<Record<PresentationId, WorkRenderer>>;
    bySlug?: Record<string, WorkRenderer>;
  };
}

export const WORK_MANIFESTS: Record<WorkId, WorkManifest> = {
  landing: {
    id: "landing",
    slug: "/",
    kind: "front-table",
    presentation: "front-table",
    title: "Algo Mind",
    description: "A selective front table for the publication.",
  },
  "rejection-letter": {
    id: "rejection-letter",
    slug: "/essays/your-own-rejection-letter/",
    kind: "narrative-essay",
    presentation: "rejection-letter",
    title: "Stop Being Your Own Rejection Letter",
    description:
      "A narrative essay with documentary evidence and a continuous reading measure.",
  },
  "product-commandments": {
    id: "product-commandments",
    slug: "/essays/ten-commandments-for-product/",
    kind: "structured-essay",
    presentation: "product-commandments",
    title: "The Ten Commandments for Building Product",
    description:
      "A bilingual structured essay with full, argument, and spine readings.",
  },
  "vision-100": {
    id: "vision-100",
    slug: "/series/vision-100/",
    kind: "reference-work",
    presentation: "vision-paper-atlas",
    title: "100 Vision Papers",
    description:
      "An interactive reference work with a map, searchable register, and method.",
  },
};

const FinePressLanding: WorkRenderer = () => <EditorialHomePrototype />;
const FinePressRejectionLetter: WorkRenderer = () => (
  <EditorialReadingPrototype initialPage="essay" />
);
const FinePressProductCommandments: WorkRenderer = () => (
  <EditorialCommandmentsPrototype initialLanguage="en" />
);
const FinePressVision100: WorkRenderer = () => (
  <EditorialReadingPrototype initialPage="vision100" />
);

const FinePressFallback: WorkRenderer = ({ manifest }) => (
  <div className="publication-system__fallback">
    <p>Fine Press</p>
    <h1>{manifest.title}</h1>
    <p>{manifest.description}</p>
  </div>
);

export const PUBLICATION_SYSTEMS: Record<
  PublicationSystemId,
  PublicationSystemDefinition
> = {
  "fine-press": {
    id: "fine-press",
    label: "Fine Press",
    description:
      "Literary hierarchy, monumental serif display, open page color.",
    renderers: {
      fallback: FinePressFallback,
      byKind: {},
      byPresentation: {
        "front-table": FinePressLanding,
        "rejection-letter": FinePressRejectionLetter,
        "product-commandments": FinePressProductCommandments,
        "vision-paper-atlas": FinePressVision100,
      },
    },
  },
  modernist: {
    id: "modernist",
    label: "Modernist",
    description:
      "Modular grid, grotesk display, hard rules, explicit information order.",
    renderers: {
      fallback: ModernistPublicationRenderer,
      byKind: {
        "front-table": ModernistPublicationRenderer,
        "narrative-essay": ModernistPublicationRenderer,
        "structured-essay": ModernistPublicationRenderer,
        "reference-work": ModernistPublicationRenderer,
      },
      byPresentation: {
        "front-table": ModernistLanding,
        "rejection-letter": ModernistRejectionEssay,
        "product-commandments": ModernistCommandments,
        "vision-paper-atlas": ModernistVision100,
      },
    },
  },
};

export function resolveWorkRenderer(
  system: PublicationSystemDefinition,
  manifest: WorkManifest,
) {
  return (
    system.renderers.bySlug?.[manifest.slug] ??
    system.renderers.byPresentation[manifest.presentation] ??
    system.renderers.byKind[manifest.kind] ??
    system.renderers.fallback
  );
}

export interface PublicationSystemPrototypeProps {
  initialSystem?: PublicationSystemId;
  initialWork?: WorkId;
  showLabControls?: boolean;
}

const systemOrder: PublicationSystemId[] = ["fine-press", "modernist"];
const workOrder: WorkId[] = [
  "landing",
  "rejection-letter",
  "product-commandments",
  "vision-100",
];

export function PublicationSystemPrototype({
  initialSystem = "fine-press",
  initialWork = "landing",
  showLabControls = true,
}: PublicationSystemPrototypeProps) {
  const [systemId, setSystemId] = useState<PublicationSystemId>(initialSystem);
  const [workId, setWorkId] = useState<WorkId>(initialWork);
  const system = PUBLICATION_SYSTEMS[systemId];
  const manifest = WORK_MANIFESTS[workId];
  const Renderer = useMemo(
    () => resolveWorkRenderer(system, manifest),
    [manifest, system],
  );

  return (
    <div className="publication-system" data-publication-system={systemId}>
      {showLabControls ? (
        <header
          className="publication-system__lab"
          aria-label="Publication system lab"
        >
          <div className="publication-system__lab-heading">
            <span>Renderer comparison</span>
            <strong>{system.label}</strong>
            <p>{system.description}</p>
          </div>

          <div className="publication-system__lab-controls">
            <fieldset>
              <legend>System</legend>
              {systemOrder.map((id) => (
                <button
                  aria-pressed={systemId === id}
                  key={id}
                  type="button"
                  onClick={() => setSystemId(id)}
                >
                  {PUBLICATION_SYSTEMS[id].label}
                </button>
              ))}
            </fieldset>

            <label>
              <span>Work</span>
              <select
                aria-label="Work"
                value={workId}
                onChange={(event) => setWorkId(event.target.value as WorkId)}
              >
                {workOrder.map((id) => (
                  <option key={id} value={id}>
                    {WORK_MANIFESTS[id].title}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </header>
      ) : null}

      <div className="publication-system__render" key={`${systemId}-${workId}`}>
        <Renderer manifest={manifest} />
      </div>
    </div>
  );
}
