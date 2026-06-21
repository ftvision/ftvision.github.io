import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ReadingPass, ReadingPassCopy } from '@/components/content/ReadingDepth';

const ESSAY_READING_DIRECTORY = path.join(process.cwd(), 'content', 'essay-reading');

type CondensedReadingPass = Exclude<ReadingPass, 'full'>;

export interface EssayReadingDepth {
  slug: string;
  defaultPass: ReadingPass;
  passCopy: Partial<Record<ReadingPass, Partial<ReadingPassCopy>>>;
  passes: Partial<Record<CondensedReadingPass, string>>;
}

interface EssayReadingFrontmatter {
  defaultPass?: ReadingPass;
  passes?: Partial<Record<ReadingPass, Partial<ReadingPassCopy>>>;
}

const PASS_MARKER = /<!--\s*reading-pass:(spine|argument)\s*-->/g;

export function getEssayReadingDepth(slug: string): EssayReadingDepth | null {
  const filePath = path.join(ESSAY_READING_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = data as EssayReadingFrontmatter;
    const passes = splitReadingPasses(content);

    if (!passes.spine && !passes.argument) {
      return null;
    }

    return {
      slug,
      defaultPass: frontmatter.defaultPass ?? 'full',
      passCopy: frontmatter.passes ?? {},
      passes,
    };
  } catch (error) {
    console.error(`Error parsing essay reading depth ${slug}:`, error);
    return null;
  }
}

function splitReadingPasses(
  content: string
): Partial<Record<CondensedReadingPass, string>> {
  const matches = Array.from(content.matchAll(PASS_MARKER));
  const passes: Partial<Record<CondensedReadingPass, string>> = {};

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const pass = match[1] as CondensedReadingPass;
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? content.length;
    const passContent = content.slice(start, end).trim();

    if (passContent) {
      passes[pass] = passContent;
    }
  }

  return passes;
}
