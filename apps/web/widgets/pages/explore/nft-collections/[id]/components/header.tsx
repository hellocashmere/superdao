import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { Group16BoldIcon, PollBoldIcon } from "@superdao/icons/bold";
import { TabsList, TabsTrigger } from "@superdao/ui/components/tabs";

import { exploreRoutes } from "@/shared/lib/routes";
import { PageHeaderID } from "@/shared/ui/page-layout";

export interface CollectionIDHeaderProps extends ComponentPropsWithRef<typeof PageHeaderID> {
	/**
	 * ID used to build the collection tab routes.
	 */
	collectionID: number;
}

/**
 * Renders collection identity and route navigation for its detail page.
 */
export function CollectionIDHeader({ ref, className, collectionID, ...props }: CollectionIDHeaderProps) {
	return (
		<PageHeaderID
			ref={ref}
			back={exploreRoutes.nftCollections()}
			data-slot="collection-id-header"
			className={className}
			{...props}
		>
			<TabsList className="h-10 w-75 shrink-0 gap-1 rounded-lg p-1">
				<TabsTrigger
					className="h-8 rounded-lg px-3 py-1"
					value="wallets"
					nativeButton={false}
					render={<Link href={exploreRoutes.nftCollectionWallets(collectionID)} />}
				>
					<Group16BoldIcon
						size={16}
						className="text-tabs-foreground"
					/>
					Wallets
				</TabsTrigger>
				<TabsTrigger
					className="h-8 rounded-lg px-3 py-1"
					value="insights"
					nativeButton={false}
					render={<Link href={exploreRoutes.nftCollectionInsights(collectionID)} />}
				>
					<PollBoldIcon className="size-4" />
					Insights
				</TabsTrigger>
			</TabsList>
		</PageHeaderID>
	);
}
