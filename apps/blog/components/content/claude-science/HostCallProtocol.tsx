import * as React from "react";
import { FigureScaffold } from "./FigureScaffold";
import HostCallProtocolSvg from "./svg/host-call-protocol.svg";

export function HostCallProtocol() {
  return (
    <FigureScaffold
      eyebrow="Host-call wire protocol"
      title="A blocking request, one matching reply"
      description="Inside a kernel, host.llm() and its siblings look like ordinary Python. Each one serializes a request over the private kernel protocol and blocks until the daemon returns a response with a matching id."
      caption="Figure 2. The kernel holds no authority of its own; it asks and waits. The daemon answers with the same id and either a data payload or an error. A mismatched reply is discarded, but the wait is bounded: after eight unmatched reads, the SDK raises a protocol-desynchronization error."
      captionZh="图 2。内核自己没有权柄，只负责发问并等待。守护进程用同一个 id 回应，返回数据或错误。SDK 会丢弃 id 对不上的响应，但等待并非无限：连续八次读不到匹配响应后，SDK 会报协议失步错误。"
    >
      <div className="border-y border-border py-4">
        <HostCallProtocolSvg className="block h-auto w-full" />
      </div>
    </FigureScaffold>
  );
}
