"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { PageHeader } from "@/shared/ui/page-layout";

export interface LabelsHeaderProps extends ComponentPropsWithRef<typeof PageHeader> {}

/**
 * Renders the heading for the label discovery page.
 */
export function LabelsHeader({ className, ref, ...props }: LabelsHeaderProps) {
  return (
    <PageHeader
      {...props}
      ref={ref}
      data-slot="labels-header"
      className={cn("min-h-18", className)}
    >
      <h1 className="text-2xl/7 font-bold">Labels</h1>
    </PageHeader>
  );
}
