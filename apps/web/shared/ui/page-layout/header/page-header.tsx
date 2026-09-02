import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface PageHeaderProps extends ComponentPropsWithRef<"header"> {}

/**
 * Renders page-specific heading and action content.
 */
export function PageHeader({ className, ref, ...props }: PageHeaderProps) {
  return (
    <header
      ref={ref}
      data-slot="page-header"
      className={cn("flex h-18 shrink-0 items-center", className)}
      {...props}
    />
  );
}
