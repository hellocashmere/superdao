"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@superdao/ui/components/select";
import type { ReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

import type { DataTableFeatures } from "../../model/data-table-features";

export interface DataTablePaginationProps extends ComponentPropsWithRef<"div"> {
  table: ReactTable<DataTableFeatures, NftCollectionWalletView>;
}

/**
 * Renders page-size and navigation controls for the NFT collection wallet table.
 */
export function DataTablePagination({ className, ref, table, ...props }: DataTablePaginationProps) {
  const pageNumber = table.state.pagination.pageIndex + 1;

  return (
    <div
      {...props}
      ref={ref}
      data-slot="nft-collection-wallet-table-pagination"
      className={cn(
        "flex min-h-17 flex-wrap items-center justify-end gap-6 px-6 py-3 text-[13px]/[18px] text-tabs-foreground",
        className
      )}
    >
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
  );
}
