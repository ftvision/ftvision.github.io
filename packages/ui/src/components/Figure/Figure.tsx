import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const figureVariants = cva('my-6', {
  variants: {
    size: {
      inline: 'max-w-prose mx-auto',
      wide: 'max-w-4xl mx-auto',
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'inline',
  },
});

const figcaptionVariants = cva(
  'mt-2 text-caption text-figure-muted',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

export interface FigureProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof figureVariants> {
  /** Caption text */
  caption?: string;
  /** Credit/attribution text */
  credit?: string;
  /** Caption alignment */
  captionAlign?: 'left' | 'center' | 'right';
}

const Figure = React.forwardRef<HTMLElement, FigureProps>(
  ({ className, size, caption, credit, captionAlign = 'left', children, ...props }, ref) => {
    return (
      <figure
        ref={ref}
        className={cn(figureVariants({ size, className }))}
        {...props}
      >
        <div className="overflow-hidden rounded-lg">
          {children}
        </div>
        {(caption || credit) && (
          <figcaption className={cn(figcaptionVariants({ align: captionAlign }))}>
            {caption && <span>{caption}</span>}
            {caption && credit && <span className="mx-1">|</span>}
            {credit && (
              <span className="text-figure-muted italic">{credit}</span>
            )}
          </figcaption>
        )}
      </figure>
    );
  }
);
Figure.displayName = 'Figure';

// FigureImage for standard image usage
export interface FigureImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Aspect ratio for the image container */
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | 'auto';
}

const FigureImage = React.forwardRef<HTMLImageElement, FigureImageProps>(
  ({ className, aspectRatio = 'auto', alt, ...props }, ref) => {
    const aspectClasses = {
      '16/9': 'aspect-video',
      '4/3': 'aspect-[4/3]',
      '1/1': 'aspect-square',
      '3/2': 'aspect-[3/2]',
      'auto': '',
    };

    return (
      <img
        ref={ref}
        alt={alt}
        className={cn(
          'w-full h-auto object-cover',
          aspectClasses[aspectRatio],
          className
        )}
        {...props}
      />
    );
  }
);
FigureImage.displayName = 'FigureImage';

export { Figure, FigureImage, figureVariants, figcaptionVariants };
