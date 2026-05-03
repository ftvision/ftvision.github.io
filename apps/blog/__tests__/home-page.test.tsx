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

    // The home page should have resilient intro copy before the canvas hydrates
    const description = screen.getByText(/long-form thinking, curated discoveries/i);
    expect(description).toBeInTheDocument();
  });

  it('has a link to essays page', () => {
    render(<HomePage />);

    // The essays link is present in the server-rendered navigation
    const essaysLink = screen.getByRole('link', { name: /essays long-form pieces/i });
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

    // The app layout provides <main>; the page segment should expose one primary section.
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('uses design token classes for styling', () => {
    const { container } = render(<HomePage />);

    // The hardened landing shell keeps a tokenized background fallback.
    const section = container.querySelector('section');
    expect(section?.className).toContain('bg-ground-inverse');
  });
});
