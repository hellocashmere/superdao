import { cn } from "@superdao/ui/lib/utils"

export interface EmptyHeaderProps extends React.ComponentProps<"div"> {}

/**
 * Renders the empty header component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function EmptyHeader({ className, ...props }: EmptyHeaderProps) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  )
}
