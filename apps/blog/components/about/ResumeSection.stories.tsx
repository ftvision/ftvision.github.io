import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResumeSection } from './ResumeSection';
import {
  workExperience,
  education,
  researchExperience,
  grantsAndAwards,
  teaching,
  sectionLabels,
} from './aboutData';

const meta: Meta<typeof ResumeSection> = {
  title: 'Blog / About / ResumeSection',
  component: ResumeSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResumeSection>;

// Build real resume sections from actual data
const realResumeSections = [
  {
    id: 'work',
    title: sectionLabels.en.workExperience,
    items: workExperience.en.map((item) => ({
      title: item.title,
      organization: item.organization,
      dateRange: item.dateRange,
      location: item.location,
    })),
  },
  {
    id: 'education',
    title: sectionLabels.en.education,
    items: education.en.map((item) => ({
      title: item.title,
      organization: item.organization,
      dateRange: item.dateRange,
      location: item.location,
    })),
  },
  {
    id: 'research',
    title: sectionLabels.en.researchExperience,
    items: researchExperience.en.map((item) => ({
      title: item.title,
      organization: item.organization,
      dateRange: item.dateRange,
      location: item.location,
      bullets: item.description ? [item.description] : undefined,
    })),
  },
  {
    id: 'awards',
    title: sectionLabels.en.grantsAndAwards,
    items: grantsAndAwards.en.map((award) => ({
      title: award.title,
      organization: award.organization,
      dateRange: award.dateRange,
    })),
  },
  {
    id: 'teaching',
    title: sectionLabels.en.teaching,
    items: teaching.en.map((course) => ({
      title: course.title,
      organization: course.organization,
      dateRange: course.dateRange,
      bullets: course.description ? [course.description] : undefined,
    })),
  },
];

// Chinese version
const chineseResumeSections = [
  {
    id: 'work',
    title: sectionLabels.zh.workExperience,
    items: workExperience.zh.map((item) => ({
      title: item.title,
      organization: item.organization,
      dateRange: item.dateRange,
      location: item.location,
    })),
  },
  {
    id: 'education',
    title: sectionLabels.zh.education,
    items: education.zh.map((item) => ({
      title: item.title,
      organization: item.organization,
      dateRange: item.dateRange,
      location: item.location,
    })),
  },
];

export const Default: Story = {
  args: {
    heading: 'Resume',
    sections: realResumeSections,
    defaultExpanded: ['work'],
  },
};

export const ChineseVersion: Story = {
  args: {
    heading: sectionLabels.zh.resume,
    sections: chineseResumeSections,
    defaultExpanded: ['work', 'education'],
  },
};

export const AllExpanded: Story = {
  args: {
    heading: 'Full Resume',
    sections: realResumeSections.slice(0, 3),
    defaultExpanded: ['work', 'education', 'research'],
  },
};

export const WorkAndEducation: Story = {
  args: {
    heading: 'Work & Education',
    sections: realResumeSections.slice(0, 2),
    defaultExpanded: ['work'],
  },
};

export const TeachingExperience: Story = {
  args: {
    heading: 'Teaching Experience',
    sections: [realResumeSections[4]],
    defaultExpanded: ['teaching'],
  },
};
