import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
  title: 'Editorial/Blockquote',
  component: Blockquote,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pullquote', 'highlight'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The only way to do great work is to love what you do.',
    citation: 'Steve Jobs',
  },
  decorators: [(Story) => <div className="max-w-prose"><Story /></div>],
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="max-w-prose space-y-8">
      <div>
        <h3 className="text-caption text-figure-muted mb-2">Default</h3>
        <Blockquote citation="The New York Times">
          The investigation revealed a pattern of behavior that extended over several years,
          according to documents reviewed by The Times.
        </Blockquote>
      </div>

      <div>
        <h3 className="text-caption text-figure-muted mb-2">Pullquote</h3>
        <Blockquote variant="pullquote" citation="Jane Doe, CEO">
          Innovation distinguishes between a leader and a follower.
        </Blockquote>
      </div>

      <div>
        <h3 className="text-caption text-figure-muted mb-2">Highlight</h3>
        <Blockquote variant="highlight" citation="Annual Report 2024">
          Revenue increased by 23% year-over-year, marking the company's strongest
          performance in the past decade.
        </Blockquote>
      </div>
    </div>
  ),
};

export const WithCitationLink: Story = {
  name: 'With Citation Link',
  args: {
    children: 'Democracy dies in darkness.',
    citation: 'The Washington Post',
    citationHref: 'https://www.washingtonpost.com',
  },
  decorators: [(Story) => <div className="max-w-prose"><Story /></div>],
};

export const Pullquote: Story = {
  args: {
    variant: 'pullquote',
    children: 'The future belongs to those who believe in the beauty of their dreams.',
    citation: 'Eleanor Roosevelt',
  },
  decorators: [(Story) => <div className="max-w-prose"><Story /></div>],
};

export const Highlight: Story = {
  args: {
    variant: 'highlight',
    children: 'Key finding: Over 70% of respondents indicated they would support the proposed changes, a significant increase from last year\'s survey.',
    citation: 'Research Summary',
  },
  decorators: [(Story) => <div className="max-w-prose"><Story /></div>],
};

export const InArticle: Story = {
  name: 'In Article Context',
  render: () => (
    <article className="max-w-prose space-y-4">
      <p className="text-body text-figure-primary">
        The economic landscape has shifted dramatically over the past year, with
        unprecedented changes affecting markets worldwide. Analysts point to several
        key factors driving this transformation.
      </p>

      <Blockquote citation="Federal Reserve Chair">
        We are navigating through uncharted territory, and our policy decisions
        must balance short-term stability with long-term growth.
      </Blockquote>

      <p className="text-body text-figure-primary">
        This sentiment reflects the broader uncertainty facing policymakers as they
        attempt to steer the economy through turbulent times. Many experts believe
        that the coming months will be critical.
      </p>

      <Blockquote variant="pullquote">
        The decisions made today will shape the economic reality for generations.
      </Blockquote>

      <p className="text-body text-figure-primary">
        Looking ahead, industry leaders remain cautiously optimistic. The consensus
        suggests that while challenges persist, there are also significant opportunities
        for those prepared to adapt.
      </p>

      <Blockquote variant="highlight" citation="Q4 Earnings Report">
        Despite headwinds, the company exceeded expectations with a 15% increase
        in quarterly revenue, driven primarily by expansion in emerging markets.
      </Blockquote>

      <p className="text-body text-figure-primary">
        These results underscore the importance of strategic diversification in
        uncertain times. Companies that have invested in new markets are seeing
        the benefits of their forward-thinking approach.
      </p>
    </article>
  ),
};

export const LongQuote: Story = {
  name: 'Long Quote',
  args: {
    children: `The press is the best instrument for enlightening the mind of man, and
    improving him as a rational, moral and social being. A coalition of
    sentiments is not for the interest of printers. They, like the clergy,
    live by the zeal they can kindle and the schisms they can create.`,
    citation: 'Thomas Jefferson',
  },
  decorators: [(Story) => <div className="max-w-prose"><Story /></div>],
};

export const WithoutCitation: Story = {
  name: 'Without Citation',
  args: {
    children: 'Sometimes the most important news is what isn\'t being reported.',
  },
  decorators: [(Story) => <div className="max-w-prose"><Story /></div>],
};
