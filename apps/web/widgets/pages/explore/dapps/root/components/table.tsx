"use client";

import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import type { UsePaginationReturn } from "@superdao/hooks";
import { useNumberFormatter } from "@superdao/hooks";
import { EthereumIcon, LinkIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Button } from "@superdao/ui/components/button";
import { Card } from "@superdao/ui/components/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@superdao/ui/components/empty";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@superdao/ui/components/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import type { DappView } from "@/entities/dapp";
import { exploreRoutes } from "@/shared/lib/routes";

export interface DappsRootTableProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * Dapps displayed on the current directory page.
	 */
	dapps: readonly DappView[];

	/**
	 * Number added to the visible row index.
	 */
	rowOffset?: number;
}

/**
 * Renders clickable dapp rows and their activity metrics.
 */
export function DappsRootTable({ ref, className, dapps, rowOffset = 0, ...props }: DappsRootTableProps) {
	const { compact, currency } = useNumberFormatter();

	return (
		<Card
			ref={ref}
			data-slot="dapps-root-table"
			className={cn("relative min-h-0 flex-1", className)}
			{...props}
		>
			<div className={cn("min-h-0", dapps.length ? "flex-1 overflow-hidden" : "shrink-0")}>
				<Table className="min-w-215 table-fixed">
					<TableHeader>
						<TableRow className="h-13.5 border-0 hover:bg-transparent">
							<TableHead className="w-12 px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-icon">
								#
							</TableHead>
							<TableHead className="w-72.5 px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-icon">Dapp</TableHead>
							<TableHead className="px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-icon">
								Owners
							</TableHead>
							<TableHead className="px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-icon">
								Active 30d
							</TableHead>
							<TableHead className="px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-icon">
								Transactions
							</TableHead>
							<TableHead className="w-45 px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-icon">
								Volume, USD
							</TableHead>
							<TableHead className="w-20 px-5 pt-6 pb-3 text-center text-[13px]/[18px] font-semibold text-icon">
								Chain
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{dapps.map((dapp, index) => (
							<TableRow
								key={dapp.id}
								className="group/dapp-row h-14 border-0"
							>
								<TableCell className="px-5 py-0 text-right text-icon">{rowOffset + index + 1}</TableCell>
								<TableCell className="px-5 py-0 font-semibold">
									<Link
										href={exploreRoutes.dappWallets(dapp.id)}
										className="flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
									>
										<Avatar size="compact">
											<AvatarImage
												src={dapp.avatar}
												alt={dapp.title}
											/>
										</Avatar>
										<span className="truncate">{dapp.title}</span>
									</Link>
								</TableCell>
								<TableCell className="px-5 py-0 text-right">{compact(dapp.owners)}</TableCell>
								<TableCell className="px-5 py-0 text-right">{compact(dapp.activeWallets)}</TableCell>
								<TableCell className="px-5 py-0 text-right">{compact(dapp.supply)}</TableCell>
								<TableCell className="px-5 py-0 text-right">
									{currency(dapp.price, "USD", { currencyDisplay: "narrowSymbol", notation: "compact" })}
								</TableCell>
								<TableCell className="px-5 py-0 text-center text-icon">
									{dapp.chain === "ethereum" ? (
										<EthereumIcon
											size={16}
											className="mx-auto"
										/>
									) : (
										<LinkIcon
											size={16}
											className="mx-auto"
										/>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{dapps.length === 0 ? (
				<Empty className="min-h-0 p-0">
					<EmptyHeader className="gap-0">
						<EmptyTitle className="text-2xl/7 font-bold">No results</EmptyTitle>
						<EmptyDescription className="mt-2 text-[15px]/6 text-tabs-foreground">Try another search</EmptyDescription>
					</EmptyHeader>
				</Empty>
			) : null}
		</Card>
	);
}

export interface DappsRootPaginationProps extends ComponentPropsWithRef<"div"> {
	pageSizeOptions: readonly number[];
	pagination: UsePaginationReturn;
}

/**
 * Renders compact pagination controls for the dapps directory.
 */
export function DappsRootPagination({
	ref,
	className,
	pageSizeOptions,
	pagination,
	...props
}: DappsRootPaginationProps) {
	return (
		<div
			ref={ref}
			data-slot="directory-table-pagination"
			className={cn(
				"flex min-h-17 flex-wrap items-center justify-end gap-6 px-6 py-3 text-[13px]/[18px] text-tabs-foreground",
				className
			)}
			{...props}
		>
			<div className="hidden items-center gap-2 lg:flex">
				<span className="min-w-20 text-center text-foreground">Rows per page</span>
				<Select
					value={`${pagination.limit}`}
					onValueChange={(value) => pagination.setLimit(Number(value))}
				>
					<SelectTrigger
						size="sm"
						className="w-20"
						aria-label="Rows per page"
					>
						<SelectValue placeholder={pagination.limit} />
					</SelectTrigger>
					<SelectContent side="top">
						<SelectGroup>
							{pageSizeOptions.map((option) => (
								<SelectItem
									key={option}
									value={`${option}`}
								>
									{option}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<span
				className="min-w-20 text-center text-foreground"
				aria-live="polite"
			>
				{pagination.page} of {pagination.pageCount.toLocaleString("en-US").replace(/,/g, " ")} pages
			</span>

			<div className="flex items-center gap-2">
				<Button
					type="button"
					variant="secondary"
					size="icon-sm"
					className="hidden lg:inline-flex"
					disabled={!pagination.canGoPrevious}
					aria-label="Go to first page"
					onClick={pagination.goToFirst}
				>
					<ChevronsLeft />
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="icon-sm"
					disabled={!pagination.canGoPrevious}
					aria-label="Go to previous page"
					onClick={pagination.goToPrevious}
				>
					<ChevronLeft />
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="icon-sm"
					disabled={!pagination.canGoNext}
					aria-label="Go to next page"
					onClick={pagination.goToNext}
				>
					<ChevronRight />
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="icon-sm"
					className="hidden lg:inline-flex"
					disabled={!pagination.canGoNext}
					aria-label="Go to last page"
					onClick={pagination.goToLast}
				>
					<ChevronsRight />
				</Button>
			</div>
		</div>
	);
}
