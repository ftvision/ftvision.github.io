import type { Meta, StoryObj } from '@storybook/react';
import { PeriodicHeader } from './PeriodicHeader';

const meta: Meta<typeof PeriodicHeader> = {
  title: 'Blog / Periodic / PeriodicHeader',
  component: PeriodicHeader,
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
    language: {
      control: 'radio',
      options: ['en', 'zh'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PeriodicHeader>;

export const Digest: Story = {
  args: {
    issue: 42,
    type: 'digest',
    topics: ['technical', 'ai'],
    title: 'Weekly AI Digest #42',
    description:
      'This week: OpenAI announces GPT-5, Google releases Gemini Ultra, and Meta open-sources their latest research model.',
    date: '2024-12-14',
    readingTime: 8,
  },
};

export const Changelog: Story = {
  args: {
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

export const WithoutDescription: Story = {
  args: {
    issue: 1,
    type: 'digest',
    topics: ['technical'],
    title: 'Quick Tech Updates',
    date: '2024-07-10',
    readingTime: 5,
  },
};

export const SingleTopic: Story = {
  args: {
    issue: 10,
    type: 'notes',
    topics: ['ai'],
    title: 'AI Research Notes',
    description: 'Latest developments in AI research and applications.',
    date: '2024-06-22',
    readingTime: 10,
  },
};

export const AllTopics: Story = {
  args: {
    issue: 50,
    type: 'digest',
    topics: ['technical', 'ai', 'product', 'career', 'research', 'design', 'learning'],
    title: 'Comprehensive Tech Digest',
    description:
      'A comprehensive digest covering all aspects of technology, AI, product development, and career growth.',
    date: '2024-05-15',
    readingTime: 45,
  },
};

export const Chinese: Story = {
  args: {
    issue: 42,
    type: 'digest',
    topics: ['technical', 'ai'],
    title: '每周AI摘要 #42',
    description:
      '本周：OpenAI发布GPT-5，Google推出Gemini Ultra，Meta开源最新研究模型。',
    date: '2024-12-14',
    readingTime: 8,
    language: 'zh',
  },
};

export const HighIssueNumber: Story = {
  args: {
    issue: 999,
    type: 'digest',
    topics: ['technical'],
    title: 'Long-Running Digest Series',
    description: 'Testing how the UI handles high issue numbers.',
    date: '2024-12-01',
    readingTime: 8,
  },
};
