"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Badge } from "@superdao/ui/components/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

import type { TokenWalletView } from "@/entities/token";

const maxVisibleLabels = 5;

export interface TokenWalletLabelsProps extends ComponentPropsWithRef<"div"> {
  labels: readonly TokenWalletView["labels"][number][];
}

/**
 * Renders wallet labels and exposes any overflow through a tooltip.
 */
export function TokenWalletLabels({ className, labels, ref, ...props }: TokenWalletLabelsProps) {
  const visibleLabels = labels.slice(0, maxVisibleLabels);
  const hiddenLabels = labels.slice(maxVisibleLabels);

  return (
    <div
      {...props}
      ref={ref}
      data-slot="token-wallet-labels"
      className={cn("flex flex-wrap gap-x-2 gap-y-0.5", className)}
    >
      {visibleLabels.map((label) => (
        <Badge
          key={label.name}
          color={label.tone === "green" ? "lime" : label.tone === "blue" ? "gray" : label.tone}
          variant="indicator"
        >
          {label.name}
        </Badge>
      ))}
      {hiddenLabels.length > 0 ? (
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                className="rounded-sm text-xs/4 font-semibold text-tabs-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                aria-label={`${hiddenLabels.length} more labels`}
              />
            }
          >
            +{hiddenLabels.length}
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="flex-col items-start gap-1.5"
          >
            {hiddenLabels.map((label) => (
              <Badge
                key={label.name}
                color={label.tone === "green" ? "lime" : label.tone === "blue" ? "gray" : label.tone}
                variant="indicator"
              >
                {label.name}
              </Badge>
            ))}
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}
