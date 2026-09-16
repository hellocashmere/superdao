import { notFound, redirect } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { exploreRoutes } from "@/shared/lib/routes";

/**
 * Redirects the selected label to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/explore/labels/[id]">) {
	const { id } = await params;
	const labelID = parseRouteID(id);
	if (labelID === undefined) notFound();

	redirect(exploreRoutes.labelWallets(labelID));
}
