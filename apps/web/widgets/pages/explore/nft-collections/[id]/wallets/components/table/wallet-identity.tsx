import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

export interface CollectionWalletIdentityProps extends ComponentPropsWithRef<"div"> {
  wallet: NftCollectionWalletView;
}

/**
 * Renders a wallet avatar and display name in a table row.
 */
export function CollectionWalletIdentity({ className, ref, wallet, ...props }: CollectionWalletIdentityProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="nft-collection-wallet-identity"
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
