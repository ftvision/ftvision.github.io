import * as React from "react";
import { FigureScaffold } from "./FigureScaffold";
import ProvenanceCaptureSvg from "./svg/provenance-capture.svg";

export function ProvenanceCapture() {
  return (
    <FigureScaffold
      eyebrow="Provenance · observed"
      title="How one observed edge is captured"
      description="The analysis SDK wraps readers and writers. A source version tag rides the object from a wrapped read to a wrapped write, where it is harvested, so the daemon records one exact upstream edge without parsing the code."
      caption="Figure 7. When a tag survives read to write, the daemon records one exact edge."
    >
      <div className="min-w-0 overflow-x-auto">
        <ProvenanceCaptureSvg className="block h-auto w-full min-w-[560px]" />
      </div>
    </FigureScaffold>
  );
}
