"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

import { isMissingCollectionWalletValue } from "./wallet-value";

function getAgeDetails(value: string) {
  if (isMissingCollectionWalletValue(value)) return "Age unavailable";

  const yearsMatch = value.match(/^(\d+)(?:\.(\d+))?y$/);

  if (yearsMatch) {
    const years = Number(yearsMatch[1]);
    const months = yearsMatch[2] ? Math.round(Number(`0.${yearsMatch[2]}`) * 12) : 0;
    const yearLabel = `${years} ${years === 1 ? "year" : "years"}`;

    return months > 0 ? `${yearLabel}, ${months} ${months === 1 ? "month" : "months"}` : yearLabel;
  }

  const daysMatch = value.match(/^(\d+)d$/);

  if (daysMatch) {
    const days = Number(daysMatch[1]);
    return `${days} ${days === 1 ? "day" : "days"} since first activity`;
  }

  return `Wallet age: ${value}`;
}

export interface CollectionWalletAgeValueProps extends ComponentPropsWithRef<"span"> {
  details?: string;
  value: string;
}

/**
 * Renders a compact wallet age with optional detailed hover information.
 */
export function CollectionWalletAgeValue({ className, details, ref, value, ...props }: CollectionWalletAgeValueProps) {
  const tooltipDetails = details ?? getAgeDetails(value);

  return (
    <span
      {...props}
      ref={ref}
      data-slot="nft-collection-wallet-age-value"
      className={cn("text-[15px]/6", className)}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              aria-label={`${value}: ${tooltipDetails}`}
            />
          }
        >
          {value}
        </TooltipTrigger>
        <TooltipContent>{tooltipDetails}</TooltipContent>
      </Tooltip>
    </span>
  );
}
