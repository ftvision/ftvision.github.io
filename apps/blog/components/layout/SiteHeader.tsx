'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@blog/ui';

// ============================================================================
// Types
// ============================================================================

export interface NavLink {
  href: string;
  label: string;
}

export interface SiteHeaderProps {
  /** Site name/logo text */
  siteName?: string;
  /** Navigation links */
  links?: NavLink[];
  /** Optional slot for actions (e.g., theme toggle) */
  actions?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_LINKS: NavLink[] = [
  { href: '/essays', label: 'Essays' },
  { href: '/about', label: 'About' },
];

// ============================================================================
// Internal Components
// ============================================================================

interface DesktopNavProps {
  links: NavLink[];
  pathname: string;
}

function DesktopNav({ links, pathname }: DesktopNavProps) {
  return (
    <nav
      className="hidden md:flex md:items-center md:gap-6"
      aria-label="Main navigation"
    >
      {links.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-body transition-hover',
              'hover:text-link-hover',
              isActive
                ? 'text-figure-primary font-medium'
                : 'text-figure-secondary'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'md:hidden',
        'inline-flex items-center justify-center',
        'h-10 w-10 rounded-md',
        'text-figure-secondary hover:text-figure-primary hover:bg-action-secondary',
        'transition-hover',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2'
      )}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        )}
      </svg>
    </button>
  );
}

interface MobileMenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  pathname: string;
  actions?: React.ReactNode;
}

function MobileMenuPanel({
  isOpen,
  onClose,
  links,
  pathname,
  actions,
}: MobileMenuPanelProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);

  // Focus first link when menu opens
  React.useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-ground-inverse/50 backdrop-blur-sm',
          'transition-opacity duration-normal',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Clip container - prevents menu from being visible above header when collapsed */}
      <div className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-hidden pointer-events-none">
        {/* Menu panel */}
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={cn(
            'bg-ground-primary border-b border-border shadow-lg',
            'transform transition-transform duration-normal ease-out',
            isOpen ? 'translate-y-0 pointer-events-auto' : '-translate-y-full'
          )}
        >
        <nav
          className="container mx-auto px-4 py-6"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1" role="list">
            {links.map((link, index) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      'block rounded-md px-3 py-3',
                      'text-body-lg transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2',
                      isActive
                        ? 'bg-action-secondary text-figure-primary font-medium'
                        : 'text-figure-secondary hover:bg-ground-secondary hover:text-figure-primary'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions slot (e.g., theme toggle) */}
          {actions && (
            <div className="mt-6 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <span className="text-body text-figure-secondary">Theme</span>
                {actions}
              </div>
            </div>
          )}
        </nav>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function SiteHeader({
  siteName = 'Essays',
  links = DEFAULT_LINKS,
  actions,
  className,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full',
          'bg-ground-primary/95 backdrop-blur supports-[backdrop-filter]:bg-ground-primary/80',
          'border-b border-border',
          className
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo / Site name */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2',
              'text-heading-sm font-semibold tracking-tight',
              'text-figure-primary hover:text-link-hover transition-hover'
            )}
          >
            {siteName}
          </Link>

          {/* Desktop navigation */}
          <DesktopNav links={links} pathname={pathname} />

          {/* Actions + Mobile menu button */}
          <div className="flex items-center gap-2">
            {/* Actions visible on desktop only */}
            <div className="hidden md:block">{actions}</div>

            {/* Mobile menu button */}
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </header>

      {/* Mobile menu panel */}
      <MobileMenuPanel
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        links={links}
        pathname={pathname}
        actions={actions}
      />
    </>
  );
}
