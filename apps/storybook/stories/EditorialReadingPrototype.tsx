import { useMemo, useState } from "react";

import {
  SUBWAY_LINES,
  VISION_100_PAPERS,
} from "../../blog/data/vision100-papers";
import { Vision100Map } from "../../blog/components/vision100/Vision100Map";

import "./editorial-reading-prototype.css";

type ReadingPage = "vision100" | "essay";
type VisionTopic = (typeof SUBWAY_LINES)[number]["id"];
type TopicSelection = "all" | VisionTopic;
type IndexOrder = "rank" | "chronology";
type VisionWorkspace = "explore" | "catalogue" | "method";
type ReadingTypeface =
  | "newsreader"
  | "brygada"
  | "fraunces"
  | "source-serif"
  | "instrument-serif"
  | "libre-caslon"
  | "vollkorn";

interface EditorialReadingPrototypeProps {
  initialPage?: ReadingPage;
  initialTypeface?: ReadingTypeface;
  showTypefaceLab?: boolean;
}

const typefaceOptions = [
  {
    id: "brygada",
    label: "Brygada 1918",
    note: "Historical, firm, institutional",
  },
  {
    id: "fraunces",
    label: "Fraunces Sharp",
    note: "Digital, expressive, sharply tuned",
  },
  {
    id: "source-serif",
    label: "Source Serif 4 Display",
    note: "Controlled, neutral, optically sized",
  },
  {
    id: "instrument-serif",
    label: "Instrument Serif",
    note: "Cut, eccentric, digitally engraved",
  },
  {
    id: "libre-caslon",
    label: "Libre Caslon Display",
    note: "Classical, open, title-page warmth",
  },
  {
    id: "vollkorn",
    label: "Vollkorn",
    note: "Dense, sturdy, editorial workhorse",
  },
] as const satisfies ReadonlyArray<{
  id: Exclude<ReadingTypeface, "newsreader">;
  label: string;
  note: string;
}>;

const cursorEmailImage = new URL(
  "../../blog/public/images/cursor-email-2024.png",
  import.meta.url,
).href;

const essaySections = [
  { id: "the-email", label: "The email" },
  { id: "a-bar-i-never-checked", label: "A bar I never checked" },
  { id: "how-it-actually-went", label: "How it actually went" },
  { id: "what-changed", label: "What changed" },
] as const;

function ReadingMasthead({
  currentPage,
  mode,
  onNavigate,
  onToggleMode,
}: {
  currentPage: ReadingPage;
  mode: "light" | "dark";
  onNavigate: (page: ReadingPage) => void;
  onToggleMode: () => void;
}) {
  return (
    <header className="reading-prototype__masthead">
      <a className="reading-prototype__wordmark" href="/">
        Algo Mind
      </a>

      <nav className="reading-prototype__nav" aria-label="Primary navigation">
        <a
          aria-current={currentPage === "essay" ? "page" : undefined}
          href="/essays/"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("essay");
          }}
        >
          Essays
        </a>
        <a
          aria-current={currentPage === "vision100" ? "page" : undefined}
          href="/series/"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("vision100");
          }}
        >
          Series
        </a>
        <a href="/about/">About</a>
      </nav>

      <div className="reading-prototype__utilities">
        <a href="/zh/" lang="zh">
          中文
        </a>
        <button type="button" onClick={onToggleMode}>
          {mode === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}

