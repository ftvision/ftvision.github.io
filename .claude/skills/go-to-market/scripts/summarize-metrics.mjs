#!/usr/bin/env node
// Summarize local distribution metrics snapshots.

import { defaultMetricsPath, parseArgs, readRecords, recordKey } from './metrics-utils.mjs';

const METRICS = [
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
  node .claude/skills/go-to-market/scripts/summarize-metrics.mjs [options]

Options:
  --slug <essay-slug>      Filter to one essay
  --channel <channel>      Filter to one channel
  --metrics-path <path>    Defaults to ${defaultMetricsPath}
  --json                  Print JSON instead of table
`);
}

const { options } = parseArgs(process.argv.slice(2));
if (options.help) {
  usage();
  process.exit(0);
}

const records = readRecords(options['metrics-path']).filter((record) => {
  if (options.slug && record.essay_slug !== options.slug) return false;
  if (options.channel && record.channel !== options.channel) return false;
  return true;
});

const groups = new Map();
for (const record of records) {
  const key = recordKey(record);
  if (!groups.has(key)) {
    groups.set(key, {
      essay_slug: record.essay_slug,
      channel: record.channel,
      platform_post_url: record.platform_post_url,
      platform_post_id: record.platform_post_id,
      publish: null,
      snapshots: [],
    });
  }

  const group = groups.get(key);
  if (record.type === 'publish') {
    group.publish = record;
    group.platform_post_url ||= record.platform_post_url;
    group.platform_post_id ||= record.platform_post_id;
  } else if (record.type === 'snapshot') {
    group.snapshots.push(record);
  }
}

function bySnapshotTime(a, b) {
  return new Date(a.snapshot_at || a.recorded_at).getTime() - new Date(b.snapshot_at || b.recorded_at).getTime();
}

function rate(numerator, denominator) {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return undefined;
  return numerator / denominator;
}

const summary = [...groups.values()].map((group) => {
  group.snapshots.sort(bySnapshotTime);
  const first = group.snapshots[0] || {};
  const latest = group.snapshots[group.snapshots.length - 1] || {};
  const delta = {};
  for (const metric of METRICS) {
    if (latest[metric] !== undefined && first[metric] !== undefined) {
      delta[metric] = latest[metric] - first[metric];
    }
  }

  const reach = latest.impressions ?? latest.views;
  const engagement =
    (latest.likes || 0) +
    (latest.comments || 0) +
    (latest.shares || 0) +
    (latest.saves || 0) +
    (latest.bookmarks || 0);

  return {
    essay_slug: group.essay_slug,
    channel: group.channel,
    platform_post_url: group.platform_post_url,
    platform_post_id: group.platform_post_id,
    published_at: group.publish?.published_at,
    first_snapshot_at: first.snapshot_at,
    latest_snapshot_at: latest.snapshot_at,
    snapshots: group.snapshots.length,
    latest,
    delta,
    rates: {
      engagement_rate: rate(engagement, reach),
      click_rate: rate(latest.clicks ?? latest.blog_visits, reach),
      comment_rate: rate(latest.comments, reach),
      save_rate: rate((latest.saves || 0) + (latest.bookmarks || 0), reach),
      subscriber_rate: rate(latest.subscribers, reach),
    },
  };
});

if (options.json) {
  console.log(JSON.stringify(summary, null, 2));
} else if (!summary.length) {
  console.log(`No metrics found in ${options['metrics-path'] || defaultMetricsPath}`);
} else {
  const rows = summary.map((row) => ({
    essay: row.essay_slug,
    channel: row.channel,
    snapshots: row.snapshots,
    latest: row.latest_snapshot_at || '',
    reach: row.latest.impressions ?? row.latest.views ?? '',
    engagement_rate:
      row.rates.engagement_rate === undefined ? '' : `${(row.rates.engagement_rate * 100).toFixed(2)}%`,
    click_rate: row.rates.click_rate === undefined ? '' : `${(row.rates.click_rate * 100).toFixed(2)}%`,
    comments: row.latest.comments ?? '',
    saves: row.latest.saves ?? row.latest.bookmarks ?? '',
    subscribers: row.latest.subscribers ?? '',
  }));
  console.table(rows);
}
