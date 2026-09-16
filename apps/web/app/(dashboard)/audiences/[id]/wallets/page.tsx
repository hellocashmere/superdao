import { AudienceDetailsPage } from "@/widgets/pages/audiences/[id]";

/**
 * Renders wallets associated with the selected audience.
 */
export default async function Page({ params }: PageProps<"/audiences/[id]/wallets">) {
	const { id } = await params;

	return (
		<AudienceDetailsPage
			audienceID={id}
			tab="wallets"
		/>
	);
}
