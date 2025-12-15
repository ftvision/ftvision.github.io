import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    selectSize: {
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
    placeholder: 'Select an option',
    children: (
      <>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-64">
      <label htmlFor="country" className="block text-body-sm font-medium text-figure-primary mb-1">
        Country
      </label>
      <Select id="country" placeholder="Select a country" {...args}>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="au">Australia</option>
      </Select>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-64">
      <label htmlFor="timezone" className="block text-body-sm font-medium text-figure-primary mb-1">
        Timezone
      </label>
      <Select id="timezone" placeholder="Select timezone" helperText="Used for scheduling notifications.">
        <option value="pst">Pacific Time (PST)</option>
        <option value="mst">Mountain Time (MST)</option>
        <option value="cst">Central Time (CST)</option>
        <option value="est">Eastern Time (EST)</option>
      </Select>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-64">
      <label htmlFor="category" className="block text-body-sm font-medium text-figure-primary mb-1">
        Category
      </label>
      <Select
        id="category"
        placeholder="Select a category"
        defaultValue=""
        error="Please select a category."
      >
        <option value="news">News</option>
        <option value="opinion">Opinion</option>
        <option value="sports">Sports</option>
      </Select>
    </div>
  ),
};

export const WithSuccess: Story = {
  render: () => (
    <div className="w-64">
      <label htmlFor="plan" className="block text-body-sm font-medium text-figure-primary mb-1">
        Subscription Plan
      </label>
      <Select
        id="plan"
        defaultValue="pro"
        variant="success"
        helperText="Your plan has been updated."
      >
        <option value="free">Free</option>
        <option value="pro">Pro ($9/mo)</option>
        <option value="enterprise">Enterprise ($49/mo)</option>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <label htmlFor="disabled" className="block text-body-sm font-medium text-figure-muted mb-1">
        Disabled select
      </label>
      <Select id="disabled" disabled defaultValue="locked">
        <option value="locked">Locked Option</option>
        <option value="other">Other</option>
      </Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <label className="block text-caption text-figure-muted mb-1">Small</label>
        <Select selectSize="sm" placeholder="Small select">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Medium (default)</label>
        <Select selectSize="md" placeholder="Medium select">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      </div>
      <div>
        <label className="block text-caption text-figure-muted mb-1">Large</label>
        <Select selectSize="lg" placeholder="Large select">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      </div>
    </div>
  ),
};

export const WithOptGroups: Story = {
  name: 'With Option Groups',
  render: () => (
    <div className="w-64">
      <label htmlFor="section" className="block text-body-sm font-medium text-figure-primary mb-1">
        Section
      </label>
      <Select id="section" placeholder="Select a section">
        <optgroup label="News">
          <option value="world">World</option>
          <option value="us">U.S.</option>
          <option value="politics">Politics</option>
        </optgroup>
        <optgroup label="Opinion">
          <option value="editorials">Editorials</option>
          <option value="columns">Columns</option>
        </optgroup>
        <optgroup label="Arts">
          <option value="books">Books</option>
          <option value="movies">Movies</option>
          <option value="music">Music</option>
        </optgroup>
      </Select>
    </div>
  ),
};
