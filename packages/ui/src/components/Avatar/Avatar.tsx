import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const avatarVariants = cva(
  [
    'relative inline-flex items-center justify-center shrink-0',
    // Use explicit 9999px for circular shape - avatars should always be round regardless of theme
    // Use bg-ground-tertiary for visible fallback background across all themes
    'overflow-hidden [border-radius:9999px] bg-ground-tertiary border border-border',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-caption',
        sm: 'h-8 w-8 text-body-sm',
        md: 'h-10 w-10 text-body',
        lg: 'h-12 w-12 text-h4',
        xl: 'h-16 w-16 text-h3',
        '2xl': 'h-20 w-20 text-h2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Source URL for the avatar image */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text to display when no image (usually initials) */
  fallback?: string;
  /** Whether the avatar is in a loading state */
  loading?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, loading, children, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoading, setImageLoading] = React.useState(!!src);

    React.useEffect(() => {
      if (src) {
        setImageError(false);
        setImageLoading(true);
      }
    }, [src]);

    const showImage = src && !imageError;
    const showFallback = !showImage || imageLoading || loading;

    // Generate initials from fallback text
    const initials = React.useMemo(() => {
      if (!fallback) return '';
      const words = fallback.trim().split(/\s+/);
      if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
      }
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }, [fallback]);

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || fallback || 'Avatar'}
            className={cn(
              'h-full w-full object-cover',
              imageLoading && 'opacity-0'
            )}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
        )}
        {showFallback && (
          <span
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              'font-medium text-figure-secondary',
              (loading || imageLoading) && 'animate-pulse'
            )}
            aria-hidden={showImage ? 'true' : undefined}
          >
            {children || initials || (
              <svg
                className="h-1/2 w-1/2 text-figure-muted"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

// AvatarGroup for displaying multiple avatars
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to display */
  max?: number;
  /** Size of the avatars */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 4, size = 'md', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const remainingCount = max ? childArray.length - max : 0;

    // Map size to negative margin values for proper overlap
    const overlapClass = {
      xs: '-space-x-1',
      sm: '-space-x-2',
      md: '-space-x-2',
      lg: '-space-x-3',
      xl: '-space-x-4',
      '2xl': '-space-x-4',
    }[size || 'md'];

    // Map size to border width for the white separator between avatars
    const borderWidth = {
      xs: 'border-2',
      sm: 'border-2',
      md: 'border-2',
      lg: 'border-2',
      xl: 'border-4',
      '2xl': 'border-4',
    }[size || 'md'];

    return (
      <div
        ref={ref}
        className={cn('flex items-center', overlapClass, className)}
        {...props}
      >
        {visibleChildren.map((child, index) =>
          React.isValidElement(child) ? (
            React.cloneElement(child as React.ReactElement<AvatarProps>, {
              key: index,
              size,
              // Use border-ground-primary for the separator to match page background
              className: cn(borderWidth, 'border-ground-primary')
            })
          ) : child
        )}
        {remainingCount > 0 && (
          <Avatar
            size={size}
            fallback={`+${remainingCount}`}
            className={cn(borderWidth, 'border-ground-primary')}
          />
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup, avatarVariants };
