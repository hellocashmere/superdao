"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

export interface CollapsibleProps extends CollapsiblePrimitive.Root.Props {}

/**
 * Renders the collapsible component.
 *
 * Composition:
 * ```text
 * Collapsible
 * ├── CollapsibleTrigger
 * └── CollapsibleContent
 * ```
 *
 * @see https://base-ui.com/react/components/collapsible
 */
export function Collapsible({ ...props }: CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      {...props}
    />
  );
}
