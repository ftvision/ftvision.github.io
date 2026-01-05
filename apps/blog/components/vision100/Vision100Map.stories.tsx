import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Vision100Map } from './Vision100Map';

const meta: Meta<typeof Vision100Map> = {
  title: 'Blog / Vision100 / Vision100Map',
  component: Vision100Map,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Vision100Map>;

/**
 * The complete Vision100Map component with map/table toggle and topic filtering.
 */
export const Default: Story = {
  args: {
    defaultView: 'map',
  },
};

/**
 * Starting in table view mode.
 */
export const TableView: Story = {
  args: {
    defaultView: 'table',
  },
};
