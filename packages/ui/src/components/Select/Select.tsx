import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const selectVariants = cva(
  // Base styles with accessibility considerations
  [
    'flex w-full rounded border bg-ground-primary px-3 py-2',
    'font-body text-figure-primary',
    'transition-colors duration-fast',
    // Focus styles with proper ring
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-ground-secondary',
    // Appearance
    'appearance-none cursor-pointer',
    // Arrow indicator space
    'pr-10',
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
      selectSize: {
        sm: 'h-8 text-body-sm',
        md: 'h-10 text-body',
        lg: 'h-12 text-body',
      },
    },
    defaultVariants: {
      variant: 'default',
      selectSize: 'md',
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  /** Error message to display below the select */
  error?: string;
  /** Helper text to display below the select */
  helperText?: string;
  /** Placeholder option text */
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, selectSize, error, helperText, placeholder, id, children, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    // Auto-generate IDs for accessibility
    const selectId = id || React.useId();
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

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
        <div className="relative">
          <select
            id={selectId}
            className={cn(selectVariants({ variant: computedVariant, selectSize, className }))}
            ref={ref}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          {/* Chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-figure-muted">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
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
Select.displayName = 'Select';

export { Select, selectVariants };
