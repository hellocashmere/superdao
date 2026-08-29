"use client";

import type { ComponentPropsWithRef } from "react";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cn } from "@superdao/lib/utils";
import { toggleVariants } from "@superdao/ui/components/toggle";
import type { VariantProps } from "class-variance-authority";

import { useToggleGroup } from "../context";

export interface ToggleGroupItemProps
  extends ComponentPropsWithRef<typeof TogglePrimitive>, VariantProps<typeof toggleVariants> {}

/**
 * Renders one toggle controlled by its surrounding toggle group.
 *
 * @see https://base-ui.com/react/components/toggle-group
 */
export function ToggleGroupItem({
  className,
  ref,
  children,
  variant = "default",
  size = "default",
  ...props
}: ToggleGroupItemProps) {
  const context = useToggleGroup();

  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}
