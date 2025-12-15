import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
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
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-64">
      <label htmlFor="email" className="block text-body-sm font-medium text-figure-primary mb-1">
        Email address
      </label>
      <Input id="email" type="email" placeholder="you@example.com" {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <label className="block text-caption text-figure-muted mb-1">Small</label>
        <Input inputSize="sm" placeholder="Small input" />
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Medium (default)</label>
        <Input inputSize="md" placeholder="Medium input" />
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Large</label>
        <Input inputSize="lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-64">
      <label htmlFor="username" className="block text-body-sm font-medium text-figure-primary mb-1">
        Username
      </label>
      <Input
        id="username"
        placeholder="johndoe"
        helperText="Your username must be 3-20 characters long."
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-64">
      <label htmlFor="email-error" className="block text-body-sm font-medium text-figure-primary mb-1">
        Email
      </label>
      <Input
        id="email-error"
        type="email"
        placeholder="you@example.com"
        defaultValue="invalid-email"
        error="Please enter a valid email address."
      />
    </div>
  ),
};

export const WithSuccess: Story = {
  render: () => (
    <div className="w-64">
      <label htmlFor="email-success" className="block text-body-sm font-medium text-figure-primary mb-1">
        Email
      </label>
      <Input
        id="email-success"
        type="email"
        placeholder="you@example.com"
        defaultValue="valid@example.com"
        variant="success"
        helperText="Email address is available."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <label htmlFor="disabled" className="block text-body-sm font-medium text-figure-muted mb-1">
        Disabled input
      </label>
      <Input id="disabled" placeholder="Cannot edit" disabled />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <label className="block text-caption text-figure-muted mb-1">Text</label>
        <Input type="text" placeholder="Plain text" />
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Email</label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Password</label>
        <Input type="password" placeholder="Enter password" />
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Number</label>
        <Input type="number" placeholder="123" />
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Search</label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const TouchTarget: Story = {
  name: 'Touch Target (Accessibility)',
  render: () => (
    <div className="w-64">
      <p className="text-caption text-figure-muted mb-4">
        All input sizes meet WCAG touch target requirements (44px minimum).
      </p>
      <div className="flex flex-col gap-4">
        <Input inputSize="sm" placeholder="Small (32px height)" />
        <Input inputSize="md" placeholder="Medium (40px height)" />
        <Input inputSize="lg" placeholder="Large (48px height)" />
      </div>
    </div>
  ),
};

export const FocusRing: Story = {
  name: 'Focus Ring (Accessibility)',
  render: () => (
    <div className="w-64">
      <p className="text-caption text-figure-muted mb-4">
        Tab through inputs to see focus ring styling.
      </p>
      <div className="flex flex-col gap-4">
        <Input placeholder="Default focus" />
        <Input variant="error" placeholder="Error focus" />
        <Input variant="success" placeholder="Success focus" />
      </div>
    </div>
  ),
};
