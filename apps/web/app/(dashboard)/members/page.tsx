import type { Metadata } from "next";

import { MembersPage } from "@/widgets/pages/members/root";

export const metadata: Metadata = {
	title: "Members",
	description: "Manage community members and their roles.",
};

/**
 * Renders the community members table.
 */
export default function Page() {
	return <MembersPage />;
}
