"use client";

import type { ComponentPropsWithRef } from "react";

import { ArrowDownIcon, CloseIcon, ColumnsIcon, DocumentIcon, FilterIcon, SearchIcon } from "@superdao/icons/outline";
import { Button } from "@superdao/ui/components/button";
import { Card } from "@superdao/ui/components/card";
import { Checkbox } from "@superdao/ui/components/checkbox";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@superdao/ui/components/empty";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@superdao/ui/components/input-group";
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

import { useGetLabelWallets } from "@/entities/label";

import { AudienceAddDataDialog } from "../add-data-dialog";
import { AudienceWalletsExportDialog } from "../export-dialog";

import { columnLabels, columns, dataTableFeatures, filterLabels } from "./table-config";

export interface AudienceWalletsTableProps extends ComponentPropsWithRef<typeof Card> {
	sourceLabelID: number;
}

/**
 * Renders the searchable, sortable, and paginated audience wallet table.
 */
export function AudienceWalletsTable({ ref, className, sourceLabelID, ...props }: AudienceWalletsTableProps) {
	const walletsQuery = useGetLabelWallets(sourceLabelID);
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
	 * Updates the selected audience filter values.
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
			aria-label="Audience wallets"
			aria-busy={walletsQuery.isPending}
			data-slot="audience-wallets-table"
			className={className}
			{...props}
		>
			<div className="px-6 pt-5">
				<div className="flex min-h-10 flex-wrap items-center gap-5">
					<label className="block w-full sm:w-55">
						<span className="sr-only">Search wallets</span>
						<InputGroup>
							<InputGroupAddon className="pl-3 text-icon">
								<SearchIcon size={16} />
							</InputGroupAddon>
							<InputGroupInput
								type="search"
								value={walletSearch}
								placeholder="Search"
								className="pr-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
								onChange={(event) => walletColumn?.setFilterValue(event.target.value)}
							/>
							{walletSearch ? (
								<InputGroupAddon
									align="inline-end"
									className="text-icon"
								>
									<InputGroupButton
										type="button"
										variant="ghost"
										size="icon-xs"
										aria-label="Clear search"
										onClick={() => walletColumn?.setFilterValue("")}
									>
										<CloseIcon className="size-4!" />
									</InputGroupButton>
								</InputGroupAddon>
							) : null}
						</InputGroup>
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
						<AudienceAddDataDialog />
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
						<AudienceWalletsExportDialog />
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
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className="h-13.5 hover:bg-transparent"
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										data-column={header.column.id}
										className="px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-muted-foreground data-[column=actions]:w-12 data-[column=activity]:w-[90px] data-[column=age]:w-[63px] data-[column=balance]:w-[93px] data-[column=balance]:text-right data-[column=contacts]:w-[132px] data-[column=index]:w-[29px] data-[column=labels]:w-[206px] data-[column=nfts]:w-[59px] data-[column=nfts]:text-right data-[column=rank]:w-[75px] data-[column=twitter]:w-[70px] data-[column=twitter]:text-right data-[column=wallet]:w-[171px]"
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
							<TableRow>
								<TableCell
									colSpan={table.getVisibleLeafColumns().length}
									className="h-86.5 text-center"
								>
									<Empty className="min-h-0 p-0">
										<EmptyHeader className="max-w-140 gap-0">
											<EmptyTitle className="text-2xl/7 font-bold">No results</EmptyTitle>
											<EmptyDescription className="mt-2 text-[15px]/6 text-tabs-foreground">
												We couldn&apos;t find anything matching your request.
												<br />
												Try another search
											</EmptyDescription>
										</EmptyHeader>
										<EmptyContent className="mt-8">
											<Button
												type="button"
												onClick={() => {
													walletColumn?.setFilterValue("");
													labelsColumn?.setFilterValue([]);
												}}
											>
												Reset filters
											</Button>
										</EmptyContent>
									</Empty>
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
