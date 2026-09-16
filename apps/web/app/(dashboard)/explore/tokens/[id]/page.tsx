import { notFound, redirect } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { exploreRoutes } from "@/shared/lib/routes";

/**
 * Redirects the selected token to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/explore/tokens/[id]">) {
	const { id } = await params;
	const tokenID = parseRouteID(id);
	if (tokenID === undefined) notFound();

	redirect(exploreRoutes.tokenWallets(tokenID));
}
