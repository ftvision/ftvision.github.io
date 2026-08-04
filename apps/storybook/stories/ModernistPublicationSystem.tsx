import { useMemo, useState } from "react";

import { Vision100Map } from "../../blog/components/vision100/Vision100Map";
import {
  SUBWAY_LINES,
  VISION_100_PAPERS,
} from "../../blog/data/vision100-papers";
import commandmentsEn from "../../blog/content/essays/ten-commandments-for-product.mdx?raw";
import commandmentsZh from "../../blog/content/essays/ten-commandments-for-product-zh.mdx?raw";
import commandmentsReadingEn from "../../blog/content/essay-reading/ten-commandments-for-product.mdx?raw";
import rejectionLetter from "../../blog/content/essays/your-own-rejection-letter.mdx?raw";
import {
  EditorialMdxReader,
  deriveReadingPass,
  getReadingPassSource,
} from "./EditorialMdxReader";
import type { WorkManifest } from "./PublicationSystemPrototype";

type ModernistMode = "light" | "dark";
type Language = "en" | "zh";
type ReadingPass = "full" | "argument" | "spine";
type VisionView = "atlas" | "register" | "method";

const cursorEmailImage = new URL(
  "../../blog/public/images/cursor-email-2024.png",
  import.meta.url,
).href;

const recentEssays = [
  {
    title: "Ship the Core First",
    date: "16.06.26",
    description:
      "Three months, 300+ pull requests, one episode, and no evidence that anyone wanted it.",
  },
  {
    title: "The Ten Commandments for Building Product",
    date: "15.06.26",
    description:
      "Ten product mistakes and the self-deceptions each commandment guards against.",
  },
  {
    title: "Access Denied Is Not a Moat",
    date: "14.06.26",
    description:
      "Denial can buy time, but it teaches rivals that dependency is a vulnerability.",
  },
] as const;

function normalizeStandaloneMdx(source: string) {
  return source
    .replace(/<XEmbed[^>]*\/>/g, "")
    .replace(/<ZoomableImage[^>]*\/>/g, "")
    .replace(
      /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
      (_match, href: string, label: string) => `[${label}](${href})`,
    );
}

function ModernistMasthead({
  mode,
  onToggleMode,
}: {
  mode: ModernistMode;
  onToggleMode: () => void;
}) {
  return (
    <header className="modernist__masthead">
      <a className="modernist__nameplate" href="/">
        AM<span>—01</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/essays/">Essays</a>
        <a href="/series/">Series</a>
        <a href="/about/">About</a>
      </nav>
      <button type="button" onClick={onToggleMode}>
        {mode === "light" ? "Dark" : "Light"}
      </button>
    </header>
  );
}

function ModernistShell({
  children,
}: {
  children: (mode: ModernistMode) => React.ReactNode;
}) {
  const [mode, setMode] = useState<ModernistMode>("light");

  return (
    <div className="modernist-system" data-mode={mode}>
      <ModernistMasthead
        mode={mode}
        onToggleMode={() => setMode(mode === "light" ? "dark" : "light")}
      />
      {children(mode)}
    </div>
  );
}

function ModernistFooter({ code }: { code: string }) {
  return (
    <footer className="modernist__folio">
      <span>Algo Mind / Feitong Yang</span>
      <span>{code}</span>
      <span>Independent publication</span>
    </footer>
  );
}

export function ModernistLanding() {
  return (
    <ModernistShell>
      {() => (
        <main className="modernist__page modernist-home">
          <header className="modernist-home__premise">
            <p>
              Writings on intelligent systems, product judgment, and the work of
              building.
            </p>
            <span>Independent / California / 2026</span>
          </header>

          <article className="modernist-home__lead">
            <div className="modernist-home__lead-number" aria-hidden="true">
              01
            </div>
            <div className="modernist-home__lead-title">
              <span>Essay / Career</span>
              <h1>
                Stop being
                <br />
                your own
                <br />
                <em>rejection</em> letter
              </h1>
            </div>
            <div className="modernist-home__lead-deck">
              <p>
                In early 2024, a founding engineer at Cursor emailed me about
                being their ninth hire. I turned myself down without asking a
                single question.
              </p>
              <a href="/essays/your-own-rejection-letter/">Read / 07 min</a>
            </div>
          </article>

          <section
            className="modernist-home__ledger"
            aria-labelledby="modernist-latest"
          >
            <header>
              <p id="modernist-latest">Latest essays</p>
              <a href="/essays/">Complete index →</a>
            </header>
            <ol>
              {recentEssays.map((essay, index) => (
                <li key={essay.title}>
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  <h2>{essay.title}</h2>
                  <p>{essay.description}</p>
                  <time>{essay.date}</time>
                </li>
              ))}
            </ol>
          </section>

          <section className="modernist-home__series">
            <div className="modernist-home__series-number">100</div>
            <div>
              <span>Reference work / Vision science</span>
              <h2>Vision Papers</h2>
            </div>
            <p>
              A working map of influential papers across physiology,
              psychophysics, and computational modeling.
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
          </section>

          <section className="modernist-home__imprint">
            <strong>
              Algo Mind is an independent publication by Feitong Yang.
            </strong>
            <p>The views expressed here are my own.</p>
            <a href="/about/">Author record →</a>
          </section>
          <ModernistFooter code="Front table / 01" />
        </main>
      )}
    </ModernistShell>
  );
}

