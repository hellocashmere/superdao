"use client";

import type { ComponentPropsWithRef } from "react";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export interface TooltipTriggerProps extends ComponentPropsWithRef<typeof TooltipPrimitive.Trigger> {}

/**
 * Renders the tooltip trigger component.
 *
 * @see https://base-ui.com/react/components/tooltip
 */
export function TooltipTrigger({ delay = 100, ref, ...props }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      delay={delay}
      {...props}
    />
  );
}
