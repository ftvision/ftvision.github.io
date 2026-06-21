import * as React from "react";
import { cn } from "@/lib/utils";

type AxisKey = "fidelity" | "force" | "verification";

interface ModelTemperament {
  name: string;
  role: string;
  sees: string;
  firstMove: string;
  bestUse: string;
  failure: string;
  software: string;
  toneClass: string;
  axis: Record<AxisKey, number>;
}

const AXES: { key: AxisKey; label: string }[] = [
  { key: "fidelity", label: "Fidelity" },
  { key: "force", label: "Force" },
  { key: "verification", label: "Verification" },
];

const MODELS: ModelTemperament[] = [
  {
    name: "Gemini",
    role: "Affective editor",
    sees: "Tone problem",
    firstMove: "Offers registers",
    bestUse: "Emotion, memory, family, grief",
    failure: "Comforts a weak argument",
    software: "Visual diagnosis",
    toneClass:
      "text-[oklch(48%_0.11_155)] [[data-mode=dark]_&]:text-[oklch(72%_0.10_155)]",
    axis: {
      fidelity: 3,
      force: 1,
      verification: 1,
    },
  },
  {
    name: "Claude",
    role: "Argumentative editor",
    sees: "Structural problem",
    firstMove: "Finds the weak link",
    bestUse: "Opinion, critique, explanation",
    failure: "Cuts into fragile emotion",
    software: "Heavy implementation",
    toneClass:
      "text-[oklch(46%_0.13_28)] [[data-mode=dark]_&]:text-[oklch(72%_0.10_28)]",
    axis: {
      fidelity: 1,
      force: 3,
      verification: 2,
    },
  },
  {
    name: "GPT / Codex",
    role: "Operational editor",
    sees: "Delivery problem",
    firstMove: "Returns a finished pass",
    bestUse: "Files, sources, UI, tests",
    failure: "Optimizes artifact over sentence",
    software: "Proof loop",
    toneClass:
      "text-[oklch(48%_0.11_248)] [[data-mode=dark]_&]:text-[oklch(72%_0.10_248)]",
    axis: {
      fidelity: 2,
      force: 2,
      verification: 3,
    },
  },
];

const ROWS: {
  label: string;
  value: keyof Pick<
    ModelTemperament,
    "sees" | "firstMove" | "bestUse" | "failure" | "software"
  >;
}[] = [
  { label: "Sees the job as", value: "sees" },
  { label: "First move", value: "firstMove" },
  { label: "Use when", value: "bestUse" },
  { label: "Watch for", value: "failure" },
  { label: "In software", value: "software" },
];

function AxisBar({ value }: { value: number }) {
  return (
    <div className="grid h-1.5 grid-cols-3 gap-1" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={cn(
            "h-full rounded-full",
            index < value ? "bg-current" : "bg-border-subtle",
          )}
        />
      ))}
    </div>
  );
}

function ModelColumn({ model }: { model: ModelTemperament }) {
  return (
    <section
      aria-label={`${model.name} temperament`}
      className={cn("border-t border-current pt-4", "min-w-0", model.toneClass)}
    >
      <div className="mb-5">
        <p className="type-overline mb-1 text-current">{model.role}</p>
        <h3 className="font-serif text-2xl font-semibold leading-tight text-figure-primary">
          {model.name}
        </h3>
      </div>

      <dl className="space-y-4 text-body-sm">
        <div>
          <dt className="type-overline mb-1 text-figure-muted">
            Sees the job as
          </dt>
          <dd className="font-medium text-figure-primary">{model.sees}</dd>
        </div>
        <div>
          <dt className="type-overline mb-1 text-figure-muted">First move</dt>
          <dd className="font-medium text-figure-primary">{model.firstMove}</dd>
        </div>
        <div>
          <dt className="type-overline mb-1 text-figure-muted">Use when</dt>
          <dd className="text-figure-secondary">{model.bestUse}</dd>
        </div>
        <div>
          <dt className="type-overline mb-1 text-figure-muted">Watch for</dt>
          <dd className="text-figure-secondary">{model.failure}</dd>
        </div>
        <div>
          <dt className="type-overline mb-1 text-figure-muted">In software</dt>
          <dd className="text-figure-secondary">{model.software}</dd>
        </div>
      </dl>

      <div className="mt-6 space-y-3" aria-label={`${model.name} axis scores`}>
        {AXES.map((axis) => (
          <div
            key={axis.key}
            className="grid grid-cols-[6.75rem_1fr] items-center gap-3"
          >
            <span className="type-overline text-figure-muted">
              {axis.label}
            </span>
            <AxisBar value={model.axis[axis.key]} />
          </div>
        ))}
      </div>
    </section>
  );
}

function DesktopMatrix() {
  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-[8rem_repeat(3,minmax(0,1fr))]">
        <div className="border-b border-border-subtle pb-4" />
        {MODELS.map((model) => (
          <div
            key={model.name}
            className={cn("border-b border-current pb-4 pl-5", model.toneClass)}
          >
            <p className="type-overline mb-1 text-current">{model.role}</p>
            <h3 className="font-serif text-2xl font-semibold leading-tight text-figure-primary">
              {model.name}
            </h3>
          </div>
        ))}

        {ROWS.map((row) => (
          <React.Fragment key={row.label}>
            <div className="border-b border-border-subtle py-4 pr-4">
              <p className="type-overline text-figure-muted">{row.label}</p>
            </div>
            {MODELS.map((model) => (
              <div
                key={`${row.label}-${model.name}`}
                className="border-b border-border-subtle py-4 pl-5 pr-3 text-body-sm text-figure-primary"
              >
                {model[row.value]}
              </div>
            ))}
          </React.Fragment>
        ))}

        <div className="pt-5 pr-4">
          <p className="type-overline text-figure-muted">Temperament</p>
        </div>
        {MODELS.map((model) => (
          <div
            key={`${model.name}-axis`}
            className={cn("space-y-3 pt-5 pl-5 pr-3", model.toneClass)}
            aria-label={`${model.name} axis scores`}
          >
            {AXES.map((axis) => (
              <div
                key={axis.key}
                className="grid grid-cols-[6.25rem_1fr] items-center gap-3"
              >
                <span className="type-overline text-figure-muted">
                  {axis.label}
                </span>
                <AxisBar value={model.axis[axis.key]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ModelTemperamentMap() {
  return (
    <aside
      aria-labelledby="model-temperament-map-title"
      className="my-10 border-y border-border py-6 lg:w-[calc(100%+280px)]"
    >
      <div className="mb-6">
        <p className="type-overline mb-2 text-figure-muted">
          One prompt, three theories of the job
        </p>
        <h2
          id="model-temperament-map-title"
          className="font-serif text-2xl font-semibold leading-tight tracking-normal text-figure-primary md:text-3xl"
        >
          Pick the model by temperament, not brand.
        </h2>
      </div>

      <DesktopMatrix />

      <div className="grid gap-8 md:hidden">
        {MODELS.map((model) => (
          <ModelColumn key={model.name} model={model} />
        ))}
      </div>
    </aside>
  );
}
