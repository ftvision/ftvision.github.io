import * as React from "react";
import { cn } from "@/lib/utils";

interface EvalCollection {
  title: string;
  status: string;
  question: string;
  tests: string[];
  output: string;
  toneClass: string;
}

const COLLECTIONS: EvalCollection[] = [
  {
    title: "Writing evals",
    status: "First collection",
    question:
      "Given the same source text and editing prompt, what job does each model think it is doing?",
    tests: [
      "emotional revision",
      "argument critique",
      "explanation rewrite",
      "voice-preserving line edit",
      "bilingual localization",
      "scratch generation",
    ],
    output: "Original text + prompt + model outputs + human reading",
    toneClass:
      "text-[oklch(48%_0.11_155)] [[data-mode=dark]_&]:text-[oklch(72%_0.10_155)]",
  },
  {
    title: "Programming evals",
    status: "Second collection",
    question:
      "Given the same product or engineering task, where does each model perceive, execute, and verify well or badly?",
    tests: [
      "frontend diagnosis",
      "implementation from spec",
      "debugging from error logs",
      "repo navigation",
      "refactor judgment",
      "verification loop",
    ],
    output: "Task brief + repo state + model plan + diff + validation result",
    toneClass:
      "text-[oklch(48%_0.11_248)] [[data-mode=dark]_&]:text-[oklch(72%_0.10_248)]",
  },
];

function CollectionCard({ collection }: { collection: EvalCollection }) {
  return (
    <section
      className={cn(
        "min-w-0 border-t border-current pt-4",
        collection.toneClass,
      )}
    >
      <p className="type-overline mb-2 text-current">{collection.status}</p>
      <h3 className="mb-4 font-serif text-2xl font-semibold leading-tight text-figure-primary">
        {collection.title}
      </h3>

      <dl className="space-y-4 text-body-sm">
        <div>
          <dt className="type-overline mb-1 text-figure-muted">
            Core question
          </dt>
          <dd className="text-figure-primary">{collection.question}</dd>
        </div>
        <div>
          <dt className="type-overline mb-2 text-figure-muted">Test genres</dt>
          <dd>
            <ul className="grid grid-cols-1 gap-1 text-figure-secondary sm:grid-cols-2">
              {collection.tests.map((test) => (
                <li key={test}>{test}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="type-overline mb-1 text-figure-muted">
            Evidence shape
          </dt>
          <dd className="text-figure-primary">{collection.output}</dd>
        </div>
      </dl>
    </section>
  );
}

export function ProviderEvalCollections() {
  return (
    <aside
      aria-labelledby="provider-eval-collections-title"
      className="my-10 border-y border-border py-6 lg:w-[calc(100%+280px)]"
    >
      <div className="mb-6 max-w-[42rem]">
        <p className="type-overline mb-2 text-figure-muted">
          Evidence lives in collections
        </p>
        <h2
          id="provider-eval-collections-title"
          className="font-serif text-2xl font-semibold leading-tight tracking-normal text-figure-primary md:text-3xl"
        >
          The essay is the map. The eval collections are the proof.
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-8">
        {COLLECTIONS.map((collection) => (
          <CollectionCard key={collection.title} collection={collection} />
        ))}
      </div>
    </aside>
  );
}
