"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FigureScaffold } from "./FigureScaffold";

/**
 * Figure D2 — "Verification agents".
 *
 * Cut II ships two hidden verification profiles, REVIEWER and BOOKMARKER,
 * spawned by the verifier over a transcript window. This figure shows, per
 * agent, (a) the deliberately constrained PROFILE — capability flags switched
 * off plus the excluded_tools list — and (b) a SHORTENED system prompt with
 * load-bearing lines kept verbatim and ellipses marking the cuts.
 *
 * Every value here is transcribed from the shipped 0.1.15 agent metadata:
 *   - runtime/agents/reviewer/metadata.yaml
 *   - runtime/agents/bookmarker/metadata.yaml
 * The capability flags and excluded_tools lists are verbatim; only the prompt
 * text is abbreviated (see the caption).
 */

type AgentId = "reviewer" | "bookmarker";

interface DeniedFlag {
  code: string;
  gloss: string;
}

interface Agent {
  id: AgentId;
  tab: string;
  role: string;
  accent: string;
  excluded: string[];
  keeps: string[];
  prompt: string;
}

const REVIEWER_ACCENT = "var(--color-data-1)";
const BOOKMARKER_ACCENT = "var(--color-data-5)";

// Both profiles switch off the same five capabilities (verbatim flag values).
const DENIED: DeniedFlag[] = [
  { code: "enable_plan_mode: false", gloss: "no planning stage" },
  { code: "enable_subtask_delegation: false", gloss: "cannot spawn sub-agents" },
  { code: "enable_web_search: false", gloss: "no outside lookups" },
  { code: "enable_thinking: false", gloss: "measured ~0 quality delta on trace work" },
  { code: "skills_locked: true", gloss: "skill catalog locked, no search_skills" },
];

const REVIEWER: Agent = {
  id: "reviewer",
  tab: "REVIEWER",
  role: "Reads another agent's transcript and reports fabrication, hallucination, or plan deviation. Never a root agent.",
  accent: REVIEWER_ACCENT,
  excluded: [
    "python",
    "bash",
    "r",
    "save_artifacts",
    "edit_file",
    "manage_environments",
    "manage_packages",
    "fetch_article_fulltext",
    "list_compute",
  ],
  keeps: ["repl", "read_file", "submit_output"],
  prompt: `You are the REVIEWER — a transcript reviewer.

You receive pointers into another agent's conversation … read that transcript and report where it fabricated, hallucinated, or deviated.

Trace, don't recompute. If the agent claims a number, find the cell that printed it and compare — a CONTRADICTION is the finding. A value you simply cannot trace inside this window is NOT a finding …

Weight by WHERE the claim lives. Artifact contents (saved files, figures, tables, reports) are the session's durable output … Hold these to the strict bar. Assistant prose is chat narration the user skims in the moment — flag only if a reader ACTING on it would be materially misled.

Call submit_output ONCE with your findings and stop — do not write any assistant prose before or after it.`,
};

const BOOKMARKER: Agent = {
  id: "bookmarker",
  tab: "BOOKMARKER",
  role: "Reads the same window and returns 0 to 2 verbatim spans worth bookmarking. Never a root agent.",
  accent: BOOKMARKER_ACCENT,
  excluded: [
    "python",
    "bash",
    "r",
    "repl",
    "read_file",
    "save_artifacts",
    "edit_file",
    "manage_environments",
    "manage_packages",
    "fetch_article_fulltext",
    "list_compute",
  ],
  keeps: ["submit_output"],
  prompt: `You are the BOOKMARKER — you leave breadcrumbs in another agent's transcript so a returning user can jump straight to what matters.

You receive a window of an agent's work … Decide what — if anything — a user reopening this session tomorrow would want to click straight back to, and return 0-2 VERBATIM quotes via submit_output.

THE ONE QUESTION
Imagine the user scanning this session later: "where's the result? what did it produce? what was decided?" Bookmark the exact sentence(s) they'd want to land on. Nothing else.

HOW MANY
Most windows deserve 0 or 1. … If nothing landed in this window — it's routine churn, setup, or work still in flight — return an empty list; that is the normal outcome.

Call submit_output ONCE with your bookmarks (or an empty list) and stop — no assistant prose before or after it.`,
};

const AGENTS: Agent[] = [REVIEWER, BOOKMARKER];

function AgentTabs({
  active,
  baseId,
  onSelect,
}: {
  active: AgentId;
  baseId: string;
  onSelect: (id: AgentId) => void;
}) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % AGENTS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + AGENTS.length) % AGENTS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = AGENTS.length - 1;
    }
    if (next === null) return;
    event.preventDefault();
    onSelect(AGENTS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Verifier subagent"
      className="inline-flex flex-wrap gap-1 rounded-[6px] border border-border bg-ground-secondary p-1"
    >
      {AGENTS.map((agent, index) => {
        const isActive = agent.id === active;
        return (
          <button
            key={agent.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${agent.id}`}
            aria-selected={isActive}
            aria-controls={`${baseId}-panel-${agent.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(agent.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "inline-flex items-center gap-2 rounded-[4px] px-3 py-1.5 font-sans text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-1 motion-reduce:transition-none",
              isActive
                ? "bg-ground-primary text-figure-primary shadow-sm"
                : "text-figure-secondary hover:text-figure-primary",
            )}
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: agent.accent }}
            />
            {agent.tab}
          </button>
        );
      })}
    </div>
  );
}

