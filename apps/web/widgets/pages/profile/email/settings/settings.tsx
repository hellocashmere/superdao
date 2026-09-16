"use client";

import type { ComponentPropsWithRef } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@superdao/lib/utils";

import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { EmailSettingsForm } from "./components/settings-form";
import { EmailSettingsResult } from "./components/settings-result";

export interface ProfileEmailSettingsProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders email settings or a confirmation-link result within the appropriate shell.
 */
export function ProfileEmailSettings({ ref, className, ...props }: ProfileEmailSettingsProps) {
	const status = useSearchParams().get("status");

	if (status === "confirmed" || status === "expired") {
		return (
			<EmailSettingsResult
				ref={ref}
				className={className}
				state={status}
				{...props}
			/>
		);
	}

	return (
		<div
			ref={ref}
			className={cn("mx-auto flex min-h-0 w-full max-w-150 flex-1 flex-col px-5", className)}
			{...props}
		>
			<PageHeader className="flex h-18 items-center">
				<h1 className="font-heading text-2xl/7 font-bold">Email settings</h1>
			</PageHeader>
			<PageBody className="pt-4">
				<EmailSettingsForm />
			</PageBody>
		</div>
	);
}
