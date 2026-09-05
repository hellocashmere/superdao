import type { ComponentPropsWithRef } from "react";

import { CollectionInsights } from "./components/content";

export interface CollectionInsightsTabProps extends ComponentPropsWithRef<typeof CollectionInsights> {}

/**
 * Composes the NFT collection Insights tab content.
 */
export function CollectionInsightsTab({ collectionID, ...props }: CollectionInsightsTabProps) {
  return (
    <CollectionInsights
      collectionID={collectionID}
      {...props}
    />
  );
}
