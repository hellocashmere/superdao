import { notFound, redirect } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { exploreRoutes } from "@/shared/lib/routes";

/**
 * Redirects the selected dapp to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/explore/dapps/[id]">) {
	const { id } = await params;
	const dappID = parseRouteID(id);
	if (dappID === undefined) notFound();

	redirect(exploreRoutes.dappWallets(dappID));
}
