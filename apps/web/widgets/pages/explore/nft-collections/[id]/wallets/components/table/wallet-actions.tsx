"use client";

import type { ComponentPropsWithRef } from "react";

import { DotsIcon } from "@superdao/icons/outline";
import { Button } from "@superdao/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

export interface CollectionWalletActionsProps extends ComponentPropsWithRef<"div"> {
  wallet: NftCollectionWalletView;
}

/**
 * Renders the row actions available for a NFT collection wallet.
 */
export function CollectionWalletActions({ ref, wallet, ...props }: CollectionWalletActionsProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="nft-collection-wallet-actions"
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              aria-label={`Actions for ${wallet.name}`}
            />
          }
        >
          <DotsIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(wallet.name);
              }}
            >
              Make a copy
            </DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
