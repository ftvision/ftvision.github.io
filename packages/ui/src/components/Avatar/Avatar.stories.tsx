import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    alt: 'John Doe',
    fallback: 'JD',
  },
};

export const Fallback: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar fallback="John Doe" />
      <Avatar fallback="Jane" />
      <Avatar fallback="Alice Smith" />
      <Avatar />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
      <Avatar size="2xl" fallback="2XL" />
    </div>
  ),
};

export const SizesWithImage: Story = {
  name: 'Sizes with Image',
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        size="xs"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="JD"
      />
      <Avatar
        size="sm"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="JD"
      />
      <Avatar
        size="md"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="JD"
      />
      <Avatar
        size="lg"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="JD"
      />
      <Avatar
        size="xl"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="JD"
      />
      <Avatar
        size="2xl"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="JD"
      />
    </div>
  ),
};

export const ImageError: Story = {
  name: 'Image Load Error',
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    fallback: 'Error Test',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    fallback: 'Loading',
  },
};

export const Group: Story = {
  name: 'Avatar Group',
  render: () => (
    <AvatarGroup>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="JD"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        fallback="AS"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        fallback="MK"
      />
      <Avatar fallback="TW" />
    </AvatarGroup>
  ),
};

export const GroupWithMax: Story = {
  name: 'Avatar Group with Max',
  render: () => (
    <AvatarGroup max={3}>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="JD"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        fallback="AS"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        fallback="MK"
      />
      <Avatar fallback="TW" />
      <Avatar fallback="RB" />
      <Avatar fallback="CL" />
    </AvatarGroup>
  ),
};

export const GroupSizes: Story = {
  name: 'Avatar Group Sizes',
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup size="sm">
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>
      <AvatarGroup size="md">
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>
      <AvatarGroup size="lg">
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
      </AvatarGroup>
    </div>
  ),
};

export const AuthorByline: Story = {
  name: 'Author Byline',
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar
        size="lg"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        fallback="John Doe"
      />
      <div>
        <div className="text-body font-medium text-figure-primary">John Doe</div>
        <div className="text-body-sm text-figure-secondary">Senior Reporter</div>
      </div>
    </div>
  ),
};

export const CommentAuthor: Story = {
  name: 'Comment Author',
  render: () => (
    <div className="flex items-start gap-3 max-w-md">
      <Avatar size="sm" fallback="Jane Smith" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-body-sm font-medium text-figure-primary">Jane Smith</span>
          <span className="text-caption text-figure-muted">2 hours ago</span>
        </div>
        <p className="text-body-sm text-figure-secondary mt-1">
          Great article! Really enjoyed the analysis on this topic.
        </p>
      </div>
    </div>
  ),
};

export const Contributors: Story = {
  name: 'Article Contributors',
  render: () => (
    <div className="space-y-2">
      <span className="text-caption text-figure-muted uppercase tracking-wide">Contributors</span>
      <div className="flex items-center gap-2">
        <AvatarGroup max={4} size="sm">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            fallback="JD"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            fallback="AS"
          />
          <Avatar fallback="MK" />
          <Avatar fallback="TW" />
          <Avatar fallback="RB" />
        </AvatarGroup>
        <span className="text-body-sm text-figure-secondary">
          and 2 others contributed to this article
        </span>
      </div>
    </div>
  ),
};
