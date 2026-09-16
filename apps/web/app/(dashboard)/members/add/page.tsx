import type { Metadata } from "next";

import { AddMembersPage } from "@/widgets/pages/members/root/add";

export const metadata: Metadata = {
	title: "Add members",
	description: "Add wallets and assign community roles.",
};

/**
 * Renders the member creation form.
 */
export default function Page() {
	return <AddMembersPage />;
}
