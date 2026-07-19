import * as React from "react";
import { Reference } from "./Reference";

export interface LocalSourceProps {
  /** Stable citation id within the essay. */
  id: string;
  /** User-inspectable local path or extraction instruction. */
  source: string;
  /** Optional description of what the source establishes. */
  note?: string;
}

/**
 * Compact citation for evidence available in a local installation.
 *
 * The full inspection path is registered in the References section while the
 * prose only carries a numbered marker.
 */
export function LocalSource({ id, source, note }: LocalSourceProps) {
  const citation = note
    ? `${note}. Inspect: ${source}`
    : `Claude Science local evidence. Inspect: ${source}`;

  return <Reference id={id} citation={citation} />;
}
