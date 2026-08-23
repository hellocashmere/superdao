"use client"

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import type { VariantProps } from "class-variance-authority"
import type { ComponentPropsWithRef, CSSProperties } from "react"

import { toggleVariants } from "@superdao/ui/components/toggle"
import { cn } from "@superdao/ui/lib/utils"

import { ToggleGroupContext } from "../context"

export interface ToggleGroupProps
  extends
    ComponentPropsWithRef<typeof ToggleGroupPrimitive>,
    VariantProps<typeof toggleVariants> {
  /** Gap between toggle items in Tailwind spacing units. */
  spacing?: number
  /** Axis used to arrange toggle items. */
  orientation?: "horizontal" | "vertical"
}

/**
 * Coordinates a set of related toggle controls.
 *
 * Composition:
 * ```text
 * ToggleGroup
 * └── ToggleGroupItem
 * ```
 *
 * @see https://base-ui.com/react/components/toggle-group
 */
export function ToggleGroup({
  className,
  ref,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      ref={ref}
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-vertical:flex-col data-vertical:items-stretch data-[size=sm]:rounded-[min(var(--radius-md),10px)]",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}
