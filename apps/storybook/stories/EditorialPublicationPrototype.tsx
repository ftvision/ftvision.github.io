import { useState } from "react";
import {
  education,
  failedEducation,
  failedJobs,
  failedPublications,
  grantsAndAwards,
  introContent,
  posters,
  publications,
  researchExperience,
  socialLinks,
  talks,
  teaching,
  workExperience,
} from "@/components/about/aboutData";

import "./editorial-publication-prototype.css";

type PublicationPage = "essays" | "series" | "about";
type PublicationTypefacePairing = "newsreader" | "vollkorn-newsreader";

interface EditorialPublicationPrototypeProps {
  initialPage?: PublicationPage;
  typefacePairing?: PublicationTypefacePairing;
}

const navigation = [
  { id: "essays", label: "Essays" },
  { id: "series", label: "Series" },
  { id: "about", label: "About" },
] as const;

const essayGroups = [
  {
    year: "2026",
    essays: [
      {
        title: "Stop Being Your Own Rejection Letter",
        description:
          "A lesson about the opportunities we decline before anyone has had the chance to judge us.",
        date: "June 16",
        href: "/essays/your-own-rejection-letter/",
      },
      {
        title: "Ship the Core First",
        description:
          "Three months, 300+ pull requests, one episode, and no evidence that anyone wanted it.",
        date: "June 16",
        href: "/essays/ship-the-core-first/",
      },
      {
        title: "The Ten Commandments for Building Product",
        description:
          "Ten product mistakes and the self-deceptions each commandment guards against.",
        date: "June 15",
        href: "/essays/ten-commandments-for-product/",
      },
      {
        title: "Access Denied Is Not a Moat",
        description:
          "Access denial can buy time, but it teaches rivals that dependency is a vulnerability.",
        date: "June 14",
        href: "/essays/access-denied-is-not-a-moat/",
      },
      {
        title: "One Brain Across My Desktop, iPhones, and Pixel",
        description:
          "What changed when one coding-agent session connected a scattered device workflow.",
        date: "May 16",
        href: "/essays/the-power-of-multi-device-connection/",
      },
      {
        title: "Unreasonable Spirit in Silicon Valley",
        description:
          "Environment shapes ambition, but the right place is still the place where you can build.",
        date: "May 15",
        href: "/essays/go-to-sillicon-valley/",
      },
      {
        title: "The Era of Decision Games",
        description:
          "AI will take the tasks and leave us with the harder part: making decisions.",
        date: "February 18",
        href: "/essays/decision-game/",
      },
    ],
  },
  {
    year: "2023",
    essays: [
      {
        title: "Career Reflection — 2023",
        description:
          "A reflection on several years of work and the experiences that changed what I value.",
        date: "July 5",
        href: "/essays/job-reflection-2023/",
      },
    ],
  },
  {
    year: "2017",
    essays: [
      {
        title: "Job Search Reflection",
        description:
          "On intellectual challenge, collaborative colleagues, personal growth, and real impact.",
        date: "October 16",
        href: "/essays/job-search-reflection/",
      },
    ],
  },
] as const;

const series = [
  {
    title: "~100 Economics Papers",
    description:
      "A reading list spanning foundational classics and current working papers across eight fields of economics.",
    count: "104 papers",
    period: "Classics—2025",
    date: "2026",
    href: "/series/econ-100/",
    note: "A living bibliography intended to be revisited, corrected, and eventually outgrown.",
  },
  {
    title: "List of 100 Vision Papers",
    description:
      "A collection of influential vision-science papers assembled across psychophysics, physiology, and computational modeling.",
    count: "100 papers",
    period: "1950—2000",
    date: "2017",
    href: "/series/vision-100/",
    note: "An archival reading list preserved after the original source disappeared from the web.",
  },
] as const;

