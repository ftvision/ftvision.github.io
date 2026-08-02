export type ModernistTypefaceId =
  | "schibsted"
  | "archivo"
  | "instrument"
  | "original-narrow";

export interface ModernistTypefaceOption {
  id: ModernistTypefaceId;
  label: string;
  role: string;
  note: string;
}

export const MODERNIST_TYPEFACES: ModernistTypefaceOption[] = [
  {
    id: "schibsted",
    label: "Schibsted Grotesk",
    role: "Editorial grotesk",
    note: "Broad, sturdy forms with enough personality for publication headlines.",
  },
  {
    id: "archivo",
    label: "Archivo",
    role: "Industrial grotesk",
    note: "Tighter and more mechanical; strongest when the grid carries the hierarchy.",
  },
  {
    id: "instrument",
    label: "Instrument Sans",
    role: "Contemporary grotesk",
    note: "Quieter and less ideological, with the cleanest transition into body text.",
  },
  {
    id: "original-narrow",
    label: "Arial Narrow",
    role: "Rejected baseline",
    note: "The original compressed treatment: loud, generic, and visually brittle.",
  },
];

export function ModernistTypefaceLab() {
  return (
    <main className="modernist-type-lab">
      <header className="modernist-type-lab__header">
        <p>Modernist typography study / Latin roles</p>
        <h1>One grammar, four voices</h1>
        <div>
          <p>
            The display and apparatus faces change. Source Serif 4 remains the
            continuous-reading control, so the comparison isolates the public
            voice of each system.
          </p>
          <p>
            Titles preserve authored casing. Uppercase remains an apparatus
            device, not a compulsory definition of modernism.
          </p>
        </div>
      </header>

      <div className="modernist-type-lab__grid">
        {MODERNIST_TYPEFACES.map((typeface, index) => (
          <article
            className="modernist-system modernist-type-lab__specimen"
            data-modernist-typeface={typeface.id}
            key={typeface.id}
          >
            <header className="modernist-type-lab__specimen-header">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{typeface.role}</p>
                <h2>{typeface.label}</h2>
              </div>
            </header>

            <p className="modernist-type-lab__note">{typeface.note}</p>

            <section
              className="modernist-type-lab__title"
              aria-label="Display title"
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
              className="modernist-type-lab__support"
              aria-label="Supporting roles"
            >
              <div>
                <span>01 / Section</span>
                <h4>The email</h4>
              </div>
              <p>
                The other side held the door open, and I shut it anyway — in
                writing, and left no room for doubt.
              </p>
            </section>

            <footer className="modernist-type-lab__apparatus">
              <strong>100 Vision Papers</strong>
              <nav aria-label={`${typeface.label} control specimen`}>
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
