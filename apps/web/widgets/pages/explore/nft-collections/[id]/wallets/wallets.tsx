import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { CollectionHighlights } from "./components/highlights";
import { DataTable } from "./components/table";

export interface CollectionWalletsTabProps extends ComponentPropsWithRef<"div"> {
  collectionID: number;
}

/**
 * Composes audience highlights and the collection wallet directory.
 */
export function CollectionWalletsTab({ className, collectionID, ref, ...props }: CollectionWalletsTabProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="collection-wallets-tab"
      className={cn("space-y-5", className)}
    >
      <CollectionHighlights collectionID={collectionID} />
      <DataTable collectionID={collectionID} />
    </div>
  );
}
