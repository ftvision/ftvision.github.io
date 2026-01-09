# Experiments - Interactive Visual Art System

This folder contains the system for creating interactive 3D visual experiments that serve as the landing page hero. Each experiment is a self-contained Three.js scene that can be swapped out to refresh the site's visual identity.

## Architecture Overview

```
experiments/
├── README.md              # This file
├── types.ts               # Shared TypeScript interfaces
├── index.ts               # Exports active experiment
├── HeroCanvas.tsx         # Canvas wrapper for landing page
├── ExperimentCanvas.tsx   # Generic canvas wrapper (reusable)
├── NavigationOverlay.tsx  # Accessible screen-reader navigation
└── ParticleGalaxy/        # Example experiment
    ├── index.tsx          # Experiment definition & scene
    ├── Particles.tsx      # Particle system component
    └── NavigationCluster.tsx  # Interactive nav points
```

## Creating a New Experiment

### Step 1: Create the Experiment Folder

```bash
mkdir apps/blog/components/experiments/YourExperiment
```

### Step 2: Implement the Scene Component

Create `index.tsx` with your scene:

```tsx
'use client';

import { useRef, useEffect } from 'react';
import type { SceneProps, Experiment, NavigationTarget } from '../types';

/**
 * Your Scene Component
 *
 * This runs inside a React Three Fiber <Canvas>.
 * Use R3F components like <mesh>, <group>, etc.
 */
function YourExperimentScene({
  language,
  isMobile,
  onNavigate,
  onHoverNav,
}: SceneProps) {
  // Adjust complexity for mobile
  const quality = isMobile ? 'low' : 'high';

  return (
    <>
      {/* Add lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Your 3D content here */}
      <mesh onClick={() => onNavigate('essays')}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
}

/**
 * Experiment Definition
 */
export const YourExperiment: Experiment = {
  meta: {
    name: 'Your Experiment Name',
    description: 'Brief description of the visual effect',
    author: 'Your Name',
    date: '2025-01-01',
  },
  navigationTriggers: [
    { type: 'click', target: 'essays', position: { x: 0, y: 0, z: 0 } },
  ],
  Scene: YourExperimentScene,
};

export default YourExperiment;
```

### Step 3: Update HeroCanvas (Optional)

If you want to use a different experiment, update `HeroCanvas.tsx`:

```tsx
// Change this import
const YourExperimentScene = lazy(() =>
  import('./YourExperiment').then((mod) => ({ default: mod.YourExperiment.Scene }))
);
```

## Key Interfaces

### SceneProps

Props your scene receives from the canvas wrapper:

```ts
interface SceneProps {
  language: 'en' | 'zh';          // Current language
  isMobile: boolean;              // Device detection
  onNavigate: (target) => void;   // Trigger navigation
  onHoverNav: (target) => void;   // Show hover label
}
```

### NavigationTarget

Valid navigation targets:

```ts
type NavigationTarget = 'essays' | 'about' | 'periodics' | 'series';
```

### Experiment

Full experiment definition:

```ts
interface Experiment {
  meta: {
    name: string;
    description: string;
    author?: string;
    date?: string;
  };
  navigationTriggers: NavigationTrigger[];
  Scene: React.ComponentType<SceneProps>;
}
```

## Best Practices

### Performance

1. **Mobile optimization**: Always check `isMobile` and reduce complexity
   ```tsx
   const particleCount = isMobile ? 1000 : 5000;
   ```

2. **Use instancing**: For many similar objects, use `<instancedMesh>`

3. **Limit draw calls**: Batch geometries when possible

4. **GPU-based animation**: Use shaders for particle/vertex animation

### Accessibility

1. Always provide the `NavigationOverlay` as a fallback for screen readers
2. Navigation should be discoverable - add subtle visual hints
3. Ensure sufficient contrast for any text overlays

### Code Organization

1. Keep scene components client-only (`'use client'`)
2. Extract reusable pieces (particles, materials) into separate files
3. Document your experiment's concept and interaction model

## Example: ParticleGalaxy

The included `ParticleGalaxy` experiment demonstrates:

- **Particle systems**: 6000 particles on desktop, 2000 on mobile
- **Mouse interaction**: Particles react to cursor position
- **Navigation clusters**: Dense particle groups that glow on hover
- **Bilingual support**: Labels switch based on language prop

### File Structure

```
ParticleGalaxy/
├── index.tsx           # Scene + experiment definition
├── Particles.tsx       # Background particle field
└── NavigationCluster.tsx   # Interactive navigation points
```

## Useful Libraries

These are already installed in the project:

- `three` - Core Three.js library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers and abstractions

### Common drei imports

```tsx
import {
  OrbitControls,    // Camera controls
  Html,             // HTML overlays in 3D
  Text,             // 3D text
  useTexture,       // Load textures
  shaderMaterial,   // Create custom materials
} from '@react-three/drei';
```

## Switching Experiments

To change the active experiment on the landing page:

1. Create your new experiment following the structure above
2. Update the lazy import in `HeroCanvas.tsx`
3. The landing page will automatically use the new experiment

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [drei Helpers](https://github.com/pmndrs/drei)
- [Three.js Examples](https://threejs.org/examples/)
