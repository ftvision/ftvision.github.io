#!/usr/bin/env node
// Build a canonical blog URL with consistent UTM parameters.

import { parseArgs } from './metrics-utils.mjs';

const CHANNEL_MEDIUM = {
  x: 'social',
  twitter: 'social',
  linkedin: 'social',
  hn: 'community',
  hackernews: 'community',
  substack: 'email',
  notes: 'social',
  substack_notes: 'social',
  zhihu: 'community',
  rednote: 'social',
  xiaohongshu: 'social',
};

function usage() {
  console.error(`Usage:
  node .claude/skills/go-to-market/scripts/make-tracked-url.mjs <essay-slug> <channel> [options]

Options:
  --url <url>          Canonical URL. Defaults to https://feitong.phd/essays/<slug>
  --lang <en|zh>      Use zh essay route when no --url is supplied
  --campaign <name>   Defaults to essay slug
  --content <name>    Hook/asset/post variant, e.g. claim-1, demo-gif
  --medium <medium>   Override inferred medium
`);
}

const { positional, options } = parseArgs(process.argv.slice(2));
const [slug, channel] = positional;

if (!slug || !channel || options.help) {
  usage();
  process.exit(options.help ? 0 : 1);
}

const normalizedChannel = channel.toLowerCase().replaceAll('-', '_');
const baseUrl =
  options.url ||
  (options.lang === 'zh'
    ? `https://feitong.phd/zh/essays/${encodeURIComponent(slug)}`
    : `https://feitong.phd/essays/${encodeURIComponent(slug)}`);

const url = new URL(baseUrl);
url.searchParams.set('utm_source', normalizedChannel);
url.searchParams.set('utm_medium', options.medium || CHANNEL_MEDIUM[normalizedChannel] || 'social');
url.searchParams.set('utm_campaign', options.campaign || slug);
if (options.content) url.searchParams.set('utm_content', options.content);

console.log(url.toString());
