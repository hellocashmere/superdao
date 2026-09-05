import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { TokenHighlights } from "./components/highlights";
import { DataTable } from "./components/table";

export interface TokenWalletsTabProps extends ComponentPropsWithRef<"div"> {
  tokenID: string;
}

/**
 * Composes audience highlights and the token wallet directory.
 */
export function TokenWalletsTab({ className, tokenID, ref, ...props }: TokenWalletsTabProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="token-wallets-tab"
      className={cn("space-y-5", className)}
    >
      <TokenHighlights tokenID={tokenID} />
      <DataTable tokenID={tokenID} />
    </div>
  );
}
