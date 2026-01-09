import type { ReactNode } from 'react';

/**
 * Navigation target for experiment interactions
 */
export type NavigationTarget = 'essays' | 'about' | 'periodics' | 'series';

/**
 * Describes how an experiment reveals navigation
 */
export interface NavigationTrigger {
  /** Type of interaction that reveals this nav item */
  type: 'hover' | 'click' | 'scroll' | 'gesture';
  /** The page this trigger navigates to */
  target: NavigationTarget;
  /** Optional hint text for discoverability */
  hint?: string;
  /** Position in 3D space (normalized -1 to 1) */
  position?: { x: number; y: number; z: number };
}

/**
 * Props passed to experiment scene components
 */
export interface SceneProps {
  /** Current language */
  language: 'en' | 'zh';
  /** Whether the device is mobile */
  isMobile: boolean;
  /** Callback when navigation is triggered */
  onNavigate: (target: NavigationTarget) => void;
  /** Callback when hovering over a navigation cluster */
  onHoverNav: (target: NavigationTarget | null) => void;
}

/**
 * Metadata for an experiment
 */
export interface ExperimentMeta {
  /** Display name */
  name: string;
  /** Brief description */
  description: string;
  /** Author/creator */
  author?: string;
  /** Date created */
  date?: string;
}

/**
 * Full experiment definition
 */
export interface Experiment {
  /** Experiment metadata */
  meta: ExperimentMeta;
  /** Navigation triggers this experiment supports */
  navigationTriggers: NavigationTrigger[];
  /** The scene component */
  Scene: React.ComponentType<SceneProps>;
}

/**
 * Props for the ExperimentCanvas wrapper
 */
export interface ExperimentCanvasProps {
  /** The experiment to render */
  experiment: Experiment;
  /** Current language */
  language: 'en' | 'zh';
  /** Children to render as overlay (navigation, UI) */
  children?: ReactNode;
}
