"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarContentProps extends ComponentProps<"div"> {}

/**
 * Renders the sidebar content component.
 */
export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 scroll-fade flex-col gap-0 overflow-x-hidden overflow-y-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  );
}
