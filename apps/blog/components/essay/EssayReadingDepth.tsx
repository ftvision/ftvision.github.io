import type { ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { EssayReadingDepth as EssayReadingDepthData } from '@/lib/essay-reading';
import { mdxOptions } from '@/lib/mdx-options';
import { getMDXComponents } from '@/components/mdx/MDXComponents';
import { PassContent, ReadingDepth } from '@/components/content/ReadingDepth';

export interface EssayReadingDepthProps {
  readingDepth: EssayReadingDepthData;
  full: ReactNode;
}

export function EssayReadingDepth({ readingDepth, full }: EssayReadingDepthProps) {
  const mdxComponents = getMDXComponents();

  return (
    <ReadingDepth
      defaultPass={readingDepth.defaultPass}
      passCopy={readingDepth.passCopy}
    >
      {readingDepth.passes.spine ? (
        <PassContent pass="spine">
          <MDXRemote
            source={readingDepth.passes.spine}
            components={mdxComponents}
            options={{ mdxOptions }}
          />
        </PassContent>
      ) : null}

      {readingDepth.passes.argument ? (
        <PassContent pass="argument">
          <MDXRemote
            source={readingDepth.passes.argument}
            components={mdxComponents}
            options={{ mdxOptions }}
          />
        </PassContent>
      ) : null}

      <PassContent pass="full">{full}</PassContent>
    </ReadingDepth>
  );
}
