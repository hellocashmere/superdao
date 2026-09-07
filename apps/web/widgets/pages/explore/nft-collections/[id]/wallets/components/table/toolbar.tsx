"use client";

import type { ComponentPropsWithRef } from "react";

import { ArrowDownIcon, CloseIcon, ColumnsIcon, DocumentIcon, FilterIcon, SearchIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import { Checkbox } from "@superdao/ui/components/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@superdao/ui/components/popover";
import type { ReactTable } from "@tanstack/react-table";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

import type { DataTableFeatures } from "../../model/data-table-features";
import { ExportWalletsDialog } from "../export-dialog";

const filterLabels = [
  "Developer",
  "Luxury",
  "Hunter",
  "Crypto native",
  "Fashion",
  "Whale",
  "Gamer",
  "Music",
  "Farcaster",
  "DeFi",
  "ENS",
  "Art",
  "Influencer",
] as const;

const columnLabels: Readonly<Record<string, string>> = {
  index: "#",
  activity: "Activity",
  age: "Age",
  balance: "Balance",
  contacts: "Contacts",
  labels: "Labels",
  nfts: "NFTs",
  rank: "Rank",
  twitter: "Twitter",
  wallet: "Wallet",
};

export interface DataTableToolbarProps extends ComponentPropsWithRef<"div"> {
  table: ReactTable<DataTableFeatures, NftCollectionWalletView>;
}

/**
 * Renders search, filters, column controls, and table actions.
 */
export function DataTableToolbar({ className, ref, table, ...props }: DataTableToolbarProps) {
  const walletColumn = table.getColumn("wallet");
  const labelsColumn = table.getColumn("labels");
  const walletSearch = (walletColumn?.getFilterValue() as string) ?? "";
  const selectedLabels = (labelsColumn?.getFilterValue() as readonly string[] | undefined) ?? [];
  const filteredCount = table.getFilteredRowModel().rows.length;

  function toggleLabel(label: string, selected: boolean) {
    const nextLabels = selected
      ? Array.from(new Set([...selectedLabels, label]))
      : selectedLabels.filter((selectedLabel) => selectedLabel !== label);

    labelsColumn?.setFilterValue(nextLabels);
  }

  return (
    <div
      {...props}
      ref={ref}
      data-slot="data-table-toolbar"
      className={cn("px-6 pt-5", className)}
    >
      <div className="flex min-h-10 flex-wrap items-center gap-5">
        <label className="relative block w-full sm:w-[220px]">
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
            className="w-[462px] gap-0 p-2"
          >
            <div className="grid auto-cols-fr grid-flow-col grid-rows-5 gap-1">
              {filterLabels.map((label) => (
                <label
                  key={label}
                  className="flex h-10 cursor-pointer items-center gap-3 rounded-md px-2 text-sm/5 outline-none focus-within:bg-secondary-hover hover:bg-secondary-hover"
                >
                  <Checkbox
                    checked={selectedLabels.includes(label)}
                    onCheckedChange={(checked) => toggleLabel(label, checked)}
                  />
                  <span>{label}</span>
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
            className="w-[304px] gap-1 p-2"
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
          <ExportWalletsDialog />
        </div>
      </div>

      {selectedLabels.length > 0 ? (
        <div className="flex min-h-12 flex-wrap items-center gap-3 pt-4">
          {selectedLabels.map((label) => (
            <button
              key={label}
              type="button"
              className="flex h-8 items-center gap-1 rounded-full bg-popover px-4 text-sm/5 font-semibold outline-none hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-ring/40"
              onClick={() => toggleLabel(label, false)}
            >
              {label}
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
            className="rounded-full text-tabs-foreground"
            onClick={() => labelsColumn?.setFilterValue([])}
          >
            Clear all
          </Button>
        </div>
      ) : null}
    </div>
  );
}
