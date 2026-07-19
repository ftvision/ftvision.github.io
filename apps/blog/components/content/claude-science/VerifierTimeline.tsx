"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./AB-useReducedMotion";
import { FigureScaffold } from "./FigureScaffold";

type Verdict = "pass" | "warn" | "fail";

type VerificationStage = {
  label: string;
  owner: string;
  detail: string;
};

const STAGES: VerificationStage[] = [
  {
    label: "Accumulate",
    owner: "main operon",
    detail: "Work and durable evidence accumulate between runner boundaries.",
  },
  {
    label: "Predicate",
    owner: "checkpoint",
    detail:
      "A pre-tool predicate combines the interval floor with a content signal.",
  },
  {
    label: "Hold / merge",
    owner: "detached queue",
    detail:
      "A qualifying unit can wait behind a separate hold and merge with nearby work.",
  },
  {
    label: "Trace",
    owner: "reviewer",
    detail: "A detached, read-only reviewer traces the copied evidence window.",
  },
  {
    label: "Continue",
    owner: "main + review",
    detail: "The main operon keeps moving while the detached review settles.",
  },
  {
    label: "Resolve",
    owner: "terminal barrier",
    detail:
      "Delivery waits for the review result, then releases, bounces, or invalidates.",
  },
];

const VERDICT_COPY: Record<
  Verdict,
  { label: string; result: string; detail: string; color: string }
> = {
  pass: {
    label: "Pass",
    result: "deliver artifact",
    detail: "The copied evidence remains registered with the current work.",
    color: "var(--color-status-success)",
  },
  warn: {
    label: "Finding",
    result: "inject and bounce",
    detail:
      "The finding returns to the parent runner and forces another turn under the bounce cap.",
    color: "var(--color-status-warning)",
  },
  fail: {
    label: "Invalidate",
    result: "clear undelivered output",
    detail:
      "A blocking finding prevents the delegated payload from becoming the delivered artifact.",
    color: "var(--color-status-danger)",
  },
};

const CHECKS = ["source", "execution", "output", "provenance"] as const;
const REVIEW_COLOR = "color-mix(in srgb, var(--color-data-1) 34%, #8b5cf6 66%)";