function PressMasthead({
  currentPage,
  mode,
  onNavigate,
  onToggleMode,
}: {
  currentPage: PublicationPage;
  mode: "light" | "dark";
  onNavigate: (page: PublicationPage) => void;
  onToggleMode: () => void;
}) {
  return (
    <header className="press-prototype__masthead">
      <a className="press-prototype__wordmark" href="/">
        Algo Mind
      </a>

      <nav className="press-prototype__nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a
            aria-current={currentPage === item.id ? "page" : undefined}
            href={`#${item.id}`}
            key={item.id}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="press-prototype__utilities">
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

function EssaysPrototype() {
  return (
    <main className="press-prototype__page press-prototype__page--essays">
      <header className="press-prototype__title-page">
        <h1>Essays</h1>
        <div>
          <p>
            Writing on intelligent systems, product judgment, ambition, and the
            work of building.
          </p>
        </div>
      </header>

      <section className="press-catalogue" aria-label="Published essays">
        {essayGroups.map((group) => (
          <section className="press-catalogue__year" key={group.year}>
            <h2>{group.year}</h2>
            <ul>
              {group.essays.map((essay) => (
                <li key={essay.href}>
                  <a href={essay.href}>
                    <span className="press-catalogue__title">
                      {essay.title}
                    </span>
                    <span className="press-catalogue__description">
                      {essay.description}
                    </span>
                    <time>{essay.date}</time>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      <footer className="press-prototype__folio">
        <span>Catalogue complete through June 2026</span>
        <span>Algo Mind · Essays</span>
      </footer>
    </main>
  );
}

function SeriesPrototype() {
  return (
    <main className="press-prototype__page press-prototype__page--series">
      <header className="press-prototype__title-page press-prototype__title-page--series">
        <h1>Series</h1>
        <div>
          <p>
            Bibliographies and long-lived collections assembled for repeated
            reading rather than continuous publication.
          </p>
        </div>
      </header>

      <section className="press-series" aria-label="Published series">
        {series.map((entry) => (
          <article className="press-series__entry" key={entry.href}>
            <div className="press-series__body">
              <a href={entry.href}>
                <h2>{entry.title}</h2>
              </a>
              <p className="press-series__description">{entry.description}</p>
              <p className="press-series__note">{entry.note}</p>
            </div>
            <dl className="press-series__metadata">
              <div>
                <dt>Extent</dt>
                <dd>{entry.count}</dd>
              </div>
              <div>
                <dt>Coverage</dt>
                <dd>{entry.period}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>{entry.date}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <footer className="press-prototype__folio">
        <span>Living documents; dates mark first publication</span>
        <span>Algo Mind · Series</span>
      </footer>
    </main>
  );
}

function AboutPrototype() {
  const intro = introContent.en;

  return (
    <main className="press-prototype__page press-prototype__page--about">
      <header className="press-about__opening">
        <div className="press-about__title">
          <h1>About</h1>
        </div>
        <div className="press-about__introduction">
          <p>{intro.description}</p>
        </div>
      </header>

      <nav className="press-about__contents" aria-label="About page contents">
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#academic-background">Academic background</a>
        <a href="#failures">Resume of failures</a>
        <a href="#elsewhere">Elsewhere</a>
      </nav>

      <section className="press-about__section" aria-labelledby="experience">
        <header className="press-about__section-heading">
          <h2 id="experience">Experience</h2>
        </header>
        <div className="press-about__record-list">
          {workExperience.en.map((entry) => (
            <details
              className="press-about__record-disclosure"
              key={`${entry.dateRange}-${entry.organization}`}
            >
              <summary>
                <time>{entry.dateRange}</time>
                <div className="press-about__record-role">
                  <h3>{entry.title}</h3>
                  <p>
                    {entry.organization} · {entry.location}
                  </p>
                </div>
                <span className="press-about__visually-hidden">
                  Show details for {entry.title}
                </span>
              </summary>
              <div className="press-about__record-details">
                <ul>
                  {entry.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="press-about__section" aria-labelledby="education">
        <header className="press-about__section-heading">
          <h2 id="education">Education</h2>
        </header>
        <div className="press-about__compact-list">
          {education.en.map((entry) => (
            <article key={`${entry.dateRange}-${entry.title}`}>
              <time>{entry.dateRange}</time>
              <h3>{entry.title}</h3>
              <p>
                {entry.organization} · {entry.location}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="press-about__section"
        aria-labelledby="academic-background"
      >
        <header className="press-about__section-heading">
          <h2 id="academic-background">Academic background</h2>
        </header>

        <div className="press-about__academic-groups">
          <details>
            <summary>
              <span className="press-about__academic-summary">
                <span>Research experience</span>
              </span>
            </summary>
            <div className="press-about__academic-panel">
              <div className="press-about__compact-list">
                {researchExperience.en.map((entry) => (
                  <article key={`${entry.dateRange}-${entry.title}`}>
                    <time>{entry.dateRange}</time>
                    <h4>{entry.title}</h4>
                    <p>
                      {entry.organization} · {entry.location}
                    </p>
                    {entry.description ? (
                      <small>{entry.description}</small>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </details>

          <details>
            <summary>
              <span className="press-about__academic-summary">
                <span>Publications</span>
              </span>
            </summary>
            <div className="press-about__academic-panel">
              <ol className="press-about__citation-list">
                {publications.map((publication) => (
                  <li key={publication}>{publication}</li>
                ))}
              </ol>
            </div>
          </details>

          <details>
            <summary>
              <span className="press-about__academic-summary">
                <span>Talks</span>
              </span>
            </summary>
            <div className="press-about__academic-panel">
              <ol className="press-about__citation-list">
                {talks.map((talk) => (
                  <li key={talk}>{talk}</li>
                ))}
              </ol>
            </div>
          </details>

          <details>
            <summary>
              <span className="press-about__academic-summary">
                <span>Posters</span>
              </span>
            </summary>
            <div className="press-about__academic-panel">
              <ol className="press-about__citation-list">
                {posters.map((poster) => (
                  <li key={poster}>{poster}</li>
                ))}
              </ol>
            </div>
          </details>

          <details>
            <summary>
              <span className="press-about__academic-summary">
                <span>Grants and awards</span>
              </span>
            </summary>
            <div className="press-about__academic-panel">
              <div className="press-about__compact-list">
                {grantsAndAwards.en.map((entry) => (
                  <article key={`${entry.dateRange}-${entry.title}`}>
                    <time>{entry.dateRange}</time>
                    <h4>{entry.title}</h4>
                    {entry.organization ? <p>{entry.organization}</p> : null}
                  </article>
                ))}
              </div>
            </div>
          </details>
          <details>
            <summary>
              <span className="press-about__academic-summary">
                <span>Teaching</span>
              </span>
            </summary>
            <div className="press-about__academic-panel">
              <div className="press-about__record-list press-about__record-list--teaching">
                {teaching.en.map((entry) => (
                  <article
                    className="press-about__record-entry"
                    key={`${entry.dateRange}-${entry.title}`}
                  >
                    <time>{entry.dateRange}</time>
                    <div className="press-about__record-role">
                      <h3>{entry.title}</h3>
                      <p>{entry.organization}</p>
                    </div>
                    <p>{entry.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </details>
        </div>
      </section>

      <section
        className="press-about__section press-about__failures"
        aria-labelledby="failures"
      >
        <header className="press-about__section-heading">
          <h2 id="failures">Resume of failures</h2>
          <blockquote>{intro.quotes[1]}</blockquote>
        </header>

        <div className="press-about__failure-groups">
          <details>
            <summary>
              <span>Job applications</span>
            </summary>
            <div className="press-about__failure-list">
              {failedJobs.en.map((entry, index) => (
                <article key={`${entry.year}-${entry.company}-${index}`}>
                  <time>{entry.year}</time>
                  <div>
                    <h3>{entry.company}</h3>
                    <p>
                      {entry.role} · {entry.location}
                    </p>
                  </div>
                  <p>{entry.result}</p>
                </article>
              ))}
            </div>
          </details>

          <details>
            <summary>
              <span>Education</span>
            </summary>
            <div className="press-about__failure-list">
              {failedEducation.en.map((entry, index) => (
                <article key={`${entry.year}-${entry.school}-${index}`}>
                  <time>{entry.year}</time>
                  <div>
                    <h3>{entry.school}</h3>
                    <p>
                      {entry.program} · {entry.location}
                    </p>
                  </div>
                  <p>{entry.result}</p>
                </article>
              ))}
            </div>
          </details>

          <details>
            <summary>
              <span>Publications and fellowships</span>
            </summary>
            <div className="press-about__failure-list">
              {failedPublications.en.map((entry, index) => (
                <article key={`${entry.year}-${entry.title}-${index}`}>
                  <time>{entry.year}</time>
                  <div>
                    <h3>{entry.title}</h3>
                    <p>
                      {[entry.authors, entry.journal]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <p>{entry.result}</p>
                </article>
              ))}
            </div>
          </details>
        </div>
      </section>

      <section
        className="press-about__section press-about__elsewhere"
        aria-labelledby="elsewhere"
      >
        <h2 id="elsewhere">Elsewhere</h2>
        <nav aria-label="External profiles">
          <a href="/essays/">Read essays</a>
          <a href={socialLinks.linkedin}>LinkedIn</a>
          <a href={socialLinks.googleScholar}>Google Scholar</a>
          <a href={socialLinks.neuroTree}>NeuroTree</a>
        </nav>
      </section>

      <footer className="press-prototype__folio press-prototype__folio--about">
        <span>Feitong Yang</span>
        <span>Algo Mind · About</span>
      </footer>
    </main>
  );
}

export function EditorialPublicationPrototype({
  initialPage = "essays",
  typefacePairing = "newsreader",
}: EditorialPublicationPrototypeProps) {
  const [currentPage, setCurrentPage] = useState<PublicationPage>(initialPage);
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    document.documentElement.dataset.mode = nextMode;
    setMode(nextMode);
  };

  return (
    <div className="press-prototype" data-typeface-pairing={typefacePairing}>
      <PressMasthead
        currentPage={currentPage}
        mode={mode}
        onNavigate={setCurrentPage}
        onToggleMode={toggleMode}
      />
      {currentPage === "essays" ? <EssaysPrototype /> : null}
      {currentPage === "series" ? <SeriesPrototype /> : null}
      {currentPage === "about" ? <AboutPrototype /> : null}
    </div>
  );
}
