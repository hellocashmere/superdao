import { ExploreDappDetailsPage } from "@/widgets/pages/explore/dapps/[id]";

/**
 * Renders insights for the selected dapp audience.
 */
export default async function Page({ params }: PageProps<"/explore/dapps/[id]/insights">) {
  const { id } = await params;

  return (
    <ExploreDappDetailsPage
      dappID={id}
      tab="insights"
    />
  );
}
