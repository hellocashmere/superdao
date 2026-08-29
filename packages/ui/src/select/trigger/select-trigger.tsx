"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@superdao/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export interface SelectTriggerProps extends SelectPrimitive.Trigger.Props {
  /**
   * Controls the trigger's visual size.
   */
  size?: "sm" | "default";
}

/**
 * Renders the select trigger component.
 *
 * @see https://base-ui.com/react/components/select
 */
export function SelectTrigger({ className, size = "default", children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg bg-secondary py-2 pr-2 pl-2.5 text-sm whitespace-nowrap text-secondary-foreground transition-colors outline-none select-none hover:bg-secondary-hover focus-visible:ring-3 focus-visible:ring-ring/50 active:bg-secondary-active disabled:cursor-not-allowed disabled:opacity-50 aria-expanded:bg-secondary-active aria-expanded:text-secondary-foreground aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-10 data-[size=sm]:h-8 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={<ChevronDownIcon className="pointer-events-none size-4" />}>
        {null}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
