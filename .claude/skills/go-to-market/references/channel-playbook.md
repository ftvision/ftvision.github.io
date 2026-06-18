# Distribution channel playbook

Use this after reading the essay and before drafting channel copy. The goal is not
"post everywhere." The goal is to package one canonical blog essay into a few
native surfaces that can actually produce readers, replies, follows, or future
ideas.

## Universal rules

1. Start with the blog URL as canonical. Every channel either sends readers back
   to the blog or builds audience for the next blog post.
2. Pick one payload per channel. A claim, demo, diagram, scar, question, or
   practical takeaway beats a generic "new post is live."
3. Make the asset before writing the copy when the essay is visual, interactive,
   technical, or product-shaped. Good assets: a screenshot, tiny demo GIF,
   diagram, quote card, before/after frame, table, or code/trace crop.
4. Keep a learning record in `dist/<slug>/checklist.md`: channel, post URL,
   asset used, hook, date, and result after 24h / 7d.
5. Do not chase every channel for every essay. If a channel has no native angle,
   skip it.

## Substack

Best for: thesis/cog-sci, craft/build, tooling/teaching, or agent essays that can
become an email-native letter.

Use Substack as an email and writer-network surface, not as the canonical
archive. If preserving blog canonicality matters, prefer a short letter or edited
excerpt that links back to the blog rather than a blind full-text duplicate.

Package:
- Subject line: one direct claim, not the blog title unless the title already
  works as email.
- Opening: two paragraphs max. State why the essay matters now.
- Body: either a condensed version of the essay or a clean excerpt with one
  original framing paragraph.
- Link: "Full essay: <blog URL>" near the top and again at the bottom.
- CTA: subscribe only after the essay has delivered value.

Growth moves:
- Use Recommendations deliberately. Substack says Recommendations and the app
  are a major source of new subscriptions, and the upgraded flow lets writers
  curate a broader scene of publications and profiles for readers.
- Mention relevant Substack writers only when the essay genuinely builds on
  their work. Substack mentions notify the mentioned writer and make the network
  relationship explicit.
- Cross-post only when there is a real collaboration or an outside publication
  worth sharing with commentary. Do not use cross-posting as a lazy content mill.
- If importing from the blog, Substack supports imports from several platforms
  and RSS, but manual copy-paste is still the fallback when import is awkward.

Avoid:
- Email-blasting old archive posts.
- Treating Substack as a second blog with identical full text every time.
- Publishing career/personal ritual pieces there unless they clearly reinforce
  the Algo Mind masthead.

Source anchors:
- https://on.substack.com/p/substacks-recommendations-network
- https://on.substack.com/p/introducing-mentions-and-cross-posts
- https://support.substack.com/hc/en-us/articles/360037830351-How-do-I-import-my-posts-from-another-platform-such-as-Mailchimp-WordPress-Medium-or-Ghost

## X

Best for: sharp claims, agent/tooling specifics, visual demos, diagrams, short
technical judgments, and discussion prompts.

Follow `x-playbook.md` for the deeper algorithm/source notes.

Package:
- Default: one sharp single post with one claim and one asset.
- For multi-facet essays: 3-5 separate posts spread across days, each focused on
  a different facet.
- Thread only when every post adds substance and the root stands alone.
- Link inline is fine when the post itself has enough value without the click.

Assets:
- Best: screenshot, demo GIF, trace/log crop, diagram, chart, or opinionated
  quote card.
- Acceptable: the blog OG image if nothing else exists.
- Weak: stock-looking art or a generic title card.

Post shapes:
- Claim: "The reason coding agents feel better in the terminal is not speed. It
  is recoverability."
- Scar: "I lost weeks on clawFM by building distribution before the core loop
  worked."
- Diagram: one visual that compresses the essay into a model.
- Question: ask for cases, counterexamples, or workflows, not vague agreement.

Avoid:
- "I wrote about..." as line 1.
- Broad summary threads.
- Multiple top-level posts in one window.
- Engagement bait questions that do not connect to the essay.

Source anchor:
- https://github.com/xai-org/x-algorithm

## Substack Notes

Best for: portable insights, small personal observations, and connecting with
adjacent writers. Treat Notes as relationship-building and idea testing, not as a
traffic faucet.

Package:
- 2-3 standalone notes per essay.
- Each note should work without the essay link.
- Use a short excerpt, a question, or a single practical takeaway.
- Link the full essay only after the note has delivered a complete thought.

Good note types:
- "A mistake I keep making..."
- "One sentence I could not fit into the essay..."
- "This changed my mind about..."
- "For people building with agents, what is your version of this?"

Avoid:
- Dumping the same X post with no adaptation.
- Notes that are just link previews.
- Mentioning people solely to get noticed.

## LinkedIn

Best for: professional lessons, career reflections, product/build scars, tool
learning, and industry-readable technical essays.

