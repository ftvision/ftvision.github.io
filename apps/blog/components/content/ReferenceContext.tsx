'use client';

import * as React from 'react';

/**
 * Reference data structure for citations
 */
export interface ReferenceData {
  /** Unique identifier for the reference */
  id: string;
  /** Auto-assigned number for display [n] */
  number: number;
  /** Citation text (e.g., "Vaswani, A., et al. (2017). Attention is all you need.") */
  citation: string;
  /** Optional URL for the reference */
  url?: string;
}

/** Subscriber callback type */
type Subscriber = () => void;

/**
 * Context value for managing references/citations
 */
interface ReferenceContextValue {
  /** Register a reference and get its number */
  registerReference: (id: string, citation: string, url?: string) => number;
  /** Get all registered references */
  getReferences: () => ReferenceData[];
  /** Get a specific reference by id */
  getReference: (id: string) => ReferenceData | undefined;
  /** Subscribe to reference changes */
  subscribe: (callback: Subscriber) => () => void;
  /** Reset references (useful for new pages) */
  reset: () => void;
}

const ReferenceContext = React.createContext<ReferenceContextValue | null>(
  null
);

/**
 * Provider for managing citation numbering and collection
 *
 * Uses a subscription pattern so the References component can re-render
 * when new references are registered, without needing setTimeout hacks.
 */
export function ReferenceProvider({ children }: { children: React.ReactNode }) {
  const referencesRef = React.useRef<Map<string, ReferenceData>>(new Map());
  const counterRef = React.useRef(0);
  const subscribersRef = React.useRef<Set<Subscriber>>(new Set());

  const notifySubscribers = React.useCallback(() => {
    subscribersRef.current.forEach((callback) => callback());
  }, []);

  const registerReference = React.useCallback(
    (id: string, citation: string, url?: string): number => {
      // Check if reference already exists
      const existing = referencesRef.current.get(id);
      if (existing) {
        // Update citation but keep the same number
        referencesRef.current.set(id, { ...existing, citation, url });
        return existing.number;
      }

      // Assign new number
      counterRef.current += 1;
      const number = counterRef.current;
      referencesRef.current.set(id, { id, number, citation, url });

      // Notify subscribers of the change
      notifySubscribers();

      return number;
    },
    [notifySubscribers]
  );

  const getReferences = React.useCallback((): ReferenceData[] => {
    return Array.from(referencesRef.current.values()).sort(
      (a, b) => a.number - b.number
    );
  }, []);

  const getReference = React.useCallback(
    (id: string): ReferenceData | undefined => {
      return referencesRef.current.get(id);
    },
    []
  );

  const subscribe = React.useCallback((callback: Subscriber): (() => void) => {
    subscribersRef.current.add(callback);
    return () => {
      subscribersRef.current.delete(callback);
    };
  }, []);

  const reset = React.useCallback(() => {
    referencesRef.current.clear();
    counterRef.current = 0;
    notifySubscribers();
  }, [notifySubscribers]);

  const value = React.useMemo(
    () => ({ registerReference, getReferences, getReference, subscribe, reset }),
    [registerReference, getReferences, getReference, subscribe, reset]
  );

  return (
    <ReferenceContext.Provider value={value}>
      {children}
    </ReferenceContext.Provider>
  );
}

/**
 * Hook to access reference context
 */
export function useReferences(): ReferenceContextValue {
  const context = React.useContext(ReferenceContext);
  if (!context) {
    throw new Error('useReferences must be used within a ReferenceProvider');
  }
  return context;
}

/**
 * Hook to check if ReferenceProvider is available
 */
export function useReferencesOptional(): ReferenceContextValue | null {
  return React.useContext(ReferenceContext);
}
