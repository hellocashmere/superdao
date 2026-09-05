import { ExploreNftCollectionDetailsPage } from "@/widgets/pages/explore/nft-collections/[id]";

/**
 * Renders insights for the selected NFT collection audience.
 */
export default async function Page({ params }: PageProps<"/explore/nft-collections/[id]/insights">) {
  const { id } = await params;

  return (
    <ExploreNftCollectionDetailsPage
      collectionID={id}
      tab="insights"
    />
  );
}
