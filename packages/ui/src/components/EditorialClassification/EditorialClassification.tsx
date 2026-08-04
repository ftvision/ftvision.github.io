import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@ui/lib/utils";

const editorialLabelVariants = cva(
  [
    "font-code uppercase text-accent-primary",
    "text-[length:var(--font-size-editorial-apparatus)]",
    "leading-[var(--font-line-height-editorial-apparatus)]",
    "font-[var(--font-weight-editorial-apparatus)]",
    "tracking-[var(--font-letter-spacing-editorial-apparatus)]",
  ],
  {
    variants: {
      tone: {
        accent: "text-accent-primary",
        muted: "text-figure-muted",
      },
    },
    defaultVariants: {
      tone: "accent",
    },
  },
);

export interface EditorialLabelProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof editorialLabelVariants> {}

const EditorialLabel = React.forwardRef<HTMLSpanElement, EditorialLabelProps>(
  ({ className, tone, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(editorialLabelVariants({ tone }), className)}
      {...props}
    />
  ),
);

EditorialLabel.displayName = "EditorialLabel";

export interface EditorialClassificationProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  /** The publication form: Essay, Reference work, Essay archive, etc. */
  primary: React.ReactNode;
  /** Optional subject, edition, or publication context. */
  secondary?: React.ReactNode;
}

const EditorialClassification = React.forwardRef<
  HTMLElement,
  EditorialClassificationProps
>(({ className, primary, secondary, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      "mb-[var(--spacing-editorial-apparatus-to-display)] flex items-start justify-between gap-6",
      className,
    )}
    {...props}
  >
    <EditorialLabel>{primary}</EditorialLabel>
    {secondary ? <EditorialLabel>{secondary}</EditorialLabel> : null}
  </header>
));

EditorialClassification.displayName = "EditorialClassification";

export { EditorialClassification, EditorialLabel, editorialLabelVariants };
