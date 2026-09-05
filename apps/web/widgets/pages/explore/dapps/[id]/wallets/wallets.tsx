import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { DappHighlights } from "./components/highlights";
import { DappWalletsTable } from "./components/table";

export interface DappWalletsTabProps extends ComponentPropsWithRef<"div"> {
  dappID: string;
}

/**
 * Composes audience highlights and the dapp wallet directory.
 */
export function DappWalletsTab({ className, dappID, ref, ...props }: DappWalletsTabProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="dapp-wallets-tab"
      className={cn("space-y-5", className)}
    >
      <DappHighlights dappID={dappID} />
      <DappWalletsTable dappID={dappID} />
    </div>
  );
}
