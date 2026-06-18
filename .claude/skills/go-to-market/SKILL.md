---
name: go-to-market
description: Distribute an Algo Mind essay across channels and keep a writing cadence. Use when the user wants to promote, distribute, "go to market", or seed a published or draft essay (Substack, X, LinkedIn, Hacker News, Substack Notes, Reddit, LessWrong, 知乎/小红书), generate platform-native copy and share assets, or check whether they are overdue to publish. Operationalizes the Distribute and Learn stages of plan/writing-workflow/README.md.
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
- **Learn** — `learn`: record local channel metrics and summarize what worked.

---

## Distribute pipeline

Universal rules before drafting:
1. Start with the blog URL as canonical. Every channel either sends readers back to the blog or builds audience for the next blog post.
2. Pick one payload per channel. A claim, demo, diagram, scar, question, or practical takeaway beats a generic "new post is live."
3. Make the asset before writing the copy when the essay is visual, interactive, technical, or product-shaped. Good assets: a screenshot, tiny demo GIF, diagram, quote card, before/after frame, table, or code/trace crop.
4. Keep a learning record in `dist/<slug>/checklist.md`: channel, post URL, asset used, hook, date, and result after 24h / 7d.
5. Do not chase every channel for every essay. If a channel has no native angle, skip it.

### 1. Read & classify
Read `apps/blog/content/essays/<slug>.mdx` (and the `-zh` variant if present). Pull `title`, `description`, `date`, `topics`, `lang`; skim the body. Classify — the type drives every choice below:

| Type | Examples |
|------|----------|
| Insider / agents | Minecraft + Fairies, agent I/O history, why agents fail |
| Thesis / cog-sci | intelligence-as-algorithm, context-as-memory |
| Opinion / discussion | access-denied-is-not-a-moat (AI strategy, field-coordination takes) |
| Craft / build | ship-the-core, why software is hard, product principles |
| Tooling / teaching | ds4 / local inference, system-design-interview tool |
| Career / personal | job reflections, Silicon Valley |

For an **Opinion / discussion** piece, the goal is *the quality of the conversation it
provokes*, not reach or subscribers. Spine for every channel: **lead with the steelman**
(the strongest case *against* your position) → the turn → **close on a genuine question you
don't already know the answer to.** Leading good-faith is what buys a real thread instead of
a dunk-fest. Keep it field-level (vendor-neutral guardrail) — let the essay carry the
specifics.

Note language(s): EN, ZH, or both.

### 2. Pick channels
`✓` do · `◐` optional / if it fits · `✗` skip

| Type | Substack | X | Notes | HN | LinkedIn | 知乎/小红书 | Reddit | Forums (LW) |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Insider / agents | ✓ | ✓ | ✓ | ✓ | ◐ | ZH only | ◐ | ◐ |
| Thesis / cog-sci | ✓ | ✓ | ✓ | ◐ | ◐ | ZH only | ◐ | ✓ |
| Opinion / discussion | ✓ | ✓ | ✓ | ✓ | ✓ | ZH only | ◐ | ✓ |
| Craft / build | ✓ | ✓ | ✓ | ◐ | ✓ | ZH only | ◐ | ✗ |
| Tooling / teaching | ✓ | ✓ | ✓ | ✓ | ◐ | ZH only | ◐ | ✗ |
| Career / personal | ◐ (keep on blog) | ✓ | ◐ | ✗ | ✓ | ZH only | ✗ | ✗ |

The blog is **always** canonical. **Don't** seed Substack with career pieces — wrong signal for the masthead.

**Reddit and Forums are *discussion* venues, not broadcast — and they're gated:**
- **Reddit** is *participation, not launch*: comment in live threads or post a text self-post with the link secondary; it punishes self-promo and the tribal product subs (`r/ClaudeAI`, `r/OpenAI`) light up the COI — prefer the least-tribal sub that fits (`r/LocalLLaMA` for model/infra takes). `◐` = only via participation.
- **Forums (LessWrong)** only when the piece is **argument-shaped AND you can answer ~3 comments in 48h.** Start with LW; skip EA Forum/Alignment Forum unless you'll tend a second thread.
- Both are the **most COI/disclosure-sensitive** channels — disclose affiliations or hold the post. If engagement bandwidth is zero, put it on X instead.

