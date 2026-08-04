import { useState } from "react";

import "./editorial-home-prototype.css";

const recentEssays = [
  {
    title: "Ship the Core First",
    description:
      "Three months, 300+ pull requests, one episode, and no idea if anyone wanted it.",
    date: "June 16, 2026",
    dateTime: "2026-06-16",
    href: "/essays/ship-the-core-first/",
  },
  {
    title: "The Ten Commandments for Building Product",
    description:
      "Ten product mistakes, and the self-deceptions each commandment guards against.",
    date: "June 15, 2026",
    dateTime: "2026-06-15",
    href: "/essays/ten-commandments-for-product/",
  },
  {
    title: "Access Denied Is Not a Moat",
    description:
      "Denial can buy time, but it teaches rivals that dependency is a vulnerability.",
    date: "June 14, 2026",
    dateTime: "2026-06-14",
    href: "/essays/access-denied-is-not-a-moat/",
  },
] as const;

const navigation = [
  { label: "Essays", href: "/essays/" },
  { label: "Series", href: "/series/" },
  { label: "About", href: "/about/" },
] as const;

export function EditorialHomePrototype() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    document.documentElement.dataset.mode = nextMode;
    setMode(nextMode);
  };

  return (
    <div className="editorial-home">
      <header className="editorial-home__masthead">
        <a className="editorial-home__wordmark" href="/">
          Algo Mind
        </a>

        <nav className="editorial-home__nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="editorial-home__utilities">
          <a href="/zh/" lang="zh">
            中文
          </a>
          <button
            className="editorial-home__mode-button"
            type="button"
            onClick={toggleMode}
          >
            {mode === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </header>

      <main className="editorial-home__page">
        <header className="editorial-home__identity">
          <p>
            Writings on intelligent systems, product judgment, and the work of
            building.
          </p>
        </header>

        <article className="editorial-home__lead">
          <div className="editorial-home__lead-title">
            <a href="/essays/your-own-rejection-letter/">
              <h1>
                Stop Being
                <br />
                Your Own
                <br />
                <em>Rejection</em> Letter
              </h1>
            </a>
          </div>

          <div className="editorial-home__lead-copy">
            <p className="editorial-home__deck">
              In early 2024, a founding engineer at Cursor emailed me about
              being their ninth hire. I turned myself down without asking a
              single question.
            </p>
            <a
              className="editorial-home__text-link"
              href="/essays/your-own-rejection-letter/"
            >
              Read the essay
            </a>
            <time dateTime="2026-06-16">June 16, 2026</time>
          </div>
        </article>

        <section
          className="editorial-home__recent"
          aria-labelledby="recent-heading"
        >
          <header className="editorial-home__section-heading">
            <h2 id="recent-heading">Essays</h2>
            <a className="editorial-home__text-link" href="/essays/">
              All essays
            </a>
          </header>

          <div className="editorial-home__recent-list">
            {recentEssays.map((essay) => (
              <article key={essay.href}>
                <a href={essay.href}>
                  <h3>{essay.title}</h3>
                  <p>{essay.description}</p>
                  <time dateTime={essay.dateTime}>{essay.date}</time>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          className="editorial-home__series"
          aria-labelledby="series-heading"
        >
          <div className="editorial-home__series-title">
            <a href="/series/vision-100/">
              <h2 id="series-heading">100 Vision Papers</h2>
            </a>
          </div>

          <div className="editorial-home__series-copy">
            <p>
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
            <a className="editorial-home__text-link" href="/series/">
              All series
            </a>
          </div>
        </section>

        <section className="editorial-home__colophon" aria-label="About">
          <p>
            Algo Mind is an independent publication by Feitong Yang. The views
            expressed here are my own.
          </p>
          <a className="editorial-home__text-link" href="/about/">
            About Feitong Yang
          </a>
        </section>

        <footer className="editorial-home__working-note">
          <span>On the desk</span>
          <a href="/essays/dissecting-claude-science/">
            <em>Dissecting Claude Science</em>
          </a>
        </footer>
      </main>
    </div>
  );
}
