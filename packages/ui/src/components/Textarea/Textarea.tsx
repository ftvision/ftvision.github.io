import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const textareaVariants = cva(
  // Base styles with accessibility considerations
  [
    'flex w-full rounded border bg-ground-primary px-3 py-2',
    'font-body text-figure-primary placeholder:text-figure-muted',
    'transition-colors duration-fast',
    // Focus styles with proper ring
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-ground-secondary',
    // Resize behavior
    'resize-y min-h-[80px]',
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
      textareaSize: {
        sm: 'text-body-sm',
        md: 'text-body',
        lg: 'text-body',
      },
    },
    defaultVariants: {
      variant: 'default',
      textareaSize: 'md',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  /** Error message to display below the textarea */
  error?: string;
  /** Helper text to display below the textarea */
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textareaSize, error, helperText, id, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    // Auto-generate IDs for accessibility
    const textareaId = id || React.useId();
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

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
        <textarea
          id={textareaId}
          className={cn(textareaVariants({ variant: computedVariant, textareaSize, className }))}
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
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
