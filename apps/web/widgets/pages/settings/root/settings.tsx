import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { SettingsForm } from "./components/settings-form";

export interface SettingsProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the organization settings page within the dashboard shell.
 */
export function Settings({ className, ref, ...props }: SettingsProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-page="settings"
      className={cn(
        "mx-auto flex h-[calc(100svh-3.5rem)] min-h-0 w-full max-w-150 flex-col overflow-hidden px-5 sm:px-5 md:h-svh",
        className
      )}
    >
      <PageHeader>
        <h1 className="font-heading text-2xl/[28px] font-bold">Settings</h1>
      </PageHeader>
      <PageBody className="flex flex-col overflow-hidden pt-4">
        <SettingsForm />
      </PageBody>
    </div>
  );
}
