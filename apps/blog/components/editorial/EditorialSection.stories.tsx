import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EditorialSection } from './EditorialSection';
import { Item } from './Item';

const meta: Meta<typeof EditorialSection> = {
  title: 'Blog / Editorial / EditorialSection',
  component: EditorialSection,
  decorators: [
    (Story) => (
      <div className="p-6 max-w-lg bg-ground-primary">
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
type Story = StoryObj<typeof EditorialSection>;

export const Default: Story = {
  args: {
    title: '观点讨论',
    children: (
      <>
        <Item
          title="知识的诅咒"
          href="https://zhuanlan.zhihu.com/p/20396676"
          description="学术分享为何艰难"
        />
        <Item
          title="心智骇客的日常"
          href="https://zhuanlan.zhihu.com/p/25722412"
          description="认知科学家的日常生活"
        />
      </>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    title: '在看见和记住之间',
    description:
      '从眼睛看见世界到脑子里记住，这中间存在一个瓶颈。这个瓶颈就是容量有限的工作记忆阶段。',
    children: (
      <Item
        title="迷之魔数：7"
        href="https://zhuanlan.zhihu.com/p/24782685"
      />
    ),
  },
};

export const CardVariant: Story = {
  args: {
    title: '认知专题',
    variant: 'card',
    description: '探索认知科学的核心概念和前沿研究',
    children: (
      <>
        <Item
          title="迷之魔数：7"
          href="https://zhuanlan.zhihu.com/p/24782685"
        />
        <Item
          title="我们说『意识』的时候"
          href="https://zhuanlan.zhihu.com/p/20287372"
        />
      </>
    ),
  },
};

export const CardWithLongDescription: Story = {
  args: {
    title: '觉知与意识',
    variant: 'card',
    description:
      '在最开始教约翰霍普金斯的本科生这门课的时候，我觉得这方面的内容还是很有趣的。但是接下来几年的研究和阅读发现之前所讨论的内容还是太粗浅了，而且还有一系列社会启动效应的研究最近几年发现无法重复。',
    children: (
      <Item
        title="我们说『意识』的时候，我们在说些什么?"
        href="https://zhuanlan.zhihu.com/p/20287372"
      />
    ),
  },
};

export const SingleItem: Story = {
  args: {
    title: '应用扩展',
    variant: 'card',
    description: '将认知心理学和认知神经科学应用到其他领域。',
    children: (
      <Item
        title="重构导播镜头(Directed Camera)——从视觉研究到游戏开发"
        href="https://zhuanlan.zhihu.com/p/22098814"
      />
    ),
  },
};
