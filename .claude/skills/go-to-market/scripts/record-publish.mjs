#!/usr/bin/env node
// Record one published distribution item in the local ignored metrics log.

import {
  appendRecord,
  defaultMetricsPath,
  parseArgs,
  printJson,
  requireFields,
} from './metrics-utils.mjs';

function usage() {
  console.error(`Usage:
  node .claude/skills/go-to-market/scripts/record-publish.mjs <essay-slug> <channel> [options]

Options:
  --url <url>              Platform post URL
  --id <id>                Platform post id
  --tracked-url <url>      Blog URL with UTM parameters
  --asset <type>           e.g. og, screenshot, demo_gif, quote_card, carousel
  --hook <type>            e.g. claim, scar, question, diagram, framework
  --published-at <iso>     Defaults to now
  --notes <text>           Short note
  --metrics-path <path>    Defaults to ${defaultMetricsPath}
`);
}

const { positional, options } = parseArgs(process.argv.slice(2));
const [essaySlug, channel] = positional;

if (!essaySlug || !channel || options.help) {
  usage();
  process.exit(options.help ? 0 : 1);
}

const record = {
  type: 'publish',
  essay_slug: essaySlug,
  channel,
  platform_post_url: options.url,
  platform_post_id: options.id,
  tracked_url: options['tracked-url'],
  asset_type: options.asset,
  hook_type: options.hook,
  published_at: options['published-at'] || new Date().toISOString(),
  notes: options.notes,
  recorded_at: new Date().toISOString(),
};

try {
  requireFields(record, ['essay_slug', 'channel']);
  if (!record.platform_post_url && !record.platform_post_id) {
    throw new Error('Provide at least one of --url or --id');
  }
  appendRecord(record, options['metrics-path']);
  printJson(record);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
