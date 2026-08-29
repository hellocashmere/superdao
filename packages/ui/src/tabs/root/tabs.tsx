"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@superdao/lib/utils";

export interface TabsProps extends TabsPrimitive.Root.Props {}

/**
 * Renders the tabs component.
 *
 * Composition:
 * ```text
 * Tabs
 * ├── TabsList
 * ├── TabsTrigger
 * └── TabsContent
 * ```
 *
 * @see https://base-ui.com/react/components/tabs
 */
export function Tabs({ className, orientation = "horizontal", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
      {...props}
    />
  );
}
