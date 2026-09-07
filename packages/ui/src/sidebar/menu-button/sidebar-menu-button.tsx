"use client";

import type { ComponentProps } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@superdao/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { useSidebar } from "../context";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-3 overflow-hidden rounded-none px-5 text-left text-[15px]/[24px] font-semibold outline-hidden group-has-data-[sidebar=menu-action]/menu-item:pr-12 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground data-active:bg-sidebar-active data-active:text-sidebar-active-foreground data-active:hover:bg-sidebar-accent data-active:hover:text-sidebar-accent-foreground [&_svg]:size-6 [&_svg]:shrink-0 [&_svg]:text-sidebar-muted-foreground data-active:[&_svg]:text-sidebar-active-foreground data-active:hover:[&_svg]:text-sidebar-accent-foreground [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      },
      size: {
        default: "h-10",
        sm: "h-9 font-normal",
        lg: "h-12 group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SidebarMenuButtonProps
  extends useRender.ComponentProps<"button">, ComponentProps<"button">, VariantProps<typeof sidebarMenuButtonVariants> {
  isActive?: boolean;
  tooltip?: string | ComponentProps<typeof TooltipContent>;
}

/**
 * Renders the sidebar menu button component.
 */
export function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  });

  if (!tooltip) {
    return comp;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      {comp}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}
