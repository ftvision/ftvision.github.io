import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const checkboxVariants = cva(
  [
    // Base styles
    'relative shrink-0 rounded border appearance-none cursor-pointer',
    'transition-colors duration-fast',
    // Focus styles
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50',
    // Checked state (using peer)
    'checked:bg-action-primary checked:border-action-primary',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-border bg-ground-primary',
          'focus:ring-action-primary',
          'hover:border-border-strong',
        ],
        error: [
          'border-status-danger bg-ground-primary',
          'focus:ring-status-danger',
        ],
      },
      checkboxSize: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      checkboxSize: 'md',
    },
  }
);

const checkIconVariants = cva(
  [
    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'pointer-events-none text-figure-inverse opacity-0',
    'peer-checked:opacity-100 transition-opacity duration-fast',
  ],
  {
    variants: {
      checkboxSize: {
        sm: 'h-3 w-3',
        md: 'h-3.5 w-3.5',
        lg: 'h-4 w-4',
      },
    },
    defaultVariants: {
      checkboxSize: 'md',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  /** Label text for the checkbox */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, checkboxSize, label, error, helperText, id, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    // Auto-generate IDs for accessibility
    const checkboxId = id || React.useId();
    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;

    // Determine variant based on error prop
    const computedVariant = error ? 'error' : variant;

    // Build aria-describedby
    const describedByParts: string[] = [];
    if (ariaDescribedBy) describedByParts.push(ariaDescribedBy);
    if (error) describedByParts.push(errorId);
    if (helperText && !error) describedByParts.push(helperId);
    const describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    return (
      <div className="flex flex-col">
        <label className="inline-flex items-start gap-2 cursor-pointer">
          <span className="relative inline-flex items-center justify-center">
            <input
              type="checkbox"
              id={checkboxId}
              className={cn('peer', checkboxVariants({ variant: computedVariant, checkboxSize, className }))}
              ref={ref}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={describedBy}
              {...props}
            />
            {/* Check icon */}
            <svg
              className={cn(checkIconVariants({ checkboxSize }))}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
            </svg>
          </span>
          {label && (
            <span className="text-body text-figure-primary select-none">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p id={errorId} className="mt-1 ml-7 text-caption text-status-danger" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1 ml-7 text-caption text-figure-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
