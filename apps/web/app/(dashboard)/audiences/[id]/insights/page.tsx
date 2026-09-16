import { AudienceDetailsPage } from "@/widgets/pages/audiences/[id]";

/**
 * Renders insights for the selected audience.
 */
export default async function Page({ params }: PageProps<"/audiences/[id]/insights">) {
	const { id } = await params;

	return (
		<AudienceDetailsPage
			audienceID={id}
			tab="insights"
		/>
	);
}
