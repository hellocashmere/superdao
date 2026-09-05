import { ExploreLabelDetailsPage } from "@/widgets/pages/explore/labels/[id]";

/**
 * Renders insights for the selected label audience.
 */
export default async function Page({ params }: PageProps<"/explore/labels/[id]/insights">) {
  const { id } = await params;

  return (
    <ExploreLabelDetailsPage
      label={id}
      tab="insights"
    />
  );
}
