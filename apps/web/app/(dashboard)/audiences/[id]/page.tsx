import { redirect } from "next/navigation";

import { audienceRoutes } from "@/shared/lib/routes";

/**
 * Redirects the selected audience to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/audiences/[id]">) {
	const { id } = await params;

	redirect(audienceRoutes.wallets(id));
}
