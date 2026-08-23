import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@superdao/ui/lib/utils"

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface EmptyMediaProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof emptyMediaVariants> {}

/**
 * Renders the empty media component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function EmptyMedia({
  className,
  variant = "default",
  ...props
}: EmptyMediaProps) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}
