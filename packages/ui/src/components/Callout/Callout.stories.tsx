import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from './Callout';

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'note'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Did you know?',
    children: 'This is an informational callout with helpful context for the reader.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    children: 'The operation completed successfully. You can proceed with the next step.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Caution',
    children: 'Be careful with this operation. Make sure you understand the implications.',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    title: 'Danger',
    children: 'This action is irreversible. Please proceed with extreme caution.',
  },
};

export const Note: Story = {
  args: {
    type: 'note',
    title: 'Note',
    children: 'This is a general note that provides additional context or information.',
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'info',
    children: 'A simple callout without a title. Just the content.',
  },
};

export const WithRichContent: Story = {
  args: {
    type: 'info',
    title: 'Code Example',
    children: (
      <div>
        <p className="mb-2">Use the following command to install:</p>
        <code className="bg-bg-tertiary px-2 py-1 rounded text-sm font-code">
          pnpm add @blog/ui
        </code>
      </div>
    ),
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Callout type="info" title="Info">
        This is an informational message.
      </Callout>
      <Callout type="success" title="Success">
        Operation completed successfully.
      </Callout>
      <Callout type="warning" title="Warning">
        Please review before proceeding.
      </Callout>
      <Callout type="danger" title="Danger">
        This action cannot be undone.
      </Callout>
      <Callout type="note" title="Note">
        Additional context for the reader.
      </Callout>
    </div>
  ),
};
