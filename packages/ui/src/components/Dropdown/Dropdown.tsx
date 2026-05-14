'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

// Global registry for dropdown close functions
// This ensures only one dropdown is open at a time
const dropdownRegistry = new Set<() => void>();

function registerDropdown(closeHandler: () => void): () => void {
  dropdownRegistry.add(closeHandler);
  return () => dropdownRegistry.delete(closeHandler);
}

function closeAllDropdowns(): void {
  dropdownRegistry.forEach((close) => close());
}

const dropdownMenuVariants = cva(
  [
    'absolute z-50 min-w-[12rem] overflow-hidden rounded-md border bg-ground-primary p-1 shadow-lg',
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
    'relative flex min-h-11 cursor-pointer select-none items-center rounded-sm px-3 py-2',
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
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
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
  const [open, setOpenState] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Create a stable close handler for this dropdown
  const closeHandler = React.useCallback(() => {
    setOpenState(false);
  }, []);

  // Register this dropdown's close handler
  React.useEffect(() => {
    return registerDropdown(closeHandler);
  }, [closeHandler]);

  // Custom setOpen that closes other dropdowns first
  const setOpen = React.useCallback((newOpen: boolean) => {
    if (newOpen) {
      // Close all other dropdowns before opening this one
      closeAllDropdowns();
    }
    setOpenState(newOpen);
  }, []);

  // Close on escape
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenState(false);
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
      // Check if click is outside THIS specific dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpenState(false);
      }
    };

    // Use setTimeout to avoid closing immediately from the trigger click
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClick);
    };
  }, [open]);

  return (
    <DropdownContext.Provider
      value={{ open, setOpen, align, side, dropdownRef, triggerRef }}
    >
      <div ref={dropdownRef} className="relative inline-block" data-dropdown>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, children, onClick, onKeyDown, ...props }, ref) => {
    const { open, setOpen, dropdownRef, triggerRef } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(!open);
    };

    const setRefs = (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const focusFirstItem = () => {
      window.requestAnimationFrame(() => {
        const firstItem = dropdownRef.current?.querySelector<HTMLElement>(
          '[role="menuitem"]:not([data-disabled="true"])'
        );
        firstItem?.focus();
      });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
        focusFirstItem();
      }
    };

    return (
      <button
        ref={setRefs}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        className={className}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
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
  ({ className, children, onKeyDown, ...props }, ref) => {
    const { open, align, side, dropdownRef, triggerRef, setOpen } =
      useDropdownContext();

    if (!open) return null;

    const setRefs = (node: HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const getItems = () =>
      Array.from(
        dropdownRef.current?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([data-disabled="true"])'
        ) ?? []
      );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      const items = getItems();
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);

      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const nextIndex =
          currentIndex === -1
            ? 0
            : (currentIndex + direction + items.length) % items.length;
        items[nextIndex]?.focus();
        return;
      }

      if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
        return;
      }

      if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    };

    return (
      <div
        ref={setRefs}
        role="menu"
        className={cn(dropdownMenuVariants({ align, side, className }))}
        onKeyDown={handleKeyDown}
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
