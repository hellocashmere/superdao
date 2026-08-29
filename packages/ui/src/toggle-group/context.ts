"use client";

import { createContext, useContext } from "react";

import type { toggleVariants } from "@superdao/ui/components/toggle";
import type { VariantProps } from "class-variance-authority";

export interface ToggleGroupContextValue extends VariantProps<typeof toggleVariants> {
  /**
   * Sets the gap between adjacent toggle items.
   */
  spacing?: number;

  /**
   * Sets whether toggle items are arranged horizontally or vertically.
   */
  orientation?: "horizontal" | "vertical";
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
});

/**
 * Reads visual options inherited from the nearest toggle group.
 */
export function useToggleGroup(): ToggleGroupContextValue {
  return useContext(ToggleGroupContext);
}
