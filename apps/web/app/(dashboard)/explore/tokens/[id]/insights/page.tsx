import { notFound } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { ExploreTokenDetailsPage } from "@/widgets/pages/explore/tokens/[id]";

/**
 * Renders insights for the selected token audience.
 */
export default async function Page({ params }: PageProps<"/explore/tokens/[id]/insights">) {
  const { id } = await params;
  const tokenID = parseRouteID(id);
  if (tokenID === undefined) notFound();

  return (
    <ExploreTokenDetailsPage
      tokenID={tokenID}
      tab="insights"
    />
  );
}
