import * as React from "react";
import { FigureScaffold } from "./FigureScaffold";

/**
 * Figure — "Provenance confidence" (Cut II, lineage).
 *
 * Replaces the plaintext `runtime observation -> ... -> pending` flow and
 * folds in the later numbered "hierarchy of confidence". The single idea is
 * the order in which the system acquires lineage evidence: runtime observation,
 * recorded evidence, post-hoc reconstruction, or still-pending extraction.
 * This is an evidence-order diagram, not a claim that the topology API stores a
 * confidence rank on every edge.
 */

const EVID = "var(--color-data-1)"; // evidence / lineage
const NEUTRAL = "var(--color-text-muted)";
const tint = (c: string) => `color-mix(in srgb, ${c} 14%, var(--color-bg-primary))`;

export function ProvenanceConfidence() {
  return (
    <FigureScaffold
      eyebrow="Provenance · confidence"
      title="Observed before reconstructed"
      description="Claude Science prefers runtime-observed inputs, falls back to recorded and reconstructed evidence when needed, and marks extraction as pending until it settles. This is the order of evidence, not a confidence field stored on every graph edge."
      caption="Figure. Higher means a more direct evidence path; the topology itself stores dependencies, while mapping records and extraction state explain how they were assembled."
    >
      <div className="min-w-0 overflow-x-auto">
        <svg
          viewBox="0 0 720 244"
          role="img"
          aria-labelledby="prov-conf-title"
          className="block h-auto w-full min-w-[480px] font-sans"
        >
          <title id="prov-conf-title">
            A four-tier evidence ladder: runtime observation drawn solid is most
            direct, then recorded evidence, then reconstruction drawn dashed,
            then pending extraction drawn dotted.
          </title>
          <defs>
            <marker
              id="prov-conf-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M1 1 L8 5 L1 9" fill="none" stroke={NEUTRAL} strokeWidth="1.6" />
            </marker>
          </defs>

          {/* directness axis */}
          <path d="M18 20 L18 196" fill="none" stroke={NEUTRAL} strokeWidth="1.4" markerEnd="url(#prov-conf-arrow)" />
          <text x="12" y="108" fontSize="10" fill={NEUTRAL} textAnchor="middle" letterSpacing="0.5" transform="rotate(-90 12 108)">directness</text>

          {/* tier 1 — observed */}
          <rect x="44" y="12" width="668" height="40" rx="8" fill={tint(EVID)} stroke={EVID} strokeWidth="1.5" />
          <text x="60" y="30" fontSize="12.5" fontWeight="600" fill="var(--color-text-primary)">Observed at runtime</text>
          <text x="60" y="45" fontSize="10.5" fill="var(--color-text-secondary)">tags survive read &#8594; write</text>
          <text x="696" y="36" fontSize="10" fontWeight="600" fill={EVID} textAnchor="end">direct</text>

          {/* tier 2 — recorded */}
          <rect x="44" y="60" width="668" height="40" rx="8" fill="none" stroke={EVID} strokeWidth="1.5" />
          <text x="60" y="78" fontSize="12.5" fontWeight="600" fill="var(--color-text-primary)">Recorded</text>
          <text x="60" y="93" fontSize="10.5" fill="var(--color-text-secondary)">reads · writes · executions · host calls</text>

          {/* tier 3 — reconstructed */}
          <rect x="44" y="108" width="668" height="40" rx="8" fill="none" stroke={NEUTRAL} strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="60" y="126" fontSize="12.5" fontWeight="600" fill="var(--color-text-secondary)">Reconstructed · fallback</text>
          <text x="60" y="141" fontSize="10.5" fill={NEUTRAL}>post-hoc dependency mapping, extracted code</text>

          {/* tier 4 — pending */}
          <rect x="44" y="156" width="668" height="40" rx="8" fill="none" stroke={NEUTRAL} strokeWidth="1.4" strokeDasharray="1.5 4" opacity="0.75" />
          <text x="60" y="174" fontSize="12.5" fontWeight="600" fill={NEUTRAL}>Pending</text>
          <text x="60" y="189" fontSize="10.5" fill={NEUTRAL}>convergence unfinished</text>

          {/* legend */}
          <line x1="44" y1="224" x2="80" y2="224" stroke={EVID} strokeWidth="1.6" />
          <text x="88" y="228" fontSize="10.5" fill="var(--color-text-secondary)">observed</text>
          <line x1="190" y1="224" x2="226" y2="224" stroke={NEUTRAL} strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="234" y="228" fontSize="10.5" fill="var(--color-text-secondary)">reconstructed</text>
          <line x1="352" y1="224" x2="388" y2="224" stroke={NEUTRAL} strokeWidth="1.4" strokeDasharray="1.5 4" />
          <text x="396" y="228" fontSize="10.5" fill="var(--color-text-secondary)">pending</text>
        </svg>
      </div>
    </FigureScaffold>
  );
}
