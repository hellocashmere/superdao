"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

export interface CollapsibleTriggerProps extends CollapsiblePrimitive.Trigger.Props {}

/**
 * Renders the collapsible trigger component.
 *
 * @see https://base-ui.com/react/components/collapsible
 */
export function CollapsibleTrigger({ ...props }: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}
