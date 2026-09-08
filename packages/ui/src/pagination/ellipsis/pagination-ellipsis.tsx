import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";

export interface PaginationEllipsisProps extends ComponentProps<"span"> {}

/**
 * Renders the pagination ellipsis component.
 */
export function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className="sr-only">More pages</span>
		</span>
	);
}
