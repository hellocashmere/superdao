"use client";

import type { ComponentPropsWithRef } from "react";

import { ArrowDownIcon, CloseIcon, ColumnsIcon, DocumentIcon, FilterIcon, SearchIcon } from "@superdao/icons/outline";
import { Button } from "@superdao/ui/components/button";
import { Card } from "@superdao/ui/components/card";
import { Checkbox } from "@superdao/ui/components/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@superdao/ui/components/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@superdao/ui/components/select";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";
import { useTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { useGetDappWallets } from "@/entities/dapp";

import { DappWalletsExportDialog } from "../export-dialog";

import { columnLabels, columns, dataTableFeatures, filterLabels } from "./table-config";

export interface DappWalletsTableProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * Backend-provided ID of the dapp whose wallets populate the table.
	 */
	dappID: number;
}

/**
 * Renders the searchable, sortable, and paginated dapp wallet table.
 */
export function DappWalletsTable({ ref, className, dappID, ...props }: DappWalletsTableProps) {
	const walletsQuery = useGetDappWallets(dappID);
	const table = useTable({
		features: dataTableFeatures,
		data: walletsQuery.data ?? [],
		columns,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 12,
			},
			sorting: [
				{
					id: "index",
					desc: false,
				},
			],
		},
	});
	const walletColumn = table.getColumn("wallet");
	const labelsColumn = table.getColumn("labels");
	const walletSearch = (walletColumn?.getFilterValue() as string) ?? "";
	const selectedLabels = (labelsColumn?.getFilterValue() as readonly string[] | undefined) ?? [];
	const filteredCount = table.getFilteredRowModel().rows.length;
	const pageNumber = table.state.pagination.pageIndex + 1;

	if (walletsQuery.error) throw walletsQuery.error;

	/**
	 * Updates the selected label filter values.
	 */
	function toggleLabel(labelName: string, selected: boolean) {
		const nextLabels = selected
			? Array.from(new Set([...selectedLabels, labelName]))
			: selectedLabels.filter((selectedLabel) => selectedLabel !== labelName);

		labelsColumn?.setFilterValue(nextLabels);
	}

	return (
		<Card
			ref={ref}
			aria-label="dapp wallets"
			aria-busy={walletsQuery.isPending}
			data-slot="data-table"
			className={className}
			{...props}
		>
			<div className="px-6 pt-5">
				<div className="flex min-h-10 flex-wrap items-center gap-5">
					<label className="relative block w-full sm:w-55">
						<span className="sr-only">Search wallets</span>
						<SearchIcon
							size={16}
							className="pointer-events-none absolute top-3 left-3 text-[#717a8c]"
						/>
						<input
							type="search"
							value={walletSearch}
							placeholder="Search"
							className="h-10 w-full truncate rounded-lg bg-field pr-9 pl-9 text-[15px]/6 outline-none placeholder:text-field-placeholder hover:bg-field-hover focus-visible:ring-2 focus-visible:ring-ring/40 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
							onChange={(event) => walletColumn?.setFilterValue(event.target.value)}
						/>
						{walletSearch ? (
							<button
								type="button"
								aria-label="Clear search"
								className="absolute top-1 right-1 flex size-8 items-center justify-center rounded-md text-[#717a8c] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
								onClick={() => walletColumn?.setFilterValue("")}
							>
								<CloseIcon size={16} />
							</button>
						) : null}
					</label>

					<Popover>
						<PopoverTrigger
							render={
								<Button
									type="button"
									variant="secondary"
									className="font-normal"
								/>
							}
						>
							<FilterIcon data-icon="inline-start" />
							Filters
							<ArrowDownIcon data-icon="inline-end" />
						</PopoverTrigger>
						<PopoverContent
							align="start"
							initialFocus={false}
							className="w-115.5 gap-0 p-2"
						>
							<div className="grid auto-cols-fr grid-flow-col grid-rows-5 gap-1">
								{filterLabels.map((filterLabel) => (
									<label
										key={filterLabel}
										className="flex h-10 cursor-pointer items-center gap-3 rounded-md px-2 text-sm/5 outline-none focus-within:bg-secondary-hover hover:bg-secondary-hover"
									>
										<Checkbox
											checked={selectedLabels.includes(filterLabel)}
											onCheckedChange={(checked) => toggleLabel(filterLabel, checked)}
										/>
										<span>{filterLabel}</span>
									</label>
								))}
							</div>
						</PopoverContent>
					</Popover>

					<Popover>
						<PopoverTrigger
							render={
								<Button
									type="button"
									variant="secondary"
									className="font-normal"
								/>
							}
						>
							<ColumnsIcon data-icon="inline-start" />
							Columns
							<ArrowDownIcon data-icon="inline-end" />
						</PopoverTrigger>
						<PopoverContent
							align="end"
							initialFocus={false}
							className="w-76 gap-1 p-2"
						>
							<div className="grid auto-cols-[140px] grid-flow-col grid-rows-5 gap-1">
								{table
									.getAllColumns()
									.filter((column) => column.id !== "actions")
									.map((column) => (
										<label
											key={column.id}
											className="flex h-10 cursor-pointer items-center gap-3 rounded-md px-2 text-sm/5 outline-none focus-within:bg-secondary-hover hover:bg-secondary-hover"
										>
											<Checkbox
												checked={column.getIsVisible()}
												disabled={!column.getCanHide()}
												onCheckedChange={(checked) => column.toggleVisibility(checked)}
											/>
											<span>{columnLabels[column.id] ?? column.id}</span>
										</label>
									))}
							</div>
						</PopoverContent>
					</Popover>

					{selectedLabels.length > 0 ? (
						<p className="flex gap-1 text-sm/5">
							<span className="font-semibold">{filteredCount}</span>
							<span className="text-tabs-foreground">wallets</span>
						</p>
					) : null}

					<div className="ml-auto flex items-center gap-2">
						<Button
							type="button"
							variant="ghost"
							className="font-normal"
						>
							<DocumentIcon
								data-icon="inline-start"
								className="text-tabs-foreground"
							/>
							FAQ
						</Button>
						<DappWalletsExportDialog />
					</div>
				</div>

				{selectedLabels.length > 0 ? (
					<div className="flex min-h-12 flex-wrap items-center gap-3 pt-4">
						{selectedLabels.map((selectedLabel) => (
							<button
								key={selectedLabel}
								type="button"
								className="flex h-8 items-center gap-1 rounded-full bg-popover px-4 text-sm/5 font-semibold outline-none hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-ring/40"
								onClick={() => toggleLabel(selectedLabel, false)}
							>
								{selectedLabel}
								<CloseIcon
									size={16}
									className="text-tabs-foreground"
								/>
							</button>
						))}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="rounded-full! text-tabs-foreground"
							onClick={() => labelsColumn?.setFilterValue([])}
						>
							Clear all
						</Button>
					</div>
				) : null}
			</div>

			<div className="min-h-100 *:data-[slot=table-container]:min-h-100">
				<Table className="min-w-255 table-fixed">
					<TableHeader className="">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className="h-13.5 hover:bg-transparent"
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										data-column={header.column.id}
										className="px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground data-[column=actions]:w-12 data-[column=activity]:w-22.5 data-[column=age]:w-15.75 data-[column=balance]:w-23.25 data-[column=balance]:text-right data-[column=contacts]:w-33 data-[column=index]:w-7.25 data-[column=labels]:w-51.5 data-[column=nfts]:w-14.75 data-[column=nfts]:text-right data-[column=rank]:w-18.75 data-[column=twitter]:w-17.5 data-[column=twitter]:text-right data-[column=wallet]:w-42.75"
									>
										{header.isPlaceholder ? null : <table.FlexRender header={header} />}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{walletsQuery.isPending ? (
							Array.from({ length: 8 }, (_, index) => (
								<TableRow
									key={`skeleton-${index}`}
									className="h-14"
								>
									{table.getVisibleLeafColumns().map((column) => (
										<TableCell
											key={column.id}
											className="px-5 py-0"
										>
											{column.id === "wallet" ? (
												<div className="flex items-center gap-3">
													<Skeleton className="size-8 rounded-full" />
													<Skeleton className="h-5 w-24" />
												</div>
											) : (
												<Skeleton className="ml-auto h-5 w-12" />
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="h-14"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											data-column={cell.column.id}
											className="px-5 py-0"
										>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow className="">
								<TableCell
									colSpan={table.getVisibleLeafColumns().length}
									className="h-86.5 text-center"
								>
									<div className="mx-auto max-w-140">
										<h3 className="text-2xl/7 font-bold">No results</h3>
										<p className="mt-2 text-[15px]/6 text-tabs-foreground">
											We couldn&apos;t find anything matching your request.
											<br />
											Try another search
										</p>
										<Button
											type="button"
											className="mt-8"
											onClick={() => {
												walletColumn?.setFilterValue("");
												labelsColumn?.setFilterValue([]);
											}}
										>
											Reset filters
										</Button>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex min-h-17 flex-wrap items-center justify-end gap-6 px-6 py-3 text-[13px]/[18px] text-tabs-foreground">
				<div className="hidden items-center gap-2 lg:flex">
					<span className="min-w-20 text-center text-foreground">Rows per page</span>
					<Select
						value={`${table.state.pagination.pageSize}`}
						onValueChange={(value) => table.setPageSize(Number(value))}
					>
						<SelectTrigger
							size="sm"
							className="w-20"
							aria-label="Rows per page"
						>
							<SelectValue placeholder={table.state.pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							<SelectGroup>
								{[12, 24, 48].map((pageSize) => (
									<SelectItem
										key={pageSize}
										value={`${pageSize}`}
									>
										{pageSize}
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
					{pageNumber} of {table.getPageCount()} pages
				</span>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="secondary"
						size="icon-sm"
						className="hidden lg:inline-flex"
						disabled={!table.getCanPreviousPage()}
						aria-label="Go to first page"
						onClick={() => table.setPageIndex(0)}
					>
						<ChevronsLeft />
					</Button>
					<Button
						type="button"
						variant="secondary"
						size="icon-sm"
						disabled={!table.getCanPreviousPage()}
						aria-label="Go to previous page"
						onClick={() => table.previousPage()}
					>
						<ChevronLeft />
					</Button>
					<Button
						type="button"
						variant="secondary"
						size="icon-sm"
						disabled={!table.getCanNextPage()}
						aria-label="Go to next page"
						onClick={() => table.nextPage()}
					>
						<ChevronRight />
					</Button>
					<Button
						type="button"
						variant="secondary"
						size="icon-sm"
						className="hidden lg:inline-flex"
						disabled={!table.getCanNextPage()}
						aria-label="Go to last page"
						onClick={() => table.setPageIndex(Math.max(table.getPageCount() - 1, 0))}
					>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</Card>
	);
}
