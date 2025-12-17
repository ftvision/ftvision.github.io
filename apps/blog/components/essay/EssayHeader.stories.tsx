import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EssayHeader } from './EssayHeader';

const meta: Meta<typeof EssayHeader> = {
  title: 'Blog / Essay / EssayHeader',
  component: EssayHeader,
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
  },
};

export default meta;
type Story = StoryObj<typeof EssayHeader>;

export const Guide: Story = {
  args: {
    type: 'guide',
    topics: ['technical', 'ai'],
    title: 'How Transformers Work',
    description:
      'A comprehensive guide to understanding the transformer architecture that powers modern AI.',
    date: '2024-12-14',
    readingTime: 15,
  },
};

export const DeepDive: Story = {
  args: {
    type: 'deep-dive',
    topics: ['ai', 'product'],
    title: 'The Economics of Foundation Models',
    description:
      'Understanding the business dynamics behind large language models and their market implications.',
    date: '2024-11-20',
    readingTime: 22,
  },
};

export const Opinion: Story = {
  args: {
    type: 'opinion',
    topics: ['career'],
    title: 'Why Senior Engineers Should Write More',
    description: 'Writing is thinking, and thinking is your job.',
    date: '2024-10-05',
    readingTime: 8,
  },
};

export const Review: Story = {
  args: {
    type: 'review',
    topics: ['technical'],
    title: 'Reviewing the New TypeScript 5.3 Features',
    description: 'A practical look at what matters and what you can ignore.',
    date: '2024-09-15',
    readingTime: 12,
  },
};

export const Narrative: Story = {
  args: {
    type: 'narrative',
    topics: ['career', 'technical'],
    title: 'My First 10,000 Lines of Code',
    description:
      'Reflections on a decade of writing software and what I wish I knew earlier.',
    date: '2024-08-01',
    readingTime: 18,
  },
};

export const WithoutDescription: Story = {
  args: {
    type: 'guide',
    topics: ['technical'],
    title: 'Quick Tips for Better Git Commits',
    date: '2024-07-10',
    readingTime: 5,
  },
};

export const SingleTopic: Story = {
  args: {
    type: 'opinion',
    topics: ['ai'],
    title: 'AI Will Not Replace Engineers',
    description: 'At least not in the way you think.',
    date: '2024-06-22',
    readingTime: 10,
  },
};

export const AllTopics: Story = {
  args: {
    type: 'deep-dive',
    topics: ['technical', 'ai', 'product', 'career'],
    title: 'Building AI Products: A Complete Guide',
    description:
      'From technical implementation to product strategy and career implications.',
    date: '2024-05-15',
    readingTime: 45,
  },
};
