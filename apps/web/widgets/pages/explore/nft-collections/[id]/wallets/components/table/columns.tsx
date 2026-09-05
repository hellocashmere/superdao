"use client";

import { ArrowDownIcon } from "@superdao/icons/outline";
import { createColumnHelper } from "@tanstack/react-table";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

import type { DataTableFeatures } from "../../model/data-table-features";

import { CollectionWalletActions } from "./wallet-actions";
import { CollectionWalletActivity } from "./wallet-activity";
import { CollectionWalletAgeValue } from "./wallet-age-value";
import { CollectionWalletContacts } from "./wallet-contacts";
import { CollectionWalletEmptyValue } from "./wallet-empty-value";
import { CollectionWalletIdentity } from "./wallet-identity";
import { CollectionWalletLabels } from "./wallet-labels";
import { CollectionWalletRank } from "./wallet-rank";
import { isMissingCollectionWalletValue } from "./wallet-value";

const columnHelper = createColumnHelper<DataTableFeatures, NftCollectionWalletView>();

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
    cell: ({ row }) => <CollectionWalletIdentity wallet={row.original} />,
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
      <CollectionWalletRank
        rank={row.original.rank}
        tone={row.original.rankTone}
      />
    ),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    enableSorting: false,
    cell: ({ getValue, row }) => (
      <CollectionWalletAgeValue
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
      return labels.length ? (
        <CollectionWalletLabels labels={labels} />
      ) : (
        <CollectionWalletEmptyValue message="No labels" />
      );
    },
  }),
  columnHelper.accessor("balance", {
    header: "Balance, $",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right text-[15px]/6">
          {isMissingCollectionWalletValue(value) ? <CollectionWalletEmptyValue message="No balance data" /> : value}
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
          {isMissingCollectionWalletValue(value) ? <CollectionWalletEmptyValue message="No NFTs" /> : value}
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
          {isMissingCollectionWalletValue(value) ? (
            <CollectionWalletEmptyValue message="No linked Twitter account" />
          ) : (
            value
          )}
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
        <CollectionWalletActivity activity={activity} />
      ) : (
        <CollectionWalletEmptyValue message="No activity" />
      );
    },
  }),
  columnHelper.accessor("contacts", {
    header: "Contacts",
    enableSorting: false,
    cell: ({ row }) =>
      row.original.contacts.some((contact) => contact !== "email") ? (
        <CollectionWalletContacts wallet={row.original} />
      ) : (
        <CollectionWalletEmptyValue message="No linked account" />
      ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    enableHiding: false,
    cell: ({ row }) => <CollectionWalletActions wallet={row.original} />,
  }),
]);
