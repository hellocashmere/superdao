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
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";

import type { LabelWallet } from "@/entities/label";

type BaseTableFeatures = ReturnType<typeof tableFeatures>;

const labelsIncludeAny: FilterFn<BaseTableFeatures, LabelWallet> = (row, _columnId, filterValue) => {
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
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    text: sortFn_text,
  },
});

export type DataTableFeatures = typeof dataTableFeatures;
