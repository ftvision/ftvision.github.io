'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  /** Number of particles */
  count: number;
  /** Mouse position (normalized -1 to 1) */
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

/**
 * Particle system for the galaxy effect
 *
 * Creates a field of particles that:
 * - Slowly rotate and drift
 * - React to mouse movement (gentle repulsion)
 * - Have varying sizes and subtle color variation
 */
export function Particles({ count, mouse }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  // Generate particle data
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Base colors for variation (white, light blue, light purple)
    const baseColors = [
      new THREE.Color(0xffffff), // white
      new THREE.Color(0xcce5ff), // light blue
      new THREE.Color(0xe5ccff), // light purple
      new THREE.Color(0xffeedd), // warm white
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spherical distribution with some randomness
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random color from base colors
      const color = baseColors[Math.floor(Math.random() * baseColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, [count]);

  // Create geometry with attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  // Store original positions for mouse interaction
  useEffect(() => {
    originalPositions.current = positions.slice();
  }, [positions]);

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current || !originalPositions.current) return;

    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positionArray = positionAttr.array as Float32Array;
    const original = originalPositions.current;

    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Get original position
      const x = original[i3];
      const y = original[i3 + 1];
      const z = original[i3 + 2];

      // Slow rotation around Y axis
      const rotationSpeed = 0.05;
      const cos = Math.cos(time * rotationSpeed);
      const sin = Math.sin(time * rotationSpeed);
      const rotatedX = x * cos - z * sin;
      const rotatedZ = x * sin + z * cos;

      // Gentle drift/wave
      const drift = Math.sin(time * 0.2 + i * 0.01) * 0.1;

      // Mouse repulsion
      const mouseX = mouse.current.x * 3;
      const mouseY = mouse.current.y * 3;
      const dx = rotatedX - mouseX;
      const dy = y + drift - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulsionRadius = 1.5;
      const repulsionStrength = 0.3;

      let finalX = rotatedX;
      let finalY = y + drift;
      const finalZ = rotatedZ;

      if (dist < repulsionRadius && dist > 0.01) {
        const force = (1 - dist / repulsionRadius) * repulsionStrength;
        finalX += (dx / dist) * force;
        finalY += (dy / dist) * force;
      }

      positionArray[i3] = finalX;
      positionArray[i3 + 1] = finalY;
      positionArray[i3 + 2] = finalZ;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
