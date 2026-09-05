import type { ReactNode } from "react";
import type { Metadata } from "next";

import { getNftCollection } from "@/entities/nft-collection";

/**
 * Generates metadata for the selected NFT collection.
 */
export async function generateMetadata({ params }: LayoutProps<"/explore/nft-collections/[id]">): Promise<Metadata> {
  const { id } = await params;
  const collection = await getNftCollection(id);

  return {
    title: `NFT collections (${collection.name})`,
    description: "Explore NFT collection wallets and insights.",
  };
}

/**
 * Preserves the selected NFT collection context across its views.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
