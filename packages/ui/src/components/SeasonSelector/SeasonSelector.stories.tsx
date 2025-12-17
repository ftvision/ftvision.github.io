import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  SeasonSelector,
  useCurrentSeason,
  resolveSeasonValue,
  type Season,
} from './SeasonSelector';

const meta: Meta<typeof SeasonSelector> = {
  title: 'Components/Themes/Chinese Aesthetic/SeasonSelector',
  component: SeasonSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Seasonal Theme Selector (四季) - Component for switching seasonal color accents in the Chinese Aesthetic theme.

## Seasons
- 春 (Spring): Plum blossom pink - 🌸
- 夏 (Summer): Lotus pink - 🪷
- 秋 (Autumn): Chrysanthemum gold - 🍂
- 冬 (Winter): Plum red - ❄️

## Features
- Multiple display modes: Chinese, English, emoji, or full
- Pills, tabs, or minimal variants
- Auto mode that follows the calendar
- useCurrentSeason hook for automatic detection

## Usage
\`\`\`tsx
import { SeasonSelector, useCurrentSeason, resolveSeasonValue } from '@ui/components/SeasonSelector';

function ThemeSettings() {
  const [season, setSeason] = React.useState<Season | 'auto'>('auto');
  const currentSeason = useCurrentSeason();
  const resolvedSeason = resolveSeasonValue(season, currentSeason);

  return (
    <div>
      <SeasonSelector value={season} onValueChange={setSeason} />
      <p>Active season: {resolvedSeason}</p>
    </div>
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
      options: ['pills', 'tabs', 'minimal'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the selector',
    },
    displayMode: {
      control: 'select',
      options: ['chinese', 'english', 'emoji', 'full'],
      description: 'How to display season labels',
    },
    showAuto: {
      control: 'boolean',
      description: 'Whether to show the auto option',
    },
    showSeasonColors: {
      control: 'boolean',
      description: 'Whether to show season-specific colors when active',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SeasonSelector>;

export const Default: Story = {
  args: {
    value: 'autumn',
    displayMode: 'chinese',
    showAuto: true,
  },
};

export const PillsVariant: Story = {
  args: {
    variant: 'pills',
    value: 'spring',
    displayMode: 'chinese',
  },
};

export const TabsVariant: Story = {
  args: {
    variant: 'tabs',
    value: 'summer',
    displayMode: 'chinese',
  },
};

export const MinimalVariant: Story = {
  args: {
    variant: 'minimal',
    value: 'winter',
    displayMode: 'chinese',
  },
};

export const ChineseDisplay: Story = {
  args: {
    value: 'spring',
    displayMode: 'chinese',
    showAuto: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Display mode showing Chinese characters for each season.',
      },
    },
  },
};

export const EnglishDisplay: Story = {
  args: {
    value: 'summer',
    displayMode: 'english',
    showAuto: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Display mode showing English names for each season.',
      },
    },
  },
};

export const EmojiDisplay: Story = {
  args: {
    value: 'autumn',
    displayMode: 'emoji',
    showAuto: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Display mode showing emojis for each season.',
      },
    },
  },
};

export const FullDisplay: Story = {
  args: {
    value: 'winter',
    displayMode: 'full',
    showAuto: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Display mode showing emoji, Chinese, and English for each season.',
      },
    },
  },
};

export const WithAutoOption: Story = {
  args: {
    value: 'auto',
    displayMode: 'chinese',
    showAuto: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Selector with auto option that follows the calendar.',
      },
    },
  },
};

export const WithoutAutoOption: Story = {
  args: {
    value: 'spring',
    displayMode: 'chinese',
    showAuto: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Selector without the auto option.',
      },
    },
  },
};

export const WithSeasonColors: Story = {
  args: {
    value: 'autumn',
    displayMode: 'chinese',
    showSeasonColors: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Active season displays in its signature color.',
      },
    },
  },
};

export const WithoutSeasonColors: Story = {
  args: {
    value: 'autumn',
    displayMode: 'chinese',
    showSeasonColors: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Active season uses default accent color.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    value: 'spring',
    displayMode: 'chinese',
    showAuto: false,
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    value: 'spring',
    displayMode: 'full',
    showAuto: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-caption text-text-muted mb-2">Pills Variant</p>
        <SeasonSelector variant="pills" value="spring" displayMode="chinese" />
      </div>
      <div>
        <p className="text-caption text-text-muted mb-2">Tabs Variant</p>
        <SeasonSelector variant="tabs" value="summer" displayMode="chinese" />
      </div>
      <div>
        <p className="text-caption text-text-muted mb-2">Minimal Variant</p>
        <SeasonSelector variant="minimal" value="autumn" displayMode="chinese" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three visual variants.',
      },
    },
  },
};

export const AllDisplayModes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-caption text-text-muted mb-2">Chinese (中文)</p>
        <SeasonSelector value="spring" displayMode="chinese" showAuto={false} />
      </div>
      <div>
        <p className="text-caption text-text-muted mb-2">English</p>
        <SeasonSelector value="spring" displayMode="english" showAuto={false} />
      </div>
      <div>
        <p className="text-caption text-text-muted mb-2">Emoji</p>
        <SeasonSelector value="spring" displayMode="emoji" showAuto={false} />
      </div>
      <div>
        <p className="text-caption text-text-muted mb-2">Full</p>
        <SeasonSelector value="spring" displayMode="full" showAuto={false} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all display modes.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: function InteractiveSeasonSelector() {
    const [value, setValue] = React.useState<Season | 'auto'>('auto');
    const currentSeason = useCurrentSeason();
    const resolvedSeason = resolveSeasonValue(value, currentSeason);

    return (
      <div className="space-y-4">
        <SeasonSelector
          value={value}
          onValueChange={setValue}
          displayMode="full"
          showSeasonColors
        />
        <div className="p-4 bg-ground-secondary rounded-lg space-y-2">
          <p className="text-text-secondary">
            Selected: <strong className="text-accent-primary">{value}</strong>
          </p>
          <p className="text-text-secondary">
            Current calendar season: <strong>{currentSeason}</strong>
          </p>
          <p className="text-text-secondary">
            Resolved season: <strong className="text-accent-primary">{resolvedSeason}</strong>
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing how the auto option resolves to the current calendar season.',
      },
    },
  },
};

export const InSettingsContext: Story = {
  render: function SettingsContextDemo() {
    const [season, setSeason] = React.useState<Season | 'auto'>('auto');

    return (
      <div className="w-80 p-6 bg-ground-primary rounded-lg border border-ground-tertiary space-y-6">
        <div>
          <h3 className="text-h5 font-semibold text-text-primary mb-1">主题设置</h3>
          <p className="text-caption text-text-muted">Theme Settings</p>
        </div>

        <div className="space-y-3">
          <label className="text-body-sm text-text-secondary">季节主题 Season Theme</label>
          <SeasonSelector
            value={season}
            onValueChange={setSeason}
            displayMode="chinese"
            variant="pills"
            className="w-full justify-between"
          />
        </div>

        <div className="pt-4 border-t border-ground-tertiary">
          <p className="text-caption text-text-muted">
            选择季节将改变网站的装饰色调，体现四季之美。
          </p>
          <p className="text-caption text-text-muted mt-1">
            Selecting a season changes the accent colors to reflect the beauty of each season.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SeasonSelector in a typical settings panel context.',
      },
    },
  },
};

export const SeasonPreview: Story = {
  render: () => {
    const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
    const seasonInfo: Record<Season, { color: string; flower: string; flowerChinese: string }> = {
      spring: { color: '#ec4899', flower: 'Plum Blossom', flowerChinese: '梅花' },
      summer: { color: '#f472b6', flower: 'Lotus', flowerChinese: '荷花' },
      autumn: { color: '#f59e0b', flower: 'Chrysanthemum', flowerChinese: '菊花' },
      winter: { color: '#dc2626', flower: 'Plum (Wintersweet)', flowerChinese: '腊梅' },
    };

    return (
      <div className="grid grid-cols-2 gap-4">
        {seasons.map((season) => (
          <div
            key={season}
            className="p-4 rounded-lg border border-ground-tertiary space-y-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: seasonInfo[season].color }}
              />
              <span className="font-medium text-text-primary">
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </span>
            </div>
            <p className="text-caption text-text-muted">
              {seasonInfo[season].flowerChinese} - {seasonInfo[season].flower}
            </p>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Preview of all four seasons with their associated colors and flowers.',
      },
    },
  },
};
