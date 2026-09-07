import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getWalletByID } from "@/entities/wallet";
import { throwResourceError } from "@/shared/api";
import { parseRouteID } from "@/shared/lib/parse-route-id";
import { ExploreWalletDetailsPage } from "@/widgets/pages/explore/wallets/[id]";

/**
 * Generates metadata for the selected wallet.
 */
export async function generateMetadata({ params }: PageProps<"/explore/wallets/[id]">): Promise<Metadata> {
  const { id } = await params;
  const walletID = parseRouteID(id);
  if (walletID === undefined) notFound();
  const wallet = await getWalletByID(walletID).catch(throwResourceError);

  return {
    title: `Wallets (${wallet.name})`,
    description: "Review wallet activity, contacts, labels, and onchain statistics.",
  };
}

/**
 * Renders the wallet details route for a backend-provided numeric ID.
 */
export default async function Page({ params }: PageProps<"/explore/wallets/[id]">) {
  const { id } = await params;
  const walletID = parseRouteID(id);
  if (walletID === undefined) notFound();

  return <ExploreWalletDetailsPage walletID={walletID} />;
}
