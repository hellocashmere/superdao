"use client";

import type { ComponentPropsWithRef } from "react";

import { LinkExternalBoldIcon } from "@superdao/icons/bold";
import type { BadgeColor } from "@superdao/ui/components/badge";
import { Badge } from "@superdao/ui/components/badge";
import { Skeleton } from "@superdao/ui/components/skeleton";

import type { WalletLabelTone } from "@/entities/wallet";
import { useGetWalletLabels } from "@/entities/wallet";

import { WalletIDCard } from "./card";

function getBadgeColor(tone: WalletLabelTone): BadgeColor {
  switch (tone) {
    case "amber":
      return "orange";
    case "blue":
    case "cyan":
      return "gray";
    case "constructive":
      return "lime";
    case "fuchsia":
      return "pink";
    case "primary":
    case "violet":
      return "purple";
    case "yellow":
      return "yellow";
  }
}

export interface WalletLabelsProps extends Omit<ComponentPropsWithRef<typeof WalletIDCard>, "action" | "title"> {
  /**
   * ID of the wallet whose labels are rendered.
   */
  walletID: number;
}

/**
 * Renders wallet classification labels with interactive hover states.
 */
export function WalletLabels({ className, ref, walletID, ...props }: WalletLabelsProps) {
  const labelsQuery = useGetWalletLabels(walletID);

  if (labelsQuery.error) throw labelsQuery.error;
  if (labelsQuery.isPending) {
    return (
      <WalletIDCard
        {...props}
        ref={ref}
        title="Labels"
        data-state="loading"
        className={className}
      >
        <div className="mt-3 flex flex-wrap gap-3">
          {Array.from({ length: 9 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-7 w-24"
            />
          ))}
        </div>
      </WalletIDCard>
    );
  }

  return (
    <WalletIDCard
      {...props}
      ref={ref}
      title="Labels"
      data-state="ready"
      className={className}
      action={
        <button
          aria-label="Open all labels"
          className="text-field-placeholder outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          type="button"
        >
          <LinkExternalBoldIcon size={10} />
        </button>
      }
    >
      <div className="mt-3 flex flex-wrap gap-3">
        {labelsQuery.data.map((label) => (
          <Badge
            key={label.id}
            color={getBadgeColor(label.tone)}
            variant="indicator"
            className="h-7 rounded-lg bg-accent! px-3! text-sm/5 text-foreground/80"
          >
            {label.label}
          </Badge>
        ))}
      </div>
    </WalletIDCard>
  );
}
