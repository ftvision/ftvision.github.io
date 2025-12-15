import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const switchTrackVariants = cva(
  [
    // Base styles
    'relative inline-flex shrink-0 cursor-pointer rounded-full',
    'transition-colors duration-normal',
    // Focus styles
    'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-action-primary',
  ],
  {
    variants: {
      switchSize: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-8 w-14',
      },
    },
    defaultVariants: {
      switchSize: 'md',
    },
  }
);

const switchThumbVariants = cva(
  [
    'pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm',
    'transition-transform duration-normal',
  ],
  {
    variants: {
      switchSize: {
        sm: 'h-3.5 w-3.5 left-0.5',
        md: 'h-4 w-4 left-1',
        lg: 'h-5 w-5 left-1',
      },
    },
    defaultVariants: {
      switchSize: 'md',
    },
  }
);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof switchTrackVariants> {
  /** Label text for the switch */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Position of the label relative to the switch */
  labelPosition?: 'left' | 'right';
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, switchSize, label, description, labelPosition = 'right', id, ...props }, ref) => {
    const switchId = id || React.useId();
    const [isChecked, setIsChecked] = React.useState(props.checked || props.defaultChecked || false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      props.onChange?.(e);
    };

    // Map size to translation amount when checked
    const checkedTranslation = {
      sm: 'translate-x-4',
      md: 'translate-x-5',
      lg: 'translate-x-7',
    }[switchSize || 'md'];

    const switchControl = (
      <span
        className={cn(
          switchTrackVariants({ switchSize }),
          isChecked ? 'bg-action-primary' : 'bg-border',
          props.disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          type="checkbox"
          role="switch"
          id={switchId}
          className="sr-only"
          ref={ref}
          {...props}
          onChange={handleChange}
        />
        <span
          className={cn(
            switchThumbVariants({ switchSize }),
            isChecked ? checkedTranslation : 'translate-x-0'
          )}
          aria-hidden="true"
        />
      </span>
    );

    const labelContent = (label || description) && (
      <span className={cn('flex flex-col', labelPosition === 'left' && 'text-right')}>
        {label && (
          <span className="text-body text-figure-primary select-none">
            {label}
          </span>
        )}
        {description && (
          <span className="text-body-sm text-figure-muted select-none">
            {description}
          </span>
        )}
      </span>
    );

    return (
      <label
        htmlFor={switchId}
        className={cn(
          'inline-flex items-center gap-3 cursor-pointer',
          props.disabled && 'cursor-not-allowed',
          className
        )}
      >
        {labelPosition === 'left' && labelContent}
        {switchControl}
        {labelPosition === 'right' && labelContent}
      </label>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch, switchTrackVariants };
