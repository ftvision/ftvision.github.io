import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PeriodicCard } from './PeriodicCard';

const meta: Meta<typeof PeriodicCard> = {
  title: 'Blog / Periodic / PeriodicCard',
  component: PeriodicCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['digest', 'changelog', 'notes'],
    },
    topics: {
      control: 'check',
      options: ['technical', 'ai', 'product', 'career', 'research', 'design', 'learning'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'compact'],
    },
    language: {
      control: 'radio',
      options: ['en', 'zh'],
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
type Story = StoryObj<typeof PeriodicCard>;

export const Default: Story = {
  args: {
    slug: 'weekly-digest-42',
    issue: 42,
    type: 'digest',
    topics: ['technical', 'ai'],
    title: 'Weekly AI Digest #42',
    description:
      'This week: OpenAI announces GPT-5, Google releases Gemini Ultra, and Meta open-sources their latest research model.',
    date: '2024-12-14',
    readingTime: 8,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    slug: 'weekly-digest-42',
    issue: 42,
    type: 'digest',
    topics: ['technical', 'ai'],
    title: 'Weekly AI Digest #42',
    description: 'This week in AI news and updates.',
    date: '2024-12-14',
    readingTime: 8,
    variant: 'compact',
  },
};

export const Digest: Story = {
  args: {
    slug: 'tech-digest-15',
    issue: 15,
    type: 'digest',
    topics: ['technical', 'product'],
    title: 'Tech Digest: Frontend Frameworks',
    description:
      'A curated roundup of the latest frontend framework updates, including React 19, Vue 4, and Svelte 5.',
    date: '2024-11-20',
    readingTime: 12,
  },
};

export const Changelog: Story = {
  args: {
    slug: 'changelog-3',
    issue: 3,
    type: 'changelog',
    topics: ['technical'],
    title: 'Project Changelog Q4 2024',
    description:
      'Major updates to the blog platform including new features, performance improvements, and bug fixes.',
    date: '2024-10-01',
    readingTime: 5,
  },
};

export const Notes: Story = {
  args: {
    slug: 'learning-notes-7',
    issue: 7,
    type: 'notes',
    topics: ['learning', 'research'],
    title: 'Learning Notes: Machine Learning Fundamentals',
    description:
      'Personal notes and takeaways from studying ML fundamentals, including key concepts and practical examples.',
    date: '2024-09-15',
    readingTime: 15,
  },
};

export const Chinese: Story = {
  args: {
    slug: 'weekly-digest-42',
    issue: 42,
    type: 'digest',
    topics: ['technical', 'ai'],
    title: '每周AI摘要 #42',
    description:
      '本周：OpenAI发布GPT-5，Google推出Gemini Ultra，Meta开源最新研究模型。',
    date: '2024-12-14',
    readingTime: 8,
    language: 'zh',
    basePath: '/zh/periodics',
  },
};

export const LongTitle: Story = {
  args: {
    slug: 'long-title-digest',
    issue: 99,
    type: 'digest',
    topics: ['technical', 'ai', 'product'],
    title:
      'A Very Long Periodic Title That Might Need to Wrap Across Multiple Lines in the Card',
    description:
      'This tests how the card handles longer titles that may need to wrap.',
    date: '2024-07-01',
    readingTime: 10,
  },
};

export const LongDescription: Story = {
  args: {
    slug: 'long-description-digest',
    issue: 88,
    type: 'notes',
    topics: ['research', 'learning'],
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
    issue: 1,
    type: 'changelog',
    topics: ['technical'],
    title: 'Initial Release Notes',
    description: 'Sometimes periodics have no reading time calculated.',
    date: '2024-05-01',
  },
};
