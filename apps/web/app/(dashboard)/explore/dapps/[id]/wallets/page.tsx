import { notFound } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { ExploreDappDetailsPage } from "@/widgets/pages/explore/dapps/[id]";

/**
 * Renders wallets associated with the selected dapp.
 */
export default async function Page({ params }: PageProps<"/explore/dapps/[id]/wallets">) {
  const { id } = await params;
  const dappID = parseRouteID(id);
  if (dappID === undefined) notFound();

  return (
    <ExploreDappDetailsPage
      dappID={dappID}
      tab="wallets"
    />
  );
}
