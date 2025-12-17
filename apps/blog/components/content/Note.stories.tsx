import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Note } from './Note';
import { NoteProvider } from './NoteContext';

const meta: Meta<typeof Note> = {
  title: 'Blog / Content / Note',
  component: Note,
  decorators: [
    (Story) => (
      <NoteProvider>
        {/*
          Simulate essay layout: content with right padding for sidenote margin.
          Sidenotes use float + negative margin to position in the padding space.
          On mobile (<1024px), notes are expandable inline elements.
        */}
        <div className="p-4 lg:p-8 lg:pr-[340px] lg:max-w-[1100px] lg:mx-auto">
          <div className="max-w-prose">
            <Story />
          </div>
        </div>
      </NoteProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Note>;

export const Default: Story = {
  render: () => (
    <p className="text-body leading-relaxed">
      The transformer architecture changed everything.
      <Note>
        This refers to the seminal paper by Vaswani et al., "Attention Is All
        You Need" (2017), which introduced the transformer architecture that
        powers modern language models.
      </Note>{' '}
      Before transformers, sequence-to-sequence models relied heavily on
      recurrent neural networks (RNNs) and long short-term memory (LSTM)
      networks.
    </p>
  ),
};

export const MultipleNotes: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-body leading-relaxed">
        The attention mechanism
        <Note id="attention">
          Attention allows the model to focus on relevant parts of the input
          when producing each part of the output.
        </Note>{' '}
        was a key innovation. It allows models to weigh the importance of
        different input tokens
        <Note id="tokens">
          Tokens are the basic units of text that models process, typically
          words or subword pieces.
        </Note>{' '}
        when generating output.
      </p>
      <p className="text-body leading-relaxed">
        Self-attention, in particular,
        <Note id="self-attention">
          Self-attention computes attention weights between all positions in the
          same sequence, enabling the model to capture long-range dependencies.
        </Note>{' '}
        enables the model to capture relationships between all positions in a
        sequence in parallel.
      </p>
    </div>
  ),
};

export const LongNote: Story = {
  render: () => (
    <p className="text-body leading-relaxed">
      Large language models have shown remarkable capabilities.
      <Note>
        The scaling hypothesis suggests that larger models trained on more data
        will continue to improve in capability. This has been demonstrated by
        models like GPT-3, GPT-4, and Claude, which show emergent abilities at
        scale including reasoning, coding, and creative writing. However, there
        are ongoing debates about whether scale alone is sufficient for
        achieving general intelligence, or whether architectural innovations are
        also necessary.
      </Note>{' '}
      These capabilities include reasoning, coding, and creative writing.
    </p>
  ),
};

export const WithCode: Story = {
  render: () => (
    <p className="text-body leading-relaxed">
      The implementation uses a simple attention formula.
      <Note>
        The attention function is computed as:{' '}
        <code className="bg-ground-secondary px-1 rounded">
          Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
        </code>
      </Note>{' '}
      This allows for efficient parallel computation.
    </p>
  ),
};
