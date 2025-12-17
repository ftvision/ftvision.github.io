import type { Meta, StoryObj } from '@storybook/react';
import { MarginNote } from './MarginNote';

const meta: Meta<typeof MarginNote> = {
  title: 'Components/Themes/Chinese Aesthetic/MarginNote',
  component: MarginNote,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
MarginNote (眉批) renders scholarly annotations as expandable inline notes.

Click the marker symbol to reveal/hide the note content. The note appears
as an indented block below the text, styled with a left border accent.

**Variants:**
- \`sidenote\` (†): General reader annotations
- \`author\` (按): Author's personal commentary
- \`reference\` (※): Scholarly citations and sources
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['sidenote', 'author', 'reference'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MarginNote>;

export const Sidenote: Story = {
  render: () => (
    <div className="max-w-prose">
      <p className="type-body text-figure-primary">
        The concept of 留白 (liúbái) in Chinese painting refers to the deliberate
        use of empty space.
        <MarginNote id="note-1" variant="sidenote">
          留白 literally means "leaving white" — the unpainted areas of the paper.
        </MarginNote>
        {' '}This technique allows viewers to complete the image with their imagination.
      </p>
    </div>
  ),
};

export const AuthorNote: Story = {
  render: () => (
    <div className="max-w-prose">
      <p className="type-body text-figure-primary">
        The brush moves like breath—sometimes quick, sometimes slow.
        <MarginNote id="note-2" variant="author">
          This relates to the calligraphic principle of 气韵生动 (qìyùn shēngdòng).
        </MarginNote>
        {' '}But always with intention.
      </p>
    </div>
  ),
};

export const Reference: Story = {
  render: () => (
    <div className="max-w-prose">
      <p className="type-body text-figure-primary">
        As Wang Wei wrote in his treatise on landscape painting...
        <MarginNote id="note-3" variant="reference">
          《山水论》(Shan Shui Lun), Tang Dynasty, circa 8th century.
        </MarginNote>
        {' '}The artist must first understand the mountain before painting it.
      </p>
    </div>
  ),
};

export const CustomMarker: Story = {
  render: () => (
    <div className="max-w-prose">
      <p className="type-body text-figure-primary">
        The five tones of ink (墨分五色) create depth without color.
        <MarginNote id="note-4" variant="sidenote" marker="1">
          Scorched, thick, heavy, light, and clear — representing different
          dilutions of ink.
        </MarginNote>
        {' '}This technique is fundamental to Chinese brush painting.
      </p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="max-w-prose">
        <h3 className="type-h4 text-figure-primary mb-2">Sidenote (Default)</h3>
        <p className="type-body text-figure-secondary">
          A reader's annotation in the margin.
          <MarginNote id="all-1" variant="sidenote">
            Sidenotes provide additional context without interrupting flow.
          </MarginNote>
        </p>
      </div>

      <div className="max-w-prose">
        <h3 className="type-h4 text-figure-primary mb-2">Author Note</h3>
        <p className="type-body text-figure-secondary">
          The author's personal commentary.
          <MarginNote id="all-2" variant="author">
            Author notes use the seal red accent to indicate authorial voice.
          </MarginNote>
        </p>
      </div>

      <div className="max-w-prose">
        <h3 className="type-h4 text-figure-primary mb-2">Reference</h3>
        <p className="type-body text-figure-secondary">
          Scholarly citation and source.
          <MarginNote id="all-3" variant="reference">
            References use muted, italic styling for citations.
          </MarginNote>
        </p>
      </div>
    </div>
  ),
};

export const InArticleContext: Story = {
  render: () => (
    <article className="max-w-prose">
      <h2 className="type-h2 text-figure-primary mb-4">
        On the Nature of Emptiness
      </h2>

      <p className="type-body text-figure-primary mb-4">
        计白当黑 — "Count the white as black."
        <MarginNote id="context-1" variant="author">
          This phrase appears in 清代画论 (Qing Dynasty painting treatises).
        </MarginNote>
        {' '}In Chinese painting, the areas without ink are not empty. They are mist
        between mountains, silence between words, the space where imagination
        completes what the artist deliberately left unfinished.
      </p>

      <p className="type-body text-figure-primary mb-4">
        This is not Western minimalism, which removes until function is served.
        <MarginNote id="context-2" variant="sidenote">
          Compare with the Bauhaus principle "less is more" — a fundamentally
          different philosophy.
        </MarginNote>
        {' '}Chinese emptiness adds absence until presence is felt. The difference is
        subtle but profound.
      </p>

      <p className="type-body text-figure-primary">
        As the Tao Te Ching states, "The usefulness of a vessel comes from its
        emptiness."
        <MarginNote id="context-3" variant="reference">
          道德经, Chapter 11. Translation by various scholars differs.
        </MarginNote>
      </p>
    </article>
  ),
};
