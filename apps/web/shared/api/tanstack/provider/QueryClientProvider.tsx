"use client";

import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

import { QueryClientProvider as QueryClientProviderPrimitive } from "@tanstack/react-query";

import { createQueryClient } from "../client/client";

export interface QueryClientProviderProps {
  /**
   * Child elements wrapped by QueryClientProvider.
   */
  children: ReactNode;
}

/**
 * Provides the TanStack Query client to the application tree.
 */
export function QueryClientProvider({ children }: QueryClientProviderProps): ReactElement {
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProviderPrimitive client={queryClient}>{children}</QueryClientProviderPrimitive>;
}
