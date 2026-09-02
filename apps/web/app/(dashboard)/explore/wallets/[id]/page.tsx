import type { Metadata } from "next";

import { getWalletByID } from "@/entities/wallet";
import { ExploreWalletDetailsPage } from "@/widgets/explore/wallets/[id]";

/**
 * Generates metadata for the selected wallet.
 */
export async function generateMetadata({ params }: PageProps<"/explore/wallets/[id]">): Promise<Metadata> {
  const { id } = await params;
  const wallet = await getWalletByID(id);

  return {
    title: `"${wallet.name}" - wallet`,
    description: "Review wallet activity, contacts, labels, and onchain statistics.",
  };
}

/**
 * Renders the wallet details route for an address or human-readable identifier.
 */
export default async function Page({ params }: PageProps<"/explore/wallets/[id]">) {
  const { id } = await params;

  return <ExploreWalletDetailsPage id={id} />;
}
