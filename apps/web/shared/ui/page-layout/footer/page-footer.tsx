import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface PageFooterProps extends ComponentPropsWithRef<"footer"> {}

/**
 * Renders optional page footer content.
 */
export function PageFooter({ className, ref, ...props }: PageFooterProps) {
  return (
    <footer
      ref={ref}
      data-slot="page-footer"
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
