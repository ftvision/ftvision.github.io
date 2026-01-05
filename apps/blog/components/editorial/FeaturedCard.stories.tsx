import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeaturedCard } from './FeaturedCard';

const meta: Meta<typeof FeaturedCard> = {
  title: 'Blog / Editorial / FeaturedCard',
  component: FeaturedCard,
  decorators: [
    (Story) => (
      <div className="p-6 max-w-2xl bg-ground-primary">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeaturedCard>;

export const Default: Story = {
  args: {
    title: '知识的诅咒——学术的分享为何艰难',
    href: 'https://zhuanlan.zhihu.com/p/20396676',
    description:
      '为什么专家往往难以向普通人解释自己的领域？这篇文章探讨了学术知识传播中的核心困境。',
    source: '知乎专栏',
    label: '精选',
  },
};

export const WithoutLabel: Story = {
  args: {
    title: '心智骇客的日常',
    href: 'https://zhuanlan.zhihu.com/p/25722412',
    description:
      '从日常生活的视角探讨认知科学家如何理解和研究人类心智。这是一篇关于认知科学研究者日常工作和思考方式的文章。',
    source: '知乎专栏',
  },
};

export const WithoutSource: Story = {
  args: {
    title: 'Understanding Attention Mechanisms',
    href: '/essays/attention',
    description:
      'A deep dive into how attention mechanisms work in modern neural networks and their impact on natural language processing.',
    label: "Editor's Pick",
  },
};

export const Minimal: Story = {
  args: {
    title: '神经科学大危机',
    href: 'https://zhuanlan.zhihu.com/p/21575150',
    description: '对一篇引发争议的神经科学研究的解读，探讨统计方法在神经影像研究中的问题。',
  },
};

export const InternalLink: Story = {
  args: {
    title: 'The Future of Cognitive Science',
    href: '/essays/cognitive-science-future',
    description:
      'Exploring emerging trends and potential breakthroughs in cognitive science research.',
    source: 'Essays',
    label: 'Featured',
  },
};

export const LongDescription: Story = {
  args: {
    title: '在看见和记住之间',
    href: 'https://zhuanlan.zhihu.com/p/24782685',
    description:
      '从眼睛看见世界到脑子里记住，这中间存在一个瓶颈。这个瓶颈就是容量有限的工作记忆阶段。如果只考虑时间持续的长短的话，这里所指的也就是短期记忆这个阶段。为什么工作记忆有限？到底什么是容量？到底工作记忆是一个真实合理的认知建构，还是只是一个定义不明的术语？',
    source: '知乎专栏',
    label: '精选',
  },
};
