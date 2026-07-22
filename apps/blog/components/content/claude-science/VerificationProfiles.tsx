"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FigureScaffold } from "./FigureScaffold";

/**
 * Figure 10 — "Verification agents".
 *
 * The release ships two hidden profiles, REVIEWER and BOOKMARKER. REVIEWER is
 * enabled by default; BOOKMARKER is wired into the same checkpoint machinery
 * but disabled by default. The point is not the exact excluded_tools list — it
 * is that each profile is cut down to almost nothing, then handed one tight prompt. So
 * the profile is collapsed to a single capability bar (how many tools survive)
 * plus a plain-English line; the shortened system prompt is the hero.
 *
 * Values are from the shipped 0.1.15 agent metadata (reviewer/bookmarker
 * metadata.yaml): the kept/excluded tool sets and the five profile restrictions
 * are verbatim; only the prompt text is abbreviated (see the caption).
 */

type AgentId = "reviewer" | "bookmarker";

interface Agent {
  id: AgentId;
  tab: string;
  accent: string;
  role: string;
  keeps: string[];
  excluded: string[]; // kept for an honest count; not rendered as a list
  off: string;
  prompt: string;
}

const REVIEWER_ACCENT = "var(--color-data-1)";
const BOOKMARKER_ACCENT = "var(--color-data-1)";
// Both profiles carry the same five profile restrictions (verbatim):
// enable_plan_mode, enable_subtask_delegation, enable_web_search,
// enable_thinking, skills_locked.
const PROFILE_RESTRICTIONS = 5;

const REVIEWER: Agent = {
  id: "reviewer",
  tab: "REVIEWER",
  accent: REVIEWER_ACCENT,
  role: "A read-only tracer: it reads another agent's transcript and reports where it fabricated, hallucinated, or deviated. Never a root agent.",
  keeps: ["repl", "read_file", "submit_output"],
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
  off: "No python, bash, or R; no planning, delegation, web search, or thinking; the skill catalog is locked. It can look and report, nothing more.",
  prompt: `You are the REVIEWER — a transcript reviewer.

You receive pointers into another agent's conversation … read that transcript and report where it fabricated, hallucinated, or deviated.

Trace, don't recompute. If the agent claims a number, find the cell that printed it and compare — a CONTRADICTION is the finding. A value you simply cannot trace inside this window is NOT a finding …

Weight by WHERE the claim lives. Artifact contents (saved files, figures, tables, reports) are the session's durable output … Hold these to the strict bar. Assistant prose is chat narration the user skims in the moment — flag only if a reader ACTING on it would be materially misled.

Call submit_output ONCE with your findings and stop — do not write any assistant prose before or after it.`,
};

const BOOKMARKER: Agent = {
  id: "bookmarker",
  tab: "BOOKMARKER",
  accent: BOOKMARKER_ACCENT,
  role: "A write-only marker: it reads the same window and returns 0–2 verbatim spans a returning user would want to jump back to. Never a root agent.",
  keeps: ["submit_output"],
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
  off: "Everything the reviewer loses, plus repl and read_file — it cannot even open a file. It only writes bookmarks.",
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

function CapabilityBar({ agent }: { agent: Agent }) {
  const total = agent.keeps.length + agent.excluded.length;
  const kept = agent.keeps.length;

  return (
    <div className="min-w-0">
      <p className="type-body-sm m-0 font-medium text-figure-primary">
        {agent.role}
      </p>

      <p className="type-overline m-0 mb-2 mt-4 text-figure-muted">
        Capability, at a glance
      </p>
      <div
        className="flex h-11 items-end gap-1"
        role="img"
        aria-label={`Keeps ${kept} of ${total} explicitly listed tools; ${PROFILE_RESTRICTIONS} profile restrictions.`}
      >
        {Array.from({ length: total }).map((_, index) => {
          const on = index < kept;
          return (
            <span
              key={index}
              aria-hidden="true"
              className="w-4 rounded-t-[2px] transition-[height,background-color] duration-300 ease-out motion-reduce:transition-none"
              style={{
                height: on ? "100%" : "26%",
                backgroundColor: on
                  ? agent.accent
                  : "var(--color-border-strong)",
              }}
            />
          );
        })}
      </div>
      <p className="type-caption m-0 mt-2 text-figure-secondary">
        keeps <b style={{ color: agent.accent }}>{kept}</b> of {total}{" "}
        explicitly listed tools · {PROFILE_RESTRICTIONS} profile restrictions
      </p>

      <p className="type-overline m-0 mb-2 mt-4 text-figure-muted">
        Keeps only
      </p>
      <ul
        className="m-0 flex list-none flex-wrap gap-1.5 p-0"
        style={{ listStyle: "none" }}
      >
        {agent.keeps.map((tool) => (
          <li key={tool} style={{ listStyle: "none" }}>
            <code
              className="inline-block rounded-[4px] px-2 py-0.5 font-code text-[0.72rem] font-semibold leading-5 text-figure-inverse"
              style={{ backgroundColor: agent.accent }}
            >
              {tool}
            </code>
          </li>
        ))}
      </ul>

      <p className="type-caption m-0 mt-4 text-figure-muted">{agent.off}</p>
    </div>
  );
}

function PromptPanel({ agent }: { agent: Agent }) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-2">
        <p className="type-overline m-0 text-figure-muted">
          The one tight prompt
        </p>
        <p className="type-caption m-0 text-figure-muted">shortened</p>
      </div>
      <div className="mt-2 overflow-x-auto rounded-[4px] border border-border bg-surface-code">
        <pre className="type-caption m-0 whitespace-pre-wrap break-words p-3 font-code leading-6 text-figure-primary">
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

  return (
    <FigureScaffold
      eyebrow="Verification agents"
      title="Two profiles, one enabled by default"
      description="The release ships REVIEWER and BOOKMARKER profiles over the same checkpoint window. REVIEWER is enabled by default; BOOKMARKER is implemented but disabled. Each profile is cut down to one narrow job."
      caption="Figure 10. The kept and excluded tool sets and five profile restrictions come from the shipped 0.1.15 metadata. Four capability switches are off, while skill discovery is locked. The prompts are shortened, with ellipses marking cuts. BOOKMARKER is shown as a shipped profile, not as an active default."
      captionZh="图 10。工具保留清单、排除清单和五项配置约束，都来自 0.1.15 随附的元数据。四项能力开关关闭，技能目录锁定。提示词做了删节，省略号标出删去的内容。图中列出 BOOKMARKER，是因为它已随版本发布；这不表示它默认启用。"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <AgentTabs active={active} baseId={baseId} onSelect={setActive} />
        <p className="type-caption m-0 text-figure-muted">
          Same checkpoint window; BOOKMARKER disabled by default.
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
              <div className="grid gap-6 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-8">
                <CapabilityBar agent={agent} />
                <PromptPanel agent={agent} />
              </div>
            </div>
          );
        })}
      </div>
    </FigureScaffold>
  );
}