function PhaseControl({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = Math.min(index + 1, STAGES.length - 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = Math.max(index - 1, 0);
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = STAGES.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    onSelect(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="grid gap-3 border-b border-border pb-4 md:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1fr)] md:items-center md:gap-8">
      <div aria-live="polite" className="min-w-0">
        <p className="type-overline m-0 text-figure-muted">
          {STAGES[activeIndex].owner}
        </p>
        <p className="type-label mb-0 mt-1 text-figure-primary">
          {STAGES[activeIndex].label}
        </p>
      </div>

      <ol
        role="tablist"
        aria-label="Verification stages"
        className="relative m-0 grid list-none grid-cols-6 p-0 before:absolute before:left-[8.333%] before:right-[8.333%] before:top-[7px] before:border-t before:border-border-strong"
        style={{ listStyle: "none" }}
      >
        {STAGES.map((stage, index) => {
          const isActive = activeIndex === index;
          const isReached = index <= activeIndex;

          return (
            <li
              key={stage.label}
              className="relative z-[1] min-w-0 text-center"
              style={{ listStyle: "none" }}
            >
              <button
                ref={(element) => {
                  refs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${index + 1}. ${stage.label}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelect(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  "mx-auto block size-[15px] rounded-full border bg-ground-primary transition-[background-color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 motion-reduce:transition-none",
                  isReached ? "border-action-primary" : "border-border-strong",
                  isReached && !isActive && "bg-action-primary/30",
                  isActive &&
                    "scale-125 border-action-primary bg-action-primary",
                )}
              />
              <span
                className={cn(
                  "type-caption mt-2 hidden whitespace-nowrap text-figure-muted lg:block",
                  isActive && "text-figure-primary",
                )}
              >
                {stage.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function VerdictControl({
  verdict,
  onChange,
}: {
  verdict: Verdict;
  onChange: (verdict: Verdict) => void;
}) {
  return (
    <div role="group" aria-label="Terminal result" className="flex min-w-0">
      {(Object.keys(VERDICT_COPY) as Verdict[]).map(
        (option, index, options) => {
          const isActive = verdict === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option)}
              className={cn(
                "type-caption min-h-9 flex-1 border border-border px-3 py-1.5 text-figure-secondary transition-colors duration-150 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary motion-reduce:transition-none sm:flex-none",
                index > 0 && "-ml-px",
                index === 0 && "rounded-l-[4px]",
                index === options.length - 1 && "rounded-r-[4px]",
                isActive &&
                  "z-[1] border-border-strong bg-ground-tertiary text-figure-primary",
              )}
              style={
                isActive
                  ? {
                      boxShadow: `inset 0 -2px 0 ${VERDICT_COPY[option].color}`,
                    }
                  : undefined
              }
            >
              {VERDICT_COPY[option].label}
            </button>
          );
        },
      )}
    </div>
  );
}

function MainEvidence({ x, variant = 0 }: { x: number; variant?: number }) {
  if (variant % 3 === 0) {
    return (
      <g transform={`translate(${x} 0)`}>
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(0 ${126 + row * 27})`}>
            <line
              x1="0"
              y1="0"
              x2={34 + row * 5}
              y2="0"
              stroke="var(--color-data-1)"
              strokeWidth="1.6"
            />
            <line
              x1={44 + row * 5}
              y1="0"
              x2={68 + row * 4}
              y2="0"
              stroke="var(--color-data-1)"
              strokeWidth="1.6"
              opacity="0.45"
            />
          </g>
        ))}
      </g>
    );
  }

  if (variant % 3 === 1) {
    return (
      <g transform={`translate(${x} 0)`}>
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(0 ${126 + row * 27})`}>
            {[0, 1, 2, 3, 4].map((column) => (
              <circle
                key={column}
                cx={column * 16}
                cy={(column % 2) * 3}
                r={column === row ? 3 : 1.75}
                fill="var(--color-data-1)"
                opacity={column === row ? 0.9 : 0.48}
              />
            ))}
          </g>
        ))}
      </g>
    );
  }

  return (
    <g transform={`translate(${x} 0)`}>
      {[0, 1, 2, 3].map((row) => (
        <path
          key={row}
          d={`M 0 ${136 + row * 27} C 18 ${116 + row * 28}, 40 ${151 + row * 22}, 68 ${125 + row * 28}`}
          fill="none"
          stroke="var(--color-data-1)"
          strokeWidth="1.4"
          opacity={0.42 + row * 0.12}
        />
      ))}
    </g>
  );
}

function ReviewPlate({
  x,
  label,
  reached,
  mismatch,
  findingColor,
}: {
  x: number;
  label: string;
  reached: boolean;
  mismatch: boolean;
  findingColor: string;
}) {
  return (
    <g
      opacity={reached ? 1 : 0.18}
      className="transition-opacity duration-300 motion-reduce:transition-none"
    >
      <text
        x={x + 13}
        y="337"
        textAnchor="middle"
        fill={REVIEW_COLOR}
        fontSize="11"
        fontWeight="500"
        letterSpacing="0"
      >
        {label}
      </text>
      <path
        d={`M ${x} 365 L ${x + 26} 347 L ${x + 26} 526 L ${x} 544 Z`}
        fill={REVIEW_COLOR}
        fillOpacity="0.055"
        stroke={REVIEW_COLOR}
        strokeOpacity="0.58"
        strokeWidth="0.9"
        vectorEffect="non-scaling-stroke"
      />
      {[0, 1, 2, 3].map((row) => {
        const rowY = 390 + row * 42;
        const isMismatch = mismatch && row === 2;

        return (
          <g key={row}>
            <circle
              cx={x + 13}
              cy={rowY}
              r={isMismatch ? 5 : 3.2}
              fill={isMismatch ? findingColor : "var(--color-bg-primary)"}
              stroke={isMismatch ? findingColor : REVIEW_COLOR}
              strokeWidth={isMismatch ? 1.6 : 1.2}
              vectorEffect="non-scaling-stroke"
            />
            {isMismatch ? (
              <circle
                cx={x + 13}
                cy={rowY}
                r="11"
                fill="none"
                stroke={findingColor}
                strokeWidth="0.8"
                opacity="0.5"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

function ArtifactGlyph({
  x,
  y,
  blocked,
  color,
}: {
  x: number;
  y: number;
  blocked: boolean;
  color: string;
}) {
  return (
    <g opacity={blocked ? 0.28 : 1}>
      <circle
        cx={x}
        cy={y}
        r="23"
        fill="var(--color-data-1)"
        fillOpacity="0.08"
        stroke={blocked ? color : "var(--color-data-1)"}
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={x} cy={y} r="14" fill="var(--color-data-1)" opacity="0.92" />
      <path
        d={`M ${x - 6} ${y - 4} H ${x + 6} M ${x - 6} ${y + 1} H ${x + 3} M ${x - 6} ${y + 6} H ${x + 7}`}
        stroke="var(--color-bg-primary)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {blocked ? (
        <path
          d={`M ${x - 18} ${y - 18} L ${x + 18} ${y + 18}`}
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </g>
  );
}

function DesktopVerifierProof({
  activeIndex,
  verdict,
  reducedMotion,
  titleId,
  descriptionId,
}: {
  activeIndex: number;
  verdict: Verdict;
  reducedMotion: boolean;
  titleId: string;
  descriptionId: string;
}) {
  const verdictCopy = VERDICT_COPY[verdict];
  const hasFinding = verdict !== "pass";
  const checkpointReached = activeIndex >= 1;
  const queueReached = activeIndex >= 2;
  const reviewReached = activeIndex >= 3;
  const continuationReached = activeIndex >= 4;
  const terminalReached = activeIndex >= 5;
  const terminalColor = hasFinding
    ? verdictCopy.color
    : "var(--color-text-secondary)";

  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      viewBox="0 0 1180 590"
      className="hidden h-auto w-full md:block"
    >
      <title id={titleId}>Detached verification as a copied proof stream</title>
      <desc id={descriptionId}>
        Scientific work continues along a broad main stream. A content-sensitive
        checkpoint copies evidence into a detached review lane. The reviewer
        traces source, execution, output, and provenance. Passing evidence
        rejoins at the terminal barrier; a finding loops back to the main operon
        and blocks delivery.
      </desc>

      <g aria-hidden="true">
        <line
          x1="42"
          y1="72.5"
          x2="1042"
          y2="72.5"
          stroke="var(--color-border-strong)"
          strokeWidth="0.75"
          shapeRendering="crispEdges"
        />
        {[315, 690].map((x) => (
          <g key={x}>
            <line
              x1={x}
              y1="65"
              x2={x}
              y2="80"
              stroke="var(--color-border-strong)"
              strokeWidth="0.75"
              shapeRendering="crispEdges"
            />
            <text
              x={x}
              y="55"
              textAnchor="middle"
              fill="var(--color-text-secondary)"
              fontSize="11"
              fontVariant="tabular-nums"
              letterSpacing="0"
            >
              120 s
            </text>
          </g>
        ))}

        <rect
          x="42"
          y="104"
          width="1000"
          height="145"
          fill="var(--color-data-1)"
          opacity="0.11"
        />
        {[125, 152, 179, 206, 233].map((y) => (
          <line
            key={y}
            x1="42"
            y1={y + 0.5}
            x2="1042"
            y2={y + 0.5}
            stroke="var(--color-data-1)"
            strokeOpacity="0.24"
            strokeWidth="0.75"
            shapeRendering="crispEdges"
          />
        ))}

        <MainEvidence x={58} variant={0} />
        <MainEvidence x={172} variant={1} />
        <MainEvidence x={386} variant={2} />
        <MainEvidence x={500} variant={0} />
        <MainEvidence x={620} variant={1} />
        <MainEvidence x={748} variant={2} />
        <MainEvidence x={862} variant={0} />

        <text
          x="56"
          y="273"
          fill="var(--color-text-muted)"
          fontSize="10.5"
          letterSpacing="0"
        >
          main operon
        </text>
        <text
          x="818"
          y="273"
          fill="var(--color-text-secondary)"
          fontSize="10.5"
          letterSpacing="0"
          opacity={continuationReached ? 1 : 0.28}
        >
          work continues
        </text>

        <g
          opacity={checkpointReached ? 1 : 0.18}
          className="transition-opacity duration-300 motion-reduce:transition-none"
        >
          <line
            x1="315.5"
            y1="88"
            x2="315.5"
            y2="286"
            stroke="var(--color-status-success)"
            strokeWidth="1"
            shapeRendering="crispEdges"
          />
          <path
            d="M 315 104 L 347 84 V 268 L 315 249 Z"
            fill="var(--color-status-success)"
            fillOpacity="0.1"
            stroke="var(--color-status-success)"
            strokeOpacity="0.65"
            strokeWidth="0.9"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="315"
            cy="226"
            r="5"
            fill="var(--color-bg-primary)"
            stroke="var(--color-status-success)"
            strokeWidth="1.7"
          />
          {!reducedMotion ? (
            <circle
              cx="315"
              cy="226"
              r="5"
              fill="none"
              stroke="var(--color-status-success)"
              strokeWidth="1"
            >
              <animate
                attributeName="r"
                values="5;21;5"
                dur="2.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.75;0;0"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </circle>
          ) : null}
          <text
            x="315"
            y="303"
            textAnchor="middle"
            fill="var(--color-status-success)"
            fontSize="11"
            fontWeight="500"
            letterSpacing="0"
          >
            checkpoint
          </text>
          <text
            x="315"
            y="319"
            textAnchor="middle"
            fill="var(--color-text-muted)"
            fontSize="9.5"
            letterSpacing="0"
          >
            interval floor + content signal
          </text>
        </g>

        <g
          opacity={queueReached ? 1 : 0.12}
          className="transition-opacity duration-300 motion-reduce:transition-none"
        >
          <path
            d="M 347 218 C 397 222 409 315 478 358 L 478 526 C 407 492 392 286 347 249 Z"
            fill={REVIEW_COLOR}
            fillOpacity="0.14"
          />
          {[0, 1, 2, 3].map((row) => (
            <path
              key={row}
              d={`M 347 ${220 + row * 9} C 401 ${225 + row * 9}, 418 ${356 + row * 42}, 500 ${390 + row * 42}`}
              fill="none"
              stroke={REVIEW_COLOR}
              strokeWidth="1"
              strokeOpacity="0.46"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <text
            x="414"
            y="338"
            fill={REVIEW_COLOR}
            fontSize="10.5"
            letterSpacing="0"
          >
            copied window
          </text>
          <text
            x="414"
            y="353"
            fill="var(--color-text-muted)"
            fontSize="9.5"
            letterSpacing="0"
          >
            hold + merge
          </text>
        </g>

        <g
          opacity={reviewReached ? 1 : 0.12}
          className="transition-opacity duration-300 motion-reduce:transition-none"
        >
          <rect
            x="476.5"
            y="349.5"
            width="548"
            height="200"
            fill="none"
            stroke={REVIEW_COLOR}
            strokeOpacity="0.18"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            shapeRendering="crispEdges"
          />
          <text
            x="488"
            y="573"
            fill={REVIEW_COLOR}
            fontSize="11"
            fontWeight="500"
            letterSpacing="0"
          >
            detached review
          </text>
          <text
            x="1014"
            y="573"
            textAnchor="end"
            fill="var(--color-text-muted)"
            fontSize="9.5"
            letterSpacing="0"
          >
            read-only trace
          </text>

          {[0, 1, 2, 3].map((row) => {
            const rowY = 390 + row * 42;
            const rowMismatch = hasFinding && row === 2;

            return (
              <g key={row}>
                <line
                  x1="478"
                  y1={rowY}
                  x2="1015"
                  y2={rowY}
                  stroke={rowMismatch ? verdictCopy.color : REVIEW_COLOR}
                  strokeWidth={rowMismatch ? 1.5 : 0.9}
                  strokeOpacity={rowMismatch ? 0.9 : 0.42}
                  strokeDasharray={rowMismatch ? "4 3" : undefined}
                  vectorEffect="non-scaling-stroke"
                />
                {[515, 615, 715, 815, 915].map((x, index) => (
                  <React.Fragment key={x}>
                    {row === 0 ? (
                      <line
                        x1={x - 7}
                        y1={rowY}
                        x2={x + 7 + index * 2}
                        y2={rowY}
                        stroke={REVIEW_COLOR}
                        strokeWidth="1.5"
                        opacity="0.65"
                      />
                    ) : row === 1 ? (
                      <circle
                        cx={x}
                        cy={rowY}
                        r={index % 2 === 0 ? 2.6 : 1.6}
                        fill={REVIEW_COLOR}
                        opacity="0.65"
                      />
                    ) : row === 2 ? (
                      <circle
                        cx={x}
                        cy={rowY + Math.sin(index * 1.7) * 7}
                        r="2.2"
                        fill={
                          rowMismatch && index === 3
                            ? verdictCopy.color
                            : REVIEW_COLOR
                        }
                        opacity="0.72"
                      />
                    ) : (
                      <path
                        d={`M ${x - 7} ${rowY + 5} L ${x} ${rowY - 5} L ${x + 7} ${rowY + 3}`}
                        fill="none"
                        stroke={REVIEW_COLOR}
                        strokeWidth="0.9"
                        opacity="0.56"
                      />
                    )}
                  </React.Fragment>
                ))}
              </g>
            );
          })}

          {CHECKS.map((label, index) => (
            <ReviewPlate
              key={label}
              x={540 + index * 122}
              label={label}
              reached={reviewReached}
              mismatch={hasFinding && index === 2}
              findingColor={verdictCopy.color}
            />
          ))}

          {[0, 1, 2, 3].map((row) => {
            const rowY = 390 + row * 42;
            return (
              <path
                key={row}
                d={`M 932 ${rowY} C 980 ${rowY}, 987 ${230 - row * 9}, 1031 ${230 - row * 9}`}
                fill="none"
                stroke={
                  hasFinding && row === 2 ? verdictCopy.color : REVIEW_COLOR
                }
                strokeWidth={hasFinding && row === 2 ? 1.6 : 1}
                strokeOpacity={hasFinding && row === 2 ? 0.9 : 0.58}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {!reducedMotion ? (
            <rect
              x="482"
              y="355"
              width="18"
              height="188"
              fill={REVIEW_COLOR}
              opacity="0.055"
            >
              <animate
                attributeName="x"
                values="482;997;482"
                dur="6s"
                repeatCount="indefinite"
              />
            </rect>
          ) : null}
        </g>

        <g
          opacity={terminalReached ? 1 : 0.18}
          className="transition-opacity duration-300 motion-reduce:transition-none"
        >
          <line
            x1="1042.5"
            y1="91"
            x2="1042.5"
            y2="283"
            stroke={terminalColor}
            strokeWidth="1.5"
            shapeRendering="crispEdges"
          />
          <line
            x1="1048.5"
            y1="91"
            x2="1048.5"
            y2="283"
            stroke={terminalColor}
            strokeWidth="0.75"
            shapeRendering="crispEdges"
          />
          <text
            x="1045"
            y="305"
            textAnchor="middle"
            fill={terminalColor}
            fontSize="10.5"
            fontWeight="500"
            letterSpacing="0"
          >
            terminal barrier
          </text>

          <line
            x1="1049"
            y1="178"
            x2="1112"
            y2="178"
            stroke={hasFinding ? verdictCopy.color : "var(--color-data-1)"}
            strokeWidth={hasFinding ? 1 : 1.7}
            strokeDasharray={hasFinding ? "3 4" : undefined}
            opacity={hasFinding ? 0.34 : 0.9}
            vectorEffect="non-scaling-stroke"
          />
          <ArtifactGlyph
            x={1141}
            y={178}
            blocked={hasFinding}
            color={verdictCopy.color}
          />
          <text
            x="1141"
            y="218"
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize="10.5"
            letterSpacing="0"
          >
            artifact
          </text>
        </g>

        {hasFinding ? (
          <g
            opacity={reviewReached ? 1 : 0.12}
            className="transition-opacity duration-300 motion-reduce:transition-none"
          >
            <path
              d="M 930 474 C 1004 508 1015 557 937 568 C 752 594 533 578 397 550 C 320 534 277 486 291 414 C 302 357 315 322 315 278"
              fill="none"
              stroke={verdictCopy.color}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="5 5"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="930" cy="474" r="5" fill={verdictCopy.color} />
            <text
              x="759"
              y="574"
              textAnchor="middle"
              fill={verdictCopy.color}
              fontSize="11"
              fontWeight="500"
              letterSpacing="0"
            >
              finding returns to the parent runner
            </text>
            {!reducedMotion ? (
              <circle r="4" fill={verdictCopy.color}>
                <animateMotion
                  dur="5.2s"
                  repeatCount="indefinite"
                  path="M 930 474 C 1004 508 1015 557 937 568 C 752 594 533 578 397 550 C 320 534 277 486 291 414 C 302 357 315 322 315 278"
                />
              </circle>
            ) : null}
          </g>
        ) : null}

        {!reducedMotion && continuationReached ? (
          <circle r="3.5" fill="var(--color-data-1)" opacity="0.9">
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              path="M 44 233 H 1033"
            />
          </circle>
        ) : null}
      </g>
    </svg>
  );
}

function MobileVerifierProof({
  activeIndex,
  verdict,
  reducedMotion,
}: {
  activeIndex: number;
  verdict: Verdict;
  reducedMotion: boolean;
}) {
  const verdictCopy = VERDICT_COPY[verdict];
  const hasFinding = verdict !== "pass";
  const reviewReached = activeIndex >= 3;
  const terminalReached = activeIndex >= 5;

  return (
    <svg
      role="img"
      aria-label="Mobile layout of the detached verification proof stream"
      viewBox="0 0 390 720"
      className="h-auto w-full md:hidden"
    >
      <g aria-hidden="true">
        <rect
          x="30"
          y="58"
          width="132"
          height="560"
          fill="var(--color-data-1)"
          opacity="0.11"
        />
        {[58, 84, 110, 136].map((x) => (
          <line
            key={x}
            x1={x}
            y1="58"
            x2={x}
            y2="618"
            stroke="var(--color-data-1)"
            strokeOpacity="0.24"
            strokeWidth="0.75"
          />
        ))}
        {[88, 112, 136].map((x, index) => (
          <g key={x}>
            {[90, 116, 142, 268, 294, 320, 346, 520, 546, 572].map(
              (y, markIndex) => (
                <circle
                  key={y}
                  cx={x + ((markIndex + index) % 2) * 4}
                  cy={y}
                  r={(markIndex + index) % 3 === 0 ? 2.8 : 1.5}
                  fill="var(--color-data-1)"
                  opacity="0.56"
                />
              ),
            )}
          </g>
        ))}
        <text
          x="41"
          y="42"
          fill="var(--color-text-secondary)"
          fontSize="10.5"
          letterSpacing="0"
        >
          main operon
        </text>

        <g opacity={activeIndex >= 1 ? 1 : 0.18}>
          <line
            x1="19"
            y1="181.5"
            x2="178"
            y2="181.5"
            stroke="var(--color-status-success)"
            strokeWidth="1"
            shapeRendering="crispEdges"
          />
          <path
            d="M 30 181 L 49 162 H 162 L 181 181 L 162 200 H 49 Z"
            fill="var(--color-status-success)"
            fillOpacity="0.09"
            stroke="var(--color-status-success)"
            strokeOpacity="0.58"
            strokeWidth="0.9"
          />
          <circle
            cx="145"
            cy="181"
            r="4"
            fill="var(--color-bg-primary)"
            stroke="var(--color-status-success)"
            strokeWidth="1.5"
          />
          <text
            x="35"
            y="170"
            fill="var(--color-status-success)"
            fontSize="10.5"
            fontWeight="500"
            letterSpacing="0"
          >
            checkpoint
          </text>
          <text
            x="35"
            y="216"
            fill="var(--color-text-muted)"
            fontSize="9.5"
            letterSpacing="0"
          >
            120 s floor + content signal
          </text>
        </g>

        <g opacity={activeIndex >= 2 ? 1 : 0.12}>
          <path
            d="M 162 181 C 205 186 196 245 229 258 L 229 535 C 193 511 204 230 162 202 Z"
            fill={REVIEW_COLOR}
            fillOpacity="0.14"
          />
          {[0, 1, 2, 3].map((row) => (
            <path
              key={row}
              d={`M 162 ${184 + row * 5} C 202 ${190 + row * 5}, 194 ${275 + row * 59}, 236 ${278 + row * 59}`}
              fill="none"
              stroke={REVIEW_COLOR}
              strokeWidth="0.9"
              strokeOpacity="0.48"
            />
          ))}
        </g>

        <g opacity={reviewReached ? 1 : 0.12}>
          <rect
            x="220.5"
            y="244.5"
            width="151"
            height="310"
            fill="none"
            stroke={REVIEW_COLOR}
            strokeOpacity="0.2"
            strokeWidth="0.75"
            strokeDasharray="3 5"
          />
          <text
            x="230"
            y="235"
            fill={REVIEW_COLOR}
            fontSize="10.5"
            fontWeight="500"
            letterSpacing="0"
          >
            detached review
          </text>
          {CHECKS.map((label, index) => {
            const y = 278 + index * 59;
            const mismatch = hasFinding && index === 2;

            return (
              <g key={label}>
                <text
                  x="235"
                  y={y - 13}
                  fill={REVIEW_COLOR}
                  fontSize="9.5"
                  letterSpacing="0"
                >
                  {label}
                </text>
                <line
                  x1="235"
                  y1={y}
                  x2="355"
                  y2={y}
                  stroke={mismatch ? verdictCopy.color : REVIEW_COLOR}
                  strokeWidth={mismatch ? 1.5 : 0.9}
                  strokeDasharray={mismatch ? "4 3" : undefined}
                  opacity={mismatch ? 0.95 : 0.5}
                />
                {[250, 280, 310, 340].map((x, markIndex) => (
                  <circle
                    key={x}
                    cx={x}
                    cy={y + (index === 2 ? Math.sin(markIndex * 1.7) * 5 : 0)}
                    r={mismatch && markIndex === 2 ? 4.5 : 2.2}
                    fill={
                      mismatch && markIndex === 2
                        ? verdictCopy.color
                        : REVIEW_COLOR
                    }
                    opacity="0.75"
                  />
                ))}
              </g>
            );
          })}
          {!reducedMotion ? (
            <line
              x1="228"
              y1="250"
              x2="228"
              y2="548"
              stroke={REVIEW_COLOR}
              strokeWidth="8"
              opacity="0.045"
            >
              <animate
                attributeName="x1"
                values="228;360;228"
                dur="5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="228;360;228"
                dur="5s"
                repeatCount="indefinite"
              />
            </line>
          ) : null}
        </g>

        <g opacity={terminalReached ? 1 : 0.18}>
          <line
            x1="30"
            y1="617.5"
            x2="162"
            y2="617.5"
            stroke={
              hasFinding ? verdictCopy.color : "var(--color-text-secondary)"
            }
            strokeWidth="1.5"
          />
          <line
            x1="30"
            y1="623.5"
            x2="162"
            y2="623.5"
            stroke={
              hasFinding ? verdictCopy.color : "var(--color-text-secondary)"
            }
            strokeWidth="0.75"
          />
          <text
            x="30"
            y="644"
            fill={
              hasFinding ? verdictCopy.color : "var(--color-text-secondary)"
            }
            fontSize="10.5"
            fontWeight="500"
            letterSpacing="0"
          >
            terminal barrier
          </text>
          <line
            x1="162"
            y1="620"
            x2="229"
            y2="658"
            stroke={hasFinding ? verdictCopy.color : "var(--color-data-1)"}
            strokeWidth="1.2"
            strokeDasharray={hasFinding ? "3 4" : undefined}
            opacity={hasFinding ? 0.35 : 0.9}
          />
          <ArtifactGlyph
            x={255}
            y={673}
            blocked={hasFinding}
            color={verdictCopy.color}
          />
          <text
            x="294"
            y="678"
            fill="var(--color-text-secondary)"
            fontSize="10.5"
            letterSpacing="0"
          >
            artifact
          </text>
        </g>

        {hasFinding ? (
          <g opacity={reviewReached ? 1 : 0.12}>
            <path
              d="M 310 396 C 365 435 350 565 286 579 C 211 596 176 556 177 485 C 178 361 183 232 145 198"
              fill="none"
              stroke={verdictCopy.color}
              strokeWidth="1.6"
              strokeDasharray="5 5"
            />
            <text
              x="256"
              y="582"
              fill={verdictCopy.color}
              fontSize="10.5"
              fontWeight="500"
              letterSpacing="0"
            >
              finding returns
            </text>
          </g>
        ) : null}
      </g>
    </svg>
  );
}

function DefaultsPanel() {
  const groups = [
    {
      label: "Predicate",
      value:
        "min_checkpoint_interval_ms 120000; min_artifact_delta 3; structural_block_trigger true; min_authored_input_chars 2000; min_prose_chars 0",
    },
    {
      label: "Dispatch",
      value: "n_per_checkpoint 1; mid_dispatch_hold_ms 120000",
    },
    {
      label: "Reviewer",
      value:
        "enabled true; reviewer_model claude-sonnet-5; shadow_reviewer true",
    },
    {
      label: "Terminal",
      value: "terminal_sniff_enabled true; max_consecutive_bounces 3",
    },
    {
      label: "Bookmarker",
      value: "bookmarks_enabled false",
    },
  ];

  return (
    <dl className="mt-4 grid gap-x-5 gap-y-3 border-y border-border py-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.label} className="min-w-0">
          <dt className="type-overline text-figure-muted">{group.label}</dt>
          <dd className="type-caption mb-0 ml-0 mt-1 break-words font-code text-figure-primary">
            {group.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function VerifierTimeline() {
  const [activeIndex, setActiveIndex] = React.useState(STAGES.length - 1);
  const [verdict, setVerdict] = React.useState<Verdict>("pass");
  const [showDefaults, setShowDefaults] = React.useState(false);
  const reducedMotion = useReducedMotion();
  const svgId = React.useId().replace(/:/g, "");
  const active = STAGES[activeIndex];
  const verdictCopy = VERDICT_COPY[verdict];

  return (
    <FigureScaffold
      eyebrow="Detached verification"
      title="The reviewer leaves the loop, then returns with authority"
      description="A qualifying checkpoint copies evidence into a read-only proof stream. The main operon keeps moving; the terminal barrier makes the detached result binding."
      caption="Figure D. The first 120-second default is a checkpoint interval floor; the second is a separate mid-dispatch hold. The reviewer is event-triggered, not a permanently running agent."
    >
      <PhaseControl activeIndex={activeIndex} onSelect={setActiveIndex} />

      <div className="flex flex-col gap-3 border-b border-border py-3 sm:flex-row sm:items-center sm:justify-between">
        <VerdictControl verdict={verdict} onChange={setVerdict} />

        <label className="type-caption flex min-h-9 cursor-pointer items-center gap-2 text-figure-primary">
          <input
            type="checkbox"
            checked={showDefaults}
            onChange={(event) => setShowDefaults(event.target.checked)}
            className="size-4 accent-[var(--color-action-primary)]"
          />
          Show exact defaults
        </label>
      </div>

      <div className="py-4 sm:py-5">
        <DesktopVerifierProof
          activeIndex={activeIndex}
          verdict={verdict}
          reducedMotion={reducedMotion}
          titleId={`${svgId}-title`}
          descriptionId={`${svgId}-description`}
        />
        <MobileVerifierProof
          activeIndex={activeIndex}
          verdict={verdict}
          reducedMotion={reducedMotion}
        />
      </div>

      <div className="grid gap-2 border-t border-border pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
        <p className="type-body-sm m-0 text-figure-secondary">
          <span className="font-medium text-figure-primary">
            {active.label}.
          </span>{" "}
          {active.detail}
        </p>
        <p
          className="type-caption m-0 font-medium"
          style={{ color: verdictCopy.color }}
        >
          {verdictCopy.result}
        </p>
      </div>

      {showDefaults ? <DefaultsPanel /> : null}
    </FigureScaffold>
  );
}
