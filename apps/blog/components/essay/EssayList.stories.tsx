import type { Meta, StoryObj } from '@storybook/react';
import { EssayList } from './EssayList';
import type { EssayMeta } from '@/types/content';

const sampleEssays: EssayMeta[] = [
  {
    slug: 'how-transformers-work',
    type: 'guide',
    topics: ['technical', 'ai'],
    title: 'How Transformers Work',
    description:
      'A comprehensive guide to understanding the transformer architecture that powers modern AI.',
    date: '2024-12-14',
    lang: 'en',
    readingTime: 15,
  },
  {
    slug: 'economics-of-foundation-models',
    type: 'deep-dive',
    topics: ['ai', 'product'],
    title: 'The Economics of Foundation Models',
    description:
      'Understanding the business dynamics behind large language models and their market implications.',
    date: '2024-11-20',
    lang: 'en',
    readingTime: 22,
  },
  {
    slug: 'senior-engineers-should-write',
    type: 'opinion',
    topics: ['career'],
    title: 'Why Senior Engineers Should Write More',
    description: 'Writing is thinking, and thinking is your job.',
    date: '2024-10-05',
    lang: 'en',
    readingTime: 8,
  },
  {
    slug: 'typescript-5-3-review',
    type: 'review',
    topics: ['technical'],
    title: 'Reviewing the New TypeScript 5.3 Features',
    description: 'A practical look at what matters and what you can ignore.',
    date: '2024-09-15',
    lang: 'en',
    readingTime: 12,
  },
  {
    slug: 'first-10k-lines',
    type: 'narrative',
    topics: ['career', 'technical'],
    title: 'My First 10,000 Lines of Code',
    description:
      'Reflections on a decade of writing software and what I wish I knew earlier.',
    date: '2024-08-01',
    lang: 'en',
    readingTime: 18,
  },
  {
    slug: 'ai-will-not-replace-engineers',
    type: 'opinion',
    topics: ['ai', 'career'],
    title: 'AI Will Not Replace Engineers',
    description: 'At least not in the way you think.',
    date: '2024-07-22',
    lang: 'en',
    readingTime: 10,
  },
];

const meta: Meta<typeof EssayList> = {
  title: 'Blog / Essay / EssayList',
  component: EssayList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['grid', 'list'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'compact'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EssayList>;

export const GridLayout: Story = {
  args: {
    essays: sampleEssays,
    layout: 'grid',
    variant: 'default',
  },
};

export const ListLayout: Story = {
  args: {
    essays: sampleEssays,
    layout: 'list',
    variant: 'default',
  },
};

export const CompactGrid: Story = {
  args: {
    essays: sampleEssays.slice(0, 3),
    layout: 'grid',
    variant: 'compact',
  },
};

export const CompactList: Story = {
  args: {
    essays: sampleEssays.slice(0, 3),
    layout: 'list',
    variant: 'compact',
  },
};

export const SingleEssay: Story = {
  args: {
    essays: [sampleEssays[0]],
    layout: 'list',
    variant: 'default',
  },
};

export const Empty: Story = {
  args: {
    essays: [],
    layout: 'grid',
    emptyMessage: 'No essays found matching your criteria.',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    essays: [],
    layout: 'list',
    emptyMessage: 'Nothing here yet. Check back soon!',
  },
};
