'use client';

import { Suspense, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ExperimentCanvasProps, NavigationTarget } from './types';

/**
 * Loading fallback while Three.js initializes
 */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-ground-primary">
      <div className="text-figure-secondary text-body-sm animate-pulse">
        Loading...
      </div>
    </div>
  );
}

/**
 * Wrapper component that sets up the Three.js canvas for experiments
 *
 * Handles:
 * - Canvas initialization with proper settings
 * - Mobile detection
 * - Navigation routing
 * - Loading states
 * - Client-only rendering (Three.js requires browser APIs)
 */
export function ExperimentCanvas({
  experiment,
  language,
  children,
}: ExperimentCanvasProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<NavigationTarget | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [Canvas, setCanvas] = useState<React.ComponentType<Record<string, unknown>> | null>(null);

  // Only render Three.js components on the client
  useEffect(() => {
    setIsMounted(true);
    // Dynamically import Canvas
    import('@react-three/fiber').then((mod) => {
      setCanvas(() => mod.Canvas);
    });
  }, []);

  // Detect mobile on mount
  useEffect(() => {
    if (!isMounted) return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMounted]);

  // Handle navigation
  const handleNavigate = useCallback(
    (target: NavigationTarget) => {
      const basePath = language === 'zh' ? '/zh' : '';
      const paths: Record<NavigationTarget, string> = {
        essays: `${basePath}/essays`,
        about: `${basePath}/about`,
        periodics: `${basePath}/periodics`,
        series: `${basePath}/series`,
      };
      router.push(paths[target]);
    },
    [router, language]
  );

  // Handle hover state
  const handleHoverNav = useCallback((target: NavigationTarget | null) => {
    setHoveredNav(target);
  }, []);

  const { Scene } = experiment;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Three.js Canvas - only render on client */}
      {isMounted && Canvas ? (
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            <Scene
              language={language}
              isMobile={isMobile}
              onNavigate={handleNavigate}
              onHoverNav={handleHoverNav}
            />
          </Canvas>
        </Suspense>
      ) : (
        <LoadingFallback />
      )}

      {/* Hovered navigation label */}
      {hoveredNav && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-display font-serif text-white/90 drop-shadow-lg transition-opacity duration-300">
            {hoveredNav.charAt(0).toUpperCase() + hoveredNav.slice(1)}
          </span>
        </div>
      )}

      {/* Overlay content (navigation, scroll indicator, etc.) */}
      {children}
    </div>
  );
}
