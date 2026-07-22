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
      captionZh={
        <>
          <strong>图 1。签名应用只是引导程序，不是科研运行时。</strong>{" "}
          这张图示意了拆包过程。磁盘位置、内容和大致体积，直接取自目标机器的实际安装。各层从左到右展开，虚线箭头表示根据证据重建的部署交接。
        </>
      }
    >
      <ClaudeScienceShipmentDiagram />
    </FigureScaffold>
  );
}
