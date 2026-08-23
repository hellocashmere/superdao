import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@superdao/ui/lib/utils"

export const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center gap-1 font-sans [font-feature-settings:'liga'_off,'clig'_off] text-[11px] leading-3 font-semibold tracking-[0.25px] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "text-foreground",
        secondary: "text-secondary-foreground",
        destructive:
          "text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "text-foreground",
        ghost: "text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends
    useRender.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

/**
 * Renders a text label with optional status indicator content.
 *
 * Composition:
 * ```text
 * Badge
 * └── BadgeIndicator
 * ```
 *
 * @see https://react.dev/reference/react/Component
 */
export function Badge({
  className,
  variant = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}