export function ModernistRejectionEssay() {
  const [sourceBeforeEvidence, sourceAfterEvidence] = useMemo(() => {
    const [before = rejectionLetter, after = ""] = rejectionLetter.split(
      /<ZoomableImage[^>]*\/>/,
    );
    return [normalizeStandaloneMdx(before), normalizeStandaloneMdx(after)];
  }, []);

  return (
    <ModernistShell>
      {() => (
        <main className="modernist__page modernist-essay" lang="en">
          <header className="modernist-essay__title-leaf">
            <div className="modernist-essay__classification">
              <span>Essay</span>
              <span>Career / 16.06.26</span>
            </div>
            <h1>
              Stop Being Your Own <em>Rejection</em> Letter
            </h1>
            <p>
              In early 2024, a founding engineer at Cursor emailed me about
              being their ninth hire. I turned myself down without asking a
              single question.
            </p>
          </header>

          <div className="modernist-essay__reading-grid">
            <aside className="modernist-essay__rail">
              <span>Document / 01</span>
              <p>Feitong Yang</p>
              <p>7 minutes</p>
              <nav aria-label="Essay contents">
                <a href="#the-email">The email</a>
                <a href="#a-bar-i-never-checked">A bar I never checked</a>
                <a href="#how-it-actually-went">How it actually went</a>
                <a href="#what-changed">What changed</a>
              </nav>
            </aside>
            <div className="modernist-essay__body">
              <EditorialMdxReader language="en" source={sourceBeforeEvidence} />
              <figure className="modernist-essay__evidence">
                <img
                  alt="The January 2024 email exchange with a founding engineer at Cursor"
                  src={cursorEmailImage}
                />
                <figcaption>
                  <span>Document 01</span>
                  The real thread, January 2024. Names and emails redacted.
                </figcaption>
              </figure>
              <EditorialMdxReader language="en" source={sourceAfterEvidence} />
            </div>
          </div>
          <ModernistFooter code="Essay / 01" />
        </main>
      )}
    </ModernistShell>
  );
}

const passLabels: Record<Language, Record<ReadingPass, string>> = {
  en: {
    full: "Full / 45 min",
    argument: "Argument / 15 min",
    spine: "Spine / 5 min",
  },
  zh: {
    full: "全文 / 45 分钟",
    argument: "论证 / 15 分钟",
    spine: "骨架 / 5 分钟",
  },
};

export function ModernistCommandments() {
  const [language, setLanguage] = useState<Language>("en");
  const [pass, setPass] = useState<ReadingPass>("full");
  const fullSource = language === "en" ? commandmentsEn : commandmentsZh;
  const blocks = useMemo(() => {
    if (pass === "full") return undefined;
    if (language === "en") return undefined;
    return deriveReadingPass(fullSource, pass);
  }, [fullSource, language, pass]);
  const source = useMemo(() => {
    if (pass === "full") return fullSource;
    if (language === "zh") return undefined;
    return getReadingPassSource(commandmentsReadingEn, pass);
  }, [fullSource, language, pass]);

  return (
    <ModernistShell>
      {() => (
        <main
          className="modernist__page modernist-commandments"
          lang={language === "zh" ? "zh-Hans" : "en"}
        >
          <header className="modernist-commandments__title-leaf">
            <div className="modernist-commandments__number">10</div>
            <div className="modernist-commandments__title">
              <span>
                {language === "en" ? "Essay / Product" : "文章 / 产品"}
              </span>
              <h1>
                {language === "en" ? (
                  <>Commandments for Building Product</>
                ) : (
                  <>产品十诫</>
                )}
              </h1>
            </div>
            <p>
              {language === "en"
                ? "A record of mistakes I made and watched others make, and the self-deceptions each commandment guards against."
                : "记录我犯过、也看着别人犯过的错误，以及每条诫命试图抵御的自我欺骗。"}
            </p>
          </header>

          <section
            className="modernist-commandments__apparatus"
            aria-label="Reading controls"
          >
            <div role="group" aria-label="Article language">
              <button
                aria-pressed={language === "en"}
                type="button"
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                aria-pressed={language === "zh"}
                lang="zh-Hans"
                type="button"
                onClick={() => setLanguage("zh")}
              >
                中文
              </button>
            </div>
            <div
              role="tablist"
              aria-label={language === "en" ? "Read it three times" : "读三遍"}
            >
              {(["full", "argument", "spine"] as const).map((value) => (
                <button
                  aria-selected={pass === value}
                  key={value}
                  role="tab"
                  type="button"
                  onClick={() => setPass(value)}
                >
                  {passLabels[language][value]}
                </button>
              ))}
            </div>
          </section>

          <div className="modernist-commandments__reading">
            <aside>
              <span>Reading state</span>
              <strong>{passLabels[language][pass]}</strong>
              <p>
                {language === "en"
                  ? "The structure stays fixed while the amount of argument changes. Full always remains available."
                  : "结构保持不变，只改变论证的展开程度；全文始终可以恢复。"}
              </p>
            </aside>
            <EditorialMdxReader
              blocks={blocks}
              language={language}
              source={source}
            />
          </div>
          <ModernistFooter
            code={language === "en" ? "Essay / 03" : "文章 / 03"}
          />
        </main>
      )}
    </ModernistShell>
  );
}

