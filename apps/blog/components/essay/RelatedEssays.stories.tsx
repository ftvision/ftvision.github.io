import type { Meta, StoryObj } from '@storybook/react';
import { LanguageProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { RelatedEssays } from './RelatedEssays';
import type { EssayMeta } from '@/types/content';

const sampleEssaysEn: EssayMeta[] = [
  {
    slug: 'job-reflection-2023',
    title: 'Career Reflection — 2023',
    description:
      'A mid-career stocktake. From a self-portrait through team expectations to a review of academia, Google, and Citadel, then a look at what comes next.',
    date: '2023-07-05',
    type: 'narrative',
    topics: ['career'],
    lang: 'en',
    readingTime: 18,
  },
  {
    slug: 'offer-negotiation',
    title: 'Negotiating Software Engineering Job Offers',
    description:
      'A practical guide to negotiating job offers, covering key strategies like keeping doors open, leveraging information, having alternatives, and understanding what companies value.',
    date: '2023-02-10',
    type: 'guide',
    topics: ['career'],
    lang: 'en',
    readingTime: 12,
  },
  {
    slug: 'job-search-reflection',
    title: 'What I Want from a Job',
    description:
      "After several research and internship experiences, I reflect on what I'm looking for in a position: intellectual challenges, collaborative colleagues, personal growth, and real impact.",
    date: '2017-09-12',
    type: 'narrative',
    topics: ['career', 'research'],
    lang: 'en',
    readingTime: 8,
  },
];

const sampleEssaysZh: EssayMeta[] = [
  {
    slug: 'job-reflection-2023-zh',
    title: '职业反思 — 2023',
    description:
      '一份职业的中段盘点。从自我画像、团队期望，到对学术界、Google、Citadel 三段经历的复盘，再到对下一阶段的思考。',
    date: '2023-07-05',
    type: 'narrative',
    topics: ['career'],
    lang: 'zh',
    readingTime: 18,
  },
  {
    slug: 'reverse-interview-zh',
    title: '反向面试',
    description: '面试工作应该是一个相互选择的过程。这里收集了一些帮助应聘者评估公司和团队的资源。',
    date: '2020-05-01',
    type: 'guide',
    topics: ['career'],
    lang: 'zh',
    readingTime: 10,
  },
  {
    slug: '10k-code-zh',
    title: '第一个一万行代码',
    description:
      '工作头半年写完第一个10,000行代码后，对代码审阅、测试、版本控制、历史遗留代码和软件设计的思考与经验总结。',
    date: '2018-06-12',
    type: 'narrative',
    topics: ['technical', 'career'],
    lang: 'zh',
    readingTime: 14,
  },
];

const meta = {
  title: 'Essay/RelatedEssays',
  component: RelatedEssays,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '"Related essays" footer rendered at the bottom of essay detail pages. Computes the list from shared topics (with a recency fallback), then renders an editorial list. Distributes internal link equity, which is the single most undervalued SEO/GEO lever for a long-tail blog.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider initialLanguage="en">
          <div className="mx-auto max-w-[42rem] bg-ground-primary p-8 text-figure-primary">
            <Story />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof RelatedEssays>;

export default meta;
type Story = StoryObj<typeof meta>;

export const English: Story = {
  args: {
    essays: sampleEssaysEn,
    language: 'en',
  },
};

export const Chinese: Story = {
  args: {
    essays: sampleEssaysZh,
    language: 'zh',
  },
};

export const SingleResult: Story = {
  args: {
    essays: sampleEssaysEn.slice(0, 1),
    language: 'en',
  },
};

export const Empty: Story = {
  args: {
    essays: [],
    language: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are no related essays, the component renders nothing (no empty state).',
      },
    },
  },
};
