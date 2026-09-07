import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface AlertTitleProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the alert heading.
 */
export function AlertTitle({ ref, className, ...props }: AlertTitleProps) {
  return (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn(
        "font-medium text-current group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}
