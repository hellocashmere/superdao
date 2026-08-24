"use client"

import type * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarGroupLabelProps
  extends useRender.ComponentProps<"div">, React.ComponentProps<"div"> {}

/**
 * Renders the sidebar group label component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarGroupLabel({
  className,
  render,
  ...props
}: SidebarGroupLabelProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-8 shrink-0 items-center px-5 text-xs font-medium text-sidebar-muted-foreground outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 focus-visible:ring-ring/40 [&>svg]:size-4 [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  })
}
