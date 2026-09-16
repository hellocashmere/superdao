"use client";

import type { ComponentPropsWithRef } from "react";

import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@superdao/ui/components/card";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { useGetWalletActivity } from "@/entities/wallet";

export interface WalletActivityProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * ID of the wallet whose activity is rendered.
	 */
	walletID: number;
}

/**
 * Renders NFT collections associated with the wallet.
 */
export function WalletActivity({ ref, className, walletID, ...props }: WalletActivityProps) {
	const activityQuery = useGetWalletActivity(walletID);

	if (activityQuery.error) throw activityQuery.error;
	if (activityQuery.isPending) {
		return (
			<Card
				ref={ref}
				data-slot="wallet-activity"
				data-state="loading"
				className={className}
				{...props}
			>
				<CardHeader>
					<CardTitle
						role="heading"
						aria-level={2}
					>
						Activity
					</CardTitle>
				</CardHeader>
				<CardContent className="pb-5">
					<div className="mt-4 grid gap-x-15 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
						{Array.from({ length: 8 }, (_, index) => (
							<Skeleton
								key={index}
								className="h-5 w-30 rounded-lg"
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
			data-slot="wallet-activity"
			data-state="ready"
			className={className}
			{...props}
		>
			<CardHeader>
				<CardTitle
					role="heading"
					aria-level={2}
				>
					Activity
				</CardTitle>
			</CardHeader>
			<CardContent className="pb-5">
				<div className="-mx-3 mt-4 grid gap-x-15 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
					{activityQuery.data.map((collection) => (
						<button
							key={collection.id}
							className="flex h-9 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-sm/5 font-semibold outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40"
							type="button"
						>
							<Avatar size="micro">
								<AvatarImage
									src={collection.avatar}
									alt={collection.title}
								/>
							</Avatar>
							<span className="truncate">{collection.title}</span>
						</button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
