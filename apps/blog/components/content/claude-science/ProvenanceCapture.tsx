import * as React from "react";
import { FigureScaffold } from "./FigureScaffold";

/**
 * Figure — "Provenance capture" (Cut II, lineage).
 *
 * Replaces the plaintext `artifact version id -> ... -> exact upstream edge`
 * flow. The single idea: the analysis SDK instruments only two points, the
 * wrapped read and the wrapped write. A source version tag is attached when a
 * wrapped reader loads the source, rides the object through the analysis, and
 * is harvested by the wrapped writer, so the daemon can record one exact edge
 * without parsing the code.
 *
 * Evidence hue is data-5, the same system colour the lineage graph uses. Boxes
 * follow the essay grammar: uniform border, tinted fill, no accent bar.
 */

const EVID = "var(--color-data-1)"; // evidence / lineage
const NEUTRAL = "var(--color-text-muted)";
const tint = (c: string) => `color-mix(in srgb, ${c} 14%, var(--color-bg-primary))`;

export function ProvenanceCapture() {
  return (
    <FigureScaffold
      eyebrow="Provenance · observed"
      title="How one observed edge is captured"
      description="The analysis SDK wraps readers and writers. A source version tag rides the object from a wrapped read to a wrapped write, where it is harvested, so the daemon records one exact upstream edge without parsing the code."
      caption="Figure. When a tag survives read to write, the daemon records one exact edge."
    >
      <div className="min-w-0 overflow-x-auto">
        <svg
          viewBox="0 0 720 148"
          role="img"
          aria-labelledby="prov-cap-title"
          className="block h-auto w-full min-w-[560px] font-sans"
        >
          <title id="prov-cap-title">
            A source artifact&apos;s version tag is attached at a wrapped read,
            rides through the analysis, and is harvested at a wrapped write,
            producing one exact upstream lineage edge.
          </title>
          <defs>
            <marker
              id="prov-cap-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M1 1 L8 5 L1 9" fill="none" stroke={EVID} strokeWidth="1.6" />
            </marker>
          </defs>

          {/* source node */}
          <rect x="8" y="18" width="150" height="48" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth="1.4" />
          <text x="24" y="38" fontSize="12.5" fontWeight="600" fill="var(--color-text-primary)">count-matrix v3</text>
          <text x="24" y="55" fontSize="10.5" fill="var(--color-text-secondary)">source artifact</text>

          {/* analysis node */}
          <rect x="285" y="18" width="150" height="48" rx="8" fill="var(--color-bg-secondary)" stroke="var(--color-border-strong)" strokeWidth="1.4" />
          <text x="301" y="38" fontSize="12.5" fontWeight="600" fill="var(--color-text-primary)">analysis code</text>
          <text x="301" y="55" fontSize="10.5" fill="var(--color-text-secondary)">pandas / NumPy</text>

          {/* output node */}
          <rect x="562" y="18" width="150" height="48" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth="1.4" />
          <text x="578" y="38" fontSize="12.5" fontWeight="600" fill="var(--color-text-primary)">fig.png v1</text>
          <text x="578" y="55" fontSize="10.5" fill="var(--color-text-secondary)">output artifact</text>

          {/* wrapped read */}
          <path d="M160 42 L283 42" fill="none" stroke={EVID} strokeWidth="1.6" markerEnd="url(#prov-cap-arrow)" />
          <text x="221" y="13" fontSize="10.5" fill="var(--color-text-secondary)" textAnchor="middle">wrapped read</text>
          <text x="221" y="60" fontSize="9.5" fontStyle="italic" fill={NEUTRAL} textAnchor="middle">tag on</text>

          {/* wrapped write */}
          <path d="M437 42 L560 42" fill="none" stroke={EVID} strokeWidth="1.6" markerEnd="url(#prov-cap-arrow)" />
          <text x="499" y="13" fontSize="10.5" fill="var(--color-text-secondary)" textAnchor="middle">wrapped write</text>
          <text x="499" y="60" fontSize="9.5" fontStyle="italic" fill={NEUTRAL} textAnchor="middle">tag harvested</text>

          {/* resulting exact edge, curving back underneath */}
          <path d="M637 66 L637 110 Q637 118 629 118 L91 118 Q83 118 83 110 L83 66" fill="none" stroke={EVID} strokeWidth="1.6" markerEnd="url(#prov-cap-arrow)" />
          <rect x="258" y="106" width="204" height="24" rx="4" fill="var(--color-bg-primary)" stroke={EVID} strokeWidth="1.2" />
          <text x="360" y="122" fontSize="10.5" fontWeight="600" fill={EVID} textAnchor="middle">exact upstream edge</text>
        </svg>
      </div>
    </FigureScaffold>
  );
}
