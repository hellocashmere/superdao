"use client";

import type { ChangeEvent, ComponentPropsWithRef, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { GalleryBoldIcon } from "@superdao/icons/bold";
import { AddIcon, CloseIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@superdao/ui/components/alert-dialog";
import { Button } from "@superdao/ui/components/button";
import { Field, FieldLabel } from "@superdao/ui/components/field";
import { Input } from "@superdao/ui/components/input";
import { Textarea } from "@superdao/ui/components/textarea";
import { toast } from "@superdao/ui/components/toast";

import { useAudienceStore } from "@/entities/audience";
import { useMemberStore } from "@/entities/member";
import { useOrganizationStore } from "@/entities/organization";
import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";
import type { CreatedAudience } from "@/features/create-audience";
import { CreateAudienceDialog } from "@/features/create-audience";
import { isEthereumAddress } from "@/shared/lib/crypto";

import type { OrganizationMemberDraft } from "../model/create-organization";
import { formatOrganizationWallet, initialOrganizationMemberDrafts } from "../model/create-organization";

import { OrganizationMemberFields } from "./organization-member-fields";
import { OrganizationProgress } from "./organization-progress";

export interface CreateOrganizationFlowProps extends ComponentPropsWithRef<"div"> {}

/** Renders the complete guided flow for creating a new organization. */
export function CreateOrganizationFlow({ className, ref, ...props }: CreateOrganizationFlowProps) {
  const router = useRouter();
  const saveAudience = useAudienceStore((state) => state.createAudience);
  const createOrganization = useOrganizationStore((state) => state.createOrganization);
  const addMembers = useMemberStore((state) => state.addMembers);
  const userID = useSessionStore((state) => state.userID);
  const assignedBy = useUserStore((state) => state.users.find((user) => user.id === userID)?.name ?? "Demo user");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [drafts, setDrafts] = useState<OrganizationMemberDraft[]>(() => [...initialOrganizationMemberDrafts]);
  const [isUnsavedDialogOpen, setIsUnsavedDialogOpen] = useState(false);
  const [isAudienceDialogOpen, setIsAudienceDialogOpen] = useState(false);
  const isDirty = Boolean(name.trim() || description.trim() || logoUrl);
  const isSaved = step === 3;
  const hasInvalidWallet = drafts.some((draft) => {
    const wallet = draft.wallet.trim();

    return wallet !== "" && !isEthereumAddress(wallet);
  });

  useEffect(() => {
    function confirmBrowserExit(event: BeforeUnloadEvent) {
      if (!isDirty || isSaved) {
        return;
      }

      event.preventDefault();
    }

    window.addEventListener("beforeunload", confirmBrowserExit);

    return () => window.removeEventListener("beforeunload", confirmBrowserExit);
  }, [isDirty, isSaved]);

  function exitFlow() {
    router.push("/");
  }

  function requestExit() {
    if (isDirty && !isSaved) {
      setIsUnsavedDialogOpen(true);
      return;
    }

    exitFlow();
  }

  function uploadLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        setLogoUrl(reader.result);
      }
    });
    reader.readAsDataURL(file);
  }

  function continueFromGeneralInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim()) {
      setStep(2);
    }
  }

  function updateDraft(draftID: number, changes: Partial<OrganizationMemberDraft>) {
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
        email: "",
        id: Math.max(0, ...currentDrafts.map((draft) => draft.id)) + 1,
        role: null,
        wallet: "",
      },
    ]);
  }

  function createOrganizationWithMembers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (hasInvalidWallet) {
      return;
    }

    const completedDrafts = drafts.filter((draft) => draft.wallet.trim());
    const organizationID = createOrganization({
      admins: completedDrafts
        .filter((draft) => draft.role === "Admin" || draft.role === "Owner")
        .map((draft) => draft.wallet.trim()),
      avatarUrl: logoUrl,
      description,
      name,
    });

    if (completedDrafts.length > 0) {
      addMembers(
        completedDrafts.map((draft) => ({
          address: draft.wallet.trim(),
          assignedBy,
          email: draft.email.trim(),
          name: formatOrganizationWallet(draft.wallet.trim()),
          organizationID,
          role: draft.role ?? "Member",
        }))
      );
    }

    setStep(3);
  }

  function createAudience(audience: CreatedAudience) {
    const audienceID = saveAudience(audience);

    setIsAudienceDialogOpen(false);
    toast.add({
      title: "Audience created",
      description: `${audience.name} is ready to explore.`,
      type: "success",
    });
    router.push(`/audiences/${audienceID}`);
  }

  return (
    <div
      {...props}
      ref={ref}
      data-slot="create-organization-flow"
      data-step={step}
      className={cn("relative flex h-svh min-h-svh w-full flex-col overflow-hidden bg-[#1b202a] text-white", className)}
    >
      <header className="relative flex h-20 shrink-0 items-start justify-center px-16 pt-7 sm:px-20">
        <OrganizationProgress
          activeStep={step}
          steps={step === 3 ? 3 : 2}
          className="max-w-[560px]"
        />
        <button
          type="button"
          className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-full text-[#717a8c] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-ring sm:top-3 sm:right-3"
          aria-label="Close organization creation"
          onClick={requestExit}
        >
          <CloseIcon className="size-6" />
        </button>
      </header>

      {step === 1 ? (
        <main className="min-h-0 flex-1 overflow-y-auto px-5 pb-12">
          <form
            className="mx-auto w-full max-w-[560px] pt-[90px] max-md:pt-10"
            onSubmit={continueFromGeneralInfo}
          >
            <h1 className="font-heading text-4xl/[44px] font-bold tracking-[0.01em] max-sm:text-3xl/[38px]">
              General info
            </h1>

            <label className="mt-8 flex w-fit cursor-pointer items-center gap-4 rounded-lg focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-ring">
              <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#252b36] text-[#a2a8b4]">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt="Organization logo preview"
                    className="size-full object-cover"
                  />
                ) : (
                  <GalleryBoldIcon className="size-6" />
                )}
              </span>
              <span className="px-1 text-[17px]/[21px] font-bold text-primary">
                {logoUrl ? "Change logo" : "Upload logo"}
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                onChange={uploadLogo}
              />
            </label>

            <div className="mt-3 space-y-4">
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="organization-name"
                  className="h-10 items-center"
                >
                  Workspace name
                </FieldLabel>
                <Input
                  id="organization-name"
                  value={name}
                  autoComplete="organization"
                  placeholder="Give your workspace a catchy name"
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="organization-description"
                  className="h-10 items-center"
                >
                  Description
                </FieldLabel>
                <Textarea
                  id="organization-description"
                  value={description}
                  placeholder="Tell what your workspace's about"
                  className="min-h-[90px] resize-none"
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Field>
            </div>

            <Button
              type="submit"
              className="mt-10 px-6"
              disabled={!name.trim()}
            >
              Continue
            </Button>
          </form>
        </main>
      ) : null}

      {step === 2 ? (
        <main className="mx-auto flex min-h-0 w-full max-w-[600px] flex-1 flex-col px-5">
          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={createOrganizationWithMembers}
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-0.5 pt-[70px] pb-6 max-md:pt-6">
              <h1 className="font-heading text-4xl/[44px] font-bold tracking-[0.01em] max-sm:text-3xl/[38px]">
                Add members
              </h1>
              <div className="mt-5 space-y-4">
                {drafts.map((draft, index) => (
                  <OrganizationMemberFields
                    key={draft.id}
                    draft={draft}
                    index={index}
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
                  <AddIcon className="size-6" />
                </span>
                Add more
              </button>
            </div>

            <div className="relative z-10 flex shrink-0 items-center gap-3 border-t border-white/5 bg-[#1b202a] py-6 before:pointer-events-none before:absolute before:right-0 before:bottom-full before:left-0 before:h-8 before:bg-gradient-to-t before:from-[#1b202a] before:to-transparent">
              <Button
                type="submit"
                className="px-6"
                disabled={hasInvalidWallet}
              >
                Continue
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="px-6"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </div>
          </form>
        </main>
      ) : null}

      {step === 3 ? (
        <main className="flex min-h-0 flex-1 items-center px-5 pb-20">
          <section
            className="mx-auto w-full max-w-[560px]"
            aria-live="polite"
          >
            <h1 className="font-heading text-4xl/[44px] font-bold tracking-[0.01em] max-sm:text-3xl/[38px]">
              Workspace created&nbsp; 🎉
            </h1>
            <p className="mt-4 text-[15px]/6">Start with adding your first audience</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                className="px-6"
                onClick={() => setIsAudienceDialogOpen(true)}
              >
                Create audience
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="px-6"
                onClick={exitFlow}
              >
                Skip
              </Button>
            </div>
          </section>
        </main>
      ) : null}

      <AlertDialog
        open={isUnsavedDialogOpen}
        onOpenChange={setIsUnsavedDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              If you leave the page, any changes you have made will be lost. Are you sure you wish to leave this page?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#ff4d7d] px-5 hover:bg-[#ff638d] active:bg-[#e93d6c]"
              onClick={exitFlow}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CreateAudienceDialog
        open={isAudienceDialogOpen}
        onOpenChange={setIsAudienceDialogOpen}
        onCreate={createAudience}
      />
    </div>
  );
}
