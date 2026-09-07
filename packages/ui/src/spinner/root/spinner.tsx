import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { Loader2Icon } from "lucide-react";

export interface SpinnerProps extends ComponentProps<"svg"> {}

/**
 * Renders the spinner component.
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
  );
}
