import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Patterns/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Accordion defaultValue="item-1" className="w-96" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern for accordions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default with smooth height transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>
          Content for the first section. Multiple items can be open simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Section</AccordionTrigger>
        <AccordionContent>
          Content for the second section. Try opening and closing items.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>
          Content for the third section.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Collapsible Section</AccordionTrigger>
        <AccordionContent>
          Click the trigger again to collapse. This accordion can be fully closed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Another Section</AccordionTrigger>
        <AccordionContent>
          Content for another section.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  name: 'FAQ Section',
  render: () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-h2 font-semibold text-figure-primary mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="subscription">
          <AccordionTrigger>How do I subscribe to the newsletter?</AccordionTrigger>
          <AccordionContent>
            You can subscribe by entering your email address in the subscription
            form at the bottom of any page, or by visiting our subscription page
            and selecting your preferred plan.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="cancel">
          <AccordionTrigger>Can I cancel my subscription at any time?</AccordionTrigger>
          <AccordionContent>
            Yes, you can cancel your subscription at any time from your account
            settings. Your access will continue until the end of your current
            billing period.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="gift">
          <AccordionTrigger>Do you offer gift subscriptions?</AccordionTrigger>
          <AccordionContent>
            Yes! Gift subscriptions are available for 3, 6, or 12-month terms.
            Visit our gift page to purchase a subscription for someone special.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="offline">
          <AccordionTrigger>Can I read articles offline?</AccordionTrigger>
          <AccordionContent>
            Yes, our mobile apps support offline reading. Simply save articles
            while connected to the internet, and they'll be available offline.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="archives">
          <AccordionTrigger>How do I access article archives?</AccordionTrigger>
          <AccordionContent>
            Subscribers have unlimited access to our complete archives dating back
            to 1851. Use the search function or browse by date to find historical
            content.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const ArticleOutline: Story = {
  name: 'Article Outline',
  render: () => (
    <aside className="w-64 p-4 border border-border rounded-lg">
      <h3 className="text-body-sm font-semibold text-figure-muted uppercase tracking-wide mb-4">
        In This Article
      </h3>
      <Accordion type="multiple" defaultValue={['intro']}>
        <AccordionItem value="intro">
          <AccordionTrigger className="text-body-sm py-2">
            Introduction
          </AccordionTrigger>
          <AccordionContent className="text-caption">
            <ul className="space-y-1 pl-4">
              <li className="hover:text-action-primary cursor-pointer">Background</li>
              <li className="hover:text-action-primary cursor-pointer">Key Points</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="analysis">
          <AccordionTrigger className="text-body-sm py-2">
            Analysis
          </AccordionTrigger>
          <AccordionContent className="text-caption">
            <ul className="space-y-1 pl-4">
              <li className="hover:text-action-primary cursor-pointer">Market Impact</li>
              <li className="hover:text-action-primary cursor-pointer">Expert Opinions</li>
              <li className="hover:text-action-primary cursor-pointer">Data Review</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="conclusion">
          <AccordionTrigger className="text-body-sm py-2">
            Conclusion
          </AccordionTrigger>
          <AccordionContent className="text-caption">
            <ul className="space-y-1 pl-4">
              <li className="hover:text-action-primary cursor-pointer">Summary</li>
              <li className="hover:text-action-primary cursor-pointer">What's Next</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  ),
};

export const Settings: Story = {
  name: 'Settings Panel',
  render: () => (
    <div className="w-96 border border-border rounded-lg overflow-hidden">
      <Accordion type="single" collapsible defaultValue="notifications">
        <AccordionItem value="account" className="border-b-0 border-t first:border-t-0">
          <AccordionTrigger className="px-4 hover:bg-ground-secondary">
            Account Settings
          </AccordionTrigger>
          <AccordionContent className="px-4 bg-ground-secondary">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Email</span>
                <span className="text-figure-muted">user@example.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Password</span>
                <button className="text-action-primary">Change</button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notifications" className="border-b-0 border-t">
          <AccordionTrigger className="px-4 hover:bg-ground-secondary">
            Notifications
          </AccordionTrigger>
          <AccordionContent className="px-4 bg-ground-secondary">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Email alerts</span>
                <span className="text-status-success">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Push notifications</span>
                <span className="text-status-danger">Disabled</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy" className="border-b-0 border-t">
          <AccordionTrigger className="px-4 hover:bg-ground-secondary">
            Privacy
          </AccordionTrigger>
          <AccordionContent className="px-4 bg-ground-secondary">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Profile visibility</span>
                <span className="text-figure-muted">Public</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Data sharing</span>
                <span className="text-figure-muted">Limited</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-1');
    return (
      <div className="space-y-4 w-96">
        <p className="text-body-sm text-figure-muted">
          Open item: <strong>{value || 'none'}</strong>
        </p>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-body-sm bg-ground-secondary rounded"
            onClick={() => setValue('item-1')}
          >
            Open 1
          </button>
          <button
            className="px-2 py-1 text-body-sm bg-ground-secondary rounded"
            onClick={() => setValue('item-2')}
          >
            Open 2
          </button>
          <button
            className="px-2 py-1 text-body-sm bg-ground-secondary rounded"
            onClick={() => setValue('')}
          >
            Close All
          </button>
        </div>
        <Accordion type="single" collapsible value={value} onValueChange={setValue}>
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>Content for the first item.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>Content for the second item.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};
