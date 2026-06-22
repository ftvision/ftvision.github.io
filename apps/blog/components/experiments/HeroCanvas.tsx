'use client';

import { Suspense, useState, useCallback, useEffect, lazy } from 'react';
import { useRouter } from 'next/navigation';
import type { NavigationTarget } from './types';
import type { Language } from '@/lib/i18n';

// Lazily import the ParticleGalaxy scene
const ParticleGalaxyScene = lazy(() =>
  import('./ParticleGalaxy').then((mod) => ({ default: mod.ParticleGalaxy.Scene }))
);

/**
 * Loading fallback while Three.js initializes
 */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="text-white/50 text-body-sm animate-pulse">
        Loading...
      </div>
    </div>
  );
}

interface HeroCanvasProps {
  language: Language;
  children?: React.ReactNode;
  className?: string;
  ariaHidden?: boolean;
}

/**
 * Client-only 3D Hero Canvas
 *
 * This component handles the Three.js Canvas setup entirely on the client side.
 * It uses dynamic imports to prevent Three.js from being bundled for SSR.
 */
export function HeroCanvas({
  language,
  children,
  className = '',
  ariaHidden = false,
}: HeroCanvasProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<NavigationTarget | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Canvas, setCanvas] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || reducedMotion) return;
    import('@react-three/fiber').then((mod) => {
      setCanvas(() => mod.Canvas);
    });
  }, [isMounted, reducedMotion]);

  useEffect(() => {
    if (!isMounted) return;
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, [isMounted]);

  // Detect mobile
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
        essays: `${basePath}/essays/`,
        about: `${basePath}/about/`,
        periodics: `${basePath}/periodics/`,
        series: `${basePath}/series/`,
      };
      router.push(paths[target]);
    },
    [router, language]
  );

  // Handle hover state
  const handleHoverNav = useCallback((target: NavigationTarget | null) => {
    setHoveredNav(target);
  }, []);

  return (
    <div
      className={`${className || 'relative'} h-screen w-full overflow-hidden bg-black`}
      aria-hidden={ariaHidden || undefined}
    >
      {isMounted && !reducedMotion && Canvas ? (
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={[1, 1.5]}
            frameloop={pageVisible ? 'always' : 'never'}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            <Suspense fallback={null}>
              <ParticleGalaxyScene
                language={language}
                isMobile={isMobile}
                onNavigate={handleNavigate}
                onHoverNav={handleHoverNav}
              />
            </Suspense>
          </Canvas>
        </Suspense>
      ) : null}

      {/* Hovered navigation label */}
      {hoveredNav && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-display font-serif text-white/90 drop-shadow-lg transition-opacity duration-300">
            {hoveredNav.charAt(0).toUpperCase() + hoveredNav.slice(1)}
          </span>
        </div>
      )}

      {/* Overlay content */}
      {children}
    </div>
  );
}
