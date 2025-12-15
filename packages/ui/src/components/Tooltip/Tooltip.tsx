import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const tooltipVariants = cva(
  [
    'absolute z-50 px-2 py-1 rounded text-caption',
    'bg-ground-inverse text-figure-inverse',
    'animate-in fade-in-0 zoom-in-95',
    'pointer-events-none whitespace-nowrap',
  ],
  {
    variants: {
      side: {
        top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
        bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
        left: 'right-full mr-2 top-1/2 -translate-y-1/2',
        right: 'left-full ml-2 top-1/2 -translate-y-1/2',
      },
    },
    defaultVariants: {
      side: 'top',
    },
  }
);

const tooltipArrowVariants = cva(
  'absolute w-2 h-2 bg-ground-inverse rotate-45',
  {
    variants: {
      side: {
        top: 'top-full -mt-1 left-1/2 -translate-x-1/2',
        bottom: 'bottom-full -mb-1 left-1/2 -translate-x-1/2',
        left: 'left-full -ml-1 top-1/2 -translate-y-1/2',
        right: 'right-full -mr-1 top-1/2 -translate-y-1/2',
      },
    },
    defaultVariants: {
      side: 'top',
    },
  }
);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /** The content to display in the tooltip */
  content: React.ReactNode;
  /** The trigger element */
  children: React.ReactElement;
  /** Delay in ms before showing the tooltip */
  delayDuration?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Whether to show an arrow */
  arrow?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  delayDuration = 200,
  disabled = false,
  arrow = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const triggerRef = React.useRef<HTMLElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delayDuration);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Clone the child element to add event handlers
  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      children.props.onMouseEnter?.(e);
      showTooltip();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      children.props.onMouseLeave?.(e);
      hideTooltip();
    },
    onFocus: (e: React.FocusEvent) => {
      children.props.onFocus?.(e);
      showTooltip();
    },
    onBlur: (e: React.FocusEvent) => {
      children.props.onBlur?.(e);
      hideTooltip();
    },
    'aria-describedby': isOpen ? 'tooltip' : undefined,
  });

  return (
    <span className="relative inline-flex">
      {trigger}
      {isOpen && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className={cn(tooltipVariants({ side }))}
        >
          {content}
          {arrow && (
            <span
              className={cn(tooltipArrowVariants({ side }))}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </span>
  );
};
Tooltip.displayName = 'Tooltip';

export { Tooltip, tooltipVariants };
