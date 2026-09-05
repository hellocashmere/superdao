import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import type { TokenWalletView } from "@/entities/token";

export interface TokenWalletRankProps extends ComponentPropsWithRef<"span"> {
  rank: string;
  tone: TokenWalletView["rankTone"];
}

/**
 * Renders the color-coded Superrank value for a wallet.
 */
export function TokenWalletRank({ className, rank, ref, tone, ...props }: TokenWalletRankProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="token-wallet-rank"
      data-tone={tone}
      className={cn(
        "inline-flex h-5 min-w-7 items-center justify-center rounded-md border-2 px-1 text-sm/5 font-semibold data-[tone=constructive]:border-constructive data-[tone=constructive]:bg-constructive/10 data-[tone=constructive]:text-constructive data-[tone=lime]:border-lime-400 data-[tone=lime]:bg-lime-400/10 data-[tone=lime]:text-lime-400 data-[tone=orange]:border-amber-500 data-[tone=orange]:bg-amber-500/10 data-[tone=orange]:text-amber-500",
        className
      )}
    >
      {rank}
    </span>
  );
}
