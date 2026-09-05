import { redirect } from "next/navigation";

/**
 * Redirects the selected NFT collection to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/explore/nft-collections/[id]">) {
  const { id } = await params;

  redirect(`/explore/nft-collections/${encodeURIComponent(id)}/wallets`);
}
