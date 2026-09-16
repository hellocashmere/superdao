"use client";

import type { ComponentPropsWithRef, ElementType } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { ArrowDownBoldIcon, DocumentBoldIcon, DoneBoldIcon, HelpBoldIcon } from "@superdao/icons/bold";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@superdao/ui/components/card";
import { Skeleton } from "@superdao/ui/components/skeleton";

import type { WalletTransactionKind } from "@/entities/wallet";
import { useGetWalletTransactions } from "@/entities/wallet";

import { WalletInfoTooltip } from "./info-tooltip";

export interface WalletTransactionsProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * ID of the wallet whose transactions are rendered.
	 */
	walletID: number;
}

const transactionIcons: Record<WalletTransactionKind, ElementType> = {
	approved: DoneBoldIcon,
	contract: DocumentBoldIcon,
	transfer: ArrowDownBoldIcon,
	unknown: HelpBoldIcon,
};

/**
 * Renders the wallet transaction summary and recent transaction rows.
 */
export function WalletTransactions({ ref, className, walletID, ...props }: WalletTransactionsProps) {
	const { compact, number } = useNumberFormatter();
	const transactionsQuery = useGetWalletTransactions(walletID);

	if (transactionsQuery.error) throw transactionsQuery.error;
	if (transactionsQuery.isPending) {
		return (
			<Card
				ref={ref}
				data-slot="wallet-transactions"
				data-state="loading"
				className={className}
				{...props}
			>
				<CardHeader>
					<CardTitle
						role="heading"
						aria-level={2}
					>
						Last 30d transactions
					</CardTitle>
				</CardHeader>
				<CardContent className="pb-5">
					<dl className="mt-4 grid grid-cols-2 gap-x-15 gap-y-5 lg:grid-cols-4">
						{["Count", "Volume", "Income", "Outcome"].map((label) => (
							<div key={label}>
								<dt className="text-[13px]/[18px] font-semibold text-muted-foreground">{label}</dt>
								<dd className="mt-1">
									<Skeleton className="h-5 w-30 rounded-lg" />
								</dd>
							</div>
						))}
					</dl>
					<div className="mt-5 border-t border-border pt-5">
						<h3 className="text-sm/5 font-semibold text-muted-foreground">Recent</h3>
						<div className="mt-4 space-y-6">
							{Array.from({ length: 5 }, (_, index) => (
								<div
									key={index}
									className="grid grid-cols-2 gap-x-15 gap-y-4 lg:grid-cols-4"
								>
									{Array.from({ length: 4 }, (_, cellIndex) => (
										<Skeleton
											key={cellIndex}
											className="h-5 w-30 rounded-lg"
										/>
									))}
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	const transactionData = transactionsQuery.data;

	return (
		<Card
			ref={ref}
			data-slot="wallet-transactions"
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
					{transactionData.title}
					<WalletInfoTooltip
						label={transactionData.tooltip}
						className="ml-1"
					/>
				</CardTitle>
			</CardHeader>
			<CardContent className="pb-5">
				<dl className="mt-4 grid grid-cols-2 gap-5 lg:grid-cols-4">
					{transactionData.metrics.map((metric) => (
						<div
							key={metric.id}
							data-variant={metric.variant}
							className="group/metric"
						>
							<dt className="text-[13px]/[18px] font-semibold text-muted-foreground">{metric.label}</dt>
							<dd className="mt-1 text-[17px]/[21px] font-bold group-data-[variant=negative]/metric:text-destructive group-data-[variant=positive]/metric:text-constructive">
								{compact(metric.value)}
							</dd>
						</div>
					))}
				</dl>

				<div className="mt-5 border-t border-border pt-5">
					<h3 className="text-[13px]/[18px] font-semibold text-muted-foreground">Recent</h3>
					<div className="mt-3 space-y-4">
						{transactionData.transactions.map((transaction) => {
							const Icon = transactionIcons[transaction.kind];

							return (
								<div
									key={transaction.id}
									data-variant={transaction.variant}
									className="group/transaction grid min-h-6 grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr] items-center gap-4 text-sm/5"
								>
									<span className="flex items-center gap-3">
										<span
											data-direction={transaction.direction}
											className="group/transaction-icon flex size-6 items-center justify-center rounded-full bg-accent text-tabs-foreground"
										>
											<Icon
												size={16}
												className="transition-transform group-data-[direction=up]/transaction-icon:rotate-180"
											/>
										</span>
										{transaction.type}
									</span>
									<span className="text-muted-foreground group-data-[variant=negative]/transaction:text-destructive group-data-[variant=positive]/transaction:text-constructive">
										{transaction.amount === null ? "—" : number(transaction.amount, { maximumFractionDigits: 2 })}
									</span>
									<span className="flex items-center gap-2">
										{transaction.assetIcon ? (
											<Avatar size="micro">
												<AvatarImage
													src={transaction.assetIcon}
													alt=""
												/>
											</Avatar>
										) : null}
										<span className="truncate">{transaction.asset}</span>
									</span>
									<span>{transaction.date}</span>
								</div>
							);
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