function TypefaceLab({
  typeface,
  onChange,
}: {
  typeface: Exclude<ReadingTypeface, "newsreader">;
  onChange: (typeface: Exclude<ReadingTypeface, "newsreader">) => void;
}) {
  const selected = typefaceOptions.find((option) => option.id === typeface);

  return (
    <aside
      aria-label="Heading typeface comparison"
      className="reading-typeface-lab"
      data-testid="typeface-switcher"
    >
      <div className="reading-typeface-lab__summary">
        <span>Typeface trial</span>
        <strong>{selected?.label}</strong>
        <small>{selected?.note} · body text unchanged</small>
      </div>
      <div
        aria-label="Choose a heading typeface"
        className="reading-typeface-lab__options"
        role="group"
      >
        {typefaceOptions.map((option) => (
          <button
            aria-pressed={typeface === option.id}
            data-typeface-option={option.id}
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
          >
            <span>{option.label}</span>
            <small>{option.note}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}

function Vision100Reference() {
  const [topic, setTopic] = useState<TopicSelection>("all");
  const [order, setOrder] = useState<IndexOrder>("rank");
  const [showAll, setShowAll] = useState(false);
  const [workspace, setWorkspace] = useState<VisionWorkspace>("explore");

  const papers = useMemo(() => {
    const filtered =
      topic === "all"
        ? VISION_100_PAPERS
        : VISION_100_PAPERS.filter((paper) => paper.topic === topic);

    return [...filtered].sort((left, right) => {
      if (order === "chronology") {
        return left.year - right.year || left.id - right.id;
      }
      return left.id - right.id;
    });
  }, [order, topic]);

  const visiblePapers = showAll ? papers : papers.slice(0, 12);
  const currentTopic =
    topic === "all"
      ? "Complete index"
      : SUBWAY_LINES.find((line) => line.id === topic)?.name;

  const selectTopic = (nextTopic: TopicSelection) => {
    setTopic(nextTopic);
    setShowAll(false);
  };

  return (
    <main className="reading-prototype__page vision-reference" lang="en">
      <header className="vision-reference__title-page">
        <div className="vision-reference__series-mark">
          <span>Series 02</span>
          <span>Bibliography</span>
        </div>
        <h1>
          <span>100</span>
          <span className="vision-reference__title">Vision Papers</span>
        </h1>
        <div className="vision-reference__premise">
          <p>
            A working map of influential vision-science papers across
            physiology, psychophysics, and computational modeling.
          </p>
          <a href="#vision-workspace">Open the field atlas</a>
        </div>
      </header>

      <dl className="vision-reference__ledger" aria-label="Series metadata">
        <div>
          <dt>Extent</dt>
          <dd>100 papers</dd>
        </div>
        <div>
          <dt>Coverage</dt>
          <dd>1953—2001</dd>
        </div>
        <div>
          <dt>First published</dt>
          <dd>2017</dd>
        </div>
        <div>
          <dt>Compiled by</dt>
          <dd>Yury Petrov</dd>
        </div>
      </dl>

      <section className="vision-reference__editorial-note">
        <h2>Editor’s note</h2>
        <div>
          <p>
            The original list was assembled around 2007 and later disappeared
            from its first home on the web. This edition preserves the list and
            reorganizes it as a navigable reference work.
          </p>
          <p>
            Its ranking is a guide to the eye, not a verdict on scientific
            merit. The value is the field it reveals: how questions about
            receptive fields, attention, motion, color, objects, and brain
            mapping accumulated across half a century.
          </p>
        </div>
        <aside>
          <span>Reading status</span>
          <strong>Approximately 80—85%</strong>
          <small>Author’s estimate, 2017</small>
        </aside>
      </section>

      <section className="vision-reference__workspace" id="vision-workspace">
        <header className="vision-reference__workspace-heading">
          <div>
            <span>Explorable edition</span>
            <h2>The field atlas</h2>
          </div>
          <div
            aria-label="Vision 100 reading surface"
            className="vision-reference__workspace-tabs"
            role="tablist"
          >
            {(
              [
                ["explore", "Explore map"],
                ["catalogue", "Catalogue"],
                ["method", "Method & limits"],
              ] as const
            ).map(([value, label]) => (
              <button
                aria-selected={workspace === value}
                key={value}
                role="tab"
                type="button"
                onClick={() => setWorkspace(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {workspace === "explore" ? (
          <div className="vision-reference__explorer">
            <aside aria-labelledby="vision-map-guide-title">
              <span>How to read it</span>
              <h3 id="vision-map-guide-title">A map, not a ranking</h3>
              <ol>
                <li>
                  <strong>Across</strong>
                  <span>Decades move from left to right.</span>
                </li>
                <li>
                  <strong>Down</strong>
                  <span>Each coloured route is a research subject.</span>
                </li>
                <li>
                  <strong>At a node</strong>
                  <span>Hover or focus to inspect one paper.</span>
                </li>
                <li>
                  <strong>To narrow</strong>
                  <span>Click a decade or subject; click again to clear.</span>
                </li>
              </ol>
              <p>
                Switch to Table inside the atlas when you need search, sortable
                columns, and complete citations.
              </p>
            </aside>
            <div className="vision-reference__map-shell">
              <Vision100Map defaultView="map" />
            </div>
          </div>
        ) : null}

        {workspace === "method" ? (
          <div className="vision-reference__method">
            <aside>
              <span>Source note</span>
              <strong>Yury Petrov · circa 2007</strong>
              <p>
                Preserved from the original list and republished by Feitong Yang
                in 2017.
              </p>
            </aside>
            <div>
              <section>
                <span>01</span>
                <div>
                  <h3>How papers entered the list</h3>
                  <p>
                    Review papers were excluded. The remaining papers were
                    ranked using citation counts reported by Google Scholar,
                    Scopus, and Web of Science as of January 2007. Google
                    Scholar and Scopus agreed fairly well; the higher of the
                    Google Scholar and Web of Science counts determined the
                    order.
                  </p>
                </div>
              </section>
              <section>
                <span>02</span>
                <div>
                  <h3>The subjective counterweight</h3>
                  <p>
                    Petrov also counted how often each paper appeared in seven
                    widely used Sensation and Perception textbooks. That score
                    supplements citation rank with evidence of pedagogical
                    influence.
                  </p>
                </div>
              </section>
              <section>
                <span>03</span>
                <div>
                  <h3>What the map cannot claim</h3>
                  <p>
                    Older papers may be undercounted because database coverage
                    is uneven before 1970. The ranking is a guide to the eye,
                    not a comparison of scientific merit, and a list assembled
                    in 2007 cannot describe the current frontier.
                  </p>
                </div>
              </section>
            </div>
          </div>
        ) : null}
      </section>

      {workspace === "catalogue" ? (
        <section
          className="vision-reference__index"
          id="paper-index"
          aria-labelledby="paper-index-title"
        >
          <header className="vision-reference__index-heading">
            <div>
              <span>Reference apparatus</span>
              <h2 id="paper-index-title">The paper index</h2>
            </div>
            <p>
              Use the subject register to narrow the field. Rank preserves the
              original list; chronology shows the discipline accumulating over
              time.
            </p>
          </header>

          <div className="vision-reference__index-grid">
            <aside
              className="vision-reference__register"
              aria-label="Subject register"
            >
              <h3>Subject register</h3>
              <button
                aria-pressed={topic === "all"}
                type="button"
                onClick={() => selectTopic("all")}
              >
                <span>All subjects</span>
                <span>100</span>
              </button>
              {SUBWAY_LINES.map((line) => {
                const count = VISION_100_PAPERS.filter(
                  (paper) => paper.topic === line.id,
                ).length;

                return (
                  <button
                    aria-pressed={topic === line.id}
                    key={line.id}
                    type="button"
                    onClick={() => selectTopic(line.id)}
                  >
                    <span>{line.name}</span>
                    <span>{String(count).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </aside>

            <div className="vision-reference__papers">
              <header className="vision-reference__papers-toolbar">
                <p aria-live="polite">
                  <strong>{currentTopic}</strong>
                  <span>
                    {papers.length} {papers.length === 1 ? "paper" : "papers"}
                  </span>
                </p>
                <div aria-label="Index order">
                  <button
                    aria-pressed={order === "rank"}
                    type="button"
                    onClick={() => setOrder("rank")}
                  >
                    Rank
                  </button>
                  <button
                    aria-pressed={order === "chronology"}
                    type="button"
                    onClick={() => setOrder("chronology")}
                  >
                    Chronology
                  </button>
                </div>
              </header>

              <ol className="vision-reference__paper-list">
                {visiblePapers.map((paper) => (
                  <li key={paper.id} value={paper.id}>
                    <span className="vision-reference__paper-number">
                      {String(paper.id).padStart(3, "0")}
                    </span>
                    <div className="vision-reference__paper-citation">
                      <p>
                        <strong>{paper.authors}</strong>
                        <time>{paper.year}</time>
                      </p>
                      <cite>{paper.title}</cite>
                      <small>
                        {paper.journal}
                        {paper.volumeInfo ? ` · ${paper.volumeInfo}` : ""}
                      </small>
                    </div>
                  </li>
                ))}
              </ol>

              {!showAll && papers.length > visiblePapers.length ? (
                <button
                  className="vision-reference__show-all"
                  type="button"
                  onClick={() => setShowAll(true)}
                >
                  Show all {papers.length} papers
                </button>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="reading-prototype__folio">
        <span>Algo Mind · Series 02</span>
        <span>Living reference · First issued 2017</span>
      </footer>
    </main>
  );
}

function RejectionLetterEssay() {
  return (
    <main className="reading-prototype__page bound-essay" lang="en">
      <header className="bound-essay__title-page">
        <div className="bound-essay__classification">
          <span>Essay 01</span>
          <span>Narrative · Career</span>
        </div>
        <h1>
          Stop Being
          <br />
          Your Own
          <br />
          <em>Rejection</em> Letter
        </h1>
        <div className="bound-essay__deck">
          <p>
            In early 2024, a founding engineer at Cursor emailed me about being
            their ninth hire. I turned myself down without asking a single
            question.
          </p>
          <dl>
            <div>
              <dt>By</dt>
              <dd>Feitong Yang</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>June 16, 2026</dd>
            </div>
            <div>
              <dt>Reading time</dt>
              <dd>7 minutes</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="bound-essay__reading-grid">
        <aside className="bound-essay__contents">
          <span>Contents</span>
          <ol>
            {essaySections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="bound-essay__body">
          <p className="bound-essay__opening">
            This week, SpaceX agreed to buy Cursor for $60 billion.
            <sup>
              <a href="#note-1">1</a>
            </sup>
          </p>

          <p>
            When the news hit, the near-miss stories came with it — Alex
            Lieberman joking that ghosting Cursor’s founder back in 2022 had
            cost him $600 million in advisory shares.
          </p>

          <p>
            That’s the version everyone tells: the jackpot you forgot to buy a
            ticket for. Mine is quieter, and it isn’t about money. I probably
            would have failed the interview anyway. What stays with me is
            smaller: when the chance came, I turned myself down before anyone
            else could. Not a regret — a lesson, and one worth passing on.
          </p>

          <section id="the-email">
            <h2>
              <span>01</span>
              The email
            </h2>
            <p>
              In early 2024 I was thinking about leaving Citadel when a founding
              engineer at Cursor — Andy — found my LinkedIn and emailed me cold.
              He was specific and generous: the company was funded by OpenAI,
              the product was an AI-powered IDE already used by tens of
              thousands of programmers, and he was looking for a ninth team
              member to join in SF — someone who would, “based on their area of
              interest, control a significant part of our product or ML research
              direction.” Would I want to interview?
            </p>
            <p>
              I got a lot of cold emails back then and answered almost none of
              them. This one I answered — and then I talked myself out of it.
            </p>
            <p>
              My first reply deflected: cool project, but I don’t think my stack
              fits your needs. Andy didn’t take the hint. He wrote back asking
              me to elaborate, offering to just chat, no interview required. So
              I made it official. I apologized for the “miscommunication,” and
              made my no unmistakable: I wasn’t a full-stack engineer, I had no
              recent ML experience, and I’d pass.
            </p>

            <figure className="bound-essay__figure">
              <img
                alt="The January 2024 email exchange with a founding engineer at Cursor"
                src={cursorEmailImage}
              />
              <figcaption>
                <span>Fig. 01</span>
                The real thread, January 2024. Names and emails redacted.
              </figcaption>
            </figure>

            <p>
              The other side held the door open, and I shut it anyway — in
              writing, and left no room for doubt. I never asked them a single
              question. I ran their screening for them, reached the rejection on
              their behalf, and mailed it to myself.
            </p>
          </section>

          <section id="a-bar-i-never-checked">
            <h2>
              <span>02</span>A bar I never checked
            </h2>
            <p>
              Look at what I disqualified myself on: not a full-stack engineer,
              no recent ML experience. Now look at what the role actually asked
              for — “superb technical ability,” “comfort with lots of autonomy,”
              and an area of interest they would build the job around. The email
              all but said <em>we’ll shape this around you.</em> I answered a
              requirement they had never made.
            </p>
            <p>
              That is what self-rejection is. It wears the face of being
              realistic. It feels like humility, like knowing your limits. But
              it is really pre-emptive surrender: you give up the option before
              anyone has actually evaluated you.
            </p>
            <blockquote>
              <p>
                The other side never gets to say yes, because you have already
                said no for them.
              </p>
            </blockquote>
            <p>
              Not every no is a mistake — sometimes it’s judgment, not fear. But
              I’d read the email, liked the project, and could picture using the
              product. That much interest earns one honest question before you
              say no for them.
            </p>
          </section>

          <section id="how-it-actually-went">
            <h2>
              <span>03</span>
              How it actually went
            </h2>
            <p>
              The story has no clean “if only” ending, and I won’t pretend it
              does.
            </p>
            <p>
              Cursor came back about a year later, while I was working at a
              startup. I let the conversation sit. When I finally interviewed,
              in 2026, I failed the system design round — partly because I
              wasn’t prepared, partly because I was no longer sure I wanted it.
              The path and I were never going to cross.
            </p>
            <p>
              There was no alternate universe where I joined, got rich, and
              lived happily ever after. The point was never the outcome.
            </p>
            <p className="bound-essay__turn">
              The point is the conversation I refused to have.
            </p>
          </section>

          <section id="what-changed">
            <h2>
              <span>04</span>
              What changed
            </h2>
            <p>
              Since then I’ve made myself one rule: take the call. Talk to the
              team. Let them be the ones to decide whether I fit.
            </p>
            <p>
              What surprised me is how much was there once I stopped gatekeeping
              myself. Some of these companies are genuinely interesting. And the
              founders, many of them much younger than me, are humble, mature in
              their thinking, and genuinely inspiring to talk to.
            </p>
            <p>
              The failures worth worrying about are not the interviews you fail;
              those are honest no’s, handed to you by someone who actually
              looked. The expensive ones are the no’s you write yourself, in
              advance, and never send to anyone but you.
            </p>
            <p className="bound-essay__ending">
              Stop being your own rejection letter.
            </p>
          </section>

          <section className="bound-essay__notes" aria-labelledby="notes-title">
            <h2 id="notes-title">Notes</h2>
            <ol>
              <li id="note-1">
                The referenced post records the acquisition news that prompted
                this essay. The $600 million figure is Alex Lieberman’s own joke
                about an unanswered 2022 message, not an offer or realized
                stake.
              </li>
            </ol>
          </section>
        </article>

        <aside className="bound-essay__margin-note" aria-label="Editorial note">
          <span>On the form</span>
          <p>
            A narrative essay receives one narrow reading measure, numbered
            sections, documentary evidence, and endnotes. The apparatus stays
            subordinate to the voice.
          </p>
        </aside>
      </div>

      <nav className="bound-essay__next" aria-label="Essay navigation">
        <div>
          <span>Next essay</span>
          <a href="/essays/ship-the-core-first/">Ship the Core First</a>
        </div>
        <span>02 / 09</span>
      </nav>

      <footer className="reading-prototype__folio">
        <span>Algo Mind · Essay 01</span>
        <span>First published June 16, 2026</span>
      </footer>
    </main>
  );
}

export function EditorialReadingPrototype({
  initialPage = "vision100",
  initialTypeface = "newsreader",
  showTypefaceLab = false,
}: EditorialReadingPrototypeProps) {
  const [page, setPage] = useState<ReadingPage>(initialPage);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [typeface, setTypeface] = useState<ReadingTypeface>(initialTypeface);

  const toggleMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    document.documentElement.dataset.mode = nextMode;
    setMode(nextMode);
  };

  return (
    <div className="reading-prototype" data-typeface={typeface}>
      <ReadingMasthead
        currentPage={page}
        mode={mode}
        onNavigate={setPage}
        onToggleMode={toggleMode}
      />
      {showTypefaceLab && typeface !== "newsreader" ? (
        <TypefaceLab typeface={typeface} onChange={setTypeface} />
      ) : null}
      {page === "vision100" ? <Vision100Reference /> : <RejectionLetterEssay />}
    </div>
  );
}
