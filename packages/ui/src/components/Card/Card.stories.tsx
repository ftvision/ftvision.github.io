import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <p>A simple card with just content and padding.</p>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="h-48 bg-bg-tertiary flex items-center justify-center text-text-muted">
        Image placeholder
      </div>
      <CardHeader>
        <CardTitle>Blog Post Title</CardTitle>
        <CardDescription>Published on Dec 13, 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-text-secondary">
          A brief excerpt from the blog post that gives readers a preview of the content...
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="primary" size="sm">Read More</Button>
        <Button variant="ghost" size="sm">Share</Button>
      </CardFooter>
    </Card>
  ),
};

export const PostCard: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex gap-2 mb-2">
          <span className="px-2 py-1 text-xs rounded bg-bg-tertiary text-text-secondary">
            TypeScript
          </span>
          <span className="px-2 py-1 text-xs rounded bg-bg-tertiary text-text-secondary">
            React
          </span>
        </div>
        <CardTitle>Building a Design System from Scratch</CardTitle>
        <CardDescription>
          Learn how to create a scalable design system using modern tools and best practices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-text-secondary">
          In this article, we'll explore the key concepts behind building a design system,
          including token architecture, component composition, and documentation strategies.
        </p>
      </CardContent>
      <CardFooter className="text-sm text-text-muted">
        <span>5 min read</span>
        <span className="mx-2">•</span>
        <span>Dec 13, 2025</span>
      </CardFooter>
    </Card>
  ),
};
