import { notFound, redirect } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { exploreRoutes } from "@/shared/lib/routes";

/**
 * Redirects the selected NFT collection to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/explore/nft-collections/[id]">) {
	const { id } = await params;
	const collectionID = parseRouteID(id);
	if (collectionID === undefined) notFound();

	redirect(exploreRoutes.nftCollectionWallets(collectionID));
}
