---
name: distribution-metrics
description: Track and summarize local publishing-channel metrics for Algo Mind essays. Use when the user wants to learn from distribution results, create UTM links, record published channel posts, capture manual metric snapshots, compare hooks/assets/channels, or review what worked after using the go-to-market skill.
---

# Distribution Metrics for Algo Mind

Track channel results locally after an essay is published and distributed. This
skill owns the **Learn** stage: create tracked links, record where the essay was
posted, add manual snapshots, and summarize what worked.

Keep this local-first. Do not introduce dashboards, API keys, browser scraping,
or committed private analytics unless the user explicitly asks.

## Local Data

Metrics are written to `dist/distribution-metrics/metrics.jsonl`, which is
ignored by git through the repo's existing `dist/` rule.

Each record is append-only JSONL. There are two record types:

- `publish` — one platform post, with URL/id, tracked URL, asset type, and hook type.
- `snapshot` — one metric snapshot for that platform post.

## Workflow

1. Create a UTM-tracked blog URL for the channel/post variant.
2. Record the platform post after publishing.
3. Add snapshots around `1h`, `24h`, `72h`, `7d`, and `30d`.
4. Summarize by essay, channel, hook, and asset.

## Commands

Create a tracked blog URL:

```bash
node .claude/skills/distribution-metrics/scripts/make-tracked-url.mjs <essay-slug> <channel> --content <variant>
```

Record a published post:

```bash
node .claude/skills/distribution-metrics/scripts/record-publish.mjs <essay-slug> <channel> --url <platform-url> --tracked-url <utm-url> --asset <asset-type> --hook <hook-type>
```

Record a manual metrics snapshot:

```bash
node .claude/skills/distribution-metrics/scripts/record-snapshot.mjs <essay-slug> <channel> --url <platform-url> --impressions <n> --likes <n> --comments <n>
```

Summarize:

```bash
node .claude/skills/distribution-metrics/scripts/summarize-metrics.mjs --slug <essay-slug>
```

## References

- [references/local-metrics-playbook.md](references/local-metrics-playbook.md) — metric fields, snapshot cadence, channel-specific manual fields, and learning questions.

## Notes

- This skill is canonical at `.claude/skills/distribution-metrics/` and symlinked to `.codex/skills/distribution-metrics` for Codex.
- Pair this with `go-to-market`: use `go-to-market` to package and publish, then use `distribution-metrics` to learn from the result.
