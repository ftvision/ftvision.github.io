/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the page title', () => {
    render(<HomePage />);

    // The home page should display a heading
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders a description or tagline', () => {
    render(<HomePage />);

    // The home page should have the tagline text
    const description = screen.getByText(/Thoughts on technology, AI, product, and career/i);
    expect(description).toBeInTheDocument();
  });

  it('has a link to essays page', () => {
    render(<HomePage />);

    // The essays link is a button with "Browse All Essays" text
    const essaysLink = screen.getByRole('link', { name: /browse all essays/i });
    expect(essaysLink).toBeInTheDocument();
    expect(essaysLink).toHaveAttribute('href', '/essays');
  });

  it('has a link to about page', () => {
    render(<HomePage />);

    // The about link is in the nav section with "About" button text
    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    // Find the one that links to /about (nav button, not header nav)
    const aboutLink = aboutLinks.find(link => link.getAttribute('href') === '/about');
    expect(aboutLink).toBeInTheDocument();
  });

  it('uses semantic HTML structure', () => {
    const { container } = render(<HomePage />);

    // Should have a main landmark
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('uses design token classes for styling', () => {
    const { container } = render(<HomePage />);

    // Check that design token classes are applied (px-inset-lg for horizontal padding)
    const main = container.querySelector('main');
    expect(main?.className).toContain('px-inset-lg');
  });
});
