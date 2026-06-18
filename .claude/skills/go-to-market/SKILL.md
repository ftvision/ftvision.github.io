---
name: go-to-market
description: Distribute an Algo Mind essay across channels and keep a writing cadence. Use when the user wants to promote, distribute, "go to market", or seed a published or draft essay (Substack, X, LinkedIn, Hacker News, Substack Notes, 知乎/小红书), generate platform-native copy and share assets, or check whether they are overdue to publish. Operationalizes the Distribute and Learn stages of plan/writing-workflow/README.md.
---

# Go-to-market for Algo Mind

Turn one finished essay into platform-native distribution, and keep the publishing rhythm. This is the operational form of the **Distribute** and **Learn** stages in `plan/writing-workflow/README.md`.

## Positioning every generated piece must fit
- **Brand:** Algo Mind / 思算 — *intelligence is an algorithm* (functionalist: a mind is defined by what it does, not its substrate).
- **Author:** a builder (AI agents, tools, products) with a cognitive-science lens. Practitioner-explainer, English-first.
- **Breadth, not a franchise.** Topics range widely; the lens is the throughline.
- **Guardrails (read before posting):**
  - Vendor-neutral — no competitor (Claude Code / Anthropic) teardowns; keep takes about the field, not a rival product. Check OpenAI comms/social policy before any loud push.
  - Blog is canonical — publish there first, let it index, then syndicate with a canonical link back.
  - Never email-blast the back catalogue.
  - "Views my own."

## Modes
- **Distribute** — `distribute <essay-slug>`: run the per-essay pipeline below.
- **Cadence** — `cadence`: run the cadence check and nudge the next essay.

---

## Distribute pipeline

### 1. Read & classify
Read `apps/blog/content/essays/<slug>.mdx` (and the `-zh` variant if present). Pull `title`, `description`, `date`, `topics`, `lang`; skim the body. Classify — the type drives every choice below:

| Type | Examples |
|------|----------|
| Insider / agents | Minecraft + Fairies, agent I/O history, why agents fail |
| Thesis / cog-sci | intelligence-as-algorithm, context-as-memory |
| Craft / build | ship-the-core, why software is hard, product principles |
| Tooling / teaching | ds4 / local inference, system-design-interview tool |
| Career / personal | job reflections, Silicon Valley |

Note language(s): EN, ZH, or both.

### 2. Pick channels
`✓` do · `◐` optional / if it fits · `✗` skip

| Type | Substack | X | Notes | HN | LinkedIn | 知乎/小红书 |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| Insider / agents | ✓ | ✓ | ✓ | ✓ | ◐ | ZH only |
| Thesis / cog-sci | ✓ | ✓ | ✓ | ◐ | ◐ | ZH only |
| Craft / build | ✓ | ✓ | ✓ | ◐ | ✓ | ZH only |
| Tooling / teaching | ✓ | ✓ | ✓ | ✓ | ◐ | ZH only |
| Career / personal | ◐ (keep on blog) | ✓ | ◐ | ✗ | ✓ | ZH only |

The blog is **always** canonical. **Don't** seed Substack with career pieces — wrong signal for the masthead.

### 3. Format per channel
- **Substack** — full text + canonical line + subscribe CTA (template below).
- **X** — default to a sharp, self-contained **single post**: one topic, a real hook in line 1, close with a genuine question, image + link fine inline. Threads only when every post stands alone; for a multi-facet essay, publish several sharp posts spread over days, not one long thread. **Follow [references/x-playbook.md](references/x-playbook.md)** — the source-anchored rules for what X actually rewards (no format tricks; dwell/reply/recall; avoid clickbait; links are *not* penalized).
- **Notes** — 2–3 standalone insights re-cut from the thread's best lines.
- **LinkedIn** — one reflective, professional-framed post; put the link in the first comment (reach).
- **HN** — submit the canonical URL with a plain, non-clickbait title; add a first comment with context. Best on weekday US mornings.
- **知乎/小红书** — adapt, don't translate; lead with the takeaway.

Before drafting, read **[references/channel-playbook.md](references/channel-playbook.md)** for channel-specific packaging, assets, skip rules, and source anchors.

Templates:

```
# X post (default: one sharp single post — see references/x-playbook.md)
<line 1: a specific, contestable claim — the real hook, no throat-clearing>

<2–4 lines: concrete specifics + one non-consensus judgment>

<close: a genuine question or a takeable position — invites replies>

<blog url>   + one real image
```

```
# Substack cross-post
*Originally published at feitong.phd/essays/<slug>*

<full essay body>

---
If this resonated, I write Algo Mind — intelligence is an algorithm. Subscribe for more.
```

### 4. Assets — make it, or hint how
| Asset | Action |
|------|--------|
| OG share image | **Auto** — the blog renders one per essay at `/essays/<slug>/opengraph-image`. Use that URL as the link preview; nothing to make. |
| X thread / Notes / LinkedIn copy | **Generate** — draft them now; save to `dist/<slug>/`. |
| Demo GIF (interactive / build / CLI posts) | **Hint** — screen-record the widget or terminal, ≤10s, show the actual interaction; lead the X post with it. Can't auto-make. |
| Quote card | **Option** — reuse the `OgCard` component (`apps/blog/components/seo/og-card.tsx`) or a simple SVG; otherwise hint. |

### 5. Publish / automate (honest about limits)
| Channel | How |
|---------|-----|
| Blog | Already published via git/deploy (canonical). |
| Substack | No official write API → paste the generated markdown, or RSS-import as a draft. |
| X | Manual paste by default. Auto-posting needs an X API app with OAuth user-context — ask the user to set that up, then a poster script can be added here. |
| LinkedIn | Manual paste. |
| HN | Manual submit. |

Write generated drafts to `dist/<slug>/` (add `dist/` to `.gitignore`) with a `checklist.md`, or output them inline — never commit draft social copy.

---

## Cadence mode
Run:

```bash
node .claude/skills/go-to-market/scripts/cadence-check.mjs
```

It reports days since the last non-draft essay and gives a few lightweight backlog nudges. Thresholds: ≤14d on pace · ≤28d quiet · >28d overdue.

To make it a true reminder, schedule it — a weekly cron, or a scheduled Claude agent that runs the check and messages the result. Offer to wire this up.

---

## References
- [references/channel-playbook.md](references/channel-playbook.md) — channel-specific packaging rules for Substack, X, Notes, LinkedIn, HN, 知乎, and 小红书. **Read this before drafting channel copy.**
- [references/x-playbook.md](references/x-playbook.md) — building high-quality X posts/assets, reverse-engineered from the open-sourced X algorithm (cclank/x-algorithm-wiki → xai-org/x-algorithm). **Read this before drafting any X copy.**

## Notes
- This skill is canonical at `.claude/skills/go-to-market/` and symlinked to `.codex/skills/go-to-market` (for Codex). Edit the canonical copy — the symlink follows. Mirror to other harness dirs the same way: `ln -s ../../.claude/skills/go-to-market <dir>/go-to-market`.
- Positioning, channel logic, and the backlog are intentionally lightweight. Update them when the writing direction changes.
