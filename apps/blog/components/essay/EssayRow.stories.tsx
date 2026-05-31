import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EssayRow } from './EssayRow';

const meta: Meta<typeof EssayRow> = {
  title: 'Blog / Essay / EssayRow',
  component: EssayRow,
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
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EssayRow>;

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
  },
};

export const List: Story = {
  render: (args) => (
    <ul className="flex flex-col">
      {[
        { ...args, slug: 'a', title: 'Coding Agents Connect Desktop, iPhone, and Pixel', type: 'narrative' as const, topics: ['ai' as const], readingTime: 7 },
        { ...args, slug: 'b', title: 'The Decision Game', type: 'opinion' as const, topics: ['career' as const], readingTime: 5 },
        { ...args, slug: 'c', title: 'On Programmer Craftsmanship', type: 'guide' as const, topics: ['technical' as const], readingTime: 8 },
      ].map((row) => (
        <li key={row.slug} className="border-t border-border">
          <EssayRow {...row} />
        </li>
      ))}
    </ul>
  ),
  args: {
    slug: 'placeholder',
    type: 'narrative',
    topics: ['ai'],
    title: 'Placeholder',
    description:
      'When a coding agent links desktop, iPhone, and Pixel into one workflow loop, mobile development finally feels seamless.',
    date: '2026-05-15',
    readingTime: 7,
  },
};
