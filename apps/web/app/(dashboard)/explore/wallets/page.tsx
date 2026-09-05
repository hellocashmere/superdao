import type { Metadata } from "next";

import { ExploreWalletsPage } from "@/widgets/pages/explore/wallets/root";

export const metadata: Metadata = {
  title: "Wallets",
  description: "Discover recent and top-ranked wallets across web3.",
};

/**
 * Renders the Explore Wallets route.
 */
export default function Page() {
  return <ExploreWalletsPage />;
}
