"use client";

import { ClaudeScienceShipmentDiagram } from "./ClaudeScienceShipmentDiagram";
import { FigureScaffold } from "./FigureScaffold";

export function ClaudeScienceShipment() {
  return (
    <FigureScaffold
      eyebrow="Install anatomy"
      title="What ships to your machine"
      description="The signed app is only the bootstrap. It unpacks, layer by layer, into a working installation of about 3.9 GB, roughly 95% of it separately provisioned execution environments."
      caption={
        <>
          <strong>
            Figure 1. The signed app is the bootstrap, not the scientific
            runtime.
          </strong>{" "}
          The illustration is interpretive; the on-disk loci, contents, and
          approximate sizes are directly observed in the target installation.
          The layers unpack left to right, and the dashed arrows are the
          reconstructed staging handoff.
        </>
      }
    >
      <ClaudeScienceShipmentDiagram />
    </FigureScaffold>
  );
}
