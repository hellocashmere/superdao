import { ExploreLabelDetailsPage } from "@/widgets/pages/explore/labels/[id]";

/**
 * Renders wallets associated with the selected label.
 */
export default async function Page({ params }: PageProps<"/explore/labels/[id]/wallets">) {
  const { id } = await params;

  return (
    <ExploreLabelDetailsPage
      label={id}
      tab="wallets"
    />
  );
}
