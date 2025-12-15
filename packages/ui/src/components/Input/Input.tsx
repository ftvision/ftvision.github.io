import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const inputVariants = cva(
  // Base styles with accessibility considerations using design tokens
  // Using arbitrary values with CSS variables to ensure proper theming
  [
    'flex w-full [border-radius:var(--radius-default)] [border-width:var(--border-width-default)] border-solid bg-ground-primary px-inset-sm',
    'text-figure-primary placeholder:text-figure-muted',
    'transition-hover',
    // Focus styles with proper ring using tokens
    'focus:outline-none focus-visible:focus-ring',
    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-ground-secondary',
    // File input specific
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-border',
          'focus:border-action-primary',
        ],
        error: [
          'border-status-danger',
          'focus:border-status-danger',
        ],
        success: [
          'border-status-success',
          'focus:border-status-success',
        ],
      },
      inputSize: {
        sm: 'h-8 text-body-sm',
        md: 'h-10 text-body',
        lg: 'h-12 text-body',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Error message to display below the input */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, error, helperText, id, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    // Auto-generate IDs for accessibility
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Determine variant based on error prop
    const computedVariant = error ? 'error' : variant;

    // Build aria-describedby
    const describedByParts: string[] = [];
    if (ariaDescribedBy) describedByParts.push(ariaDescribedBy);
    if (error) describedByParts.push(errorId);
    if (helperText && !error) describedByParts.push(helperId);
    const describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    return (
      <div className="w-full">
        <input
          type={type}
          id={inputId}
          className={cn(inputVariants({ variant: computedVariant, inputSize, className }))}
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-stack-xs text-caption text-status-danger" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-stack-xs text-caption text-figure-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
