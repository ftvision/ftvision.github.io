import type { Meta, StoryObj } from '@storybook/react';
import { EssayFilters } from './EssayFilters';

const meta: Meta<typeof EssayFilters> = {
  title: 'Blog / Essay / EssayFilters',
  component: EssayFilters,
  parameters: {
    layout: 'padded',
    // Mock Next.js router
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectedType: {
      control: 'select',
      options: [null, 'guide', 'deep-dive', 'opinion', 'review', 'narrative'],
    },
    selectedTopics: {
      control: 'check',
      options: ['technical', 'ai', 'product', 'career'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EssayFilters>;

export const NoFilters: Story = {
  args: {
    selectedType: null,
    selectedTopics: [],
  },
};

export const TypeSelected: Story = {
  args: {
    selectedType: 'guide',
    selectedTopics: [],
  },
};

export const TopicsSelected: Story = {
  args: {
    selectedType: null,
    selectedTopics: ['technical', 'ai'],
  },
};

export const BothFiltersSelected: Story = {
  args: {
    selectedType: 'deep-dive',
    selectedTopics: ['ai', 'product'],
  },
};

export const AllTopicsSelected: Story = {
  args: {
    selectedType: null,
    selectedTopics: ['technical', 'ai', 'product', 'career'],
  },
};

export const SingleTopicSelected: Story = {
  args: {
    selectedType: 'opinion',
    selectedTopics: ['career'],
  },
};
