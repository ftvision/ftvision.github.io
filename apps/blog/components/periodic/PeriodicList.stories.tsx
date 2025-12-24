import type { Meta, StoryObj } from '@storybook/react';
import { PeriodicList } from './PeriodicList';
import type { PeriodicMeta } from '@/types/content';

const samplePeriodics: PeriodicMeta[] = [
  {
    slug: 'weekly-digest-42',
    issue: 42,
    type: 'digest',
    topics: ['technical', 'ai'],
    title: 'Weekly AI Digest #42',
    description:
      'This week: OpenAI announces GPT-5, Google releases Gemini Ultra, and Meta open-sources their latest research model.',
    date: '2024-12-14',
    lang: 'en',
    readingTime: 8,
  },
  {
    slug: 'changelog-3',
    issue: 3,
    type: 'changelog',
    topics: ['technical'],
    title: 'Project Changelog Q4 2024',
    description:
      'Major updates to the blog platform including new features, performance improvements, and bug fixes.',
    date: '2024-11-20',
    lang: 'en',
    readingTime: 5,
  },
  {
    slug: 'learning-notes-7',
    issue: 7,
    type: 'notes',
    topics: ['learning', 'research'],
    title: 'Learning Notes: Machine Learning Fundamentals',
    description:
      'Personal notes and takeaways from studying ML fundamentals.',
    date: '2024-10-05',
    lang: 'en',
    readingTime: 15,
  },
  {
    slug: 'weekly-digest-41',
    issue: 41,
    type: 'digest',
    topics: ['ai', 'product'],
    title: 'Weekly AI Digest #41',
    description:
      'Coverage of the latest AI product launches and industry trends.',
    date: '2024-09-15',
    lang: 'en',
    readingTime: 10,
  },
  {
    slug: 'design-notes-2',
    issue: 2,
    type: 'notes',
    topics: ['design', 'product'],
    title: 'Design System Notes',
    description:
      'Documenting design decisions and component patterns.',
    date: '2024-08-01',
    lang: 'en',
    readingTime: 12,
  },
  {
    slug: 'changelog-2',
    issue: 2,
    type: 'changelog',
    topics: ['technical'],
    title: 'Project Changelog Q3 2024',
    description:
      'Summer updates and improvements to the platform.',
    date: '2024-07-22',
    lang: 'en',
    readingTime: 6,
  },
];

const meta: Meta<typeof PeriodicList> = {
  title: 'Blog / Periodic / PeriodicList',
  component: PeriodicList,
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
    language: {
      control: 'radio',
      options: ['en', 'zh'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PeriodicList>;

export const ListLayout: Story = {
  args: {
    periodics: samplePeriodics,
    layout: 'list',
    variant: 'default',
  },
};

export const GridLayout: Story = {
  args: {
    periodics: samplePeriodics,
    layout: 'grid',
    variant: 'default',
  },
};

export const CompactList: Story = {
  args: {
    periodics: samplePeriodics.slice(0, 3),
    layout: 'list',
    variant: 'compact',
  },
};

export const CompactGrid: Story = {
  args: {
    periodics: samplePeriodics.slice(0, 3),
    layout: 'grid',
    variant: 'compact',
  },
};

export const SinglePeriodic: Story = {
  args: {
    periodics: [samplePeriodics[0]],
    layout: 'list',
    variant: 'default',
  },
};

export const Empty: Story = {
  args: {
    periodics: [],
    layout: 'list',
    emptyMessage: 'No periodics found matching your criteria.',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    periodics: [],
    layout: 'grid',
    emptyMessage: 'Nothing here yet. Check back soon!',
  },
};

export const ChinesePeriodics: Story = {
  args: {
    periodics: [
      {
        slug: 'weekly-digest-42-zh',
        issue: 42,
        type: 'digest',
        topics: ['technical', 'ai'],
        title: '每周AI摘要 #42',
        description: '本周：OpenAI发布GPT-5，Google推出Gemini Ultra。',
        date: '2024-12-14',
        lang: 'zh',
        readingTime: 8,
      },
      {
        slug: 'changelog-3-zh',
        issue: 3,
        type: 'changelog',
        topics: ['technical'],
        title: '项目更新日志 Q4 2024',
        description: '博客平台的重大更新，包括新功能、性能改进和错误修复。',
        date: '2024-11-20',
        lang: 'zh',
        readingTime: 5,
      },
    ],
    layout: 'list',
    language: 'zh',
    basePath: '/zh/periodics',
  },
};
