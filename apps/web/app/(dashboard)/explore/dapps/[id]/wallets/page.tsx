import { ExploreDappDetailsPage } from "@/widgets/pages/explore/dapps/[id]";

/**
 * Renders wallets associated with the selected dapp.
 */
export default async function Page({ params }: PageProps<"/explore/dapps/[id]/wallets">) {
  const { id } = await params;

  return (
    <ExploreDappDetailsPage
      dappID={id}
      tab="wallets"
    />
  );
}
