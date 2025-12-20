import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';
import { workExperience, education, researchExperience } from './aboutData';

const meta: Meta<typeof Timeline> = {
  title: 'Blog / About / Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-prose">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// Build timeline entries from real data
const timelineEntries = [
  ...workExperience.en.map((item, index) => ({
    date: item.dateRange,
    title: item.title,
    organization: item.organization,
    location: item.location,
    type: 'work' as const,
    current: index === 0,
  })),
  ...education.en.map((item) => ({
    date: item.dateRange,
    title: item.title,
    organization: item.organization,
    location: item.location,
    type: 'education' as const,
  })),
].sort((a, b) => {
  // Sort by start year descending
  const yearA = parseInt(a.date.split('/')[0]);
  const yearB = parseInt(b.date.split('/')[0]);
  return yearB - yearA;
});

const chineseTimelineEntries = [
  ...workExperience.zh.map((item, index) => ({
    date: item.dateRange,
    title: item.title,
    organization: item.organization,
    location: item.location,
    type: 'work' as const,
    current: index === 0,
  })),
  ...education.zh.map((item) => ({
    date: item.dateRange,
    title: item.title,
    organization: item.organization,
    location: item.location,
    type: 'education' as const,
  })),
].sort((a, b) => {
  const yearA = parseInt(a.date.split('/')[0]);
  const yearB = parseInt(b.date.split('/')[0]);
  return yearB - yearA;
});

export const Default: Story = {
  args: {
    heading: 'Journey',
    entries: timelineEntries,
  },
};

export const ChineseVersion: Story = {
  args: {
    heading: '我的历程',
    entries: chineseTimelineEntries,
  },
};

export const CareerOnly: Story = {
  args: {
    heading: 'Work History',
    entries: workExperience.en.map((item, index) => ({
      date: item.dateRange,
      title: item.title,
      organization: item.organization,
      location: item.location,
      type: 'work' as const,
      current: index === 0,
    })),
  },
};

export const EducationFocused: Story = {
  args: {
    heading: 'Education',
    entries: education.en.map((item) => ({
      date: item.dateRange,
      title: item.title,
      organization: item.organization,
      location: item.location,
      type: 'education' as const,
    })),
  },
};

export const ResearchExperience: Story = {
  args: {
    heading: 'Research Training',
    entries: researchExperience.en.map((item) => ({
      date: item.dateRange,
      title: item.title,
      organization: item.organization,
      location: item.location,
      type: 'education' as const,
      description: item.description,
    })),
  },
};
