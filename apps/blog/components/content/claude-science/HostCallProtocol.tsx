import * as React from "react";
import { FigureScaffold } from "./FigureScaffold";

const ID_COLOR = "var(--color-action-primary)";

export function HostCallProtocol() {
  return (
    <FigureScaffold
      eyebrow="Host-call wire protocol"
      title="A blocking request, one matching reply"
      description="Inside a kernel, host.llm() and its siblings look like ordinary Python. Each one serializes a request over the private kernel protocol and blocks until the daemon returns a response with a matching id."
      caption="The kernel holds no authority of its own; it asks and waits. The daemon answers with the same id and either a data payload or an error. A reply whose id does not match is discarded, and the call keeps waiting."
    >
      <div className="border-y border-border py-4">
        <svg
          role="img"
          aria-labelledby="hostwire-title hostwire-desc"
          viewBox="0 0 720 282"
          className="h-auto w-full"
        >
          <title id="hostwire-title">
            The kernel-to-daemon host call is a synchronous request and response
          </title>
          <desc id="hostwire-desc">
            A sequence diagram with two lifelines, the kernel and the daemon. The
            kernel sends a host_call message and blocks. The daemon returns a
            host_response with the same id carrying either data or an error.
          </desc>
          <defs>
            <marker
              id="hostwire-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-text-muted)" />
            </marker>
          </defs>

          <g>
            <rect
              x="60"
              y="24"
              width="220"
              height="44"
              rx="4"
              fill="var(--color-bg-secondary)"
              stroke="var(--color-border-muted)"
            />
            <text
              x="170"
              y="44"
              textAnchor="middle"
              fill="var(--color-text-primary)"
              fontSize="14"
              fontWeight="600"
            >
              analysis kernel
            </text>
            <text
              x="170"
              y="60"
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="11"
            >
              Python or R process
            </text>

            <rect
              x="440"
              y="24"
              width="220"
              height="44"
              rx="4"
              fill="var(--color-bg-secondary)"
              stroke="var(--color-border-muted)"
            />
            <text
              x="550"
              y="44"
              textAnchor="middle"
              fill="var(--color-text-primary)"
              fontSize="14"
              fontWeight="600"
            >
              daemon (host)
            </text>
            <text
              x="550"
              y="60"
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="11"
            >
              authority + connectors
            </text>

            <line
              x1="170"
              y1="68"
              x2="170"
              y2="262"
              stroke="var(--color-border-strong)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
            <line
              x1="550"
              y1="68"
              x2="550"
              y2="262"
              stroke="var(--color-border-strong)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />

            <rect
              x="165"
              y="116"
              width="10"
              height="84"
              rx="1"
              fill="var(--color-data-1)"
              opacity="0.16"
            />
            <rect
              x="165"
              y="116"
              width="10"
              height="84"
              rx="1"
              fill="none"
              stroke="var(--color-data-1)"
              strokeWidth="1"
            />
            <text
              x="150"
              y="156"
              textAnchor="end"
              fill="var(--color-text-secondary)"
              fontSize="11"
            >
              blocks
            </text>
            <text
              x="150"
              y="170"
              textAnchor="end"
              fill="var(--color-text-muted)"
              fontSize="11"
            >
              sync wait
            </text>

            <text
              x="360"
              y="104"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill="var(--color-text-primary)"
            >
              <tspan>{'{"type":"host_call",'}</tspan>
              <tspan fill={ID_COLOR}>{'"id":"u1",'}</tspan>
              <tspan>{'"method":"llm","args":[…]}'}</tspan>
            </text>
            <line
              x1="175"
              y1="116"
              x2="550"
              y2="116"
              stroke="var(--color-text-secondary)"
              strokeWidth="1.5"
              markerEnd="url(#hostwire-arrow)"
            />

            <text
              x="360"
              y="188"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill="var(--color-text-primary)"
            >
              <tspan>{'{"type":"host_response",'}</tspan>
              <tspan fill={ID_COLOR}>{'"id":"u1",'}</tspan>
              <tspan>{'"data":…}'}</tspan>
            </text>
            <line
              x1="550"
              y1="200"
              x2="175"
              y2="200"
              stroke="var(--color-data-1)"
              strokeWidth="1.5"
              markerEnd="url(#hostwire-arrow)"
            />

            <text
              x="360"
              y="228"
              textAnchor="middle"
              fontSize="10.5"
              fontFamily="monospace"
              fill="var(--color-text-muted)"
            >
              <tspan>{'or  {"type":"host_response","id":"u1",'}</tspan>
              <tspan fill="var(--color-text-muted)">{'"error":"…"'}</tspan>
              <tspan>{"}"}</tspan>
            </text>

            <text
              x="360"
              y="254"
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="11"
            >
              A reply whose id does not match is discarded; the call keeps
              waiting.
            </text>
          </g>
        </svg>
      </div>
    </FigureScaffold>
  );
}
