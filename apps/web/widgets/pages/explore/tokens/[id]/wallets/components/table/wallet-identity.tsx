import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";

import type { TokenWalletView } from "@/entities/token";

export interface TokenWalletIdentityProps extends ComponentPropsWithRef<"div"> {
  wallet: TokenWalletView;
}

/**
 * Renders a wallet avatar and display name in a table row.
 */
export function TokenWalletIdentity({ className, ref, wallet, ...props }: TokenWalletIdentityProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="token-wallet-identity"
      className={cn("flex items-center gap-3", className)}
    >
      <Avatar className="size-8">
        <AvatarImage
          src={wallet.avatar}
          alt=""
        />
      </Avatar>
      <span className="truncate text-[15px]/6 font-semibold">{wallet.name}</span>
    </div>
  );
}
