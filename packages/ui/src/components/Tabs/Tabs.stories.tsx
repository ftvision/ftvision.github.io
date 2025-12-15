import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Patterns/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="tab1" className="w-96" {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-body text-figure-primary">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-body text-figure-primary">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-body text-figure-primary">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="world" variant="pills" className="w-96">
      <TabsList>
        <TabsTrigger value="world">World</TabsTrigger>
        <TabsTrigger value="us">U.S.</TabsTrigger>
        <TabsTrigger value="politics">Politics</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
      </TabsList>
      <TabsContent value="world">
        <p className="text-body text-figure-primary">
          Latest world news and international coverage.
        </p>
      </TabsContent>
      <TabsContent value="us">
        <p className="text-body text-figure-primary">
          News from across the United States.
        </p>
      </TabsContent>
      <TabsContent value="politics">
        <p className="text-body text-figure-primary">
          Political news, analysis, and commentary.
        </p>
      </TabsContent>
      <TabsContent value="business">
        <p className="text-body text-figure-primary">
          Business and financial news updates.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="trending" variant="underline" className="w-96">
      <TabsList>
        <TabsTrigger value="trending">Trending</TabsTrigger>
        <TabsTrigger value="latest">Latest</TabsTrigger>
        <TabsTrigger value="opinion">Opinion</TabsTrigger>
      </TabsList>
      <TabsContent value="trending">
        <p className="text-body text-figure-primary">
          Most popular stories right now.
        </p>
      </TabsContent>
      <TabsContent value="latest">
        <p className="text-body text-figure-primary">
          The newest articles and updates.
        </p>
      </TabsContent>
      <TabsContent value="opinion">
        <p className="text-body text-figure-primary">
          Editorial and opinion pieces.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  name: 'With Disabled Tab',
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-2">
          <h3 className="text-h4 font-semibold">Account Settings</h3>
          <p className="text-body-sm text-figure-secondary">
            Manage your account preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-2">
          <h3 className="text-h4 font-semibold">Change Password</h3>
          <p className="text-body-sm text-figure-secondary">
            Update your password for security.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ArticleSections: Story = {
  name: 'Article Sections',
  render: () => (
    <Tabs defaultValue="article" variant="underline" className="w-full max-w-2xl">
      <TabsList>
        <TabsTrigger value="article">Article</TabsTrigger>
        <TabsTrigger value="comments">Comments (24)</TabsTrigger>
        <TabsTrigger value="related">Related</TabsTrigger>
      </TabsList>
      <TabsContent value="article">
        <article className="prose">
          <p className="text-body text-figure-primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </article>
      </TabsContent>
      <TabsContent value="comments">
        <div className="space-y-4">
          <div className="p-4 bg-ground-secondary rounded-lg">
            <p className="text-body-sm font-medium">John Doe</p>
            <p className="text-body-sm text-figure-secondary">Great article!</p>
          </div>
          <div className="p-4 bg-ground-secondary rounded-lg">
            <p className="text-body-sm font-medium">Jane Smith</p>
            <p className="text-body-sm text-figure-secondary">Very informative.</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="related">
        <ul className="space-y-2">
          <li className="text-body text-action-primary hover:underline cursor-pointer">
            Related Article 1
          </li>
          <li className="text-body text-action-primary hover:underline cursor-pointer">
            Related Article 2
          </li>
          <li className="text-body text-action-primary hover:underline cursor-pointer">
            Related Article 3
          </li>
        </ul>
      </TabsContent>
    </Tabs>
  ),
};

export const NewsFeed: Story = {
  name: 'News Feed Sections',
  render: () => (
    <Tabs defaultValue="for-you" variant="pills" className="w-full max-w-md">
      <TabsList className="w-full justify-center">
        <TabsTrigger value="for-you">For You</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="saved">Saved</TabsTrigger>
      </TabsList>
      <TabsContent value="for-you">
        <div className="space-y-4 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-border rounded-lg">
              <p className="text-caption text-figure-muted">Technology</p>
              <h4 className="text-body font-medium text-figure-primary mt-1">
                Personalized Story {i}
              </h4>
              <p className="text-body-sm text-figure-secondary mt-1">
                A brief summary of the story tailored to your interests.
              </p>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="following">
        <div className="py-4 text-center text-figure-muted">
          <p className="text-body-sm">Stories from topics and authors you follow.</p>
        </div>
      </TabsContent>
      <TabsContent value="saved">
        <div className="py-4 text-center text-figure-muted">
          <p className="text-body-sm">Your saved articles will appear here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ControlledTabs: Story = {
  name: 'Controlled',
  render: () => {
    const [activeTab, setActiveTab] = React.useState('tab1');
    return (
      <div className="space-y-4 w-96">
        <p className="text-body-sm text-figure-muted">
          Active tab: <strong>{activeTab}</strong>
        </p>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tab1">First</TabsTrigger>
            <TabsTrigger value="tab2">Second</TabsTrigger>
            <TabsTrigger value="tab3">Third</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
          <TabsContent value="tab3">Content 3</TabsContent>
        </Tabs>
      </div>
    );
  },
};
