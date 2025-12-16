'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@blog/ui';
import { SiteNav } from './SiteNav';

export interface SiteHeaderProps {
  /** Site name/logo text */
  siteName?: string;
  /** Optional slot for navigation (defaults to SiteNav) */
  navigation?: React.ReactNode;
  /** Optional slot for actions (e.g., theme toggle) */
  actions?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

export function SiteHeader({
  siteName = 'Essays',
  navigation,
  actions,
  className,
}: SiteHeaderProps) {
  return (
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

        {/* Navigation - hidden on mobile, shown on md+ */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation ?? <SiteNav />}
        </div>

        {/* Actions slot (theme toggle, etc.) */}
        <div className="flex items-center gap-2">
          {actions}
          {/* Mobile menu button - placeholder for Phase 8 */}
          <button
            type="button"
            className={cn(
              'md:hidden',
              'inline-flex items-center justify-center',
              'h-10 w-10 rounded-md',
              'text-figure-secondary hover:text-figure-primary hover:bg-action-secondary',
              'transition-hover'
            )}
            aria-label="Open menu"
            aria-expanded="false"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
