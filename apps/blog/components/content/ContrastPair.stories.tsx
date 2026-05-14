import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ContrastPair,
  ContrastPositive,
  ContrastNegative,
} from './ContrastPair';

const meta: Meta<typeof ContrastPair> = {
  title: 'Blog / Content / ContrastPair',
  component: ContrastPair,
  decorators: [
    (Story) => (
      <div className="max-w-prose mx-auto p-8">
        <p className="text-body leading-relaxed mb-4 text-figure-primary">
          Surrounding essay text. The component below sits inline within an
          essay flow, between paragraphs.
        </p>
        <Story />
        <p className="text-body leading-relaxed mt-4 text-figure-primary">
          And the essay continues here. The pair is meant to feel like part of
          the writing, not a UI panel grafted in.
        </p>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContrastPair>;

export const Default: Story = {
  render: () => (
    <ContrastPair>
      <ContrastPositive>
        <p>
          I worked in a team where I could ask questions and my mentor always
          taught me patiently. Sometimes he extended more than what I asked
          and pointed me to further references. The interaction was friendly
          and supportive.
        </p>
      </ContrastPositive>
      <ContrastNegative>
        <p>
          I worked in a team where asking questions was nominally encouraged
          but the feedback was uncomfortable. I was told to think more without
          guidance, or that my explorations were useless. I became afraid to
          ask.
        </p>
      </ContrastNegative>
    </ContrastPair>
  ),
};

export const WithCustomLabels: Story = {
  render: () => (
    <ContrastPair>
      <ContrastPositive label="What helped">
        <p>
          Short feedback loops. Reviewers who explained the reasoning behind
          the suggestion, not just the suggestion itself.
        </p>
      </ContrastPositive>
      <ContrastNegative label="What hurt">
        <p>
          Long review cycles where the rationale arrived weeks later, by which
          point the context was gone.
        </p>
      </ContrastNegative>
    </ContrastPair>
  ),
};

export const WideToggle: Story = {
  render: () => (
    <ContrastPair width="wide">
      <ContrastPositive label="长处">
        <ol>
          <li>
            <p>
              Persistent, broad curiosity. I enjoy learning new things and
              widening the surface area of what I already know, deliberately
              avoiding being trapped by an existing path.
            </p>
          </li>
          <li>
            <p>
              Ambitious. I refuse to settle. I have confidence in my ability
              to learn — if someone else can do it, I probably can too.
            </p>
          </li>
          <li>
            <p>
              I create uncomfortable-zone challenges for myself, in work and
              in life, to keep from drifting into status quo. Occasionally I
              try risky things — skydiving, snowboarding — because I think
              risk tolerance is a trainable skill.
            </p>
          </li>
        </ol>
      </ContrastPositive>
      <ContrastNegative label="短处">
        <ol>
          <li>
            <p>
              Broad interests, but no single 200%-passion. Chasing different
              interests sometimes costs me focus, or makes me look better at
              talking than at doing.
            </p>
          </li>
          <li>
            <p>
              Every major change to my path costs me some of what I'd
              previously accumulated. There's a gap between me and peers who
              walked one path all the way down, though that gap shrinks with
              time.
            </p>
          </li>
          <li>
            <p>
              Some self-imposed challenges look unnecessary in retrospect.
              They were distractions that fragmented attention and energy.
            </p>
          </li>
        </ol>
      </ContrastNegative>
    </ContrastPair>
  ),
};

export const MultipleParagraphs: Story = {
  render: () => (
    <ContrastPair>
      <ContrastPositive>
        <p>
          A team that respected the difference between disagreement and
          dismissal. We argued about technical choices regularly, but the
          arguments were about the work, not about each other.
        </p>
        <p>
          The clearest signal was that people changed their minds in meetings.
          That only happens when disagreement is safe.
        </p>
      </ContrastPositive>
      <ContrastNegative>
        <p>
          A team where disagreement felt like a status threat. Pushback meant
          someone losing face, so most pushback didn&apos;t happen.
        </p>
        <p>
          The decisions weren&apos;t obviously wrong, but the conversations to
          reach them were thin. Things got rebuilt later in private.
        </p>
      </ContrastNegative>
    </ContrastPair>
  ),
};
