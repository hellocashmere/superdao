"use client";

import type { ComponentPropsWithRef } from "react";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

export interface HoverCardTriggerProps extends ComponentPropsWithRef<typeof PreviewCardPrimitive.Trigger> {}

/**
 * Renders the element that opens the hover card.
 *
 * @see https://base-ui.com/react/components/preview-card
 */
export function HoverCardTrigger({ ref, ...props }: HoverCardTriggerProps) {
	return (
		<PreviewCardPrimitive.Trigger
			ref={ref}
			data-slot="hover-card-trigger"
			{...props}
		/>
	);
}
