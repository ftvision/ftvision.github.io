import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Figure, FigureImage } from './Figure';

const meta: Meta<typeof Figure> = {
  title: 'Editorial/Figure',
  component: Figure,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['inline', 'wide', 'full'],
    },
    captionAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Figure
      caption="A view of the Manhattan skyline at sunset"
      credit="Photo by John Doe"
      {...args}
    >
      <FigureImage
        src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=450&fit=crop"
        alt="Manhattan skyline"
        aspectRatio="16/9"
      />
    </Figure>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-caption text-figure-muted mb-2">Inline (default)</h3>
        <Figure size="inline" caption="Inline figure fits within the text column">
          <FigureImage
            src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop"
            alt="Inline example"
            aspectRatio="3/2"
          />
        </Figure>
      </div>

      <div>
        <h3 className="text-caption text-figure-muted mb-2">Wide</h3>
        <Figure size="wide" caption="Wide figure extends beyond the text column">
          <FigureImage
            src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&h=500&fit=crop"
            alt="Wide example"
            aspectRatio="16/9"
          />
        </Figure>
      </div>

      <div>
        <h3 className="text-caption text-figure-muted mb-2">Full</h3>
        <Figure size="full" caption="Full-width figure spans the entire viewport">
          <FigureImage
            src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&h=400&fit=crop"
            alt="Full example"
          />
        </Figure>
      </div>
    </div>
  ),
};

export const AspectRatios: Story = {
  name: 'Aspect Ratios',
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      <Figure caption="16:9 (video)">
        <FigureImage
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=225&fit=crop"
          alt="16:9 aspect"
          aspectRatio="16/9"
        />
      </Figure>
      <Figure caption="4:3 (standard)">
        <FigureImage
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop"
          alt="4:3 aspect"
          aspectRatio="4/3"
        />
      </Figure>
      <Figure caption="1:1 (square)">
        <FigureImage
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=400&fit=crop"
          alt="1:1 aspect"
          aspectRatio="1/1"
        />
      </Figure>
      <Figure caption="3:2 (classic)">
        <FigureImage
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=267&fit=crop"
          alt="3:2 aspect"
          aspectRatio="3/2"
        />
      </Figure>
    </div>
  ),
};

export const CaptionAlignments: Story = {
  name: 'Caption Alignments',
  render: () => (
    <div className="space-y-6 max-w-prose mx-auto">
      <Figure
        caption="Left-aligned caption (default)"
        credit="Photo credit"
        captionAlign="left"
      >
        <FigureImage
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=300&fit=crop"
          alt="Left aligned"
        />
      </Figure>
      <Figure
        caption="Center-aligned caption"
        credit="Photo credit"
        captionAlign="center"
      >
        <FigureImage
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=300&fit=crop"
          alt="Center aligned"
        />
      </Figure>
      <Figure
        caption="Right-aligned caption"
        credit="Photo credit"
        captionAlign="right"
      >
        <FigureImage
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=300&fit=crop"
          alt="Right aligned"
        />
      </Figure>
    </div>
  ),
};

export const InArticle: Story = {
  name: 'In Article Context',
  render: () => (
    <article className="max-w-prose mx-auto space-y-4">
      <h1 className="text-h1 font-bold text-figure-primary">
        The Future of Urban Development
      </h1>
      <p className="text-body text-figure-primary">
        Cities around the world are reimagining urban spaces to meet the
        challenges of climate change and growing populations. From green
        rooftops to pedestrian-friendly streets, urban planners are
        implementing innovative solutions.
      </p>

      <Figure
        caption="New York City's High Line park has transformed an abandoned railway into a thriving public space"
        credit="Photo by Sarah Johnson / The Times"
      >
        <FigureImage
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=500&fit=crop"
          alt="High Line Park"
          aspectRatio="16/9"
        />
      </Figure>

      <p className="text-body text-figure-primary">
        The transformation of urban infrastructure has become a priority for
        city governments worldwide. Projects like the High Line in New York
        demonstrate how creative thinking can revitalize neglected spaces.
      </p>

      <p className="text-body text-figure-primary">
        According to urban planning experts, such initiatives not only improve
        quality of life but also contribute to environmental sustainability
        and economic growth.
      </p>
    </article>
  ),
};

export const WithoutCaption: Story = {
  name: 'Without Caption',
  render: () => (
    <Figure>
      <FigureImage
        src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop"
        alt="A beautiful landscape"
        aspectRatio="3/2"
      />
    </Figure>
  ),
};

export const CreditOnly: Story = {
  name: 'Credit Only',
  render: () => (
    <Figure credit="Getty Images">
      <FigureImage
        src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop"
        alt="Stock photo"
        aspectRatio="3/2"
      />
    </Figure>
  ),
};
