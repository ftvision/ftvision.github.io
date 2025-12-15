import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'strong'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    decorative: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-0">
      <p className="text-body">Content above the separator</p>
      <Separator spacing="md" />
      <p className="text-body">Content below the separator</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-12 gap-0">
      <span className="text-body">Left</span>
      <Separator orientation="vertical" spacing="md" />
      <span className="text-body">Right</span>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-64 space-y-6">
      <div>
        <span className="text-caption text-figure-muted">Default</span>
        <Separator spacing="sm" variant="default" />
      </div>
      <div>
        <span className="text-caption text-figure-muted">Muted</span>
        <Separator spacing="sm" variant="muted" />
      </div>
      <div>
        <span className="text-caption text-figure-muted">Strong</span>
        <Separator spacing="sm" variant="strong" />
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-body">No spacing</p>
      <Separator spacing="none" />
      <p className="text-body">Small spacing</p>
      <Separator spacing="sm" />
      <p className="text-body">Medium spacing</p>
      <Separator spacing="md" />
      <p className="text-body">Large spacing</p>
      <Separator spacing="lg" />
      <p className="text-body">End of example</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <Separator label="OR" />
      <Separator label="Continue reading" />
      <Separator label="Section Break" variant="strong" />
    </div>
  ),
};

export const LoginForm: Story = {
  name: 'Login Form Example',
  render: () => (
    <div className="w-80 space-y-4 p-6 border border-border rounded-lg">
      <button className="w-full py-2 px-4 border border-border rounded text-body hover:bg-ground-secondary transition-colors">
        Continue with Google
      </button>
      <button className="w-full py-2 px-4 border border-border rounded text-body hover:bg-ground-secondary transition-colors">
        Continue with Apple
      </button>
      <Separator label="or" spacing="md" />
      <div className="space-y-3">
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-3 py-2 border border-border rounded text-body focus:outline-none focus:ring-2 focus:ring-action-primary"
        />
        <button className="w-full py-2 px-4 bg-action-primary text-figure-inverse rounded text-body hover:bg-action-primary-hover transition-colors">
          Continue with Email
        </button>
      </div>
    </div>
  ),
};

export const ArticleSection: Story = {
  name: 'Article Section Break',
  render: () => (
    <article className="max-w-prose space-y-4">
      <p className="text-body text-figure-primary">
        The first paragraph of this article discusses the main topic at hand.
        It provides context and sets up the reader for what's to come in the
        following sections.
      </p>
      <p className="text-body text-figure-primary">
        The second paragraph elaborates on the topic, providing more details
        and supporting information that helps build the narrative.
      </p>
      <Separator spacing="lg" variant="muted" />
      <p className="text-body text-figure-primary">
        After a section break, we transition to a new topic or angle. This
        helps readers understand that we're moving to a different aspect of
        the story.
      </p>
    </article>
  ),
};

export const NavItems: Story = {
  name: 'Navigation Items',
  render: () => (
    <nav className="flex items-center h-10 gap-0">
      <a href="#" className="text-body text-figure-primary hover:text-action-primary">Home</a>
      <Separator orientation="vertical" spacing="md" variant="muted" />
      <a href="#" className="text-body text-figure-primary hover:text-action-primary">News</a>
      <Separator orientation="vertical" spacing="md" variant="muted" />
      <a href="#" className="text-body text-figure-primary hover:text-action-primary">Opinion</a>
      <Separator orientation="vertical" spacing="md" variant="muted" />
      <a href="#" className="text-body text-figure-primary hover:text-action-primary">Sports</a>
    </nav>
  ),
};

export const MetadataRow: Story = {
  name: 'Metadata Row',
  render: () => (
    <div className="flex items-center text-body-sm text-figure-secondary h-5 gap-0">
      <span>John Doe</span>
      <Separator orientation="vertical" spacing="sm" variant="muted" />
      <span>Dec 14, 2025</span>
      <Separator orientation="vertical" spacing="sm" variant="muted" />
      <span>5 min read</span>
    </div>
  ),
};

export const FooterSections: Story = {
  name: 'Footer Sections',
  render: () => (
    <footer className="w-96 space-y-4 p-6 bg-ground-secondary rounded-lg">
      <div className="flex justify-between text-body-sm">
        <a href="#" className="text-figure-secondary hover:text-figure-primary">About</a>
        <a href="#" className="text-figure-secondary hover:text-figure-primary">Contact</a>
        <a href="#" className="text-figure-secondary hover:text-figure-primary">Careers</a>
        <a href="#" className="text-figure-secondary hover:text-figure-primary">Privacy</a>
      </div>
      <Separator variant="muted" />
      <p className="text-caption text-figure-muted text-center">
        © 2025 Your Publication. All rights reserved.
      </p>
    </footer>
  ),
};
