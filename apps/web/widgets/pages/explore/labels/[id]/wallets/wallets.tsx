"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "@superdao/lib/utils";

import { LabelHighlights } from "./components/highlights";
import { LabelWalletsTable } from "./components/table/table";

export interface LabelWalletsTabProps extends ComponentPropsWithRef<"div"> {
	tableActions?: ReactNode;
	label: number;
}

/**
 * Composes the highlights and wallet directory shown in the Wallets tab.
 */
export function LabelWalletsTab({ ref, className, label, tableActions, ...props }: LabelWalletsTabProps) {
	return (
		<div
			ref={ref}
			data-slot="label-wallets-tab"
			className={cn("space-y-5", className)}
			{...props}
		>
			<LabelHighlights label={label} />
			<LabelWalletsTable
				label={label}
				toolbarActions={tableActions}
			/>
		</div>
	);
}
