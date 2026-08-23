import { cn } from "@superdao/ui/lib/utils"

export interface EmptyDescriptionProps extends React.ComponentProps<"p"> {}

/**
 * Renders the empty description component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function EmptyDescription({
  className,
  ...props
}: EmptyDescriptionProps) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}
