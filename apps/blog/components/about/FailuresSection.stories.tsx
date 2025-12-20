import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FailuresSection } from './FailuresSection';
import {
  failedJobs,
  failedEducation,
  failedPublications,
  sectionLabels,
} from './aboutData';

const meta: Meta<typeof FailuresSection> = {
  title: 'Blog / About / FailuresSection',
  component: FailuresSection,
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
type Story = StoryObj<typeof FailuresSection>;

// Build failure sections from real data
const englishFailuresSections = [
  {
    id: 'jobs',
    title: sectionLabels.en.failedJobs,
    items: failedJobs.en.map((job) => ({
      title: job.company,
      location: job.location,
      subtitle: job.role,
      year: job.year,
      result: job.result,
    })),
  },
  {
    id: 'education',
    title: sectionLabels.en.failedEducation,
    items: failedEducation.en.map((item) => ({
      title: item.school,
      location: item.location,
      subtitle: item.program,
      year: item.year,
      result: item.result,
    })),
  },
  {
    id: 'publications',
    title: sectionLabels.en.failedPublications,
    items: failedPublications.en.map((pub) => ({
      title: pub.title,
      subtitle: pub.journal
        ? `${pub.authors ? pub.authors + ' - ' : ''}${pub.journal}`
        : pub.authors,
      year: pub.year,
      result: pub.result,
    })),
  },
];

const chineseFailuresSections = [
  {
    id: 'jobs',
    title: sectionLabels.zh.failedJobs,
    items: failedJobs.zh.map((job) => ({
      title: job.company,
      location: job.location,
      subtitle: job.role,
      year: job.year,
      result: job.result,
    })),
  },
  {
    id: 'education',
    title: sectionLabels.zh.failedEducation,
    items: failedEducation.zh.map((item) => ({
      title: item.school,
      location: item.location,
      subtitle: item.program,
      year: item.year,
      result: item.result,
    })),
  },
];

export const Default: Story = {
  args: {
    heading: sectionLabels.en.resumeOfFailures,
    intro: sectionLabels.en.failuresIntro,
    sections: englishFailuresSections,
    defaultExpanded: ['jobs'],
  },
};

export const ChineseVersion: Story = {
  args: {
    heading: sectionLabels.zh.resumeOfFailures,
    intro: sectionLabels.zh.failuresIntro,
    sections: chineseFailuresSections,
    defaultExpanded: ['jobs'],
  },
};

export const JobFailuresOnly: Story = {
  args: {
    heading: 'Failed Job Applications',
    sections: [englishFailuresSections[0]],
    defaultExpanded: ['jobs'],
  },
};

export const EducationFailuresOnly: Story = {
  args: {
    heading: 'Failed Education Applications',
    sections: [englishFailuresSections[1]],
    defaultExpanded: ['education'],
  },
};

export const AllExpanded: Story = {
  args: {
    heading: 'Resume of Failures',
    intro: sectionLabels.en.failuresIntro,
    sections: englishFailuresSections,
    defaultExpanded: ['jobs', 'education', 'publications'],
  },
};

export const NoIntro: Story = {
  args: {
    heading: 'Failures',
    sections: englishFailuresSections.slice(0, 2),
    defaultExpanded: ['jobs'],
  },
};
