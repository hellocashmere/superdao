"use client";

import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";

import { WalletSearch } from "@/features/wallet-search";
import { exploreRoutes } from "@/shared/lib/routes";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { WalletActivity } from "./components/activity";
import { WalletContacts } from "./components/contacts";
import { WalletIDHeader } from "./components/header";
import { WalletLabels } from "./components/labels";
import { WalletSimilarWallets } from "./components/similar-wallets";
import { WalletTransactions } from "./components/transactions";

export interface ExploreWalletDetailsPageProps extends ComponentPropsWithRef<"div"> {
	/**
	 * Backend-provided ID of the wallet to display.
	 */
	walletID: number;
}

/**
 * Renders the detail page for the wallet ID in the current URL.
 */
export function ExploreWalletDetailsPage({ ref, className, walletID, ...props }: ExploreWalletDetailsPageProps) {
	return (
		<Container
			ref={ref}
			data-slot="wallet-details"
			className={cn("flex min-h-0 flex-1 flex-col", className)}
			{...props}
		>
			<PageHeader className="flex min-h-18 items-center justify-between gap-5">
				<div className="flex min-w-0 items-center gap-3">
					<Link
						href={exploreRoutes.wallets()}
						aria-label="Back to wallets"
						className="-ml-2 flex size-8 shrink-0 items-center justify-center rounded-full text-tabs-foreground outline-none hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
					>
						<ArrowLeftIcon size={24} />
					</Link>
					<h1 className="truncate text-2xl/7 font-bold">Wallets</h1>
				</div>
				<WalletSearch />
			</PageHeader>

			<PageBody className="space-y-5 pb-16">
				<WalletIDHeader walletID={walletID} />
				<WalletContacts walletID={walletID} />
				<WalletLabels walletID={walletID} />
				<WalletActivity walletID={walletID} />
				<WalletTransactions walletID={walletID} />
				<WalletSimilarWallets walletID={walletID} />
			</PageBody>
		</Container>
	);
}
