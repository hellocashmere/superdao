import { ExploreTokenDetailsPage } from "@/widgets/pages/explore/tokens/[id]";

/**
 * Renders insights for the selected token audience.
 */
export default async function Page({ params }: PageProps<"/explore/tokens/[id]/insights">) {
  const { id } = await params;

  return (
    <ExploreTokenDetailsPage
      tokenID={id}
      tab="insights"
    />
  );
}
