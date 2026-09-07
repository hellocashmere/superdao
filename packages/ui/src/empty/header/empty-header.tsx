import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface EmptyHeaderProps extends ComponentProps<"div"> {}

/**
 * Renders the empty header component.
 */
export function EmptyHeader({ className, ...props }: EmptyHeaderProps) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  );
}
