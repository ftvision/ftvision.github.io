import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const dropdownMenuVariants = cva(
  [
    'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-ground-primary p-1 shadow-lg',
    'animate-in fade-in-0 zoom-in-95',
  ],
  {
    variants: {
      align: {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
      },
      side: {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
      },
    },
    defaultVariants: {
      align: 'start',
      side: 'bottom',
    },
  }
);

const dropdownItemVariants = cva(
  [
    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5',
    'text-body-sm text-figure-primary outline-none',
    'transition-colors duration-fast',
    'hover:bg-ground-secondary hover:text-figure-primary',
    'focus:bg-ground-secondary focus:text-figure-primary',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ]
);

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  align: 'start' | 'center' | 'end';
  side: 'top' | 'bottom';
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
}

export interface DropdownProps {
  children: React.ReactNode;
  /** Alignment of the dropdown menu */
  align?: 'start' | 'center' | 'end';
  /** Side to open the dropdown */
  side?: 'top' | 'bottom';
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  align = 'start',
  side = 'bottom',
}) => {
  const [open, setOpen] = React.useState(false);

  // Close on escape
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Close on click outside
  React.useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, align, side }}>
      <div className="relative inline-block" data-dropdown>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { open, setOpen } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(!open);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownTrigger.displayName = 'DropdownTrigger';

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, children, ...props }, ref) => {
    const { open, align, side } = useDropdownContext();

    if (!open) return null;

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(dropdownMenuVariants({ align, side, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenu.displayName = 'DropdownMenu';

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Called when the item is selected */
  onSelect?: () => void;
}

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, disabled, onSelect, onClick, children, ...props }, ref) => {
    const { setOpen } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      onSelect?.();
      setOpen(false);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        data-disabled={disabled || undefined}
        className={cn(dropdownItemVariants(), className)}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownItem.displayName = 'DropdownItem';

export interface DropdownLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownLabel = React.forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-2 py-1.5 text-caption font-semibold text-figure-muted', className)}
      {...props}
    />
  )
);
DropdownLabel.displayName = 'DropdownLabel';

export interface DropdownSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
);
DropdownSeparator.displayName = 'DropdownSeparator';

export {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  dropdownMenuVariants,
  dropdownItemVariants,
};
