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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface MembersPaginationProps extends ComponentPropsWithRef<"div"> {
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPageSizeChange: (pageSize: number) => void;
  onPrevious: () => void;
  page: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: readonly number[];
}

/**
 * Renders the pagination controls for the members table.
 */
export function MembersPagination({
  className,
  onFirst,
  onLast,
  onNext,
  onPageSizeChange,
  onPrevious,
  page,
  pageCount,
  pageSize,
  pageSizeOptions,
  ref,
  ...props
}: MembersPaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < pageCount;

  return (
    <div
      {...props}
      ref={ref}
      data-slot="members-pagination"
      className={cn(
        "flex min-h-17 flex-wrap items-center justify-end gap-6 px-6 py-3 text-[13px]/[18px] text-tabs-foreground",
        className
      )}
    >
      <div className="hidden items-center gap-2 lg:flex">
        <span className="min-w-20 text-center text-foreground">Rows per page</span>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger
            size="sm"
            className="w-20"
          >
            <SelectValue placeholder={pageSize} />
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
      <span className="min-w-20 text-center text-foreground">
        {page} of {pageCount.toLocaleString("en-US").replace(/,/g, " ")} pages
      </span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="hidden lg:inline-flex"
          disabled={!canGoPrevious}
          aria-label="First page"
          onClick={onFirst}
        >
          <ChevronsLeft />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          disabled={!canGoPrevious}
          aria-label="Previous page"
          onClick={onPrevious}
        >
          <ChevronLeft />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          disabled={!canGoNext}
          aria-label="Next page"
          onClick={onNext}
        >
          <ChevronRight />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="hidden lg:inline-flex"
          disabled={!canGoNext}
          aria-label="Last page"
          onClick={onLast}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
