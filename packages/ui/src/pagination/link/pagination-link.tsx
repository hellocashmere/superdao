import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";

export interface PaginationLinkProps extends Pick<ComponentProps<typeof Button>, "size">, ComponentProps<"a"> {
	/**
	 * Marks the link as the currently active page.
	 */
	isActive?: boolean;
}

/**
 * Renders the pagination link component.
 */
export function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
	return (
		<Button
			variant={isActive ? "secondary" : "ghost"}
			size={size}
			className={cn(className)}
			nativeButton={false}
			render={
				<a
					aria-current={isActive ? "page" : undefined}
					data-slot="pagination-link"
					data-active={isActive}
					{...props}
				/>
			}
		/>
	);
}
