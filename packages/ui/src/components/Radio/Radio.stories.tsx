import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    radioSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    name: 'demo',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'checked-demo',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Premium plan',
    helperText: 'Best for teams and businesses.',
    name: 'plan',
  },
};

export const WithError: Story = {
  args: {
    label: 'Invalid option',
    error: 'This option is currently unavailable.',
    name: 'error-demo',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio label="Disabled unchecked" name="disabled" disabled />
      <Radio label="Disabled checked" name="disabled-checked" disabled defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio radioSize="sm" label="Small radio" name="size" value="sm" />
      <Radio radioSize="md" label="Medium radio (default)" name="size" value="md" defaultChecked />
      <Radio radioSize="lg" label="Large radio" name="size" value="lg" />
    </div>
  ),
};

export const RadioGroupStory: Story = {
  name: 'Radio Group',
  render: () => (
    <RadioGroup legend="Select a subscription plan">
      <Radio label="Free" name="subscription" value="free" helperText="Basic features" />
      <Radio label="Pro" name="subscription" value="pro" defaultChecked helperText="Advanced features" />
      <Radio label="Enterprise" name="subscription" value="enterprise" helperText="Custom solutions" />
    </RadioGroup>
  ),
};

export const RadioGroupWithError: Story = {
  name: 'Radio Group with Error',
  render: () => (
    <RadioGroup legend="Select a delivery method" error="Please select a delivery method.">
      <Radio label="Standard shipping" name="shipping" value="standard" />
      <Radio label="Express shipping" name="shipping" value="express" />
      <Radio label="Overnight shipping" name="shipping" value="overnight" />
    </RadioGroup>
  ),
};

export const HorizontalLayout: Story = {
  name: 'Horizontal Layout',
  render: () => (
    <fieldset>
      <legend className="text-body-sm font-medium text-figure-primary mb-3">
        Article rating
      </legend>
      <div className="flex gap-6">
        <Radio label="Excellent" name="rating" value="5" />
        <Radio label="Good" name="rating" value="4" defaultChecked />
        <Radio label="Average" name="rating" value="3" />
        <Radio label="Poor" name="rating" value="2" />
      </div>
    </fieldset>
  ),
};

export const CardStyle: Story = {
  name: 'Card Style Selection',
  render: () => (
    <RadioGroup legend="Choose your plan" legendHidden>
      <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-action-primary has-[:checked]:border-action-primary has-[:checked]:bg-surface-aside transition-colors">
        <Radio name="card-plan" value="monthly" className="mt-0.5" />
        <div>
          <div className="text-body font-medium text-figure-primary">Monthly</div>
          <div className="text-body-sm text-figure-secondary">$9.99/month</div>
        </div>
      </label>
      <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-action-primary has-[:checked]:border-action-primary has-[:checked]:bg-surface-aside transition-colors">
        <Radio name="card-plan" value="yearly" defaultChecked className="mt-0.5" />
        <div>
          <div className="text-body font-medium text-figure-primary">Yearly</div>
          <div className="text-body-sm text-figure-secondary">$99/year (save 17%)</div>
        </div>
      </label>
    </RadioGroup>
  ),
};

export const NewsletterPreferences: Story = {
  name: 'Newsletter Preferences',
  render: () => (
    <RadioGroup legend="Email frequency" helperText="Choose how often you want to receive updates.">
      <Radio
        label="Daily digest"
        name="frequency"
        value="daily"
        helperText="Get a summary of top stories every morning."
      />
      <Radio
        label="Weekly roundup"
        name="frequency"
        value="weekly"
        defaultChecked
        helperText="A curated selection of the week's best articles."
      />
      <Radio
        label="Breaking news only"
        name="frequency"
        value="breaking"
        helperText="Only receive alerts for major stories."
      />
    </RadioGroup>
  ),
};
