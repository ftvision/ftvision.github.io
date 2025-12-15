import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const blockquoteVariants = cva(
  'relative',
  {
    variants: {
      variant: {
        default: [
          'border-l-4 border-accent-primary pl-4 py-1',
          'text-figure-secondary italic',
        ],
        pullquote: [
          'border-y border-border py-6 my-8',
          'text-h3 font-heading text-figure-primary text-center',
          'leading-snug',
        ],
        highlight: [
          'bg-surface-quote p-6 rounded-lg',
          'text-figure-primary',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof blockquoteVariants> {
  /** Attribution for the quote (author, source) */
  citation?: string;
  /** Optional link for the citation */
  citationHref?: string;
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, variant, citation, citationHref, children, ...props }, ref) => {
    return (
      <figure className={cn('my-6', variant === 'pullquote' && 'my-8')}>
        <blockquote
          ref={ref}
          className={cn(blockquoteVariants({ variant, className }))}
          {...props}
        >
          {variant === 'pullquote' ? (
            <span className="relative">
              <span className="absolute -top-4 -left-2 text-6xl text-accent-primary opacity-20 font-serif">
                "
              </span>
              {children}
            </span>
          ) : (
            children
          )}
        </blockquote>
        {citation && (
          <figcaption className={cn(
            'mt-3 text-body-sm text-figure-muted',
            variant === 'pullquote' && 'text-center',
            variant === 'highlight' && 'px-6'
          )}>
            {'— '}
            {citationHref ? (
              <a
                href={citationHref}
                className="text-link-default hover:text-link-hover hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {citation}
              </a>
            ) : (
              <cite className="not-italic">{citation}</cite>
            )}
          </figcaption>
        )}
      </figure>
    );
  }
);
Blockquote.displayName = 'Blockquote';

export { Blockquote, blockquoteVariants };