export function ModernistVision100() {
  const [view, setView] = useState<VisionView>("atlas");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const papers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return VISION_100_PAPERS.filter((paper) => {
      const matchesTopic = topic === "all" || paper.topic === topic;
      const matchesQuery =
        normalized.length === 0 ||
        `${paper.authors} ${paper.title} ${paper.journal}`
          .toLowerCase()
          .includes(normalized);
      return matchesTopic && matchesQuery;
    });
  }, [query, topic]);

  return (
    <ModernistShell>
      {() => (
        <main className="modernist__page modernist-vision" lang="en">
          <header className="modernist-vision__title-leaf">
            <div className="modernist-vision__number">100</div>
            <div>
              <span>Reference work / Vision science</span>
              <h1>Vision Papers</h1>
            </div>
            <p>
              A working map of influential papers across physiology,
              psychophysics, and computational modeling.
            </p>
          </header>

          <dl className="modernist-vision__metadata">
            <div>
              <dt>Extent</dt>
              <dd>100 papers</dd>
            </div>
            <div>
              <dt>Coverage</dt>
              <dd>1953—2001</dd>
            </div>
            <div>
              <dt>Original compilation</dt>
              <dd>Yury Petrov / 2007</dd>
            </div>
          </dl>

          <section className="modernist-vision__workspace">
            <header>
              <h2>The field atlas</h2>
              <div role="tablist" aria-label="Vision 100 view">
                {(["atlas", "register", "method"] as const).map((value) => (
                  <button
                    aria-selected={view === value}
                    key={value}
                    role="tab"
                    type="button"
                    onClick={() => setView(value)}
                  >
                    {value === "atlas"
                      ? "Atlas"
                      : value === "register"
                        ? "Index"
                        : "Method"}
                  </button>
                ))}
              </div>
            </header>

            {view === "atlas" ? (
              <div className="modernist-vision__atlas">
                <aside>
                  <span>How to read</span>
                  <h3>A field, not a verdict.</h3>
                  <p>
                    Decades run left to right. Each colored route is a research
                    subject. Nodes expose individual papers and citations.
                  </p>
                </aside>
                <div className="modernist-vision__map">
                  <Vision100Map defaultView="map" />
                </div>
              </div>
            ) : null}

            {view === "register" ? (
              <div className="modernist-vision__register">
                <div className="modernist-vision__filters">
                  <label>
                    <span>Search the register</span>
                    <input
                      placeholder="Author, title, or journal"
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <label>
                    <span>Subject</span>
                    <select
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                    >
                      <option value="all">All subjects</option>
                      {SUBWAY_LINES.map((line) => (
                        <option key={line.id} value={line.id}>
                          {line.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p aria-live="polite">{papers.length} papers</p>
                </div>
                <ol className="modernist-vision__paper-list">
                  {papers.map((paper) => (
                    <li key={paper.id}>
                      <span>{String(paper.id).padStart(3, "0")}</span>
                      <time>{paper.year}</time>
                      <div>
                        <strong>{paper.authors}</strong>
                        <cite>{paper.title}</cite>
                        <small>
                          {paper.journal}
                          {paper.volumeInfo ? ` / ${paper.volumeInfo}` : ""}
                        </small>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {view === "method" ? (
              <div className="modernist-vision__method">
                <span>Source and limits</span>
                <div>
                  <section>
                    <strong>01</strong>
                    <h3>How papers entered the list</h3>
                    <p>
                      Review papers were excluded. The remainder were ranked
                      using citation counts from Google Scholar, Scopus, and Web
                      of Science as of January 2007.
                    </p>
                  </section>
                  <section>
                    <strong>02</strong>
                    <h3>A pedagogical counterweight</h3>
                    <p>
                      The compilation also counted appearances across seven
                      widely used Sensation and Perception textbooks.
                    </p>
                  </section>
                  <section>
                    <strong>03</strong>
                    <h3>What the map cannot claim</h3>
                    <p>
                      Database coverage is uneven before 1970. The ranking is a
                      guide to the field, not a comparison of scientific merit.
                    </p>
                  </section>
                </div>
              </div>
            ) : null}
          </section>
          <ModernistFooter code="Reference / 100" />
        </main>
      )}
    </ModernistShell>
  );
}

export function ModernistPublicationRenderer({
  manifest,
}: {
  manifest: WorkManifest;
}) {
  switch (manifest.id) {
    case "landing":
      return <ModernistLanding />;
    case "rejection-letter":
      return <ModernistRejectionEssay />;
    case "product-commandments":
      return <ModernistCommandments />;
    case "vision-100":
      return <ModernistVision100 />;
  }
}
