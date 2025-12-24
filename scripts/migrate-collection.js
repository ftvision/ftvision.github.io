#!/usr/bin/env node

/**
 * Migration script to convert Hugo collection content to MDX references format.
 *
 * Usage: node scripts/migrate-collection.js
 *
 * This script:
 * 1. Reads Hugo collection files from content/collection/
 * 2. Transforms frontmatter to the reference schema
 * 3. Converts Hugo shortcodes to plain markdown
 * 4. Writes MDX files to apps/blog/content/references/
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../content/collection');
const DEST_DIR = path.join(__dirname, '../apps/blog/content/references');

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
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);

    if (keyMatch) {
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

      if (currentValue === '' || currentValue === '[]') {
        inArray = true;
        arrayValues = [];
      }
    } else if (line.match(/^- /)) {
      inArray = true;
      arrayValues.push(line.replace(/^- /, '').trim());
    }
  }

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
 * Convert Hugo shortcodes to plain markdown
 */
function convertShortcodes(content) {
  // Convert box-highlight shortcodes to blockquotes
  content = content.replace(/\{\{<\s*box-highlight[^>]*>\}\}/g, '> **Note:**\n>\n');
  content = content.replace(/\{\{<\s*\/box-highlight\s*>\}\}/g, '');

  return content;
}

/**
 * Determine language from filename
 * vision-100.md -> zh
 * vision-100.en.md -> en
 */
function getLanguageFromFilename(filename) {
  if (filename.includes('.en.md')) {
    return 'en';
  }
  return 'zh';
}

/**
 * Generate slug from filename
 */
function getSlugFromFilename(filename) {
  // Remove .md and .en.md suffixes
  let slug = filename.replace(/\.en\.md$/, '').replace(/\.md$/, '');
  // Replace underscores with hyphens
  slug = slug.replace(/_/g, '-');
  return slug;
}

/**
 * Map old tags to new topics
 */
function mapTagsToTopics(tags) {
  const topics = [];
  const tagMapping = {
    '心理学': 'research',
    '视觉科学': 'research',
    '科普': 'learning',
    'System Design': 'technical',
    'Interview': 'career',
    'technical': 'technical',
    'research': 'research',
    'career': 'career',
    'learning': 'learning',
  };

  for (const tag of tags) {
    const mapped = tagMapping[tag];
    if (mapped && !topics.includes(mapped)) {
      topics.push(mapped);
    }
  }

  // Default to technical if no topics mapped
  if (topics.length === 0) {
    topics.push('technical');
  }

  return topics;
}

/**
 * Determine category based on content and filename
 */
function determineCategory(filename, tags) {
  const filenameLower = filename.toLowerCase();

  if (filenameLower.includes('paper') || filenameLower.includes('vision-100')) {
    return 'bibliography';
  }
  if (filenameLower.includes('interview') || filenameLower.includes('resource')) {
    return 'resources';
  }
  if (filenameLower.includes('reading') || filenameLower.includes('book')) {
    return 'reading-list';
  }
  if (filenameLower.includes('tool')) {
    return 'tools';
  }

  // Default based on tags
  if (tags.some(t => t.toLowerCase().includes('科普') || t.toLowerCase().includes('writing'))) {
    return 'reading-list';
  }

  return 'resources';
}

/**
 * Count items in the content (approximate based on list items)
 */
function countItems(body) {
  const listItemMatches = body.match(/^[-*]\s+/gm);
  const numberedMatches = body.match(/^\d+\.\s+/gm);
  const tableRowMatches = body.match(/^\|\s*\d+\s*\|/gm);

  let count = 0;
  if (listItemMatches) count += listItemMatches.length;
  if (numberedMatches) count += numberedMatches.length;
  if (tableRowMatches) count += tableRowMatches.length;

  return count > 0 ? count : undefined;
}

/**
 * Generate new frontmatter for MDX reference
 */
function generateFrontmatter(oldFrontmatter, filename, body) {
  const tags = oldFrontmatter.tags || [];
  const lang = getLanguageFromFilename(filename);
  const category = determineCategory(filename, tags);
  const topics = mapTagsToTopics(tags);

  // Extract date
  let date = oldFrontmatter.date || '2024-01-01';
  if (date.includes('T')) {
    date = date.split('T')[0];
  }

  const title = oldFrontmatter.title || getSlugFromFilename(filename);
  const itemCount = countItems(body);
  const isDraft = oldFrontmatter.draft === 'true' || oldFrontmatter.draft === true;

  const newFrontmatter = {
    title: title,
    description: `${title} - curated collection`,
    date: date,
    category: category,
    topics: topics,
    lang: lang,
  };

  if (itemCount) {
    newFrontmatter.itemCount = itemCount;
  }

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
      const escapedValue = value.includes('"') ? `'${value}'` : `"${value}"`;
      lines.push(`${key}: ${escapedValue}`);
    }
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Process a single collection file
 */
function processCollectionFile(sourceFile) {
  const filename = path.basename(sourceFile);

  // Skip index files
  if (filename.startsWith('_index')) {
    console.log(`Skipping index file: ${filename}`);
    return null;
  }

  console.log(`Processing: ${filename}`);

  const content = fs.readFileSync(sourceFile, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(content);

  // Generate new frontmatter
  const newFrontmatter = generateFrontmatter(frontmatter, filename, body);

  // Convert shortcodes in body
  const convertedBody = convertShortcodes(body);

  // Combine frontmatter and body
  const newContent = serializeFrontmatter(newFrontmatter) + '\n' + convertedBody;

  // Generate new filename
  const slug = getSlugFromFilename(filename);
  const lang = getLanguageFromFilename(filename);
  const newFilename = lang === 'zh' ? `${slug}-zh.mdx` : `${slug}.mdx`;

  return {
    filename: newFilename,
    content: newContent,
    slug,
    lang,
  };
}

/**
 * Main migration function
 */
function migrate() {
  console.log('Starting collection to reference migration...');
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
    const result = processCollectionFile(sourceFile);

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
