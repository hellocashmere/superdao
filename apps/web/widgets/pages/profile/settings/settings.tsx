"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { ProfileSettingsForm } from "./components/settings-form";

export interface ProfileSettingsProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders profile settings within the dashboard shell.
 */
export function ProfileSettings({ className, ref, ...props }: ProfileSettingsProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-page="profile"
      className={cn("mx-auto flex min-h-0 w-full max-w-150 flex-1 flex-col px-5", className)}
    >
      <PageHeader className="flex h-18 items-center">
        <h1 className="font-heading text-2xl/[28px] font-bold">Profile</h1>
      </PageHeader>
      <PageBody className="pt-4">
        <ProfileSettingsForm />
      </PageBody>
    </div>
  );
}
