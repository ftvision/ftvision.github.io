'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@blog/ui';

export interface NavLink {
  href: string;
  label: string;
}

export interface SiteNavProps {
  links?: NavLink[];
  className?: string;
}

const defaultLinks: NavLink[] = [
  { href: '/essays', label: 'Essays' },
  { href: '/about', label: 'About' },
];

export function SiteNav({ links = defaultLinks, className }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center gap-6', className)} aria-label="Main navigation">
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
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
