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
    >
      <div className="border-y border-border py-4">
        <HostCallProtocolSvg className="block h-auto w-full" />
      </div>
    </FigureScaffold>
  );
}
