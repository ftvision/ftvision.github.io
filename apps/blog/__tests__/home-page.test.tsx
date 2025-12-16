/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../app/page';

describe('HomePage', () => {
  it('renders the page title', () => {
    render(<HomePage />);

    // The home page should display a heading
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders a description or tagline', () => {
    render(<HomePage />);

    // The home page should have some descriptive text
    const description = screen.getByText(/personal essays|writing/i);
    expect(description).toBeInTheDocument();
  });

  it('has a link to essays page', () => {
    render(<HomePage />);

    const essaysLink = screen.getByRole('link', { name: /essays/i });
    expect(essaysLink).toBeInTheDocument();
    expect(essaysLink).toHaveAttribute('href', '/essays');
  });

  it('has a link to about page', () => {
    render(<HomePage />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('uses semantic HTML structure', () => {
    const { container } = render(<HomePage />);

    // Should have a main landmark
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('uses design token classes for styling', () => {
    const { container } = render(<HomePage />);

    // Check that design token classes are applied
    const main = container.querySelector('main');
    expect(main?.className).toContain('p-inset');
  });
});
