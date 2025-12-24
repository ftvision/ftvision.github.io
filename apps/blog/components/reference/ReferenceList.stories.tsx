import type { Meta, StoryObj } from '@storybook/react';
import { ReferenceList } from './ReferenceList';
import type { ReferenceMeta } from '@/types/content';

const sampleReferences: ReferenceMeta[] = [
  {
    slug: 'vision-100-papers',
    category: 'bibliography',
    topics: ['research', 'ai'],
    title: '100 Influential Vision Papers',
    description:
      'A curated collection of the most influential papers in computer vision and image understanding.',
    date: '2024-01-01',
    updated: '2024-12-15',
    lang: 'en',
    itemCount: 100,
    readingTime: 45,
  },
  {
    slug: 'system-design-resources',
    category: 'resources',
    topics: ['technical', 'career'],
    title: 'System Design Interview Resources',
    description:
      'Comprehensive collection of resources for preparing for system design interviews.',
    date: '2024-06-01',
    updated: '2024-11-20',
    lang: 'en',
    itemCount: 50,
    readingTime: 30,
  },
  {
    slug: 'product-management-books',
    category: 'reading-list',
    topics: ['product', 'career'],
    title: 'Product Management Reading List',
    description:
      'Essential books for aspiring and experienced product managers.',
    date: '2024-02-15',
    lang: 'en',
    itemCount: 15,
    readingTime: 10,
  },
  {
    slug: 'developer-tools-2024',
    category: 'tools',
    topics: ['technical', 'design'],
    title: 'Developer Tools 2024',
    description:
      'A curated list of the best development tools and productivity software.',
    date: '2024-01-10',
    updated: '2024-12-10',
    lang: 'en',
    itemCount: 75,
    readingTime: 15,
  },
  {
    slug: 'transformer-papers',
    category: 'bibliography',
    topics: ['ai', 'research'],
    title: 'Essential Transformer Papers',
    description:
      'From Attention Is All You Need to the latest advances.',
    date: '2024-03-01',
    updated: '2024-12-01',
    lang: 'en',
    itemCount: 25,
    readingTime: 20,
  },
  {
    slug: 'ml-learning-resources',
    category: 'resources',
    topics: ['learning', 'ai'],
    title: 'Machine Learning Learning Resources',
    description:
      'Courses, tutorials, and guides for learning machine learning.',
    date: '2024-04-01',
    lang: 'en',
    itemCount: 40,
    readingTime: 18,
  },
];

const meta: Meta<typeof ReferenceList> = {
  title: 'Blog / Reference / ReferenceList',
  component: ReferenceList,
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
type Story = StoryObj<typeof ReferenceList>;

export const GridLayout: Story = {
  args: {
    references: sampleReferences,
    layout: 'grid',
    variant: 'default',
  },
};

export const ListLayout: Story = {
  args: {
    references: sampleReferences,
    layout: 'list',
    variant: 'default',
  },
};

export const CompactGrid: Story = {
  args: {
    references: sampleReferences.slice(0, 3),
    layout: 'grid',
    variant: 'compact',
  },
};

export const CompactList: Story = {
  args: {
    references: sampleReferences.slice(0, 3),
    layout: 'list',
    variant: 'compact',
  },
};

export const SingleReference: Story = {
  args: {
    references: [sampleReferences[0]],
    layout: 'grid',
    variant: 'default',
  },
};

export const Empty: Story = {
  args: {
    references: [],
    layout: 'grid',
    emptyMessage: 'No references found matching your criteria.',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    references: [],
    layout: 'list',
    emptyMessage: 'Nothing here yet. Check back soon!',
  },
};

export const ChineseReferences: Story = {
  args: {
    references: [
      {
        slug: 'vision-100-papers-zh',
        category: 'bibliography',
        topics: ['research', 'ai'],
        title: '100篇经典视觉论文',
        description: '计算机视觉和图像理解领域最具影响力的论文精选集。',
        date: '2024-01-01',
        updated: '2024-12-15',
        lang: 'zh',
        itemCount: 100,
        readingTime: 45,
      },
      {
        slug: 'system-design-resources-zh',
        category: 'resources',
        topics: ['technical', 'career'],
        title: '系统设计面试资源',
        description: '准备顶级科技公司系统设计面试的综合资源集。',
        date: '2024-06-01',
        updated: '2024-11-20',
        lang: 'zh',
        itemCount: 50,
        readingTime: 30,
      },
    ],
    layout: 'grid',
    language: 'zh',
    basePath: '/zh/references',
  },
};

export const MixedCategories: Story = {
  args: {
    references: sampleReferences,
    layout: 'grid',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Showing references from different categories in a grid layout.',
      },
    },
  },
};