Package:
- One reflective post that makes the professional lesson explicit.
- First 2 lines must tell the reader what work situation this applies to.
- Use the blog URL when it improves the reader experience. If you want reach
  over click-through, make the post valuable on its own and put the link at the
  end or in a first comment.
- Use 3-5 relevant hashtags only when posting from a Page; for personal posts,
  use sparingly and prioritize plain language.

Assets:
- Custom image, diagram, or 3-4 image collage.
- PDF/carousel if the essay has a framework, checklist, or sequence.
- Short native video if the essay has a demo or workflow.

Post shapes:
- Lesson learned: mistake -> constraint -> changed behavior.
- Framework: 3-part model from the essay.
- Behind-the-scenes: show the artifact, not just the conclusion.
- Career: specific tradeoff, not generic inspiration.

Engagement:
- Be present for the first day. Reply with substance.
- Comment on adjacent posts as yourself when it is genuinely relevant.
- Track whether the post produces profile views, comments, newsletter/blog
  clicks, or follow-up conversations.

Avoid:
- Startup-bro announcement voice.
- Giant walls of text with no visual break.
- Overclaiming universal lessons from one personal anecdote.

Source anchors:
- https://business.linkedin.com/advertise/linkedin-pages/best-practices
- https://business.linkedin.com/advertise/ads/best-practices/sponsored-content-tips

## Hacker News

Best for: essays that gratify hacker curiosity: systems, tools, engineering
tradeoffs, agent interfaces, local inference, code reading, concrete product
lessons.

Submit only when the essay is likely interesting to HN even if you were not the
author. HN explicitly allows occasional self-submission, but not using HN
primarily for promotion.

Regular submission:
- Submit the canonical blog URL.
- Use the original title unless it is misleading or too promotional.
- Remove hype, uppercase, exclamation points, and unnecessary site names.
- Be around to discuss. Answer like a person, not a spokesperson.
- Do not ask anyone to upvote, comment, or submit.

Show HN:
- Use only for something people can try, run, or play with.
- Blog posts, newsletters, sign-up pages, lists, and reading material are not
  Show HN.
- If the essay includes an interactive blog artifact, submit the artifact page
  only when it can be used without login friction.

First comment, if needed:
- 2-4 sentences of context.
- Explain what you made, what surprised you, or what kind of feedback would be
  useful.
- Do not paste generated-sounding summary text.

Avoid:
- Submitting every essay.
- "Launch" language.
- Defensive replies.
- Deleting and reposting because the first submission did not land.

Source anchors:
- https://news.ycombinator.com/newsguidelines.html
- https://news.ycombinator.com/showhn.html

## 知乎

Best for: Chinese-language deep explanation, career/product reflection, AI-tool
practice, learning notes, and answer-shaped essays.

Treat Zhihu as Q&A-native. A blog essay usually needs to become either:
- an answer to a real question, or
- a column article with a stronger Chinese framing.

Package:
- Start from the question readers already have, not the English essay structure.
- Lead with the conclusion in the first screen.
- Use concrete experience, steps, screenshots, or counterexamples.
- Keep the tone more explanatory than promotional.
- Link back to the blog only if the reader has already received the core answer.

Good shapes:
- "我踩过的坑": a personal failure with a transferable lesson.
- "怎么判断 X 是否值得做": decision framework.
- "为什么 Y 比看起来更难": technical/product explanation.
- "用 AI 学/做 Z 的真实流程": workflow with screenshots.

Avoid:
- Direct translation from English.
- Thin answers that only point to the blog.
- Employer-sensitive details.

Source note:
- Zhihu's creator academy is login/verification-gated from this environment, so
  treat this section as operator guidance rather than official platform fact.

## 小红书 / RedNote

Best for: visual, personal, concrete, useful posts. Use it for "here is what I
did / learned / changed" rather than abstract argument.

Package:
- Format: carousel or short vertical video.
- Cover: prefer vertical 3:4 or square 1:1, with a legible title. A vertical
  cover usually occupies more screen space than a horizontal one.
- First image/title: promise one concrete gain, mistake, checklist, or
  before/after.
- Opening: first three lines should say the takeaway directly.
- Body: 5-8 slides or compact sections. Each slide should carry one point.
- End: one natural question that invites comments.
- Tags: targeted topic/search tags, not a pile of generic traffic tags.

Good shapes:
- "我用 coding agent 学前端的 3 个阶段"
- "做 clawFM 最大的产品错误: 先做了分发, 后做核心"
- "用 AI 准备 system design 面试, 这 5 个提示词有用"
- "我现在判断一个 agent 工具好不好, 看这 4 点"

Assets:
- Screenshot sequence.
- Hand-drawn or simple framework card.
- Before/after artifact.
- Short screen recording of a workflow.

Avoid:
- Abstract English-tech discourse translated into Chinese.
- Links as the main payload; many readers will stay in-app.
- Over-polished AI graphics with no lived detail.

Source anchors:
- https://www.canva.cn/learn/xiaohongshu-note-cover/
- https://www.woshipm.com/share/6352435.html
