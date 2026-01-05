'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface WideBlockProps {
  /** The content to display in the wide block */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** How wide the block should extend */
  width?: 'full' | 'wide' | 'screen';
}

/**
 * Wide block component for content that breaks out of the main column
 *
 * Use for large images, diagrams, code blocks, or other content
 * that benefits from more horizontal space.
 *
 * Width options:
 * - 'wide': Extends into right margin (~300px extra, default)
 * - 'full': Extends significantly beyond main column
 * - 'screen': Full viewport width (edge to edge)
 *
 * Note: The wide block uses relative positioning with negative margins
 * to break out of the content column. This works regardless of the
 * parent grid structure.
 *
 * Usage in MDX:
 * ```mdx
 * <WideBlock>
 *   <img src="/diagram.png" alt="Architecture diagram" />
 * </WideBlock>
 *
 * <WideBlock width="screen">
 *   <img src="/hero.jpg" alt="Hero image" />
 * </WideBlock>
 * ```
 */
export function WideBlock({
  children,
  className,
  width = 'wide',
}: WideBlockProps) {
  const screenRef = React.useRef<HTMLDivElement>(null);
  const [screenOffset, setScreenOffset] = React.useState(0);

  // Calculate offset for screen-width mode
  React.useLayoutEffect(() => {
    if (width === 'screen' && screenRef.current) {
      const updateOffset = () => {
        const rect = screenRef.current?.getBoundingClientRect();
        if (rect) {
          setScreenOffset(-rect.left);
        }
      };
      updateOffset();
      window.addEventListener('resize', updateOffset);
      return () => window.removeEventListener('resize', updateOffset);
    }
  }, [width]);

  const widthClasses = {
    // Wide: extends into the right margin area (uses the 300px margin space)
    wide: 'lg:w-[calc(100%+280px)]',
    // Full: extends into both margins for maximum content width
    full: 'lg:w-[calc(100%+400px)] lg:-ml-[50px]',
    // Screen: full viewport width - uses JS-calculated offset
    screen: 'w-screen',
  };

  return (
    <div
      ref={width === 'screen' ? screenRef : undefined}
      className={cn(
        'wide-block',
        'my-8',
        widthClasses[width],
        className
      )}
      style={width === 'screen' ? { marginLeft: screenOffset } : undefined}
    >
      {children}
    </div>
  );
}
