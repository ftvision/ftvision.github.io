export type ModernistTypographyId =
  | "editorial-contrast"
  | "international-grid"
  | "quiet-rationalism"
  | "collapsed-baseline";

interface ModernistTypographyRoles {
  display: string;
  supporting: string;
  body: string;
  apparatus: string;
  ui: string;
  cjk: string;
}

export interface ModernistTypographyOption {
  id: ModernistTypographyId;
  label: string;
  thesis: string;
  note: string;
  status: "recommended" | "candidate" | "rejected";
  roles: ModernistTypographyRoles;
}

export const MODERNIST_TYPOGRAPHY_SYSTEMS: ModernistTypographyOption[] = [
  {
    id: "editorial-contrast",
    label: "Editorial Contrast",
    thesis: "Grotesk structure, serif editorial voice",
    note: "Schibsted supplies the architectural mass; Newsreader carries short editorial argument without making the entire page shout.",
    status: "recommended",
    roles: {
      display: "Schibsted Grotesk",
      supporting: "Newsreader",
      body: "Source Serif 4",
      apparatus: "Monospace",
      ui: "Instrument Sans",
      cjk: "Noto Sans SC / Noto Serif SC",
    },
  },
  {
    id: "international-grid",
    label: "International Grid",
    thesis: "Constructed display, neutral supporting voice",
    note: "Archivo makes the grid explicit. Instrument Sans keeps decks and section heads calmer, while Schibsted gives controls a sturdier hand.",
    status: "candidate",
    roles: {
      display: "Archivo",
      supporting: "Instrument Sans",
      body: "Source Serif 4",
      apparatus: "Monospace",
      ui: "Schibsted Grotesk",
      cjk: "Noto Sans SC / Noto Serif SC",
    },
  },
  {
    id: "quiet-rationalism",
    label: "Quiet Rationalism",
    thesis: "Contemporary display, warmer editorial hierarchy",
    note: "Instrument Sans lowers the temperature of monumental titles; Newsreader restores cadence in decks and section heads; Schibsted remains purely operational.",
    status: "candidate",
    roles: {
      display: "Instrument Sans",
      supporting: "Newsreader",
      body: "Source Serif 4",
      apparatus: "Monospace",
      ui: "Schibsted Grotesk",
      cjk: "Noto Sans SC / Noto Serif SC",
    },
  },
  {
    id: "collapsed-baseline",
    label: "Collapsed Baseline",
    thesis: "One compressed voice everywhere",
    note: "The rejected Arial Narrow pass is retained as evidence: display, supporting copy, apparatus, and controls collapse into one brittle typographic color.",
    status: "rejected",
    roles: {
      display: "Arial Narrow",
      supporting: "Arial",
      body: "Source Serif 4",
      apparatus: "Arial",
      ui: "Arial",
      cjk: "System sans / system serif",
    },
  },
];

function RoleLedger({ roles }: { roles: ModernistTypographyRoles }) {
  return (
    <dl className="modernist-typography-lab__roles">
      {Object.entries(roles).map(([role, family]) => (
        <div key={role}>
          <dt>{role}</dt>
          <dd>{family}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ModernistTypographyLab() {
  return (
    <main className="modernist-typography-lab">
      <header className="modernist-typography-lab__header">
        <p>Modernist typography systems / complete role maps</p>
        <h1>One publication, four systems</h1>
        <div>
          <p>
            Each specimen assigns separate faces to monumental display,
            supporting hierarchy, continuous reading, apparatus, interactive
            controls, and Chinese composition.
          </p>
          <p>
            The comparison therefore changes a complete editorial voice—not a
            single grotesk pasted over every role.
          </p>
        </div>
      </header>

      <div className="modernist-typography-lab__grid">
        {MODERNIST_TYPOGRAPHY_SYSTEMS.map((system) => (
          <article
            className="modernist-system modernist-typography-lab__specimen"
            data-modernist-typography={system.id}
            data-status={system.status}
            key={system.id}
          >
            <header className="modernist-typography-lab__specimen-header">
              <div>
                <p>{system.thesis}</p>
                <h2>{system.label}</h2>
              </div>
              <span>{system.status}</span>
            </header>

            <p className="modernist-typography-lab__note">{system.note}</p>
            <RoleLedger roles={system.roles} />

            <section
              className="modernist-typography-lab__title"
              aria-label="Display title and supporting deck"
            >
              <span>Essay / Career</span>
              <h3>Stop Being Your Own Rejection Letter</h3>
              <p>
                In early 2024, a founding engineer at Cursor emailed me about
                being their ninth hire. I turned myself down without asking a
                single question.
              </p>
            </section>

            <section
              className="modernist-typography-lab__support"
              aria-label="Supporting headline and body text"
            >
              <div>
                <span>01 / Section</span>
                <h4>The email</h4>
              </div>
              <p>
                The other side held the door open, and I shut it anyway — in
                writing, and left no room for doubt. I ran their screening for
                them and mailed the rejection to myself.
              </p>
            </section>

            <section
              className="modernist-typography-lab__cjk"
              aria-label="Chinese editorial roles"
              lang="zh-Hans"
            >
              <div>
                <span>文章 / 产品</span>
                <h4>产品十诫</h4>
              </div>
              <p>
                你要诚实面对：你是真心想做成一个产品，还是只是喜欢“做产品”这个想法。
              </p>
            </section>

            <footer className="modernist-typography-lab__apparatus">
              <strong>100 Vision Papers</strong>
              <nav aria-label={`${system.label} control specimen`}>
                <span>Map</span>
                <span>Index</span>
                <span>Method</span>
              </nav>
              <time dateTime="2026-06-16">16.06.2026</time>
            </footer>
          </article>
        ))}
      </div>
    </main>
  );
}
