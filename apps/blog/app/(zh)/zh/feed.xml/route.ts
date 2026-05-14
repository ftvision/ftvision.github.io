import { buildAtomFeed } from '@/lib/feed';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildAtomFeed('zh'), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
