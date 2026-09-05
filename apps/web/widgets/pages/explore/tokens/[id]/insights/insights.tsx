import type { ComponentPropsWithRef } from "react";

import { TokenInsights } from "./components/content";

export interface TokenInsightsTabProps extends ComponentPropsWithRef<typeof TokenInsights> {}

/**
 * Composes the token Insights tab content.
 */
export function TokenInsightsTab({ tokenID, ...props }: TokenInsightsTabProps) {
  return (
    <TokenInsights
      tokenID={tokenID}
      {...props}
    />
  );
}
