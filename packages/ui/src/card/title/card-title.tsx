import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardTitleProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the card title component.
 */
export function CardTitle({ className, ref, ...props }: CardTitleProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="card-title"
      className={cn("text-sm/5 font-semibold text-muted-foreground", className)}
    />
  );
}
