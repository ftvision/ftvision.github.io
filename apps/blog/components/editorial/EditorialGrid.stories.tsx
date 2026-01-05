import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EditorialGrid } from './EditorialGrid';
import { EditorialSection } from './EditorialSection';
import { FeaturedCard } from './FeaturedCard';
import { Item } from './Item';

const meta: Meta<typeof EditorialGrid> = {
  title: 'Blog / Editorial / EditorialGrid',
  component: EditorialGrid,
  decorators: [
    (Story) => (
      <div className="p-6 bg-ground-primary">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EditorialGrid>;

export const TwoColumns: Story = {
  args: {
    columns: 2,
    children: (
      <>
        <EditorialSection
          title="心智骇客的日常"
          variant="card"
          description="从日常生活的视角探讨认知科学家如何理解和研究人类心智。"
        >
          <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/25722412" />
        </EditorialSection>
        <EditorialSection
          title="认知科学、神经科学、和认知神经科学"
          variant="card"
          description="三个相关但不同领域的区分。"
        >
          <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/20727283" />
        </EditorialSection>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: (
      <>
        <EditorialSection
          title="神经科学大危机"
          variant="card"
          description="对一篇引发争议的研究的解读。"
        >
          <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/21575150" />
        </EditorialSection>
        <EditorialSection
          title="谨慎读脑"
          variant="card"
          description="对大脑语义地图研究的分析。"
        >
          <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/20821579" />
        </EditorialSection>
        <EditorialSection
          title="重构导播镜头"
          variant="card"
          description="从视觉研究到游戏开发。"
        >
          <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/22098814" />
        </EditorialSection>
      </>
    ),
  },
};

export const WithMultipleItems: Story = {
  args: {
    columns: 2,
    children: (
      <>
        <EditorialSection
          title="在看见和记住之间"
          variant="card"
          description="视觉工作记忆的研究。"
        >
          <Item
            title="迷之魔数：7"
            href="https://zhuanlan.zhihu.com/p/24782685"
          />
          <Item
            title="工作记忆概述"
            href="https://example.com/working-memory"
          />
        </EditorialSection>
        <EditorialSection
          title="觉知与意识"
          variant="card"
          description="意识研究的前沿探索。"
        >
          <Item
            title="我们说『意识』的时候，我们在说些什么?"
            href="https://zhuanlan.zhihu.com/p/20287372"
          />
          <Item
            title="意识的神经关联"
            href="https://example.com/consciousness"
          />
        </EditorialSection>
      </>
    ),
  },
};

/**
 * Full page composition example showing how all editorial components work together
 */
export const FullPageComposition: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <div className="mb-8">
        <h1 className="type-h1 text-figure-primary mb-4">过往的心理学科普写作</h1>
        <p className="text-body text-figure-secondary">
          这个集合收集了我写的一些心理学的科普文章。很多文章是我在博士期间写得。
        </p>
      </div>

      {/* Featured Card */}
      <FeaturedCard
        title="知识的诅咒——学术的分享为何艰难"
        href="https://zhuanlan.zhihu.com/p/20396676"
        description="为什么专家往往难以向普通人解释自己的领域？这篇文章探讨了学术知识传播中的核心困境。"
        source="知乎专栏"
        label="精选"
      />

      {/* Section: 观点讨论 */}
      <div>
        <h2 className="type-h2 text-figure-primary mb-4">观点讨论</h2>
        <p className="text-body text-figure-secondary mb-6">
          在不讨论专题的时候，有一些不太能一下子讲明白的事情倒是适合泛泛而谈。
        </p>
        <EditorialGrid columns={2}>
          <EditorialSection
            title="心智骇客的日常"
            variant="card"
            description="从日常生活的视角探讨认知科学家如何理解和研究人类心智。"
          >
            <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/25722412" />
          </EditorialSection>
          <EditorialSection
            title="认知科学、神经科学、和认知神经科学"
            variant="card"
            description="三个相关但不同领域的区分。"
          >
            <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/20727283" />
          </EditorialSection>
        </EditorialGrid>
      </div>

      {/* Section: 吐槽 */}
      <div>
        <h2 className="type-h2 text-figure-primary mb-4">吐槽</h2>
        <p className="text-body text-figure-secondary mb-6">
          心理学训练的最重要的一点是批判思维。
        </p>
        <EditorialGrid columns={2}>
          <EditorialSection
            title="神经科学大危机，一文扫荡15年研究？"
            variant="card"
            description="对一篇引发争议的神经科学研究的解读。"
          >
            <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/21575150" />
          </EditorialSection>
          <EditorialSection
            title="谨慎读脑：大脑词汇地图？"
            variant="card"
            description="对大脑语义地图研究的批判性分析。"
          >
            <Item title="阅读全文" href="https://zhuanlan.zhihu.com/p/20821579" />
          </EditorialSection>
        </EditorialGrid>
      </div>

      {/* Section: 认知专题 */}
      <div>
        <h2 className="type-h2 text-figure-primary mb-4">认知专题</h2>
        <EditorialGrid columns={2}>
          <EditorialSection
            title="在看见和记住之间"
            variant="card"
            description="从眼睛看见世界到脑子里记住，这中间存在一个瓶颈。"
          >
            <Item
              title="迷之魔数：7"
              href="https://zhuanlan.zhihu.com/p/24782685"
            />
          </EditorialSection>
          <EditorialSection
            title="觉知与意识"
            variant="card"
            description="探讨意识的定义和边界。"
          >
            <Item
              title="我们说『意识』的时候，我们在说些什么?"
              href="https://zhuanlan.zhihu.com/p/20287372"
            />
          </EditorialSection>
        </EditorialGrid>
      </div>
    </div>
  ),
};
