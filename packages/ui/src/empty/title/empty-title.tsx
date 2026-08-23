import { cn } from "@superdao/ui/lib/utils"

export interface EmptyTitleProps extends React.ComponentProps<"div"> {}

/**
 * Renders the empty title component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function EmptyTitle({ className, ...props }: EmptyTitleProps) {
  return (
    <div
      data-slot="empty-title"
      className={cn("font-heading text-2xl font-semibold", className)}
      {...props}
    />
  )
}
