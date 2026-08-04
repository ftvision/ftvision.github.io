import { useState } from "react";
import {
  EditorialClassification,
  EditorialLabel,
} from "@blog/ui/editorial-classification";

import "./editorial-typeface-system-prototype.css";

type SupportingTypeface = "source-serif" | "newsreader" | "brygada";

const supportingOptions = [
  {
    id: "source-serif",
    label: "Source Serif 4",
    note: "Sober hierarchy",
  },
  {
    id: "newsreader",
    label: "Newsreader",
    note: "Fluid editorial rhythm",
  },
  {
    id: "brygada",
    label: "Brygada 1918",
    note: "Historical counterpoint",
  },
] as const satisfies ReadonlyArray<{
  id: SupportingTypeface;
  label: string;
  note: string;
}>;

const catalogueEntries = [
  {
    title: "Stop Being Your Own Rejection Letter",
    description:
      "A lesson about the opportunities we decline before anyone has had the chance to judge us.",
    date: "June 16",
  },
  {
    title: "Ship the Core First",
    description:
      "Three months, 300+ pull requests, one episode, and no evidence that anyone wanted it.",
    date: "June 16",
  },
  {
    title: "The Ten Commandments for Building Product",
    description:
      "Ten product mistakes and the self-deceptions each commandment guards against.",
    date: "June 15",
  },
  {
    title: "Access Denied Is Not a Moat",
    description:
      "Access denial can buy time, but it teaches rivals that dependency is a vulnerability.",
    date: "June 14",
  },
] as const;

export function EditorialTypefaceSystemPrototype() {
  const [supportingTypeface, setSupportingTypeface] =
    useState<SupportingTypeface>("newsreader");

  const selected = supportingOptions.find(
    (option) => option.id === supportingTypeface,
  );

  return (
    <div className="type-system" data-supporting-typeface={supportingTypeface}>
      <header className="type-system__masthead">
        <a className="type-system__wordmark" href="/">
          Algo Mind
        </a>
        <nav aria-label="Primary navigation">
          <a aria-current="page" href="/essays/">
            Essays
          </a>
          <a href="/series/">Series</a>
          <a href="/about/">About</a>
        </nav>
        <a href="/zh/" lang="zh">
          中文
        </a>
      </header>

      <aside
        aria-label="Supporting typeface comparison"
        className="type-system__pairing-lab"
        data-testid="supporting-typeface-switcher"
      >
        <div className="type-system__pairing-summary">
          <span>Display</span>
          <strong>Vollkorn</strong>
          <span>Supporting</span>
          <strong>{selected?.label}</strong>
        </div>
        <div
          aria-label="Choose a supporting typeface"
          className="type-system__pairing-options"
          role="group"
        >
          {supportingOptions.map((option) => (
            <button
              aria-label={option.label}
              aria-pressed={supportingTypeface === option.id}
              data-supporting-option={option.id}
              key={option.id}
              type="button"
              onClick={() => setSupportingTypeface(option.id)}
            >
              <span>{option.label}</span>
              <small>{option.note}</small>
            </button>
          ))}
        </div>
      </aside>

      <main className="type-system__specimens">
        <section
          aria-labelledby="reference-work-title"
          className="type-system__section type-system__reference"
        >
          <EditorialClassification
            className="type-system__classification"
            primary="Reference work"
            secondary="Vision science"
          />
          <div className="type-system__reference-lead">
            <div>
              <h1 id="reference-work-title">
                <span>100</span>
                Vision
                <br />
                Papers
              </h1>
            </div>
            <div className="type-system__reference-copy">
              <p className="type-system__deck">
                A working map of influential vision-science papers across
                physiology, psychophysics, and computational modeling.
              </p>
              <dl>
                <div>
                  <dt>Extent</dt>
                  <dd>100 papers</dd>
                </div>
                <div>
                  <dt>Coverage</dt>
                  <dd>1953—2001</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="type-system__section-sample">
            <h2>The field atlas</h2>
            <p>
              The original list becomes a navigable reference work: map,
              catalogue, and source method remain distinct reading modes.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="narrative-essay-title"
          className="type-system__section type-system__narrative"
        >
          <EditorialClassification
            className="type-system__classification"
            primary="Essay"
            secondary="Career"
          />
          <div className="type-system__narrative-grid">
            <h1 id="narrative-essay-title">
              Stop Being
              <br />
              Your Own
              <br />
              <em>Rejection</em> Letter
            </h1>
            <div className="type-system__narrative-copy">
              <p className="type-system__deck">
                In early 2024, a founding engineer at Cursor emailed me about
                being their ninth hire. I turned myself down without asking a
                single question.
              </p>
            </div>
          </div>
          <div className="type-system__section-sample">
            <h2>The email</h2>
            <p>
              The other side held the door open, and I shut it anyway — in
              writing, and left no room for doubt. I ran their screening for
              them and mailed the rejection to myself.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="commandments-title"
          className="type-system__section type-system__commandments"
        >
          <EditorialClassification
            className="type-system__classification"
            primary="Essay"
            secondary="Product · Bilingual"
          />
          <div className="type-system__bilingual-grid">
            <article lang="en">
              <h1 id="commandments-title">
                The Ten Commandments for Building Product
              </h1>
              <div className="type-system__commandment">
                <EditorialLabel className="type-system__label">
                  I
                </EditorialLabel>
                <h2>
                  You shall be honest about whether you are committed to the
                  product, or only in love with the idea.
                </h2>
                <p>
                  Building means enduring its pain yourself. You can delegate
                  execution; the grounding and the rejection cannot be
                  delegated.
                </p>
              </div>
            </article>
            <article lang="zh">
              <h1>产品十诫</h1>
              <div className="type-system__commandment">
                <EditorialLabel className="type-system__label">
                  01
                </EditorialLabel>
                <h2>
                  你要诚实面对：你是真心想做成一个产品，还是只是叶公好龙，喜欢“做产品”这个想法。
                </h2>
                <p>
                  执行可以委托，但扎根现实和承受拒绝不能委托：亲自搞清楚用户是谁，亲自去找他们，亲自卖你的产品。
                </p>
              </div>
            </article>
          </div>
        </section>

        <section
          aria-labelledby="catalogue-title"
          className="type-system__section type-system__catalogue"
        >
          <EditorialClassification
            className="type-system__classification"
            primary="Essay archive"
            secondary="Published 2026"
          />
          <h1 id="catalogue-title">Essays</h1>
          <ul>
            {catalogueEntries.map((entry) => (
              <li key={entry.title}>
                <div>
                  <h2>{entry.title}</h2>
                  <p>{entry.description}</p>
                </div>
                <time>{entry.date}</time>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="type-system__folio">
        <span>Algo Mind · Editorial type study</span>
        <span>Vollkorn display system</span>
      </footer>
    </div>
  );
}
