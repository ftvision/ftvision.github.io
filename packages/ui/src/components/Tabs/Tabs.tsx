'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const tabsListVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      default: 'border-b border-border',
      pills: 'gap-1 bg-ground-secondary p-1 rounded-lg',
      underline: 'gap-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'text-body-sm font-medium transition-all duration-fast',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'px-4 py-2 -mb-px border-b-2 border-transparent',
          'text-figure-secondary hover:text-figure-primary hover:border-border-strong',
          'data-[state=active]:text-action-primary data-[state=active]:border-action-primary',
        ],
        pills: [
          'px-3 py-1.5 rounded-md',
          'text-figure-secondary hover:text-figure-primary',
          'data-[state=active]:bg-ground-primary data-[state=active]:text-figure-primary data-[state=active]:shadow-sm',
        ],
        underline: [
          'pb-2',
          'text-figure-secondary hover:text-figure-primary',
          'data-[state=active]:text-action-primary',
          'relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5',
          'after:bg-transparent data-[state=active]:after:bg-action-primary',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: 'default' | 'pills' | 'underline';
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs');
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The controlled value of the active tab */
  value?: string;
  /** The default value of the active tab */
  defaultValue?: string;
  /** Called when the active tab changes */
  onValueChange?: (value: string) => void;
  /** Visual variant */
  variant?: 'default' | 'pills' | 'underline';
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value: controlledValue, defaultValue, onValueChange, variant = 'default', children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, variant }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useTabsContext();
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value of the tab */
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: activeValue, onValueChange, variant } = useTabsContext();
    const isActive = activeValue === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(tabsTriggerVariants({ variant, className }))}
        onClick={() => onValueChange(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value of the tab this content belongs to */
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: activeValue } = useTabsContext();
    const isActive = activeValue === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(
          'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
