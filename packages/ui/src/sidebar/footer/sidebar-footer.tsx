import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarFooterProps extends ComponentProps<"div"> {}

/**
 * Renders the sidebar footer component.
 */
export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex shrink-0 flex-col gap-0 p-0", className)}
      {...props}
    />
  );
}
