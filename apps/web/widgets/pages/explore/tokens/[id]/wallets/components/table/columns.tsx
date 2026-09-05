"use client";

import { ArrowDownIcon } from "@superdao/icons/outline";
import { createColumnHelper } from "@tanstack/react-table";

import type { TokenWalletView } from "@/entities/token";

import type { DataTableFeatures } from "../../model/data-table-features";

import { TokenWalletActions } from "./wallet-actions";
import { TokenWalletActivity } from "./wallet-activity";
import { TokenWalletAgeValue } from "./wallet-age-value";
import { TokenWalletContacts } from "./wallet-contacts";
import { TokenWalletEmptyValue } from "./wallet-empty-value";
import { TokenWalletIdentity } from "./wallet-identity";
import { TokenWalletLabels } from "./wallet-labels";
import { TokenWalletRank } from "./wallet-rank";
import { isMissingTokenWalletValue } from "./wallet-value";

const columnHelper = createColumnHelper<DataTableFeatures, TokenWalletView>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    id: "index",
    header: "#",
    enableHiding: false,
    sortFn: "basic",
    sortDescFirst: false,
    cell: ({ getValue }) => <span className="text-sm text-[#717a8c]">{getValue()}</span>,
  }),
  columnHelper.accessor("name", {
    id: "wallet",
    header: "Wallet",
    filterFn: "includesString",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => <TokenWalletIdentity wallet={row.original} />,
  }),
  columnHelper.accessor((wallet) => Number(wallet.rank), {
    id: "rank",
    sortFn: "basic",
    sortDescFirst: true,
    header: ({ column }) => (
      <button
        type="button"
        data-sort={column.getIsSorted() || "none"}
        className="group/sort inline-flex items-center gap-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rank
        <ArrowDownIcon
          size={12}
          className="transition-transform group-data-[sort=asc]/sort:rotate-180 group-data-[sort=none]/sort:opacity-50"
        />
      </button>
    ),
    cell: ({ row }) => (
      <TokenWalletRank
        rank={row.original.rank}
        tone={row.original.rankTone}
      />
    ),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    enableSorting: false,
    cell: ({ getValue, row }) => (
      <TokenWalletAgeValue
        value={getValue()}
        details={row.original.ageDetails}
      />
    ),
  }),
  columnHelper.accessor("labels", {
    header: "Labels ↗",
    filterFn: "labelsIncludeAny",
    enableSorting: false,
    cell: ({ getValue }) => {
      const labels = getValue();
      return labels.length ? <TokenWalletLabels labels={labels} /> : <TokenWalletEmptyValue message="No labels" />;
    },
  }),
  columnHelper.accessor("balance", {
    header: "Balance, $",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right text-[15px]/6">
          {isMissingTokenWalletValue(value) ? <TokenWalletEmptyValue message="No balance data" /> : value}
        </div>
      );
    },
  }),
  columnHelper.accessor("nfts", {
    header: "NFTs",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right text-[15px]/6">
          {isMissingTokenWalletValue(value) ? <TokenWalletEmptyValue message="No NFTs" /> : value}
        </div>
      );
    },
  }),
  columnHelper.accessor("twitter", {
    header: "Twitter",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right text-[15px]/6">
          {isMissingTokenWalletValue(value) ? <TokenWalletEmptyValue message="No linked Twitter account" /> : value}
        </div>
      );
    },
  }),
  columnHelper.accessor("activity", {
    header: "Activity",
    enableSorting: false,
    cell: ({ getValue }) => {
      const activity = getValue();
      return activity.length ? (
        <TokenWalletActivity activity={activity} />
      ) : (
        <TokenWalletEmptyValue message="No activity" />
      );
    },
  }),
  columnHelper.accessor("contacts", {
    header: "Contacts",
    enableSorting: false,
    cell: ({ row }) =>
      row.original.contacts.some((contact) => contact !== "email") ? (
        <TokenWalletContacts wallet={row.original} />
      ) : (
        <TokenWalletEmptyValue message="No linked account" />
      ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    enableHiding: false,
    cell: ({ row }) => <TokenWalletActions wallet={row.original} />,
  }),
]);
