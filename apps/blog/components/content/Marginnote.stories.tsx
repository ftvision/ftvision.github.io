import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Marginnote } from './Marginnote';

const meta: Meta<typeof Marginnote> = {
  title: 'Blog / Content / Marginnote',
  component: Marginnote,
  decorators: [
    (Story) => (
      /*
        Simulate essay layout: content with right padding for marginnote margin.
        Marginnotes use float + negative margin to position in the padding space.
        On mobile (<1024px), marginnotes are expandable inline elements.
      */
      <div className="p-4 lg:p-8 lg:pr-[340px] lg:max-w-[1100px] lg:mx-auto">
        <div className="max-w-prose">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Marginnote>;

export const Default: Story = {
  render: () => (
    <p className="text-body leading-relaxed">
      Machine learning has transformed many industries.
      <Marginnote>
        This is particularly evident in healthcare, finance, and autonomous
        vehicles.
      </Marginnote>{' '}
      The ability to process vast amounts of data and identify patterns has
      enabled applications that were previously impossible.
    </p>
  ),
};

export const MultipleMarginnotes: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-body leading-relaxed">
        Natural language processing has advanced rapidly.
        <Marginnote>
          NLP enables computers to understand and generate human language.
        </Marginnote>{' '}
        Modern models can translate between languages, summarize documents, and
        even engage in conversation.
      </p>
      <p className="text-body leading-relaxed">
        Computer vision has similarly progressed.
        <Marginnote>
          Applications include facial recognition, medical imaging, and
          autonomous driving.
        </Marginnote>{' '}
        Models can now identify objects, detect anomalies, and understand scenes
        with high accuracy.
      </p>
    </div>
  ),
};

export const AsAside: Story = {
  render: () => (
    <p className="text-body leading-relaxed">
      When training neural networks, the choice of optimizer matters greatly.
      <Marginnote>
        Fun fact: Adam is named after "adaptive moments" and combines ideas from
        RMSprop and momentum.
      </Marginnote>{' '}
      Popular choices include SGD with momentum, Adam, and AdamW.
    </p>
  ),
};
