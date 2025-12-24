#!/usr/bin/env node

/**
 * Migration script to convert Hugo digest content to MDX format for the blog app.
 *
 * Usage: node scripts/migrate-digest.js
 *
 * This script:
 * 1. Reads Hugo digest files from content/digest/
 * 2. Transforms frontmatter to the new schema
 * 3. Converts Hugo shortcodes to plain markdown
 * 4. Writes MDX files to apps/blog/content/periodics/
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../content/digest');
const DEST_DIR = path.join(__dirname, '../apps/blog/content/periodics');

/**
 * Extract issue number from filename like "digest-001.md"
 */
function extractIssueNumber(filename) {
  const match = filename.match(/digest-(\d+)\.md$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterLines = match[1].split('\n');
  const frontmatter = {};

  let currentKey = null;
  let currentValue = '';
  let inArray = false;
  let arrayValues = [];

  for (const line of frontmatterLines) {
    // Check if this is a key-value pair
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);

    if (keyMatch) {
      // Save previous key if exists
      if (currentKey) {
        if (inArray) {
          frontmatter[currentKey] = arrayValues;
        } else {
          frontmatter[currentKey] = currentValue.trim().replace(/^["']|["']$/g, '');
        }
      }

      currentKey = keyMatch[1];
      currentValue = keyMatch[2];
      inArray = false;
      arrayValues = [];

      // Check if value starts an array
      if (currentValue === '' || currentValue === '[]') {
        inArray = true;
        arrayValues = [];
      }
    } else if (line.match(/^- /)) {
      // This is an array item
      inArray = true;
      arrayValues.push(line.replace(/^- /, '').trim());
    }
  }

  // Save the last key
  if (currentKey) {
    if (inArray) {
      frontmatter[currentKey] = arrayValues;
    } else {
      frontmatter[currentKey] = currentValue.trim().replace(/^["']|["']$/g, '');
    }
  }

  return { frontmatter, body: match[2] };
}

/**
 * Convert Hugo digest-item shortcode to plain markdown
 * Input: {{< digest-item "source"="url" "description"="desc" >}}
 * Output: removes the shortcode wrapper, keeps the content
 */
function convertShortcodes(content) {
  // Remove digest-item shortcodes - these are wrappers around content
  // Pattern: {{< digest-item "source"="..." "description"="..." >}}
  content = content.replace(/\{\{<\s*digest-item[^>]*>\}\}/g, '');
  content = content.replace(/\{\{<\s*\/digest-item\s*>\}\}/g, '');

  // Convert box-highlight shortcodes to blockquotes
  // {{< box-highlight type="info">}} ... {{< /box-highlight >}}
  content = content.replace(/\{\{<\s*box-highlight[^>]*>\}\}/g, '> **Note:**\n>\n');
  content = content.replace(/\{\{<\s*\/box-highlight\s*>\}\}/g, '');

  return content;
}

/**
 * Generate new frontmatter for MDX
 */
function generateFrontmatter(oldFrontmatter, issueNumber, filename) {
  // Extract date - Hugo uses ISO format with timezone
  let date = oldFrontmatter.date || '';
  // Convert "2020-09-25T17:10:38-04:00" to "2020-09-25"
  if (date && date.includes('T')) {
    date = date.split('T')[0];
  }

  // Map old categories/tags to topics
  const topics = [];
  const tags = oldFrontmatter.tags || [];
  const categories = oldFrontmatter.categories || [];

  // Map known tags to new topic values
  const tagMapping = {
    '技术新闻': 'technical',
    'technical': 'technical',
    'ai': 'ai',
    'product': 'product',
    'career': 'career',
    'research': 'research',
    'design': 'design',
    'learning': 'learning',
  };

  for (const tag of [...tags, ...categories]) {
    const mapped = tagMapping[tag.toLowerCase()] || tagMapping[tag];
    if (mapped && !topics.includes(mapped)) {
      topics.push(mapped);
    }
  }

  // Default to technical if no topics mapped
  if (topics.length === 0) {
    topics.push('technical');
  }

  // Create title
  const title = oldFrontmatter.title || `Digest ${String(issueNumber).padStart(3, '0')}`;

  // Check if draft
  const isDraft = oldFrontmatter.draft === 'true' || oldFrontmatter.draft === true;

  const newFrontmatter = {
    title: title,
    description: `技术阅读笔记 #${issueNumber}`,
    date: date,
    issue: issueNumber,
    type: 'digest',
    topics: topics,
    lang: 'zh',
  };

  if (isDraft) {
    newFrontmatter.draft = true;
  }

  return newFrontmatter;
}

/**
 * Serialize frontmatter to YAML string
 */
function serializeFrontmatter(frontmatter) {
  const lines = ['---'];

  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.join(', ')}]`);
    } else if (typeof value === 'number') {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else {
      // Escape quotes in strings
      const escapedValue = value.includes('"') ? `'${value}'` : `"${value}"`;
      lines.push(`${key}: ${escapedValue}`);
    }
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Process a single digest file
 */
function processDigestFile(sourceFile) {
  const filename = path.basename(sourceFile);

  // Skip index files
  if (filename.startsWith('_index')) {
    console.log(`Skipping index file: ${filename}`);
    return null;
  }

  const issueNumber = extractIssueNumber(filename);

  // Handle non-standard filenames like tech_blog_crowdcast_io.md
  if (issueNumber === null) {
    console.log(`Skipping non-standard file: ${filename}`);
    return null;
  }

  console.log(`Processing: ${filename} (Issue #${issueNumber})`);

  const content = fs.readFileSync(sourceFile, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(content);

  // Generate new frontmatter
  const newFrontmatter = generateFrontmatter(frontmatter, issueNumber, filename);

  // Convert shortcodes in body
  const convertedBody = convertShortcodes(body);

  // Combine frontmatter and body
  const newContent = serializeFrontmatter(newFrontmatter) + '\n' + convertedBody;

  // Generate new filename
  const newFilename = `digest-${String(issueNumber).padStart(3, '0')}.mdx`;

  return {
    filename: newFilename,
    content: newContent,
    issueNumber,
  };
}

/**
 * Main migration function
 */
function migrate() {
  console.log('Starting digest migration...');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);
  console.log('');

  // Ensure destination directory exists
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  // Get all source files
  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const sourceFile = path.join(SOURCE_DIR, file);
    const result = processDigestFile(sourceFile);

    if (result) {
      const destFile = path.join(DEST_DIR, result.filename);
      fs.writeFileSync(destFile, result.content, 'utf-8');
      console.log(`  -> Written: ${result.filename}`);
      processed++;
    } else {
      skipped++;
    }
  }

  console.log('');
  console.log(`Migration complete!`);
  console.log(`  Processed: ${processed} files`);
  console.log(`  Skipped: ${skipped} files`);
}

// Run migration
migrate();
