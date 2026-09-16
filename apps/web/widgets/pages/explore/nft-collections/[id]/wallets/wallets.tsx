import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { CollectionHighlights } from "./components/highlights";
import { CollectionWalletsTable } from "./components/table/table";

export interface CollectionWalletsTabProps extends ComponentPropsWithRef<"div"> {
	collectionID: number;
}

/**
 * Composes audience highlights and the collection wallet directory.
 */
export function CollectionWalletsTab({ ref, className, collectionID, ...props }: CollectionWalletsTabProps) {
	return (
		<div
			ref={ref}
			data-slot="collection-wallets-tab"
			className={cn("space-y-5", className)}
			{...props}
		>
			<CollectionHighlights collectionID={collectionID} />
			<CollectionWalletsTable collectionID={collectionID} />
		</div>
	);
}
