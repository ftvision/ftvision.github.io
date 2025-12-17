import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TeaTimeToggle, useTeaTimeMode, teaTimeModeStyles } from './TeaTimeToggle';

const meta: Meta<typeof TeaTimeToggle> = {
  title: 'Components/Themes/Chinese Aesthetic/TeaTimeToggle',
  component: TeaTimeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tea Time Mode Toggle (茶歇模式) - Button that activates an ultra-contemplative reading mode.

## Effects when enabled
- Typography size increases 10%
- Margins expand significantly
- Color palette mutes further
- All animations pause
- Optional: subtle paper texture appears

## Features
- Multiple visual variants: button, pill, minimal, icon
- Tea cup icon with animated steam when enabled
- useTeaTimeMode hook with localStorage persistence
- Automatic style application to document

## Usage
\`\`\`tsx
import { TeaTimeToggle, useTeaTimeMode, teaTimeModeStyles } from '@ui/components/TeaTimeToggle';

function App() {
  const [enabled, setEnabled] = useTeaTimeMode();

  return (
    <>
      <style>{teaTimeModeStyles}</style>
      <TeaTimeToggle enabled={enabled} onToggle={setEnabled} />
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['button', 'pill', 'minimal', 'icon'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether tea time mode is enabled',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the text label',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the tea cup icon',
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{teaTimeModeStyles}</style>
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TeaTimeToggle>;

export const Default: Story = {
  args: {
    enabled: false,
    variant: 'button',
  },
};

export const Enabled: Story = {
  args: {
    enabled: true,
    variant: 'button',
  },
};

export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    enabled: false,
  },
};

export const PillVariant: Story = {
  args: {
    variant: 'pill',
    enabled: false,
  },
};

export const MinimalVariant: Story = {
  args: {
    variant: 'minimal',
    enabled: false,
  },
};

export const IconVariant: Story = {
  args: {
    variant: 'icon',
    enabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only variant showing just the tea cup.',
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'button',
    showLabel: false,
    showIcon: true,
    enabled: false,
  },
};

export const LabelOnly: Story = {
  args: {
    variant: 'button',
    showLabel: true,
    showIcon: false,
    enabled: false,
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    enabled: false,
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    enabled: true,
  },
};

export const CustomLabels: Story = {
  args: {
    enabled: false,
    enabledLabel: 'Tea Time On',
    disabledLabel: 'Enable Tea Time',
  },
};

export const EnglishLabels: Story = {
  args: {
    enabled: false,
    enabledLabel: 'Tea Time Mode',
    disabledLabel: 'Tea Time Mode',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-caption text-text-muted">Button Variant</p>
        <div className="flex gap-4">
          <TeaTimeToggle variant="button" enabled={false} />
          <TeaTimeToggle variant="button" enabled={true} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-caption text-text-muted">Pill Variant</p>
        <div className="flex gap-4">
          <TeaTimeToggle variant="pill" enabled={false} />
          <TeaTimeToggle variant="pill" enabled={true} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-caption text-text-muted">Minimal Variant</p>
        <div className="flex gap-4">
          <TeaTimeToggle variant="minimal" enabled={false} />
          <TeaTimeToggle variant="minimal" enabled={true} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-caption text-text-muted">Icon Variant</p>
        <div className="flex gap-4">
          <TeaTimeToggle variant="icon" enabled={false} />
          <TeaTimeToggle variant="icon" enabled={true} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all variants in both enabled and disabled states.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TeaTimeToggle size="sm" enabled={true} />
      <TeaTimeToggle size="md" enabled={true} />
      <TeaTimeToggle size="lg" enabled={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all sizes.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: function InteractiveTeaTime() {
    const [enabled, setEnabled] = React.useState(false);

    return (
      <div className="space-y-6">
        <TeaTimeToggle enabled={enabled} onToggle={setEnabled} />
        <div className="p-4 bg-ground-secondary rounded-lg">
          <p className="text-text-secondary">
            Status:{' '}
            <strong className={enabled ? 'text-accent-primary' : 'text-text-muted'}>
              {enabled ? 'Enabled - 已启用' : 'Disabled - 未启用'}
            </strong>
          </p>
          <p className="text-caption text-text-muted mt-2">
            Click the toggle to switch between states.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing the toggle behavior.',
      },
    },
  },
};

export const WithHookDemo: Story = {
  render: function HookDemo() {
    const [enabled, setEnabled] = useTeaTimeMode(false);

    return (
      <div className="space-y-6">
        <TeaTimeToggle enabled={enabled} onToggle={setEnabled} variant="pill" />
        <div className="p-6 bg-ground-secondary rounded-lg space-y-4">
          <h3 className="text-h5 font-semibold text-text-primary">
            观察文字大小变化
          </h3>
          <p className="text-body text-text-secondary">
            当茶歇模式启用时，文字会放大10%，
            让阅读更加舒适轻松。这是一种沉思式的阅读体验。
          </p>
          <p className="text-body-sm text-text-muted">
            When tea time mode is enabled, text increases by 10% for a more
            comfortable reading experience. This creates a contemplative atmosphere.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demo using the useTeaTimeMode hook which persists state and applies styles to the document.',
      },
    },
  },
};

export const InToolbarContext: Story = {
  render: function ToolbarDemo() {
    const [enabled, setEnabled] = React.useState(false);

    return (
      <div className="flex items-center gap-2 p-2 bg-ground-secondary rounded-lg">
        <button className="p-2 rounded hover:bg-ground-tertiary text-text-secondary">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <button className="p-2 rounded hover:bg-ground-tertiary text-text-secondary">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <div className="w-px h-6 bg-ground-tertiary" />
        <TeaTimeToggle
          variant="icon"
          size="md"
          enabled={enabled}
          onToggle={setEnabled}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'TeaTimeToggle in a toolbar context alongside other controls.',
      },
    },
  },
};

export const InSettingsContext: Story = {
  render: function SettingsDemo() {
    const [enabled, setEnabled] = React.useState(false);

    return (
      <div className="w-80 p-6 bg-ground-primary rounded-lg border border-ground-tertiary space-y-6">
        <div>
          <h3 className="text-h5 font-semibold text-text-primary mb-1">阅读设置</h3>
          <p className="text-caption text-text-muted">Reading Settings</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm text-text-primary">茶歇模式</p>
            <p className="text-caption text-text-muted">Tea Time Mode</p>
          </div>
          <TeaTimeToggle
            variant="pill"
            size="sm"
            enabled={enabled}
            onToggle={setEnabled}
            showLabel={false}
          />
        </div>

        <div className="pt-4 border-t border-ground-tertiary">
          <p className="text-caption text-text-muted">
            启用后：字体放大10%，边距扩大，动画暂停，营造沉思阅读氛围。
          </p>
          <p className="text-caption text-text-muted mt-1">
            When enabled: 10% larger text, expanded margins, paused animations for contemplative reading.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'TeaTimeToggle in a settings panel context.',
      },
    },
  },
};

export const EffectsPreview: Story = {
  render: function EffectsPreviewDemo() {
    return (
      <div className="space-y-6">
        <div className="p-4 bg-ground-secondary rounded-lg">
          <h4 className="text-h5 font-semibold text-text-primary mb-3">
            茶歇模式效果 Tea Time Mode Effects
          </h4>
          <ul className="space-y-2 text-body-sm text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-accent-primary">•</span>
              <span>Typography size increases 10% (字体放大10%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-primary">•</span>
              <span>Margins expand significantly (边距显著扩大)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-primary">•</span>
              <span>Color palette mutes further (颜色更加柔和)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-primary">•</span>
              <span>All animations pause (所有动画暂停)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-primary">•</span>
              <span>Subtle paper texture (optional) (微妙的纸张纹理)</span>
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Preview of all the effects that tea time mode applies.',
      },
    },
  },
};
