"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { InfoIcon } from "@superdao/icons/outline";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { getAudienceName } from "@/entities/audience";
import { useGetLabelDetails } from "@/entities/label";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";
import { LabelWalletsTab } from "@/widgets/pages/explore/labels/[id]";

export interface AudienceDetailsPageProps extends ComponentPropsWithRef<"div"> {
  /**
   * Route identifier of the audience to display.
   */
  audienceID: string;
}

/**
 * Renders the wallet directory for an audience.
 */
export function AudienceDetailsPage({ audienceID, className, ref, ...props }: AudienceDetailsPageProps) {
  const detailsQuery = useGetLabelDetails("music");
  const audienceName = getAudienceName(audienceID);

  if (detailsQuery.error) throw detailsQuery.error;

  if (detailsQuery.isPending) {
    return (
      <Container
        {...props}
        ref={ref}
        aria-busy="true"
        data-page="audience-details"
        data-state="loading"
        className={cn("flex min-h-0 flex-1 flex-col", className)}
      >
        <PageHeader className="min-h-18">
          <Skeleton className="h-7 w-40" />
        </PageHeader>
      </Container>
    );
  }

  return (
    <Container
      {...props}
      ref={ref}
      data-page="audience-details"
      data-state="ready"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <PageHeader className="flex min-h-18 items-center">
        <h1 className="text-2xl/7 font-bold">{audienceName}</h1>
        <span className="ml-3 pb-0.5 text-xl/6 font-bold text-tabs-foreground">{detailsQuery.data.walletCount}</span>
      </PageHeader>
      <Alert className="mb-5" variant="warning"><InfoIcon aria-hidden="true" /><AlertTitle>Wallet data is updated daily</AlertTitle><AlertDescription>Metrics may take up to 24 hours to reflect the latest on-chain activity.</AlertDescription></Alert>
      <PageBody className="pb-16">
        <LabelWalletsTab label="music" />
      </PageBody>
    </Container>
  );
}
