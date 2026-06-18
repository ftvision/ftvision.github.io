import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(here, '..', '..', '..', '..');
export const defaultMetricsPath = resolve(repoRoot, 'dist', 'go-to-market', 'metrics.jsonl');

export function parseArgs(argv) {
  const positional = [];
  const options = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      positional.push(arg);
      continue;
    }

    const raw = arg.slice(2);
    const eq = raw.indexOf('=');
    if (eq !== -1) {
      options[raw.slice(0, eq)] = raw.slice(eq + 1);
      continue;
    }

    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      options[raw] = next;
      i += 1;
    } else {
      options[raw] = true;
    }
  }

  return { positional, options };
}

export function requireFields(record, fields) {
  const missing = fields.filter((field) => record[field] === undefined || record[field] === '');
  if (missing.length) {
    throw new Error(`Missing required field(s): ${missing.join(', ')}`);
  }
}

export function toNumber(value, field) {
  if (value === undefined || value === '') return undefined;
  const n = Number(value);
  if (!Number.isFinite(n)) throw new Error(`${field} must be a finite number`);
  return n;
}

export function appendRecord(record, path = defaultMetricsPath) {
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(record)}\n`, 'utf8');
}

export function readRecords(path = defaultMetricsPath) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`Invalid JSON on ${path}:${index + 1}: ${error.message}`);
      }
    });
}

export function recordKey(record) {
  const id = record.platform_post_id || record.platform_post_url || 'unknown';
  return `${record.essay_slug}::${record.channel}::${id}`;
}

export function printJson(record) {
  console.log(JSON.stringify(record, null, 2));
}
