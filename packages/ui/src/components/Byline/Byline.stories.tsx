import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Byline } from './Byline';

const meta: Meta<typeof Byline> = {
  title: 'Editorial/Byline',
  component: Byline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    layout: {
      control: 'select',
      options: ['inline', 'stacked'],
    },
    showAvatar: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authors: {
      name: 'Jane Doe',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    date: '2025-12-14',
    readingTime: 5,
  },
};

export const SingleAuthor: Story = {
  name: 'Single Author',
  args: {
    authors: {
      name: 'John Smith',
      role: 'Senior Reporter',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      href: '/authors/john-smith',
    },
    date: '2025-12-14',
    readingTime: 8,
  },
};

export const MultipleAuthors: Story = {
  name: 'Multiple Authors',
  args: {
    authors: [
      { name: 'Jane Doe', href: '/authors/jane-doe' },
      { name: 'John Smith', href: '/authors/john-smith' },
    ],
    date: '2025-12-14',
    readingTime: 12,
    showAvatar: false,
  },
};

export const ThreeAuthors: Story = {
  name: 'Three Authors',
  args: {
    authors: [
      { name: 'Jane Doe' },
      { name: 'John Smith' },
      { name: 'Alice Johnson' },
    ],
    date: '2025-12-14',
    showAvatar: false,
  },
};

export const StackedLayout: Story = {
  name: 'Stacked Layout',
  args: {
    authors: {
      name: 'Jane Doe',
      role: 'Technology Editor',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      href: '/authors/jane-doe',
    },
    date: '2025-12-14',
    readingTime: 5,
    layout: 'stacked',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-caption text-figure-muted mb-2">Small</p>
        <Byline
          size="sm"
          authors={{ name: 'Jane Doe', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }}
          date="2025-12-14"
          readingTime={5}
        />
      </div>
      <div>
        <p className="text-caption text-figure-muted mb-2">Medium (default)</p>
        <Byline
          size="md"
          authors={{ name: 'Jane Doe', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }}
          date="2025-12-14"
          readingTime={5}
        />
      </div>
      <div>
        <p className="text-caption text-figure-muted mb-2">Large</p>
        <Byline
          size="lg"
          authors={{ name: 'Jane Doe', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }}
          date="2025-12-14"
          readingTime={5}
        />
      </div>
    </div>
  ),
};

export const WithoutAvatar: Story = {
  name: 'Without Avatar',
  args: {
    authors: { name: 'Staff Reporter' },
    date: '2025-12-14',
    readingTime: 3,
    showAvatar: false,
  },
};

export const DateOnly: Story = {
  name: 'Date Only',
  args: {
    authors: { name: 'Editorial Board' },
    date: '2025-12-14',
    showAvatar: false,
  },
};

export const InArticle: Story = {
  name: 'In Article Context',
  render: () => (
    <article className="max-w-prose space-y-4">
      <header className="space-y-4">
        <p className="text-overline text-accent-primary uppercase tracking-wide font-semibold">
          Technology
        </p>
        <h1 className="text-h1 font-bold text-figure-primary leading-tight">
          The Future of Artificial Intelligence in Newsrooms
        </h1>
        <p className="text-body-sm text-figure-secondary">
          How AI tools are transforming journalism and what it means for the industry
        </p>
        <Byline
          layout="stacked"
          authors={{
            name: 'Sarah Chen',
            role: 'Technology Correspondent',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            href: '/authors/sarah-chen',
          }}
          date="2025-12-14"
          readingTime={8}
        />
      </header>
      <p className="text-body text-figure-primary pt-4 border-t border-border">
        The integration of artificial intelligence in newsrooms represents one of
        the most significant transformations in journalism since the advent of
        the internet. From automated story generation to advanced fact-checking
        tools, AI is reshaping how news is gathered, written, and distributed.
      </p>
    </article>
  ),
};

export const CompactArticleList: Story = {
  name: 'Compact Article List',
  render: () => (
    <div className="space-y-4 max-w-md">
      {[
        { title: 'Breaking: Market Hits New High', author: 'John Smith', time: 3 },
        { title: 'Tech Giants Face New Regulations', author: 'Jane Doe', time: 5 },
        { title: 'Climate Summit Updates', author: 'Alex Johnson', time: 4 },
      ].map((article, index) => (
        <article key={index} className="border-b border-border pb-4 last:border-0">
          <h3 className="text-body font-medium text-figure-primary mb-1">
            {article.title}
          </h3>
          <Byline
            size="sm"
            authors={{ name: article.author }}
            readingTime={article.time}
            showAvatar={false}
          />
        </article>
      ))}
    </div>
  ),
};
