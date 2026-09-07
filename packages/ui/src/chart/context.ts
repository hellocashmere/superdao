"use client";

import type { ComponentType, ReactNode } from "react";
import { createContext, useContext } from "react";

import type { THEMES } from "./config";

export type ChartConfig = Record<
  string,
  {
    label?: ReactNode;
    icon?: ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> })
>;

export type ChartContextProps = {
  config: ChartConfig;
};

export const ChartContext = createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}
