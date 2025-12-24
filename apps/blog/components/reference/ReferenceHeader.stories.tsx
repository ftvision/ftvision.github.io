import type { Meta, StoryObj } from '@storybook/react';
import { ReferenceHeader } from './ReferenceHeader';

const meta: Meta<typeof ReferenceHeader> = {
  title: 'Blog / Reference / ReferenceHeader',
  component: ReferenceHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['resources', 'bibliography', 'reading-list', 'tools'],
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
type Story = StoryObj<typeof ReferenceHeader>;

export const Bibliography: Story = {
  args: {
    category: 'bibliography',
    topics: ['research', 'ai'],
    title: '100 Influential Vision Papers',
    description:
      'A curated collection of the most influential papers in computer vision and image understanding.',
    date: '2024-01-01',
    updated: '2024-12-15',
    itemCount: 100,
    readingTime: 45,
  },
};

export const Resources: Story = {
  args: {
    category: 'resources',
    topics: ['technical', 'career'],
    title: 'System Design Interview Resources',
    description:
      'Comprehensive collection of resources for preparing for system design interviews at top tech companies.',
    date: '2024-06-01',
    updated: '2024-11-20',
    itemCount: 50,
    readingTime: 30,
  },
};

export const ReadingList: Story = {
  args: {
    category: 'reading-list',
    topics: ['product', 'career'],
    title: 'Product Management Reading List',
    description:
      'Essential books for aspiring and experienced product managers.',
    date: '2024-02-15',
    itemCount: 15,
    readingTime: 10,
  },
};

export const Tools: Story = {
  args: {
    category: 'tools',
    topics: ['technical', 'design'],
    title: 'Developer Tools 2024',
    description:
      'A curated list of the best development tools, IDEs, and productivity software.',
    date: '2024-01-10',
    updated: '2024-12-10',
    itemCount: 75,
    readingTime: 15,
  },
};

export const WithoutUpdated: Story = {
  args: {
    category: 'resources',
    topics: ['learning'],
    title: 'Getting Started with Machine Learning',
    description: 'Resources for beginners looking to start their ML journey.',
    date: '2024-05-01',
    itemCount: 20,
    readingTime: 12,
  },
};

export const WithoutItemCount: Story = {
  args: {
    category: 'resources',
    topics: ['technical'],
    title: 'Miscellaneous Technical Resources',
    description: 'A collection of useful technical resources and links.',
    date: '2024-04-01',
    updated: '2024-10-15',
    readingTime: 8,
  },
};

export const SingleTopic: Story = {
  args: {
    category: 'bibliography',
    topics: ['ai'],
    title: 'AI Research Papers',
    description: 'Key papers in artificial intelligence research.',
    date: '2024-06-22',
    itemCount: 30,
    readingTime: 25,
  },
};

export const AllTopics: Story = {
  args: {
    category: 'resources',
    topics: ['technical', 'ai', 'product', 'career', 'research', 'design', 'learning'],
    title: 'Comprehensive Tech Resources',
    description:
      'A comprehensive resource covering all aspects of technology, AI, product development, and career growth.',
    date: '2024-05-15',
    itemCount: 200,
    readingTime: 60,
  },
};

export const Chinese: Story = {
  args: {
    category: 'bibliography',
    topics: ['research', 'ai'],
    title: '100篇经典视觉论文',
    description:
      '计算机视觉和图像理解领域最具影响力的论文精选集。',
    date: '2024-01-01',
    updated: '2024-12-15',
    itemCount: 100,
    readingTime: 45,
    language: 'zh',
  },
};

export const HighItemCount: Story = {
  args: {
    category: 'resources',
    topics: ['technical'],
    title: 'Massive Resource Collection',
    description: 'Testing how the UI handles high item counts.',
    date: '2024-12-01',
    itemCount: 9999,
    readingTime: 120,
  },
};
