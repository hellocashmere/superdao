"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarGroupContentProps extends ComponentProps<"div"> {}

/**
 * Renders the sidebar group content component.
 */
export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}
