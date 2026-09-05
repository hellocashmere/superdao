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

import type { TokenWalletView } from "@/entities/token";

export interface TokenWalletActionsProps extends ComponentPropsWithRef<"div"> {
  wallet: TokenWalletView;
}

/**
 * Renders the row actions available for a token wallet.
 */
export function TokenWalletActions({ ref, wallet, ...props }: TokenWalletActionsProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="token-wallet-actions"
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
