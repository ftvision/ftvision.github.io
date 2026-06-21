#!/usr/bin/env node
// Append one manual metrics snapshot for a distribution item.

import {
  appendRecord,
  defaultMetricsPath,
  parseArgs,
  printJson,
  requireFields,
  toNumber,
} from './metrics-utils.mjs';

const NUMERIC_FIELDS = [
  'impressions',
  'views',
  'clicks',
  'blog_visits',
  'likes',
  'comments',
  'shares',
  'saves',
  'bookmarks',
  'followers',
  'subscribers',
  'profile_clicks',
  'score',
  'rank',
];

function usage() {
  console.error(`Usage:
  node .claude/skills/distribution-metrics/scripts/record-snapshot.mjs <essay-slug> <channel> [options]

Identify the item with --url and/or --id, then pass any available metrics.

Options:
  --url <url>              Platform post URL
  --id <id>                Platform post id
  --impressions <n>
  --views <n>
  --clicks <n>
  --blog-visits <n>
  --likes <n>
  --comments <n>
  --shares <n>
  --saves <n>
  --bookmarks <n>
  --followers <n>
  --subscribers <n>
  --profile-clicks <n>
  --score <n>              Useful for HN
  --rank <n>               Useful for HN
  --snapshot-at <iso>      Defaults to now
  --notes <text>
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
  type: 'snapshot',
  essay_slug: essaySlug,
  channel,
  platform_post_url: options.url,
  platform_post_id: options.id,
  snapshot_at: options['snapshot-at'] || new Date().toISOString(),
  notes: options.notes,
  recorded_at: new Date().toISOString(),
};

for (const field of NUMERIC_FIELDS) {
  const optionName = field.replaceAll('_', '-');
  const value = options[optionName] ?? options[field];
  const n = toNumber(value, optionName);
  if (n !== undefined) record[field] = n;
}

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
