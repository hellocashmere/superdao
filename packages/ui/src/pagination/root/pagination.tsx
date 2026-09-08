import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface PaginationProps extends ComponentProps<"nav"> {}

/**
 * Renders the pagination component.
 *
 * Composition:
 * ```text
 * Pagination
 * ├── PaginationContent
 * ├── PaginationEllipsis
 * ├── PaginationItem
 * ├── PaginationLink
 * ├── PaginationNext
 * └── PaginationPrevious
 * ```
 */
export function Pagination({ className, ...props }: PaginationProps) {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}
