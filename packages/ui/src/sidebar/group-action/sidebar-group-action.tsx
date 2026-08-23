"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarGroupActionProps
  extends useRender.ComponentProps<"button">, React.ComponentProps<"button"> {}

/**
 * Renders the sidebar group action component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarGroupAction({
  className,
  render,
  ...props
}: SidebarGroupActionProps) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform !duration-0 group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  })
}
