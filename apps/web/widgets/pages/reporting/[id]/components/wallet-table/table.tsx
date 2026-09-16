"use client";

import type { ComponentPropsWithRef, ElementType } from "react";
import { useMemo, useState } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { ArrowDownIcon, DotsIcon, LinkIcon, MirrorIcon, OpenseaIcon, TwitterIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@superdao/ui/components/avatar";
import { Button } from "@superdao/ui/components/button";
import { Card } from "@superdao/ui/components/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@superdao/ui/components/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import type { ReportingAction, ReportingContact, ReportingWalletView } from "@/entities/reporting";

import type { ReportingDateRange, ReportingPeriod } from "../../model/types";
import { ReportingFilters } from "../reporting-filters";

const contactIcons: Readonly<Record<ReportingContact, ElementType>> = {
	link: LinkIcon,
	mirror: MirrorIcon,
	opensea: OpenseaIcon,
	twitter: TwitterIcon,
};

const contactLabels: Readonly<Record<ReportingContact, string>> = {
	link: "Explorer",
	mirror: "Mirror",
	opensea: "OpenSea",
	twitter: "Twitter",
};

export interface ReportingTableProps extends ComponentPropsWithRef<typeof Card> {
	wallets: readonly ReportingWalletView[];
}

/**
 * Renders the searchable reporting wallet table and pagination controls.
 */
export function ReportingTable({ ref, className, wallets, ...props }: ReportingTableProps) {
	const { compact, currency, number } = useNumberFormatter();
	const [query, setQuery] = useState<string>("");
	const [actions, setActions] = useState<readonly ReportingAction[]>([]);
	const [sources, setSources] = useState<readonly string[]>([]);
	const [labels, setLabels] = useState<readonly string[]>([]);
	const [period, setPeriod] = useState<ReportingPeriod>("All time");
	const [dateRange, setDateRange] = useState<ReportingDateRange>();
	const [pageIndex, setPageIndex] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(12);
	const [rankSort, setRankSort] = useState<"asc" | "desc" | null>(null);
	const filteredWallets = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		const referenceDate = wallets.reduce<Date | undefined>((latest, wallet) => {
			const occurred = new Date(wallet.occurredAt);
			return !latest || occurred > latest ? occurred : latest;
		}, undefined);

		return wallets.filter((wallet) => {
			const matchesQuery = !normalizedQuery || wallet.wallet.toLowerCase().includes(normalizedQuery);
			const matchesAction = actions.length === 0 || actions.includes(wallet.target);
			const matchesSource = sources.length === 0 || sources.includes(wallet.source);
			const matchesLabels = labels.length === 0 || labels.some((label) => wallet.labels.includes(label));
			const matchesPeriod = walletMatchesPeriod(wallet.occurredAt, period, dateRange, referenceDate);

			return matchesQuery && matchesAction && matchesSource && matchesLabels && matchesPeriod;
		});
	}, [actions, dateRange, labels, period, query, sources, wallets]);
	const sortedWallets = useMemo(() => {
		if (!rankSort) return filteredWallets;

		return [...filteredWallets].sort((left, right) =>
			rankSort === "asc" ? left.rank - right.rank : right.rank - left.rank
		);
	}, [filteredWallets, rankSort]);
	const pageCount = Math.max(1, Math.ceil(sortedWallets.length / pageSize));
	const currentPageIndex = Math.min(pageIndex, pageCount - 1);
	const pageWallets = sortedWallets.slice(currentPageIndex * pageSize, (currentPageIndex + 1) * pageSize);

	/**
	 * Clears reporting filters and returns pagination to the first page.
	 */
	function resetTableFilters() {
		setPageIndex(0);
		setQuery("");
		setActions([]);
		setSources([]);
		setLabels([]);
		setPeriod("All time");
		setDateRange(undefined);
	}

	return (
		<Card
			ref={ref}
			data-slot="reporting-table"
			aria-label="Reporting wallets"
			className={className}
			{...props}
		>
			<div className="px-6 pt-5">
				<ReportingFilters
					wallets={wallets}
					query={query}
					resultCount={filteredWallets.length}
					selectedActions={actions}
					selectedSources={sources}
					selectedLabels={labels}
					period={period}
					dateRange={dateRange}
					onQueryChange={(value) => {
						setPageIndex(0);
						setQuery(value);
					}}
					onActionsChange={(value) => {
						setPageIndex(0);
						setActions(value);
					}}
					onSourcesChange={(value) => {
						setPageIndex(0);
						setSources(value);
					}}
					onLabelsChange={(value) => {
						setPageIndex(0);
						setLabels(value);
					}}
					onPeriodChange={(period, range) => {
						setPageIndex(0);
						setPeriod(period);
						setDateRange(range);
					}}
					onResetFilters={resetTableFilters}
				/>
			</div>

			<div className="min-h-[654px] [&>[data-slot=table-container]]:min-h-[654px]">
				<Table className="min-w-[1088px] table-fixed">
					<TableHeader>
						<TableRow className="h-13.5 border-0 hover:bg-transparent">
							<TableHead
								data-column="index"
								className="w-[29px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								#
							</TableHead>
							<TableHead
								data-column="wallet"
								className="w-[171px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								Wallet
							</TableHead>
							<TableHead
								data-column="rank"
								className="w-[75px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								<button
									type="button"
									data-sort={rankSort ?? "none"}
									className="group/sort inline-flex items-center gap-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
									onClick={() => setRankSort((value) => (value === "desc" ? "asc" : "desc"))}
								>
									Rank
									<ArrowDownIcon
										size={12}
										className="transition-transform group-data-[sort=asc]/sort:rotate-180 group-data-[sort=none]/sort:opacity-50"
									/>
								</button>
							</TableHead>
							<TableHead
								data-column="target"
								className="w-[145px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								Target
							</TableHead>
							<TableHead
								data-column="source"
								className="w-[130px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								Source
							</TableHead>
							<TableHead
								data-column="labels"
								className="w-[206px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								Labels ↗
							</TableHead>
							<TableHead
								data-column="balance"
								className="w-[93px] px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								Balance, $
							</TableHead>
							<TableHead
								data-column="nfts"
								className="w-[59px] px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								NFTs
							</TableHead>
							<TableHead
								data-column="contacts"
								className="w-[132px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground"
							>
								Contacts
							</TableHead>
							<TableHead
								data-column="actions"
								className="w-12 px-5 pt-6 pb-3"
							>
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pageWallets.map((wallet) => (
							<TableRow
								key={wallet.id}
								className="h-14 border-0"
							>
								<TableCell
									data-column="index"
									className="px-5 py-0 text-sm text-[#717a8c] tabular-nums"
								>
									{wallet.id}
								</TableCell>
								<TableCell
									data-column="wallet"
									className="px-5 py-0"
								>
									<div className="flex min-w-0 items-center gap-3">
										<Avatar size="s">
											<AvatarImage
												src={wallet.avatar}
												alt=""
											/>
											<AvatarFallback>{wallet.wallet.slice(0, 1)}</AvatarFallback>
										</Avatar>
										<span className="truncate text-[15px]/6 font-semibold">{wallet.wallet}</span>
									</div>
								</TableCell>
								<TableCell
									data-column="rank"
									className="px-5 py-0"
								>
									<span
										data-tone={rankTone(wallet.rank)}
										className="inline-flex h-5 min-w-7 items-center justify-center rounded-md border-2 px-1 text-sm/5 font-semibold tabular-nums data-[tone=constructive]:border-constructive data-[tone=constructive]:bg-constructive/10 data-[tone=constructive]:text-constructive data-[tone=lime]:border-lime-400 data-[tone=lime]:bg-lime-400/10 data-[tone=lime]:text-lime-400 data-[tone=orange]:border-amber-500 data-[tone=orange]:bg-amber-500/10 data-[tone=orange]:text-amber-500"
									>
										{number(wallet.rank)}
									</span>
								</TableCell>
								<TableCell
									data-column="target"
									className="truncate px-5 py-0 text-sm/5"
								>
									{shorten(wallet.target)}
								</TableCell>
								<TableCell
									data-column="source"
									className="truncate px-5 py-0 text-sm/5"
								>
									{wallet.source}
								</TableCell>
								<TableCell
									data-column="labels"
									className="px-5 py-0"
								>
									<WalletLabels labels={wallet.labels} />
								</TableCell>
								<TableCell
									data-column="balance"
									className="px-5 py-0 text-right text-[15px]/6 tabular-nums"
								>
									{currency(wallet.balance, "USD", {
										currencyDisplay: "narrowSymbol",
										maximumFractionDigits: 1,
										notation: "compact",
									})}
								</TableCell>
								<TableCell
									data-column="nfts"
									className="px-5 py-0 text-right text-[15px]/6 tabular-nums data-[zero=true]:text-[#717a8c]"
									data-zero={wallet.nfts === 0}
								>
									{compact(wallet.nfts)}
								</TableCell>
								<TableCell
									data-column="contacts"
									className="px-5 py-0"
								>
									<div className="flex items-center gap-1 text-[#717a8c]">
										{wallet.contacts.map((contact) => {
											const Icon = contactIcons[contact];
											const label = contactLabels[contact];

											return (
												<a
													key={contact}
													href={getContactHref(contact, wallet.wallet)}
													target="_blank"
													rel="noreferrer"
													aria-label={`${label} contact for ${wallet.wallet}`}
													title={label}
													className="flex size-7 items-center justify-center rounded-md transition-colors outline-none hover:bg-secondary-hover hover:text-foreground focus-visible:bg-secondary-hover focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-95"
												>
													<Icon size={16} />
												</a>
											);
										})}
									</div>
								</TableCell>
								<TableCell
									data-column="actions"
									className="px-5 py-0"
								>
									<DropdownMenu>
										<DropdownMenuTrigger
											render={
												<Button
													type="button"
													variant="ghost"
													size="icon-sm"
													className="rounded-full!"
													aria-label={`Actions for ${wallet.wallet}`}
												/>
											}
										>
											<DotsIcon />
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="w-52"
										>
											<DropdownMenuGroup>
												<DropdownMenuItem onClick={() => void navigator.clipboard.writeText(wallet.wallet)}>
													Copy wallet
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														window.open(getContactHref("link", wallet.wallet), "_blank", "noopener,noreferrer")
													}
												>
													Open in explorer
												</DropdownMenuItem>
											</DropdownMenuGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
						{pageWallets.length === 0 ? (
							<TableRow className="border-0 hover:bg-transparent">
								<TableCell
									colSpan={10}
									className="h-64 text-center"
								>
									<div className="mx-auto max-w-[560px]">
										<h3 className="text-2xl/7 font-bold">No results</h3>
										<p className="mt-2 text-[15px]/6 text-tabs-foreground">
											We couldn&apos;t find any wallets matching these filters.
											<br />
											Try changing or clearing them.
										</p>
										<Button
											type="button"
											className="mt-8"
											onClick={resetTableFilters}
										>
											Reset filters
										</Button>
									</div>
								</TableCell>
							</TableRow>
						) : null}
					</TableBody>
				</Table>
			</div>

			<div className="flex min-h-17 flex-wrap items-center justify-end gap-6 px-6 py-3 text-[13px]/[18px] text-tabs-foreground">
				<div className="hidden items-center gap-2 lg:flex">
					<span className="min-w-20 text-center text-foreground">Rows per page</span>
					<Select
						value={`${pageSize}`}
						onValueChange={(value) => {
							setPageSize(Number(value));
							setPageIndex(0);
						}}
					>
						<SelectTrigger
							size="sm"
							className="w-20"
							aria-label="Rows per page"
						>
							<SelectValue placeholder={pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							<SelectGroup>
								<SelectItem value="12">12</SelectItem>
								<SelectItem value="24">24</SelectItem>
								<SelectItem value="48">48</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<span
					className="min-w-20 text-center text-foreground"
					aria-live="polite"
				>
					{currentPageIndex + 1} of {pageCount} pages
				</span>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="secondary"
						size="icon-sm"
						className="hidden lg:inline-flex"
						disabled={currentPageIndex === 0}
						aria-label="First page"
						onClick={() => setPageIndex(0)}
					>
						<ChevronsLeft />
					</Button>
					<Button
						type="button"
						variant="secondary"
						size="icon-sm"
						disabled={currentPageIndex === 0}
						aria-label="Previous page"
						onClick={() => setPageIndex((value) => Math.max(0, value - 1))}
					>
						<ChevronLeft />
					</Button>
					<Button
						type="button"
						variant="secondary"
						size="icon-sm"
						disabled={currentPageIndex >= pageCount - 1}
						aria-label="Next page"
						onClick={() => setPageIndex((value) => Math.min(pageCount - 1, value + 1))}
					>
						<ChevronRight />
					</Button>
					<Button
						type="button"
						variant="secondary"
						size="icon-sm"
						className="hidden lg:inline-flex"
						disabled={currentPageIndex >= pageCount - 1}
						aria-label="Last page"
						onClick={() => setPageIndex(pageCount - 1)}
					>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</Card>
	);
}

/**
 * Checks whether a wallet activity date matches the selected period.
 */
function walletMatchesPeriod(
	occurredAt: string,
	period: ReportingPeriod,
	range: ReportingDateRange | undefined,
	referenceDate: Date | undefined
) {
	if (period === "All time") return true;

	const occurred = new Date(occurredAt);

	if (period === "Custom period") {
		if (!range?.from) return true;

		const from = new Date(range.from);
		from.setHours(0, 0, 0, 0);
		const to = new Date(range.to ?? range.from);
		to.setHours(23, 59, 59, 999);

		return occurred >= from && occurred <= to;
	}

	if (!referenceDate) return false;

	const end = new Date(referenceDate);
	end.setHours(23, 59, 59, 999);
	const start = new Date(end);
	const days = period === "Today" ? 0 : period === "Last 7 days" ? 6 : 29;
	start.setDate(start.getDate() - days);
	start.setHours(0, 0, 0, 0);

	return occurred >= start && occurred <= end;
}

/**
 * Returns an external contact URL for a reporting wallet.
 */
function getContactHref(contact: ReportingContact, wallet: string) {
	const identifier = encodeURIComponent(wallet);

	switch (contact) {
		case "link":
			return `https://etherscan.io/address/${identifier}`;
		case "mirror":
			return `https://mirror.xyz/${identifier}`;
		case "opensea":
			return `https://opensea.io/${identifier}`;
		case "twitter":
			return `https://x.com/${identifier}`;
	}
}

export interface WalletLabelsProps extends ComponentPropsWithRef<"div"> {
	labels: readonly string[];
}

/**
 * Renders wallet labels and exposes any overflow through a tooltip.
 */
export function WalletLabels({ ref, className, labels, ...props }: WalletLabelsProps) {
	const visibleLabels = labels.slice(0, 5);
	const hiddenLabels = labels.slice(5);

	return (
		<div
			ref={ref}
			className={cn("flex max-h-9 flex-wrap gap-x-2 gap-y-0.5 overflow-hidden", className)}
			{...props}
		>
			{visibleLabels.map((label) => (
				<span
					key={label}
					data-tone={labelTone(label)}
					className="flex items-center gap-1 text-xs/4 font-semibold before:size-1 before:rounded-full data-[tone=blue]:before:bg-blue-400 data-[tone=green]:before:bg-lime-400 data-[tone=orange]:before:bg-amber-400 data-[tone=pink]:before:bg-pink-500 data-[tone=purple]:before:bg-violet-400 data-[tone=yellow]:before:bg-yellow-300"
				>
					{label}
				</span>
			))}
			{hiddenLabels.length > 0 ? (
				<Tooltip>
					<TooltipTrigger
						render={
							<button
								type="button"
								className="rounded-sm text-xs/4 font-semibold text-tabs-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
								aria-label={`${hiddenLabels.length} more labels`}
							/>
						}
					>
						+{hiddenLabels.length}
					</TooltipTrigger>
					<TooltipContent
						side="right"
						className="flex-col items-start gap-1.5"
					>
						{hiddenLabels.map((label) => (
							<span
								key={label}
								data-tone={labelTone(label)}
								className="flex items-center gap-1.5 before:size-1.5 before:rounded-full data-[tone=blue]:before:bg-blue-400 data-[tone=green]:before:bg-lime-400 data-[tone=orange]:before:bg-amber-400 data-[tone=pink]:before:bg-pink-500 data-[tone=purple]:before:bg-violet-400 data-[tone=yellow]:before:bg-yellow-300"
							>
								{label}
							</span>
						))}
					</TooltipContent>
				</Tooltip>
			) : null}
		</div>
	);
}

/**
 * Shortens a wallet identifier for compact display.
 */
function shorten(value: string) {
	if (value.length <= 14) return value;
	return `${value.slice(0, 11)}...`;
}

/**
 * Selects the semantic badge tone for a label.
 */
function labelTone(label: string) {
	if (["Collector", "Luxury"].includes(label)) return "green";
	if (["Early adopter", "Farcaster"].includes(label)) return "orange";
	if (["New", "DeFi"].includes(label)) return "pink";
	if (["Developer", "Gamer"].includes(label)) return "pink";
	if (["Culture", "Whale"].includes(label)) return "blue";
	if (["Influencer", "ENS"].includes(label)) return "yellow";
	return "purple";
}

/**
 * Selects the semantic text tone for a wallet rank.
 */
function rankTone(rank: number) {
	if (rank >= 75) return "constructive";
	if (rank >= 50) return "lime";
	return "orange";
}
