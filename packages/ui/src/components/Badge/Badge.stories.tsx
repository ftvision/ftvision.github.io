import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dot: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const DotIndicators: Story = {
  name: 'Dot Indicators',
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Badge variant="default" dot />
        <span className="text-body-sm">Default</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="success" dot />
        <span className="text-body-sm">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="warning" dot />
        <span className="text-body-sm">Away</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="danger" dot />
        <span className="text-body-sm">Offline</span>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="success"
        icon={
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        }
      >
        Verified
      </Badge>
      <Badge
        variant="warning"
        icon={
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        }
      >
        Warning
      </Badge>
      <Badge
        variant="info"
        icon={
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        }
      >
        New
      </Badge>
    </div>
  ),
};

export const ArticleCategories: Story = {
  name: 'Article Categories',
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">Politics</Badge>
        <Badge variant="outline">Business</Badge>
        <Badge variant="outline">Technology</Badge>
        <Badge variant="outline">Opinion</Badge>
        <Badge variant="outline">Science</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary" size="sm">Breaking</Badge>
        <Badge variant="danger" size="sm">Live</Badge>
        <Badge variant="default" size="sm">Analysis</Badge>
      </div>
    </div>
  ),
};

export const StatusBadges: Story = {
  name: 'Status Badges',
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center justify-between p-3 border border-border rounded">
        <span className="text-body">Article Draft</span>
        <Badge variant="secondary">Draft</Badge>
      </div>
      <div className="flex items-center justify-between p-3 border border-border rounded">
        <span className="text-body">Pending Review</span>
        <Badge variant="warning">In Review</Badge>
      </div>
      <div className="flex items-center justify-between p-3 border border-border rounded">
        <span className="text-body">Published Article</span>
        <Badge variant="success">Published</Badge>
      </div>
      <div className="flex items-center justify-between p-3 border border-border rounded">
        <span className="text-body">Archived Article</span>
        <Badge variant="default">Archived</Badge>
      </div>
    </div>
  ),
};

export const CountBadges: Story = {
  name: 'Count Badges',
  render: () => (
    <div className="flex items-center gap-12">
      <div className="relative inline-block pr-4">
        <span className="text-body">Notifications</span>
        <Badge variant="danger" size="sm" className="absolute -top-2 -right-1 min-w-[1.25rem] px-1">
          5
        </Badge>
      </div>
      <div className="relative inline-block pr-5">
        <span className="text-body">Messages</span>
        <Badge variant="primary" size="sm" className="absolute -top-2 -right-2 min-w-[1.5rem] px-1">
          14
        </Badge>
      </div>
      <div className="relative inline-block pr-7">
        <span className="text-body">Updates</span>
        <Badge variant="info" size="sm" className="absolute -top-2 -right-4 min-w-[2rem] px-1.5">
          99+
        </Badge>
      </div>
    </div>
  ),
};

export const InlineUsage: Story = {
  name: 'Inline Usage',
  render: () => (
    <div className="space-y-3 max-w-md">
      <h3 className="text-h3">
        New Feature <Badge variant="primary" size="sm">New</Badge>
      </h3>
      <p className="text-body text-figure-secondary">
        Check out our latest feature that helps you <Badge variant="info" size="sm">Beta</Badge> organize your reading list better.
      </p>
    </div>
  ),
};
