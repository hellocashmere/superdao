"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { Input } from "@superdao/ui/components/input";

export interface SidebarInputProps extends ComponentProps<typeof Input> {}

/**
 * Renders the sidebar input component.
 */
export function SidebarInput({ className, ...props }: SidebarInputProps) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(
        "h-9 w-full bg-field shadow-none hover:bg-sidebar-accent focus-visible:bg-sidebar-accent",
        className
      )}
      {...props}
    />
  );
}
