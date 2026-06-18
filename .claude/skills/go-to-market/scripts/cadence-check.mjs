#!/usr/bin/env node
// Algo Mind cadence check — reports days since the last non-draft essay and
// nudges the next write-first piece. No dependencies; run with `node`.
//
// Usage: node .claude/skills/go-to-market/scripts/cadence-check.mjs

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..', '..', '..', '..');
const essaysDir = join(repoRoot, 'apps', 'blog', 'content', 'essays');

// Lightweight backlog nudge. Keep this short and update it when your writing
// taste changes; this is a reminder, not a project-management system.
const BACKLOG = [
  'Learning frontend UI with coding agents',
  'Ship the product core first',
  'System-design interview practice with an agent',
  'Reading ds4 / local inference',
  'Agent I/O history: function -> tool -> CLI',
];

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : '';
}
function field(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*["']?(.*?)["']?\\s*$`, 'm'));
  return m ? m[1].trim() : '';
}
function booleanField(fm, key) {
  return field(fm, key).toLowerCase() === 'true';
}

let files;
try {
  files = readdirSync(essaysDir).filter((f) => f.endsWith('.mdx'));
} catch {
  console.error(`Could not read essays dir: ${essaysDir}`);
  process.exit(1);
}

let latest = null;
for (const f of files) {
  const fm = frontmatter(readFileSync(join(essaysDir, f), 'utf8'));
  if (booleanField(fm, 'draft')) continue;
  const date = field(fm, 'date');
  const title = field(fm, 'title');
  if (!date) continue;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) continue;
  if (!latest || d > latest.d) latest = { d, title, date };
}

if (!latest) {
  console.log(`No dated essays found in ${essaysDir}`);
  process.exit(0);
}

const days = Math.floor((Date.now() - latest.d.getTime()) / 86_400_000);
const status = days <= 14 ? '[on pace]' : days <= 28 ? '[quiet]' : '[overdue]';

console.log(`\n${status} Algo Mind cadence check`);
console.log(`Last essay: "${latest.title}" (${latest.date}) — ${days} days ago\n`);

if (days <= 14) console.log('On pace. Keep the rhythm.');
else if (days <= 28) console.log('Getting quiet — aim to ship within a week.');
else console.log('Overdue. Ship the next one.');

console.log('\nBacklog nudges:');
BACKLOG.slice(0, 3).forEach((b, i) => console.log(`  ${i + 1}. ${b}`));
console.log('');
