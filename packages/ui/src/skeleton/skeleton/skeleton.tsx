import { cn } from "@superdao/ui/lib/utils"

export interface SkeletonProps extends React.ComponentProps<"div"> {}

/**
 * Renders the skeleton component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-md bg-skeleton", className)}
      {...props}
    />
  )
}
