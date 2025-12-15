import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const cardVariants = cva(
  // Base styles using design tokens
  // Using arbitrary values with CSS variables to ensure proper theming
  '[border-radius:var(--radius-default)] bg-ground-primary text-figure-primary',
  {
    variants: {
      variant: {
        default: '[border-width:var(--border-width-default)] border-solid border-border',
        elevated: '[border-width:var(--border-width-thick)] border-solid border-border',
        inverted: '[border-width:var(--border-width-default)] border-solid border-border bg-ground-inverse text-figure-inverse',
        ghost: 'border-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-stack-xs p-inset-lg', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-heading text-2xl font-semibold leading-none', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-figure-secondary', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-inset-lg pb-inset-lg', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center px-inset-lg pb-inset-lg gap-inline-sm', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  cardVariants,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
