"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@superdao/lib/utils";

export interface TabsContentProps extends TabsPrimitive.Panel.Props {}

/**
 * Renders the tabs content component.
 *
 * @see https://base-ui.com/react/components/tabs
 */
export function TabsContent({ className, ...props }: TabsContentProps) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn("flex-1 text-sm outline-none", className)}
			{...props}
		/>
	);
}
