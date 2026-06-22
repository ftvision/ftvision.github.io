'use client';

import Link from 'next/link';
import type { Language } from '@/lib/i18n';

interface IntroSectionProps {
  /** Current language */
  language: Language;
  /** Whether to render as overlay on 3D canvas (dark background) */
  variant?: 'default' | 'overlay';
  /** Heading element for the displayed name */
  headingLevel?: 'h1' | 'h2';
}

const content = {
  en: {
    greeting: "Hello, I'm",
    name: 'Feitong Yang',
    bio: 'I write about technology, product design, and the intersection of human experience with digital tools. This is a space for long-form thinking, curated discoveries, and evergreen resources.',
    aboutLink: 'Learn more about me',
    navigation: [
      { label: 'Essays', href: '/essays/', description: 'Long-form pieces' },
      { label: 'Series', href: '/series/', description: 'Curated collections' },
      { label: 'Periodics', href: '/periodics/', description: 'Regular updates' },
    ],
  },
  zh: {
    greeting: '你好，我是',
    name: '杨斐曈',
    bio: '我写关于技术、产品设计以及人类体验与数字工具交汇的文章。这里是深度思考、精选发现和常青资源的空间。',
    aboutLink: '了解更多关于我',
    navigation: [
      { label: '文章', href: '/zh/essays/', description: '深度长文' },
      { label: '系列', href: '/zh/series/', description: '主题合集' },
      { label: '期刊', href: '/zh/periodics/', description: '定期更新' },
    ],
  },
};

/**
 * Introduction section with personal bio and blog themes
 * Supports two variants:
 * - default: Standard section with theme-aware colors
 * - overlay: Positioned over 3D canvas with light text on dark background
 */
export function IntroSection({
  language,
  variant = 'default',
  headingLevel = 'h2',
}: IntroSectionProps) {
  const t = content[language];
  const basePath = language === 'zh' ? '/zh' : '';

  const isOverlay = variant === 'overlay';

  // Overlay styles for dark background
  const overlayStyles = {
    container:
      'pointer-events-auto relative z-10 flex min-h-screen items-start justify-center overflow-y-auto px-inset-lg py-8 sm:items-center',
    // Frosted backdrop separates the card from the animating particle field.
    backdrop:
      'rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 p-8 md:p-12',
    wrapper: 'grid gap-8 md:grid-cols-2 md:items-center md:gap-12 max-w-4xl',
    greeting: 'text-body-sm text-white/70 mb-2',
    name: 'type-h1 text-white mb-4',
    bio: 'type-body text-white/80 mb-6',
    link: 'text-body text-white/90 hover:text-white inline-flex items-center gap-1 transition-colors',
    navBox: 'space-y-4',
    navTitle: 'type-h4 text-white mb-4',
    navItem:
      'group flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 p-4 transition-colors hover:bg-white/10',
    navLabel: 'type-body text-white font-medium group-hover:text-white',
    navDescription: 'text-body-sm text-white/60',
    navArrow:
      'ml-auto text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white/80',
  };

  // Default styles using design tokens
  const defaultStyles = {
    container: 'mx-auto max-w-4xl px-inset-lg py-section-lg',
    wrapper: 'grid gap-8 md:grid-cols-2 md:items-center md:gap-12',
    greeting: 'text-body-sm text-figure-secondary mb-2',
    name: 'type-h1 text-figure-primary mb-4',
    bio: 'type-body text-figure-secondary mb-6',
    link: 'text-body text-link hover:text-link-hover inline-flex items-center gap-1',
    navBox: 'space-y-4',
    navTitle: 'type-h4 text-figure-primary mb-4',
    navItem:
      'group flex items-center gap-3 rounded-lg bg-ground-secondary border border-border p-4 transition-colors hover:bg-ground-tertiary',
    navLabel: 'type-body text-figure-primary font-medium',
    navDescription: 'text-body-sm text-figure-secondary',
    navArrow:
      'ml-auto text-figure-muted transition-transform group-hover:translate-x-1 group-hover:text-figure-primary',
  };

  const styles = isOverlay ? overlayStyles : defaultStyles;
  const NameHeading = headingLevel;

  const sectionContent = (
    <div className={styles.wrapper}>
      {/* Bio */}
      <div>
        <p className={styles.greeting}>{t.greeting}</p>
        <NameHeading className={styles.name}>{t.name}</NameHeading>
        <p className={styles.bio}>{t.bio}</p>
        <Link href={`${basePath}/about/`} className={styles.link}>
          {t.aboutLink}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className={styles.navBox}>
        <h3 className={styles.navTitle}>
          {language === 'en' ? 'Explore' : '探索'}
        </h3>
        <nav aria-label="Content sections">
          {t.navigation.map((nav) => (
            <Link key={nav.href} href={nav.href} className={styles.navItem}>
              <div>
                <div className={styles.navLabel}>{nav.label}</div>
                <div className={styles.navDescription}>{nav.description}</div>
              </div>
              <span className={styles.navArrow} aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  if (isOverlay) {
    return (
      <div className={styles.container}>
        <div className={overlayStyles.backdrop}>{sectionContent}</div>
      </div>
    );
  }

  return <section className={styles.container}>{sectionContent}</section>;
}
