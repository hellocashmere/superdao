import { notFound } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { ExploreLabelDetailsPage } from "@/widgets/pages/explore/labels/[id]";

/**
 * Renders insights for the selected label audience.
 */
export default async function Page({ params }: PageProps<"/explore/labels/[id]/insights">) {
	const { id } = await params;
	const labelID = parseRouteID(id);
	if (labelID === undefined) notFound();

	return (
		<ExploreLabelDetailsPage
			label={labelID}
			tab="insights"
		/>
	);
}
