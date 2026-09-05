import type { ComponentPropsWithRef } from "react";

import { Toaster } from "@superdao/ui/components/toast";

import { CreateOrganizationFlow } from "@/features/create-organization";

export interface CreateOrganizationPageProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the organization creation page within the dashboard shell.
 */
export function CreateOrganizationPage({ ref, ...props }: CreateOrganizationPageProps) {
  return (
    <Toaster>
      <CreateOrganizationFlow
        {...props}
        ref={ref}
        data-page="create-organization"
      />
    </Toaster>
  );
}
