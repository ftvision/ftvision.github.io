import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const bylineVariants = cva('flex items-center gap-3', {
  variants: {
    size: {
      sm: 'text-caption',
      md: 'text-body-sm',
      lg: 'text-body',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface Author {
  name: string;
  role?: string;
  avatarUrl?: string;
  href?: string;
}

export interface BylineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bylineVariants> {
  /** Author(s) of the article */
  authors: Author | Author[];
  /** Publication date */
  date?: string | Date;
  /** Reading time in minutes */
  readingTime?: number;
  /** Whether to show avatars */
  showAvatar?: boolean;
  /** Layout style */
  layout?: 'inline' | 'stacked';
}

const Byline = React.forwardRef<HTMLDivElement, BylineProps>(
  ({
    className,
    size,
    authors,
    date,
    readingTime,
    showAvatar = true,
    layout = 'inline',
    ...props
  }, ref) => {
    const authorList = Array.isArray(authors) ? authors : [authors];

    // Format date if provided
    const formattedDate = React.useMemo(() => {
      if (!date) return null;
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }, [date]);

    // Format author names
    const formatAuthors = () => {
      if (authorList.length === 1) {
        return authorList[0].name;
      }
      if (authorList.length === 2) {
        return `${authorList[0].name} and ${authorList[1].name}`;
      }
      const lastAuthor = authorList[authorList.length - 1];
      const otherAuthors = authorList.slice(0, -1);
      return `${otherAuthors.map((a) => a.name).join(', ')}, and ${lastAuthor.name}`;
    };

    if (layout === 'stacked') {
      return (
        <div
          ref={ref}
          className={cn(bylineVariants({ size, className }), 'flex-col items-start gap-2')}
          {...props}
        >
          {showAvatar && authorList.length === 1 && authorList[0].avatarUrl && (
            <img
              src={authorList[0].avatarUrl}
              alt={authorList[0].name}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}
          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-x-1">
              <span className="text-figure-muted">By </span>
              {authorList.map((author, index) => (
                <React.Fragment key={author.name}>
                  {author.href ? (
                    <a
                      href={author.href}
                      className="font-medium text-figure-primary hover:text-link-hover hover:underline"
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span className="font-medium text-figure-primary">{author.name}</span>
                  )}
                  {index < authorList.length - 2 && <span className="text-figure-muted">, </span>}
                  {index === authorList.length - 2 && (
                    <span className="text-figure-muted"> and </span>
                  )}
                </React.Fragment>
              ))}
            </div>
            {authorList[0].role && (
              <p className="text-figure-muted">{authorList[0].role}</p>
            )}
            <div className="flex items-center gap-2 text-figure-muted">
              {formattedDate && <time dateTime={typeof date === 'string' ? date : date?.toISOString()}>{formattedDate}</time>}
              {formattedDate && readingTime && <span>·</span>}
              {readingTime && <span>{readingTime} min read</span>}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(bylineVariants({ size, className }))}
        {...props}
      >
        {showAvatar && authorList.length === 1 && authorList[0].avatarUrl && (
          <img
            src={authorList[0].avatarUrl}
            alt={authorList[0].name}
            className={cn(
              'rounded-full object-cover',
              size === 'sm' && 'h-6 w-6',
              size === 'md' && 'h-8 w-8',
              size === 'lg' && 'h-10 w-10'
            )}
          />
        )}
        <div className="flex flex-wrap items-center gap-x-1">
          <span className="text-figure-muted">By </span>
          {authorList.map((author, index) => (
            <React.Fragment key={author.name}>
              {author.href ? (
                <a
                  href={author.href}
                  className="font-medium text-figure-primary hover:text-link-hover hover:underline"
                >
                  {author.name}
                </a>
              ) : (
                <span className="font-medium text-figure-primary">{author.name}</span>
              )}
              {index < authorList.length - 2 && <span className="text-figure-muted">,</span>}
              {index === authorList.length - 2 && (
                <span className="text-figure-muted">and</span>
              )}
            </React.Fragment>
          ))}
          {(formattedDate || readingTime) && (
            <>
              <span className="text-figure-muted mx-1">·</span>
              {formattedDate && (
                <time className="text-figure-muted" dateTime={typeof date === 'string' ? date : date?.toISOString()}>
                  {formattedDate}
                </time>
              )}
              {formattedDate && readingTime && <span className="text-figure-muted mx-1">·</span>}
              {readingTime && (
                <span className="text-figure-muted">{readingTime} min read</span>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);
Byline.displayName = 'Byline';

export { Byline, bylineVariants };
