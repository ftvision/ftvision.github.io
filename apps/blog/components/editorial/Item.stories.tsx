import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Item } from './Item';

const meta: Meta<typeof Item> = {
  title: 'Blog / Editorial / Item',
  component: Item,
  decorators: [
    (Story) => (
      <div className="p-6 max-w-md bg-ground-primary">
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
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  args: {
    title: '迷之魔数：7',
    href: 'https://zhuanlan.zhihu.com/p/24782685',
    description: '为什么工作记忆有限？',
  },
};

export const WithoutDescription: Story = {
  args: {
    title: '阅读全文',
    href: 'https://zhuanlan.zhihu.com/p/25722412',
  },
};

export const InternalLink: Story = {
  args: {
    title: 'Essay on Memory',
    href: '/essays/memory',
    description: 'An exploration of how memory works',
  },
};

export const LongTitle: Story = {
  args: {
    title: '我们说『意识』的时候，我们在说些什么？',
    href: 'https://zhuanlan.zhihu.com/p/20287372',
    description: '探讨意识的定义和边界',
  },
};

export const MultipleItems: Story = {
  render: () => (
    <div className="space-y-1">
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
      <Item
        title="认知科学概论"
        href="https://zhuanlan.zhihu.com/p/20727283"
        description="与神经科学的区分"
      />
    </div>
  ),
};
