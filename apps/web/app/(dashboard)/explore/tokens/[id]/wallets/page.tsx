import { ExploreTokenDetailsPage } from "@/widgets/pages/explore/tokens/[id]";

/**
 * Renders wallets associated with the selected token.
 */
export default async function Page({ params }: PageProps<"/explore/tokens/[id]/wallets">) {
  const { id } = await params;

  return (
    <ExploreTokenDetailsPage
      tokenID={id}
      tab="wallets"
    />
  );
}
