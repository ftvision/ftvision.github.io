'use client';

import dynamic from 'next/dynamic';
import { NavigationOverlay } from '@/components/experiments/NavigationOverlay';
import { IntroSection } from '@/components/landing';
import type { Language } from '@/types/content';

// Dynamically import HeroCanvas with SSR disabled
const HeroCanvas = dynamic(
  () => import('@/components/experiments/HeroCanvas').then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="text-white/50 text-body-sm animate-pulse">Loading...</div>
      </div>
    ),
  }
);

export interface LandingPageProps {
  /** Current language */
  language: Language;
}

/**
 * Full landing page with 3D hero and intro overlay
 */
export function LandingPage({ language }: LandingPageProps) {
  return (
    <section className="relative h-screen">
      <HeroCanvas language={language}>
        {/* Introduction overlay on top of 3D canvas */}
        <IntroSection language={language} variant="overlay" />

        {/* Accessible navigation overlay (screen reader only) */}
        <NavigationOverlay language={language} visible={false} />
      </HeroCanvas>
    </section>
  );
}
