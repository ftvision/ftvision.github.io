import type { ReactNode } from "react";

export type EditorialLanguage = "en" | "zh";

type EditorialBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "rule" }
  | { type: "ordered-list"; items: Array<{ href: string; text: string }> };

function stripFrontmatter(source: string) {
  return source.replace(/^---\s*[\s\S]*?\n---\s*/, "").trim();
}

function slugifyHeading(text: string) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[“”‘’'"():;,，。；：！？?!]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderInline(source: string, keyPrefix: string): ReactNode[] {
  const inlinePattern =
    /<Note>([\s\S]*?)<\/Note>|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const output: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let tokenIndex = 0;

  while ((match = inlinePattern.exec(source)) !== null) {
    if (match.index > cursor) {
      output.push(source.slice(cursor, match.index));
    }

    const key = `${keyPrefix}-${tokenIndex}`;
    if (match[1] !== undefined) {
      output.push(
        <span className="editorial-mdx__note" key={key} role="note">
          <span>{renderInline(match[1], `${key}-note`)}</span>
        </span>,
      );
    } else if (match[2] !== undefined && match[3] !== undefined) {
      const href = match[3];
      output.push(
        <a
          href={href}
          key={key}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {match[2]}
        </a>,
      );
    } else if (match[4] !== undefined) {
      output.push(
        <strong key={key}>{renderInline(match[4], `${key}-strong`)}</strong>,
      );
    } else if (match[5] !== undefined) {
      output.push(<em key={key}>{renderInline(match[5], `${key}-em`)}</em>);
    }

    cursor = inlinePattern.lastIndex;
    tokenIndex += 1;
  }

  if (cursor < source.length) {
    output.push(source.slice(cursor));
  }

  return output;
}

export function parseEditorialMdx(source: string): EditorialBlock[] {
  const lines = stripFrontmatter(source).split("\n");
  const blocks: EditorialBlock[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({
      type: "paragraph",
      text: paragraph.map((line) => line.trim()).join(" "),
    });
    paragraph = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("<!--")) {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("<ol")) {
      flushParagraph();
      const listLines = [trimmed];
      while (
        !listLines[listLines.length - 1]?.includes("</ol>") &&
        index < lines.length - 1
      ) {
        index += 1;
        listLines.push(lines[index].trim());
      }
      const listSource = listLines.join(" ");
      const items = Array.from(
        listSource.matchAll(/<li><a href="([^"]+)">([\s\S]*?)<\/a><\/li>/g),
        (item) => ({ href: item[1], text: item[2] }),
      );
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      continue;
    }

    if (/^-{3,}$/.test(trimmed)) {
      flushParagraph();
      blocks.push({ type: "rule" });
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

export function getReadingPassSource(
  source: string,
  pass: "spine" | "argument",
) {
  const marker = `<!-- reading-pass:${pass} -->`;
  const otherMarker =
    pass === "spine"
      ? "<!-- reading-pass:argument -->"
      : "<!-- reading-pass:spine -->";
  const start = source.indexOf(marker);
  if (start === -1) return "";

  const contentStart = start + marker.length;
  const nextMarker = source.indexOf(otherMarker, contentStart);
  return source
    .slice(contentStart, nextMarker === -1 ? undefined : nextMarker)
    .trim();
}

export function deriveReadingPass(
  source: string,
  pass: "spine" | "argument",
): EditorialBlock[] {
  const blocks = parseEditorialMdx(source);
  const listIndex = blocks.findIndex((block) => block.type === "ordered-list");
  if (listIndex === -1) return blocks;

  const opening = blocks.slice(0, listIndex + 1);
  if (pass === "spine") return opening;

  const argument = [...opening];
  for (let index = listIndex + 1; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.type !== "heading" || !/^\d+\.\s/.test(block.text)) continue;

    argument.push(block);
    const firstParagraph = blocks
      .slice(index + 1)
      .find((candidate) => candidate.type === "paragraph");
    if (firstParagraph) argument.push(firstParagraph);
  }

  return argument;
}

function EditorialHeading({
  block,
  index,
}: {
  block: Extract<EditorialBlock, { type: "heading" }>;
  index: number;
}) {
  const numbered = block.text.match(/^(\d+)\.\s+(.+)$/);
  const id = slugifyHeading(block.text);

  if (numbered) {
    return (
      <h2 className="editorial-mdx__commandment" id={id}>
        <span>{numbered[1].padStart(2, "0")}</span>
        <span>{renderInline(numbered[2], `heading-${index}`)}</span>
      </h2>
    );
  }

  const Heading = block.level === 2 ? "h2" : "h3";
  return (
    <Heading className="editorial-mdx__heading" id={id}>
      {renderInline(block.text, `heading-${index}`)}
    </Heading>
  );
}

export function EditorialMdxReader({
  source,
  blocks,
  language,
}: {
  source?: string;
  blocks?: EditorialBlock[];
  language: EditorialLanguage;
}) {
  const content = blocks ?? parseEditorialMdx(source ?? "");

  return (
    <article
      className="editorial-mdx"
      lang={language === "zh" ? "zh-Hans" : "en"}
    >
      {content.map((block, index) => {
        if (block.type === "heading") {
          return (
            <EditorialHeading
              block={block}
              index={index}
              key={`${block.text}-${index}`}
            />
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol className="editorial-mdx__index" key={`list-${index}`}>
              {block.items.map((item, itemIndex) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                    <strong>
                      {renderInline(item.text, `list-${index}-${itemIndex}`)}
                    </strong>
                  </a>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "rule") {
          return <hr key={`rule-${index}`} />;
        }

        return (
          <p key={`paragraph-${index}`}>
            {renderInline(block.text, `paragraph-${index}`)}
          </p>
        );
      })}
    </article>
  );
}
