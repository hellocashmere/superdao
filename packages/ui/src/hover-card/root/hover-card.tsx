"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

export interface HoverCardProps extends PreviewCardPrimitive.Root.Props {}

/**
 * Provides the root state and context for a hover card.
 *
 * @see https://base-ui.com/react/components/preview-card
 */
export function HoverCard({ ...props }: HoverCardProps) {
  return (
    <PreviewCardPrimitive.Root
      data-slot="hover-card"
      {...props}
    />
  );
}
