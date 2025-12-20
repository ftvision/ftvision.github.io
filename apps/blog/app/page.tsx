import Link from 'next/link';
import { getRecentEssays } from '@/lib/essays';
import { EssayList } from '@/components/essay';
import { Button } from '@blog/ui';

export default function HomePage() {
  // Get 5 most recent essays for the home page
  const recentEssays = getRecentEssays(5);

  return (
    <main className="mx-auto max-w-4xl px-inset-lg py-12">
      {/* Hero section */}
      <section className="mb-16 text-center">
        <h1 className="text-display font-serif text-figure-primary mb-4">
          Essays
        </h1>
        <p className="text-body-lg text-figure-secondary max-w-2xl mx-auto mb-8">
          Personal essays and writing on technology, AI, product thinking, and
          career development.
        </p>
        <nav className="flex justify-center gap-4">
          <Link href="/essays">
            <Button variant="primary" size="md">
              Browse All Essays
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="md">
              About
            </Button>
          </Link>
        </nav>
      </section>

      {/* Recent essays section */}
      {recentEssays.length > 0 && (
        <section>
          <header className="mb-6 flex items-center justify-between">
            <h2 className="text-heading-lg font-serif text-figure-primary">
              Recent Essays
            </h2>
            <Link
              href="/essays"
              className="text-body-sm text-link hover:text-link-hover"
            >
              View all →
            </Link>
          </header>
          <EssayList essays={recentEssays} layout="list" variant="default" />
        </section>
      )}
    </main>
  );
}
