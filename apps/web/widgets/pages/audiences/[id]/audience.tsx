"use client";

import type { ComponentPropsWithRef } from "react";

import { InfoIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { getAudienceName, useAudienceStore } from "@/entities/audience";
import { useGetLabels } from "@/entities/label";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";
import { LabelWalletsTab } from "@/widgets/pages/explore/labels/[id]";

import { AudienceAddDataDialog } from "./components/add-data-dialog";

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
  const labelsQuery = useGetLabels();
  const storedAudience = useAudienceStore((state) => state.audiences.find((audience) => audience.id === audienceID));
  const audienceName = storedAudience?.name ?? getAudienceName(audienceID);

  if (labelsQuery.error) throw labelsQuery.error;

  if (labelsQuery.isPending) {
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

  const musicLabel = labelsQuery.data.find((label) => label.slug === "music");
  if (!musicLabel) throw new Error("Music label was not found.");

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
        <span className="ml-3 pb-0.5 text-xl/6 font-bold text-tabs-foreground">
          {storedAudience?.walletCount ?? musicLabel.walletCount}
        </span>
      </PageHeader>
      <Alert
        className="mb-5"
        variant="warning"
      >
        <InfoIcon aria-hidden="true" />
        <AlertTitle>Wallet data is updated daily</AlertTitle>
        <AlertDescription>Metrics may take up to 24 hours to reflect the latest on-chain activity.</AlertDescription>
      </Alert>
      <PageBody className="pb-16">
        <LabelWalletsTab
          label={musicLabel.id}
          tableActions={<AudienceAddDataDialog />}
        />
      </PageBody>
    </Container>
  );
}
