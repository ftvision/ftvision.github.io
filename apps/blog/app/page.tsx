import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen p-inset-lg">
      <div className="max-w-2xl mx-auto py-section-lg">
        <h1 className="type-h1 mb-stack-md">Essays</h1>
        <p className="type-body text-figure-secondary mb-stack-lg">
          Personal essays and writing on technology, AI, product thinking, and career.
        </p>
        <nav className="flex gap-inline-md">
          <Link
            href="/essays"
            className="inline-flex items-center px-inset-md py-inset-sm bg-action-primary text-figure-inverse rounded transition-hover hover:bg-action-primary-hover"
          >
            Browse Essays
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-inset-md py-inset-sm border border-border text-figure-primary rounded transition-hover hover:bg-ground-secondary"
          >
            About
          </Link>
        </nav>
      </div>
    </main>
  );
}
