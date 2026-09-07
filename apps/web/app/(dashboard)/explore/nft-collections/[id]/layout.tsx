import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getNftCollection } from "@/entities/nft-collection";
import { throwResourceError } from "@/shared/api";
import { parseRouteID } from "@/shared/lib/parse-route-id";

/**
 * Generates metadata for the selected NFT collection.
 */
export async function generateMetadata({ params }: LayoutProps<"/explore/nft-collections/[id]">): Promise<Metadata> {
  const { id } = await params;
  const collectionID = parseRouteID(id);
  if (collectionID === undefined) notFound();
  const collection = await getNftCollection(collectionID).catch(throwResourceError);

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
