import { notFound } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { ExploreLabelDetailsPage } from "@/widgets/pages/explore/labels/[id]";

/**
 * Renders wallets associated with the selected label.
 */
export default async function Page({ params }: PageProps<"/explore/labels/[id]/wallets">) {
	const { id } = await params;
	const labelID = parseRouteID(id);
	if (labelID === undefined) notFound();

	return (
		<ExploreLabelDetailsPage
			label={labelID}
			tab="wallets"
		/>
	);
}
