"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

export interface CollapsibleContentProps extends CollapsiblePrimitive.Panel.Props {}

/**
 * Renders the collapsible content component.
 *
 * @see https://base-ui.com/react/components/collapsible
 */
export function CollapsibleContent({ ...props }: CollapsibleContentProps) {
	return (
		<CollapsiblePrimitive.Panel
			data-slot="collapsible-content"
			{...props}
		/>
	);
}
