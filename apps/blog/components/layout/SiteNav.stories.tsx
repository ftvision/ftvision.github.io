import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SiteNav, type NavLink } from './SiteNav';

const meta: Meta<typeof SiteNav> = {
  title: 'Blog / Layout / SiteNav',
  component: SiteNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SiteNav>;

export const Default: Story = {
  args: {},
};

export const CustomLinks: Story = {
  args: {
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/projects', label: 'Projects' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const SingleLink: Story = {
  args: {
    links: [{ href: '/essays', label: 'All Essays' }],
  },
};

export const ManyLinks: Story = {
  args: {
    links: [
      { href: '/essays', label: 'Essays' },
      { href: '/guides', label: 'Guides' },
      { href: '/tutorials', label: 'Tutorials' },
      { href: '/reviews', label: 'Reviews' },
      { href: '/about', label: 'About' },
    ],
  },
};
