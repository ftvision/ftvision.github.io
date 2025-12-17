import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EssayLayout } from './EssayLayout';
import { EssayHeader } from './EssayHeader';
import { Note } from '../content/Note';
import { Reference } from '../content/Reference';
import { References } from '../content/References';
import { ThemeProvider } from '../layout/ThemeProvider';

const meta: Meta<typeof EssayLayout> = {
  title: 'Blog / Essay / EssayLayout',
  component: EssayLayout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EssayLayout>;

const sampleHeader = (
  <EssayHeader
    type="guide"
    topics={['technical', 'ai']}
    title="How Transformers Work"
    description="A comprehensive guide to understanding the transformer architecture that powers modern AI."
    date="2024-12-14"
    readingTime={15}
  />
);

const sampleContent = (
  <>
    <p>
      The transformer architecture changed everything in machine learning. Before
      transformers, we relied heavily on recurrent neural networks (RNNs) and
      convolutional neural networks (CNNs) for sequence-to-sequence tasks.
    </p>

    <p>
      In 2017, the paper &quot;Attention Is All You Need&quot; introduced a novel
      architecture that would revolutionize the field.
      <Note>
        This refers to the seminal paper by Vaswani et al., published at NeurIPS
        2017. The paper has been cited over 100,000 times.
      </Note>
    </p>

    <h2>The Key Innovation: Self-Attention</h2>

    <p>
      The core innovation of the transformer is the self-attention mechanism.
      Unlike RNNs, which process sequences one element at a time, self-attention
      allows the model to look at all positions in the input sequence
      simultaneously.
      <Note>
        This parallel processing is what makes transformers so efficient to
        train on modern GPUs.
      </Note>
    </p>

    <p>
      This has profound implications for how we build language models today. The
      ability to capture long-range dependencies efficiently is what enables
      models like GPT-4 and Claude to maintain coherent conversations over
      thousands of tokens.
    </p>

    <h2>Architecture Overview</h2>

    <p>
      A transformer consists of an encoder and a decoder, though many modern
      applications use only one of these components. GPT models, for example,
      use only the decoder portion.
    </p>

    <p>
      The key components of each layer are:
    </p>

    <ul>
      <li>Multi-head self-attention</li>
      <li>Feed-forward neural networks</li>
      <li>Layer normalization</li>
      <li>Residual connections</li>
    </ul>

    <h2>Conclusion</h2>

    <p>
      Understanding transformers is essential for anyone working in modern
      machine learning. They form the backbone of virtually all state-of-the-art
      language models and are increasingly being applied to other domains like
      vision and audio.
    </p>
  </>
);

export const Default: Story = {
  args: {
    header: sampleHeader,
    children: sampleContent,
  },
};

export const WithoutHeader: Story = {
  args: {
    children: sampleContent,
  },
};

export const ShortContent: Story = {
  args: {
    header: (
      <EssayHeader
        type="opinion"
        topics={['career']}
        title="A Quick Thought on Code Reviews"
        date="2024-12-10"
        readingTime={3}
      />
    ),
    children: (
      <>
        <p>
          Code reviews are not about finding bugs. They&apos;re about sharing
          knowledge and maintaining code quality over time.
        </p>

        <p>
          The best code reviews are conversations, not gatekeeping.
          <Note>
            I&apos;ve seen too many teams use code reviews as a power dynamic
            rather than a learning opportunity.
          </Note>
        </p>

        <p>
          When you review code, ask yourself: &quot;Will this comment help the
          author write better code next time?&quot; If not, maybe reconsider.
        </p>
      </>
    ),
  },
};

export const WithMultipleNotes: Story = {
  args: {
    header: (
      <EssayHeader
        type="deep-dive"
        topics={['technical']}
        title="The Art of Debugging"
        description="A collection of techniques learned over a decade of fixing bugs."
        date="2024-11-30"
        readingTime={20}
      />
    ),
    children: (
      <>
        <p>
          Debugging is a skill that separates good engineers from great ones.
          <Note>
            Studies show that developers spend up to 50% of their time debugging.
            Improving this skill has a massive ROI.
          </Note>
        </p>

        <p>
          The first step is always reproduction. If you can&apos;t reproduce it,
          you can&apos;t fix it.
          <Note>
            &quot;Works on my machine&quot; is the most dreaded phrase in software
            engineering for a reason.
          </Note>
        </p>

        <p>
          Once you can reproduce the bug, isolate it. Remove as much code as
          possible while still maintaining the bug.
          <Note>
            This technique is called &quot;bisection&quot; or &quot;binary search
            debugging.&quot; Git bisect is a powerful tool for this.
          </Note>
        </p>

        <p>
          Finally, understand the root cause. Don&apos;t just fix the symptom.
          Ask &quot;why&quot; five times.
          <Note>
            The &quot;5 Whys&quot; technique was developed by Sakichi Toyoda and
            is still used at Toyota today.
          </Note>
        </p>
      </>
    ),
  },
};

/**
 * Tests that ReferenceProvider is properly integrated into EssayLayout.
 * References should work without additional wrapping.
 */
export const WithReferences: Story = {
  args: {
    header: (
      <EssayHeader
        type="guide"
        topics={['technical', 'ai']}
        title="Understanding Attention Mechanisms"
        description="A deep dive into the attention mechanisms that power modern AI."
        date="2024-12-15"
        readingTime={12}
      />
    ),
    children: (
      <>
        <p>
          The attention mechanism{' '}
          <Reference
            id="bahdanau2015"
            citation="Bahdanau, D., Cho, K., & Bengio, Y. (2015). Neural machine translation by jointly learning to align and translate. ICLR."
          />{' '}
          was first introduced for neural machine translation. It allowed models
          to focus on different parts of the input sequence when generating each
          output token.
        </p>

        <p>
          The transformer architecture{' '}
          <Reference
            id="vaswani2017"
            citation="Vaswani, A., et al. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30."
            url="https://arxiv.org/abs/1706.03762"
          />{' '}
          then extended this idea by using self-attention, which allows each
          position in a sequence to attend to all other positions.
          <Note>
            The paper title &quot;Attention Is All You Need&quot; became one of
            the most famous titles in ML history.
          </Note>
        </p>

        <p>
          BERT{' '}
          <Reference
            id="devlin2019"
            citation="Devlin, J., et al. (2019). BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. NAACL."
            url="https://arxiv.org/abs/1810.04805"
          />{' '}
          demonstrated that pre-training bidirectional transformers leads to
          significant improvements across a wide range of NLP tasks.
        </p>

        <h2>References</h2>
        <References />
      </>
    ),
  },
};
