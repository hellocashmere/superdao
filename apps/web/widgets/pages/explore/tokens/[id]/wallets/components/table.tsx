"use client";

import type { ComponentPropsWithRef } from "react";

import { Button } from "@superdao/ui/components/button";
import { Card } from "@superdao/ui/components/card";
import { Spinner } from "@superdao/ui/components/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";
import { useTable } from "@tanstack/react-table";

import { useGetTokenWallets } from "@/entities/token";

import { dataTableFeatures } from "../model/data-table-features";

import { columns } from "./table/columns";
import { DataTablePagination } from "./table/pagination";
import { DataTableToolbar } from "./table/toolbar";

export interface DataTableProps extends ComponentPropsWithRef<typeof Card> {
  tokenID: number;
}

/**
 * Renders the searchable, sortable and paginated wallet audience table.
 */
export function DataTable({ className, tokenID, ref, ...props }: DataTableProps) {
  const walletsQuery = useGetTokenWallets(tokenID);
  const table = useTable({
    features: dataTableFeatures,
    data: walletsQuery.data ?? [],
    columns,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 12 },
      sorting: [{ id: "index", desc: false }],
    },
  });
  const walletColumn = table.getColumn("wallet");
  const labelsColumn = table.getColumn("labels");

  if (walletsQuery.error) throw walletsQuery.error;

  return (
    <Card
      {...props}
      ref={ref}
      aria-label="token wallets"
      aria-busy={walletsQuery.isPending}
      data-slot="data-table"
      className={className}
    >
      <DataTableToolbar table={table} />

      <div className="min-h-[400px] [&>[data-slot=table-container]]:min-h-[400px]">
        <Table className="min-w-[1020px] table-fixed">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="h-[54px] hover:bg-transparent"
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
              <TableRow className="">
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-[346px] text-center"
                >
                  <Spinner className="mx-auto size-6 text-tabs-foreground" />
                  <span className="sr-only">Loading wallets</span>
                </TableCell>
              </TableRow>
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
                  className="h-[346px] text-center"
                >
                  <div className="mx-auto max-w-[560px]">
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

      <DataTablePagination table={table} />
    </Card>
  );
}
