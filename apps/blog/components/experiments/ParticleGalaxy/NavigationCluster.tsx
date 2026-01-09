'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface NavigationClusterProps {
  /** Position in 3D space */
  position: [number, number, number];
  /** Display label */
  label: string;
  /** Number of particles in the cluster */
  particleCount?: number;
  /** Callback when clicked */
  onClick: () => void;
  /** Callback when hover state changes */
  onHover: (isHovered: boolean) => void;
}

/**
 * Interactive navigation cluster within the particle field
 *
 * A denser cluster of particles that:
 * - Glows brighter on hover
 * - Shows a label on hover
 * - Navigates on click
 */
export function NavigationCluster({
  position,
  label,
  particleCount = 200,
  onClick,
  onHover,
}: NavigationClusterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Create geometry with particle positions
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Gaussian-like distribution for denser center
      const r = Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [particleCount]);

  // Animate glow and pulsing
  useFrame((state) => {
    if (!groupRef.current) return;

    // Gentle pulsing
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    groupRef.current.scale.setScalar(pulse);
  });

  const handlePointerEnter = () => {
    setIsHovered(true);
    onHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    onHover(false);
    document.body.style.cursor = 'auto';
  };

  const color = isHovered ? '#ffffff' : '#88aaff';
  const opacity = isHovered ? 1 : 0.6;

  return (
    <group ref={groupRef} position={position}>
      {/* Invisible hit area for pointer events */}
      <mesh
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={onClick}
      >
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Particle cluster */}
      <points geometry={geometry}>
        <pointsMaterial
          size={0.04}
          color={color}
          transparent
          opacity={opacity}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.15 : 0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Label (HTML overlay) */}
      {isHovered && (
        <Html center distanceFactor={8}>
          <div className="pointer-events-none whitespace-nowrap rounded-full bg-black/50 px-4 py-2 text-body font-medium text-white backdrop-blur-sm">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}
