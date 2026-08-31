"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@superdao/lib/utils";

export interface TabsTriggerProps extends TabsPrimitive.Tab.Props {}

/**
 * Renders the tabs trigger component.
 *
 * @see https://base-ui.com/react/components/tabs
 */
export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap transition-[background-color,color,box-shadow] duration-150 outline-none group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=default]/tabs-list:h-8 group-data-[variant=default]/tabs-list:flex-1 group-data-[variant=default]/tabs-list:gap-2 group-data-[variant=default]/tabs-list:rounded-lg group-data-[variant=default]/tabs-list:px-3 group-data-[variant=default]/tabs-list:py-1 group-data-[variant=default]/tabs-list:text-[15px] group-data-[variant=default]/tabs-list:leading-6 group-data-[variant=default]/tabs-list:font-normal group-data-[variant=default]/tabs-list:text-tabs-foreground group-data-[variant=default]/tabs-list:hover:not-data-active:bg-popover group-data-[variant=default]/tabs-list:active:not-data-active:bg-tabs-active group-data-[variant=default]/tabs-list:data-active:bg-tabs-active group-data-[variant=default]/tabs-list:data-active:text-foreground group-data-[variant=default]/tabs-list:[&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=subnavigation]/tabs-list:h-10 group-data-[variant=subnavigation]/tabs-list:flex-none group-data-[variant=subnavigation]/tabs-list:gap-2 group-data-[variant=subnavigation]/tabs-list:rounded-lg group-data-[variant=subnavigation]/tabs-list:bg-card group-data-[variant=subnavigation]/tabs-list:px-4 group-data-[variant=subnavigation]/tabs-list:text-sm group-data-[variant=subnavigation]/tabs-list:leading-5 group-data-[variant=subnavigation]/tabs-list:font-semibold group-data-[variant=subnavigation]/tabs-list:text-tabs-foreground group-data-[variant=subnavigation]/tabs-list:hover:not-data-active:bg-popover group-data-[variant=subnavigation]/tabs-list:active:not-data-active:bg-background group-data-[variant=subnavigation]/tabs-list:data-active:bg-sidebar-active group-data-[variant=subnavigation]/tabs-list:data-active:text-primary group-data-[variant=subnavigation]/tabs-list:[&_svg:not([class*='size-'])]:size-5",
        "group-data-[variant=line]/tabs-list:h-[calc(100%-1px)] group-data-[variant=line]/tabs-list:flex-1 group-data-[variant=line]/tabs-list:gap-1.5 group-data-[variant=line]/tabs-list:rounded-md group-data-[variant=line]/tabs-list:px-1.5 group-data-[variant=line]/tabs-list:py-0.5 group-data-[variant=line]/tabs-list:text-sm group-data-[variant=line]/tabs-list:font-medium group-data-[variant=line]/tabs-list:text-foreground/60 group-data-[variant=line]/tabs-list:after:absolute group-data-[variant=line]/tabs-list:after:bg-foreground group-data-[variant=line]/tabs-list:after:opacity-0 group-data-[variant=line]/tabs-list:after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-1.25 group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:hover:text-foreground group-data-[variant=line]/tabs-list:data-active:text-foreground group-data-[variant=line]/tabs-list:data-active:after:opacity-100 group-data-[variant=line]/tabs-list:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}
