# X playbook — building high-quality posts & assets

How to make X posts that earn reach, reverse-engineered from the **open-sourced X algorithm** (`xai-org/x-algorithm`, via [cclank/x-algorithm-wiki](https://github.com/cclank/x-algorithm-wiki): `posting-guide`, `operating-myths`, `visibility-and-shadowban`, `scoring-and-ranking`). This describes *mechanisms*, not production weight values.

## The one principle

The scoring model **deleted every hand-crafted feature** (`README.md:55`). There is **no format, keyword, or structure the algorithm rewards.** It predicts ~22 *behaviors* per `(post × user)` and sums them: **score = positive signals − negative signals.**

You can't game it. You can only (1) help genuinely good content earn its signals and (2) avoid structural penalties. Everything here is one of those two.

---

# Do this

## The recipe for one high-quality post
1. **Line 1 = the hardest, most specific, contestable claim.** No throat-clearing.
2. **Body = concrete specifics** (numbers, timeframes, a named example) → density → dwell.
3. **One non-consensus judgment** → a reason to quote/repost.
4. **Close with a genuine question or a takeable position** → a reply entry point.
5. **One topic only** → clean recall (matched to the right audience).
6. **Subtly signal who you are / why follow** → converts reach into audience.
7. **Attach one real image; link inline is fine.**

**Template:**
```
<line 1: a specific, contestable claim — the real hook>

<2–4 lines: concrete specifics + one non-consensus judgment>

<close: a genuine question, or a position someone can push back on>

<blog url>   + one real image
```

## Single post vs thread vs a spread series
- **Default to a sharp single post.**
- **Thread** only if every post adds real substance; the root must stand alone (one-shot).
- **Multi-facet essay → several sharp single posts, one facet each, spread over days.** Different facets hit different recall clusters and avoid self-decay — usually beats one long thread.

## Write toward these signals
| Positive signal | What the post must do |
|---|---|
| `dwell` / `dwell_time` | Stop the scroll and get read — real hook in line 1, high density, readable |
| `reply` | Leave a discussion gap — a genuine question or a contestable claim |
| `retweet` / `quote` | Be worth re-sharing — information gain, a non-consensus judgment |
| `favorite` | Say what others were thinking — clear, resonant |
| `click` / `photo_expand` | A **real** info hook in the first line/image (not a tease) |
| `profile_click` / `follow_author` | Make a stranger want to follow — subtly signal who you are |
| `vqv` (video) | Video long enough to register a quality view (too-short clips score 0) |

## Assets that earn signals
- **Image:** a real, informative image (chart, screenshot, diff, diagram) → `photo_expand` + dwell. The blog auto-renders an OG image per essay (`/essays/<slug>/opengraph-image`) — usable, but a *content-specific* image (a result, a demo frame) earns more.
- **GIF / short video:** show the actual thing working; for video, long enough to register a quality view.
- **Quote card:** one sharp line on a clean card → dwell + quotability.

## Cadence & timing
- There's **no "best time"** in the code — but freshness + an active audience means post when your people are online.
- **Spread top-level posts across days** (see author-diversity decay below).
- A user sees a post ~once — nail line 1 + the image; there's no second chance.

## Why it works — the three gates
1. **Recall (two-tower retrieval):** to reach a stranger you're first retrieved by vector similarity. One sharp topic = a clean vector = the right interest cluster. **Sharpness breaks out, not breadth.**
2. **Filter:** don't look like spam; compliance is the floor.
3. **Rank:** the 22-behavior weighted sum, then two adjustments — author-diversity decay and the OON discount (below).

---

# Avoid this

## Structural penalties
- **Negative signals subtract:** `not_interested`, `block_author`, `mute_author`, `report`, `not_dwelled` (scroll-past). The most counter-intuitive rule: **getting swiped away is worse than being ignored** — clickbait that wins a click then a swipe is a *net loss* (`ranking_scorer.rs:83`).
- **Clickbait → `not_dwelled`.** The hook must pay off instantly.
- **Self-spam → author-diversity decay.** Within one feed computation your own later posts get multiplied down — don't drop several top-level posts in one window; spread over days. (A thread *root* counts once.)
- **One-shot exposure.** A user basically sees a post once — line 1 and the first image must win immediately.
- **OON discount.** Strangers' feeds multiply your score by a <1 factor; followers get full price. Serve followers first; breakout needs genuine strength.
- **Stale posts.** `AgeFilter` drops old posts — they're not "rediscovered." Post while fresh.

## Myths the source code busts (stop believing these)
- ❌ **"Links get downranked."** False — no external-link mechanism exists in scoring/filtering/Grok. Links in-post are fine. (Only risk: a bare link with no substance tripping the *spam* classifier.)
- ❌ **"Threads get more reach."** Format isn't a scoring feature; threads are neither rewarded nor penalized. The root is your one shot.
- ❌ **"More posts = more reach."** Author-diversity decay dilutes self-spam.
- ❌ **"Go broad to break out."** Sharp/narrow breaks out; broad fails recall.
- ❌ **"A big account in the batch crowds me out."** Candidate isolation — your score depends only on `(your post × this user)`.
- ❌ **"Premium/verified buys ranking."** No subscription term in the scorer.
- ❌ **"Buy engagement."** Fake interactions that draw swipes/"not interested" are a net loss.
- ❌ **"My account is shadowbanned by a global switch."** No account-level throttle in the recommendation code — suppression is content-level visibility filtering (compliance) or specific filters (a viewer blocked/muted you, the post is stale).

---

## Boundaries (be honest)
- The repo exposes **mechanisms/directions**, not production numbers ("this is a negative signal" — yes; "how many points" — unknown).
- The **visibility-filtering service** (what counts as violating) lives outside the repo.
- All weights are feature-switch params — **X can change them.** Treat no number as permanent.
- The algorithm only **distributes**; it never makes mediocre content good. This playbook stops you from losing points structurally — **content quality sets the ceiling.**
