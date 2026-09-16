"use client";

import type { ComponentPropsWithRef } from "react";

import { LinkExternalBoldIcon } from "@superdao/icons/bold";
import type { BadgeColor } from "@superdao/ui/components/badge";
import { Badge } from "@superdao/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@superdao/ui/components/card";
import { Skeleton } from "@superdao/ui/components/skeleton";

import type { WalletLabelVariant } from "@/entities/wallet";
import { useGetWalletLabels } from "@/entities/wallet";

/**
 * Returns the badge color.
 */
function getBadgeColor(tone: WalletLabelVariant): BadgeColor {
	switch (tone) {
		case "amber":
			return "orange";
		case "blue":
		case "cyan":
			return "gray";
		case "constructive":
			return "lime";
		case "fuchsia":
			return "pink";
		case "primary":
		case "violet":
			return "purple";
		case "yellow":
			return "yellow";
	}
}

export interface WalletLabelsProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * ID of the wallet whose labels are rendered.
	 */
	walletID: number;
}

/**
 * Renders wallet classification labels with interactive hover states.
 */
export function WalletLabels({ ref, className, walletID, ...props }: WalletLabelsProps) {
	const labelsQuery = useGetWalletLabels(walletID);

	if (labelsQuery.error) throw labelsQuery.error;
	if (labelsQuery.isPending) {
		return (
			<Card
				ref={ref}
				data-slot="wallet-labels"
				data-state="loading"
				className={className}
				{...props}
			>
				<CardHeader>
					<CardTitle
						role="heading"
						aria-level={2}
					>
						Labels
					</CardTitle>
				</CardHeader>
				<CardContent className="pb-5">
					<div className="mt-3 flex flex-wrap gap-3">
						{Array.from({ length: 4 }, (_, index) => (
							<Skeleton
								key={index}
								className="h-7 w-30 rounded-lg"
							/>
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card
			ref={ref}
			data-slot="wallet-labels"
			data-state="ready"
			className={className}
			{...props}
		>
			<CardHeader>
				<CardTitle
					role="heading"
					aria-level={2}
					className="flex items-center gap-2"
				>
					Labels
					<button
						aria-label="Open all labels"
						className="text-field-placeholder outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
						type="button"
					>
						<LinkExternalBoldIcon size={10} />
					</button>
				</CardTitle>
			</CardHeader>
			<CardContent className="pb-5">
				<div className="mt-3 flex flex-wrap gap-3">
					{labelsQuery.data.map((label) => (
						<Badge
							key={label.id}
							color={getBadgeColor(label.variant)}
							variant="indicator"
							className="h-7 rounded-lg bg-accent! px-3! text-sm/5 text-foreground/80"
						>
							{label.label}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
