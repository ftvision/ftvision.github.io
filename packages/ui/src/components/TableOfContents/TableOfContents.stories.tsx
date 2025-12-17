import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TableOfContents, useActiveHeading, type TocItem } from './TableOfContents';

const meta: Meta<typeof TableOfContents> = {
  title: 'Components/Themes/Chinese Aesthetic/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Table of Contents (目录) - Article navigation component for the Chinese Aesthetic theme.

## Features
- Vertical list with hierarchical indentation
- Current section highlighted with customizable marker
- Smooth scroll navigation
- Multiple marker styles: dot, seal, line
- Optional sticky/fixed positioning
- useActiveHeading hook for scroll-based tracking

## Usage
\`\`\`tsx
import { TableOfContents, useActiveHeading } from '@ui/components/TableOfContents';

const items = [
  { id: 'intro', title: '引言', level: 1 },
  { id: 'chapter-1', title: '第一章', level: 1 },
  { id: 'section-1-1', title: '第一节', level: 2 },
];

function ArticleToc() {
  const activeId = useActiveHeading(items.map(i => i.id));
  return <TableOfContents items={items} activeId={activeId} />;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'scroll', 'compact'],
      description: 'Visual style variant',
    },
    position: {
      control: 'select',
      options: ['inline', 'sticky', 'fixed'],
      description: 'Positioning mode',
    },
    markerStyle: {
      control: 'select',
      options: ['dot', 'seal', 'line', 'none'],
      description: 'Active item marker style',
    },
    showTitle: {
      control: 'boolean',
      description: 'Whether to show the title/label',
    },
    smoothScroll: {
      control: 'boolean',
      description: 'Whether to use smooth scrolling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

const sampleItems: TocItem[] = [
  { id: 'introduction', title: '引言 - Introduction', level: 1 },
  { id: 'chapter-1', title: '第一章：山水之道', level: 1 },
  { id: 'section-1-1', title: '自然与艺术', level: 2 },
  { id: 'section-1-2', title: '留白的智慧', level: 2 },
  { id: 'chapter-2', title: '第二章：笔墨意境', level: 1 },
  { id: 'section-2-1', title: '线条之美', level: 2 },
  { id: 'section-2-1-1', title: '勾勒技法', level: 3 },
  { id: 'section-2-2', title: '墨色变化', level: 2 },
  { id: 'conclusion', title: '结语', level: 1 },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    activeId: 'chapter-1',
    markerStyle: 'dot',
    showTitle: true,
    label: '目录',
  },
};

export const ScrollVariant: Story = {
  args: {
    items: sampleItems,
    activeId: 'section-1-2',
    variant: 'scroll',
    markerStyle: 'line',
    showTitle: true,
    label: '卷轴目录',
  },
};

export const CompactVariant: Story = {
  args: {
    items: sampleItems,
    activeId: 'chapter-2',
    variant: 'compact',
    markerStyle: 'seal',
    showTitle: false,
  },
};

export const DotMarker: Story = {
  args: {
    items: sampleItems.slice(0, 5),
    activeId: 'section-1-1',
    markerStyle: 'dot',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dot marker style - circular indicator for active item.',
      },
    },
  },
};

export const SealMarker: Story = {
  args: {
    items: sampleItems.slice(0, 5),
    activeId: 'section-1-1',
    markerStyle: 'seal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Seal marker style - square indicator resembling a traditional seal stamp.',
      },
    },
  },
};

export const LineMarker: Story = {
  args: {
    items: sampleItems.slice(0, 5),
    activeId: 'section-1-1',
    markerStyle: 'line',
  },
  parameters: {
    docs: {
      description: {
        story: 'Line marker style - vertical line indicator on the left.',
      },
    },
  },
};

export const NoMarker: Story = {
  args: {
    items: sampleItems.slice(0, 5),
    activeId: 'section-1-1',
    markerStyle: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'No marker - relies on text styling only for active state.',
      },
    },
  },
};

export const WithEnglishContent: Story = {
  args: {
    items: [
      { id: 'intro', title: 'Introduction', level: 1 },
      { id: 'background', title: 'Historical Background', level: 1 },
      { id: 'philosophy', title: 'Philosophical Foundations', level: 2 },
      { id: 'practice', title: 'Practical Applications', level: 2 },
      { id: 'modern', title: 'Modern Interpretations', level: 1 },
      { id: 'digital', title: 'Digital Aesthetics', level: 2 },
      { id: 'conclusion', title: 'Conclusion', level: 1 },
    ],
    activeId: 'philosophy',
    label: 'Contents',
  },
};

export const DeepNesting: Story = {
  args: {
    items: [
      { id: 'part-1', title: '第一部分', level: 1 },
      { id: 'chapter-1', title: '第一章', level: 2 },
      { id: 'section-1', title: '第一节', level: 3 },
      { id: 'section-2', title: '第二节', level: 3 },
      { id: 'chapter-2', title: '第二章', level: 2 },
      { id: 'part-2', title: '第二部分', level: 1 },
      { id: 'chapter-3', title: '第三章', level: 2 },
      { id: 'section-3', title: '第三节', level: 3 },
    ],
    activeId: 'section-1',
    markerStyle: 'dot',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates three levels of heading hierarchy.',
      },
    },
  },
};

export const AllMarkerStyles: Story = {
  render: () => {
    const shortItems: TocItem[] = [
      { id: 'intro', title: '引言', level: 1 },
      { id: 'main', title: '正文', level: 1 },
      { id: 'detail', title: '细节', level: 2 },
      { id: 'end', title: '结语', level: 1 },
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="text-caption text-text-muted mb-2">Dot Marker</p>
          <TableOfContents
            items={shortItems}
            activeId="main"
            markerStyle="dot"
            showTitle={false}
          />
        </div>
        <div>
          <p className="text-caption text-text-muted mb-2">Seal Marker</p>
          <TableOfContents
            items={shortItems}
            activeId="main"
            markerStyle="seal"
            showTitle={false}
          />
        </div>
        <div>
          <p className="text-caption text-text-muted mb-2">Line Marker</p>
          <TableOfContents
            items={shortItems}
            activeId="main"
            markerStyle="line"
            showTitle={false}
          />
        </div>
        <div>
          <p className="text-caption text-text-muted mb-2">No Marker</p>
          <TableOfContents
            items={shortItems}
            activeId="main"
            markerStyle="none"
            showTitle={false}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all marker styles side by side.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: function InteractiveTableOfContents() {
    const [activeId, setActiveId] = React.useState('chapter-1');

    return (
      <div className="flex gap-8">
        <TableOfContents
          items={sampleItems}
          activeId={activeId}
          onItemClick={setActiveId}
          markerStyle="seal"
          className="w-64"
        />
        <div className="flex-1 p-4 bg-ground-secondary rounded-md">
          <p className="text-text-secondary">
            当前选中: <strong className="text-accent-primary">{activeId}</strong>
          </p>
          <p className="text-caption text-text-muted mt-2">
            Click on items to see the active state change.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing click behavior without page navigation.',
      },
    },
  },
};

export const InArticleContext: Story = {
  render: function ArticleWithToc() {
    const items: TocItem[] = [
      { id: 'toc-intro', title: '引言', level: 1 },
      { id: 'toc-main', title: '山水之道', level: 1 },
      { id: 'toc-detail', title: '自然法则', level: 2 },
      { id: 'toc-end', title: '结语', level: 1 },
    ];

    return (
      <div className="flex gap-8">
        <aside className="w-48 shrink-0">
          <TableOfContents
            items={items}
            activeId="toc-main"
            variant="scroll"
            markerStyle="line"
          />
        </aside>
        <article className="flex-1 space-y-6">
          <section id="toc-intro">
            <h2 className="text-h3 font-bold text-text-primary mb-2">引言</h2>
            <p className="text-text-secondary">
              中国山水画，是中国绘画艺术的重要组成部分...
            </p>
          </section>
          <section id="toc-main">
            <h2 className="text-h3 font-bold text-text-primary mb-2">山水之道</h2>
            <p className="text-text-secondary">
              山水画讲究意境，追求诗意与画意的统一...
            </p>
          </section>
          <section id="toc-detail">
            <h3 className="text-h4 font-semibold text-text-primary mb-2">自然法则</h3>
            <p className="text-text-secondary">
              师法自然，是山水画创作的基本原则...
            </p>
          </section>
          <section id="toc-end">
            <h2 className="text-h3 font-bold text-text-primary mb-2">结语</h2>
            <p className="text-text-secondary">
              山水画承载着中华文化的精神内涵...
            </p>
          </section>
        </article>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the TableOfContents component in an article layout context.',
      },
    },
  },
};

export const CustomLabel: Story = {
  args: {
    items: sampleItems.slice(0, 5),
    activeId: 'chapter-1',
    label: '本文目录 Contents',
    showTitle: true,
    markerStyle: 'seal',
  },
};

export const HiddenTitle: Story = {
  args: {
    items: sampleItems.slice(0, 5),
    activeId: 'chapter-1',
    showTitle: false,
    markerStyle: 'dot',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table of contents without a visible title.',
      },
    },
  },
};
