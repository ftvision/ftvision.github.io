'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const modalOverlayVariants = cva(
  [
    'fixed inset-0 z-50 bg-overlay-scrim',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ]
);

const modalContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'w-full bg-ground-primary shadow-lg rounded-lg',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'duration-normal',
    // Focus management
    'focus:outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-[calc(100%-2rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface ModalContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within a Modal');
  }
  return context;
}

export interface ModalProps {
  /** Whether the modal is open */
  open?: boolean;
  /** Called when the modal open state changes */
  onOpenChange?: (open: boolean) => void;
  /** The modal content */
  children: React.ReactNode;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open = false,
  onOpenChange,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      onOpenChange?.(newOpen);
    },
    [onOpenChange]
  );

  // Handle escape key
  React.useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEscape, handleOpenChange]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  return (
    <ModalContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </ModalContext.Provider>
  );
};

export interface ModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ onClick, children, ...props }, ref) => {
    const { onOpenChange } = useModalContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onOpenChange(true);
    };

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);
ModalTrigger.displayName = 'ModalTrigger';

export interface ModalContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalContentVariants> {}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, size, children, ...props }, ref) => {
    const { open, onOpenChange } = useModalContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Focus trap - focus first focusable element when opened
    React.useEffect(() => {
      if (open && contentRef.current) {
        const focusableElements = contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement?.focus();
      }
    }, [open]);

    if (!open) return null;

    return (
      <>
        {/* Overlay */}
        <div
          className={cn(modalOverlayVariants())}
          data-state={open ? 'open' : 'closed'}
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />
        {/* Content */}
        <div
          ref={(node) => {
            // Handle both refs
            (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          role="dialog"
          aria-modal="true"
          data-state={open ? 'open' : 'closed'}
          className={cn(modalContentVariants({ size, className }))}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
ModalContent.displayName = 'ModalContent';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6 pb-0', className)}
      {...props}
    />
  )
);
ModalHeader.displayName = 'ModalHeader';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0', className)}
      {...props}
    />
  )
);
ModalFooter.displayName = 'ModalFooter';

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-h4 font-semibold text-figure-primary', className)}
      {...props}
    />
  )
);
ModalTitle.displayName = 'ModalTitle';

export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-body-sm text-figure-secondary', className)}
      {...props}
    />
  )
);
ModalDescription.displayName = 'ModalDescription';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
);
ModalBody.displayName = 'ModalBody';

export interface ModalCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { onOpenChange } = useModalContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onOpenChange(false);
    };

    return (
      <button
        ref={ref}
        className={cn(
          'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-bg-primary',
          'transition-opacity hover:opacity-100',
          'focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2',
          'disabled:pointer-events-none',
          className
        )}
        onClick={handleClick}
        aria-label="Close"
        {...props}
      >
        {children || (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    );
  }
);
ModalClose.displayName = 'ModalClose';

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalClose,
  modalContentVariants,
};
