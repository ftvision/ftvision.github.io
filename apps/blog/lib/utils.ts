import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS conflict resolution
 *
 * This is a local utility for the blog app that combines clsx and tailwind-merge.
 * We keep this local rather than importing from @blog/ui to avoid 'use client'
 * directive issues in server components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
