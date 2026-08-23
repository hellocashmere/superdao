import { cn } from "@superdao/ui/lib/utils"

import { Separator } from "@superdao/ui/components/separator"

export interface ButtonGroupSeparatorProps extends React.ComponentProps<
  typeof Separator
> {}

/**
 * Renders the button group separator component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}
