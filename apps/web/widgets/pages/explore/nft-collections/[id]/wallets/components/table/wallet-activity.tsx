"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarGroup, AvatarGroupCount, AvatarImage } from "@superdao/ui/components/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

const maxVisibleActivities = 3;

export interface CollectionWalletActivityProps extends ComponentPropsWithRef<"div"> {
  activity: NftCollectionWalletView["activity"];
}

/**
 * Renders recent activity avatars and reveals overflow in a tooltip.
 */
export function CollectionWalletActivity({ activity, className, ref, ...props }: CollectionWalletActivityProps) {
  const visibleActivity = activity.slice(0, maxVisibleActivities);
  const hiddenActivity = activity.slice(maxVisibleActivities);

  return (
    <AvatarGroup
      {...props}
      ref={ref}
      data-slot="nft-collection-wallet-activity"
      data-size="xs"
      className={cn("-space-x-1", className)}
    >
      {visibleActivity.map((item, index) => (
        <Avatar
          key={`${item.avatar}-${index}`}
          size="xs"
        >
          <AvatarImage
            src={item.avatar}
            alt=""
          />
        </Avatar>
      ))}
      {hiddenActivity.length > 0 ? (
        <Tooltip>
          <TooltipTrigger
            render={
              <AvatarGroupCount
                aria-label={`${hiddenActivity.length} more activities`}
                tabIndex={0}
                className="cursor-pointer"
              />
            }
          >
            +{hiddenActivity.length}
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="min-w-40 flex-col items-start gap-2 p-2"
          >
            {hiddenActivity.map((item, index) => (
              <span
                key={`${item.avatar}-${index}`}
                className="flex items-center gap-2 pr-2"
              >
                <Avatar size="xs">
                  <AvatarImage
                    src={item.avatar}
                    alt=""
                  />
                </Avatar>
                <span>{item.name}</span>
              </span>
            ))}
          </TooltipContent>
        </Tooltip>
      ) : null}
    </AvatarGroup>
  );
}
