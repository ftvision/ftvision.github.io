import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimelineMap } from './TimelineMap';
import type { TimelineItem, TimelineCategory, TimelinePeriod } from '@/types/timeline';

/**
 * Sample data: Classic books organized by genre and decade
 */
interface Book extends TimelineItem {
  author: string;
  genre: string;
}

const SAMPLE_BOOKS: Book[] = [
  // Fiction
  { id: 1, year: 1925, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'fiction' },
  { id: 2, year: 1949, title: '1984', author: 'George Orwell', genre: 'fiction' },
  { id: 3, year: 1960, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'fiction' },
  { id: 4, year: 1967, title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', genre: 'fiction' },
  { id: 5, year: 1988, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'fiction' },

  // Science Fiction
  { id: 6, year: 1965, title: 'Dune', author: 'Frank Herbert', genre: 'sci-fi' },
  { id: 7, year: 1968, title: 'Do Androids Dream of Electric Sheep?', author: 'Philip K. Dick', genre: 'sci-fi' },
  { id: 8, year: 1984, title: 'Neuromancer', author: 'William Gibson', genre: 'sci-fi' },
  { id: 9, year: 1992, title: 'Snow Crash', author: 'Neal Stephenson', genre: 'sci-fi' },

  // Philosophy
  { id: 10, year: 1943, title: 'Being and Nothingness', author: 'Jean-Paul Sartre', genre: 'philosophy' },
  { id: 11, year: 1951, title: 'The Rebel', author: 'Albert Camus', genre: 'philosophy' },
  { id: 12, year: 1971, title: 'A Theory of Justice', author: 'John Rawls', genre: 'philosophy' },

  // Science
  { id: 13, year: 1962, title: 'The Structure of Scientific Revolutions', author: 'Thomas Kuhn', genre: 'science' },
  { id: 14, year: 1976, title: 'The Selfish Gene', author: 'Richard Dawkins', genre: 'science' },
  { id: 15, year: 1988, title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'science' },
];

const BOOK_CATEGORIES: TimelineCategory[] = [
  { id: 'fiction', name: 'Literary Fiction' },
  { id: 'sci-fi', name: 'Science Fiction' },
  { id: 'philosophy', name: 'Philosophy' },
  { id: 'science', name: 'Popular Science' },
];

const BOOK_PERIODS: TimelinePeriod[] = [
  { id: '1920s', label: '1920s', startYear: 1920, endYear: 1929 },
  { id: '1940s', label: '1940s', startYear: 1940, endYear: 1949 },
  { id: '1950s', label: '1950s', startYear: 1950, endYear: 1959 },
  { id: '1960s', label: '1960s', startYear: 1960, endYear: 1969 },
  { id: '1970s', label: '1970s', startYear: 1970, endYear: 1979 },
  { id: '1980s', label: '1980s', startYear: 1980, endYear: 1989 },
  { id: '1990s', label: '1990s', startYear: 1990, endYear: 1999 },
];

const meta: Meta<typeof TimelineMap> = {
  title: 'Blog / Content / TimelineMap',
  component: TimelineMap,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TimelineMap>;

/**
 * A simple timeline showing classic books organized by genre and decade.
 * Colors are auto-assigned from the design system's data tokens.
 */
export const Default: Story = {
  render: () => (
    <TimelineMap
      items={SAMPLE_BOOKS.map(book => ({
        ...book,
        subtitle: book.author,
      }))}
      getCategory={(book) => book.genre}
      categories={BOOK_CATEGORIES}
      periods={BOOK_PERIODS}
      title="Classic Books Timeline"
      subtitle="Notable books organized by genre"
    />
  ),
};

/**
 * Starting in table view mode.
 */
export const TableView: Story = {
  render: () => (
    <TimelineMap
      items={SAMPLE_BOOKS.map(book => ({
        ...book,
        subtitle: book.author,
      }))}
      getCategory={(book) => book.genre}
      categories={BOOK_CATEGORIES}
      periods={BOOK_PERIODS}
      title="Classic Books Timeline"
      subtitle="Notable books organized by genre"
      defaultView="table"
    />
  ),
};

/**
 * With custom colors specified for each category.
 */
export const CustomColors: Story = {
  render: () => (
    <TimelineMap
      items={SAMPLE_BOOKS.map(book => ({
        ...book,
        subtitle: book.author,
      }))}
      getCategory={(book) => book.genre}
      categories={[
        { id: 'fiction', name: 'Literary Fiction', color: '#e63946' },
        { id: 'sci-fi', name: 'Science Fiction', color: '#457b9d' },
        { id: 'philosophy', name: 'Philosophy', color: '#2a9d8f' },
        { id: 'science', name: 'Popular Science', color: '#e9c46a' },
      ]}
      periods={BOOK_PERIODS}
      title="Books with Custom Colors"
    />
  ),
};

/**
 * With a custom tooltip renderer.
 */
export const CustomTooltip: Story = {
  render: () => (
    <TimelineMap
      items={SAMPLE_BOOKS.map(book => ({
        ...book,
        subtitle: book.author,
      }))}
      getCategory={(book) => book.genre}
      categories={BOOK_CATEGORIES}
      periods={BOOK_PERIODS}
      title="Books with Custom Tooltips"
      renderTooltip={(book) => (
        <div>
          <p className="text-sm font-bold text-figure-inverse">{book.title}</p>
          <p className="text-xs text-figure-inverse opacity-80">by {(book as Book).author}</p>
          <p className="mt-1 text-xs text-figure-inverse opacity-60">{book.year}</p>
        </div>
      )}
    />
  ),
};

/**
 * Minimal example with just a few items.
 */
export const Minimal: Story = {
  render: () => (
    <TimelineMap
      items={[
        { id: 1, year: 2020, title: 'Project Alpha', subtitle: 'Initial release' },
        { id: 2, year: 2021, title: 'Project Beta', subtitle: 'Major update' },
        { id: 3, year: 2022, title: 'Project Gamma', subtitle: 'Performance improvements' },
        { id: 4, year: 2023, title: 'Project Delta', subtitle: 'New features' },
      ].map(item => ({ ...item, category: 'default' }))}
      getCategory={() => 'default'}
      categories={[{ id: 'default', name: 'Projects' }]}
      periods={[
        { id: '2020', label: '2020', startYear: 2020, endYear: 2020 },
        { id: '2021', label: '2021', startYear: 2021, endYear: 2021 },
        { id: '2022', label: '2022', startYear: 2022, endYear: 2022 },
        { id: '2023', label: '2023', startYear: 2023, endYear: 2023 },
      ]}
      title="Project Timeline"
    />
  ),
};

/**
 * Hero mode: TimelineMap breaks out of content column to span full viewport width.
 * Uses JS-based offset calculation for precise alignment across all screen sizes.
 * This simulates how the component is used in actual MDX pages within EssayLayout.
 */
export const HeroMode: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      // Simulate EssayLayout's CSS Grid structure
      <div className="min-h-screen bg-ground-primary">
        <div className="xl:grid xl:grid-cols-[200px_1fr_340px] xl:gap-8 max-w-screen-2xl mx-auto px-4 xl:px-8">
          {/* Left sidebar (ToC) */}
          <aside className="hidden xl:block pt-8">
            <div className="bg-ground-secondary p-4 rounded text-figure-muted text-sm">
              Table of Contents
            </div>
          </aside>

          {/* Main content area - this is where MDX renders */}
          <main className="pt-8 pb-16">
            <article className="max-w-prose mx-auto xl:mx-0">
              <h1 className="type-h1 text-figure-primary mb-4">Article Title</h1>
              <p className="text-body text-figure-secondary mb-6">
                This is regular paragraph text that stays within the prose width.
                The TimelineMap below uses hero mode to break out to full viewport width.
              </p>
              <Story />
              <p className="text-body text-figure-secondary mt-6">
                And here is more content after the timeline, returning to normal width.
              </p>
            </article>
          </main>

          {/* Right sidebar (sidenotes) - pointer-events-none allows hero content clicks */}
          <aside className="hidden xl:block pt-8 pointer-events-none">
            <div className="bg-ground-secondary p-4 rounded text-figure-muted text-sm pointer-events-auto">
              Sidenotes
            </div>
          </aside>
        </div>
      </div>
    ),
  ],
  render: () => (
    <TimelineMap
      items={SAMPLE_BOOKS.map(book => ({
        ...book,
        subtitle: book.author,
      }))}
      getCategory={(book) => book.genre}
      categories={BOOK_CATEGORIES}
      periods={BOOK_PERIODS}
      title="Classic Books Timeline"
      subtitle="Full-width timeline using hero mode"
      hero={true}
    />
  ),
};
