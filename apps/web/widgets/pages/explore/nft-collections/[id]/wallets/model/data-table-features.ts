import type { FilterFn } from "@tanstack/react-table";
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_basic,
  tableFeatures,
} from "@tanstack/react-table";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

type BaseTableFeatures = ReturnType<typeof tableFeatures>;

const labelsIncludeAny: FilterFn<BaseTableFeatures, NftCollectionWalletView> = (row, _columnId, filterValue) => {
  const selectedLabels = filterValue as readonly string[];

  return selectedLabels.some((selectedLabel) => row.original.labels.some(({ name }) => name === selectedLabel));
};

labelsIncludeAny.autoRemove = (value) => !Array.isArray(value) || value.length === 0;

export const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    labelsIncludeAny,
  },
  sortFns: {
    basic: sortFn_basic,
  },
});

export type DataTableFeatures = typeof dataTableFeatures;
