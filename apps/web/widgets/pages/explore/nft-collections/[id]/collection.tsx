"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { InfoIcon } from "@superdao/icons/outline";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetNftCollection } from "@/entities/nft-collection";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { CollectionIDHeader } from "./components/header";
import { CollectionDetailsSkeleton } from "./components/skeleton";
import { CollectionInsightsTab } from "./insights/insights";
import { CollectionWalletsTab } from "./wallets/wallets";

export interface ExploreNftCollectionDetailsPageProps extends ComponentPropsWithRef<"div"> {
  collectionID: string;
  tab: "insights" | "wallets";
}

/**
 * Renders the wallet directory for a selected NFT collection.
 */
export function ExploreNftCollectionDetailsPage({
  className,
  collectionID,
  ref,
  tab,
  ...props
}: ExploreNftCollectionDetailsPageProps) {
  const collectionQuery = useGetNftCollection(collectionID);
  if (collectionQuery.error) throw collectionQuery.error;

  if (collectionQuery.isPending) {
    return (
      <CollectionDetailsSkeleton
        {...props}
        ref={ref}
        className={className}
      />
    );
  }

  return (
    <Container
      {...props}
      ref={ref}
      data-page="explore-nft-collection-details"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <Tabs
        value={tab}
        className="gap-0"
      >
        <CollectionIDHeader collection={collectionQuery.data} />
        <Alert className="mb-5" variant="info"><InfoIcon aria-hidden="true" /><AlertTitle>Wallet data is updated daily</AlertTitle><AlertDescription>Metrics may take up to 24 hours to reflect the latest on-chain activity.</AlertDescription></Alert>
        <PageBody className="pb-16">
          <TabsContent value="wallets">
            {tab === "wallets" ? <CollectionWalletsTab collectionID={collectionID} /> : null}
          </TabsContent>
          <TabsContent value="insights">
            {tab === "insights" ? <CollectionInsightsTab collectionID={collectionID} /> : null}
          </TabsContent>
        </PageBody>
      </Tabs>
    </Container>
  );
}
