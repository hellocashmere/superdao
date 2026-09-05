"use client";

import type { ComponentPropsWithRef, FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AddIcon, ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import { toast } from "@superdao/ui/components/toast";

import { useMemberStore } from "@/entities/member";
import { useOrganizationStore } from "@/entities/organization";
import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import type { MemberDraft } from "./components/member-draft-fields";
import { MemberDraftFields } from "./components/member-draft-fields";

const initialDrafts: readonly MemberDraft[] = [
  { id: 1, wallet: "", role: null, email: "" },
  { id: 2, wallet: "", role: null, email: "" },
];

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
export function AddMembersPage({ className, ref, ...props }: AddMembersPageProps) {
  const router = useRouter();
  const activeOrganizationID = useOrganizationStore((state) => state.activeOrganizationID);
  const addMembers = useMemberStore((state) => state.addMembers);
  const userID = useSessionStore((state) => state.userID);
  const assignedBy = useUserStore((state) => state.users.find((user) => user.id === userID)?.name ?? "Demo user");
  const [drafts, setDrafts] = useState(() => [...initialDrafts]);

  function updateDraft(draftID: number, changes: Partial<MemberDraft>) {
    setDrafts((currentDrafts) =>
      currentDrafts.map((draft) => (draft.id === draftID ? { ...draft, ...changes } : draft))
    );
  }

  function removeDraft(draftID: number) {
    setDrafts((currentDrafts) => currentDrafts.filter((draft) => draft.id !== draftID));
  }

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

  function submitMembers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const completedDrafts = drafts.filter((draft) => draft.wallet.trim());

    if (completedDrafts.length === 0) {
      return;
    }

    addMembers(
      completedDrafts.map((draft) => ({
        name: formatWalletName(draft.wallet.trim()),
        address: draft.wallet.trim(),
        role: draft.role ?? "Member",
        email: draft.email.trim(),
        assignedBy,
        organizationID: activeOrganizationID,
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

  return (
    <Container
      {...props}
      ref={ref}
      data-slot="add-members-page"
      className={cn("mx-auto flex min-h-0 flex-1 flex-col sm:max-w-[640px]", className)}
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
      <PageBody>
        <form onSubmit={submitMembers}>
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
            className="mt-4 flex h-10 items-center gap-4 text-[15px]/6 font-semibold"
            onClick={addDraft}
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-[#252b36]">
              <AddIcon size={24} />
            </span>
            Add more
          </button>

          <div className="mt-10 flex items-center gap-3">
            <Button
              type="submit"
              className="px-6"
            >
              Continue
            </Button>
            <Button
              variant="ghost"
              className="px-6"
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
