'use client';

import { useRef, useEffect } from 'react';
import type { SceneProps, Experiment, NavigationTarget } from '../types';
import { Particles } from './Particles';
import { NavigationCluster } from './NavigationCluster';

/**
 * Navigation cluster configuration
 */
const NAV_CLUSTERS: Array<{
  target: NavigationTarget;
  position: [number, number, number];
  labels: { en: string; zh: string };
}> = [
  { target: 'essays', position: [-2.5, 0, 0], labels: { en: 'Essays', zh: '文章' } },
  { target: 'series', position: [2.5, 0, 0], labels: { en: 'Series', zh: '系列' } },
  { target: 'periodics', position: [0, 2, 0], labels: { en: 'Periodics', zh: '周刊' } },
  { target: 'about', position: [0, -2, 0], labels: { en: 'About', zh: '关于' } },
];

/**
 * ParticleGalaxy Scene Component
 *
 * A 3D particle field resembling a galaxy or star field.
 * Navigation clusters are positioned in 3D space and reveal labels on hover.
 */
function ParticleGalaxyScene({
  language,
  isMobile,
  onNavigate,
  onHoverNav,
}: SceneProps) {
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Particle count based on device
  const particleCount = isMobile ? 2000 : 6000;

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />

      {/* Background particles */}
      <Particles count={particleCount} mouse={mouseRef} />

      {/* Navigation clusters */}
      {NAV_CLUSTERS.map((cluster) => (
        <NavigationCluster
          key={cluster.target}
          position={cluster.position}
          label={cluster.labels[language]}
          onClick={() => onNavigate(cluster.target)}
          onHover={(isHovered) =>
            onHoverNav(isHovered ? cluster.target : null)
          }
          particleCount={isMobile ? 100 : 200}
        />
      ))}
    </>
  );
}

/**
 * ParticleGalaxy Experiment Definition
 */
export const ParticleGalaxy: Experiment = {
  meta: {
    name: 'Particle Galaxy',
    description:
      'A 3D particle field with interactive navigation clusters. Particles react to mouse movement.',
    author: 'Blog Author',
  },
  navigationTriggers: NAV_CLUSTERS.map((cluster) => ({
    type: 'hover' as const,
    target: cluster.target,
    position: { x: cluster.position[0], y: cluster.position[1], z: cluster.position[2] },
  })),
  Scene: ParticleGalaxyScene,
};

export default ParticleGalaxy;
