import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { ChevronRightIcon } from "lucide-react";

import { PaginationLink } from "../link/pagination-link";

export interface PaginationNextProps extends ComponentProps<typeof PaginationLink> {
	/**
	 * Overrides the text shown for the next-page control.
	 */
	text?: string;
}

/**
 * Renders the pagination next component.
 */
export function PaginationNext({ className, text = "Next", ...props }: PaginationNextProps) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("pr-1.5!", className)}
			{...props}
		>
			<span className="hidden sm:block">{text}</span>
			<ChevronRightIcon data-icon="inline-end" />
		</PaginationLink>
	);
}
