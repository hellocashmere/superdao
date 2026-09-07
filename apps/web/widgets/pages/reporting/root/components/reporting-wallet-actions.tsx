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

import type { ReportingWallet } from "../model/reporting-data";

export interface ReportingWalletActionsProps extends ComponentPropsWithRef<"div"> {
  wallet: ReportingWallet;
}

/** Renders contextual actions for a reporting wallet row. */
export function ReportingWalletActions({ ref, wallet, ...props }: ReportingWalletActionsProps) {
  const identifier = encodeURIComponent(wallet.wallet);

  return (
    <div
      {...props}
      ref={ref}
      data-slot="reporting-wallet-actions"
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              aria-label={`Actions for ${wallet.wallet}`}
            />
          }
        >
          <DotsIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => void navigator.clipboard.writeText(wallet.wallet)}>
              Copy wallet
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(`https://etherscan.io/address/${identifier}`, "_blank", "noopener,noreferrer")}
            >
              Open in explorer
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
