import { ExploreNftCollectionDetailsPage } from "@/widgets/pages/explore/nft-collections/[id]";

/**
 * Renders wallets associated with the selected NFT collection.
 */
export default async function Page({ params }: PageProps<"/explore/nft-collections/[id]/wallets">) {
  const { id } = await params;

  return (
    <ExploreNftCollectionDetailsPage
      collectionID={id}
      tab="wallets"
    />
  );
}