### 3. Format per channel
- **Substack** — full text + canonical line + subscribe CTA (template below). Follow [references/substack-playbook.md](references/substack-playbook.md).
- **X** — default to a sharp, self-contained **single post**: one topic, a real hook in line 1, close with a genuine question, image + link fine inline. Threads only when every post stands alone; for a multi-facet essay, publish several sharp posts spread over days, not one long thread. **Follow [references/x-playbook.md](references/x-playbook.md)** — the source-anchored rules for what X actually rewards (no format tricks; dwell/reply/recall; avoid clickbait; links are *not* penalized).
- **Notes** — 2–3 standalone insights re-cut from the thread's best lines. Follow [references/substack-notes-playbook.md](references/substack-notes-playbook.md).
- **LinkedIn** — one reflective, professional-framed post; put the link in the first comment (reach). Follow [references/linkedin-playbook.md](references/linkedin-playbook.md).
- **HN** — submit the canonical URL with a plain, non-clickbait title; add a first comment with context. Best on weekday US mornings. Follow [references/hacker-news-playbook.md](references/hacker-news-playbook.md).
- **知乎** — adapt, don't translate; lead with the takeaway. Follow [references/zhihu-playbook.md](references/zhihu-playbook.md).
- **小红书** — turn the idea into a visual, concrete carousel or short video. Follow [references/rednote-playbook.md](references/rednote-playbook.md).
- **Reddit** — *participation, not launch*: argument first, link secondary; pick the least-tribal sub that fits. Follow [references/reddit-playbook.md](references/reddit-playbook.md).
- **Forums (LessWrong)** — full-text crosspost + canonical link; epistemic status, steelman-first, name your cruxes, close on a real question. Only if you'll engage. Follow [references/forums-playbook.md](references/forums-playbook.md).

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

## Learn mode
Follow [references/local-metrics-playbook.md](references/local-metrics-playbook.md). Use the local scripts to create UTM links, record publish events, add manual snapshots, and summarize channel results:

```bash
node .claude/skills/go-to-market/scripts/make-tracked-url.mjs <essay-slug> <channel> --content <variant>
node .claude/skills/go-to-market/scripts/record-publish.mjs <essay-slug> <channel> --url <platform-url> --tracked-url <utm-url> --asset <asset-type> --hook <hook-type>
node .claude/skills/go-to-market/scripts/record-snapshot.mjs <essay-slug> <channel> --url <platform-url> --impressions <n> --likes <n> --comments <n>
node .claude/skills/go-to-market/scripts/summarize-metrics.mjs --slug <essay-slug>
```

Metrics are written to `dist/go-to-market/metrics.jsonl`, which is ignored by git.

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
- [references/local-metrics-playbook.md](references/local-metrics-playbook.md) — local-first channel metrics tracking and summary loop.
- [references/substack-playbook.md](references/substack-playbook.md) — Substack email and writer-network packaging.
- [references/x-playbook.md](references/x-playbook.md) — building high-quality X posts/assets, reverse-engineered from the open-sourced X algorithm (cclank/x-algorithm-wiki → xai-org/x-algorithm). **Read this before drafting any X copy.**
- [references/substack-notes-playbook.md](references/substack-notes-playbook.md) — Substack Notes as insight testing and relationship-building.
- [references/linkedin-playbook.md](references/linkedin-playbook.md) — professional framing, assets, engagement, and measurement.
- [references/hacker-news-playbook.md](references/hacker-news-playbook.md) — HN submission, Show HN, titles, and comments.
- [references/zhihu-playbook.md](references/zhihu-playbook.md) — Q&A-native Chinese adaptation.
- [references/rednote-playbook.md](references/rednote-playbook.md) — 小红书 / RedNote visual packaging.
- [references/reddit-playbook.md](references/reddit-playbook.md) — participation-not-launch, self-promo norms, sub selection. Read before posting to Reddit.
- [references/forums-playbook.md](references/forums-playbook.md) — LessWrong (+ EA Forum / Alignment Forum): crosspost format, steelman/cruxes bar, engagement gate, COI/disclosure. Best venue for opinion/discussion pieces.

## Notes
- This skill is canonical at `.claude/skills/go-to-market/` and symlinked to `.codex/skills/go-to-market` (for Codex). Edit the canonical copy — the symlink follows. Mirror to other harness dirs the same way: `ln -s ../../.claude/skills/go-to-market <dir>/go-to-market`.
- Positioning, channel logic, and the backlog are intentionally lightweight. Update them when the writing direction changes.
