"use client"

import { createContext, useContext } from "react"
import type { VariantProps } from "class-variance-authority"

import type { toggleVariants } from "@superdao/ui/components/toggle"

export interface ToggleGroupContextValue extends VariantProps<
  typeof toggleVariants
> {
  spacing?: number
  orientation?: "horizontal" | "vertical"
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

/** Reads visual options inherited from the nearest toggle group. */
export function useToggleGroup(): ToggleGroupContextValue {
  return useContext(ToggleGroupContext)
}
