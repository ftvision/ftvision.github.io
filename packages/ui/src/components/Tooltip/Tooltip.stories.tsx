import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Patterns/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delayDuration: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    arrow: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-12">
      <div />
      <Tooltip content="Top tooltip" side="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <div />
      <Tooltip content="Left tooltip" side="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="Right tooltip" side="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <div />
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const WithoutArrow: Story = {
  name: 'Without Arrow',
  args: {
    content: 'No arrow tooltip',
    arrow: false,
    children: <Button variant="secondary">Hover me</Button>,
  },
};

export const DelayedTooltip: Story = {
  name: 'Delayed Show',
  args: {
    content: 'Appears after 500ms',
    delayDuration: 500,
    children: <Button variant="secondary">500ms delay</Button>,
  },
};

export const InstantTooltip: Story = {
  name: 'Instant Show',
  args: {
    content: 'No delay',
    delayDuration: 0,
    children: <Button variant="secondary">No delay</Button>,
  },
};

export const DisabledTooltip: Story = {
  name: 'Disabled',
  args: {
    content: 'You should not see this',
    disabled: true,
    children: <Button variant="secondary">Tooltip disabled</Button>,
  },
};

export const LongContent: Story = {
  name: 'Long Content',
  args: {
    content: 'This is a longer tooltip message that provides more detailed information about the element.',
    children: <Button variant="secondary">Hover for info</Button>,
  },
  decorators: [(Story) => <div className="max-w-[200px]"><Story /></div>],
};

export const OnIcons: Story = {
  name: 'On Icons',
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip content="Edit">
        <button className="p-2 rounded hover:bg-ground-secondary transition-colors">
          <svg className="h-5 w-5 text-figure-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Delete">
        <button className="p-2 rounded hover:bg-ground-secondary transition-colors">
          <svg className="h-5 w-5 text-figure-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Share">
        <button className="p-2 rounded hover:bg-ground-secondary transition-colors">
          <svg className="h-5 w-5 text-figure-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Bookmark">
        <button className="p-2 rounded hover:bg-ground-secondary transition-colors">
          <svg className="h-5 w-5 text-figure-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};

export const KeyboardAccessible: Story = {
  name: 'Keyboard Accessible',
  render: () => (
    <div className="space-y-4">
      <p className="text-body-sm text-figure-muted">
        Tab to focus the button and see the tooltip appear via keyboard navigation.
      </p>
      <Tooltip content="Tooltip appears on focus too!">
        <Button>Tab to me</Button>
      </Tooltip>
    </div>
  ),
};

export const InText: Story = {
  name: 'In Text',
  render: () => (
    <p className="text-body text-figure-primary max-w-md">
      The new{' '}
      <Tooltip content="Gross Domestic Product">
        <span className="underline decoration-dotted cursor-help">GDP</span>
      </Tooltip>{' '}
      figures released today show a 3.2% increase over the previous quarter,
      according to the{' '}
      <Tooltip content="Bureau of Economic Analysis">
        <span className="underline decoration-dotted cursor-help">BEA</span>
      </Tooltip>.
    </p>
  ),
};
