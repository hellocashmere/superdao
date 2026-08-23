import { cn } from "@superdao/ui/lib/utils"

import { Loader2Icon } from "lucide-react"

export interface SpinnerProps extends React.ComponentProps<"svg"> {}

/**
 * Renders the spinner component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}
