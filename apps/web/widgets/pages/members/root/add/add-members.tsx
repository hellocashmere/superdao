"use client";

import type { ComponentPropsWithRef, SubmitEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AddIcon, ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import { toast } from "@superdao/ui/components/toast";

import { useMemberStore } from "@/entities/member";
import { useGetOrganizationByID, useOrganizationSelection } from "@/entities/organization";
import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import type { MemberDraft } from "./components/member-draft-fields";
import { MemberDraftFields } from "./components/member-draft-fields";

const initialDrafts: readonly MemberDraft[] = [{ id: 1, wallet: "", role: null, email: "" }];

/**
 * Creates a compact display name from a wallet address.
 */
function formatWalletName(wallet: string) {
	if (wallet.length <= 13) {
		return wallet;
	}

	return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

export interface AddMembersPageProps extends ComponentPropsWithRef<typeof Container> {}

/**
 * Renders the form for adding one or more community members.
 */
export function AddMembersPage({ ref, className, ...props }: AddMembersPageProps) {
	const router = useRouter();
	const { activeOrganizationID } = useOrganizationSelection();
	const activeOrganizationQuery = useGetOrganizationByID(activeOrganizationID);
	const activeOrganization = activeOrganizationQuery.data;
	const addMembers = useMemberStore((state) => state.addMembers);
	const userID = useSessionStore((state) => state.userID);
	const assignedBy = useUserStore((state) => state.users.find((user) => user.id === userID)?.name ?? "Demo user");
	const [drafts, setDrafts] = useState<MemberDraft[]>(() => [...initialDrafts]);

	/**
	 * Updates a member draft with the supplied changes.
	 */
	function updateDraft(draftID: number, changes: Partial<MemberDraft>) {
		setDrafts((currentDrafts) =>
			currentDrafts.map((draft) => (draft.id === draftID ? { ...draft, ...changes } : draft))
		);
	}

	/**
	 * Removes a member draft row.
	 */
	function removeDraft(draftID: number) {
		setDrafts((currentDrafts) => currentDrafts.filter((draft) => draft.id !== draftID));
	}

	/**
	 * Adds an empty member draft row.
	 */
	function addDraft() {
		setDrafts((currentDrafts) => [
			...currentDrafts,
			{
				id: Math.max(0, ...currentDrafts.map((draft) => draft.id)) + 1,
				wallet: "",
				role: null,
				email: "",
			},
		]);
	}

	/**
	 * Creates valid member drafts and returns to the member list.
	 */
	function submitMembers(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const completedDrafts = drafts.filter((draft) => draft.wallet.trim());

		if (completedDrafts.length === 0 || !activeOrganization) {
			return;
		}

		addMembers(
			completedDrafts.map((draft) => ({
				name: formatWalletName(draft.wallet.trim()),
				address: draft.wallet.trim(),
				role: draft.role ?? "Member",
				email: draft.email.trim(),
				assignedBy: assignedBy,
				organizationID: activeOrganization.id,
			}))
		);

		const memberLabel = completedDrafts.length === 1 ? "member" : "members";

		toast.add({
			title: "Members added",
			description: `${completedDrafts.length} ${memberLabel} added successfully.`,
			type: "success",
		});

		router.push("/members");
	}

	if (activeOrganizationQuery.error) throw activeOrganizationQuery.error;

	return (
		<Container
			ref={ref}
			data-slot="add-members-page"
			className={cn(
				"mx-auto flex h-[calc(100svh-3.5rem)] min-h-0 flex-col overflow-hidden sm:max-w-[640px] md:h-svh",
				className
			)}
			{...props}
		>
			<PageHeader className="flex min-h-18 items-center gap-3">
				<Button
					variant="ghost"
					size="icon-sm"
					className="-ml-2 rounded-full"
					aria-label="Back to members"
					nativeButton={false}
					render={<Link href="/members" />}
				>
					<ArrowLeftIcon size={24} />
				</Button>
				<h1 className="font-heading text-2xl/[28px] font-bold">Add members</h1>
			</PageHeader>
			<PageBody className="flex flex-col overflow-hidden">
				<form
					className="flex h-full min-h-0 flex-col"
					onSubmit={submitMembers}
				>
					<div className="no-scrollbar min-h-0 flex-1 scroll-fade overflow-y-auto px-1">
						<div className="flex flex-col gap-4 pb-4">
							<div className="space-y-4">
								{drafts.map((draft, index) => (
									<MemberDraftFields
										key={draft.id}
										draft={draft}
										index={index}
										canRemove={drafts.length > 1}
										onDraftChange={updateDraft}
										onRemove={removeDraft}
									/>
								))}
							</div>

							<button
								type="button"
								className="flex h-10 items-center gap-4 text-[15px]/6 font-semibold"
								onClick={addDraft}
							>
								<span className="flex size-10 items-center justify-center rounded-full bg-[#252b36]">
									<AddIcon size={24} />
								</span>
								Add more
							</button>
						</div>
					</div>

					<div className="flex shrink-0 items-center gap-3 bg-background py-4">
						<Button
							type="submit"
							size="wide"
							disabled={!activeOrganization || activeOrganizationQuery.isPending}
						>
							Continue
						</Button>
						<Button
							variant="ghost"
							size="wide"
							nativeButton={false}
							render={<Link href="/members" />}
						>
							Back
						</Button>
					</div>
				</form>
			</PageBody>
		</Container>
	);
}
