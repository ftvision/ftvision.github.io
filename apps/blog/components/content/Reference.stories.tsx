import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Reference } from './Reference';
import { References } from './References';
import { ReferenceProvider } from './ReferenceContext';

const meta: Meta<typeof Reference> = {
  title: 'Blog / Content / Reference',
  component: Reference,
  decorators: [
    (Story) => (
      <ReferenceProvider>
        <div className="max-w-prose mx-auto p-8">
          <Story />
        </div>
      </ReferenceProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Reference>;

export const Default: Story = {
  render: () => (
    <p className="text-body leading-relaxed">
      The transformer architecture{' '}
      <Reference
        id="vaswani2017"
        citation="Vaswani, A., et al. (2017). Attention is all you need. NeurIPS."
      />{' '}
      revolutionized natural language processing and enabled the development of
      large language models.
    </p>
  ),
};

export const WithURL: Story = {
  render: () => (
    <p className="text-body leading-relaxed">
      BERT{' '}
      <Reference
        id="bert"
        citation="Devlin, J., et al. (2019). BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. NAACL."
        url="https://arxiv.org/abs/1810.04805"
      />{' '}
      introduced bidirectional training to language models.
    </p>
  ),
};

export const MultipleReferences: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-body leading-relaxed">
        The attention mechanism{' '}
        <Reference
          id="attention"
          citation="Bahdanau, D., Cho, K., & Bengio, Y. (2015). Neural machine translation by jointly learning to align and translate. ICLR."
        />{' '}
        was first introduced for neural machine translation. The transformer{' '}
        <Reference
          id="transformer"
          citation="Vaswani, A., et al. (2017). Attention is all you need. NeurIPS."
        />{' '}
        then extended this idea with self-attention.
      </p>
      <p className="text-body leading-relaxed">
        GPT{' '}
        <Reference
          id="gpt"
          citation="Radford, A., et al. (2018). Improving Language Understanding by Generative Pre-Training."
        />{' '}
        demonstrated the power of unsupervised pre-training, while BERT{' '}
        <Reference
          id="bert2"
          citation="Devlin, J., et al. (2019). BERT: Pre-training of Deep Bidirectional Transformers. NAACL."
        />{' '}
        showed the benefits of bidirectional context.
      </p>
    </div>
  ),
};

export const WithReferencesSection: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-heading-md font-semibold">Introduction</h2>
      <p className="text-body leading-relaxed">
        Modern language models are built on the transformer architecture{' '}
        <Reference
          id="transformer"
          citation="Vaswani, A., et al. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30."
          url="https://arxiv.org/abs/1706.03762"
        />
        . This architecture has enabled breakthrough results in translation{' '}
        <Reference
          id="translation"
          citation="Wu, Y., et al. (2016). Google's Neural Machine Translation System: Bridging the Gap between Human and Machine Translation."
        />
        , summarization, and question answering{' '}
        <Reference
          id="qa"
          citation="Rajpurkar, P., et al. (2016). SQuAD: 100,000+ Questions for Machine Comprehension of Text. EMNLP."
        />
        .
      </p>
      <References />
    </div>
  ),
};
