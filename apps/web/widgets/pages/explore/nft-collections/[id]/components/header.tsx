import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";

import type { NftCollectionView } from "@/entities/nft-collection";
import { PageHeader } from "@/shared/ui/page-layout";

import { CollectionTabsList } from "./tabs";

export interface CollectionIDHeaderProps extends ComponentPropsWithRef<typeof PageHeader> {
  collection: NftCollectionView;
}

/**
 * Renders collection identity, audience count, and help action.
 */
export function CollectionIDHeader({ className, collection, ref, ...props }: CollectionIDHeaderProps) {
  return (
    <PageHeader
      {...props}
      ref={ref}
      data-slot="collection-id-header"
      className={cn("flex min-h-18 items-center justify-between gap-5", className)}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href="/explore/nft-collections"
          aria-label="Back to NFT collections"
          className="-ml-2 flex size-8 shrink-0 items-center justify-center rounded-md text-tabs-foreground outline-none hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <ArrowLeftIcon size={24} />
        </Link>
        <Avatar className="size-8 shrink-0">
          <AvatarImage
            src={collection.avatar}
            alt=""
          />
        </Avatar>
        <div className="flex min-w-0 items-end gap-3">
          <h1 className="truncate text-2xl/7 font-bold">{collection.name}</h1>
          <span className="pb-0.5 text-xl/6 font-bold text-tabs-foreground">{collection.walletCount}</span>
        </div>
      </div>
      <CollectionTabsList collectionID={collection.id} />
    </PageHeader>
  );
}
