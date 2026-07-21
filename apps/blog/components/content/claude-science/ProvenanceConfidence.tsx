import * as React from "react";
import { FigureScaffold } from "./FigureScaffold";
import ProvenanceConfidenceSvg from "./svg/provenance-confidence.svg";

export function ProvenanceConfidence() {
  return (
    <FigureScaffold
      eyebrow="Provenance · confidence"
      title="Observed before reconstructed"
      description="Claude Science prefers runtime-observed inputs, falls back to recorded and reconstructed evidence when needed, and marks extraction as pending until it settles. This is the order of evidence, not a confidence field stored on every graph edge."
      caption="Figure 8. Higher means a more direct evidence path; the topology itself stores dependencies, while mapping records and extraction state explain how they were assembled."
    >
      <div className="min-w-0 overflow-x-auto">
        <ProvenanceConfidenceSvg className="block h-auto w-full min-w-[480px]" />
      </div>
    </FigureScaffold>
  );
}
