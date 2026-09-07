import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardContentProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the card content component.
 */
export function CardContent({ className, ref, ...props }: CardContentProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="card-content"
      className={cn("px-(--card-padding-inline)", className)}
    />
  );
}
