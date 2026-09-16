import { notFound } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { ExploreNftCollectionDetailsPage } from "@/widgets/pages/explore/nft-collections/[id]";

/**
 * Renders wallets associated with the selected NFT collection.
 */
export default async function Page({ params }: PageProps<"/explore/nft-collections/[id]/wallets">) {
	const { id } = await params;
	const collectionID = parseRouteID(id);
	if (collectionID === undefined) notFound();

	return (
		<ExploreNftCollectionDetailsPage
			collectionID={collectionID}
			tab="wallets"
		/>
	);
}
