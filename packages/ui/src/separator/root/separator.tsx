"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@superdao/lib/utils";

export interface SeparatorProps extends SeparatorPrimitive.Props {}

/**
 * Renders a horizontal or vertical separator.
 *
 * @see https://base-ui.com/react/components/separator
 */
export function Separator({ className, orientation = "horizontal", ref, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      {...props}
      ref={ref}
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
    />
  );
}
