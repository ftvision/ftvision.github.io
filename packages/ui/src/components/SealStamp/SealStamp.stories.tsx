import type { Meta, StoryObj } from '@storybook/react';
import { SealStamp } from './SealStamp';

const meta: Meta<typeof SealStamp> = {
  title: 'Components/Themes/Chinese Aesthetic/SealStamp',
  component: SealStamp,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A decorative seal stamp component inspired by traditional Chinese seals (印章).

**Note on typography:** For authentic 篆体 (seal script) appearance, users should
provide a seal script font via CSS custom properties or className. Common seal
script fonts include: 方正小篆, 汉仪篆书, or web-safe alternatives.

Example: \`<SealStamp className="font-seal" name="印" />\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['round', 'square'],
    },
    stampStyle: {
      control: 'radio',
      options: ['relief', 'intaglio'],
      description: 'Relief (朱文): white text on red. Intaglio (白文): red text on white.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    animated: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SealStamp>;

export const Default: Story = {
  args: {
    name: '范同',
    variant: 'square',
    stampStyle: 'relief',
    size: 'md',
  },
};

export const Round: Story = {
  args: {
    name: '印',
    variant: 'round',
    stampStyle: 'relief',
    size: 'md',
  },
};

export const Intaglio: Story = {
  args: {
    name: '范同',
    variant: 'square',
    stampStyle: 'intaglio',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <SealStamp name="小" size="sm" />
      <SealStamp name="中" size="md" />
      <SealStamp name="大" size="lg" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col items-center gap-2">
        <SealStamp name="方印" variant="square" stampStyle="relief" />
        <span className="text-caption text-figure-muted">Square Relief (朱文)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SealStamp name="方印" variant="square" stampStyle="intaglio" />
        <span className="text-caption text-figure-muted">Square Intaglio (白文)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SealStamp name="圆" variant="round" stampStyle="relief" />
        <span className="text-caption text-figure-muted">Round Relief</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SealStamp name="圆" variant="round" stampStyle="intaglio" />
        <span className="text-caption text-figure-muted">Round Intaglio</span>
      </div>
    </div>
  ),
};

export const Animated: Story = {
  args: {
    name: '印章',
    variant: 'square',
    stampStyle: 'relief',
    size: 'lg',
    animated: true,
  },
};

export const InContext: Story = {
  render: () => (
    <div className="max-w-md p-6 border border-border rounded">
      <div className="flex items-center gap-3 mb-4">
        <SealStamp name="作者" variant="square" stampStyle="relief" size="sm" />
        <div>
          <p className="type-label text-figure-primary">Wang Wei</p>
          <p className="type-caption text-figure-muted">March 15, 2024</p>
        </div>
      </div>
      <p className="type-body text-figure-secondary">
        The seal stamp (印章) has been used in East Asia for millennia as a signature
        and mark of authenticity...
      </p>
    </div>
  ),
};

export const MultipleCharacters: Story = {
  render: () => (
    <div className="flex gap-4">
      <SealStamp name="一" size="lg" />
      <SealStamp name="二字" size="lg" />
      <SealStamp name="三字印" size="lg" />
      <SealStamp name="四字篆印" size="lg" />
    </div>
  ),
};
