import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    textareaSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-80">
      <label htmlFor="message" className="block text-body-sm font-medium text-figure-primary mb-1">
        Message
      </label>
      <Textarea id="message" placeholder="Write your message here..." rows={4} {...args} />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-80">
      <label htmlFor="bio" className="block text-body-sm font-medium text-figure-primary mb-1">
        Bio
      </label>
      <Textarea
        id="bio"
        placeholder="Tell us about yourself..."
        rows={3}
        helperText="Maximum 500 characters."
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <label htmlFor="comment" className="block text-body-sm font-medium text-figure-primary mb-1">
        Comment
      </label>
      <Textarea
        id="comment"
        placeholder="Add a comment..."
        rows={3}
        defaultValue="x"
        error="Comment must be at least 10 characters."
      />
    </div>
  ),
};

export const WithSuccess: Story = {
  render: () => (
    <div className="w-80">
      <label htmlFor="feedback" className="block text-body-sm font-medium text-figure-primary mb-1">
        Feedback
      </label>
      <Textarea
        id="feedback"
        placeholder="Share your feedback..."
        rows={3}
        defaultValue="This product is excellent! I love how intuitive it is."
        variant="success"
        helperText="Thank you for your feedback!"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <label htmlFor="disabled" className="block text-body-sm font-medium text-figure-muted mb-1">
        Disabled textarea
      </label>
      <Textarea
        id="disabled"
        placeholder="Cannot edit"
        disabled
        defaultValue="This content is read-only."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="block text-caption text-figure-muted mb-1">Small</label>
        <Textarea textareaSize="sm" placeholder="Small textarea" rows={2} />
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Medium (default)</label>
        <Textarea textareaSize="md" placeholder="Medium textarea" rows={3} />
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Large</label>
        <Textarea textareaSize="lg" placeholder="Large textarea" rows={4} />
      </div>
    </div>
  ),
};

export const CharacterCount: Story = {
  name: 'With Character Count',
  render: () => {
    const maxLength = 200;
    return (
      <div className="w-80">
        <label htmlFor="limited" className="block text-body-sm font-medium text-figure-primary mb-1">
          Description
        </label>
        <Textarea
          id="limited"
          placeholder="Enter description..."
          rows={3}
          maxLength={maxLength}
          helperText={`0/${maxLength} characters`}
        />
      </div>
    );
  },
};
