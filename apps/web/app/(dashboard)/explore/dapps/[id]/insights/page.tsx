import { notFound } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { ExploreDappDetailsPage } from "@/widgets/pages/explore/dapps/[id]";

/**
 * Renders insights for the selected dapp audience.
 */
export default async function Page({ params }: PageProps<"/explore/dapps/[id]/insights">) {
	const { id } = await params;
	const dappID = parseRouteID(id);
	if (dappID === undefined) notFound();

	return (
		<ExploreDappDetailsPage
			dappID={dappID}
			tab="insights"
		/>
	);
}
