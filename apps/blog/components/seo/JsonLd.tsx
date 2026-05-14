import { serializeJsonLd } from '@/lib/jsonld';

interface JsonLdProps {
  data: unknown;
}

/**
 * Server-rendered <script type="application/ld+json"> tag.
 *
 * Use one component per schema graph. Embedding multiple top-level
 * schemas inside a single script is also valid, but separating them
 * keeps individual schemas debuggable in tools like the Rich Results
 * Test.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
