"use client";

import { useCallback, useMemo, useState } from "react";

export interface UsePaginationOptions {
	limit: number;
	offset: number;
	total?: number;
}

export interface UsePaginationReturn {
	canGoNext: boolean;
	canGoPrevious: boolean;
	goToFirst: () => void;
	goToLast: () => void;
	goToNext: () => void;
	goToPrevious: () => void;
	limit: number;
	offset: number;
	page: number;
	pageCount: number;
	query: {
		limit: number;
		offset: number;
	};
	reset: () => void;
	setLimit: (limit: number) => void;
}

/**
 * Manages limit/offset pagination for paginated API requests.
 */
export function usePagination({ limit, offset, total }: UsePaginationOptions): UsePaginationReturn {
	const [currentLimit, setCurrentLimit] = useState<number>(limit);
	const [currentOffset, setCurrentOffset] = useState<number>(offset);
	const maximumOffset =
		total === undefined || total === 0 ? currentOffset : Math.floor((total - 1) / currentLimit) * currentLimit;
	const resolvedOffset = Math.min(currentOffset, maximumOffset);
	const page = Math.floor(resolvedOffset / currentLimit) + 1;
	const pageCount = total === undefined ? 1 : Math.max(1, Math.ceil(total / currentLimit));
	const canGoPrevious = resolvedOffset > 0;
	const canGoNext = total !== undefined && resolvedOffset + currentLimit < total;

	const reset = useCallback(() => setCurrentOffset(0), []);

	const setLimit = useCallback((limit: number) => {
		setCurrentLimit(limit);
		setCurrentOffset(0);
	}, []);

	const goToFirst = reset;

	const goToPrevious = useCallback(() => {
		setCurrentOffset((current) => Math.max(0, Math.min(current, maximumOffset) - currentLimit));
	}, [currentLimit, maximumOffset]);

	const goToNext = useCallback(() => {
		if (canGoNext) {
			setCurrentOffset((current) => Math.min(current, maximumOffset) + currentLimit);
		}
	}, [canGoNext, currentLimit, maximumOffset]);

	const goToLast = useCallback(() => {
		if (total !== undefined && total > 0) {
			setCurrentOffset(Math.floor((total - 1) / currentLimit) * currentLimit);
		}
	}, [currentLimit, total]);

	return {
		canGoNext,
		canGoPrevious,
		goToFirst,
		goToLast,
		goToNext,
		goToPrevious,
		limit: currentLimit,
		offset: resolvedOffset,
		page,
		pageCount,
		query: useMemo(() => ({ limit: currentLimit, offset: resolvedOffset }), [currentLimit, resolvedOffset]),
		reset,
		setLimit,
	};
}
