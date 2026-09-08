import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { ChevronLeftIcon } from "lucide-react";

import { PaginationLink } from "../link/pagination-link";

export interface PaginationPreviousProps extends ComponentProps<typeof PaginationLink> {
	/**
	 * Overrides the text shown for the previous-page control.
	 */
	text?: string;
}

/**
 * Renders the pagination previous component.
 */
export function PaginationPrevious({ className, text = "Previous", ...props }: PaginationPreviousProps) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("pl-1.5!", className)}
			{...props}
		>
			<ChevronLeftIcon data-icon="inline-start" />
			<span className="hidden sm:block">{text}</span>
		</PaginationLink>
	);
}
