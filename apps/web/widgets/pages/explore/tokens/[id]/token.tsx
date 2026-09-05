"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { InfoIcon } from "@superdao/icons/outline";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetToken } from "@/entities/token";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { TokenIDHeader } from "./components/header";
import { TokenDetailsSkeleton } from "./components/skeleton";
import { TokenInsightsTab } from "./insights/insights";
import { TokenWalletsTab } from "./wallets/wallets";

export interface ExploreTokenDetailsPageProps extends ComponentPropsWithRef<"div"> {
  /**
   * Route identifier of the token to display.
   */
  tokenID: string;
  tab: "insights" | "wallets";
}

/**
 * Renders the wallet directory for a selected token.
 */
export function ExploreTokenDetailsPage({ className, ref, tab, tokenID, ...props }: ExploreTokenDetailsPageProps) {
  const tokenQuery = useGetToken(tokenID);
  if (tokenQuery.error) throw tokenQuery.error;

  if (tokenQuery.isPending) {
    return (
      <TokenDetailsSkeleton
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
      data-page="explore-token-details"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <Tabs
        value={tab}
        className="gap-0"
      >
        <TokenIDHeader token={tokenQuery.data} />
        <Alert className="mb-5" variant="info"><InfoIcon aria-hidden="true" /><AlertTitle>Wallet data is updated daily</AlertTitle><AlertDescription>Metrics may take up to 24 hours to reflect the latest on-chain activity.</AlertDescription></Alert>
        <PageBody className="pb-16">
          <TabsContent value="wallets">{tab === "wallets" ? <TokenWalletsTab tokenID={tokenID} /> : null}</TabsContent>
          <TabsContent value="insights">
            {tab === "insights" ? <TokenInsightsTab tokenID={tokenID} /> : null}
          </TabsContent>
        </PageBody>
      </Tabs>
    </Container>
  );
}
