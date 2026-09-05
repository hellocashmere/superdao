import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { useGetNftCollectionHighlights } from "@/entities/nft-collection";
import { MetricCard } from "@/shared/ui/metric-card";
import { MailBoldIcon, Twitter2BoldIcon } from "@superdao/icons/bold";

import { CollectionBalanceChart } from "./balance-chart";

export interface CollectionHighlightsProps extends ComponentPropsWithRef<"section"> {
  collectionID: string;
}

/**
 * Renders audience highlights for the selected collection.
 */
export function CollectionHighlights({ className, collectionID, ref, ...props }: CollectionHighlightsProps) {
  const highlightsQuery = useGetNftCollectionHighlights(collectionID);

  if (highlightsQuery.error) throw highlightsQuery.error;
  if (highlightsQuery.isPending) return null;

  return (
    <section
      {...props}
      ref={ref}
      aria-label="Collection audience highlights"
      data-slot="collection-highlights"
      className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[136px_136px]", className)}
    >
      {highlightsQuery.data.metrics.map((metric) => (
        <MetricCard
          key={metric.kind}
          title={metric.title} value={metric.value} description={metric.description} footerValue={metric.footerValue} footerLabel={metric.footerLabel} tooltip={metric.info}
          icon={metric.kind === "email" ? <MailBoldIcon size={20} /> : metric.kind === "twitter" ? <Twitter2BoldIcon size={20} /> : undefined}
        />
      ))}
      <CollectionBalanceChart data={highlightsQuery.data.balanceDistribution} />
    </section>
  );
}
