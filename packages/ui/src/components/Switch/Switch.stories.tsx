import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    switchSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
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
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive email updates about new articles.',
  },
};

export const LabelLeft: Story = {
  name: 'Label on Left',
  args: {
    label: 'Auto-save',
    labelPosition: 'left',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch switchSize="sm" label="Small switch" />
      <Switch switchSize="md" label="Medium switch (default)" defaultChecked />
      <Switch switchSize="lg" label="Large switch" />
    </div>
  ),
};

export const SettingsPanel: Story = {
  name: 'Settings Panel',
  render: () => (
    <div className="w-80 space-y-4 p-4 border border-border rounded-lg">
      <h3 className="text-h4 font-semibold text-figure-primary">Preferences</h3>
      <div className="space-y-4 divide-y divide-border-muted">
        <Switch
          label="Push notifications"
          description="Receive push notifications on your device."
          defaultChecked
        />
        <div className="pt-4">
          <Switch
            label="Email digest"
            description="Get a daily summary of top stories."
            defaultChecked
          />
        </div>
        <div className="pt-4">
          <Switch
            label="Breaking news alerts"
            description="Be notified immediately for major stories."
          />
        </div>
        <div className="pt-4">
          <Switch
            label="Marketing emails"
            description="Receive promotional content and offers."
          />
        </div>
      </div>
    </div>
  ),
};

export const InlineSettings: Story = {
  name: 'Inline Settings',
  render: () => (
    <div className="w-80 space-y-2">
      <div className="flex items-center justify-between py-2">
        <span className="text-body text-figure-primary">Dark mode</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between py-2">
        <span className="text-body text-figure-primary">Compact view</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between py-2">
        <span className="text-body text-figure-primary">Auto-play videos</span>
        <Switch />
      </div>
    </div>
  ),
};

export const FeatureToggle: Story = {
  name: 'Feature Toggle',
  render: () => (
    <div className="w-96 p-4 border border-border rounded-lg bg-surface-aside">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-body font-medium text-figure-primary">Reading mode</h4>
          <p className="text-body-sm text-figure-secondary mt-1">
            Enable distraction-free reading with larger text and simplified layout.
          </p>
        </div>
        <Switch switchSize="lg" defaultChecked />
      </div>
    </div>
  ),
};

export const AccessibleSwitch: Story = {
  name: 'Accessible Switch',
  render: () => (
    <div className="space-y-4">
      <p className="text-caption text-figure-muted max-w-sm">
        The switch uses role="switch" for proper screen reader announcement.
        Tab to focus and press Space to toggle.
      </p>
      <Switch
        label="Accessibility mode"
        description="Enable high contrast and larger touch targets."
      />
    </div>
  ),
};
