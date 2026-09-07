import type { ComponentPropsWithRef } from "react";

import { MailBoldIcon, Twitter2BoldIcon } from "@superdao/icons/bold";
import { cn } from "@superdao/lib/utils";

import { useGetTokenHighlights } from "@/entities/token";
import { MetricCard } from "@/shared/ui/metric-card";

import { TokenBalanceChart } from "./balance-chart";

export interface TokenHighlightsProps extends ComponentPropsWithRef<"section"> {
  tokenID: number;
}

/**
 * Renders audience highlights for the selected token.
 */
export function TokenHighlights({ className, tokenID, ref, ...props }: TokenHighlightsProps) {
  const highlightsQuery = useGetTokenHighlights(tokenID);

  if (highlightsQuery.error) throw highlightsQuery.error;
  if (highlightsQuery.isPending) return null;

  return (
    <section
      {...props}
      ref={ref}
      aria-label="Token audience highlights"
      data-slot="token-highlights"
      className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[136px_136px]", className)}
    >
      {highlightsQuery.data.metrics.map((metric) => (
        <MetricCard
          key={metric.kind}
          title={metric.title}
          value={metric.value}
          description={metric.description}
          footerValue={metric.footerValue}
          footerLabel={metric.footerLabel}
          tooltip={metric.info}
          icon={
            metric.kind === "email" ? (
              <MailBoldIcon size={20} />
            ) : metric.kind === "twitter" ? (
              <Twitter2BoldIcon size={20} />
            ) : undefined
          }
        />
      ))}
      <TokenBalanceChart data={highlightsQuery.data.balanceDistribution} />
    </section>
  );
}
