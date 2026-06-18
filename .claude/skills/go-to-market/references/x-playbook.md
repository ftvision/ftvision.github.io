# X playbook — building high-quality posts & assets

How to make X posts that earn reach, reverse-engineered from the **open-sourced X algorithm** (`xai-org/x-algorithm`, via [cclank/x-algorithm-wiki](https://github.com/cclank/x-algorithm-wiki): `posting-guide`, `operating-myths`, `visibility-and-shadowban`, `scoring-and-ranking`). This describes *mechanisms*, not production weight values — and mechanisms tell you what to do.

## The one principle

The scoring model **deleted every hand-crafted feature** (`README.md:55, 324-325`). There is **no format, keyword, or structure the algorithm rewards.** It predicts ~22 *behaviors* per `(post × user)` and sums them: **score = positive signals − negative signals.**

You cannot game it. You can only (1) help genuinely good content earn its signals and (2) avoid structural penalties. Everything below is one of those two.

## The signals you're writing for

| Positive (write toward these) | What the post must do |
|---|---|
| `dwell` / `dwell_time` | Stop the scroll and get read — real hook in line 1, high density, readable |
| `reply` | Leave a discussion gap — a genuine question or a contestable claim |
| `retweet` / `quote` | Be worth re-sharing — information gain, a non-consensus judgment |
| `favorite` | Say what others were thinking — clear, resonant |
| `click` / `photo_expand` | A **real** info hook in the first line/image (not a tease) |
| `profile_click` / `follow_author` | Make a stranger want to follow — subtly signal who you are |
| `vqv` (video) | Video long enough to register a quality view (too-short clips score 0) |

**Negative (these subtract):** `not_interested`, `block_author`, `mute_author`, `report`, `not_dwelled` (scroll-past). The most counter-intuitive rule in the whole system: **getting swiped away is worse than being ignored.** Clickbait that wins a click and then a swipe-away is a *net loss* (`ranking_scorer.rs:83`).

## The three gates a post must pass

1. **Recall (two-tower retrieval).** To reach a stranger you must first be retrieved into their candidate pool by vector similarity. **One sharp topic per post = a clean vector = matched to the right interest cluster.** "A bit of everything" points at an average direction and loses every narrow gate. **Breakout comes from sharpness, not breadth.**
2. **Filter.** Don't look like spam (bare link, mass-broadcast feel, repetition). Compliance is the floor, not a bonus.
3. **Rank.** The 22-behavior weighted sum, then two adjustments: author-diversity decay and the OON discount (below).

## Structural penalties to avoid

- **Clickbait → `not_dwelled`.** A negative weight. The hook must pay off instantly.
- **Author-diversity decay.** Within a *single* feed computation, your own later posts get multiplied down. Don't drop several top-level posts in one window — **spread them over hours/days.** (A thread *root* counts once; in-thread replies are read on click-through, so a thread doesn't self-collide the way 3 separate top-level posts do.)
- **One-shot exposure.** A user basically sees a given post once (`PreviouslySeenPostsFilter`). No second bite — line 1 and the first image must win immediately.
- **OON discount.** Strangers' feeds multiply your score by a <1 out-of-network factor; followers get full price. Serve followers first; breakout needs genuine strength on top.
- **Freshness window (`AgeFilter`).** Old posts are *not* "rediscovered." Post when your audience is active so it meets people while fresh.

## Myths the source code busts (stop doing these)

- ❌ **"Links get downranked."** False — there is no external-link mechanism anywhere in scoring, filtering, or Grok. Links in-post are fine. (Only risk: a bare link with no substance tripping the *spam* classifier — a different thing.)
- ❌ **"Threads get more reach."** Format isn't a scoring feature; threads are neither rewarded nor penalized. The root is your one shot — make it stand alone.
- ❌ **"More posts = more reach."** Author-diversity decay dilutes self-spam.
- ❌ **"Go broad to break out."** Sharp/narrow breaks out; broad fails recall.
- ❌ **"A big account in the batch crowds me out."** Candidate isolation — your score depends only on `(your post × this user)`, never the batch.
- ❌ **"Premium/verified buys ranking."** No subscription term in the scorer.
- ❌ **"Buy engagement."** Fake interactions that draw swipes/"not interested" are a net loss.
- ❌ **"My account is shadowbanned by a global switch."** No account-level throttle exists in the recommendation code. Suppression is content-level visibility filtering (compliance), or specific filters (a viewer blocked/muted you, the post is stale), not a flag on you.

## The recipe for a high-quality post

1. **Line 1 = the hardest, most specific, contestable claim.** No throat-clearing.
2. **Body = concrete specifics** (numbers, timeframes, a named example) → density → dwell.
3. **One non-consensus judgment** → a reason to quote/repost.
4. **Close with a genuine question or a takeable position** → a reply entry point.
5. **One topic only** → clean recall.
6. **Subtly signal who you are / why follow** → converts reach into audience.
7. **Attach one real image; link inline is fine.** No clickbait, no keyword-stuffing, no bare link.

**Default template (single post):**
```
<line 1: a specific, contestable claim — the real hook>

<2–4 lines: concrete specifics + one non-consensus judgment>

<close: a genuine question, or a position someone can push back on>

<blog url>   + one real image
```

**Anti-pattern (don't):**
```
🚨 AI just changed EVERYTHING — you NEED to see this 👇
[bare link]
```
Clickbait → `not_dwelled`; bare link → spam risk; zero density → no dwell; no question → no reply; vague topic → fuzzy recall. Net-negative on every axis.

## Single post vs thread vs a spread series

- **Default to a sharp single post.**
- **Thread** only if every post adds real substance; the root must stand alone (one-shot).
- **Multi-facet essay → several sharp single posts, one facet each, spread over days.** Different facets hit different recall clusters and avoid self-decay — usually beats one long thread.

## Assets that earn signals

- **Image:** a real, informative image (chart, screenshot, diff, diagram) → `photo_expand` + dwell. The blog auto-renders an OG image per essay (`/essays/<slug>/opengraph-image`) — usable, but a *content-specific* image (a result, a demo frame) earns more.
- **GIF / short video:** show the actual thing working; for video, long enough to register a quality view (`vqv` is zeroed for too-short clips).
- **Quote card:** one sharp line on a clean card → dwell + quotability.
- Avoid engagement-bait graphics ("like if you agree").

## Cadence & timing

- There is **no "best time"** in the code — but freshness + an active audience means post when your people are online.
- **Spread top-level posts across days** (author-diversity decay).
- A user sees a post ~once — there is no second chance, so nail line 1 + the image.

## Boundaries (be honest)

- The repo exposes **mechanisms/directions**, not production numbers ("this is a negative signal" — yes; "how many points" — unknown).
- The **visibility-filtering service** (what counts as violating) lives outside the repo; compliance matters but its exact rules aren't knowable from source.
- All weights are feature-switch params — **X can change them.** Treat no number as permanent.
- The algorithm only **distributes**; it never makes mediocre content good. This playbook stops you from losing points structurally — **content quality sets the ceiling.**
