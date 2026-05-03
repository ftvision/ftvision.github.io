import { HeroCanvas } from '@/components/experiments/HeroCanvas';
import { NavigationOverlay } from '@/components/experiments/NavigationOverlay';
import { IntroSection } from '@/components/landing';
import type { Language } from '@/types/content';

export interface LandingPageProps {
  /** Current language */
  language: Language;
}

/**
 * Full landing page with 3D hero and intro overlay
 */
export function LandingPage({ language }: LandingPageProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ground-inverse">
      {/* Three.js enhancement. The writing/navigation below remains useful before JS hydrates. */}
      <HeroCanvas language={language} className="absolute inset-0" ariaHidden />

      <IntroSection language={language} variant="overlay" headingLevel="h1" />
      <NavigationOverlay language={language} visible={false} />
    </section>
  );
}
