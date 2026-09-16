"use client";

import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { DropdownBoldIcon, LinkOpenBoldIcon } from "@superdao/icons/bold";
import { CopyIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Card, CardContent } from "@superdao/ui/components/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@superdao/ui/components/hover-card";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { toast } from "@superdao/ui/components/toast";

import { useGetWalletHeader } from "@/entities/wallet";
import { throwResourceError } from "@/shared/api";

import { WalletInfoTooltip } from "./info-tooltip";

interface WalletBioHoverCardProps extends ComponentPropsWithRef<typeof HoverCardTrigger> {
	/**
	 * The supplementary text displayed in the hover-card content.
	 */
	description: string;
	/**
	 * The title displayed in the hover-card content.
	 */
	heading: string;
}

/**
 * Renders a highlighted bio link with a compact contextual preview.
 */
function WalletBioHoverCard({
	ref,
	children,
	className,
	description,
	heading,
	href,
	...props
}: WalletBioHoverCardProps) {
	return (
		<HoverCard>
			<HoverCardTrigger
				ref={ref}
				href={href}
				delay={10}
				closeDelay={100}
				target="_blank"
				rel="noreferrer"
				className={cn(
					"rounded-sm text-primary transition-colors outline-none hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-ring/40",
					className
				)}
				{...props}
			>
				{children}
			</HoverCardTrigger>
			<HoverCardContent
				side="top"
				align="start"
				sideOffset={8}
				className="w-80 space-y-3 p-4"
			>
				<div className="flex items-center gap-3">
					<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
						<LinkOpenBoldIcon size={16} />
					</span>
					<span className="min-w-0 text-[15px]/5 font-semibold">{heading}</span>
				</div>
				<p className="text-sm/5 text-tabs-foreground">{description}</p>
			</HoverCardContent>
		</HoverCard>
	);
}

export interface WalletIDHeaderProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * Backend ID of the wallet whose header is rendered.
	 */
	walletID: number;
}

/**
 * Renders wallet identity, social bio, and primary statistics.
 */
export function WalletIDHeader({ ref, className, walletID, ...props }: WalletIDHeaderProps) {
	const { compact } = useNumberFormatter();
	const walletHeaderQuery = useGetWalletHeader(walletID);

	if (walletHeaderQuery.error) throwResourceError(walletHeaderQuery.error);

	if (walletHeaderQuery.isPending) {
		return (
			<Card
				ref={ref}
				data-slot="wallet-id-header"
				data-state="loading"
				className={className}
				{...props}
			>
				<CardContent className="pt-4 pb-5">
					<div className="flex min-h-16 items-start gap-5">
						<Skeleton className="size-16 shrink-0 rounded-full" />
						<div className="min-w-0 flex-1 pt-1.25">
							<Skeleton className="h-6 w-41 rounded-lg" />
							<div className="mt-2 flex items-center gap-2">
								<Skeleton className="h-5.25 w-8.5 rounded-lg" />
								<span className="text-sm/5 font-semibold text-tabs-foreground">Superrank</span>
							</div>
						</div>
					</div>
					<dl className="mt-6 grid grid-cols-2 gap-x-15 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
						{["Balance", "Age", "Outgoing transactions", "Owned NFTs", "Twitter followers"].map((label) => (
							<div key={label}>
								<dt className="text-[13px]/[18px] font-semibold text-muted-foreground">{label}</dt>
								<dd className="mt-1">
									<Skeleton className="h-5 w-30 rounded-lg" />
								</dd>
							</div>
						))}
					</dl>
				</CardContent>
			</Card>
		);
	}

	const details = walletHeaderQuery.data;
	/**
	 * Copies the wallet identifier to the clipboard.
	 */
	async function copyWalletID(id: string) {
		try {
			await navigator.clipboard.writeText(id);
			toast.add({
				title: "Wallet value copied",
				description: "The selected wallet value has been copied to your clipboard.",
				type: "success",
			});
		} catch {
			toast.add({
				title: "Couldn't copy wallet value",
				description: "Check your browser permissions and try again.",
				type: "error",
			});
		}
	}

	return (
		<Card
			ref={ref}
			data-slot="wallet-id-header"
			data-state="ready"
			className={className}
			{...props}
		>
			<CardContent className="pt-4 pb-5">
				<div className="flex min-h-16 items-start gap-5">
					<Avatar size="hero">
						<AvatarImage
							src={details.wallet.avatar}
							alt={details.wallet.title}
						/>
					</Avatar>
					<div className="min-w-0 flex-1 pt-1">
						<div className="flex items-center gap-2">
							<h1 className="truncate text-xl/6 font-bold">{details.wallet.title}</h1>
							<DropdownMenu>
								<DropdownMenuTrigger
									aria-label="Copy wallet values"
									className="shrink-0 text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
								>
									<DropdownBoldIcon size={16} />
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-48">
									{details.ids.map((id) => (
										<DropdownMenuItem
											key={id}
											className="h-10 cursor-pointer justify-between gap-3 rounded-none px-3 text-[15px]/6 font-semibold"
											onClick={() => {
												void copyWalletID(id);
											}}
										>
											<span>{id}</span>
											<CopyIcon />
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="mt-2 flex items-center gap-2">
							<span className="rounded-lg border-2 border-constructive bg-constructive/15 px-1.5 py-px text-[13px]/[18px] font-semibold text-constructive">
								{details.superrank}
							</span>
							<span className="text-sm/5 font-semibold text-tabs-foreground">Superrank</span>
						</div>
					</div>
					<span className="text-[13px]/[18px] text-muted-foreground">Last updated {details.lastUpdated}</span>
				</div>

				<div className="mt-5">
					<div className="flex items-center gap-1.5 text-[13px]/[18px] font-semibold text-muted-foreground">
						Twitter bio
						<WalletInfoTooltip label={details.bioTooltip} />
					</div>
					<p className="mt-1 text-[15px]/6">
						{details.bio.map((segment) =>
							segment.type === "link" ? (
								<WalletBioHoverCard
									key={segment.id}
									href={segment.href}
									heading={segment.heading}
									description={segment.description}
								>
									{segment.label}
								</WalletBioHoverCard>
							) : (
								segment.value
							)
						)}
					</p>
				</div>

				<dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
					{details.stats.map((stat) => (
						<div key={stat.id}>
							<dt className="text-[13px]/[18px] font-semibold text-muted-foreground">{stat.label}</dt>
							<dd className="mt-1 text-[17px]/[21px] font-bold">
								{typeof stat.value === "number" ? compact(stat.value) : stat.value}
							</dd>
						</div>
					))}
				</dl>
			</CardContent>
		</Card>
	);
}
