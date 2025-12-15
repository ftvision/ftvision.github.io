import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from './Dropdown';
import { Button } from '../Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Patterns/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    side: {
      control: 'select',
      options: ['top', 'bottom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger asChild>
        <Button variant="secondary">
          Open Menu
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onSelect={() => console.log('Profile')}>Profile</DropdownItem>
        <DropdownItem onSelect={() => console.log('Settings')}>Settings</DropdownItem>
        <DropdownItem onSelect={() => console.log('Help')}>Help</DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={() => console.log('Sign out')}>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const WithLabels: Story = {
  name: 'With Labels',
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="secondary">Account</Button>
      </DropdownTrigger>
      <DropdownMenu className="w-56">
        <DropdownLabel>My Account</DropdownLabel>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Billing</DropdownItem>
        <DropdownItem>Subscription</DropdownItem>
        <DropdownSeparator />
        <DropdownLabel>Team</DropdownLabel>
        <DropdownItem>Team Settings</DropdownItem>
        <DropdownItem>Invite Members</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="secondary">Actions</Button>
      </DropdownTrigger>
      <DropdownMenu className="w-48">
        <DropdownItem className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </DropdownItem>
        <DropdownItem className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Duplicate
        </DropdownItem>
        <DropdownItem className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className="flex items-center gap-2 text-status-danger">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const DisabledItems: Story = {
  name: 'Disabled Items',
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="secondary">Options</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Active Option</DropdownItem>
        <DropdownItem disabled>Disabled Option</DropdownItem>
        <DropdownItem>Another Active</DropdownItem>
        <DropdownItem disabled>Also Disabled</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex gap-8">
      <Dropdown align="start">
        <DropdownTrigger asChild>
          <Button variant="secondary" size="sm">Start</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown align="center">
        <DropdownTrigger asChild>
          <Button variant="secondary" size="sm">Center</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown align="end">
        <DropdownTrigger asChild>
          <Button variant="secondary" size="sm">End</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
};

export const ArticleActions: Story = {
  name: 'Article Actions',
  render: () => (
    <Dropdown align="end">
      <DropdownTrigger asChild>
        <button className="p-2 rounded-full hover:bg-ground-secondary transition-colors">
          <svg className="h-5 w-5 text-figure-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </DropdownTrigger>
      <DropdownMenu className="w-48">
        <DropdownItem className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Save for later
        </DropdownItem>
        <DropdownItem className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share article
        </DropdownItem>
        <DropdownItem className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Copy link
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          Hide this story
        </DropdownItem>
        <DropdownItem className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Report issue
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const UserMenu: Story = {
  name: 'User Menu',
  render: () => (
    <Dropdown align="end">
      <DropdownTrigger asChild>
        <button className="flex items-center gap-2 rounded-full p-1 hover:bg-ground-secondary transition-colors">
          <div className="h-8 w-8 rounded-full bg-action-primary flex items-center justify-center text-white text-body-sm font-medium">
            JD
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu className="w-56">
        <div className="px-2 py-2 border-b border-border">
          <p className="text-body-sm font-medium text-figure-primary">John Doe</p>
          <p className="text-caption text-figure-muted">john@example.com</p>
        </div>
        <DropdownItem className="mt-1">Your Profile</DropdownItem>
        <DropdownItem>Account Settings</DropdownItem>
        <DropdownItem>Subscription</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Help Center</DropdownItem>
        <DropdownItem>Keyboard Shortcuts</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};
