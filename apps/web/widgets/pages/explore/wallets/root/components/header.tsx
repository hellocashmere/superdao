import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { WalletSearch } from "@/features/wallet-search";
import { PageHeader } from "@/shared/ui/page-layout";

export interface WalletsHeaderProps extends ComponentPropsWithRef<"header"> {}

/**
 * Renders the Wallets page heading and wallet search field.
 */
export function WalletsHeader({ className, ref, ...props }: WalletsHeaderProps) {
  return (
    <PageHeader
      {...props}
      ref={ref}
      className={cn("flex min-h-18 items-center justify-between gap-4", className)}
    >
      <h1 className="text-2xl/7 font-bold">Wallets</h1>
      <WalletSearch />
    </PageHeader>
  );
}
