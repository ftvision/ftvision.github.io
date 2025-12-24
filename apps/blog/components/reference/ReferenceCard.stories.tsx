import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReferenceCard } from './ReferenceCard';

const meta: Meta<typeof ReferenceCard> = {
  title: 'Blog / Reference / ReferenceCard',
  component: ReferenceCard,
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
type Story = StoryObj<typeof ReferenceCard>;

export const Default: Story = {
  args: {
    slug: 'vision-100-papers',
    category: 'bibliography',
    topics: ['research', 'ai'],
    title: '100 Influential Vision Papers',
    description:
      'A curated collection of the most influential papers in computer vision and image understanding.',
    date: '2024-01-01',
    updated: '2024-12-15',
    itemCount: 100,
    readingTime: 45,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    slug: 'vision-100-papers',
    category: 'bibliography',
    topics: ['research', 'ai'],
    title: '100 Influential Vision Papers',
    description: 'Curated collection of influential vision papers.',
    date: '2024-01-01',
    updated: '2024-12-15',
    itemCount: 100,
    readingTime: 45,
    variant: 'compact',
  },
};

export const Resources: Story = {
  args: {
    slug: 'system-design-resources',
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

export const Bibliography: Story = {
  args: {
    slug: 'transformer-papers',
    category: 'bibliography',
    topics: ['ai', 'research'],
    title: 'Essential Transformer Papers',
    description:
      'From Attention Is All You Need to the latest advances in transformer architectures.',
    date: '2024-03-01',
    updated: '2024-12-01',
    itemCount: 25,
    readingTime: 20,
  },
};

export const ReadingList: Story = {
  args: {
    slug: 'product-management-books',
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
    slug: 'developer-tools-2024',
    category: 'tools',
    topics: ['technical', 'design'],
    title: 'Developer Tools 2024',
    description:
      'A curated list of the best development tools, IDEs, and productivity software for modern developers.',
    date: '2024-01-10',
    updated: '2024-12-10',
    itemCount: 75,
    readingTime: 15,
  },
};

export const WithoutUpdated: Story = {
  args: {
    slug: 'original-reference',
    category: 'resources',
    topics: ['learning'],
    title: 'Getting Started with Machine Learning',
    description:
      'Resources for beginners looking to start their ML journey.',
    date: '2024-05-01',
    itemCount: 20,
    readingTime: 12,
  },
};

export const WithoutItemCount: Story = {
  args: {
    slug: 'misc-resources',
    category: 'resources',
    topics: ['technical'],
    title: 'Miscellaneous Technical Resources',
    description:
      'A collection of useful technical resources and links.',
    date: '2024-04-01',
    updated: '2024-10-15',
    readingTime: 8,
  },
};

export const Chinese: Story = {
  args: {
    slug: 'vision-100-papers-zh',
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
    basePath: '/zh/references',
  },
};

export const LongTitle: Story = {
  args: {
    slug: 'long-title-reference',
    category: 'bibliography',
    topics: ['research', 'ai', 'technical'],
    title:
      'A Very Long Reference Title That Might Need to Wrap Across Multiple Lines in the Card',
    description:
      'This tests how the card handles longer titles that may need to wrap.',
    date: '2024-07-01',
    itemCount: 30,
    readingTime: 20,
  },
};

export const LongDescription: Story = {
  args: {
    slug: 'long-description-reference',
    category: 'resources',
    topics: ['learning'],
    title: 'Short Title',
    description:
      'This is a very long description that should be truncated to two lines. It contains a lot of extra text to test the line-clamp functionality and ensure that the card maintains a consistent height regardless of the description length. The truncation should happen gracefully with an ellipsis.',
    date: '2024-06-15',
    itemCount: 50,
    readingTime: 25,
  },
};
