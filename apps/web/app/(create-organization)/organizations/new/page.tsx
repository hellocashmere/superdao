import type { Metadata } from "next";

import { CreateOrganizationPage } from "@/widgets/pages/organization/new";

export const metadata: Metadata = {
	title: "Create organization",
	description: "Create a new Superdao workspace and invite members.",
};

/**
 * Renders the standalone organization creation route.
 */
export default function Page() {
	return <CreateOrganizationPage />;
}
