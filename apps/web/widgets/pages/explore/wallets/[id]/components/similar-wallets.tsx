"use client";

import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@superdao/ui/components/card";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { useGetSimilarWallets } from "@/entities/wallet";
import { exploreRoutes } from "@/shared/lib/routes";

export interface WalletSimilarWalletsProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * ID of the wallet for which similar wallets are rendered.
	 */
	walletID: number;
}

/**
 * Renders wallets with similar activity and classification signals.
 */
export function WalletSimilarWallets({ ref, className, walletID, ...props }: WalletSimilarWalletsProps) {
	const { percentValue } = useNumberFormatter();
	const similarWalletsQuery = useGetSimilarWallets(walletID);

	if (similarWalletsQuery.error) throw similarWalletsQuery.error;
	if (similarWalletsQuery.isPending) {
		return (
			<Card
				ref={ref}
				data-slot="wallet-similar-wallets"
				data-state="loading"
				className={className}
				{...props}
			>
				<CardHeader>
					<CardTitle
						role="heading"
						aria-level={2}
					>
						Similar wallets
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
			data-slot="wallet-similar-wallets"
			data-state="ready"
			className={className}
			{...props}
		>
			<CardHeader>
				<CardTitle
					role="heading"
					aria-level={2}
				>
					Similar wallets
				</CardTitle>
			</CardHeader>
			<CardContent className="pb-5">
				<div className="-mx-3 mt-4 grid gap-x-15 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
					{similarWalletsQuery.data.map((similarWallet) => (
						<Link
							key={similarWallet.id}
							href={exploreRoutes.wallet(similarWallet.id)}
							className="flex h-9 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-sm/5 outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40"
						>
							<Avatar size="micro">
								<AvatarImage
									src={similarWallet.avatar}
									alt={similarWallet.title}
								/>
							</Avatar>
							<span className="truncate font-semibold">{similarWallet.title}</span>
							<span className="text-constructive">{percentValue(similarWallet.score)}</span>
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
