'use client';

import * as React from 'react';

/**
 * Note data structure for sidenotes
 */
export interface NoteData {
  id: string;
  number: number;
  content: React.ReactNode;
}

/**
 * Context value for managing sidenotes
 */
interface NoteContextValue {
  /** Register a note and get its number */
  registerNote: (id: string, content: React.ReactNode) => number;
  /** Get all registered notes */
  getNotes: () => NoteData[];
  /** Reset note counter (useful for new pages) */
  reset: () => void;
}

const NoteContext = React.createContext<NoteContextValue | null>(null);

/**
 * Provider for managing sidenote numbering and content
 */
export function NoteProvider({ children }: { children: React.ReactNode }) {
  const notesRef = React.useRef<Map<string, NoteData>>(new Map());
  const counterRef = React.useRef(0);

  const registerNote = React.useCallback(
    (id: string, content: React.ReactNode): number => {
      // Check if note already exists
      const existing = notesRef.current.get(id);
      if (existing) {
        // Update content but keep the same number
        notesRef.current.set(id, { ...existing, content });
        return existing.number;
      }

      // Assign new number
      counterRef.current += 1;
      const number = counterRef.current;
      notesRef.current.set(id, { id, number, content });
      return number;
    },
    []
  );

  const getNotes = React.useCallback((): NoteData[] => {
    return Array.from(notesRef.current.values()).sort(
      (a, b) => a.number - b.number
    );
  }, []);

  const reset = React.useCallback(() => {
    notesRef.current.clear();
    counterRef.current = 0;
  }, []);

  const value = React.useMemo(
    () => ({ registerNote, getNotes, reset }),
    [registerNote, getNotes, reset]
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

/**
 * Hook to access note context
 */
export function useNotes(): NoteContextValue {
  const context = React.useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
}

/**
 * Hook to check if NoteProvider is available
 */
export function useNotesOptional(): NoteContextValue | null {
  return React.useContext(NoteContext);
}
