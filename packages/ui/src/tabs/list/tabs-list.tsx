"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@superdao/ui/lib/utils"

export const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "h-10 gap-1 rounded-lg bg-tabs-list p-1",
        subnavigation: "h-10 gap-2 bg-transparent",
        line: "gap-1 rounded-none bg-transparent p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TabsListProps
  extends TabsPrimitive.List.Props, VariantProps<typeof tabsListVariants> {}

/**
 * Renders the tabs list component.
 *
 * @see https://base-ui.com/react/components/tabs
 */
export function TabsList({
  className,
  variant = "default",
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}