function ToolChip({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <code
      className={cn(
        "inline-block break-all rounded-[3px] border px-1.5 py-0.5 font-code text-[0.72rem] leading-4",
        accent
          ? "border-l-2 bg-ground-secondary text-figure-primary"
          : "border-border bg-ground-secondary text-figure-secondary",
      )}
      style={accent ? { borderColor: "var(--color-border-default)", borderLeftColor: accent } : undefined}
    >
      {children}
    </code>
  );
}

function ProfilePanel({ agent }: { agent: Agent }) {
  return (
    <div className="min-w-0">
      <p className="type-overline m-0 text-figure-muted">Profile</p>
      <p className="type-body-sm m-0 mt-1 text-figure-secondary">{agent.role}</p>

      <div className="mt-4">
        <p className="type-overline m-0 mb-2 text-figure-muted">
          Capabilities switched off
        </p>
        <ul
          className="m-0 list-none space-y-2 p-0"
          style={{ listStyle: "none" }}
        >
          {DENIED.map((flag) => (
            <li
              key={flag.code}
              className="flex items-start gap-2"
              style={{ listStyle: "none" }}
            >
              <span
                aria-hidden="true"
                className="mt-[0.1rem] shrink-0 text-[0.8rem] font-semibold leading-4"
                style={{ color: "var(--color-status-danger)" }}
              >
                &#10007;
              </span>
              <span className="min-w-0">
                <code className="block break-all font-code text-[0.72rem] leading-4 text-figure-primary">
                  {flag.code}
                </code>
                <span className="type-caption m-0 mt-0.5 block text-figure-muted">
                  {flag.gloss}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="type-overline m-0 text-figure-muted">Excluded tools</p>
          <p className="type-caption m-0 text-figure-muted">
            {agent.excluded.length} removed
          </p>
        </div>
        <ul
          className="m-0 mt-2 flex list-none flex-wrap gap-1.5 p-0"
          style={{ listStyle: "none" }}
        >
          {agent.excluded.map((tool) => (
            <li key={tool} style={{ listStyle: "none" }}>
              <ToolChip>{tool}</ToolChip>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="type-overline m-0 mb-2 text-figure-muted">Keeps only</p>
        <ul
          className="m-0 flex list-none flex-wrap gap-1.5 p-0"
          style={{ listStyle: "none" }}
        >
          {agent.keeps.map((tool) => (
            <li key={tool} style={{ listStyle: "none" }}>
              <ToolChip accent="var(--color-status-success)">{tool}</ToolChip>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PromptPanel({ agent }: { agent: Agent }) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-2">
        <p className="type-overline m-0 text-figure-muted">System prompt</p>
        <p className="type-caption m-0 text-figure-muted">shortened</p>
      </div>
      <div
        className="mt-2 overflow-x-auto rounded-[4px] border border-l-2 border-border bg-surface-code"
        style={{ borderLeftColor: agent.accent }}
      >
        <pre className="type-caption m-0 whitespace-pre-wrap break-words p-3 font-code leading-5 text-figure-primary">
          {agent.prompt}
        </pre>
      </div>
      <p className="type-caption mt-2 text-figure-muted">
        Load-bearing lines kept verbatim; ellipses mark the cuts.
      </p>
    </div>
  );
}

export function VerificationProfiles() {
  const [active, setActive] = React.useState<AgentId>("reviewer");
  const baseId = React.useId().replace(/:/g, "");
  const activeAgent = AGENTS.find((agent) => agent.id === active) ?? REVIEWER;

  return (
    <FigureScaffold
      eyebrow="Verification agents"
      title="Two agents, one job each"
      description="The verifier spawns two hidden subagents over each transcript window. Each is a real, deliberately constrained profile: most capabilities switched off, tools stripped to a tiny allowlist, and a short purpose-built system prompt."
      caption="Figure D2. Config and prompt are drawn from the shipped 0.1.15 agent metadata (reviewer and bookmarker metadata.yaml). The capability flags and excluded_tools lists are verbatim; the system prompts are shortened, with ellipses marking cuts and the load-bearing lines kept word for word."
    >
      <p className="type-body-sm m-0 mb-4 text-figure-secondary">
        At every checkpoint the verifier spawns these two hidden agents over the
        same transcript window. Neither plans, delegates, searches the web, or
        thinks; each keeps a tiny tool allowlist and a prompt written for one
        job.
      </p>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <AgentTabs active={active} baseId={baseId} onSelect={setActive} />
        <p
          className="type-caption m-0 text-figure-secondary"
          aria-live="polite"
        >
          {activeAgent.tab}: {DENIED.length} off, {activeAgent.excluded.length}{" "}
          tools excluded, {activeAgent.keeps.length} kept
        </p>
      </div>

      <div className="border-t border-border pt-5">
        {AGENTS.map((agent) => {
          const isActive = agent.id === active;
          return (
            <div
              key={agent.id}
              role="tabpanel"
              id={`${baseId}-panel-${agent.id}`}
              aria-labelledby={`${baseId}-tab-${agent.id}`}
              tabIndex={0}
              hidden={!isActive}
              className="focus-visible:outline-none"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <ProfilePanel agent={agent} />
                <PromptPanel agent={agent} />
              </div>
            </div>
          );
        })}
      </div>
    </FigureScaffold>
  );
}
