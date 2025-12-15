import * as React from 'react';
import { cn } from '@ui/lib/utils';

interface AccordionContextValue {
  value: string[];
  onValueChange: (value: string[]) => void;
  type: 'single' | 'multiple';
  collapsible: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  toggle: () => void;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger/AccordionContent must be used within an AccordionItem');
  }
  return context;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether multiple items can be open at once */
  type?: 'single' | 'multiple';
  /** The controlled value of the open item(s) */
  value?: string | string[];
  /** The default value of the open item(s) */
  defaultValue?: string | string[];
  /** Called when the open items change */
  onValueChange?: (value: string | string[]) => void;
  /** Whether a single-type accordion can be collapsed completely */
  collapsible?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({
    className,
    type = 'single',
    value: controlledValue,
    defaultValue,
    onValueChange,
    collapsible = false,
    children,
    ...props
  }, ref) => {
    // Normalize values to arrays
    const normalizeValue = (val: string | string[] | undefined): string[] => {
      if (val === undefined) return [];
      return Array.isArray(val) ? val : [val];
    };

    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
      normalizeValue(defaultValue)
    );

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? normalizeValue(controlledValue) : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (newValue: string[]) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        if (onValueChange) {
          onValueChange(type === 'single' ? (newValue[0] || '') : newValue);
        }
      },
      [isControlled, onValueChange, type]
    );

    return (
      <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type, collapsible }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value for this item */
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: openValues, onValueChange, type, collapsible } = useAccordionContext();
    const isOpen = openValues.includes(value);

    const toggle = React.useCallback(() => {
      if (type === 'single') {
        if (isOpen && collapsible) {
          onValueChange([]);
        } else if (!isOpen) {
          onValueChange([value]);
        }
      } else {
        if (isOpen) {
          onValueChange(openValues.filter((v) => v !== value));
        } else {
          onValueChange([...openValues, value]);
        }
      }
    }, [type, isOpen, collapsible, onValueChange, openValues, value]);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen, toggle }}>
        <div
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          className={cn('border-b border-border', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { value, isOpen, toggle } = useAccordionItemContext();

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${value}`}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          'flex w-full items-center justify-between py-4 text-body font-medium text-figure-primary',
          'transition-all hover:text-action-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2',
          '[&[data-state=open]>svg]:rotate-180',
          className
        )}
        onClick={toggle}
        {...props}
      >
        {children}
        <svg
          className="h-4 w-4 shrink-0 text-figure-muted transition-transform duration-normal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { value, isOpen } = useAccordionItemContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, [children]);

    return (
      <div
        ref={ref}
        id={`accordion-content-${value}`}
        role="region"
        aria-labelledby={`accordion-trigger-${value}`}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          'overflow-hidden transition-all duration-normal',
          isOpen ? 'animate-accordion-down' : 'animate-accordion-up'
        )}
        style={{
          height: isOpen ? height : 0,
        }}
        {...props}
      >
        <div ref={contentRef} className={cn('pb-4 text-body-sm text-figure-secondary', className)}>
          {children}
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
