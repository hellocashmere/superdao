"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { AudienceHighlights } from "./components/highlights";
import { AudienceWalletsTable } from "./components/table/table";

export interface AudienceWalletsTabProps extends ComponentPropsWithRef<"div"> {
	sourceLabelID: number;
}

/**
 * Composes audience highlights and the wallet directory.
 */
export function AudienceWalletsTab({ ref, className, sourceLabelID, ...props }: AudienceWalletsTabProps) {
	return (
		<div
			ref={ref}
			data-slot="audience-wallets-tab"
			className={cn("space-y-5", className)}
			{...props}
		>
			<AudienceHighlights sourceLabelID={sourceLabelID} />
			<AudienceWalletsTable sourceLabelID={sourceLabelID} />
		</div>
	);
}
