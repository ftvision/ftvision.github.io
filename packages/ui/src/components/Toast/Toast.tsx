'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const toastVariants = cva(
  [
    'pointer-events-auto relative flex w-full items-center justify-between gap-4',
    'overflow-hidden rounded-lg border p-4 shadow-lg',
    'transition-all duration-normal',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
    'data-[state=open]:slide-in-from-right-full data-[state=open]:fade-in-0',
  ],
  {
    variants: {
      variant: {
        default: 'bg-ground-primary border-border text-figure-primary',
        success: 'bg-status-success-bg border-status-success text-status-success',
        warning: 'bg-status-warning-bg border-status-warning text-status-warning',
        danger: 'bg-status-danger-bg border-status-danger text-status-danger',
        info: 'bg-status-info-bg border-status-info text-status-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /** Title of the toast */
  title?: string;
  /** Description of the toast */
  description?: string;
  /** Action button */
  action?: React.ReactNode;
  /** Whether to show close button */
  closable?: boolean;
  /** Called when toast should close */
  onClose?: () => void;
  /** Open state for animation */
  open?: boolean;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, action, closable = true, onClose, open = true, children, ...props }, ref) => {
    const icon = React.useMemo(() => {
      switch (variant) {
        case 'success':
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          );
        case 'warning':
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          );
        case 'danger':
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          );
        case 'info':
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          );
        default:
          return null;
      }
    }, [variant]);

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        data-state={open ? 'open' : 'closed'}
        className={cn(toastVariants({ variant, className }))}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">
          {title && (
            <div className={cn('text-body-sm font-medium', variant === 'default' && 'text-figure-primary')}>
              {title}
            </div>
          )}
          {description && (
            <div className={cn('text-body-sm', variant === 'default' ? 'text-figure-secondary' : 'opacity-90')}>
              {description}
            </div>
          )}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
        {closable && (
          <button
            onClick={onClose}
            className={cn(
              'shrink-0 rounded p-1 opacity-70 hover:opacity-100',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              variant === 'default' && 'focus:ring-action-primary',
              variant === 'success' && 'focus:ring-status-success',
              variant === 'warning' && 'focus:ring-status-warning',
              variant === 'danger' && 'focus:ring-status-danger',
              variant === 'info' && 'focus:ring-status-info'
            )}
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = 'Toast';

// Toast container for positioning
export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position of the toast container */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const toastContainerPositions = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className, position = 'bottom-right', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none',
        toastContainerPositions[position],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ToastContainer.displayName = 'ToastContainer';

// Simple toast hook for basic usage
interface ToastItem {
  id: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  description?: string;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback(
    (options: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, ...options };
      setToasts((prev) => [...prev, newToast]);

      // Auto-dismiss
      const duration = options.duration ?? 5000;
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }

      return id;
    },
    []
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
  };
}

export { Toast, ToastContainer, toastVariants };
