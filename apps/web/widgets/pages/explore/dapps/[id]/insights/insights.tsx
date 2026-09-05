import type { ComponentPropsWithRef } from "react";

import { DappInsights } from "./components/content";

export interface DappInsightsTabProps extends ComponentPropsWithRef<typeof DappInsights> {}

/**
 * Composes the dapp Insights tab content.
 */
export function DappInsightsTab({ dappID, ...props }: DappInsightsTabProps) {
  return (
    <DappInsights
      dappID={dappID}
      {...props}
    />
  );
}
