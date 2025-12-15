import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastContainer, useToast } from './Toast';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Patterns/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    closable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Notification',
    description: 'This is a default toast notification.',
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="space-y-3 w-96">
      <Toast
        variant="default"
        title="Default"
        description="This is a default notification."
      />
      <Toast
        variant="success"
        title="Success"
        description="Your changes have been saved."
      />
      <Toast
        variant="warning"
        title="Warning"
        description="Your session is about to expire."
      />
      <Toast
        variant="danger"
        title="Error"
        description="Something went wrong. Please try again."
      />
      <Toast
        variant="info"
        title="Info"
        description="A new version is available."
      />
    </div>
  ),
};

export const WithAction: Story = {
  name: 'With Action',
  render: () => (
    <div className="w-96">
      <Toast
        variant="default"
        title="Article saved"
        description="Your article has been saved as a draft."
        action={
          <Button size="sm" variant="secondary">
            View
          </Button>
        }
      />
    </div>
  ),
};

export const WithoutClose: Story = {
  name: 'Without Close Button',
  args: {
    title: 'Persistent notification',
    description: 'This toast cannot be dismissed by clicking.',
    closable: false,
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export const TitleOnly: Story = {
  name: 'Title Only',
  args: {
    title: 'Changes saved',
    variant: 'success',
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export const Interactive: Story = {
  name: 'Interactive Demo',
  render: () => {
    const { toasts, toast, dismiss } = useToast();

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast({
                title: 'Default toast',
                description: 'This is a default notification.',
              })
            }
          >
            Default
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'success',
                title: 'Success!',
                description: 'Your changes have been saved.',
              })
            }
          >
            Success
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'warning',
                title: 'Warning',
                description: 'Your session expires in 5 minutes.',
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'danger',
                title: 'Error',
                description: 'Failed to save changes.',
              })
            }
          >
            Danger
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'info',
                title: 'Update available',
                description: 'A new version is ready to install.',
              })
            }
          >
            Info
          </Button>
        </div>
        <ToastContainer>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              title={t.title}
              description={t.description}
              onClose={() => dismiss(t.id)}
            />
          ))}
        </ToastContainer>
      </div>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [position, setPosition] = React.useState<
      'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
    >('bottom-right');
    const [show, setShow] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => (
            <Button
              key={pos}
              variant={position === pos ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                setPosition(pos);
                setShow(true);
                setTimeout(() => setShow(false), 3000);
              }}
            >
              {pos}
            </Button>
          ))}
        </div>
        {show && (
          <ToastContainer position={position}>
            <Toast
              variant="info"
              title={`Position: ${position}`}
              description="This toast appears in the selected position."
              onClose={() => setShow(false)}
            />
          </ToastContainer>
        )}
      </div>
    );
  },
};

export const ArticleActions: Story = {
  name: 'Article Actions',
  render: () => {
    const { toasts, toast, dismiss } = useToast();

    return (
      <div className="space-y-4">
        <p className="text-body-sm text-figure-muted">
          Common toast notifications for a news article page.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'success',
                title: 'Article bookmarked',
                description: 'Added to your reading list.',
              })
            }
          >
            Bookmark
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'success',
                title: 'Link copied',
                description: 'Article link copied to clipboard.',
              })
            }
          >
            Share
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'info',
                title: 'Subscribing...',
                description: 'You will receive updates for this topic.',
              })
            }
          >
            Follow Topic
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'danger',
                title: 'Report submitted',
                description: 'Thank you for helping us improve.',
              })
            }
          >
            Report Issue
          </Button>
        </div>
        <ToastContainer>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              title={t.title}
              description={t.description}
              onClose={() => dismiss(t.id)}
            />
          ))}
        </ToastContainer>
      </div>
    );
  },
};

export const WithCustomDuration: Story = {
  name: 'Custom Duration',
  render: () => {
    const { toasts, toast, dismiss } = useToast();

    return (
      <div className="space-y-4">
        <p className="text-body-sm text-figure-muted">
          Toasts with different auto-dismiss durations.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: '2 second toast',
                duration: 2000,
              })
            }
          >
            2 seconds
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: '5 second toast',
                duration: 5000,
              })
            }
          >
            5 seconds
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Persistent toast',
                description: 'This won\'t auto-dismiss.',
                duration: 0,
              })
            }
          >
            No auto-dismiss
          </Button>
        </div>
        <ToastContainer>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              title={t.title}
              description={t.description}
              onClose={() => dismiss(t.id)}
            />
          ))}
        </ToastContainer>
      </div>
    );
  },
};
