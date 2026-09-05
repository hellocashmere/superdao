import type { Metadata } from "next";

import { ExploreNftCollectionsPage } from "@/widgets/pages/explore/nft-collections/root";

export const metadata: Metadata = {
  title: "NFT collections",
  description: "Explore NFT collections and their holder communities.",
};

/**
 * Renders the Explore NFT collections directory.
 */
export default function Page() {
  return <ExploreNftCollectionsPage />;
}
