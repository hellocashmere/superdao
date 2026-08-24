"use client"

import type * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarMenuSubButtonProps
  extends useRender.ComponentProps<"a">, React.ComponentProps<"a"> {
  size?: "sm" | "md"
  isActive?: boolean
}

/**
 * Renders the sidebar menu sub button component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "flex h-9 min-w-0 items-center gap-2 overflow-hidden rounded-none pr-5 pl-14 text-[15px]/[24px] font-normal tracking-[-0.24px] text-sidebar-muted-foreground outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-sidebar-active data-active:text-sidebar-active-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-muted-foreground hover:[&>svg]:text-sidebar-accent-foreground active:[&>svg]:text-sidebar-accent-foreground data-active:[&>svg]:text-sidebar-active-foreground",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  })
}
