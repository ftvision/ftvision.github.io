import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const inputVariants = cva(
  // Base styles with accessibility considerations
  [
    'flex w-full rounded border bg-ground-primary px-3 py-2',
    'font-body text-figure-primary placeholder:text-figure-muted',
    'transition-colors duration-fast',
    // Focus styles with proper ring
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
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
          'focus:border-action-primary focus:ring-action-primary',
        ],
        error: [
          'border-status-danger',
          'focus:border-status-danger focus:ring-status-danger',
        ],
        success: [
          'border-status-success',
          'focus:border-status-success focus:ring-status-success',
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
          <p id={errorId} className="mt-1 text-caption text-status-danger" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-caption text-figure-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
