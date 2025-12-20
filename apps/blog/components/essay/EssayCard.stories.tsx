import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EssayCard } from './EssayCard';

const meta: Meta<typeof EssayCard> = {
  title: 'Blog / Essay / EssayCard',
  component: EssayCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['guide', 'deep-dive', 'opinion', 'review', 'narrative'],
    },
    topics: {
      control: 'check',
      options: ['technical', 'ai', 'product', 'career'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'compact'],
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EssayCard>;

export const Default: Story = {
  args: {
    slug: 'how-transformers-work',
    type: 'guide',
    topics: ['technical', 'ai'],
    title: 'How Transformers Work',
    description:
      'A comprehensive guide to understanding the transformer architecture that powers modern AI systems and large language models.',
    date: '2024-12-14',
    readingTime: 15,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    slug: 'how-transformers-work',
    type: 'guide',
    topics: ['technical', 'ai'],
    title: 'How Transformers Work',
    description:
      'A comprehensive guide to understanding the transformer architecture that powers modern AI.',
    date: '2024-12-14',
    readingTime: 15,
    variant: 'compact',
  },
};

export const DeepDive: Story = {
  args: {
    slug: 'economics-of-foundation-models',
    type: 'deep-dive',
    topics: ['ai', 'product'],
    title: 'The Economics of Foundation Models',
    description:
      'Understanding the business dynamics behind large language models and their market implications for startups and enterprises.',
    date: '2024-11-20',
    readingTime: 22,
  },
};

export const Opinion: Story = {
  args: {
    slug: 'senior-engineers-should-write',
    type: 'opinion',
    topics: ['career'],
    title: 'Why Senior Engineers Should Write More',
    description:
      'Writing is thinking, and thinking is your job. A case for engineering leaders to prioritize written communication.',
    date: '2024-10-05',
    readingTime: 8,
  },
};

export const Review: Story = {
  args: {
    slug: 'typescript-5-3-review',
    type: 'review',
    topics: ['technical'],
    title: 'Reviewing the New TypeScript 5.3 Features',
    description:
      'A practical look at what matters and what you can safely ignore in the latest TypeScript release.',
    date: '2024-09-15',
    readingTime: 12,
  },
};

export const Narrative: Story = {
  args: {
    slug: 'first-10k-lines',
    type: 'narrative',
    topics: ['career', 'technical'],
    title: 'My First 10,000 Lines of Code',
    description:
      'Reflections on a decade of writing software and what I wish I knew when I started.',
    date: '2024-08-01',
    readingTime: 18,
  },
};

export const LongTitle: Story = {
  args: {
    slug: 'long-title-example',
    type: 'guide',
    topics: ['technical', 'ai'],
    title:
      'A Very Long Title That Might Need to Wrap Across Multiple Lines in the Card',
    description:
      'This tests how the card handles longer titles that may need to wrap.',
    date: '2024-07-01',
    readingTime: 10,
  },
};

export const LongDescription: Story = {
  args: {
    slug: 'long-description-example',
    type: 'deep-dive',
    topics: ['product', 'ai'],
    title: 'Short Title',
    description:
      'This is a very long description that should be truncated to two lines. It contains a lot of extra text to test the line-clamp functionality and ensure that the card maintains a consistent height regardless of the description length. The truncation should happen gracefully with an ellipsis.',
    date: '2024-06-15',
    readingTime: 25,
  },
};

export const NoReadingTime: Story = {
  args: {
    slug: 'no-reading-time',
    type: 'opinion',
    topics: ['career'],
    title: 'A Quick Thought',
    description: 'Sometimes essays have no reading time calculated.',
    date: '2024-05-01',
  },
};
