import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const radioVariants = cva(
  [
    // Base styles
    'relative shrink-0 rounded-full border appearance-none cursor-pointer',
    'transition-colors duration-fast',
    // Focus styles
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50',
    // Checked state
    'checked:border-action-primary',
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
      radioSize: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      radioSize: 'md',
    },
  }
);

const radioDotVariants = cva(
  [
    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'rounded-full bg-action-primary pointer-events-none',
    'opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100',
    'transition-all duration-fast',
  ],
  {
    variants: {
      radioSize: {
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
      },
    },
    defaultVariants: {
      radioSize: 'md',
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioVariants> {
  /** Label text for the radio */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, variant, radioSize, label, error, helperText, id, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    // Auto-generate IDs for accessibility
    const radioId = id || React.useId();
    const errorId = `${radioId}-error`;
    const helperId = `${radioId}-helper`;

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
              type="radio"
              id={radioId}
              className={cn('peer', radioVariants({ variant: computedVariant, radioSize, className }))}
              ref={ref}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={describedBy}
              {...props}
            />
            {/* Radio dot */}
            <span
              className={cn(radioDotVariants({ radioSize }))}
              aria-hidden="true"
            />
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
Radio.displayName = 'Radio';

// RadioGroup for grouping radios with proper ARIA
export interface RadioGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  /** Legend/label for the radio group */
  legend?: string;
  /** Error message for the group */
  error?: string;
  /** Helper text for the group */
  helperText?: string;
  /** Hide the legend visually but keep it accessible */
  legendHidden?: boolean;
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, legend, error, helperText, legendHidden, children, ...props }, ref) => {
    const groupId = React.useId();
    const errorId = `${groupId}-error`;
    const helperId = `${groupId}-helper`;

    return (
      <fieldset
        ref={ref}
        className={cn('space-y-2', className)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        {...props}
      >
        {legend && (
          <legend
            className={cn(
              'text-body-sm font-medium text-figure-primary mb-2',
              legendHidden && 'sr-only'
            )}
          >
            {legend}
          </legend>
        )}
        <div className="space-y-2" role="group">
          {children}
        </div>
        {error && (
          <p id={errorId} className="text-caption text-status-danger" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-caption text-figure-muted">
            {helperText}
          </p>
        )}
      </fieldset>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export { Radio, RadioGroup, radioVariants };
