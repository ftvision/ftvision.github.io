import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    checkboxSize: {
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
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to the terms',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'We will send you weekly updates.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue.',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox checkboxSize="sm" label="Small checkbox" />
      <Checkbox checkboxSize="md" label="Medium checkbox (default)" />
      <Checkbox checkboxSize="lg" label="Large checkbox" />
    </div>
  ),
};

export const CheckboxGroup: Story = {
  name: 'Checkbox Group',
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-body-sm font-medium text-figure-primary mb-2">
        Select your interests
      </legend>
      <Checkbox label="Technology" name="interests" value="tech" />
      <Checkbox label="Politics" name="interests" value="politics" />
      <Checkbox label="Sports" name="interests" value="sports" defaultChecked />
      <Checkbox label="Arts & Culture" name="interests" value="arts" />
      <Checkbox label="Science" name="interests" value="science" defaultChecked />
    </fieldset>
  ),
};

export const WithLongLabel: Story = {
  name: 'With Long Label',
  render: () => (
    <div className="max-w-md">
      <Checkbox
        label="I have read and agree to the Terms of Service, Privacy Policy, and Cookie Policy. I understand that my data will be processed in accordance with these policies."
        helperText="You can withdraw your consent at any time."
      />
    </div>
  ),
};

export const Indeterminate: Story = {
  name: 'Indeterminate State',
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState([true, false, false]);
    const allChecked = checkedItems.every(Boolean);
    const someChecked = checkedItems.some(Boolean) && !allChecked;

    const parentRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (parentRef.current) {
        parentRef.current.indeterminate = someChecked;
      }
    }, [someChecked]);

    return (
      <div className="space-y-2">
        <Checkbox
          ref={parentRef}
          label="Select all topics"
          checked={allChecked}
          onChange={(e) => setCheckedItems([e.target.checked, e.target.checked, e.target.checked])}
        />
        <div className="ml-6 space-y-2">
          <Checkbox
            label="World News"
            checked={checkedItems[0]}
            onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]])}
          />
          <Checkbox
            label="U.S. News"
            checked={checkedItems[1]}
            onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]])}
          />
          <Checkbox
            label="Business"
            checked={checkedItems[2]}
            onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked])}
          />
        </div>
      </div>
    );
  },
};

export const TouchTarget: Story = {
  name: 'Touch Target (Accessibility)',
  render: () => (
    <div className="space-y-4">
      <p className="text-caption text-figure-muted max-w-sm">
        The clickable area includes both the checkbox and label, ensuring adequate touch target size.
      </p>
      <div className="space-y-3">
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" />
      </div>
    </div>
  ),
};
