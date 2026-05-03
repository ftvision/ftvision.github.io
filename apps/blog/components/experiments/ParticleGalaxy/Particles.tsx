'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  /** Number of particles */
  count: number;
  /** Mouse position (normalized -1 to 1) */
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSize;
  uniform float uScale;

  attribute vec3 aColor;

  varying vec3 vColor;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    float angle = uTime * 0.05;
    float c = cos(angle);
    float s = sin(angle);
    vec3 rotated = vec3(pos.x * c - pos.z * s, pos.y, pos.x * s + pos.z * c);

    float phase = pos.x + pos.y + pos.z;
    rotated.y += sin(uTime * 0.2 + phase) * 0.1;

    vec2 mouseWorld = uMouse * 3.0;
    vec2 delta = rotated.xy - mouseWorld;
    float dist = length(delta);
    float radius = 1.5;
    if (dist < radius && dist > 0.01) {
      float force = (1.0 - dist / radius) * 0.3;
      rotated.xy += (delta / dist) * force;
    }

    vec4 mvPos = modelViewMatrix * vec4(rotated, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = uSize * (uScale / -mvPos.z);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 0.8);
  }
`;

/**
 * GPU-driven particle field. Original positions live in a static buffer
 * uploaded once; rotation, drift, and mouse repulsion run in the vertex
 * shader. Per-frame CPU work is two uniform writes.
 */
export function Particles({ count, mouse }: ParticlesProps) {
  const { size, viewport } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseColors = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xcce5ff),
      new THREE.Color(0xe5ccff),
      new THREE.Color(0xffeedd),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const color = baseColors[Math.floor(Math.random() * baseColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 0.05 },
      uScale: { value: (size.height * viewport.dpr) / 2 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uScale.value = (size.height * viewport.dpr) / 2;
  }, [size.height, viewport.dpr, uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
