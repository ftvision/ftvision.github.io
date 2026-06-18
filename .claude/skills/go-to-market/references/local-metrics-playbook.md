# Local metrics playbook

This is the local-first measurement loop for distribution. It avoids platform
API setup, dashboards, scraping, and committed private data. Everything writes to
`dist/go-to-market/metrics.jsonl`, which is ignored by git.

## What to track

For every distributed essay, record:

- essay slug
- channel
- platform post URL or platform post ID
- tracked blog URL with UTM parameters
- asset type: `og`, `screenshot`, `demo_gif`, `quote_card`, `diagram`,
  `carousel`, `none`
- hook type: `claim`, `scar`, `question`, `diagram`, `framework`, `story`,
  `how_to`
- snapshots at roughly `1h`, `24h`, `72h`, `7d`, and `30d`

## Commands

Create a tracked blog URL:

```bash
node .claude/skills/go-to-market/scripts/make-tracked-url.mjs ship-the-core-first x --content scar-1
```

Record that a post was published:

```bash
node .claude/skills/go-to-market/scripts/record-publish.mjs ship-the-core-first x \
  --url https://x.com/example/status/123 \
  --tracked-url "https://feitong.phd/essays/ship-the-core-first?utm_source=x&utm_medium=social&utm_campaign=ship-the-core-first&utm_content=scar-1" \
  --asset diagram \
  --hook scar
```

Record a manual snapshot:

```bash
node .claude/skills/go-to-market/scripts/record-snapshot.mjs ship-the-core-first x \
  --url https://x.com/example/status/123 \
  --impressions 1200 \
  --likes 32 \
  --comments 5 \
  --shares 3 \
  --bookmarks 8 \
  --clicks 41
```

Summarize the current local file:

```bash
node .claude/skills/go-to-market/scripts/summarize-metrics.mjs
```

## Minimal manual metrics by channel

| Channel | Snapshot fields to enter |
|---|---|
| X | `impressions`, `likes`, `comments`, `shares`, `bookmarks`, `clicks`, `profile-clicks` |
| LinkedIn | `impressions`, `likes`, `comments`, `shares`, `clicks`, `profile-clicks`, `followers` |
| Substack | `views`, `likes`, `comments`, `shares`, `subscribers`, `clicks` |
| Substack Notes | `views` if available, `likes`, `comments`, `shares`, `subscribers` |
| Hacker News | `score`, `comments`, `rank`, `blog-visits` |
| Zhihu | `views`, `likes`, `comments`, `saves`, `shares`, `followers` |
| RedNote | `impressions`, `views`, `likes`, `comments`, `saves`, `shares`, `followers` |

For blog-side truth, use UTM/referrer visits from the site's analytics and enter
them as `blog-visits` when platform click data is missing or untrusted.

## How to learn from the file

Look for:

- `engagement_rate`: did the post earn native response?
- `click_rate`: did the channel send readers back to the blog?
- `comment_rate`: did the framing create discussion?
- `save_rate`: did people treat the idea as useful?
- `subscriber_rate`: did it create future audience?

Compare hook type and asset type across essays. The useful question is not
"which channel is biggest?" It is "which channel and packaging reliably produces
the signal this essay needed?"
