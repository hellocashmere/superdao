"use client";

import type { ComponentPropsWithRef } from "react";

import { WarningIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetNftCollection } from "@/entities/nft-collection";
import { throwResourceError } from "@/shared/api";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { CollectionIDHeader } from "./components/header";
import { CollectionDetailsSkeleton } from "./components/skeleton";
import { CollectionInsightsTab } from "./insights/insights";
import { CollectionWalletsTab } from "./wallets/wallets";

export interface ExploreNftCollectionDetailsPageProps extends ComponentPropsWithRef<"div"> {
  collectionID: number;
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
  if (collectionQuery.error) throwResourceError(collectionQuery.error);

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
        <Alert
          className="mb-5"
          variant="warning"
        >
          <WarningIcon aria-hidden="true" />
          <AlertTitle>Recent NFT transfers may not appear yet</AlertTitle>
          <AlertDescription>
            Ownership snapshots are rebuilt daily, so fresh transfers can remain pending for up to 24 hours.
          </AlertDescription>
        </Alert>
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
